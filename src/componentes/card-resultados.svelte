<script>
    export let score;
    export let total;
</script>
<div class="xl:w-full md:w-full sm:w-full">
    <div class="card bg-base-100 border w-full items-end h-96 grid">
        <div class="text-center">
            <span class="text-8xl font-bold">{score}</span>
            <span class="text-3xl">/ {total}</span>
        </div>
        <div class="m-4">
            <button class="btn btn-xs">Para mas información</button>
            <button class="btn btn-xs">Para mas información</button>
        </div>
    </div>
</div>

