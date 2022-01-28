<script>
    import { fade, blur, slide, scale, fly} from "svelte/transition"
        import { onMount } from "svelte";
    let datos;
    let item;

    onMount(async()=>{
     const response = await fetch("../preguntasYrespuestas.json")
      const data = await response.json();
      datos = data;
      item = data[0];
      
    });
    //let item = datos[0];
    let preguntas_hechas = 0;
    let correcto = "";
    let mostrarRespuesta = false;
    let respuesta_correcta = 0;
    let siguiente = false;
    let terminado = false;
    function oprimir_btn(tipo) {
        mostrarRespuesta = true;
        siguiente = true;
        if (tipo == true) {
            respuesta_correcta++;
        }
        if (preguntas_hechas >= datos.length - 1) {
            setTimeout(() => {
                item = {
                    pregunta: respuesta_correcta + "/" + datos.length,
                };
                terminado = true;
            }, 2000);
            
        } else {
            setTimeout(() => {
                mostrarRespuesta = false;
                preguntas_hechas++;
                item = datos[preguntas_hechas];
            }, 3000);
        }
    }
</script>

<center>
    <div class="widget-quiz">
        {#if datos}
            <div class="card" in:slide>
                <div class="card-inner">
                    {preguntas_hechas + 1}/{datos.length}
                    {#if terminado == false}
                        <img src={item.imagen} class="card-img-top" alt="imagen" />
                    {/if}
                    <div class="card-body {terminado?'terminado':''}">
                            <h5 class="card-title">{item.pregunta}</h5>

                        {#if item.opciones}
                            <div class="">
                                {#each item.opciones as opcion}
                                    <!-- svelte-ignore missing-declaration -->
                                    <div
                                        class="quiz-answer animate__animated {mostrarRespuesta &&
                                        opcion.tipo == true
                                            ? 'animate__pulse active'
                                            : ''}"
                                        on:click={oprimir_btn(opcion.tipo)}
                                    >
                                        {opcion.respuesta}
                                    </div>
                                {/each}
                            </div>
                        {/if}
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

    .terminado{
        height: 200px;
        background-color: #f1f1f1;
    }
</style>
