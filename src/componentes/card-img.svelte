<script>
    export let pregunta;
    export let imagen;
    export let alt;
    alt = "";
</script>

<div class="img-card image-full" style="height: 300px;">
        <img
            src={imagen}
            alt={alt}
        />
    {#if pregunta}
        <div class="card-text">
            <h2 class="card-title text-white">
               {pregunta}
            </h2>
        </div>
    {/if}
</div>

<style>
    .img-card img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        background: linear-gradient(40deg,#ffd86f,#fc6262);
        overflow: hidden;
    }
    .card-text {
        align-items: center;
        justify-content: center;
        display: flex;
        height: inherit;
    }
    .card-title {
        background: rgb(0 0 0 / 20%);
        padding: 10px;
        width: 100%;
    }
    .img-card.image-full {
        display: grid;
    }
    .img-card.image-full:before,
    .img-card.image-full > * {
        grid-column-start: 1;
        grid-row-start: 1;
    }

    .img-card img:hover {
        transform:scale(1.2);
    }
    .img-card{
        overflow: hidden;
        cursor: pointer;
    }
</style>
