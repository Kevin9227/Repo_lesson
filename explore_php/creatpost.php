<!DOCTYPE html>
<html lang="pt">
<head>
	<meta charset="UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link href="css/master.css" rel="stylesheet" />
	<title>Document</title>
</head>
<div><body>
	<header>
		<nav>
			<ul>
				<li>
					<a href="index.php">Home</a>
				</li>
				<li>
					<a href="postagem.php">Postagem</a>
				</li>
				<li>
					<a href="contacto.html">Contactos</a>
				</li>
			</ul>
		</nav>
	</header>

	<section>
		<form action="creatpost.php" method="post">
			
				<div class="forme">
					Nome: <input type="text" name="nome" value="" />
					Texto: <textarea name="texto" value="" max="250"></textarea>
					Autor: <select name="autor" id=""  >
            <option value="Joaquim de Campos">Joaquim de Campos</option>
            <option value="Joao Costa">Joao Costa</option>
            <option value="Graca Namuena">Graca Namuena</option>
					
        </select>
					Data:<input type="date" name="data_post" value="" />
					imagem: <input type="file" name="img" value="" />

				</div>
				
					<button type="submit">Enviar</button>
</form> 
	</section>


	<footer>
		<center>
			<ul>
				<li>
					<a href="#">Facebook</a>
				</li>
				<li>
					<a href="#">Youtube</a>
				</li>
				<li>
					<a href="#">Instagram</a>
				</li>
			</ul>
		</center>
	</footer>
	

	<?php
	include("conex.php");

	$nome = $_POST["nome"] ;
	$texto =  $_POST["texto"];
	$autor = $_POST["autor"];
	$datapost = $_POST["data_post"];
	$img = $_POST["img"];
		
	if (!isset($nome)) {
        return;
		
	}else{
		if(empty($nome) || empty($texto)){
			echo "Por favor Preechas os campos todos...";
			exit;
		}
	}
		echo $nome. "<br>";
		echo $texto. "<br>";
		echo $autor. "<br>";
		echo $datapost. "<br>";
		echo $img. "<br>";

		
		$sql	=	"INSERT INTO post(nome,texto,autor, data_post,imgpath)  VALUES ('$nome','$texto','$autor','$datapost','$img')";
		$msql	=	$conn->prepare($sql);
		
		/* $msql->bindParam(':nome',$nome);
		$msql->bindParam(':texto',$texto);
		$msql->bindParam(':autor',$autor);
		$msql->bindParam(':data_post',$datapost);
		$msql->bindParam(':img',$img);
 */	if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}
		/* if($msql->exec())){
		header('Location: index.php?msg=sucesso');
		}else{
			echo "Erro a criar postagem";
			print_r($msql->errorInfo());
			} */


    ?>
	<script>
       var doc= ''
       // alert(doc)
	</script>
</body></div>
</html>