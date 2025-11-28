
 
/*document.onload(openCity(event,'Javascript'))

function activo(event,cityName){
 
  document.getElementById(cityName).style.display="block";
  evt.currentTarget.className += " active";
}

function openCity(event, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
    
}
 */
window.addEventListener('scroll', function() {
    // Verificar se a posição da rolagem é maior que 100 pixels
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 100) {
        // Faça algo quando a rolagem atingir mais de 100 pixels
   var header = document.getElementById('red');
   if (header && !header.classList.contains('fixed-header')){
     header.classList.add('fixed-header');
     // evitar salto de conteúdo adicionando padding-top no body igual à altura do header
     document.body.style.paddingTop = header.offsetHeight + 'px';
   }
    }else{
      var header = document.getElementById('red');
      if (header && header.classList.contains('fixed-header')){
        header.classList.remove('fixed-header');
        document.body.style.paddingTop = null;
      }
    }
});

// DOM ready: attach copy buttons and demo fetch
document.addEventListener('DOMContentLoaded', function() {
  // Attach copy buttons to each .copy-btn near a code block
  document.querySelectorAll('.copy-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      var code = btn.parentElement.querySelector('pre code');
      if (!code) return;
      var text = code.innerText;
      navigator.clipboard.writeText(text).then(function(){
        btn.innerText = 'Copiado';
        btn.classList.add('copied');
        setTimeout(function(){ btn.classList.remove('copied'); btn.innerText = 'Copiar'; }, 1200);
      }).catch(function(){
        btn.innerText = 'Erro';
        setTimeout(function(){ btn.innerText = 'Copiar'; }, 1500);
      });
    });
  });

  // Try-it demo integrado com endpoints reais (usa token em Authorization)
  var tryBtn = document.getElementById('try-endpoint');
  if (tryBtn) {
    tryBtn.addEventListener('click', function(){
      var results = document.getElementById('try-results');
      var select = document.getElementById('endpoint-select');
      var route = select ? select.value : '/api/stokblend/farmaciav1';
      results.innerHTML = 'Carregando...';

      // Monta URL relativa para o mesmo host; altere se a API estiver em outro domínio
      var url = window.location.origin + route;

      // Obtem token exibido (padrão definido no HTML)
      var token = document.getElementById('token-display') ? document.getElementById('token-display').innerText : '';

      fetch(url, {
        method: 'GET',
        headers: (function(){
          var t = token || '';
          // Se já começar com 'Bearer ' (case-insensitive), usa como está
          if (/^\s*bearer\s+/i.test(t)) return { 'Accept': 'application/json', 'Authorization': t.trim() };
          // Caso contrário, envia como 'Bearer <token>'
          return { 'Accept': 'application/json', 'Authorization': 'Bearer ' + t.trim() };
        })()
      }).then(function(r){
        if (!r.ok) throw new Error('Status ' + r.status);
        return r.json();
      }).then(function(data){
        results.innerHTML = '';
        // Se a resposta for array, mostra itens com código, descrição e família
        if (Array.isArray(data)){
            data.slice(0,12).forEach(function(item){
              var div = document.createElement('div');
              div.className = 'product-card';
              var codigo = item.codigo || item.id || '—';
              var descricao = item.descricao || item.description || item.name || item.title || '—';
              var familia = item.familia || item.family || item.category || '—';
              div.innerHTML = '<div class="product-field"><strong class="product-codigo">Código: '+escapeHtml(String(codigo))+'</strong></div><div class="product-field"><strong>Descrição:</strong> '+escapeHtml(String(descricao))+'</div><div class="product-field"><small class="text-muted">Família: '+escapeHtml(String(familia))+'</small></div>';
              results.appendChild(div);
              // trigger entrance animation
              requestAnimationFrame(function(){ div.classList.add('show'); });
            });
          } else {
            var wrap = document.createElement('div');
            wrap.className = 'product-card';
            var pre = document.createElement('pre');
            pre.textContent = JSON.stringify(data, null, 2);
            wrap.appendChild(pre);
            results.appendChild(wrap);
            requestAnimationFrame(function(){ wrap.classList.add('show'); });
          }
      }).catch(function(err){
        results.innerHTML = '<div class="text-danger">Erro: '+escapeHtml(String(err.message))+' — verifique CORS/autenticação e URL.</div>';
      });
    });
  }

  // Permite alterar token em runtime (útil para testes)
  var refreshBtn = document.getElementById('refresh-token');
  if (refreshBtn){
    refreshBtn.addEventListener('click', function(){
      var newToken = prompt('Insira o token (ex: XYZ,12345678). Será enviado como: Authorization: Bearer <token>', document.getElementById('token-display').innerText);
      if (newToken !== null) {
        // Remover prefixo "Bearer " caso o usuário tenha colocado
        newToken = newToken.replace(/^\s*bearer\s+/i, '').trim();
        document.getElementById('token-display').innerText = newToken;
      }
    });
  }

  // Trigger page-level entrance animations
  setTimeout(function(){ document.body.classList.add('page-appear'); }, 60);
});

function escapeHtml(str){
  return str.replace(/[&<>"']/g, function(ch){
    return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;" }[ch];
  });
}
