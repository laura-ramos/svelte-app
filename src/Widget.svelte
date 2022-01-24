<script>
    let datos = [
        {
            pregunta: "Pick the false statement.",
            opciones: [
                { 
                    respuesta: "John lives in Wisconsin.", 
                    tipo: true 
                },
                {
                    respuesta: "Charlie is in the U.S. with John's parents.",
                    tipo: false,
                },
                { 
                    respuesta: "John has a dog called Charlie.", 
                    tipo: false 
                },
            ],
        },
        {
            pregunta: "Pick the false statement.",
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
            opciones: [
                {
                    respuesta: "John and Christina will meet up the same day.",
                    tipo: false,
                },
                { 
                    respuesta: "Christina hates chatting online.", 
                    tipo: false },
                {
                    respuesta:"John and Christina will go for a beer the next day.",
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
    function oprimir_btn(tipo) {
        console.log(preguntas_hechas + "-" + (datos.length-1) );
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
                
           
        } else {
            mostrarRespuesta = true;
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
        {preguntas_hechas+1}/{datos.length}
        <div class="encabezado">
            <div class="titulo">
                {item.pregunta}
            </div>
        </div>
        {#if item.opciones}
            <div class="respuestas">
                {#each item.opciones as opcion}
                    <!-- svelte-ignore missing-declaration -->
                    <div
                        class="quiz-answer {mostrarRespuesta && opcion.tipo
                            ? 'active'
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
