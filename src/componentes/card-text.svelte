<script>
    /**
     * Componente para mostrar un card con texto
     */
    export let descripcion = '';
    export let title = '';
</script>

<div class="flex justify-center items-center bg-sky-500" style="height: 300px;">
    <div class="text-white p-3 font-bold">
        <h2>{title}</h2>
        {descripcion}
    </div>
</div>