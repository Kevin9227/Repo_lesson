// DADOS DO PROJECTO
var div = document.createElement('div')
var btn = document.createElement('button')
var btnenviar = document.getElementById('enviar')
var teste = document.querySelector('.painelLateral')
let xnome =''
let msg =''
var projecto = [{
        nome_proje: 'Pesquisador de Perfil do GitHub',
        imagem: 'img/perfilGitHub.PNG',
        descri: 'O projeto feito em HTML,CSS e JAVASCRIPT que visa buscar perfis existentes no GitHub.   Projeto feito com objetivo de praticar API do GitHub.',
        link: 'https://kevin9227.github.io/Repo_lesson/perfilGitHub/'
    }

, {
        nome_proje: 'Bloco de anotações',
        imagem: 'img/Notas.PNG',
        descri: 'O projeto feito em HTML,CSS e JAVASCRIPT, que visou o estudo da função "localStorage" com fins de praticar. ',
        link: 'https://kevin9227.github.io/Repo_lesson/Notas/'
    }

, {
        nome_proje: 'Pokémon Web',
        imagem: 'img/pokemon.PNG',
        descri: 'O presente projeto visa a criação de um Web Site que na qual lista os Pokémon disponível na API. O site esta a ser desenvolvido com as tec HTML,CSS e JAVASCRIPT. ',
        link: 'https://kevin9227.github.io/Repo_lesson/pokemon/'
    }
, {
        nome_proje: 'Desaparecidos S.O.S',
        imagem: 'img/desaparecidos.PNG',
        descri: 'O presente projeto visa a criação de um Web Site que na qual irá constar todos os desaparecidos relatados a nível nacional, todos os familiares que pretenderem relatar o desaparecimento de um membro da sua família poderá faze-lo na plataforma.  O site esta a ser desenvolvido com as tec HTML,CSS e JAVASCRIPT de inicio.',
        link: 'https://kevin9227.github.io/Repo_lesson/desaparecidos/'
    }
    , {
        nome_proje: 'Posto de Venda POS',
        imagem: 'img/POS.JPG',
        descri: 'O presente projeto foi desenvolvido e deixado disponivel de forma open source, o sitema de venda foi feito para atender pequanas empresas que desejam organizar e controlar as suas vendas. O Sitema foi desenvolvido em FOXPRO9.',
        link: 'https://github.com/Kevin9227/M_FOXPRO/tree/main/Sistem_POS'
    }, {
        nome_proje: 'Gerenciador de VOOS - FLYAO',
        imagem: 'img/flyao.jpg',
        descri: 'O presente projeto foi desenvolvido para gerenciamento de VOO de uma companinha aeria de angola.',
        link: 'http://hendasoft.42web.io/Projecto_FlyAO'
    },{
        nome_proje: 'Reprodutor de Música',
        imagem: 'img/reprodutor.jpg',
        descri: 'O presente projeto foi desenvolvido para reproduzir músicas em formato MP3.',
        link: 'https://kevin9227.github.io/Repo_lesson/PlaySound/'
    }
]
var sobre = [{
    Titulo: 'Sobre Mim',
    Descri: 'Sou  Web Developer baseado em Luanda, Angola. Eu me esforço para aprender novas tecnologia para o meu conhecimentoconstruir aplicativos da Web imersivos e bonitos por meio de código cuidadosamente elaborado, design centrado no usuário e também trabalho completo com APIs.'
}]

// FUNCIONALIDADES DA PAGINA //

function mFuncao(x) {
    openNav()
}

function openNav() {
    document.getElementById("painelLateral").style.width = "250px";
}

function closeNav() {
    document.getElementById("painelLateral").style.width = "0";

}

// FUNCÇÕES PARA MOSTRAR BOTÃO DO TOPO //
function mostraBtn() {
    const modal = document.querySelector('.modal')
    var xbarra = modal.scrollTop
    if (xbarra > 1000) {
        btn.style.display = "block"
    } else {
        btn.style.display = "none"
    }
};


