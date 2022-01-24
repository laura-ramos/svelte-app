<script>
    import { onMount } from "svelte";

    let datos = [
        {
            pregunta: "What's more important to your pup?",
            opciones: ["A fun look", "A functional jacket."],
            imagen: "https://img.ex.co/image/upload/ar_1.7777777777777777,c_crop/q_auto:good,f_auto,fl_lossy,w_640,c_limit,dpr_1/v1632992139/mo1lpt7zmtvdgsbjvbxg.jpg",
            tipo: 1,
        },
        {
            pregunta: "how big is your doggo?",
            opciones: [
                "Smol (up to 24 pounds)",
                "Medium (25-57 pounds) ",
                "Lorge (58 pounds and over)",
            ],
            imagen: "https://img.ex.co/image/upload/ar_1.7777777777777777,c_crop/q_auto:good,f_auto,fl_lossy,w_640,c_limit,dpr_1/v1631744877/zzxfjwpp69kuv4y9gczs.png",
            tipo: 1,
        },
        {
            pregunta: "Stylish mid-sized jackets!",
            info: "Bold designs to stand out from the pack",
            imagen: "https://img.ex.co/image/upload/ar_1.7777777777777777,c_crop/q_auto:good,f_auto,fl_lossy,w_640,c_limit,dpr_1/v1631826419/jzwjtcvlapc4gfvfmwfz.png",
            tipo: 0,
            match: [{ text: "", imagen: "" }],
        },
    ];

    let item = [];
    var preguntas_hechas = 0;
    var quiz = true;

    function mostrarDatos(i) {
        if (preguntas_hechas == datos.length) {
            quiz = false;
            preguntas_hechas = 0;
            item = datos[0];
            //mostrar el ultimo
        } else {
            i = preguntas_hechas;
            item = datos[i];
            preguntas_hechas++;
        }
        console.log(datos);
    }

    function oprimir_btn() {
        mostrarDatos(0);
    }

    mostrarDatos(0); //mostrar la primera pregunta

    function ocultarQuiz() {
        preguntas_hechas = 0;
        quiz = false;
    }
    function respoderQuiz() {}
    var article = false;
</script>

<div class="card-quiz">
    <!-- svelte-ignore a11y-missing-attribute -->
    <img src={item.imagen} alt="" class="card-img-top" />
    <!-- svelte-ignore missing-declaration -->
    <div class="card-quiz-body">
        <h5 class="card-title">
            {item.pregunta}
        </h5>
        {#if item.tipo == 1}
            {#each item.opciones as opcion}
                <div class="quiz-answer" on:click={oprimir_btn}>
                    {opcion}
                </div>
            {/each}
        {:else}
            <div>
                {item.info}
                <button>Ver mas</button>
            </div>
        {/if}
    </div>
</div>

<style>
    .card-quiz-body{
        padding: 10px;
    }
</style>