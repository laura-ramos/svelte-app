<script>
    let datos = [
        {
            pregunta: "Pick the false statement.",
            image: "https://estaticos.muyinteresante.es/uploads/images/categories/viajes-y-expediciones_cuadrada.jpg",
            opciones: [
                {
                    respuesta: "John lives in Wisconsin.",
                    tipo: true,
                },
                {
                    respuesta: "Charlie is in the U.S. with John's parents.",
                    tipo: false,
                },
                {
                    respuesta: "John has a dog called Charlie.",
                    tipo: false,
                },
            ],
        },
        {
            pregunta: "Pick the false statement.",
            image: "https://www.viveusa.mx/sites/default/files/field/image/tendencias_de_viaje_2022.jpeg",
            opciones: [
                {
                    respuesta: "Christina has lived in Berlin for two decades.",
                    tipo: false,
                },
                {
                    respuesta: "Christina was not born in Germany.",
                    tipo: true,
                },
                {
                    respuesta: "Christina is visiting from Vietnam.",
                    tipo: false,
                },
            ],
        },
        {
            pregunta: "Pick the false statement.",
            image: "https://img.ex.co/image/upload/ar_1,c_crop/q_auto:best,f_auto,fl_lossy,w_640,c_limit,dpr_1/v1635963557/qqrm2qzn61vw4aeo3rtf.jpg",
            opciones: [
                {
                    respuesta: "John and Christina will meet up the same day.",
                    tipo: false,
                },
                {
                    respuesta: "Christina hates chatting online.",
                    tipo: false,
                },
                {
                    respuesta:
                        "John and Christina will go for a beer the next day.",
                    tipo: true,
                },
            ],
        },
    ];
    let item = datos[0];
    let preguntas_hechas = 0;
    let correcto = "";
    let mostrarRespuesta = false;
    let respuesta_correcta = 0;
    let siguiente = false;
    let terminado = false;
    function oprimir_btn(tipo) {
        mostrarRespuesta = true;
        siguiente = true;
        console.log(preguntas_hechas + "-" + (datos.length - 1));
        if (tipo == true) {
            respuesta_correcta++;
        }
        if (preguntas_hechas >= datos.length - 1) {
            //cacular resultados

            setTimeout(() => {
                item = {
                    pregunta: respuesta_correcta + "/" + datos.length,
                };
                terminado = true;
            }, 2000);
            
        } else {
            setTimeout(() => {
                mostrarRespuesta = false;
                preguntas_hechas++;
                item = datos[preguntas_hechas];
            }, 2000);
        }
    }
</script>

<center>
    <!--<div class="contenido">
        {preguntas_hechas + 1}/{datos.length}
        <div class="encabezado" style="background-image: url({item.image});">
            <div class="titulo animate__animated animate__bounce">
                <h3>{item.pregunta}</h3>
            </div>
        </div>
        {#if item.opciones}
            <div class="respuestas border">
                {#each item.opciones as opcion}
                    <div
                        class="quiz-answer animate__animated {mostrarRespuesta &&
                        opcion.tipo == true
                            ? 'active animate__pulse'
                            : ''}"
                        on:click={oprimir_btn(opcion.tipo)}
                    >
                        {opcion.respuesta}
                    </div>
                {/each}
            </div>
        {/if}
    </div>-->
    <div class="widget-quiz">
        <div class="card">
            <div class="card-inner">
                {preguntas_hechas + 1}/{datos.length}
                <img src={item.image} class="card-img-top" alt="..." />

                <div class="card-body {terminado?'terminado':''}">
                        <h5 class="card-title">{item.pregunta}</h5>

                    {#if item.opciones}
                        <div class="">
                            {#each item.opciones as opcion}
                                <!-- svelte-ignore missing-declaration -->
                                <div
                                    class="quiz-answer animate__animated {mostrarRespuesta &&
                                    opcion.tipo == true
                                        ? 'active animate__pulse'
                                        : ''}"
                                    on:click={oprimir_btn(opcion.tipo)}
                                >
                                    {opcion.respuesta}
                                </div>
                            {/each}
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</center>

<style>
    .widget-quiz{
        margin: 10px;
        max-width: 600px;
        height: 100%;
        width: 100%;

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

    .card-inner img {
        height: 200px;
        object-fit: cover;
    }

    .card::before {
        transform: translate(-10px, -10px);
    }

    .card::after {
        transform: translate(-20px, -20px);
    }

    .terminado{
        height: 200px;
        background-color: #f1f1f1;
    }
</style>
