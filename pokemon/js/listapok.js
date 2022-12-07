

let test = [1,2,3,4,5]
test.forEach(nu =>{
    console.log(nu)
})

'https://pokeapi.co/api/v2/pokemon?limit=9&offset=0';
 let teste =[]
 let i=0
async function pegar() {
    const newLocal = "https://pokeapi.co/api/v2/pokemon/"
    const url = newLocal
    const response = await fetch(url)
        .then(response => response.json())
        //.then(json => console.log(json))
        .then(json =>  json.results.forEach(Element =>{
            console.log(Element)
            i++
            document.querySelector(".card_content").innerHTML +=`
            <div class="card"  onclick="">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i}.svg" alt=""  id="img">
            <div class="content">
                <h3>${Element.name}</h3>
            </div>
        </div>             ` }))
       
        

        
        

        .catch(Error, console.log("Falou a requisição "))
}

pegar()