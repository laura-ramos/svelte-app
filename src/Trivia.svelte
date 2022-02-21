<script>
    import { fade, blur, slide, scale, fly } from "svelte/transition";
    import { onMount } from "svelte";
    import CardImagen from "./componentes/card-img.svelte";
    import CardText from "./componentes/card-text.svelte";
    let datos;
    let respuestas = [];
    //obtener los dattos del archivo json
    onMount(async () => {
        const response = await fetch("../data/trivia.json");
        const data = await response.json();
        datos = data;//asignar los datos obtenidos a la variable data
        respuestas = Array(datos.length).fill(null);
    });
    let correcto = 0;

    //Funcion para verificar que la respuesta sea correcta
    function respuesta(indexPregunta, respuesta, indexOpcion) {
        respuestas[indexPregunta] = indexOpcion;
        setTimeout(() => {
            datos[indexPregunta].ver = true;
            if (respuesta == true) {
                correcto++;
            }
        }, 1000);
    }
</script>

<div class="body-container">
    <!--Verificar si existen datos-->
    {#if datos}
        <div class="section-title">
            <p>Que tanto sabes de Harry Poter!!</p>
        </div>
        <!--Mostrar las preguntas-->
        {#each datos as item, index}
            <h3>{index+1}/{respuestas.length}</h3>
            {#if item.ver == true}
                <CardText descripcion={item.respuesta}></CardText>
            {:else}
                <CardImagen pregunta={item.pregunta} imagen={item.img} alt=""></CardImagen>
            {/if}
            <div class="card border-0">
                <div class="card-body border">
                    {#each item.opciones as opcion, i}
                    <button class="btn-custom w-100" class:is_correct={item.ver && opcion.correcto} class:selected={respuestas[index] === i} on:click={() => respuesta(index, opcion.correcto, i)} disabled={item.ver == true}>{opcion.opcion}</button>
                    {/each}
                </div>
            </div>
            <br />
        {/each}
        <CardText title={correcto}></CardText>
    {/if}
    <br>
</div>

<style>
    .is_correct {
        border-color: #198754 !important;
    }  
</style>
