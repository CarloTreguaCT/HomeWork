<?php

require_once "database.php";
session_start();


$q = "SELECT id FROM users WHERE email = '".$_SESSION["email"]."'";
        $res = mysqli_query($conn, $q) or die(mysqli_error($conn));
        $row = mysqli_fetch_assoc($res);        
        $row["id"];

        mysqli_free_result($res);


$query = "select p.img, p.sound from posts p 
          join saved s on p.id = s.postId
          where s.userId = '".$row["id"]."'";
          
$result = mysqli_query($conn, $query) or die(mysqli_error($conn));


    $emparray = array();
    while($row = mysqli_fetch_assoc($result)) {
        $emparray[] = $row;
    }

    echo json_encode($emparray);

    mysqli_free_result($result);
    mysqli_close($conn);


    
?>   