<?php

require_once "database.php";


$query = "SELECT * FROM posts  order by id desc LIMIT 30";
$result = mysqli_query($conn, $query) or die(mysqli_error($conn));
$emparray = array();
while($row = mysqli_fetch_assoc($result)) {
    $emparray[] = $row;
}
echo json_encode($emparray);
?>   