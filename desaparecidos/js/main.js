pessoa = [{

        "id": 1,
        "nome": "Catarina Miguél",
        "idade": 22,
        "provincia": "Luanda",
        "morada": "Cacuaco",
        "bairro": "Nova urbanização",
        "estado": false,
        "dtdesaparecimento": "01/01/2000"

    },
    {
        "id": 2,
        "nome": "Manuel Mendes",
        "idade": 23,
        "provincia": "Luanda",
        "morada": "Cazenga",
        "bairro": "Nova urbanização",
        "estado": false,
        "dtdesaparecimento": "01/01/2000",

},
    {
        "id": 3,
        "nome": "Joana Lina",
        "idade": 23,
        "provincia": "Luanda",
        "morada": "Cazenga",
        "bairro": "Nova urbanização",
        "estado": false,
        "dtdesaparecimento": "01/01/2000",

}
          ,
    {
        "id": 4,
        "nome": "Luiza Cadeth",
        "idade": 23,
        "provincia": "Luanda",
        "morada": "Calemba 2",
        "bairro": "Nova urbanização",
        "estado": false,
        "dtdesaparecimento": "01/01/2000",

}
];

async function lista() {
    let listadesa = document.getElementById("lista-desa")
    for (i = 0; i <= pessoa.length; i++) {
        listadesa.innerHTML += `<div class="card c2" >
                       <a href="pessoa.html" onclick="pessoa(${this})"> <img src="img/img${i}.jpg" alt="" style="width: 100%"></a>
                        <div class="card-content">
                            <h3 id="nome">${pessoa[i].nome}</h3>
                            <p id="local">${pessoa[i].provincia} & ${pessoa[i].bairro}</p>
                        </div>
                        <p id="descricao">
                            Desapareceu na Data : ${pessoa[i].dtdesaparecimento}
                        </p>
                    </div>`
    }
}
window.onload = () => {
    lista()
}

function pessoa(id) {
    let listadesa = document.getElementById("unica")
    listadesa.innerHTML = `<div class="card c2" >
                        <img src="img/img${id}.jpg" alt="" style="width: 100%">
                        <div class="card-content">
                            <h3 id="nome">${pessoa[id].nome}</h3>
                            <p id="local">${pessoa[id].provincia} & ${pessoa[id].bairro}</p>
                        </div>
                        <p id="descricao">
                            Desapareceu na Data : ${pessoa[id].dtdesaparecimento}
                        </p>
                    </div>`
}

function myFunction() {
    var x = document.getElementById("myAnchor").lang;
    if (x == 'pt-pt') {
        alert("deseja Traduzir a pagina ?")
        document.getElementById("demo").innerHTML = x;

    }
}

window.onscroll = () => {
    rolar()
}

function rolar() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("navbarr").classList.add("navbarr", "activo")


    } else {
        document.getElementById("navbarr").classList.remove("navbarr", "activo")

    }
}
async function getdados() {
    const url = "http://192.168.43.32:81/db";
    const response = await fetch(url)

        .then(response => response.json())
        .then(json => console.log(json))
        .catch(Error, console.log("Falou a requisição "))
}
getdados()
let xhr = new XMLHttpRequest();
xhr.open("POST", "http://localhost:81/db");

xhr.setRequestHeader("Acecept", "spplication/json");
xhr.onload = () => console.log(xhr.responseText);
let dados = `{
"id": 3,
"nome": "teste",
"idade": 22,
"provincia": "Luanda",
"morada": "Cacuaco",
"bairro": "Nova urbanização"
}
`

xhr.send(dados);
