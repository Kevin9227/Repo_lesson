#!/bin/bash

# ============================================
# Script de Testes da API StokBlend
# ============================================

API_URL="http://localhost:3500"
TOKEN="ABC,W9I9W9E"  # Token válido do tokens.json

echo "🚀 Iniciando testes da API StokBlend..."
echo ""


# ============================================
# 1. Health Check
# ============================================
echo "1️⃣  Testando Health Check (sem autenticação)..."
curl -s -X GET "$API_URL/health" | json_pp
echo ""
echo "---"
echo ""

# ============================================
# 2. Requisição sem Token (deve retornar 401)
# ============================================
echo "2️⃣  Testando sem Token (deve retornar 401)..."
curl -s -X GET "$API_URL/api/stokblend/cosmeticos" | json_pp
echo ""
echo "---"
echo ""

# ============================================
# 3. Requisição com Token Inválido (deve retornar 403)
# ============================================
echo "3️⃣  Testando com Token Inválido (deve retornar 403)..."
curl -s -X GET "$API_URL/api/stokblend/cosmeticos" \
  -H "Authorization: TOKEN_INVALIDO_12345" | json_pp
echo ""
echo "---"
echo ""

# ============================================
# 4. Requisição Válida sem parâmetros
# ============================================
echo "4️⃣  Testando Requisição Válida (sem parâmetros)..."
curl -s -X GET "$API_URL/api/stokblend/cosmeticos" \
  -H "Authorization: $TOKEN" | json_pp
echo ""
echo "---"
echo ""

# ============================================
# 5. Requisição com parâmetro (familia)
# ============================================
echo "5️⃣  Testando Busca por Família..."
curl -s -X GET "$API_URL/api/stokblend/cosmeticos?familia=maquiagem" \
  -H "Authorization: $TOKEN" | json_pp
echo ""
echo "---"
echo ""

# ============================================
# 6. Requisição com parâmetro (codigo)
# ============================================
echo "6️⃣  Testando Busca por Código..."
curl -s -X GET "$API_URL/api/stokblend/cosmeticos?codigo=12345" \
  -H "Authorization: $TOKEN" | json_pp
echo ""
echo "---"
echo ""

# ============================================
# 7. Requisição com parâmetro (descricao)
# ============================================
echo "7️⃣  Testando Busca por Descrição..."
curl -s -X GET "$API_URL/api/stokblend/cosmeticos?descricao=creme" \
  -H "Authorization: $TOKEN" | json_pp
echo ""
echo "---"
echo ""

# ============================================
# 8. Rate Limiting (disparar múltiplas requisições)
# ============================================
echo "8️⃣  Testando Rate Limiting (disparando 150 requisições rápidas)..."
echo "⏳ Aguarde... isto pode levar alguns segundos..."

for i in {1..150}; do
  response=$(curl -s -o /dev/null -w "%{http_code}" -X GET "$API_URL/api/stokblend/cosmeticos" \
    -H "Authorization: $TOKEN")
  
  if [ "$response" = "429" ]; then
    echo "✅ Rate limit acionado na requisição #$i com status 429!"
    echo ""
    echo "Detalhes da resposta 429:"
    curl -s -X GET "$API_URL/api/stokblend/cosmeticos" \
      -H "Authorization: $TOKEN" | json_pp
    break
  fi
  
  if [ $((i % 25)) -eq 0 ]; then
    echo "   → $i requisições enviadas (status: $response)..."
  fi
done

echo ""
echo "✅ Testes concluídos!"
