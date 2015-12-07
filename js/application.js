//GUARDA LOS DATOS DEL USUARIO.
$('#GuardarUsuario').click(function() {
  console.log('Usuario Registro');
  var usuario = document.getElementById("email").value;
  var contrasena = document.getElementById("password").value;

  if (usuario == '' || contrasena == '') {
//EN CASO DE QUE LOS CAMPOS ESTEN VACIOS SE RECIBE UNA ALERTA
    alert('¡FAVOR COMPLETAR LOS CAMPOS!');
    return;
  }
//SE GUARDAN LOS DATOS DEL USUARIO Y NOS DEVUELVE AL LOGIN
  localStorage.setItem("email", usuario);
  localStorage.setItem("password", contrasena);
  location = "Login.html"
});

//FUNCION "INICIAR" QUE NOS BUSCA SI EL USUARIO SE ENCUENTRA ALMACENADO EN EL LOCAL STORAGE
$('#iniciar').click(function() {
  var user = document.getElementById("email").value;
  var password = document.getElementById("password").value;
//SE BUSCA SI LOS DATOS INGRESADOS SE ENCUENTRAN EN EL LOCA STORAGE
  var registroUser = localStorage.getItem("email");
  var registroPassword = localStorage.getItem("password");
  if (user == registroUser && password == registroPassword) {
//SI ESTA NOS PERMITE ENTRAR.
    return location = "Principal.html"
  }
//EN CASO CONTRARIO NOS MUESTRA UNA ALERTA QUE LOS DATOS SON INCORRECTOS
  window.alert("¡DATOS ERRORES, FAVOR INTENTE DE NUEVO!");
});

//GUARDA LOS DATOS DEL CORREO Y LO ENVIA A SALIDA
$('#guardoCorreo').click(function() {
  var destino = document.getElementById("correoDestino").value;
  var asunto = document.getElementById("asunto").value;
  var contenido = CKEDITOR.instances.editor.getData();
  var CorreoSal = getSalida();
  var id = CorreoSal.length + 1;
  var correo = {
    "id": id,
    "destino": destino,
    "asunto": asunto,
    "contenido": contenido,
    "fecha": new Date()
  };
  if (destino != "" && asunto != "" && contenido != "") {
    CorreoSal.push(correo);
    setSalida(CorreoSal);
    }else{
    //EN CASO DE QUE LOS CAMPOS ESTEN VACIOS SE RECIBE UNA ALERTA
    alert('¡FAVOR COMPLETAR LOS CAMPOS!');
    }
  });

//ENVIA EL CORREO CREADO A  ENVIADOS
$('#envioCorreo').click(function() {
  var destino = document.getElementById("correoDestino").value;
  var asunto = document.getElementById("asunto").value;
  var contenido = CKEDITOR.instances.editor.getData();
  var CorreoEnv = getEnviados();
  var id = CorreoEnv.length + 1;
  var correo = {
    "id": id,
    "destino": destino,
    "asunto": asunto,
    "contenido": contenido,
    "fecha": new Date()
  };
  if (destino != "" && asunto != "" && contenido != "") {
    CorreoEnv.push(correo);
    setEnviados(CorreoEnv);
    }else{
    //EN CASO DE QUE LOS CAMPOS ESTEN VACIOS SE RECIBE UNA ALERTA
    alert('¡FAVOR COMPLETAR LOS CAMPOS!');
    }
  });

function getEnviados() {
  var CorreoEnv = JSON.parse(localStorage.getItem('CorreoEnv'));
  return CorreoEnv ? CorreoEnv : [];
}

function setEnviados(datos) {
  localStorage.setItem('CorreoEnv', JSON.stringify(
    datos));
}

function getSalida() {
  var CorreoSal = JSON.parse(localStorage.getItem('CorreoSal'));
  return CorreoSal ? CorreoSal : [];
}

function setSalida(datos) {
  localStorage.setItem('CorreoSal', JSON.stringify(
    datos));
}

