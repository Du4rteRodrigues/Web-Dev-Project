function goHome(){
    window.location.replace("http://localhost:8888/home")
}
function post(){
    window.location.replace("http://localhost:8888/post")
}

function logout(){
    window.location.replace("http://localhost:8888/logout")
  
}

function profile(){
    window.location.replace("http://localhost:8888/profile")
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