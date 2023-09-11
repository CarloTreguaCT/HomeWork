
<?php

    $conn = mysqli_connect("localhost", "root", "", "login_register");
    $query = "SELECT * FROM POSTS";
    $res = mysqli_query($conn, $query);
    $num_rows = mysqli_num_rows($res);

     

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

     /*
     crear selector de imagenes con unsplash y selector de sonidos con spotify, utilizar oauth2 para la obtencion de datos de 
     spotify haciendo la API con php y la API de unsplash con js*/

?>