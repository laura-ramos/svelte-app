<script>
  import { onMount } from "svelte";
  import CardImagen from "./componentes/card-img.svelte";
  let pregunta;
  //obtener los datos
  onMount(async () => {
    const response = await fetch("../data/recomendacion.json");
    const data = await response.json();
    pregunta = data; //asignar los datos a la variable
  });

  let flipped = false;
  //funcion para crear la animacion flip
  function flip(node, { delay = 0, duration = 1500 }) {
    return {
      delay,
      duration,
      css: (t, u) => `
				transform: rotateY(${1 - u * 180}deg);
				opacity: ${1 - u};
			`,
    };
  }
  let index = 0;

  //funcion para voltear el card cuando se haya seleccionado una opcion
  function select(i) {
    flipped = !flipped;
    index = i;
  }

  var datos = [
    {
      titulo: "1. El disco más vendido de la historia.",
      text: "El sexto álbum de Michael Jackson “Thriller” es el más vendido en la historia de la música, con unas ventas aproximadas de entre 51 a 65 millones de copias desde su lanzamiento en 1982.",
      imagen: "https://placeimg.com/600/300/people",
    },
    {
      titulo: "Demo card 2",
      text: "This is a demo for Tinder like swipe cards",
      imagen: "https://placeimg.com/600/300/animals",
    },
    {
      titulo: "Demo card 3",
      text: "This is a demo for Tinder like swipe cards",
      imagen: "https://placeimg.com/600/300/nature",
    },
  ];

  var preguntas_hechas = 0;
  function next() {
    var moveOutWidth = document.body.clientWidth * 1.5;
    //preguntas_hechas++;
    document.getElementById("card-item").style.transform =
      "translate(" + moveOutWidth + "px, -100px) rotate(-30deg)";
    //var style = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';
    setTimeout(() => {
      if (datos.length == preguntas_hechas-1) {
        
      }else{
        
        preguntas_hechas++;
      }
      
    }, 500);
  }
  function dragStart(event) {
    //preguntas_hechas++;
    console.log(event.center)
  }

  const drop = (event, target) => {

  };
  var responder = false;
</script>

<div class="grid justify-center items-center">
  <div class="md:w-[40rem] sm:w-full w-full">
    <div class="card bg-base-100 shadow-xl">
      
    </div>
    {#each datos as item, index}
    {#if preguntas_hechas == index}
       <div id="card-item" class="card bg-base-100 shadow-xl cursor-grabbing" draggable={true} on:dragstart={event => dragStart(event)} on:dragend={event => drop(event)}>
          <div class="card-body">
            <h2 class="card-title">{item.titulo}</h2>
            <p>{item.text}</p>
          </div>
          <figure><img src={item.imagen} alt="" /></figure>
          <div class="card-actions justify-end m-4">
            <button class="btn btn-primary" on:click={next}>Siguiente</button>
          </div>
        </div>
    {/if}
    {/each}
     <div 
    on:drop={ () => {console.log( "drop" )} } 
    on:dragover={(ev) => { ev.preventDefault() }}>drop on me</div>

    <div class="carousel rounded-box hidden">
      {#each datos as item, index}
        <div class="carousel-item h-full" id="card-item">
          <div
            class="card bg-base-100 shadow-xl cursor-grabbing {preguntas_hechas ==
            index
              ? 'block'
              : 'hidden'}">
            <div class="card-body">
              <h2 class="card-title">{item.titulo}</h2>
              <p>{item.text}</p>
            </div>
            <img src={item.imagen} alt="" />
          </div>
        </div>
      {/each}
    </div>
  </div>
  <br /><br />
</div>

<style>
  .card {
    transition: all 0.3s ease-in-out;
  }
</style>
