<script>
    let datos = [
        {
            titulo: "Libros que deberias de leer según tu personalidad",
            imagen: "",
            opciones: [
                {
                    opcion: "Introvertidos ",
                    img: "https://hips.hearstapps.com/es.h-cdn.co/hares/images/cultura/viajes-planes/rasgos-de-las-personas-introvertidas/3989066-1-esl-ES/los-introvertidos-el-atractivo-de-los-que-apenas-hablan.jpg",
                    recomendacion: [
                        "La elegancia del erizo (2006),Muriel Barbery",
                        '"El incidente del perro a medianoche" (2003),Mark Haddon',
                        '"El retrato del artista adolescente" (1915),James Joyce',
                    ],
                },
                {
                    opcion: "Melancólicos/Nostálgicos",
                    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOcqyaQarS7ijVfe5txK4WfJ4IJynusy6fyACvBVH9IVtzvEslD-2o4XKZYyfKKzQIjrw&usqp=CAU",
                    recomendacion: [
                        '"Los heraldos negros" (1919), César Vallejo',
                        '"Zero K" (2016), Don DeLilllo',
                        '"Submarine" (2008), Joe Dunthorne',
                    ],
                },
                {
                    opcion: "Pesimistas",
                    img: "https://lamenteesmaravillosa.com/wp-content/uploads/2017/04/hombre-triste.png",
                    recomendacion: [
                        '"El Idiota" (1868), Fiódor Dostoievski',
                        '"La carretera", Cormac McCarthy',
                        '"El proceso" (1925), Franz Kafka',
                    ],
                },
            ],
        },
    ];

    let pregunta = datos[0];
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
    let index = 0;
    function voltear(i) {
        flipped = !flipped;
        index = i;
    }
</script>

<div class="body-container">
    {#if flipped}
        <div
            class="back card"
            in:flip
            style="background-image: url({pregunta.opciones[index].img})">
            <div class="text-white card-bg">
                {#each pregunta.opciones[index].recomendacion as item}
                    <h5>{item}</h5>
                {/each}
            </div>
            <div class="card-footer text-center mt-3 border-0">
                <button
                    class="btn btn-primary animate__animated  animate__pulse animate__infinite"
                    >Ver mas</button>
            </div>
        </div>
    {:else}
        <div class="front">
            <div class="row justify-content-center">
                <div class="col-md-12">
                    <h3 class="m-5 text-center">
                        {pregunta.titulo}
                    </h3>
                </div>
                {#each pregunta.opciones as item, index}
                    <div class="col-md-4 col-sm-6 col-12">
                        <div class="card-item">
                            <button class="btn" on:click={() => voltear(index)}>
                                <center>
                                    <div class="img-card">
                                        <img
                                            src={item.img}
                                            class="card-img-top img-zoom"
                                            alt="..."
                                        />
                                    </div>
                                    <h5 class="card-title">
                                        {item.opcion}
                                    </h5>
                                </center>
                            </button>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    {/if}
</div>

<style>
    .front {
        background-color: rgb(245, 215, 245);
    }

    .back {
        height: 400px;
        max-width: 600px;
        background-repeat: no-repeat;
        background-size: cover;
        display: flex;
        flex-flow: column wrap;
        justify-content: center;
    }

    .img-card {
        border-radius: 50%;
        overflow: hidden;
        width: 180px;
        height: 180px;
    }
    .card-bg {
        background: #6c6f727d;
        width: 100%;
        padding: 10px;
    }
    .card-item {
        display: flex;
        flex-direction: column;
        word-wrap: break-word;
    }
</style>
