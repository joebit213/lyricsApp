import { API } from './api.js'
import * as UI from './interfaz.js'

UI.formularioBuscar.addEventListener('submit', (e) => {
  e.preventDefault();

  //Obtener datos del formulario
  const artista = document.querySelector('#artista').value,
        cancion = document.querySelector('#cancion').value;

  if( artista === '' || cancion === '' ) {
    //Si el usuario deja los campos vacios mostrar error
    UI.divMensajes.innerHTML = 'Error... Todos los campos son obligatorios';
    UI.divMensajes.classList.add('error')

    setTimeout(() => {
      UI.divMensajes.innerHTML = '';
      UI.divMensajes.classList.remove('error')
    }, 3000)
  }else {
    //Si el formulario esta completo, realizar consulta a la API
    const api = new API(artista, cancion);
    api.consultarAPI() 
    .then(data => {
      if( data.lyrics ) {
        //Si la cancion existe
        UI.divResultado.textContent = data.lyrics
      }else {
        //Si la cancion no existe
        UI.divMensajes.innerHTML = " No se encontro la cancion :'(";
        UI.divMensajes.classList.add('error')

        setTimeout(() => {
          UI.divMensajes.innerHTML = '';
          UI.divMensajes.classList.remove('error')
          UI.formularioBuscar.reset()
        }, 3000)
      }
    })
  }

});