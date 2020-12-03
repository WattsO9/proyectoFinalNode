
window.onload = datos
var headers = {}
var ruta = "http://localhost:3000/Principal"

function datos(){
    if(localStorage.getItem("Token")){
        headers = {
            headers:{
                'Authorization':"bearer " + localStorage.getItem("Token")
            }
        }
    }
    else{
        window.location.href ="../vistas/Login.html"
    }

    document.querySelector('.boton_p').addEventListener('click',enviar_datos)
    document.querySelector('#Desplegar').addEventListener('click',desplegar_info)
    document.querySelector('#Modificar_b').addEventListener('click',modificar)
    document.querySelector('#desplegar_e').addEventListener('click', desplegar_eliminado)
    document.querySelector('#Eliminar_b').addEventListener('click',eliminar)
    document.querySelector('#barra_buscar').addEventListener('keyup',buscar)
    document.querySelector('#deseleccionar').addEventListener('click',esconder)
    document.querySelector('#opcion_agregar').addEventListener('click',mostrar_agregar)
    document.querySelector('#opcion_modificar').addEventListener('click',mostrar_modificar)
    document.querySelector('#opcion_eliminar').addEventListener('click',mostrar_eliminar)
    document.querySelector('#salir_sesion').addEventListener('click',cerrar_sesion)

}



function cerrar_sesion(){
    localStorage.removeItem("Token");
    window.location.href = "../vistas/Login.html"
}

function mostrar_agregar(){
    document.getElementById("Agregar").style.visibility="visible"
    document.getElementById("Modificar").style.visibility="hidden"
    document.getElementById("Eliminar").style.visibility="hidden"
    document.getElementById("Busqueda_info").style.visibility="hidden"
    document.getElementById("resultados_busqueda").style.visibility="hidden"

}

function mostrar_modificar(){
    document.getElementById("Agregar").style.visibility="hidden"
    document.getElementById("Modificar").style.visibility="visible"
    document.getElementById("Eliminar").style.visibility="hidden"
    document.getElementById("Busqueda_info").style.visibility="hidden"
    document.getElementById("resultados_busqueda").style.visibility="hidden"
}

function mostrar_eliminar(){
    document.getElementById("Agregar").style.visibility="hidden"
    document.getElementById("Modificar").style.visibility="hidden"
    document.getElementById("Eliminar").style.visibility="visible"
    document.getElementById("Busqueda_info").style.visibility="hidden"
    document.getElementById("resultados_busqueda").style.visibility="hidden"
}

function enviar_datos(){
    nom = document.getElementById("nombre").value
    apds = document.getElementById("apellidos").value
    tel = document.getElementById("telefono").value
    correo = document.getElementById("correo").value
    direccion = document.getElementById("direccion").value
    pass = '';


    if(nom =="" || nom==" " || apds=="" || apds==" " || tel=="" || tel==" " || correo=="" || correo==" " || direccion=="" || direccion==" "){
        alert("Uno de los campos no fueron rellenados!")
    }
    else{
        var data ={
            nombre: nom,
            apellidos: apds,
            telefono: tel,
            correo: correo,
            direccion: direccion,
            pass:pass
        }
        axios.post("http://localhost:3000/Principal/insertar",data, headers
            
        ).then(res=>{
            if(res.data.code == 0){
                alert("El telefono o correo ingresados ya estan en uso!")
            }
            else{
                alert("Empleado agregado con exito!")
                document.getElementById("nombre").value = ""
                document.getElementById("apellidos").value = ""
                document.getElementById("telefono").value = ""
                document.getElementById("correo").value = ""
                document.getElementById("direccion").value = ""
                document.getElementById('pass').value = ""
            }
        })
    }
}

