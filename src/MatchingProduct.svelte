<script>
    import { onMount } from "svelte";
    import { fade, blur, slide, scale, fly } from "svelte/transition";
    import CardImagen from "./componentes/card-img.svelte";
    import CalcularResultados from "./componentes/calcular-resultados.svelte";
    let datos;
    let total_preguntas = 0;
    let respuestas = [];
    //Obtener las preguntas del archivo json
    onMount(async () => {
        const response = await fetch("../data/opciones.json");
        const data = await response.json();
        datos = data; //asignar las preguntas a la variable datos
        total_preguntas = data.length;
        respuestas = Array(datos.length).fill(null);
    });
    let preguntas_hechas = 0;
    function next(i) {
        datos[preguntas_hechas].clic = true;
        respuestas[preguntas_hechas]=i;
            console.log(datos)
        setTimeout(() => {
            preguntas_hechas++;
 
        }, 2000);

    }
</script>
<div class="grid justify-center items-center">
    {#if datos}
        <div class="md:w-[40rem] sm:w-full w-full">
            {#each datos as pregunta, questionIndex}
                {#if preguntas_hechas === questionIndex}
                <div class="card bg-base-100 shadow-md">
                    <CardImagen imagen={pregunta.imagen}></CardImagen>
                    <div class="card-body">
                        <h2 class="card-title">{pregunta.pregunta}</h2>
                        <div class="grid grid-cols-2 gap-4 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
                            {#each pregunta.opciones as item, index}
                                <div class="avatar grid">
                                    <div class="md:w-40 lg:w-44 sm:w-32 rounded-xl hover:shadow-2xl" on:click={() => next(index)}>
                                        <img src={item.img} alt="" class="transform hover:scale-110 duration-200 cursor-pointer" />
                                    </div>
                                    {#if respuestas[questionIndex] == index}
                                    <div class="md:w-40 lg:w-44 sm:w-32 rounded-xl absolute flex justify-center m-2">
                                        <svg class="h-10 w-10 text-white bg-lime-600 rounded-full" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  
                                            <path stroke="none" d="M0 0h24v24H0z"/>
                                            <path d="M5 12l5 5l10 -10" />
                                        </svg>
                                     </div>
                                    {/if}
                                    <h5 class="mt-3 text-center font-semibold">{item.text}</h5>
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>
                    
                {/if}
            {/each}
            {#if preguntas_hechas == total_preguntas}
                <CalcularResultados/>
            {/if}
            
        </div>
    {/if}
</div>