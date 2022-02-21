<script>
    import CardImagen from "./componentes/card-img.svelte";
    import CardText from "./componentes/card-text.svelte";
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
    <div class="card-rotate">
        {#if item.flipped}
            <div in:flip on:click={()=>select(index)}>
                <CardText descripcion={item.descripcion}></CardText>
                <div class="card-footer text-center">
                    <a class="btn btn-light text-decoration-none" href="/">Ver mas</a>
                </div>
            </div>
        {:else}
            <div class="" on:click={()=>select(index)}>
                <CardImagen pregunta={item.pregunta} imagen={item.imagen} alt=""></CardImagen>
                <div class="card-footer text-center">
                    <p class="mt-1">Click para voltear</p> 
                </div>
            </div>
        {/if}
    </div>

        <br>
    {/each}

</div>

<style>
    .card-footer{
        background: #6b6d6f;
        color: #fff;
        cursor: pointer;
    }
    .card-rotate{
        -webkit-transition: 0.5s linear;
        transition: 0.5s linear;
    }
    .card-rotate:hover{
        -webkit-transform: perspective(1000px) rotateY(5deg);
        transform: perspective(1000px) rotateY(5deg);
    }
</style>
