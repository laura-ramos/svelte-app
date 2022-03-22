<script>
    import { fade, blur, slide, scale, fly } from "svelte/transition";
    import { onMount } from "svelte";
    import CardText from "./componentes/card-text.svelte";
    import CardImgText from "./componentes/card-img-text.svelte";
    import Counter from "./componentes/counter.svelte";
    import CardResultados from "./componentes/card-resultados.svelte";

    //variables
    let questions = []; //preguntas
    let user_responses = []; //array donde se guarda las respuestas
    let select_answer; //pregunta seleccionada
    let current_question = 0; //preguntas hechas
    let score = 0; //numero de respuestas correctas
    let question_index = 0;

    //obtener los dattos del archivo json
    onMount(async () => {
        const response = await fetch("../data/trivia.json");
        const data = await response.json();
        questions = data; //asignar los datos obtenidos a la variable data
        user_responses = Array(questions.length).fill(null);
    });

    //Funcion para verificar que la respuesta sea correcta
    function selectOption(indexPregunta, respuesta, indexOpcion) {
        user_responses[indexPregunta] = indexOpcion;
        setTimeout(() => {
            questions[indexPregunta].ver = true;
            if (respuesta == true) {
                score++;
            }
        }, 1000);
    }
</script>

<div class="grid justify-center items-center">
    <!--Verificar si existen datos-->
    {#if questions}
        <div class="md:w-[40rem] sm:w-full w-full">
            <div class="text-2xl font-semibold leading-tight">
                <p>Que tanto sabes de Harry Poter!!</p>
            </div>
            <!--Mostrar las preguntas-->
            <div class="">
                {#each questions as item, index}
                    <div class="item-q">
                        <div class="mr-2">
                            <Counter
                                total={user_responses.length}
                                current={index + 1}
                            />
                        </div>
                        {#if item.ver == true}
                            <div class="slideUp">
                                <CardText descripcion={item.respuesta} />
                            </div>
                        {:else}
                            <CardImgText
                                texto={item.pregunta}
                                imagen={item.img}
                                alt=""
                            />
                        {/if}
                        <div class="card-body shadow-xl">
                            {#each item.opciones as opcion, i}
                                <button
                                    class="btn btn-sm btn-block btn-outline mt-1 rounded-full"
                                    class:btn-success={item.ver && opcion.correcto}
                                    class:btn-error={user_responses[index] === i && opcion.correcto == false}
                                    on:click={() =>
                                        selectOption(index, opcion.correcto, i)}
                                    disabled={item.ver == true}
                                    >{opcion.opcion}</button
                                >
                            {/each}
                        </div>
                        <br />
                    </div>
                {/each}
                <CardResultados score={score} total={questions.length} />
            </div>
        </div>
    {/if}
    <br />
</div>

<style>
    .slideUp {
        animation: slidein 1s ease 0s 1 normal none;
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
