<script>
    import { onMount } from "svelte";
    import { fade, blur, slide, scale, fly } from "svelte/transition";
    import Modal from "./Modal.svelte";
    import AnswerImg from "./componentes/img-answer.svelte";
    let showPopup = false;
    let datos;
    //Obtener las preguntas del archivo json
    onMount(async () => {
        const response = await fetch("../data/opciones.json");
        const data = await response.json();
        datos = data; //asignar las preguntas a la variable datos
    });

    const onShowPopup = (ev) => {
        showPopup = true;
    };
    const onPopupClose = (data) => {
        showPopup = false;
        console.log(data);
    };
    let preguntas_hechas = 0;
    function next() {
        preguntas_hechas++;
    }
    const clickMethod = (evt) => {
        // Dentro del objeto evt, llega el valor detail con el payload
        console.log(evt, evt.detail);
        preguntas_hechas++;
    };
</script>

<!-- Button modal -->
<div class="bottom-right">
    <button
        type="button"
        class="border-0 bg-transparent"
        on:click={onShowPopup}
    >
        <div class="bottom-content">¿Estas lista para el invierno?</div>
    </button>
</div>
<Modal open={showPopup} onClosed={(data) => onPopupClose(data)} data={datos}>
    <h2>Testing</h2>
</Modal>
<div class="body-container">
    {#if datos}
        <div class="bg-white modal-b">
            {#each datos as pregunta, questionIndex}
                {#if preguntas_hechas === questionIndex}
                    <div class="image-container">
                        <img
                            src={pregunta.imagen}
                            class="card-img"
                            alt="..."
                        />
                    </div>
                    <div class="card-title text-center">
                        <h2>
                            {pregunta.pregunta}
                        </h2>
                    </div>
                    <div class="card-body">
                        <div class="row justify-content-center">
                            {#each pregunta.opciones as item}
                                <div class="col-md-4">
                                    <button
                                        class="btn-answer"
                                        title=""
                                        type="button"
                                        on:click={next}
                                    >
                                        <div class="pb-grid-quiz-answer">
                                            <div class="answer-image-container">
                                                <img
                                                    alt="Jugo"
                                                    class="img-zoom"
                                                    src={item.img}
                                                />
                                            </div>
                                            <div class="text">
                                                <p>{item.text}</p>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            {/each}
                        </div>
                    </div>
                {/if}
            {/each}
        </div>
    {/if}
</div>

<style>
    .image-container{
        height: 400px;
    }
    .card-img{
        object-fit: cover;
        width: 100%;
        height: 100%;
    }
    .bottom-right {
        bottom: 0;
        right: 0;
        position: fixed;
        margin-top: 0;
        margin-right: 15px;
        margin-bottom: 15px;
        margin-left: 0;
    }
    .bottom-content {
        width: 245px;
        height: 80px;
        display: flex;
        align-items: center;
        border-radius: 40px;
        background: #fff;
        overflow: hidden;
        transition: width 0.5s ease-in-out;
        box-shadow: 0 3px 20px -12px #000;
    }
    .btn-answer {
        background-color: transparent;
        border: none;
    }
    .answer-image-container {
        overflow: hidden;
        border-radius: 12px;
        max-height: 180px;
    }
    .answer-image-container:hover {
        border: 3px solid rgb(91, 55, 112);
    }
    button:active {
        background-color: transparent;
    }
    .text {
        padding: 5px;
    }
</style>
