<script>
    import { onMount } from "svelte";
    import { fade, blur, slide, scale, fly} from "svelte/transition";
    import CardImagen from "./componentes/card-img.svelte";
    import Test2 from "./Test2.svelte";
    import Counter from "./componentes/counter.svelte";
    //variables
    let questions = []; //preguntas
    let question_length = 0; //numero de preguntas
    let user_responses = []; //respuestas
    let select_answer; //pregunta seleccionada
    let question_index = 0; //preguntas hechas
    let score = 0; //numero de respuestas correctas
    let quiz = false;

    //obtener los datos del archivo json
    onMount(async () => {
        const response = await fetch("../data/datosTest.json");
        const data = await response.json();
        //asignar los datos obtenidos a una variable
        questions = data;
        question_length = questions.preguntas.length;
        user_responses = Array(question_length).fill(null);
    });

    //funcion para pasar a la siguiente pregunta
    function next() {
        setTimeout(() => {
            if (question_index == question_length) {
                quiz = false;
            } else {
                question_index++;//sumar preguntas realizadas
            }
        }, 1000);
        
    }
    //guardar la respuesta seleccionada
    function selectOpcion(i){
        user_responses[question_index]=i;
        next();//pasar a la siguiente pregunta
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
            {#if quiz == false}
                 <div class="text-gray-900 flex">
                 <div>
                   <img
                     src={questions.imagen}
                     alt=""
                     class="w-full object-cover object-center rounded-lg shadow-md"
                   />
                   <div class="relative px-4 -mt-16 text-center">
                     <div class="bg-white p-6 rounded-lg shadow-lg">
                        <button
                        class="btn btn-secondary animate-bounce"
                        type="button"
                        on:click={empezar}>¡Empezar!</button>
                       <h4 class="mt-4 mb-4 text-xl font-semibold leading-tight truncate">
                         Test: ¿Cual es tu viaje ideal?
                       </h4>
                       <div class="mt-3">
                         Paris, Nueva york, sidney, Dubai... ¡Descubre cual es tu destino ideal
                         y haz la maleta!
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
            {/if}
            {#if quiz == true}
                <!--Mostrar las preguntas-->
                {#each questions.preguntas as question, index}
                    {#if question_index === index}
                    <div class="mr-2 text-right">
                        <Counter total={question_length} current={question_index+1}/> 
                    </div>
                    <div class="text-gray-900">
                        <div>
                        <CardImagen imagen={question.imagen} alt=""></CardImagen> 
                        <div class="relative px-4 -mt-16 text-center">
                            <div class="bg-white p-6 rounded-lg shadow-lg">
                                <div class="card-title mb-4">
                                {question.pregunta}
                            </div>
                            <!--mostrar las opciones de respuesta de las preguntas-->
                            {#each question.opciones as opcion, i}
                                <button class="btn btn-sm btn-block btn-outline mt-2" class:selected="{user_responses[index] === i}" on:click={() => selectOpcion(index)}>
                                    {opcion}
                                </button>
                            {/each}
                            </div>
                          
                        </div>  
                        </div>

                    </div>
                        
                    {/if}
                {/each}
            {/if}
            <!--Verificar si todas las preguntas fueron repondidas y mostrar el resultado final-->
            {#if question_length == question_index}
            <div class="text-gray-900">
                <div>
                    <CardImagen imagen='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/4b/59/86/caption.jpg?w=500&h=300&s=1'></CardImagen>
                    <div class="relative px-4 -mt-16">
                        <div class="bg-white p-6 rounded-lg shadow-lg">
                            <div class="mt-4 mb-4 text-xl font-semibold leading-tight text-center">Paris</div>
                            Al norte de Francia se encuentra la capital del país, una de
                            las ciudades más importantes en la historia del país galo y
                            de toda Europa. Con más de dos millones de habitantes es
                            además una de las capitales más pobladas del viejo
                            continente y uno de los destinos más visitados de todo el
                            mundo gracias a su historia, sus actividades culturales, su
                            gastronomía etc.
                        </div>
                    </div>
                </div>

            </div>
            {/if}
        <br><br>
    </div>
    {/if}
    <Test2/>
</div>
