
let test = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
test.forEach(nu =>{
    //console.log(nu)
})

'https://pokeapi.co/api/v2/pokemon?limit=9&offset=0';
 let teste =[], pag_atual=1,pag_total=0,pag_resumo=5
 let i=0
async function pegar() {
    const newLocal = "https://pokeapi.co/api/v2/pokemon/"
    const url = newLocal
    const response = await fetch(url)
        .then(response => response.json())
       // .then(json => console.log(json.results.length))
        .then(json =>  json.results.map(Elementos =>{
            //console.log(Element)
            teste.push(Elementos)
            pag_total =teste.length
            i++ 
            document.querySelector(".card_position").innerHTML +=`
            <div class="card"  onclick="">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i}.svg" alt=""  id="img">
            <div class="content">
                <h3>${Elementos.name}</h3>
            </div>
        </div> ` }))
        .catch(Error, console.log("Falou a requisição "))
}
async function fetchData() {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
      const data = await response.json();
      // processar os dados

      teste.push(data)
    } catch (error) {
      // tratar o erro
    }

    
  }
  
 
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
function irpag(pag){
    pag_atual =pag
    console.log(pag_atual)
    paginas()
}

//paginas()
//pag_list()
//fetchData();

pegar()

// Definindo a data do seu aniversário
 const aniversario = new Date('2023-10-27');

// Obtendo a data atual
const hoje = new Date();

// Calculando a diferença entre as datas em milissegundos
const diferenca = aniversario - hoje;

// Convertendo a diferença em dias e horas
const diasFaltando = Math.floor(diferenca / (1000 * 60 * 60 * 24));
const horasFaltando = Math.floor((diasFaltando ) * 24);
const minutos = Math.floor((horasFaltando ) / 60)

// Imprimindo o resultado
console.log(`Faltam ${diasFaltando} dias e ${horasFaltando} horas e ${minutos} para o seu aniversário!`); 