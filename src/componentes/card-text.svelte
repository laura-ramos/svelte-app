<script>
    export let descripcion = '';
    export let title = '';
</script>

<div class="card-text" style="height: 300px;">
    <div class="text-white p-3 text-center fs-5 text">
        <h2>{title}</h2>
        {descripcion}
    </div>
</div>

<style>
    .card-text {
        background: #000;
        align-items: center;
        justify-content: center;
        display: flex;
    }
</style>
