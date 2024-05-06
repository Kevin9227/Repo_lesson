
 
/*document.onload(openCity(event,'Javascript'))

function activo(event,cityName){
 
  document.getElementById(cityName).style.display="block";
  evt.currentTarget.className += " active";
}

function openCity(event, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
    
}
 */
window.addEventListener('scroll', function() {
    // Verificar se a posição da rolagem é maior que 100 pixels
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 100) {
        // Faça algo quando a rolagem atingir mais de 100 pixels
     document.getElementById('red').style.position ="fixed";
    }else{
           document.getElementById('red').style.position ="relative";
    }
});
