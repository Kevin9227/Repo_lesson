//const jason = require("jason")

const url ='https://api.github.com/users/kevin9227'
 var img = document.querySelector("img")
async function pegar(){
    const response = await fetch(url)
    .then(response => response.json())
    .then(json => img.setAttribute("src","src="+json.url).replace)
    .catch(Error , console.log("Erro"))
   

}

pegar()