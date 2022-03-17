<script>
    /**
     * Componente donde se muestra una imagen o imagen con texto
     */
    export let pregunta;
    export let imagen;
    export let alt;
    export let zoom;
    zoom = true;
    alt = "";
</script>

<div class="overflow-hidden bg-zinc-300 rounded-lg shadow-md" style="height: 400px;">
    <img
        src={imagen}
        alt={alt} class="w-full h-full object-cover object-center rounded-lg shadow-md {zoom ? 'transform hover:scale-110 duration-200':''}"
    />
    {#if pregunta}
        <div class="card-text">
            <h2 class="card-title text-white">
               {pregunta}
            </h2>
        </div>
    {/if}
</div>

