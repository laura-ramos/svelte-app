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

  var datos = [
    {
      titulo: "Puerto Escondido, Oaxaca",
      text: "Las playas de Puerto Escondido son perfectas sí lo que prefieres es la acción, deportes y aventura. Encontrarás las mejores opciones y playas para hacer surf, bucear, snorkel e incluso paracaidismo.",
      imagen: "https://www.elfinanciero.com.mx/resizer/qvQUon2g8ZyHmM07d0GprXSHaec=/1440x810/filters:format(jpg):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/elfinanciero/PUS2XJ2ZEVB4RCG7TYLZCD5L4Q.jpeg",
    },
    {
      titulo: "Xcacel, Quintana Roo",
      text: "A unos 14 km de Tulum por la carretera Cancún-Tulum encuentras la playa paradisíaca de Xcacel, que esconde uno de los paisajes más bellos del Caribe Mexicano. En medio de una bahía, Xcacel alberga abundantes palmeras, vegetación silvestre y una playa con agua cálida de color turquesa.",
      imagen: "https://amoplayadelcarmen.info/wp-content/uploads/2019/08/xcacel.jpg",
    },
    {
      titulo: "Mazatlán, Sinaloa",
      text: "Las mejores playas de México también las puedes encontrar en Mazatlán, Sinaloa. Reconocido como uno de los principales destinos del pacífico mexicano. Existen varias playas de Mazatlán, cada una de estas adaptada para gustos diferentes, descubre cuál es para ti",
      imagen: "https://mexico10.com/wp-content/uploads/2020/03/mazatlan-sinaloa-min.jpg",
    },
  ];

  var preguntas_hechas = 0;
  function next() {
    var moveOutWidth = document.body.clientWidth * 1.5;
    document.getElementById("card-item").style.transform =
      "translate(" + moveOutWidth + "px, -100px) rotate(-30deg)";
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
    <div class="m-2 text-2xl font-semibold leading-tight">
      <p>Conoce las 6 playas más baratas y bonitas en México</p>
    </div>
    {#each datos as item, index}
      {#if preguntas_hechas == index}
        <div id="card-item" class="card bg-base-100 shadow-md cursor-grabbing" draggable={true} on:dragstart={event => dragStart(event)} on:dragend={event => drop(event)}>
            <div class="card-body">
              <h2 class="card-title">{item.titulo}</h2>
              <p>{item.text}</p>
              <div class="card-actions justify-end">
                <button class="btn btn-primary btn-sm" on:click={next}>Siguiente</button>
              </div>  
            </div>
            <figure class="overflow-hidden"><img src={item.imagen} alt="" class="img-animate"/></figure>
          </div>
      {/if}
    {/each}
    {#if preguntas_hechas == datos.length}
    <div class="card bg-base-100 shadow-md">
      <div class="card-body">
        <p>Para mas informacion entrar en:</p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary btn-sm">Playa de mexico</button>
          <a href="https://traveler.marriott.com/es/viajes-a-la-playa/playas-hermosas-de-mexico/" target="_blank" class="btn btn-primary btn-sm">Playas hermosas de de mexico</a>
        </div>
      </div>
    </div>
    {/if}
  </div>
</div>

<style>
  .card {
    transition: all 0.3s ease-in-out;
  }
  .img-animate{
    animation: myAnim 10s ease 2s 1 normal forwards;
  }
  @keyframes myAnim {
  0% {
    transform: scale(1) translateY(0);
    transform-origin: 50% 16%;
  }

  100% {
    transform: scale(1.25) translateY(-10px);
    transform-origin: top;
  }
}
</style>
