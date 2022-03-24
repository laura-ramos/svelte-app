<script>
    import { onMount } from "svelte";
    import { fade, blur, slide, scale, fly } from "svelte/transition";
    import CardImagen from "./componentes/card-img.svelte";
    import CardText from "./componentes/card-text.svelte";
    import CardResultados from "./componentes/card-resultados.svelte";
    import Counter from "./componentes/counter.svelte";
    //variables
    let questions = []; //preguntas
    let question_length = 0; //numero de preguntas
    let user_responses = []; //respuestas
    let select_answer; //pregunta seleccionada
    let question_index = 0; //preguntas hechas
    let score = 0; //numero de respuestas correctas
    let quiz = false;
    let finish = false;

    //obtener los datos del archivo json
    onMount(async () => {
        const response = await fetch("../data/datosTest.json");
        const data = await response.json();
        //asignar los datos obtenidos a una variable
        questions = data;
        question_length = questions.preguntas.length;
        user_responses = Array(questions.preguntas.length).fill(null);
    });

    //funcion para pasar a la siguiente pregunta
    function next() {
        if (question_index == question_length) {
            terminado = true;
            quiz = false;
        } else {
            question_index++; //sumar preguntas realizadas
        }
    }
    //guardar la respuesta seleccionada
    function selectOpcion(i) {
        user_responses[question_index] = i;
        next(); //pasar a la siguiente pregunta
    }

    //empezar el test
    function empezar() {
        quiz = true;
    }
</script>

<div class="grid justify-center items-center justify-items-center">
    {#if questions}
        <div class="md:w-[40rem] sm:w-full w-full">
            <div class="m-2 text-2xl font-semibold leading-tight">
                <p>Test: ¿Cuál es tu viaje ideal?</p>
            </div>
            <!--Tarjeta que se muestra al inicio antes de reponder el test-->
            {#if quiz == false && finish == false}
                <div class="card shadow-md" in:slide>
                    <div class="">
                        <img src={questions.imagen} class="img-title" alt="" />
                    </div>
                    <div class="text-center">
                        <button
                            class="btn btn-secondary pulse -mt-10 animate-bounce"
                            type="button"
                            on:click={empezar}>¡Empezar!</button
                        >
                        <h3
                            class="mt-4 mb-4 text-xl font-semibold leading-tight"
                        >
                            {questions.titulo}
                        </h3>
                        <div class="card-body mb-2">
                            <spam class="text-muted">
                                {questions.descripcion}
                            </spam>
                        </div>
                    </div>
                </div>
            {/if}
            {#if quiz == true}
                <!--Mostrar las preguntas-->
                <div class="mr-2 text-right">
                    <Counter
                        total={question_length}
                        current={question_index + 1}
                    />
                </div>
                {#each questions.preguntas as question, index}
                    {#if question_index === index}
                        <div class="shadow-md">
                            <div in:blur={{ duration: 500, delay: 500 }}>
                                <!-- 
                                    <CardText title={question.pregunta} alt="" />
                                 -->
                                <CardImagen imagen={question.imagen} alt="" />
                            </div>

                            <div class="card-body bg-white">
                                <div class="card-title mb-4">
                                    {question.pregunta}
                                </div>
                                {#each question.opciones as opcion, i}
                                    <button in:blur={{duration: 700, delay: 200*i}}
                                        class="btn btn-sm btn-block btn-outline transition"
                                        class:selected={user_responses[index] === i}
                                        on:click={() => selectOpcion(i)}>
                                        {opcion}
                                    </button>
                                {/each}
                            </div>
                        </div>
                    {/if}
                {/each}
            {/if}
            <!--Verificar si todas las preguntas fueron repondidas y mostrar el resultado final-->
            {#if question_length == question_index}
                <CardResultados score="" total={question_length} />
            {/if}
            <br /><br />
        </div>
    {/if}
</div>
