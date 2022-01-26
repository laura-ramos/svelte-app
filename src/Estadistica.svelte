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

<center>
    <div class="card-widget">
        {#if flipped}
            <div
                class="back"
                transition:flip
                style="background-image: url({fondo})"
            >
                <div class="align-middle">
                    <h3>
                        Get EX.CO's Digital Interactions Platform for FREE!
                        Apply for EX.CO's Spotlight SMB Program Below...
                    </h3>
                    <button
                        class="btn btn-primary animate__animated  animate__pulse animate__infinite"
                        >Ver mas</button
                    >
                </div>
            </div>
        {:else}
            <div class="front">
                <div class="row">
                    <div class="col-md-12">
                        <h3 class="m-5">
                            What Kind of E-Commerce Store Do You Have?
                        </h3>
                    </div>
                    {#each datos as item}
                        <div class="col-md-4 col-sm-6 col-6">
                            <button
                                class="btn"
                                type="button"
                                on:click={() => clic(item.img)}
                            >
                                <div class="img-card">
                                    <img
                                        alt="Fashion"
                                        class="img-thumbnail rounded-circle"
                                        src={item.img}
                                    />
                                    <h5 class="card-title">
                                        {item.opcion}
                                    </h5>
                                </div>
                            </button>
                        </div>
                    {/each}
                </div>
            </div>{/if}
    </div>
</center>

<style>
    .card-widget {
        max-width: 600px !important;
    }
    .front {
        background-color: rgb(245, 215, 245);
    }

    .back,
    .front {
        display: flex;
        justify-content: center;
        align-content: center;
        flex-direction: column;
        text-align: center;
    }

    .back {
        height: 400px;
        width: 600px;
    }
    .btn:hover .img-thumbnail {
        max-width: 105%;
    }
</style>
