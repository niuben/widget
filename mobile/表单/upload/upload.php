<?php
// if ($_FILES["image"]["error"] > 0){
//   	echo "Error: " . $_FILES["image"]["error"] . "<br />";
// }else{
//   	move_uploaded_file($_FILES["image"]["tmp_name"], "file/". $_FILES["image"]["name"]);
//   	// header("Location:".$_GET["res"]);
// }
	echo "filename".$_SERVER["HTTP_FILENAME"];
	$fn = (isset($_SERVER['HTTP_FILENAME']) ? $_SERVER['HTTP_FILENAME'] : false);
	if ($fn) {
		$file = file_get_contents("php://input");
		$size = strlen($file);
	    file_put_contents('file/' . $fn, $file);

	    echo $size;
	    echo $_POST["imgDate"];
	    echo "localhost/person/uploads/$fn";
	    exit();

	    // if(is_dir("../upload"))
	}
?>