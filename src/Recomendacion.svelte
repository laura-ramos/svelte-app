<script>
    import { onMount } from "svelte";
    let pregunta;
    //obtener los datos 
    onMount(async () => {
        const response = await fetch("../data/recomendacion.json");
        const data = await response.json();
        pregunta = data;//asignar los datos a la variable
    });

    let flipped = false;
    //funcion para crear la animacion flip
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

    //funcion para voltear el card cuando se haya seleccionado una opcion
    function select(i) {
        flipped = !flipped;
        index = i;
    }
</script>

<div class="body-container">
    {#if pregunta}
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
                                <button class="btn" on:click={() => select(index)}>
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
