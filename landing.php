<?php

session_start();
if(isset($_SESSION["email"])){
    header("Location: index.php");
}

if(!empty($_POST["email"]) &&
!empty($_POST["password"])){
    $email = $_POST['email'];
    $password = $_POST['password'];

    require "database.php";

    $sql = "select * from users where email = '$email'";

    $result = mysqli_query($conn, $sql);

    $user = mysqli_fetch_array($result, MYSQLI_ASSOC);

    if($user){
       if(password_verify($password, $user['password'])){
           session_start();
          $_SESSION["email"] = $user["email"];
            print_r($_SESSION);
           header("Location:index.php");
           die();
       } else{
           echo "<span class='login-error'>Wrong password </span>";
       }

    }else{
        echo "<span class='login-error'>User not found</span>";
    }

} 


if (
    !empty($_POST["r_email"]) &&
    !empty($_POST["r_password"]) && !empty($_POST["repeat_password"])
){  


    $email = $_POST['r_email'];
    $password = $_POST['r_password'];
    $passwordRepeat = $_POST['repeat_password'];

    $passwordHash = password_hash($password, PASSWORD_DEFAULT);

    $error = array();



    if (empty($email)) {
        $error[] = "Email is required";
    }
    if (empty($password)) {
        $error[] = "Password is required";
    }
    if (empty($passwordRepeat)) {
        $error[] = "Repeat password is required";
    }

    if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
        array_push($error, "Email is not valid");
    }



    if(strlen($password)  < 8){
        array_push($error, "Password must be at least 8 characters");
    }

    if(strcmp($password, $passwordRepeat) != 0){
        array_push($error, "Passwords don't match");
    }
    require "database.php";
    $sql = "select * from users where email = '$email'";
    $result = mysqli_query($conn, $sql);
    $rowCount = mysqli_num_rows($result);

    if($rowCount > 0){
        array_push($error, "Email already in use");
    }


    if(count($error) > 0){
        foreach($error as $err){
            echo $err . "<br>";
        }
    } else{
        
        $sql = "INSERT INTO users (email, password) VALUES ( ?, ?)";
        $stmt = mysqli_stmt_init($conn);
        $prepare_stmt = mysqli_stmt_prepare($stmt, $sql);
        if($prepare_stmt){

// in questa funzione semplicemente faccio il binding col db e gli passo 3 stringhe per questo sss
            
            mysqli_stmt_bind_param($stmt, 'ss',  $email, $passwordHash);
            mysqli_stmt_execute($stmt);
            echo '<script> console.log("Registration successful"); </script>';
            header("Location: landing.php");
            exit;   
        } else{
            die("Error: " . mysqli_error($conn));
        }
    }


}
?>




<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link rel="stylesheet" href="index.css">
    <script src="landing.js" defer></script>
    
</head>
<body>
    <header>
    <h2 class="logo">Logo</h2>
    <nav class="navigation">
    <div class="dropDown"><ion-icon name="menu"></ion-icon></div>
    <div class="container">
        <a href="index.php">Feed</a>
        <a href="create.php">Create</a>
        <a href="#">Services</a>
        <a href="#">Contact</a>
        <button class="btnLogin-popup">Login</button>
        </div>
    </nav>
    </header>

    <?php

if(isset($error)){
    echo "<span class=error> . $error . </span>";
}

?>

    <div class="wrapper">
        <span class="icon-close"><ion-icon name="close">
        </ion-icon></span>
        
        <div class="form-box login">
            <h2>Login</h2>
            <form method="post" name="login">
                <div class="input-box">
                    <span class="icon"><ion-icon name="mail"></ion-icon></span>
                    <input type="text" required name="email">
                    <label>Email</label>
                    <small class="EL-err">Error Message</small>
                </div>
                <div class="input-box">
                    <span class="icon"><ion-icon name="lock-closed"></ion-icon></span>
                    <input type="password" required name="password">
                    <label>Password</label>
                    <small class="PL-err">Error Message</small>
                </div>
                <button type="submit" class="btn">Login</button>
                <small class="FL-err">Something went wrong</small>
                <div class="login-register">
                    <p>Don't have an account?<a href="#" class="register-link"> Register </a></p>
                </div>
            </form>
        </div>

        <div class="form-box register">
            <h2>Registration</h2>
            <form method="post" name = "registration">
                <div class="input-box">
                    <span class="icon"><ion-icon name="mail"></ion-icon></span>
                    <input type="text" required name="r_email">
                    <label>Email</label>
                    <small class="E-err">Error Message</small>
                </div>
                <div class="input-box">
                    <span class="icon"><ion-icon name="lock-closed"></ion-icon></span>
                    <input type="password" required name="r_password">
                    <label>Password</label>
                    <small class="P-err">Error Message</small>
                </div>
                <div class="input-box">
                    <span class="icon"><ion-icon name="lock-closed"></ion-icon></span>
                    <input type="password" required name="repeat_password">
                    <label>Repeat Password</label>
                    <small class="Rp-err">Error Message</small>
                </div>
                <button type="submit" class="btn-register">Register</button>
                <small class="F-err">Something went wrong</small>
                <div class="login-register">
                    <p>Already have an account?<a href="#" class="login-link"> Login </a></p>
                </div>
            </form>
        </div>
    </div>


    
<script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>


</body>
</html>