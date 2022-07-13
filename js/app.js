//variables

const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');

let tweets = [];

// event listener

eventListeners();

function eventListeners(){
    //nuevo tweet
    formulario.addEventListener('submit', agregarTweet);


    //documento listo
    document.addEventListener('DOMContentLoaded', ()=> {
        tweets = JSON.parse ( localStorage.getItem('tweets')) || [];
        
        crearHTML();
    })
}

//funciones

function agregarTweet(e) {
    e.preventDefault();

    //textarea
    const tweet = document.querySelector('#tweet').value;
    if (tweet === ''){
        mostrarError('escribe algo!')
        return;
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    //array de tweets

    tweets = [...tweets, tweetObj];
    //crear html
    crearHTML();

    //reiniciar formulario
    formulario.reset();
}


//mostrar error
function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //instertar mensaje en html
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //eliminar mensaje de error
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);

}


//motrar tweets

function crearHTML(){
    
    limpiarHTML();

    if (tweets.length > 0){
        tweets.forEach (tweet => {
            //boton eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            //function eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            //crear html

            const li = document.createElement('li')

            //añadir texto

            li.innerText = tweet.tweet;

            //instertar boton eliminar

            li.appendChild(btnEliminar);

            //instertar en html 
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}

//agregar tweets a storage

function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// borrar tweet
function borrarTweet(id){
    tweets = tweets.filter(tweet => tweet.id !== id)
    crearHTML();
}

//remover duplicados

function limpiarHTML(){
    while (listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}