function desplegar_info(){
    var info = document.getElementById("mail_phone").value
    
    if( info=="" || info ==" "){
        alert("El campo esta vacio!")
    }
    else{
        var data = {
            informacion: info
        }
        axios.post(ruta+"/buscar_modificacion",data, headers).then(res=>{
            if(res.data.code == 0){
                alert("No se encontraron resultados!")
            }
            else{
                
                datos = res.data
                
                document.getElementById("nombre_m").style.visibility = "visible"
                document.getElementById("apellidos_m").style.visibility = "visible"
                document.getElementById("telefono_m").style.visibility = "visible"
                document.getElementById("correo_m").style.visibility = "visible"
                document.getElementById("direccion_m").style.visibility = "visible"
                document.getElementById("pass_m").style.visibility = "visible"
                document.getElementById("nombre_m").value = datos[0].nombre
                document.getElementById("apellidos_m").value = datos[0].apellidos
                document.getElementById("telefono_m").value = datos[0].telefono
                document.getElementById("correo_m").value = datos[0].correo
                document.getElementById("direccion_m").value = datos[0].direccion
                document.getElementById("pass_m").value = datos[0].password
                document.getElementById("Modificar_b").style.visibility = "visible"


            }
        })
    }
}

function modificar(){
    var anterior_info = document.getElementById("mail_phone").value
    var nuevo_nom = document.getElementById("nombre_m").value
    var nuevo_apds = document.getElementById("apellidos_m").value
    var nuevo_tel = document.getElementById("telefono_m").value
    var nuevo_correo = document.getElementById("correo_m").value
    var nuevo_dir = document.getElementById("direccion_m").value
    var nuevo_pass = '';
    if(nuevo_nom =="" || nuevo_nom ==" " || nuevo_apds=="" || nuevo_apds==" " || nuevo_tel=="" || nuevo_tel ==" " || nuevo_correo=="" || nuevo_correo==" " || nuevo_dir =="" || nuevo_dir==" "){
        alert("Favor de rellenar todos los campos")
    }
    else{
        data ={
            nombre: nuevo_nom,
            apellidos: nuevo_apds,
            telefono: nuevo_tel,
            correo: nuevo_correo,
            direccion: nuevo_dir,
            old: anterior_info,
            pass: nuevo_pass
        }
        axios.post(ruta+"/modifica", data, headers).then(res=>{
            if(res.data.code ==0){
                alert("Correo o telefono ya esta en uso")
            }
            else{
                document.getElementById("nombre_m").style.visibility = "hidden"
                document.getElementById("apellidos_m").style.visibility = "hidden"
                document.getElementById("telefono_m").style.visibility = "hidden"
                document.getElementById("correo_m").style.visibility = "hidden"
                document.getElementById("direccion_m").style.visibility = "hidden"
                document.getElementById("pass_m").style.visibility = "hidden"
                document.getElementById("nombre_m").value = ""
                document.getElementById("apellidos_m").value = ""
                document.getElementById("telefono_m").value = ""
                document.getElementById("correo_m").value = ""
                document.getElementById("direccion_m").value = ""
                document.getElementById("pass_m").value = ""
                document.getElementById("Modificar_b").style.visibility = "hidden"
                document.getElementById("mail_phone").value = ""
                alert("Modificacion completada con exito!")
            }
        })
    }
}

function desplegar_eliminado(){
    var tel_correo = document.getElementById('opciones_e').value
    if(tel_correo =="" || tel_correo ==" "){
        alert("Datos incompletos")
    }
    else{
        data= {
            opcion: tel_correo
        }
        axios.post(ruta+"/desplegar_eliminado", data, headers).then(res=>{
                datos = res.data
                if(datos.code == 0){
                    alert("No se encontro ningun registro")
                }
                else{
                    document.getElementById("nombre_e").style.visibility = "visible"
                    document.getElementById("apellidos_e").style.visibility = "visible"
                    document.getElementById("telefono_e").style.visibility = "visible"
                    document.getElementById("correo_e").style.visibility = "visible"
                    document.getElementById("direccion_e").style.visibility = "visible"
                    document.getElementById("pass_e").style.visibility = "visible"
                    document.getElementById("nombre_e").value = datos[0].nombre
                    document.getElementById("apellidos_e").value = datos[0].apellidos
                    document.getElementById("telefono_e").value = datos[0].telefono
                    document.getElementById("correo_e").value = datos[0].correo
                    document.getElementById("direccion_e").value = datos[0].direccion
                    document.getElementById("pass_e").value = datos[0].password
                    document.getElementById("Eliminar_b").style.visibility = "visible"
                }
        })
    }
}

