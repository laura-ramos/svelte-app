<script>
    //funcion para crear la animacion flip
    function flip(node, { delay = 0, duration = 1000 }) {
        return {
            delay,
            duration,
            css: (t, u) => `
				transform: rotateY(${1 - u * 180}deg);
				opacity: ${1 - u};
			`,
        };
    }
    //funcion para voltear el card cuando se haya seleccionado una tarjeta
    function select(i) {
        datos[i].flipped = !datos[i].flipped;
    }
    let datos = [
        {
            pregunta: "McDonald’s no vendía hamburguesas, vendía Hot dogs",
            descripcion: "Muchos amamos las increíbles hamburguesas de esta gran marca, pero una de las curiosidades de McDonald ‘s, es que al principio el restaurante comercializaba hot dogs, y es que en los años 1937, era una de los platos que más se vendían. Es así, que recién en el año 1948, los dueños cambiaron el menú a uno más generalizado con hamburguesas y papas.",
            imagen: "https://i1.wp.com/www.sopitas.com/wp-content/uploads/2015/12/hero_pdt_favouritesau.png",
            url: ""
        },
        {
            pregunta: "¿Sabias que se comparten más stories en Instagram, que en la vida diaria?",
            descripcion: "Se estima que más de 300 mil millones de stories se publican al día en la popular plataforma de fotografía.",
            imagen: "https://www.digitalmenta.com/wp-content/uploads/2019/09/trucos-instagram.jpg",
            url: ""
        },
        {
            pregunta: "China es el país que utiliza más Internet",
            descripcion: "Finalmente, un dato curioso tecnológico, es sobre qué países son los que más utilizan Internet, y el primero es China, con 721 millones de usuarios, India 462 millones y USA con 281 millones, según las estadísticas de Internet Live Stats.",
            imagen: "https://estaticos.muyinteresante.es/media/cache/1140x_thumb/uploads/images/article/5ff1f8065bafe8d3f33bb46f/1-conexion-a-internet_1.jpg",
            url: ""
        }
    ];
</script>

<div class="body-container">
    <h2>10 Datos curiosos</h2>
    {#each datos as item, index}
         {#if item.flipped}
            <div class="back card" in:flip >
                <div class="card-body text-descripcion" on:click={()=>select(index)}>
                    {item.descripcion}
                </div>
                <div class="card-footer text-center">
                    <a class="btn btn-light text-decoration-none" href="/">Ver mas</a>
                </div>
            </div>
        {:else}
            <div class="front card" on:click={()=>select(index)} style="background-image: url({item.imagen})">
                <div class="card-body text-center p-0">
                    <div class="text-image"><h2>{item.pregunta}</h2></div> 
                </div>
                <div class="card-footer text-center">
                    <p class="mt-1">Click para voltear</p> 
                </div>
            </div>
        {/if}
        <br>
    {/each}

</div>

<style>
    .back .card-body, .front .card-body {
        align-items: center;
        justify-content: center;
        display: flex;
    }

    .front, .back{
        height: 400px;
        max-width: 640px;
        color: rgb(255, 255, 255);
        background-image: linear-gradient(236deg, rgb(176, 41, 255), rgb(141, 33, 204));
        background-repeat: no-repeat;
        object-fit: cover;
        cursor: pointer;
    }
    .front .card-footer{
        background-color: rgba(0,0,0,0.55);
        border: none;
    }
    .text-descripcion{
        text-align: justify;
        font-size: 1.2em;
    }
    .text-image{
        background-color: #5851c39e;
        padding: 10px;
        width: 100%;
    }
</style>
