//const jason = require("jason")
var img = document.querySelector("img"),nm=document.querySelector("p"), br=document.getElementById("buscar");

 
async function pegar(){
    const url ='https://api.github.com/users/'+br.value
    const response = await fetch(url)
    .then(response => response.json())
    .then(json => {img.setAttribute("src",json.avatar_url)
                    nm.innerHTML=json.name,
                    document.querySelector(".descricao").children[0].innerText=json.bio
    } )
    .catch(Error , console.log("Erro"))
   

}

