<script>
    import { onMount } from "svelte";
    import { fade, blur, slide, scale, fly } from "svelte/transition";
    import CardImagen from "./componentes/card-img.svelte";
    let datos;
    let total_preguntas = 0;
    //Obtener las preguntas del archivo json
    onMount(async () => {
        const response = await fetch("../data/opciones.json");
        const data = await response.json();
        datos = data; //asignar las preguntas a la variable datos
        total_preguntas = data.length;
    });
    let preguntas_hechas = 0;
    function next() {
        if (preguntas_hechas == total_preguntas-1) {
        //terminado
        }else{
            preguntas_hechas++;
        }
    }
</script>
<div class="body-container">
    {#if datos}
        <div class="bg-white">
            {#each datos as pregunta, questionIndex}
                {#if preguntas_hechas === questionIndex}
                    <CardImagen imagen={pregunta.imagen}></CardImagen>
                    <div class="card-title text-center">
                        <h2>
                            {pregunta.pregunta}
                        </h2>
                    </div>
                    <div class="card-body">
                        <div class="row justify-content-center">
                            {#each pregunta.opciones as item}
                                <div class="col-md-4 text-center col-md-4 col-sm-6 col-12">
                                    <div class="card_item_image" on:click={next}>
                                        <div class="card_image">
                                            <img src={item.img} alt="" />
                                        </div>
                                    </div>
                                    <h5>{item.text}</h5>
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
    .card_item_image {
        width: 180px;
        height: 180px;
        border-radius: 40px;
        cursor: pointer;
        transition: 0.4s;
    }
    .card_item_image .card_image {
        width: inherit;
        height: inherit;
        border-radius: 40px;
    }
    .card_item_image .card_image img {
        width: inherit;
        height: inherit;
        border-radius: 40px;
        object-fit: cover;
    }
    .card_item_image:hover {
        transform: scale(0.9, 0.9);
        box-shadow: 2px 2px 20px 5px rgba(0, 0, 0, 0.25),
            -2px -2px 20px 5px rgba(0, 0, 0, 0.22);
    }
</style>