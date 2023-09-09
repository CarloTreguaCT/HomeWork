logout = document.querySelector('.btnLogin-popup');
logout.addEventListener('click', () => {
    window.location.href = "logout.php";
})


document.querySelector('.dropDown').addEventListener('click', () => {
    const container = document.querySelector('.container');
    container.classList.toggle('visible');
  });
