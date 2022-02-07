<script>
    import { fade, blur, slide, scale, fly } from "svelte/transition";
    import { onMount } from "svelte";
    let datos = [];
    let respuestas = [];
    onMount(async () => {
        const response = await fetch("../trivia.json");
        const data = await response.json();
        datos = data;
        console.log(datos);
        respuestas = Array(datos.length).fill(null);
    });
    let correcto = 0;

    function respuesta(indexPregunta, respuesta, indexOpcion) {
        respuestas[indexPregunta] = indexOpcion;
        console.log(respuestas);
        setTimeout(() => {
            datos[indexPregunta].ver = true;
            if (respuesta == true) {
                correcto++;
            }
        }, 1000);
    }
</script>

<div class="body-container">
    {#if datos}
        {#each datos as item, index}
            <div class="card border-0">
                <div class="contenedor-img">
                    {#if item.ver == true}
                        <div
                            class="text-card text-white"
                            in:slide={{ duration: 500, delay: 600 }}
                        >
                            {item.respuesta}
                        </div>
                    {:else}
                        <img src={item.img} class="img-zoom" alt="..." />
                        <div class="centrado text-white">
                            <h3>{item.pregunta}</h3>
                        </div>
                    {/if}
                </div>
                <div class="card-body border">
                    {#each item.opciones as opcion, i}
                    <button class="btn-custom w-100" class:is_correct={item.ver && opcion.correcto} class:selected={respuestas[index] === i} on:click={() => respuesta(index, opcion.correcto, i)} disabled={item.ver == true}>{opcion.opcion}</button>
                    {/each}
                </div>
            </div>
            <br />
        {/each}
    {:else}
        <div class="spinner-grow text-info" role="status">
            <span class="sr-only" />
        </div>
        <p>Cargando.....</p>
    {/if}
    <div class="card">
        <div class="card-resultado">
            <h1 class="w-100">{correcto}</h1>
        </div>
    </div>
</div>

<style>
    .contenedor-img {
        text-align: center;
        height: 300px;
        background-color: #000;
        overflow: hidden;
        box-sizing: border-box;
        border-radius: 12px 12px 0px 0px;
    }
    .centrado {
        position: absolute;
        top: 30%;
        background: #77777791;
    }
    .text-card {
        padding: 10px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .is_correct {
        border-color: #198754 !important;
    }
    .card-resultado {
        height: 300px;
        display: flex;
        text-align: center;
        align-items: center;
    }
    
</style>
