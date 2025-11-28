/**
 * Middleware de Rate Limiting por IP ou Token
 * Controla requisições por IP e por token para proteção contra abuso
 */

class RateLimiter {
  constructor(maxRequests = 100, windowMs = 60 * 1000) {
    this.maxRequests = maxRequests; // Máximo de requisições
    this.windowMs = windowMs; // Janela de tempo em ms
    this.requests = new Map(); // Armazena { ip/token -> { count, resetTime } }
  }

  /**
   * Gera uma chave única baseada em IP e Token
   */
  generateKey(ip, token = null) {
    return token ? `token:${token}` : `ip:${ip}`;
  }

  /**
   * Verifica e atualiza o contador de requisições
   */
  check(ip, token = null) {
    const key = this.generateKey(ip, token);
    const now = Date.now();

    if (!this.requests.has(key)) {
      this.requests.set(key, { count: 1, resetTime: now + this.windowMs });
      return { allowed: true, remaining: this.maxRequests - 1, retryAfter: this.windowMs };
    }

    const record = this.requests.get(key);

    // Se passou a janela de tempo, reseta
    if (now > record.resetTime) {
      record.count = 1;
      record.resetTime = now + this.windowMs;
      return { allowed: true, remaining: this.maxRequests - 1, retryAfter: this.windowMs };
    }

    // Incrementa o contador
    record.count++;

    if (record.count > this.maxRequests) {
      const retryAfter = Math.ceil((record.resetTime - now) / 1000);
      return { allowed: false, remaining: 0, retryAfter };
    }

    return { allowed: true, remaining: this.maxRequests - record.count, retryAfter: null };
  }

  /**
   * Limpa registros antigos (para evitar memory leak)
   */
  cleanup() {
    const now = Date.now();
    for (const [key, value] of this.requests.entries()) {
      if (now > value.resetTime + this.windowMs) {
        this.requests.delete(key);
      }
    }
  }
}

// Instâncias para diferentes limites
const ipLimiter = new RateLimiter(100, 60 * 1000); // 100 req/min por IP
const tokenLimiter = new RateLimiter(200, 60 * 1000); // 200 req/min por Token

// Limpar registros a cada 5 minutos
setInterval(() => {
  ipLimiter.cleanup();
  tokenLimiter.cleanup();
}, 5 * 60 * 1000);

/**
 * Middleware para validar rate limit
 */
const rateLimitMiddleware = (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const token = req.token || null; // Token já é adicionado pelo validarToken

  // Verifica limite por IP (mais restritivo)
  const ipCheck = ipLimiter.check(ip);
  if (!ipCheck.allowed) {
    const retryAfter = ipCheck.retryAfter;
    return res.status(429).json({
      code: 429,
      status: 'Error',
      message: `Limite de requisições excedido. Tente novamente em ${retryAfter}s.`,
      data: {
        retryAfter,
        limitType: 'IP',
      },
    });
  }

  // Se tem token, verifica limite por token (mais permissivo)
  if (token) {
    const tokenCheck = tokenLimiter.check(ip, token);
    if (!tokenCheck.allowed) {
      const retryAfter = tokenCheck.retryAfter;
      return res.status(429).json({
        code: 429,
        status: 'Error',
        message: `Limite de requisições do token excedido. Tente novamente em ${retryAfter}s.`,
        data: {
          retryAfter,
          limitType: 'TOKEN',
        },
      });
    }
  }

  // Adiciona headers informativos
  res.set('X-RateLimit-Limit', ipLimiter.maxRequests);
  res.set('X-RateLimit-Remaining', ipCheck.remaining);

  next();
};

module.exports = {
  rateLimitMiddleware,
  RateLimiter,
  ipLimiter,
  tokenLimiter,
};
