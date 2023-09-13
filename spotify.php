<?php

getSongs();

function getSongs(){

    $client_id = "1859983958dd4c4eaa2184ce62ff44fa";
    $client_secret = "8508f4bd685340a990a2213dbb24a171";

    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, "https://accounts.spotify.com/api/token");
    curl_setopt($curl, CURLOPT_POST, 1);
    curl_setopt($curl, CURLOPT_POSTFIELDS, "grant_type=client_credentials");
    $headers = array("Authorization: Basic ".base64_encode($client_id.":".$client_secret));
    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $result = curl_exec($curl);
    //echo $result;
    curl_close($curl);
    
    $token = json_decode($result)->access_token;
    $query = ($_GET["q"]);

    $data = http_build_query(array("q" => $query, "type" => "artist"));
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, "https://api.spotify.com/v1/search?".$data);
    $headers = array("Authorization: Bearer ".$token);
    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $result = curl_exec($curl);

   /* echo $result;*/

    curl_close($curl);


    $artist_id = json_decode($result)->artists->items[0]->id;

    //echo $artist_id;

    $data = http_build_query(array( "market" => "ES"));
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, "https://api.spotify.com/v1/artists/".$artist_id."/top-tracks?".$data);
    $headers = array("Authorization: Bearer ".$token);
    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $result = curl_exec($curl);
    curl_close($curl);

    echo $result;

}
?>

