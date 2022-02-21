<script>
    import { fade, blur, slide, scale, fly } from "svelte/transition";
    import CardImagen from "./componentes/card-img.svelte";
    import CardText from "./componentes/card-text.svelte";
    import { onMount } from "svelte";
    let datos;
    let total_preguntas = 0;
    let respuestas = [];
    //Obtener las preguntas del archivo json
    onMount(async () => {
        const response = await fetch("../data/preguntasYrespuestas.json");
        const data = await response.json();
        datos = data;//asignar las preguntas a la variable datos
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
        next(respuesta);
    }
    //funcion para repetir el quiz
    function repetir() {
        preguntas_hechas = 0;
        respuesta_correcta = 0;
        respuestas = Array(datos.length).fill(null);
    }
</script>

<div class="body-container">
    <br>
    <div class="section-title">
        <p>Quiz de cultura general</p>
    </div>
    {#if datos}
        <div class="widget-quiz">
        <br>
        {#each datos as question, questionIndex}
            {#if preguntas_hechas === questionIndex}
                <div class="card border-0">
                    <div class="card-inner" in:fade>
                        <CardImagen imagen={question.imagen} alt=""></CardImagen>
                        <div class="card-body shadow">
                            <h5 class="card-title mb-4">{question.pregunta}</h5>
                            {#each question.opciones as opcion, index}
                                <div class="btn-custom" class:selected="{respuestas[questionIndex] === index}" on:click={()=>selectOption(index, opcion.tipo)}>
                                    {opcion.respuesta}
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>
            {/if}
        {/each}
        </div>
        {#if total_preguntas == preguntas_hechas}
            <div in:slide>
                <CardText title={respuesta_correcta}/{total_preguntas}></CardText>
                <div class="card-footer bg-secondary">
                    <spam class="text-muted"> 120 personas realizaron este quiz </spam>
                    <button class="btn btn-light pulse" on:click={repetir}
                            >Repetir</button>
                </div>
            </div> 
        {/if}
    {:else}
        <div>Error al obtener los datos</div>
    {/if}
    
</div>
<style>
    .widget-quiz {
        margin-left: 20px;
        height: 100%;
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

    .card::before {
        transform: translate(-10px, -10px);
    }

    .card::after {
        transform: translate(-20px, -20px);
    }
</style>
