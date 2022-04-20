//const jason = require("jason")
var img = document.querySelector("img"),nm=document.getElementById("nome"), br=document.getElementById("mbusca");

 
async function pegar(){
    const url ='https://api.github.com/users/'+br.value
    const response = await fetch(url)
    .then(response => response.json())
    .then(json => {
        if(json.name ===undefined){
            alert("Perfil não encontrado...")
            return false
        }else{
            img.setAttribute("src",json.avatar_url)
                    nm.innerHTML=json.name,
                    document.getElementById("descri").innerText=json.bio

        }
        
                    //A API TEM LIMITE DE ACESSO DE DADOS
    } )
    .catch(Error , console.log("Erro"))

}

const icone = document.querySelector('.icone');
        const barra = document.querySelector('.busca');
        icone.onclick = function(){
            barra.classList.toggle('active')
        }
