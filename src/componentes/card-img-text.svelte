<script>
    export let texto;
    export let imagen;
    export let alt;
    alt = "";
</script>

<div class="image-full grid bg-slate-300" style="height: 300px;">
    <img
        src={imagen}
        alt={alt} class="w-full h-full object-cover object-center overflow-hidden col-start-1 row-start-1"
    />
    <div class="col-start-1 row-start-1 grid items-end">
        <p class="text-2xl font-semibold p-3 text-white bg-slate-600/50 mb-2">
            {texto}
        </p>
    </div>
</div>