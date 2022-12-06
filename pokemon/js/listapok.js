

let test = [1,2,3,4,5]
test.forEach(nu =>{
    console.log(nu)
})

'https://pokeapi.co/api/v2/pokemon?limit=9&offset=0';
 let teste =[]
async function pegar() {
    const newLocal = "https://pokeapi.co/api/v2/pokemon/"
    const url = newLocal
    const response = await fetch(url)
        .then(response => response.json())
        //.then(json => console.log(json))
        .then(json =>  json.results.forEach(Element =>{
            document.querySelector(".card").innerHTML +=`
            <div class="card"  onclick="">
            <img src="${Element.url}" alt=""  id="img">
            <div class="content">
                <h3>${Element.name}</h3>
            </div>
        </div>             ` }))
       
        

        
        

        .catch(Error, console.log("Falou a requisição "))
}

pegar()