//CAPTURA EL CORREO AGREGADO Y LO CREA EN LA TABLA DEL LOS CORREOS "ENVIADOS"
function capturaCorreoEnviado() {
  var CorreoEnv = getEnviados();
  var tableBody = $('#msEnviados').find('tbody');
  var body = '';
  CorreoEnv.forEach(function(enviado, index, array) {
    body +=
      '<tr>' +
      '<td id="ms1">' + enviado.destino + '</td>' +
      '<td id="ms1">' + enviado.asunto + '</td>' +
      '<td id="ms1">' + enviado.contenido + '</td>' +
      '<td id="ms1">' + enviado.fecha + '</td>' +
      '<td id="ms1"><button id="eliminarEnviados" data-id="' +
      enviado.id + '" class="btn btn-danger">Eliminar</button></td></tr>';
  });

  tableBody.empty();
  tableBody.append(body);

}

//CAPTURA EL CORREO AGREGADO Y LO CREA EN LA TABLA DE LOS CORREOS DE "SALIDA"
function capturaCorreoSalida() {
  var CorreoSal = getSalida();
  var tableBody = $('#msSalida').find('tbody');
  var body = '';
  CorreoSal.forEach(function(CorreoSal, index, array) {
    body +=
      '<tr>' +
      '<td id="ms1">' + CorreoSal.destino + '</td>' +
      '<td id="ms1">' + CorreoSal.asunto + '</td>' +
      '<td id="ms1">' + CorreoSal.contenido + '</td>' +
      '<td id="ms1">' + CorreoSal.fecha + '</td>' +
      '<td id="ms1"><button id="editarSalida" data-id="' + CorreoSal.id +
      '" class="btn btn-danger">Editar </br></button>   <button id="eliminarSalida" data-id="' +
      CorreoSal.id + '" class="btn btn-danger">Eliminar</button></td></tr>';
  });

  tableBody.empty();
  tableBody.append(body);
}

//ES EL BOTON EDITAR DE LA TABLA QUE NOS ENVIA AL CORREO EDICION PARA EDITAR EL CORREO SELECCIONADO.
$(document).delegate("#editarSalida", "click", function() {
  var id = $(this).data('id');
  location = location = "CorreoEdicion.html?id=" + id;
});

//ELIMINA EL CORREO SELECCIONADO DE LA BANDEJA DE SALIDA.
$(document).delegate('#eliminarSalida', "click", function() {
  var id = $(this).data('id');
  var CorreoSal = getSalida();
  var datos = [];
  CorreoSal.forEach(function(element, index) {
    if (element.id != id) {
      datos.push(element);
    }
  });
  setSalida(datos);
  capturaCorreoSalida();
});

//ELIMINA EL CORREO SELECCIONADO DE LA BANDEJA DE ENVIADOS.
$(document).delegate('#eliminarEnviados', "click", function() {
  var id = $(this).data('id');
  var CorreoEnv = getEnviados();
  var datos = [];
  CorreoEnv.forEach(function(element, index) {
    if (element.id != id) {
      datos.push(element);
    }
  });
  setEnviados(datos);
  capturaCorreoEnviado();
});

//MUEVE LOS CORREOS QUE HAN SIDO EDITADOS DE LA BANDEJA DE SALIDA A LA BANDEJA DE ENVIADOS.
$('#MoverCorreo').click(function() {
  
  var id = window.location.search.split('=')[1];
  var CorreoSal = getSalida();
  var CorreoEnv = getEnviados();
  var newSalida = [];

  CorreoSal.forEach(function(element,index){

    if(element.id != id){
      newSalida.push(element);
    }else{
      CorreoEnv.push(element);
    }
  });

  setSalida(newSalida);
  setEnviados(CorreoEnv);
});

//OBTIENE LO QUE TENGA EL "PARA", EL ASUNTO Y LO QUE SE DIGITA EN EL EDITOR.
function setEditarDatos() {
  var CorreoSal = getSalida();
  var id = window.location.search.split('=')[1];
  var destino = document.getElementById('destino');
  var asunto = document.getElementById('asunto');
  var editor = CKEDITOR.instances.editor;
  var datos;

  CorreoSal.forEach(function(element, index) {
    if (element.id == id) {
      return datos = element;
    }
  });
  destino.value = datos.destino;
  asunto.value = datos.asunto;
  editor.setData(datos.contenido);

}

//ME PERMITE VERIFICAR SI EL CORREO ESTA CORRECTO
function verifyEmail(){
var status = false;     
var emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  if (document.Testing.emaila.value.search(emailRegEx) == -1) {
        alert("CORREO CON FORMATO INCORRECTO");
      }
    }