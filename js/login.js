window.onload = index;

function index(){
    document.getElementById('boton_log').addEventListener('click',login);
}
function login(){
    var pass = document.getElementById("Pass").value;
    var email = document.getElementById("Correo").value; 
    axios({
        method:'post',
        url:'http://localhost:3000/Login/verificar',
        data:{
            pass: pass,
            email:email
        }
    }).then(res=>{
        if(res.data.code == 200){
            localStorage.setItem("Token",res.data.id);
            window.location.href = "../vistas/principal.html";
        }
        else{
            alert("No tiene permisos o no estas dado de alta");
        }
    })
}

