var ativo = document.getElementById("area"),bg=[],titulo=[],filmes=[{}]

document.getElementById("btn").addEventListener('click',()=>{
    ativo.removeAttribute("id","area-activo")
document.getElementById("rig").style.display="none" 
document.getElementById("rig").style.transition="0.6s ease"
})

// GET API MOVIES
async function pegar() {
    const newLocal = "https://api.themoviedb.org/4/list/2?api_key=0d322279f690c939ec9f74afd2962df4"
    const url = newLocal
    const response = await fetch(url)
        .then(response => response.json())
     //  .then(json => console.log(json.results))
        .then(json =>{ for(i=0; i<=json.results.length; i++){
                bg[i]=json.results[i].poster_path
                titulo[i]=json.results[i].original_title
                filmes=json
                document.querySelector(".list-card").innerHTML +=`
                <div class="card"  onclick="mostrar(${i})">
                <img src="https://image.tmdb.org/t/p/original/${json.results[i].poster_path}" alt=""  id="img">
                <div class="content">
                    <h3>${json.results[i].original_title}</h3>
                </div>
            </div>             `
            }
           
        
    }
             )
        
        

        .catch(Error, console.log("Falou a requisição "))
}

function mostrar(id){
    let conteudo = id;
    document.getElementById("modal").innerHTML =` <p class="close" onclick="fechar()">&times;</p>
     <div class="sobre"> 
    <img src="https://image.tmdb.org/t/p/original/${bg[id]}" alt="" width="250"> <h1>${titulo[id]}</h1></div> ` 
    document.getElementById("modal").style.display ="flex"
    //document.getElementById("area").style.display ="none"
    document.querySelector('body').style.backgroundPosition='center'
   
 //   document.querySelector('body').style.background='url(+'")'
    console.log(id)
}

// When the user clicks on <span> (x), close the modal
function fechar(){
    document.getElementById("modal").style.display ="none"

}
pegar()