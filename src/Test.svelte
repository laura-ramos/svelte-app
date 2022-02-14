<script>
    import { onMount } from "svelte";
    import { fade, blur, slide, scale, fly} from "svelte/transition";
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

<div class="body-container">
    {#if datos}
        <div class="card-quiz mb-4">
            <div class="section-title">
                <p>Test: ¿Cuál es tu viaje ideal?</p>
            </div>
            <!--Tarjeta que se muestra al inicio antes de reponder el test-->
            {#if quiz == false && terminado == false}
                <div class="card shadow" in:slide>
                    <div class="image-container">
                        <img
                            src="{datos.imagen}"
                            class="img-title"
                            alt="..."
                        />
                    </div>
                    <div class="text-center">
                        <button
                            class="btn btn-secondary btn-empezar pulse"
                            type="button"
                            on:click={empezar}>¡Empezar!</button
                        >
                        <h3 class="card-title mt-2">{datos.titulo}</h3>
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
                    <div class="card shadow" in:fade> 
                        <div class="image-container">
                            <img
                                src={question.imagen}
                                class="card-img-top img-title"
                                alt="..."
                            />
                        </div>
                        <div class="section-title m-2 text-center">
                            {question.pregunta}
                        </div>
                        <div class="card-body">
                            <!--mostrar las opciones de respuesta de las preguntas-->
                            {#each question.opciones as opcion, index}
                                <button class="btn-custom w-100" class:selected="{respuestas[questionIndex] === index}" on:click={() => selectOpcion(index)}>
                                    {opcion}
                                </button>
                            {/each}
                        </div>
                    </div>
                    {/if}
                {/each}
            {/if}
            <!--Verificar si todas las preguntas fueron repondidas y mostrar el resultado final-->
            {#if total_preguntas == preguntas_hechas}
                <div class="card shadow" transition:fade={{duration: 500, delay:300}}>
                    <img
                        src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/4b/59/86/caption.jpg?w=500&h=300&s=1"
                        class="card-img-top img-title"
                        alt="..."
                    />
                    <div class="section-title m-2 text-center">Paris</div>
                    <div class="card-body">
                        Al norte de Francia se encuentra la capital del país, una de
                        las ciudades más importantes en la historia del país galo y
                        de toda Europa. Con más de dos millones de habitantes es
                        además una de las capitales más pobladas del viejo
                        continente y uno de los destinos más visitados de todo el
                        mundo gracias a su historia, sus actividades culturales, su
                        gastronomía etc.
                    </div>
                </div>
            {/if}
        </div><br><br>
    {/if}
</div>

<style>
    .img-title {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }

    .btn-empezar {
        margin-top: -20px;
    }

    .image-container{
        position: relative;
        overflow: visible;
        background-color: #dbdbdb;
        height: 400px;
    }
    .section-title{
        font-size: 24px;
        font-weight: 700;
        line-height: 1.25;
    }
</style>
