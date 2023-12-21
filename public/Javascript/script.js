function goHome(){
    document.getElementById('Consult').style.display="none";
    document.getElementById('Insert').style.display="none";
    document.getElementById('Update').style.display="none";
    document.getElementById('Delete').style.display="none";
}
function consult(){
    document.getElementById('Consult').style.display="block";
    document.getElementById('Insert').style.display="none";
    document.getElementById('Update').style.display="none";
    document.getElementById('Delete').style.display="none";
}

function insert(){
    document.getElementById('Consult').style.display="none";
    document.getElementById('Insert').style.display="block";
    document.getElementById('Update').style.display="none";
    document.getElementById('Delete').style.display="none";
}

function update(){
    document.getElementById('Consult').style.display="none";
    document.getElementById('Insert').style.display="none";
    document.getElementById('Update').style.display="block";
    document.getElementById('Delete').style.display="none";
}

function del(){
    document.getElementById('Consult').style.display="none";
    document.getElementById('Insert').style.display="none";
    document.getElementById('Update').style.display="none";
    document.getElementById('Delete').style.display="block";
}