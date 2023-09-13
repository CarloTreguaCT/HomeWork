const container = document.querySelector('.selection-container');




function jsonSpotify(json){

    container.innerHTML = "";

    console.log("JSON Spotify ricevuto");
    console.log(json);



    const sNav = document.createElement('div');
        sNav.classList.add('image-search');
        container.appendChild(sNav);

        const sInput = document.createElement('input');
        sInput.classList.add('post-input');
        sInput.value = "";
        sNav.appendChild(sInput);

        const sButton = document.createElement('button');
        sButton.classList.add('btn-post-s');
        sButton.textContent = "SEARCH";
        sNav.appendChild(sButton);


        sButton.addEventListener('click', () => {
            
            fetch("spotify.php?q="+encodeURIComponent(sInput.value)).then(fetchResponse).then(jsonSpotify);
        });

    const post = document.createElement('div');
    post.classList.add('image-container');
    const proceed = document.createElement('button');
    proceed.classList.add('btn-continue');
    
    

    post.style.visibility = "visible";
    proceed.textContent = "Continue";
    proceed.style.visibility = "visible";
    
    
    
    
    let num_results = json.tracks.total;
    console.log(num_results);

    if(num_results < 1){
        window.alert("No results found");
    }
    let alerted = false;

    
    for(let i = 0; i < 5; i++){
        const image = document.createElement('img');
        image.classList.add('post-image');
        image.src = json.tracks[i].album.images[0].url;
        if(image.src === null){
           image.classList.add('noImage');
        }
        const preview = json.tracks[i].preview_url;
        
        if(preview === null){
            if(alerted === false){

                window.alert("Some songs may be unavailable at the moment");
                
                alerted = true;
            }
            console.log(alerted);
           image.style.display = "none";
}

        const music = new Audio(preview);

        post.appendChild(image);
        post.appendChild(music);
     
        container.appendChild(post);
        container.appendChild(proceed);


        var isPlaying = false;

        image.addEventListener("click", togglePlay);

        function togglePlay(){
            isPlaying ? music.pause() : music.play();
        }

        music.onplaying = function(){
            isPlaying = true;
        }

        music.onpause = function(){
            isPlaying = false;
        }



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
            window.alert("PLEASE SELECT A SONG");
        }else{
        const final = document.querySelector('.create-post')
        container.innerHTML = "";
        final.classList.add('create');
    }    }    );
    
}













function search(event){
    event.preventDefault();
    const input = document.querySelector('.post-input');
    console.log(input.value);
    fetch("unsplash.php?q="+encodeURIComponent(input.value)).then(fetchResponse).then(jsonSearch);
}


function jsonSearch(json){
    
    console.log("JSON ricevuto");
    console.log(json);

    const post = document.querySelector('.image-container');
    const container = document.querySelector('.selection-container');
    const proceed = document.querySelector('.btn-continue');

    post.style.visibility = "visible";
    proceed.style.visibility = "visible";
    
    post.innerHTML = "";
    
    let num_results = json.total;
    console.log(num_results);

    if(num_results < 1){
        window.alert("No results found");
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
        sButton.classList.add('btn-post-s');
        sButton.textContent = "SEARCH";
        sNav.appendChild(sButton);
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
