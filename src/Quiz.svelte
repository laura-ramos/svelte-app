<script>
    import { fade, blur, slide, scale, fly } from "svelte/transition";
    import CardImagen from "./componentes/card-img.svelte";
    import Progress from "./componentes/progress.svelte";
    import Counter from "./componentes/counter.svelte";
    import CalcularResultados from "./componentes/calcular-resultados.svelte";
    import CardResultados from "./componentes/card-resultados.svelte";
    import { onMount } from "svelte";
    //variables
    let questions = []; //preguntas
    let question_length = 0; //numero de preguntas
    let user_responses = []; //respuestas
    let question_index = 0; //preguntas hechas
    let score = 0; //numero de respuestas correctas

    //Obtener las preguntas del archivo json
    onMount(async () => {
        const response = await fetch("/preguntasYrespuestas.json");
        const data = await response.json();
        questions = data; //asignar las preguntas a la variable datos
        question_length = questions.length;
        user_responses = Array(questions.length).fill(null);
    });

    //funcion para pasar a la siguente pregunta
    function next(respuesta) {
        console.log(user_responses)
        setTimeout(() => {
            question_index++;
            if (respuesta == true) {
                score++; //sumar respuestas correctas
            }
            if (question_index == question_length) {
                calcularResultados();
            }
        }, 1000);
    }
    //funcion que registra la respuesta de la pregunta
    function selectOption(i, respuesta) {
        user_responses[question_index] = i;
        questions[question_index].contestada = true;
        next(respuesta);
    }
    //funcion para repetir el quiz
    function restart() {
        question_index = 0;
        score = 0;
        user_responses = Array(question_length).fill(null);
        questions[question_index].contestada = false;
    }
    let calcular = false;
    function calcularResultados() {
        calcular = true;
        setTimeout(() => {
            calcular = false;
        }, 1000);
    }
</script>

<div class="grid justify-center items-center">
    <br />
    <div class="m-2 text-2xl font-semibold leading-tight">
        <p>Quiz de cultura general</p>
    </div>
    {#if questions}
        <div class="md:w-[40rem] sm:w-full w-screen">
            {#if question_length == question_index}
                {#if calcular}
                    <CalcularResultados />
                {:else}
                    <CardResultados score={score} total={question_length} />
                {/if}
            {:else}
                <div class="flex justify-between mr-2">
                    <Progress
                        steps={question_length}
                        current={question_index}
                        past={user_responses}
                    />
                    <Counter
                        total={question_length}
                        current={question_index + 1}
                    />
                </div>
                {#each questions as question, index}
                    {#if question_index === index}
                        <div
                            class="w-full bg-white rounded shadow-md p-4 mt-4">
                            <!-- svelte-ignore a11y-img-redundant-alt -->
                            <div class="w-full -mt-9">
                                <CardImagen imagen={question.imagen} alt="" />
                            </div>
                            <div class="card-body">
                                <h2 class="card-title">{question.pregunta}</h2>
                                <div class="">
                                    {#each question.opciones as opcion, i}
                                        <button in:blur={{duration: 700, delay: 200*i}}
                                            class="btn btn-sm btn-block btn-outline mt-2"
                                            class:btn-info={opcion.tipo == true && question.contestada}
                                            class:btn-error={user_responses[index] == i && opcion.tipo == false}
                                            on:click={() =>
                                                selectOption(
                                                    i,
                                                    opcion.tipo
                                                )} >
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
</div>
