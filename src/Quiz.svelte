<script>
    import { fade, blur, slide, scale, fly } from "svelte/transition";
    import CardImagen from "./componentes/card-img.svelte";
    import CardText from "./componentes/card-text.svelte";
    import Progress from "./componentes/progress.svelte";
    import Counter from "./componentes/counter.svelte";
    import CardImgText from "./componentes/card-img-text.svelte";
    import { onMount } from "svelte";
    let datos;
    let total_preguntas = 0;
    let respuestas = [];
    let terminado = false;
    //Obtener las preguntas del archivo json
    onMount(async () => {
        const response = await fetch("../data/preguntasYrespuestas.json");
        const data = await response.json();
        datos = data;//asignar las preguntas a la variable datos
        console.log(datos)
        total_preguntas = datos.length;
        respuestas = Array(datos.length).fill(null);
    });
    let preguntas_hechas = 0;
    let respuesta_correcta = 0;
    
    //funcion para pasar a la siguente pregunta
    function next(respuesta) {
        setTimeout(() => {
            if (respuesta == true) {
                respuesta_correcta++;//sumar respuestas correctas
            }
            if (preguntas_hechas < total_preguntas) {
                preguntas_hechas++;//sumar preguntas hechas
            }
        }, 1000);
    }
    //funcion que registra la respuesta de la pregunta
    function selectOption(i,respuesta){
        respuestas[preguntas_hechas]=i;
        datos[preguntas_hechas].contestada = true;
        next(respuesta);

    }
    //funcion para repetir el quiz
    function repetir() {
        preguntas_hechas = 0;
        respuesta_correcta = 0;
        respuestas = Array(datos.length).fill(null);
        datos[preguntas_hechas].contestada = false
    }
</script>

<div class="grid justify-center items-center">
    <br>
    <div class="m-2 text-2xl font-semibold leading-tight">
        <p>Quiz de cultura general</p>
    </div>
    {#if datos}
        <div class="widget">
            {#if total_preguntas == preguntas_hechas}
                <div class="card shadow-xl" in:slide style="width: 500px;">
                    <CardText title={respuesta_correcta}/{total_preguntas}></CardText>
                    <div class="p-4">
                        <p class="mb-4"> 120 personas realizaron este quiz </p>
                        <button class="btn animate-bounce" on:click={repetir}>Repetir</button>
                    </div>
                </div>
            {:else}
                <div class="flex justify-between mr-2">
                    <Progress steps={total_preguntas} current={preguntas_hechas} past={respuestas}/>
                    <Counter total={total_preguntas} current={preguntas_hechas+1}/> 
                </div>
                {#each datos as question, questionIndex}
                    {#if preguntas_hechas === questionIndex}
                        <div class="w-full bg-white rounded shadow-xl p-4 mt-4">
                            <!-- svelte-ignore a11y-img-redundant-alt -->
                            <div class="w-full -mt-9">
                                <CardImagen imagen={question.imagen} alt=""></CardImagen> 
                            </div>
                            <div class="card-body">
                                <h2 class="card-title">{question.pregunta}</h2>
                                <div class="text-gray-700">
                                    {#each question.opciones as opcion, index}
                                    <button class="btn btn-sm btn-block btn-outline mt-2" class:btn-info={opcion.tipo == true && question.contestada} on:click={()=>selectOption(index, opcion.tipo)}>
                                        {opcion.respuesta}
                                    </button>
                                    {/each}
                                </div>
                            </div>
                        </div>
                    {/if}
                {/each}
            {/if}
        </div>
    {:else}
        <div>Error al obtener los datos</div>
    {/if}
    
    <CardImgText imagen="https://unamglobal.unam.mx/wp-content/uploads/2018/08/vacaciones.jpg" texto="Cual es tu viaje ideal" alt=""/> 
    <br>
</div>


<style>
    .widget {
        max-width: 640px;
    }
</style>
