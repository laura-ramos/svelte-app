<script>
    import { fade, blur, slide, scale, fly } from "svelte/transition";
    import { onMount } from "svelte";
    import CardText from "./componentes/card-text.svelte";
    import CardImgText from "./componentes/card-img-text.svelte";
    import Counter from "./componentes/counter.svelte";
    import CardResultados from "./componentes/card-resultados.svelte";
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

<div class="grid justify-center items-center">
    <!--Verificar si existen datos-->
    {#if datos}
    <div class="md:w-[40rem] sm:w-full w-full">
        <div class="text-2xl font-semibold leading-tight">
            <p>Que tanto sabes de Harry Poter!!</p>
        </div>
        <!--Mostrar las preguntas-->
        <div class="">
        {#each datos as item, index}
        <div class="item-q">
            <div class="mr-2">
                <Counter total={respuestas.length} current={index+1}/> 
            </div>
            {#if item.ver == true}
            <div class="slideUp">
                <CardText descripcion={item.respuesta}></CardText>
            </div>
                
            {:else}
                <CardImgText texto={item.pregunta} imagen={item.img} alt=""></CardImgText>
            {/if}
                <div class="card-body shadow-xl">
                    {#each item.opciones as opcion, i}
                    <button class="btn btn-sm btn-block btn-outline mt-1 rounded-full" class:btn-success={item.ver && opcion.correcto} class:selected={respuestas[index] === i} on:click={() => respuesta(index, opcion.correcto, i)} disabled={item.ver == true}>{opcion.opcion}</button>
                    {/each}
                </div>
            <br /> 
        </div>

        {/each}
        <CardResultados correcto={correcto} total={datos.length}/>
        </div>
    </div>  
    {/if}
    <br>
</div>
<style>
    .slideUp{
        transition: transform .8s cubic-bezier(.63,-0.32,.4,1.39);
    }
    @keyframes slidein {
        0% {
            opacity: 0;
            transform: scale(0.6);
        }

        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
</style>
