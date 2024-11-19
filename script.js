const textArea = document.querySelector(".textoEntrada");
const mensaje = document.querySelector(".tarjetaSalida");
const tarjetaContenedor = document.querySelector(".tarjeta-contenedor"); // Selecciona el div

function btnEncriptar() {
    const textoEncriptado = encriptar(textArea.value);
    mensaje.value = textoEncriptado;
    textArea.value = "";
    mensaje.style.backgroundImage = "none";
    tarjetaContenedor.style.display = "none";
}

function btnDesencriptar() {
    const textoDesencriptado = desencriptar(textArea.value);
    mensaje.value = textoDesencriptado;
    textArea.value = "";
    mensaje.style.backgroundImage = "none";
    tarjetaContenedor.style.display = "none";
}

function encriptar(stringEncriptada) {
    let matrizCodigo = [
        ["e", "enter"],
        ["i", "imes"],
        ["a", "ai"],
        ["o", "ober"],
        ["u", "ufat"],
    ];
    stringEncriptada = stringEncriptada.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {
        stringEncriptada = stringEncriptada.replaceAll(
            matrizCodigo[i][0],
            matrizCodigo[i][1]
        );
    }

    return stringEncriptada;
}

function desencriptar(stringDesencriptada) {
    let matrizCodigo = [
        ["e", "enter"],
        ["i", "imes"],
        ["a", "ai"],
        ["o", "ober"],
        ["u", "ufat"],
    ];
    stringDesencriptada = stringDesencriptada.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {
        stringDesencriptada = stringDesencriptada.replaceAll(
            matrizCodigo[i][1],
            matrizCodigo[i][0]
        );
    }

    return stringDesencriptada;
}

function copiarTexto() {
    mensaje.select();
    mensaje.setSelectionRange(0, 99999);

    navigator.clipboard
        .writeText(mensaje.value)
        .then(() => {
            alert("Texto copiado al portapapeles");
        })
        .catch((err) => {
            console.error("Error al copiar el texto: ", err);
        });
}

// Inicializar el SDK de Facebook
window.fbAsyncInit = function () {
    FB.init({
        appId: '1714882042687651', // Reemplaza con tu App ID de Facebook Developers
        cookie: true,
        xfbml: true,
        version: 'v17.0'
    });
    console.log('SDK de Facebook cargado correctamente.');
};

// Cargar el SDK de forma asíncrona
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


// Botón de inicio de sesión con Facebook
document.getElementById('loginBtn').addEventListener('click', function () {
    FB.login(function (response) {
        if (response.authResponse) {
            console.log('Inicio de sesión exitoso:', response);
            alert('¡Inicio de sesión exitoso! Ahora puedes publicar en Facebook.');
        } else {
            console.log('El usuario canceló el inicio de sesión.');
            alert('Inicio de sesión cancelado.');
        }
    }, { scope: 'pages_manage_posts,publish_to_groups' }); // Permisos requeridos
});

// Botón para publicar en Facebook
document.getElementById('postBtn').addEventListener('click', function () {
    // Obtenemos el contenido de la tarjeta de salida
    const message = document.querySelector('.tarjetaSalida').value;

    if (!message.trim()) {
        alert('No hay mensaje para publicar. Ingresa texto en el encriptador primero.');
        return;
    }

    // Publicar en Facebook
    FB.api(
        '/me/feed', // Usa "me" para publicar en el perfil del usuario
        'POST',
        { message: message }, // Mensaje a publicar
        function (response) {
            if (!response || response.error) {
                console.error('Error al publicar:', response.error);
                alert('Ocurrió un error al publicar en Facebook.');
            } else {
                alert('¡Publicación exitosa! ID de la publicación: ' + response.id);
            }
        }
    );
});

// Mostrar el botón de publicar después del inicio de sesión
document.getElementById('loginBtn').addEventListener('click', function () {
    FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
            document.getElementById('postBtn').style.display = 'block';
        }
    });
});

