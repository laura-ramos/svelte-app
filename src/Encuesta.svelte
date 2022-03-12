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

<div class="grid justify-center items-center justify-items-center">
    {#if datos}
    <div class="widget-vote" style="background-image: url(https://estaticos.muyinteresante.es/uploads/images/test/5b1e6f125cafe8f1173c986b/futbol1.jpg)">
        <div class="bg-opacity p-4 bg-slate-400/25">
            <h2 class="text-2xl mb-4 text-center">{datos.titulo}</h2>
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
                <!--foreach para mostrar las opciones los candidatos-->
                {#each datos.opciones as item}
                    <div class="avatar grid">
                        <div class="w-48 rounded-xl">
                            <img src={item.img} class="transform hover:scale-110 duration-200 cursor-pointer" alt="Imagen" on:click={sumarVoto}>
                        </div>
                        {#if votar == true}
                            <div class="w-48 rounded-xl bg-slate-400/50 absolute" in:blur={{duration: 500, delay: 100}}>
                                <h2 class="text-white w-100 flex items-center h-full justify-center text-4xl">
                                    {item.votos}%
                                </h2>
                            </div>
                        {/if}
                        <h5 class="text-white mt-3 text-center font-semibold">{item.nombre}</h5>
                    </div>
                {/each}
            </div>
            <div class="col-md-12 text-white mt-4">
                {datos.total_votos} votos
            </div>
        </div>
    </div>

    <br>
    <div class="widget">
        <div class="bg-white rounded-lg shadow">
          <div class="border-t-8 border-pink-600 rounded-lg flex">
            <div class="w-full p-3">
              <h3 class="text-2xl mb-4 text-center">{datos.titulo}</h3>

              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
                {#each datos.opciones as item}
                <!-- Grid column -->
                    <div class="avatar grid">
                        <div class="w-48 rounded-full">
                            <img src={item.img} alt="" class="transform hover:scale-110 duration-200 cursor-pointer" on:click={sumarVoto}>
                        </div>
                        {#if votar == true}
                        <div class="w-48 rounded-full absolute">
                            <div class="bg-sky-500/75 w-full absolute items-end bottom-0" style="height: {item.votos}%;"></div>
                            <h2 class="text-white text-4xl absolute text-votos">
                                {item.votos}%
                            </h2>
                        </div>
                        {/if}
                        <h5 class="mt-3 text-center font-semibold">{item.nombre}</h5>
                    </div>
                {/each}
                </div>
                <div class="mt-4">
                    {datos.total_votos} votos
                </div>
            </div>
          </div>
        </div>
      </div>
    {/if}
</div>

<style>
    .widget {
        max-width: 640px;
    }
    .text-votos{
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
    }
</style>
