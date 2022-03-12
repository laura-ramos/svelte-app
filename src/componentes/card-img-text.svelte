<script>
    export let texto;
    export let imagen;
    export let alt;
    alt = "";
</script>

<div class="image-full grid" style="height: 300px;">
        <img
            src={imagen}
            alt={alt} class="w-full h-full object-cover object-center overflow-hidden col-start-1 row-start-1"
        />
        <div class="col-start-1 row-start-1">
            <h2 class="card-title text-white">
               {texto}
            </h2>
        </div>
</div>