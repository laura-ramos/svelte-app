<script>
    import { fade, blur, slide, scale, fly } from "svelte/transition";
    let data = 
        {
            titulo: "Vota por tu jugador favorito",
            total_votos : 100,
            opciones: [
                {
                    nombre: "Lionel Messi",
                    img: "https://ichef.bbci.co.uk/news/640/cpsprodpb/E5BA/production/_119801885_75007003-8391-44bf-8f65-c7a5ef8ee259.jpg",
                    votos: "80",
                },
                {
                    nombre: "Cristiano Ronaldo",
                    img: "https://imagenes.20minutos.es/files/image_656_370/files/fp/uploads/imagenes/2021/09/29/cristiano-ronaldo.r_d.1684-405-1942.jpeg",
                    votos: "50",
                },
                {
                    nombre: "Neymar",
                    img: "https://s1.eestatic.com/2019/08/19/elbernabeu/real-madrid/futbol/neymar_jr-gareth_bale-real_madrid_cf_422718094_132565666_1706x960.jpg",
                    votos: "50",
                }
            ]
        };
    let votar = false;
    function clicVotar(){
        votar = true;
    }
</script>
<div class="body-container">
    <div class="widget-vote">
        <div class="bg-opacity">
        <div class="row">
            <div class="col-md-12 text-center text-white mt-2 mb-4">
                <h2>{data.titulo}</h2>
            </div>
            {#each data.opciones as item}
            <div class="col-md-4">
                <div class="card bg-transparent">
                    {#if votar == false}
                        <div class="item-img" on:click={clicVotar}>
                            <img src={item.img} alt="Imagen">
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
                {data.total_votos} votos
            </div>
        </div>
        </div>
    </div>
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
 
    .item-img img {
        transition: all .4s ease;
        width:100%;
        height: 100%;
        object-fit: cover;
    }
 
    .item-img img:hover {
        transform:scale(1.2);
    }
</style>