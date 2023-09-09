const save = document.querySelector('.btn-save');
const saved = document.querySelector('.btn-saved');

save.addEventListener('click', () => {
    save.style.visibility = "hidden";
    saved.style.visibility = "visible";
})

saved.addEventListener('click', () => {
    saved.style.visibility = "hidden";
    save.style.visibility = "visible";
})
