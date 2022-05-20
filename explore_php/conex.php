<?php
$servername	=	"localhost";
$user	=	"root";
$pw		=	"";
$dbname	=	"lda";


	$conn = new mysqli($servername, $user, $pw, $dbname);
	// set the PDO error mode to exception
	
   /*  echo "Connected successfully"; */
   if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
  }
?>