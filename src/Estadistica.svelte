<script>
    let datos = [
        { opcion: "Adquirir nuevos clientes", votos: 50 },
        { opcion: "Activar clientes existentes", votos: 20 },
        { opcion: "Retener a los clientes existentes", votos: 80 },
    ];
    let item = datos[0];
    let preguntas_hechas = 0;
    let correcto = "";
    let mostrarRespuesta = false;
    let respuesta_correcta = 0;
    function oprimir_btn(tipo) {}

</script>

<div class="content">
    <div class="contenido">
        <div class="encabezado">
            <div class="titulo">¿Cuál es el KPI principal de tu blog?</div>
            <div class="opciones">
                {#each datos as d}
                    <!-- svelte-ignore missing-declaration -->
                    <div class="quiz-answer" on:click={oprimir_btn()}>
                        <div class="">
                            <span>{d.opcion}</span>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>


<div class="content-question">
    <div>
        <p>What Kind of E-Commerce Store Do You Have?</p>
    </div>
    <div>
        <button class="single-answer" type="button">
            <div class="pb-grid-quiz-answer">
                <img
                    alt="Fashion "
                    src="https://img.ex.co/image/upload/ar_1,c_crop/q_auto:best,f_auto,fl_lossy,w_640,c_limit,dpr_1/v1635963520/blvevhbjbdgaua5c22vc.jpg"
                />
                <p font="poppins" class="ql-font-poppins">Fashion</p>
            </div>
        </button>
        <button class="single-answer" type="button">
            <div class="pb-grid-quiz-answer">
                <img
                    alt="Fashion "
                    src="https://img.ex.co/image/upload/ar_1,c_crop/q_auto:best,f_auto,fl_lossy,w_640,c_limit,dpr_1/v1635963488/wd19ares3m1lag5uqtmm.jpg"
                />
                <p font="poppins" class="ql-font-poppins">Beauty</p>
            </div>
        </button>
        <button class="single-answer" type="button">
            <div class="pb-grid-quiz-answer">
                <img
                    alt="Fashion "
                    src="https://img.ex.co/image/upload/ar_1,c_crop/q_auto:best,f_auto,fl_lossy,w_640,c_limit,dpr_1/v1635963557/qqrm2qzn61vw4aeo3rtf.jpg"
                />
                <p font="poppins" class="ql-font-poppins">
                    Health and Wellness
                </p>
            </div>
        </button>
    </div>
</div>

<style>
    .opciones {
        color: #000;
    }
    .content-question {
        background-color: rgb(245, 215, 245);
        justify-content: center;
        width: 500px;
        padding: 10px;
        text-align: center;
    }
    .single-answer {
        border: none;
        background: transparent;
    }
    .single-answer img {
        border-radius: 100%;
        width: 100px;
        height: 100px;
    }
</style>
