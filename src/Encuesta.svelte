<script>
    import { onMount } from "svelte";
    import { fade, blur, slide, scale, fly } from "svelte/transition";
    let datos;
    //obtener los datos
    onMount(async () => {
        const response = await fetch("../data/encuesta.json");
        const data = await response.json();
        //asignar los datos obtenidos a una variable
        datos = data;
    });
    let votar = false;
    //funcion para sumar un voto al candidato
    function sumarVoto() {
        //falta
        votar = true;
    }
</script>

<div class="body-container">
    {#if datos}
    <div class="widget-vote" style="background-image: url(https://estaticos.muyinteresante.es/uploads/images/test/5b1e6f125cafe8f1173c986b/futbol1.jpg)">
        <div class="bg-opacity">
            <div class="row justify-content-center">
                <div class="col-md-12 text-center text-white mt-2 mb-4">
                    <h2>{datos.titulo}</h2>
                </div>
                <!--foreach para mostrar las opciones los candidatos-->
                {#each datos.opciones as item}
                    <div class="col-md-4">
                        <div class="card bg-transparent border-0">
                            <div class="card-item">
                                <img src={item.img} class="img-zoom" alt="Imagen" on:click={sumarVoto}>
                                {#if votar == true}
                                    <div class="card-votos" in:blur={{duration: 500, delay: 100}}>
                                        <h2 class="text-center text-white w-100">
                                            {item.votos}%
                                        </h2>
                                    </div>
                                {/if}
                            </div>
                            <div class="text-white text-center">
                                <h5 class="card-title mt-3">{item.nombre}</h5>
                            </div>
                        </div>
                    </div>
                {/each}
                <div class="col-md-12 text-white mt-4">
                    {datos.total_votos} votos
                </div>
            </div>
        </div>
    </div>
    {/if}
</div>

<style>
    .widget-vote {
        background-repeat: no-repeat;
        background-size: cover;
        background: linear-gradient(40deg, #45cafc, #303f9f);
    }
    .bg-opacity {
        width: 100%;
        height: 100%;
        background: #42424394;
        padding: 15px;
    }
    .card-item{
        height: 180px;
        overflow: hidden;
        border-radius: 12px;
        cursor: pointer;
        background: linear-gradient(40deg, #45cafc, #303f9f);
        display: grid;
    }
    .card-votos{
        align-items: center;
        justify-content: center;
        display: flex;
        height: inherit;
        width: 100%;
        position: absolute;
        background: rgba(0,0,0,.7);
        border-radius: 12px;
        animation-delay: 1s
    }
</style>
