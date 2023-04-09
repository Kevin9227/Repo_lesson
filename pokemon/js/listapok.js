
//SETAR VARIAVES GLOBAIS 
var lista_item  =[]
var pag_atual   =1
var pag_total   =20
var pag_resumo  =6
var teste       =[]
 let i          = 0
 var numb =0
//'https://pokeapi.co/api/v2/pokemon?limit=9&offset=0';



// OBTER DADOS da API Modelo 1 para analise.
async function pegar() {
    const newLocal = "https://pokeapi.co/api/v2/pokemon/"
    const url = newLocal
    const response = await fetch(url)
        .then(response => response.json())
       // .then(json => console.log(json.results.length))
        .then(json =>  json.results.map(function(Elementos,xid){
            //console.log(Element)
            i++
           
            teste.push({i:{Nome:Elementos.name, Url:Elementos.url}})
            //console.log(teste)
          numb=Elementos.url.slice(34,Elementos.url.length-1)
           
            document.querySelector(".card_position").innerHTML +=`
            <div class="card"  onclick="abrirCard(${numb},${xid},'${Elementos.name}')">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${numb}.svg" alt=""  id="img">
            <div class="content">
                <h3>${Elementos.name}</h3>
            </div>
        </div> 
       
       ` }))
        .catch(Error, console.log("Falou a requisição "))
        pag_list()
}

 async function abrirCard(idPoken, xid,nome){
    
    
     
    const newLocal = " https://pokeapi.co/api/v2/ability/"+(xid+1)
    const url = newLocal
    const response = await fetch(url)
        .then(response => response.json())
        .then(json =>   teste=json)/*  forEach((element) => {
            habilidade= element.name
            descri =element
        })) */
        
        const modal = document.querySelector('.modal')
        const cmodal =document.querySelector(".card_modal")
        //modal.style.display = "none"
        modal.style.width = "100%";
        cmodal.innerHTML =`
        <div class="card2">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${idPoken}.svg" alt=""  id="img" style="width:100%"> 
  <h1>Habilidade: ${teste.name}</h1>
  <p class="title">${teste.effect_entries[0].effect}</p>
  <p>${nome}</p>
  <a href="#"><i class="fa fa-dribbble"></i></a>
  <a href="#"><i class="fa fa-twitter"></i></a>
  <a href="#"><i class="fa fa-linkedin"></i></a>
  <a href="#"><i class="fa fa-facebook"></i></a>
  
        </div>

         `
   
}
 function fecharModal(){
    const modal = document.querySelector('.modal')
    modal.style.width="0%";
 }
//OBETER DADOS da API Modelo 2 para a segunda listagem
async function fetchData() {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/gender/1');
      const data = await response.json();
      // processar os dados
      
       document.querySelector(".card_position").innerHTML ="";
        for(i=1; i<10; i++){
           console.log( data.pokemon_species_details[i]) 
           document.querySelector(".card_position").innerHTML += `
      <div class="card" >
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${100+i}.svg" alt=""  id="img">
      <div class="content">
          <h3>${data.pokemon_species_details[i].pokemon_species.name}</h3>
      </div
      })
      >
  </div>
   `
        }

                     //console.log(data)
      //teste.push(data)
    } catch (error) {
      // tratar o erro
      alert("erro.. Novas alterações ")
    }
}


    
// MODO DE PAGINAÇÃO sobre as listas 
 
function paginas(){
    const i=0
    const xdados  = teste
    const inicio =(pag_atual - 1) *  pag_resumo;
    const finalindex = inicio +pag_resumo;
    const pag_data = teste.slice(inicio,finalindex)
        console.log(pag_data)
        pag_data.map(poke=>{
            i++
            document.querySelector(".card_position").innerHTML +=`
           
            <div class="card"  onclick="">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i}.svg" alt=""  id="img">
            <div class="content">
                <h3>${poke.name}</h3>
            </div>
        </div> 
        ` 
        })

}

// CRIAR BOTÃO PARA RETORNO DA NUMERAÇÃO / LISTA
function pag_list(){
    const xconteudo = teste
    const pag_uda =Math.ceil(xconteudo.length/ pag_resumo)
    console.log(pag_uda)
        for(i=1; i<=pag_uda; i++){
         document.querySelector(".pag").innerHTML +=`
        <button onclick="irpag(${i})">${i}</button>
        
        `
        }
       


}

// MOSTAR PAGINAÇÃO E CHAMAR A PAGINA ATUALIA OBS: ACHAR UMA MANEIRA DE MUDAR A PAGINA E NÃO INCREMENTAÇÃO.
function irpag(pag){
    pag_atual =pag
    console.log(pag_atual)
    paginas()
}

//paginas()
//pag_list()
//fetchData();

pegar()



const USER_MAP = { 1: {name: "Josuildo"}, 2: {name: "Sally"},}

const userMap = new Map([[1,{name:"Kyle"}], [2,{name:"Sally"}]]    )   


console.log(USER_MAP)
//userMap.set({userId: 1 }, {name: "João"})  