function eliminar(){
    var correo = document.getElementById("correo_e").value
    var telefono = document.getElementById("telefono_e").value
    data = {
        correo: correo,
        telefono: telefono
    }
    axios.post(ruta+"/eliminar", data, headers).then(res=>{
        if(res.data.code == 1){
            document.getElementById('opciones_e').value = ""
            document.getElementById("nombre_e").style.visibility = "hidden"
            document.getElementById("apellidos_e").style.visibility = "hidden"
            document.getElementById("telefono_e").style.visibility = "hidden"
            document.getElementById("correo_e").style.visibility = "hidden"
            document.getElementById("direccion_e").style.visibility = "hidden"
            document.getElementById("pass_e").style.visibility = "hidden"
            document.getElementById("Eliminar_b").style.visibility = "hidden"
            alert("Empleado eliminado correctamente!")
        }
        else{
            alert("Error al eliminarlo, puede ser que el sistema no este funcionando correctamente")
        }
    })
}

function buscar(){
    document.getElementById('deseleccionar').style.visibility="visible"
    document.getElementById('resultados_busqueda').style.visibility="visible"
    var busqueda = document.getElementById("barra_buscar").value
    data = {
        busqueda: busqueda
    }
    axios.post(ruta+"/buscar", data, headers).then(res=>{
        datos = res.data
        
        console.log(datos)
        document.getElementById("resultados_busqueda").innerHTML = ""
        if(res.data.code == 0 ){
            document.getElementById("resultados_busqueda").innerHTML +="<div>"+
                                                                            "<p>Encontrar empleados...</p>"+
                                                                        "</div>"

        }
        else if(res.data.code == 1){
            document.getElementById("resultados_busqueda").innerHTML +="<div>"+
                                                                            "<p>No se encontraron resultados :(</p>"+
                                                                        "</div>"
        }
        else{
            document.getElementById("resultados_busqueda").innerHTML = ""
            for(var i=1;i<datos.length;i++){
                document.getElementById("resultados_busqueda").innerHTML +="<div class='nombres_b_d' onclick=inf('"+datos[i].id+"')>"+
                                                                                "<img class='imagen_fija' src='../Images/worker.svg'>"+
                                                                                "<p class='persona_d'>"+datos[i].nombre+"</p>"+
                                                                            "</div>"
            }
            if(datos.length == undefined){
                document.getElementById("resultados_busqueda").innerHTML +="<div class='nombres_b_d'  onclick=inf('"+datos[i].id+"')>"+
                                                                                "<img class='imagen_fija' src='../Images/worker.svg'>"+
                                                                                "<p class='persona_d'>"+datos.nombre+"</p>"+
                                                                            "</div>"
            }
        }

    })
}

function esconder(){
    document.getElementById('deseleccionar').style.visibility="hidden"
    document.getElementById('resultados_busqueda').style.visibility="hidden"
}

function inf(dato){
    document.getElementById('deseleccionar').style.visibility="hidden"
    document.getElementById('resultados_busqueda').style.visibility="hidden"
    data = {
        id:dato
    }
    axios.post(ruta+"/mostrar_datos",data, headers).then(res=>{
        datos = res.data
        console.log(datos)
        document.getElementById('Busqueda_info').style.visibility = "visible"
        document.getElementById("nombre_b").value = datos[0].nombre
        document.getElementById("apellidos_b").value = datos[0].apellidos
        document.getElementById("telefono_b").value = datos[0].telefono
        document.getElementById("correo_b").value = datos[0].correo
        document.getElementById("direccion_b").value = datos[0].direccion
        document.getElementById("pass_b").value = datos[0].password
    })

}