

<?php 
    include("conex.php");
$id=$_GET["fname"];
    $sql = "SELECT * FROM post where id=".$id;
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
	  // output data of each row
	 
	  while($row = $result->fetch_assoc()) {
			echo $row["nome"]."<br>";
			echo  $row["texto"]."<br>";
			echo  $row["data_post"]."<br>";
			echo  $row["autor"]."<br>"  ;
			 
		}
		
	}else{
		echo "0 Resultados ";
	}
   $conn->close();

?>
