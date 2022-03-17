<script>
    /**
     * Componente para mostrar un card que solo contiene texto texto
     */
    export let descripcion = '';
    export let title = '';
</script>

<div class="flex justify-center items-center bg-sky-500" style="height: 300px;">
    <div class="text-white p-3">
        <h2 class="font-bold">{title}</h2>
        {descripcion}
    </div>
</div>