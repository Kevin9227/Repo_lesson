<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="css/master.css" rel="stylesheet" />
    <title>Document</title>
</head>
<body>
	<header>
		<nav>
			<ul>
				<li>
					<a href="index.html">Home</a>
				</li>
				<li>
					<a href="postagem.php">Postagem</a>
				</li>
				<li>
					<a href="contacto.html">Contactos</a>
				</li>
				<li>
					<a href="creatpost.php">Criar Post</a>
				</li>
			</ul>
		</nav>
	</header>

    <section>
		<div class="postagem">
			<div class="lista">
				<div class="card">
					<img src="#" alt="Alternate Text" />
					<div class="content">
						<h3>Nome</h3>
						<p>Data</p>
					</div>
					<p>lorem</p>
				</div>
			</div>

		</div>
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
    <!--<form action="index.php" method="get">
        <select name="escolhe" id=""  >
            <option value="Luanda">Luanda</option>
            <option value="Bengo">Bengo</option>
            <option value="Benguela">Benguela</option>
        </select>
        <button type="submit">Enviar</button>
    </form> -->

    <?php
	include("conex.php");

        if (!empty($_REQUEST["escolhe"])) {
        echo "Provincia escolhida foi ". $_REQUEST["escolhe"];
        }
    ?>
    <script>
       var doc= '<?php    echo "Provincia escolhida foi ". $_REQUEST["escolhe"];    ?>'
        alert(doc)
    </script>
</body>
</html>