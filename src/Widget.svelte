<script>
    import { fade, blur, slide, scale, fly } from "svelte/transition";
    import { onMount } from "svelte";
    let datos;
    let total_preguntas = 0;
    onMount(async () => {
        const response = await fetch("../preguntasYrespuestas.json");
        const data = await response.json();
        datos = data;
        total_preguntas = datos.length;
    });
    let preguntas_hechas = 0;
    let mostrarRespuesta = false;
    let respuesta_correcta = 0;
    function next(res) {
        if (res == true) {
            respuesta_correcta++;
        }
        if (preguntas_hechas < total_preguntas) {
            preguntas_hechas++;
        }
    }
    function repetir() {
        preguntas_hechas = 0;
        respuesta_correcta = 0;
    }
</script>

<div class="body-container">
    <br>
    <div class="section-title">
        <p>Quiz de cultura general</p>
    </div>
    {#if datos}
        <div class="widget-quiz">
        <br>
            {#each datos as question, questionIndex}
                {#if preguntas_hechas === questionIndex}
                    <div class="card border-0">
                        <div class="card-inner" in:fade>
                            <img
                                src={question.imagen}
                                class="card-img-top"
                                alt="imagen"
                            />
                            <div class="card-body">
                                <h5 class="card-title">{question.pregunta}</h5>
                                {#each question.opciones as opcion}
                                    <div
                                        class="quiz-answer animate__animated {mostrarRespuesta &&
                                        opcion.tipo == true
                                            ? 'animate__pulse active'
                                            : ''}"
                                        on:click={next(opcion.tipo)}
                                    >
                                        {opcion.respuesta}
                                    </div>
                                {/each}
                            </div>
                        </div>
                    </div>
                {/if}
            {/each}
        </div>
        {#if total_preguntas == preguntas_hechas}
            <div class="card-final align-self-center text-center" in:fade>
                <div class="fs-1 w-100">{respuesta_correcta}/{total_preguntas}</div>
            </div>
            <div class="card-footer">
                <spam class="text-muted"> 120 personas realizaron este quiz </spam>
                <buttom class="btn btn-secondary animate__animated  animate__pulse animate__infinite" on:click={repetir}
                        >Repetir</buttom>
            </div>
        {/if}
    {/if}
    
</div>
<style>
    .widget-quiz {
        margin-left: 20px;
        height: 100%;
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

    .card-final {
        height: 200px;
        background-color: #f1f1f1;
        display: flex;
        align-items: center;
    }
    .section-title{
        font-size: 24px;
        font-weight: 700;
        line-height: 1.25;
    }
</style>
