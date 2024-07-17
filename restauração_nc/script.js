function loadMore() {
    alert("Load more items...");
}

function applyPromo() {
    let promoCode = document.getElementById("promo-code").value;
    alert(`Promo code ${promoCode} applied.`);
}

function confirmOrder() {
    alert("Order confirmed!");
}


// Função para abrir uma cidade e atualizar os tabs
function openCity(evt, cityName) {
  // Oculta todos os elementos com a classe "tabcontent"
  var tabcontent = document.getElementsByClassName("tabcontent");
  for (var i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  
  // Remove a classe "active" de todos os elementos com a classe "tablinks"
  var tablinks = document.getElementsByClassName("tablinks");
   
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }
  
  // Exibe o conteúdo da cidade selecionada
  document.getElementById(cityName).style.display = "block";
  
  // Adiciona a classe "active" ao elemento que foi clicado
  evt.currentTarget.classList.add("active");
}

// Função para encontrar o elemento com id="defaultOpen" e clicar nele
function setDefaultTab() {
  var defaultOpenTab = document.getElementById("defaultOpen");
  if (defaultOpenTab) {
    defaultOpenTab.click(); // Simula um clique no elemento
  }
}

// Executa a função para definir o tab padrão ao carregar a página
setDefaultTab();


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};


// Verifica se o navegador suporta a API Fullscreen
if (document.documentElement.requestFullscreen) {
  // Obtém o elemento HTML que você deseja exibir em tela cheia (pode ser o body ou outro elemento)
  var elem = document.documentElement;
 
  // Solicita o modo de tela cheia
  elem.requestFullscreen().then(function() {
    // A tela está agora em modo de tela cheia
    console.log('Modo tela cheia ativado.');
  }).catch(function(err) {
    // Se houver algum erro ao tentar entrar em tela cheia
    console.error('Erro ao tentar entrar em tela cheia:', err);
  });
} else {
  // Se o navegador não suportar a API Fullscreen
  console.error('O navegador não suporta o modo de tela cheia.');
}

