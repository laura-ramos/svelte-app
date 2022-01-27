<script>
    import { onMount } from "svelte";
    let datos = [
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
        },
    ];
    const API = "/datos.json";
    onMount(async () => {
        const res = await fetch(API);
        //datos = await res.json();
    });

    var pregunta = "";
    var item = datos[0];
    var preguntas_hechas = 0;
    let quiz = false;
    let terminado = false;
    let total_preguntsas=datos.length;
    function siguiente() {
        console.log(9)
        console.log(preguntas_hechas)
        if (preguntas_hechas == total_preguntsas) {
            terminado = true;
            quiz = false;
        } else {
            //i = preguntas_hechas;
            item = datos[preguntas_hechas];
            preguntas_hechas++;
        }
    }

    function clic() {
        quiz = true;
    }
</script>

<center>
    <div class="card-quiz">
        {#if quiz == true}
            <div class="card">
                <img
                    src={item.imagen}
                    class="card-img-top img-title"
                    alt="..."
                />
                <h5 class="card-title mt-2">
                    {item.pregunta}
                </h5>
                <div class="card-body">
                    {#each item.opciones as opcion}
                        <!-- svelte-ignore missing-declaration -->
                        <buttom class="quiz-answer" on:click={siguiente}>
                            {opcion}
                        </buttom>
                    {/each}
                </div>
            </div>
        {/if}
        {#if quiz == false && terminado == false}
            <div class="card">
                <img
                    src="https://www.lavanguardia.com/files/og_thumbnail/uploads/2018/06/15/5fa43d71a111f.jpeg"
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
                <h5 class="card-title mt-2">Test: ¿Cual es tu viaje ideal?</h5>
                <div class="card-body">
                    Paris, Nueva york, sidney, Dubai ... <br />
                    !Descubre es tu destino ideal y haz la maleta!
                </div>
            </div>
        {/if}

        {#if terminado == true}
            <div class="card">
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
    </div>
</center>

<style>
    .card-quiz {
        max-width: 600px;
    }

    .img-title {
        max-height: 200px;
        object-fit: cover;
    }

    .btn-empezar {
        width: 100px;
        margin-top: -20px;
    }
</style>
