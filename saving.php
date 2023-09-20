<?php

require_once "database.php";
session_start();




$q = "SELECT id FROM users WHERE email = '".$_SESSION["email"]."'";
        $res = mysqli_query($conn, $q) or die(mysqli_error($conn));
        $row = mysqli_fetch_assoc($res);        
        $row["id"];

        mysqli_free_result($res);


        $id = $_GET["id"];

$query = "insert into saved(userId, postId) values('".$row["id"]."', '".$id."')";
          



$result = mysqli_query($conn, $query) or die(mysqli_error($conn));

        mysqli_free_result($result);
        mysqli_close($conn);

    
?> 