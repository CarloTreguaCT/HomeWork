<?php

session_start();
if(!isset($_SESSION["email"])){
    header("Location: landing.php");
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link rel="stylesheet" href="index.css">
    <link rel="stylesheet" href="feed.css">
    <script src="index.js" defer></script>
    <script src="saved.js" defer></script>
    
</head>
<body>
    <header>
    <h2 class='email'><?php echo $_SESSION["email"];?>
    </h2>

    <nav class="navigation">
        <div class="dropDown"><ion-icon name="menu"></ion-icon></div>
        <div class="container">
        <a href="index.php">Feed</a>
        <a href="create.php">Create</a>
        <a href="profile.php">Profile</a>
        <a href="saved.php">Saved</a>
        <button class="btnLogin-popup">Logout</button>
        </div>
    </nav>
    </header>
    



<script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
</body>
</html>