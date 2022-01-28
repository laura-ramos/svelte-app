<script>
    import { onMount } from "svelte";
    import { fade, blur, slide, scale, fly} from "svelte/transition";
    import { flip} from "svelte/animate"
    let datos = {
        titulo: "Test: ¿Cual es tu viaje ideal?",
        descripcion : "Paris, Nueva york, sidney, Dubai... ¡Descubre cual es tu destino ideal y haz la maleta!",
        imagen: "https://www.lavanguardia.com/files/og_thumbnail/uploads/2018/06/15/5fa43d71a111f.jpeg",
        preguntas: [
        {
            pregunta: "Para ti 'vacaciones' es sinonimo de...",
            opciones: [
                "Relax y descanso",
                "Deporte y aventura",
                "Nuevas culturas y costumbres",
                "Fiesta, alcohol y amigos",
            ],
            imagen: "https://unamglobal.unam.mx/wp-content/uploads/2018/08/vacaciones.jpg",
        },
        {
            pregunta: "¿Con quien te gustaria irte de viaje?",
            opciones: [
                "Con mis amigos de siempre",
                "No hay nada como viajar solo",
                "En pareja",
                "Con la familia",
            ],
            imagen: "https://www.fiscoclic.mx/blog/wp-content/uploads/2021/08/dias-de-vacaciones-por-anio.jpeg",
        },
        {
            pregunta: "¿Que te define mejor?",
            opciones: [
                "Romantico emperdenido",
                "Tradicional y de costumbres",
                "Atrevido me gusta vivir emociones fuertes",
                "Fiestero",
            ],
            imagen: "https://www.miguelteve.com/wp-content/uploads/2016/10/guggenheimBilbao.jpg",
        }
        ]
    };

    var pregunta = "";
    var item = datos.preguntas[0];
    var preguntas_hechas = 0;
    let quiz = false;
    let terminado = false;
    let total_preguntsas=datos.preguntas.length;
    let siguiente_pregunta = false;

    function siguiente() {
        siguiente_pregunta = true;
        if (preguntas_hechas == total_preguntsas) {
            terminado = true;
            quiz = false;
        } else {
            item = datos.preguntas[preguntas_hechas];
            preguntas_hechas++;
            siguiente_pregunta = false;
        }
    }

    function clic() {
        quiz = true;
    }
</script>

<center>
    <div class="card-quiz mb-4">
        {#if quiz == true}
        <div class="card shadow" in:fade={{duration:400, delay:400}}> 
                <img
                    src={item.imagen}
                    class="card-img-top img-title"
                    alt="..."
                />
                <h4 class="card-title mt-3">
                    {item.pregunta}
                </h4>
                <div class="card-body">
                    {#each item.opciones as opcion}
                        <!-- svelte-ignore missing-declaration -->
                        <buttom class="quiz-answer btn-answer" on:click={siguiente} in:fade>
                            {opcion}
                        </buttom>
                    {/each}
                </div>
            </div>
        {/if}
        {#if quiz == false && terminado == false}
            <div class="card shadow" in:slide>
                <img
                    src="{datos.imagen}"
                    class="card-img-top img-title"
                    alt="..."
                />
                <div class="text-center">
                    <buttom
                        class="btn btn-secondary btn-empezar animate__animated  animate__pulse animate__infinite"
                        type="button"
                        on:click={clic}>¡Empezar!</buttom
                    >
                </div>
                <h3 class="card-title mt-2">{datos.titulo}</h3>
                <div class="card-body mb-2">
                    <spam class="text-muted">
                        {datos.descripcion}
                    </spam>
                </div>
            </div>
        {/if}

        {#if terminado == true}
            <div class="card shadow" transition:fade={{duration: 500, delay:300}}>
                <img
                    src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/4b/59/86/caption.jpg?w=500&h=300&s=1"
                    class="card-img-top img-title"
                    alt="..."
                />
                <h2 class="card-title mt-2">Paris</h2>
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
</center>

<style>
    .card-quiz {
        max-width: 600px;
    }

    .img-title {
        max-height: 300px;
        object-fit: cover;
    }

    .btn-empezar {
        margin-top: -20px;
    }
</style>
