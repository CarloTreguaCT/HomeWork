<?php

require_once 'database.php';

header('Content-Type: application/json');

getImages();


function getImages(){

$key = 'yj6h-nqKoExRVMkaKunxh1Lj6uSIn2q2qOXhCtdM70c';
$query = $_GET["q"];
$url = 'https://api.unsplash.com/search/photos/?client_id=yj6h-nqKoExRVMkaKunxh1Lj6uSIn2q2qOXhCtdM70c&query='.$query;
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$res = curl_exec($ch);
curl_close($ch);

echo $res;
}

?>