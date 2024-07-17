 

// Obtém o botão e o modal
const openModalBtn = document.getElementById('openModalBtn');
const modal = document.getElementById('modal');

// Quando o botão é clicado, mostra o modal
openModalBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});

// Quando o usuário clica no 'x', fecha o modal
document.getElementsByClassName('close')[0].addEventListener('click', () => {
  modal.style.display = 'none';
});

// Fecha o modal se o usuário clicar fora da área do modal
window.addEventListener('click', (event) => {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
});


function myFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function mostrarPessoa(){
    
}