<script>
    /**
     * Componente para mostrar el progreso
     */
    export let steps;//numero de pasos que tiene-numero de preguntas en total
    export let current; //el paso actual-pregunta actual
    export let past;//los pasos ya respondidos-las preguntas que ya fueron respondidas
    current = 0;
</script>
<div class="steps m-2">
    {#each {length: steps} as _, i}
       <div class="border-2 border-slate-300 rounded-full w-3 h-3 mr-1 {current == i ? 'bg-current':''} {past[i] || past[i] == 0 ? 'bg-slate-300':''}"></div> 
    {/each}
 </div>