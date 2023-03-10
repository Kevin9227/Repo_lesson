var projecto = [{nome_proje:'Pesquisador de Perfil do GitHub',imagem:'img/perfilGitHub.PNG', descri:'O projeto feito em HTML,CSS e JAVASCRIPT que visa buscar perfis existentes no GitHub.   Projeto feito com objetivo de praticar API do GitHub.',link:'https://kevin9227.github.io/Repo_lesson/perfilGitHub/'}

,{nome_proje:'Bloco de anotações',imagem:'../img/Notas.PNG',descri:'O projeto feito em HTML,CSS e JAVASCRIPT, que visou o estudo da função "localStorage" com fins de praticar. ',link:'https://kevin9227.github.io/Repo_lesson/Notas/'}

,{nome_proje:'Pokémon Web',imagem:'../img/pokemon.PNG',descri:'O presente projeto visa a criação de um Web Site que na qual lista os Pokémon disponível na API. O site esta a ser desenvolvido com as tec HTML,CSS e JAVASCRIPT. ',link:'https://kevin9227.github.io/Repo_lesson/pokemon/'}
,{nome_proje:'Desaparecidos S.O.S',imagem:'../img/desaparecidos.PNG',descri:'O presente projeto visa a criação de um Web Site que na qual irá constar todos os desaparecidos relatados a nível nacional, todos os familiares que pretenderem relatar o desaparecimento de um membro da sua família poderá faze-lo na plataforma.  O site esta a ser desenvolvido com as tec HTML,CSS e JAVASCRIPT de inicio.',link:'https://kevin9227.github.io/Repo_lesson/desaparecidos/'}
]
var div = document.createElement('div')



function myFunction(x) {
    //x.classList.toggle("change");
    openNav()
  }

  function openNav() {
    document.getElementById("painelLateral").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("painelLateral").style.width = "0";
  }
  var teste = document.querySelector('.painelLateral')

  function xprojecto(){
    
    const modal =document.querySelector('.modal')
    modal.appendChild(div)
    div.classList.add('teste')
   // modal.classList.add('Modal')
    modal.style.display = "grid"
    modal.style.justifyContent = "center"

    for (i = 0; i<= projecto.length; ++i){
      projecto[i].nome_proje
      div.innerHTML += ` 
    <div class="xcontainer">
  <div class="ycontent ">
 <a href="${projecto[i].link}"> <img src="${projecto[i].imagem}" alt="Notebook" style="width:100%;"></a>
    <h1>${projecto[i].nome_proje}</h1>
    <p>${projecto[i].descri}</p>
  </div>
</div>

      
      `
    }

  }

  function closeModal(){
    const modal =document.querySelector('.modal')
    modal.style.display = "none"
  }

