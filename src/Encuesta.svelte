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
    function sumarVoto(){
        //falta
        votar = true;
    }
</script>
<div class="body-container">
    {#if datos}
            <div class="widget-vote">
        <div class="bg-opacity">
        <div class="row justify-content-center">
            <div class="col-md-12 text-center text-white mt-2 mb-4">
                <h2>{datos.titulo}</h2>
            </div>
            <!--foreach para mostrar las opciones los candidatos-->
            {#each datos.opciones as item}
            <div class="col-md-4">
                <div class="card bg-transparent">
                    {#if votar == false}
                        <div class="item-img" on:click={sumarVoto}>
                            <img src={item.img} class="img-zoom" alt="Imagen">
                        </div>   
                    {:else}
                        <div class="card-votos" transition:blur={{duration: 500, delay: 100}}>
                            <div class="text-votos">
                                <h2 class="card-title">{item.votos}%</h2>
                            </div>
                        </div>
                    {/if}
                    <div class="text-white text-center">
                        <h5 class="card-title">{item.nombre}</h5>
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
    .widget-vote{
        background-image: url("https://estaticos.muyinteresante.es/uploads/images/test/5b1e6f125cafe8f1173c986b/futbol1.jpg");
        background-repeat: no-repeat;
        background-size: cover;
    }
    .bg-opacity{
        width: 100%;
        height: 100%;
        background: #42424394;
        padding: 15px;
    }
    .bg-transparent{
        background: transparent;
        border: none;
    }
    .card-votos{
        height: 180px;
        background: #3c3d3b;
        display: grid;
        align-items: center;
        color: #fff;
        text-align: center;
        border-radius: 12px;
    }
    .item-img {
        overflow: hidden;
        box-sizing:border-box;
        height: 180px;
        border-radius: 12px;
        cursor: pointer;
    }
</style>