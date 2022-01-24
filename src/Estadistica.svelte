<script>
    let datos = [
        {
            opcion: "Fashion",
            img: "https://img.ex.co/image/upload/ar_1,c_crop/q_auto:best,f_auto,fl_lossy,w_640,c_limit,dpr_1/v1635963520/blvevhbjbdgaua5c22vc.jpg",
        },
        {
            opcion: "Beauty",
            img: "https://img.ex.co/image/upload/ar_1,c_crop/q_auto:best,f_auto,fl_lossy,w_640,c_limit,dpr_1/v1635963488/wd19ares3m1lag5uqtmm.jpg",
        },
        {
            opcion: "Health and Wellness",
            img: "https://img.ex.co/image/upload/ar_1,c_crop/q_auto:best,f_auto,fl_lossy,w_640,c_limit,dpr_1/v1635963557/qqrm2qzn61vw4aeo3rtf.jpg",
        },
    ];
    let item = datos[0];
    let preguntas_hechas = 0;
    let correcto = "";
    let mostrarRespuesta = false;
    let respuesta_correcta = 0;
    function oprimir_btn(tipo) {}
    let flipped = false;

    function flip(node, { delay = 0, duration = 1500 }) {
        return {
            delay,
            duration,
            css: (t, u) => `
				transform: rotateY(${1 - u * 180}deg);
				opacity: ${1 - u};
			`,
        };
    }
    let fondo = "";
    function clic(i) {
        flipped = !flipped;
        fondo = i;
    }
</script>

<div class="content">
    <div class="card-container">
        <div class="card2">
            {#if flipped}
                <div class="side" transition:flip>
                    <div class="info" style="background-color:url({fondo})">
                        <img src={fondo} alt="" />
                        <div>
                            <h3>
                                Get EX.CO's Digital Interactions Platform for
                                FREE! Apply for EX.CO's Spotlight SMB Program
                                Below...
                            </h3>
                            <button>Ver mas</button>
                        </div>
                    </div>
                </div>
            {:else}
                <div class="side back">
                    <div class="content-question">
                        <div class="title">
                            <h3>What Kind of E-Commerce Store Do You Have?</h3>
                        </div>
                        <div>
                            {#each datos as item}
                                <button
                                    class="single-answer"
                                    type="button"
                                    on:click={() => clic(item.img)}
                                >
                                    <div class="pb-grid-quiz-answer">
                                        <img alt="Fashion" src={item.img} />
                                        <p
                                            font="poppins"
                                            class="ql-font-poppins"
                                        >
                                            {item.opcion}
                                        </p>
                                    </div>
                                </button>
                            {/each}
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    .content-question {
        background-color: rgb(245, 215, 245);
        justify-content: center;
        padding: 10px;
        text-align: center;
        height: 100%;
        width: 100%;
        height: 100%;
    }
    .content-question .title {
        margin: 20px;
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
    .single-answer:hover img {
        width: 110px;
        height: 110px;
    }
    .card-container {
        position: relative;
        height: 400px;
        width: 600px;
    }

    .card2 {
        width: 100%;
        height: 100%;
        position: absolute;
        perspective: 600;
    }

    .side {
        position: absolute;
        height: 100%;
        width: 100%;
        background-color: rgb(95, 94, 92);
        overflow: hidden;
        color: #fff;
        justify-content: center;
        align-items: center;
        display: flex;
        text-align: center;
    }

    .back {
        background-color: grey;
    }

    .info {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    .info div {
        position: absolute;
    }
</style>