function gotop() {
    const modal = document.querySelector('.modal')
    var xbarra = modal.scrollTop
    modal.scrollBy(0, -xbarra)
};
// FIM //


function xprojecto() {
    // ADICIONAR ELEMENTO AO MODAL
    const modal = document.querySelector('.modal')

    modal.appendChild(div)
    modal.append(btn)
    btn.classList.add('botao')
    btn.innerHTML = 'Top'
    btn.setAttribute('onclick', 'gotop()')


    div.classList.add('teste')
    modal.style.height = "100%";
    modal.style.display = "grid"
    modal.style.justifyContent = "center"
    div.innerHTML = ""
    for (i = 0; i < projecto.length; ++i) {

        div.innerHTML += ` 
    <div class="xcontainer">
  <div class="ycontent ">
 <a href="${projecto[i].link}"> <img src="${projecto[i].imagem}" alt="Projectos" style="width:100%;"></a>
    <h1>${projecto[i].nome_proje}</h1>
    <p>${projecto[i].descri}</p>
  </div>
</div>

      `
    }

};


function about() {
    const modal = document.querySelector('.modal')
    modal.appendChild(div)
    div.classList.add('teste')
    modal.style.height = "100%";
    modal.style.display = "grid"
    modal.style.justifyContent = "center"
    div.innerHTML = ""
    div.innerHTML += ` 
    <div class="xcontainer">
  <div class="ycontent ">
  <img src="img/foto.jpg" alt="Joaquim de Campos" style="width:100%;  transition: 0.5s;">
    <h1>${sobre[0].Titulo}</h1>
    <p>${sobre[0].Descri}</p>
  </div>
</div>

      `
}


function contacto() {
    const modal = document.querySelector('.modal')
    modal.appendChild(div)
    div.classList.add('teste')
    modal.style.height = "100%";
    modal.style.display = "grid"
    modal.style.justifyContent = "center"
    div.innerHTML = ""
    div.innerHTML += ` 
    <div class="xcontainer">
  <div class="ycontent ">
    
    <h1>Deixe a sua mensagem</h1>
    <p>Siga-me </p>
    <ul>
        <li><a href="https://www.facebook.com/kevinkafala/"><i class="fa fa-facebook-square" style="font-size:32px;color:blue"></i></a></li>
        <li><a href="https://www.instagram.com/joaquim_kafala/?hl=pt"><i class="fa fa-instagram" style="font-size:32px;color:#db3012"></i></a></li>
        <li><a href="https://www.linkedin.com/in/joaquim-kafala-2321a116b/"><i class="fa fa-linkedin-square" style="font-size:32px;color:blue"></i></a></li>
        <li><a href="https://wa.me/+244924112838"><i class="fa fa-whatsapp" style="font-size:32px;color:green"></i></a></li>
        <li><a href="https://github.com/Kevin9227"><i class="fa fa-github-square" style="font-size:32px;color:#696969"></i></a></li>

</ul>
    <div class="outro" >
    <label for="seunome">Seu Nome</label>
    <input type="text" id="seunome" name="seunome" placeholder="Seu Nome..">

    <label for="menssagem">Menssagem</label>
    <textarea id="menssagem" name="menssagem" placeholder="Escreve aqui a sua mensagem..." style="height:200px"></textarea>
    <button onclick="enviamsg() " id="enviar"><a href="mailto:joaquimdecampos@outlook.com?subject=Visualizei o teu Portefólio">Enviar e-mail</a></button>
   
    </div>
  </div>
</div>
      `
}
var i = 0,
    nome = 'Hello I´M Joaquim de Campos',
    velocidade = 150

function escrever() {
    if (i < nome.length) {
        document.getElementById('Nome').innerHTML += `${nome.charAt(i)}`;
        i++;
        setTimeout(escrever, velocidade)
    }

}

function enviamsg(){
    nome =document.getElementById("seunome")
    msg = document.getElementById("menssagem")
   
    
}

function closeModal() {
    const modal = document.querySelector('.modal')
    //modal.style.display = "none"
    modal.style.height = "0";
};

function ver(){
    const xver ='';
    n
}
