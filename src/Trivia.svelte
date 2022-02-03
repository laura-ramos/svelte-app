<script>
    import { fade, blur, slide, scale, fly } from "svelte/transition";
    import { onMount } from "svelte";
    let datos = [];
    onMount(async () => {
        const response = await fetch("../trivia.json");
        const data = await response.json();
        datos = data;
    });
    let correcto = 0;

    function respuesta(indexPregunta, respuesta,indexOpcion) {
         datos[indexPregunta].opciones[indexOpcion].selected = true;
        setTimeout(() => {
            datos[indexPregunta].ver = true;
            datos[indexPregunta].select = true;
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
                            transition:slide={{ duration: 500, delay: 600 }}
                        >
                            {item.respuesta}
                        </div>
                    {:else}
                        <img src={item.img} class="card-img-top" alt="..." />
                        <div class="centrado text-white">
                            <h3>{item.pregunta}</h3>
                        </div>
                    {/if}
                </div>
                <div class="card-body border">
                    <div class="d-grid gap-2">
                        {#each item.opciones as opcion,i}
                            <button
                                class="border rounded-pill btn-res {opcion.selected?'is-selected':''} {item.ver &&
                                opcion.correcto
                                    ? 'is_correct'
                                    : ''}"
                                on:click={() =>
                                    respuesta(index, opcion.correcto,i)}
                                disabled={item.ver == true}
                                >{opcion.opcion}</button
                            >
                        {/each}
                    </div>
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
    .contenedor-img img {
        transition: all 0.4s ease;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .contenedor-img img:hover {
        transform: scale(1.1);
    }
    .contenedor-img img {
        height: 100%;
        width: 100%;
        object-fit: cover;
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
    .is-selected {
        background-color: #f8f8f8 !important;
    }
    .btn-res{
        transition: 0.4s;
        background-color: #fff;
        cursor: pointer;
    }
    .btn-res:active{
        transform: scaleX(0.9);
    }
    .btn-res:disabled{
        color: #000 !important;
    }
</style>
