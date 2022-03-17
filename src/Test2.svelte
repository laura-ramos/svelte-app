<script>
    import { onMount } from "svelte";
    import { fade, blur, slide, scale, fly} from "svelte/transition";
    import CardImagen from "./componentes/card-img.svelte";
    import CardResultados from "./componentes/card-resultados.svelte";
    let datos;
    let total_preguntas = 0;
    let respuestas = [];
    let preguntas_hechas = 0;
    let quiz = false;
    let terminado = false;
    //obtener los datos del archivo json
    onMount(async () => {
        const response = await fetch("../data/datosTest.json");
        const data = await response.json();
        //asignar los datos obtenidos a una variable
        datos = data;
        total_preguntas = datos.preguntas.length;
        respuestas = Array(datos.preguntas.length).fill(null);
    });

    //funcion para pasar a la siguiente pregunta
    function next() {
        if (preguntas_hechas == total_preguntas) {
            terminado = true;
            quiz = false;
        } else {
            preguntas_hechas++;//sumar preguntas realizadas
        }
    }
    //guardar la respuesta seleccionada
    function selectOpcion(i){
        respuestas[preguntas_hechas]=i;
        next();//pasar a la siguiente pregunta
    }

    //empezar el test
    function empezar() {
        quiz = true;
    }
</script>

<div class="grid justify-center items-center justify-items-center">
    {#if datos}
    <div class="md:w-[40rem] sm:w-full w-full">
            <div class="section-title">
                <p>Test: ¿Cuál es tu viaje ideal?</p>
            </div>
            <!--Tarjeta que se muestra al inicio antes de reponder el test-->
            {#if quiz == false && terminado == false}
                    <div class="card shadow" in:slide>
                    <div class="">
                        <img
                            src="{datos.imagen}"
                            class="img-title"
                            alt=""
                        />
                    </div>
                    <div class="text-center">
                        <button
                            class="btn btn-secondary pulse -mt-10 animate-bounce"
                            type="button"
                            on:click={empezar}>¡Empezar!</button>
                        <h3 class="mt-4 mb-4 text-xl font-semibold leading-tight">{datos.titulo}</h3>
                        <div class="card-body mb-2">
                            <spam class="text-muted">
                                {datos.descripcion}
                            </spam>
                        </div>
                    </div>
                </div>  
            {/if}
            {#if quiz == true}
                <!--Mostrar las preguntas-->
                {#each datos.preguntas as question, questionIndex}
                    {#if preguntas_hechas === questionIndex}
                    {preguntas_hechas+1}/{total_preguntas}
                    <div class="shadow-lg">
                        <CardImagen imagen={question.imagen} alt=""></CardImagen> 
                        <div class="">
                            <div class="bg-white p-6">
                                <div class="card-title mb-4">
                                {question.pregunta}
                            </div>
                            <!--mostrar las opciones de respuesta de las preguntas-->
                            {#each question.opciones as opcion, index}
                                <button class="btn btn-sm btn-block btn-outline mt-2" class:selected="{respuestas[questionIndex] === index}" on:click={() => selectOpcion(index)}>
                                    {opcion}
                                </button>
                            {/each}
                            </div>
                          
                        </div>  
                    </div>
                        
                    {/if}
                {/each}
            {/if}
            <!--Verificar si todas las preguntas fueron repondidas y mostrar el resultado final-->
            {#if total_preguntas == preguntas_hechas}
                <CardResultados correcto='' total={total_preguntas}/>
            {/if}
        <br><br>
    </div>
    {/if}
</div>
