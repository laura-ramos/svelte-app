<script>
    import { onMount } from "svelte";
    let pregunta;
    //obtener los datos 
    onMount(async () => {
        const response = await fetch("../data/recomendacion.json");
        const data = await response.json();
        pregunta = data;//asignar los datos a la variable
    });

    let flipped = false;
    //funcion para crear la animacion flip
    function flip(node, { delay = 0, duration = 1500 }) {
        return {
            delay,
            duration,
            css: (t, u) => `
				transform: rotateY(${1 - u * 180}deg);
				opacity: ${1 - u};
			`,
        };
    }
    let index = 0;

    //funcion para voltear el card cuando se haya seleccionado una opcion
    function select(i) {
        flipped = !flipped;
        index = i;
    }
</script>

<div class="grid justify-center items-center">
    {#if pregunta}
    <div class="tinder loaded transition flex-col overflow-hidden opacity-0">
        <div class="tinder--cards grow text-center content-center items-end">
          <div class="tinder--card bg-white will-change-transform absolute inline-block overflow-hidden removed" style="z-index: 5;opacity: 1;touch-action: pan-y;user-select: none;-webkit-user-drag: none;-webkit-tap-highlight-color: rgba(0, 0, 0, 0);transform: translate(-1878px, 176.727px) rotate(-2.3265deg);">
            <img src="https://placeimg.com/600/300/people" class="w-full" alt="">
            <h3>Demo card 1</h3>
            <p>This is a demo for Tinder like swipe cards</p>
          </div>
          <div class="tinder--card bg-white will-change-transform absolute inline-block overflow-hidden" style="z-index: 5; opacity: 1; touch-action: pan-y; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); transform: translate(2817px, -100px) rotate(-30deg);">
            <img src="https://placeimg.com/600/300/animals" class="w-full" alt="">
            <h3>Demo card 2</h3>
            <p>This is a demo for Tinder like swipe cards</p>
          </div>
          <div class="tinder--card bg-white will-change-transform absolute inline-block overflow-hidden" style="z-index: 5; transform: scale(1) translateY(0px); opacity: 1; touch-action: pan-y; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);">
            <img src="https://placeimg.com/600/300/nature" class="w-full" alt="">
            <h3>Demo card 3</h3>
            <p>This is a demo for Tinder like swipe cards</p>
          </div>
          <div class="tinder--card bg-white will-change-transform absolute inline-block overflow-hidden" style="z-index: 4; transform: scale(0.95) translateY(-30px); opacity: 0.9; touch-action: pan-y; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);">
            <img src="https://placeimg.com/600/300/tech" class="w-full" alt="">
            <h3>Demo card 4</h3>
            <p>This is a demo for Tinder like swipe cards</p>
          </div>
          <div class="tinder--card bg-white will-change-transform absolute inline-block overflow-hidden" style="z-index: 3; transform: scale(0.9) translateY(-60px); opacity: 0.8; touch-action: pan-y; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);">
            <img src="https://placeimg.com/600/300/arch" class="w-full" alt="">
            <h3>Demo card 5</h3>
            <p>This is a demo for Tinder like swipe cards</p>
          </div>
        </div>
      </div>
    {/if}
</div>
<style>

.loaded.tinder {
  opacity: 1;
}

.tinder--card {
  max-width: 300px;
}
</style>