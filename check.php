<?php

require_once "database.php";

if(isset($_GET["e"])){

    header('Content-type: application/json');

    $conn = mysqli_connect("localhost", "root", "", "login_register");
    $email = mysqli_real_escape_string($conn, $_GET["e"]);
    $query = "SELECT * FROM users WHERE email = '$email'";
    $res = mysqli_query($conn, $query) or die(mysqli_error($conn));
    echo json_encode(array('exists' => mysqli_num_rows($res) > 0 ? true : false));
    mysqli_close($conn);
    exit;
}

?>