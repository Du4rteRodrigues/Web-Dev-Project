function goHome(){
    window.location.replace("http://127.0.0.1:5500/public/Templates/index.html")
}
function post(){
    window.location.replace("http://127.0.0.1:5500/public/Templates/post.html")
}

function signin(){
    window.location.replace("http://127.0.0.1:5500/public/Templates/entry.html")
    showForm(signin)
}

function login(){
    window.location.replace("http://127.0.0.1:5500/public/Templates/entry.html")
}

function editProfile(){
}

function showMenu(nav){
    elements = document.querySelectorAll(nav);
    for(var i=0; i<elements.length; i++){
        if(elements[i].style.display == 'none'){
            elements[i].style.display ='block';
            continue;
        }
        else{
        elements[i].style.display = 'none'
        }
    }
}