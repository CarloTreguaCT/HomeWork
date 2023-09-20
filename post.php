
<?php

require_once "database.php";


    if(isset($_POST)){
    


        $data = file_get_contents("php://input");
        $creation = json_decode($data, true);
        $image = $creation["image"];
        $sound = $creation["sound"];
        $id = $creation["id"];
        
/*
        $q = "SELECT id FROM users WHERE email = '".$_SESSION["email"]."'";
        $res = mysqli_query($conn, $q) or die(mysqli_error($conn));
        $row = mysqli_fetch_assoc($res);        
        $author = $row;*/
          
        
        $query = "INSERT INTO posts (user_id, img, sound) VALUES ('$id', '$image','$sound')";
        $result = mysqli_query($conn, $query) or die(mysqli_error($conn));
        
        

        
        
    }

     

    /* Lettura risultato avviene attraverso qualsiasi dei seguenti 
    tre comandi (ritornano solo una riga, per 
    iterare l'intero result è necessario un ciclo):
    -$row = mysqli_fetch_assoc($conn, $res);
        - ritorna ciascuna riga  come array a indici numerici row[0], row[1], ...

    -$row = mysqli_fetch_row($conn, $res);
        - ritorna ciascuna riga come array associativo
    
    -$row = mysqli_fetch_object($conn, $res);
        - ritorna ciascuna riga come oggetto

    mysqli_real_escape_string($conn, $str);
        - evita sql injection
        - riceve una stringa in ingresso e ne 
        realizza l'escape dei caratteri


    al termine delle operazioni è buona pratica liberare le risorse
    non più necessarie:

    mysqli_free_result($res);
    mysqli_close($conn);


     */

    

?>