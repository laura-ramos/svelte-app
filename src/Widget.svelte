<script>
    let datos = [
        {
            pregunta: "Pick the false statement.",
            image: "https://estaticos.muyinteresante.es/uploads/images/categories/viajes-y-expediciones_cuadrada.jpg",
            opciones: [
                {
                    respuesta: "John lives in Wisconsin.",
                    tipo: true
                },
                {
                    respuesta: "Charlie is in the U.S. with John's parents.",
                    tipo: false
                },
                {
                    respuesta: "John has a dog called Charlie.",
                    tipo: false
                },
            ],
        },
        {
            pregunta: "Pick the false statement.",
            image: "https://www.viveusa.mx/sites/default/files/field/image/tendencias_de_viaje_2022.jpeg",
            opciones: [
                {
                    respuesta: "Christina has lived in Berlin for two decades.",
                    tipo: false
                },
                {
                    respuesta: "Christina was not born in Germany.",
                    tipo: true
                },
                {
                    respuesta: "Christina is visiting from Vietnam.",
                    tipo: false
                },
            ],
        },
        {
            pregunta: "Pick the false statement.",
            image: "https://img.ex.co/image/upload/ar_1,c_crop/q_auto:best,f_auto,fl_lossy,w_640,c_limit,dpr_1/v1635963557/qqrm2qzn61vw4aeo3rtf.jpg",
            opciones: [
                {
                    respuesta: "John and Christina will meet up the same day.",
                    tipo: false
                },
                {
                    respuesta: "Christina hates chatting online.",
                    tipo: false
                },
                {
                    respuesta: "John and Christina will go for a beer the next day.",
                    tipo: true
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
    function oprimir_btn(tipo) {
        mostrarRespuesta = true;
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
            }, 2000);
            siguiente = true;
        } else {
            setTimeout(() => {
                mostrarRespuesta = false;
                preguntas_hechas++;
                item = datos[preguntas_hechas];
            }, 2000);
        }
    }
</script>

<div class="content">
    <div class="contenido">
        {preguntas_hechas + 1}/{datos.length}
        <div class="encabezado" style="background-image: url({item.image});">
            <div class="titulo animate__animated animate__bounce">
                <h3>{item.pregunta}</h3>
            </div>
        </div>
        {#if item.opciones}
            <div class="respuestas border">
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
