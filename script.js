function searchPokemon() {
  // Obtener el valor del input de texto
  var pokemonName = document.querySelector('input[type="text"]').value;
  
  // Hacer la petición a la PokeAPI para obtener los datos del Pokémon
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then(response => response.json())
    .then(data => {
      // Obtener la URL para obtener los datos de especie del Pokémon
      var speciesUrl = data.species.url;
      
      // Hacer la petición a la PokeAPI para obtener los datos de especie del Pokémon
      fetch(speciesUrl)
        .then(response => response.json())
        .then(speciesData => {
          // Obtener la descripción del Pokémon en el idioma deseado (en este caso, inglés)
          var description = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text;
          
          // Actualizar los valores de la etiqueta de imagen y descripción
          var pokemonImg = document.getElementById('pokemon-img');
          pokemonImg.src = data.sprites.front_default;
          pokemonImg.alt = pokemonName;
          
          var pokemonDescription = document.querySelector('.pokemon-description');
          pokemonDescription.textContent = description;
          
          // Actualizar los valores de las etiquetas de estadísticas
          var stats = data.stats;
          document.getElementById('name').textContent = data.name;
          document.getElementById('hp').textContent = stats[0].base_stat;
          document.getElementById('attack').textContent = stats[1].base_stat;
          document.getElementById('defense').textContent = stats[2].base_stat;
          document.getElementById('spatk').textContent = stats[3].base_stat;
          document.getElementById('spdef').textContent = stats[4].base_stat;
          document.getElementById('speed').textContent = stats[5].base_stat;
          
          // Borrar el contenido del input
          document.querySelector('input[type="text"]').value = '';
        })
        .catch(error => {
          console.log('Error:', error);
        });
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

// Función para manejar la pulsación de la tecla Enter
function handleKeyPress(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    searchPokemon();
  }
}
