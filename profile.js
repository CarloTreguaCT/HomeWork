function onResponse(response){
    console.log("Risposta ricevuta");
    console.log(response);
    return response.json();
}

 function onJSON(json){
    console.log("json ricevuto");
    console.log(json);
    const json_length = json.length;
    const body = document.querySelector('body');
    const container = document.createElement('div');
    container.classList.add('feed-container');


    for(let i = 0; i < json_length ; i++){


        const post = document.createElement('div');
        post.classList.add('post');

        const image = document.createElement('img');
        image.classList.add('post-image');

        const sound = document.createElement('audio');

        const post_btn= document.createElement('div');
        post_btn.classList.add('post-btn');

        const btn_save = document.createElement('div');

        btn_save.classList.add('btn-save');

        btn_save.innerHTML = "<ion-icon name='heart-outline'></ion-icon>"

        const btn_saved = document.createElement('div');

        btn_saved.classList.add('btn-saved');

        btn_saved.innerHTML = "<ion-icon name='heart'></ion-icon>"


        $post_id = json[i].id

        btn_save.addEventListener('click', () => {
            btn_save.style.visibility = "hidden";
            btn_saved.style.visibility = "visible";

            fetch("saving.php?id="+encodeURIComponent($post_id));
        })
        
        btn_saved.addEventListener('click', () => {
            btn_saved.style.visibility = "hidden";
            btn_save.style.visibility = "visible";
        }) 
        
        image.src = json[i].img;
        sound.src = json[i].sound;
        const preview = new Audio(sound.src); 


        image.addEventListener('click', togglePlay);
        var isPlaying = false;

        function togglePlay(){
            isPlaying ? preview.pause() : preview.play();
        }

        preview.onplaying = function(){
            isPlaying = true;
            post.classList.add('playing');
        }

        preview.onpause = function(){
            isPlaying = false;
            post.classList.remove('playing');
        }

        




        post_btn.appendChild(btn_save);
        post_btn.appendChild(btn_saved);
        post.appendChild(image);
        post.appendChild(preview);
        post.appendChild(post_btn);




        container.appendChild(post);
} 


    
    body.appendChild(container);
    


}





fetch("getProfile.php").then(onResponse).then(onJSON);