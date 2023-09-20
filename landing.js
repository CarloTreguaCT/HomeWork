//DINAMICA DEI FORM

const wrapper = document.querySelector(".wrapper");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link");
const login = document.querySelector(".btnLogin-popup");
const iconClose = document.querySelector(".icon-close");



document.querySelector('.dropDown').addEventListener('click', () => {
    const container = document.querySelector('.container');
    container.classList.toggle('visible');

  });







registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
})

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
    
})



login.addEventListener('click', () => {
    wrapper.classList.add('present');
    const container = document.querySelector('.container');
    container.classList.remove('visible');
    const Lerror = document.querySelector('.login-error');
    Lerror.classList.add('invisible');
})



iconClose.addEventListener('click', () => {
    wrapper.classList.remove('present');
    const container = document.querySelector('.container');
    container.classList.add('visible');
})


// CONTROLLO REGISTRAZIONE E LOGIN

let Check ={
    email: false,
    password: false,
    rPassword: false
}

let lCheck = {
    email: false,
    password: false
}


function submitLCheck(event){
    let fCheck = 0;
    const Flerr = document.querySelector('.FL-err');
    for (let c in lCheck){
        if(lCheck[c] === true){
            fCheck++;
        }

        if (fCheck === 2){
            Flerr.style.visibility = "visible";
            Flerr.style.color = "#162938";
            Flerr.textContent = "Welcome";
        } else{
            Flerr.style.visibility = "visible";
            Flerr.style.color = "red";
            Flerr.textContent = "Something went wrong";
        }
    }
    
}

function submitCheck(event){
    let fCheck = 0;
    for (let c in Check){
        if(Check[c] === true){
            fCheck++;
        }
    }
    if(fCheck === 3){
        document.querySelector('.F-err').style.visibility = "visible";
        document.querySelector('.F-err').textContent = "All fields are Valid";
        document.querySelector('.F-err').style.color = "#162938";
    } else{
        document.querySelector('.F-err').style.visibility = "visible";
        event.preventDefault();
    }



}



function jsonCheckEmail(json){
    if(!json.exists){
        document.querySelector('.E-err').style.visibility = "visible";
        document.querySelector('.E-err').textContent = "This email is Valid";
        document.querySelector('.E-err').style.color = "green";
        Check.email = true;
    } else{
        document.querySelector('.E-err').style.color = "red";
        document.querySelector('.E-err').textContent = "Email in uso";
        Check.email = false;
    }
}


function jsonCheckLEmail(json){
    if(json.exists){
        document.querySelector('.EL-err').style.visibility = "visible";
        document.querySelector('.EL-err').textContent = "This Email is Valid";
        document.querySelector('.EL-err').style.color = "green";
        lCheck.email = true;
    }else{
        document.querySelector('.EL-err').style.color = "red";
        document.querySelector('.EL-err').textContent = "This Email is not Registered";
        lCheck.email = false;
    }
}


function fetchResponse(response){
    return (response.ok ? response.json() : null);
}
function CheckEmail(event){
    const email = document.querySelector('input[name="r_email"]');
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(email.value).toLowerCase()))
    {
        document.querySelector('.E-err').style.visibility = "visible";
        document.querySelector('.E-err').textContent = "Please enter a valid E-mail";
        Check.email = false;
    }
    else{
        fetch("check.php?e=" + encodeURIComponent(String(email.value)).toLowerCase()).then(fetchResponse).then(jsonCheckEmail);
       
    }
}

function CheckLEmail(event){
    const email = document.querySelector('input[name="email"]');
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(email.value).toLowerCase()))
    {
        document.querySelector('.EL-err').style.visibility = "visible";
        document.querySelector('.EL-err').textContent = "Please enter a valid E-mail";
        Check.email = false;
    }
    else{
        fetch("check.php?e=" + encodeURIComponent(String(email.value)).toLowerCase()).then(fetchResponse).then(jsonCheckLEmail);
       
    }
}


function CheckPassword(event){
    const password = document.querySelector('input[name="r_password"]');
    const Perr = document.querySelector('.P-err');
    if(password.value.length < 8){
        
        Perr.style.visibility = "visible";
        Perr.textContent = "Password must be at least 8 characters";
        Check.password = false;
    } else{
        Perr.style.visibility = "hidden";
        Check.password = true;
        
    }
}

function CheckLPassword(event){
    const password = document.querySelector('input[name="password"]');
    const Perr = document.querySelector('.PL-err');
    if(password.value.length < 8){
        
        Perr.style.visibility = "visible";
        Perr.textContent = "Password must be at least 8 characters";
        lCheck.password = false;
    } else{
        Perr.style.visibility = "hidden";
        lCheck.password = true;
    }
}



function CheckRepeatPassword(event){
    const rPassword = document.querySelector('input[name="repeat_password"]');
    const password = document.querySelector('input[name="r_password"]');
    const Rperr = document.querySelector('.Rp-err');
    if (password.value !== rPassword.value){
        Rperr.style.visibility = "visible";
        Rperr.textContent = "Passwords do not match";
        Check.rPassword = false;
    } else{
        Rperr.style.visibility = "hidden";
        Check.rPassword = true;
    }
}


document.forms['login'].addEventListener('submit', submitLCheck);
document.forms['registration'].addEventListener('submit', submitCheck);
document.querySelector('input[name="email"]').addEventListener('blur', CheckLEmail);
document.querySelector('input[name="password"]').addEventListener('blur', CheckLPassword);
document.querySelector('input[name="r_email"]').addEventListener('blur', CheckEmail);
document.querySelector('input[name="r_password"]').addEventListener('blur', CheckPassword);
document.querySelector('input[name="repeat_password').addEventListener('blur', CheckRepeatPassword);