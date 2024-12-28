let button = document.getElementById("save");
let randomButton = document.getElementById("generateRandom");

button.addEventListener("click", guardarDatos);
randomButton.addEventListener("click", generarCancionRandom);

function validarFormulario(nombre, artista, url) {
    let errores = [];

    if (!nombre.trim()) errores.push("El nombre de la canción es obligatorio.");
    if (!artista.trim()) errores.push("El nombre del artista es obligatorio.");
    if (!url.trim()) {
        errores.push("La URL del video es obligatoria.");
    } else {
        const regexYouTube = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
        if (!regexYouTube.test(url)) {
            errores.push("La URL debe ser un enlace válido de YouTube.");
        }
    }

    return errores;
}

async function guardarDatos() {
    let nombre = document.getElementById("nombre").value;
    let artista = document.getElementById("artista").value;
    let url = document.getElementById("url").value;

    // Validaciones
    let errores = validarFormulario(nombre, artista, url);
    if (errores.length > 0) {
        alert(errores.join("\n"));
        return;
    }

    let body = JSON.stringify({ nombre, artista, url_video: url });

    try {
        let response = await fetch('http://localhost:3000/canciones', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body
        });
        alert("BODY:" + body + "");

        if (response.status == 201) {
            let cancion = await response.json();
            console.log(cancion);
        }

    } catch (error) {
        console.error(error);
    }
};

async function generarCancionRandom() {
    try {
        let response = await fetch('http://localhost:3000/canciones/randomsong', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.status === 200) {
            let cancionRandom = await response.json();
            console.log(cancionRandom);
            document.getElementById("cancionRandom").innerHTML = `
            <div>
                <h2>${cancionRandom[0].nombre}</h2>
                <p>Artista: ${cancionRandom[0].artista}</p>
                <a href="${cancionRandom[0].url_video}" target="_blank">Ver Video</a>
                <p>Numero de votos: ${cancionRandom[0].votes}</p>
            </div>`;
        }

    } catch (error) {
        console.error(error);
    }
}

async function getAllSongs() {
    try {
        const response = await fetch('http://localhost:3000/canciones/todas');
        const canciones = await response.json();

        const songList = document.getElementById("songList");
        canciones.forEach(cancion => {
            const li = document.createElement('li');
            li.textContent = `${cancion.nombre} - ${cancion.artista}`;

            const enlace = document.createElement('a');
            enlace.target = '_blank';
            enlace.href = `${cancion.url_video}`;
            enlace.textContent = 'Escuchar Cancion';

            const botonVotar = document.createElement('button');
            botonVotar.textContent = 'Votar';
            botonVotar.addEventListener("click", () => voteSong(cancion._id))

            const numeroDeVotos = document.createElement('p');
            numeroDeVotos.textContent = `Numero de votos: ${cancion.votes}`;

            li.appendChild(botonVotar);
            li.appendChild(enlace);
            li.appendChild(numeroDeVotos);
            songList.appendChild(li);
        });
    } catch (error) {
        console.error('Error al obtener las canciones', error)
    }
};

window.onload = getAllSongs;

async function voteSong(songId) {
    try {
        const response = await fetch(`http://localhost:3000/canciones/${songId}/votar`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (response.status === 200) {
            alert('votacion registrada')
        } else {
            alert('error al votar');
        }
    } catch (error) {
        console.error(error)
    }
}
