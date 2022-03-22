<script>
    export let score;
    export let total;
</script>
<div class="xl:w-full md:w-full sm:w-full">
    <div class="card bg-base-100 border w-full items-center h-96 grid">
        <div class="text-center">
            <span class="text-8xl font-bold">{score}</span>
            <span class="text-3xl">/ {total}</span>
        </div>
    </div>
</div>

