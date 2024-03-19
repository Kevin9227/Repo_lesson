function addAlert(msg){
    var elemento =`<div class="alert" id="avisoerro" >
    <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
    <strong>Danger!</strong>${msg}
  </div>`
  $("body").append(elemento);
}

function editar(id,ref, design, preco ){
    var elemento =`<div id="id02" class="modal_editar">
    <span onclick="recaregar()" class="close" title="Close Modal">&times;</span>
    <form class="modal-content-editar" action="/editar" method="post">
      <div class="container_editar">
        <h1>Editar Produto</h1>
        <hr>
        <input id="id" type="number" placeholder="id" name="id"  value='${id}'   style="display: none; >
        <label for="ref"><b>Referencia</b></label>
        <input id="ref" type="text" placeholder="Referência" name="ref"  value='${ref}'>
       
  
        <label for="design"><b>Designação</b></label>
        <input type="text" placeholder="Descrição" name="design" required value="${design} ">
  
        <label for="preco"><b>Preço</b></label>
        <input type="number" step="0.01" placeholder="Preço do Produto" name="preco" required value="${preco}">
 
        <div class="clearfix">
          <button type="button" onclick="recaregar()" class="cancelbtn">Cancel</button>
          <button type="submit" class="signupbtn">Gravar</button>
        </div>
      </div>
    </form>
  </div>`

  $("body").append(elemento);
  
  document.getElementById('id02').style.display='block'
  
}


function criar(  ){
    var elemento =`<div id="id02" class="modal_editar">
    <span onclick="recaregar()" class="close" title="Close Modal">&times;</span>
    <form class="modal-content-editar" action="/criar" method="post">
      <div class="container_editar">
        <h1>Criar novo Produto </h1>
        <p>Por favor Preenchas todos os campos...</p>
        <hr>
        <label for="ref"><b>Referencia</b></label>
        <input id="ref" type="text" placeholder="Referência" name="ref" required  >
        <label for="design"><b>Designação</b></label>
        <input type="text" placeholder="Descrição" name="design" required >
        <label for="preco"><b>Preço</b></label>
        <input type="number" step="0.01" placeholder="Preço do Produto" name="preco" required value="0.00">
        <div class="clearfix">
          <button type="button" onclick="recaregar()" class="cancelbtn">Cancel</button>
          <button type="submit" class="signupbtn">Gravar</button>
        </div>
      </div>
    </form>
  </div>`

  $("body").append(elemento);
  
  document.getElementById('id02').style.display='block'
  
}

function apagar(id){
    var elemento =`<div id="id01" class="modal">
    <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">&times;</span>
    <form class="modal-content-editar" action="/apagar" method="post">
    <input id="id" type="number" placeholder="id" name="id"  value='${id}'   style="display: none; >
      <div class="container">
        <h1>Excluir Produto</h1>
        <br>
        <p>Tem certeza de que deseja excluir este produto?</p>
        <br>
        <div class="clearfix">
          <button type="button" onclick="document.getElementById('id01').style.display='none'" class="cancelbtn">Cancel</button>
          <button type="submit" onclick="recaregar()" class="deletebtn">Delete</button>
        </div>
      </div>
    </form>
  </div>`

  $("body").append(elemento);
  document.getElementById('id01').style.display='block'
}

function recaregar() {
    document.getElementById('id02').style.display='none'
    alerta()
    location.reload();
};




var btn_editar = document.getElementById('btn_editar')

function alerta(){
    let elemento =`
    <div class="alert" id="id03">
  <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
  <strong>Danger!</strong> Produto criado com Sucesso....
</div>`
     $("body").append(elemento);
   document.getElementById('id03').style.display='block'
}



function filtrar() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myinput");
  filter = input.value.toUpperCase();
  table = document.getElementById("mytb");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}
 