<script>
    import { fade, blur, slide, scale, fly} from "svelte/transition"
    import { onMount } from "svelte";
    let datos;
    let item;
    let total;
    let terminado = false;

  onMount(async()=>{
     const response = await fetch("https://swapi.dev/api/films")
      const data = await response.json();
      datos = data.results
      item = data.results[0];
      total = data.count;
  });

  let preguntas_hechas = 0;
    function oprimir_btn() {
        console.log(total+'-'+preguntas_hechas)
        if(preguntas_hechas >= total - 1){
            terminado = true;
        }else{
            preguntas_hechas++;
            item = datos[preguntas_hechas];
        }
    }
</script>

<center>
    <div class="widget-quiz">
        {#if datos}
            <div class="card" in:slide={{duration:500, delay:500}}>
                <div class="card-inner">
                    <img src="https://i1.wp.com/codigoespagueti.com/wp-content/uploads/2021/05/star-wars-logo.jpg?fit=1280%2C720&quality=80&ssl=1" class="card-img-top" alt="..." />
                    <div class="card-body">
                        <h5 class="card-title">{item.title}</h5>
                        {#each item.planets as opcion}
                            <div class="quiz-answer" on:click={oprimir_btn}>
                                {opcion}
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        {:else}
            <div>
                <div class="spinner-grow text-info" role="status">
                    <span class="sr-only"></span>
                </div>
                <p>Cargando.....</p>
            </div>
        {/if}
    </div>

<!--{#await fetchDatos}
	<p>...waiting</p>
{:then data}
{#each data.results as item}
	 <div class="widget-quiz">
        <div class="card" in:slide>
            <div class="card-inner">
                <div class="card-body">
                        <h5 class="card-title">{item.name}</h5>
                </div>
            </div>
        </div>
    </div>
    {/each}
{:catch error}
	<p>An error occurred!</p>
{/await}-->
   
</center>

<style>
    .widget-quiz{
        margin: 10px;
        max-width: 600px;
        height: 100%;
        width: 100%;

    }
    .card::before,
    .card::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }

    .card::before,
    .card::after {
        border: 1px solid #f1f1f1;
        transition: transform 0.5s;
        border-radius: 4px;
        box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
        background-color: #fff;
    }

    .card::before,
    .card-inner {
        z-index: 1;
    }

    .card-inner {
        background: #fff;
        position: relative;
        border-radius: 4px;
        box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
        border: 1px solid #f1f1f1;
    }

    .card-inner img {
        height: 200px;
        object-fit: cover;
    }

    .card::before {
        transform: translate(-10px, -10px);
    }

    .card::after {
        transform: translate(-20px, -20px);
    }
</style>
