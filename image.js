function search(event){
    event.preventDefault();
    const input = document.querySelector('.post-input');
    console.log(input.value);
    fetch("unsplash.php?q="+encodeURIComponent(input.value)).then(fetchResponse).then(jsonSearch);
}


function jsonSearch(json){
    
    console.log("JSON ricevuto");

    const post = document.querySelector('.image-container');
    const container = document.querySelector('.selection-container');
    const proceed = document.querySelector('.btn-continue');

    post.style.visibility = "visible";
    proceed.style.visibility = "visible";
    
    post.innerHTML = "";
    
    let num_results = json.total;
    console.log(num_results);

    if(num_results < 1){
        const error = document.createElement('h3');
        error.textContent = "No results found";
        error.classList.add('error');
        post.appendChild(error);
        container.removeChild(proceed);
    }
    
    for(let i = 0; i < 5; i++){
        const image = document.createElement('img');
        image.classList.add('post-image');
        image_id = json.results[i].id;
        console.log(image_id);
        image.src = json.results[i].urls.regular;
        post.appendChild(image);
        image.addEventListener('click', () => {
            const image = event.currentTarget;
            const images = image.parentNode.querySelectorAll('.image-container img');
            for(const img of images){
                img.classList.remove('active');
            }
            image.classList.add('active');
        });
    }

    proceed.addEventListener('click', () => {

        if(document.querySelector('.active') == null){
            window.alert("PLEASE SELECT AN IMAGE");
        }else{
        const selected = document.createElement('img');
        selected.classList.add('post-image');
        selected.src = checkSelection();
        console.log(checkSelection());
        container.innerHTML = "";

        const sNav = document.createElement('div');
        sNav.classList.add('image-search');
        container.appendChild(sNav);

        const sInput = document.createElement('input');
        sInput.classList.add('post-input');
        sInput.value = "";
        sNav.appendChild(sInput);

        const sButton = document.createElement('button');
        sButton.classList.add('btn-post');
        sButton.textContent = "SEARCH";
        sNav.appendChild(sButton);
        /*container.appendChild(selected);
        post.style.visibility = "hidden";
        proceed.style.visibility = "hidden"; 
        const input = document.querySelector('.post-input');
        input.value = "";*/
        sButton.addEventListener('click', () => {
            fetch("spotify.php?q="+encodeURIComponent(sInput.value)).then(fetchResponse).then(jsonSpotify);
        });
           
    }    
})
}



function checkSelection(){
    const selection = document.querySelector('.post-image.active');
    return selection.src;
}




function fetchResponse(response){
    console.log(response);
    return response.json();

}



document.querySelector('.btn-post').addEventListener('click', search);
