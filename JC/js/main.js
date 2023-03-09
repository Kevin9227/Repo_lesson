var projecto = ''
var div = document.createElement('div')



function myFunction(x) {
    //x.classList.toggle("change");
    openNav()
  }

  function openNav() {
    document.getElementById("mySidepanel").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
  }
  var teste = document.querySelector('.mySidepanel')

  function xprojecto(){
    const modal =document.querySelector('.modal')

    modal.appendChild(div)
    div.classList.add('teste')
   // modal.classList.add('Modal')
    modal.style.display = "grid"
    modal.style.justifyContent = "center"

  }