<script>
  import AnswerImg from './componentes/img-answer.svelte'
  import { fade, blur, slide, scale, fly} from "svelte/transition";
import { each } from 'svelte/internal';
  export let open = false;
  export let showBackdrop = true;
  export let onClosed;
  export let data;

  const modalClose = () => {
    open = false;
    if (onClosed) {
      onClosed();
    }
  }
  
  let preguntas_hechas = 0;
  const clickMethod = evt => {
      // Dentro del objeto evt, llega el valor detail con el payload
      console.log(evt, evt.detail);
      preguntas_hechas++;
   };
</script>

{#if open}
<div class="modal" id="sampleModal" tabindex="-1"
  role="dialog" aria-labelledby="sampleModalLabel" aria-hidden={false} transition:blur>
  <div class="modal-dialog m-3" role="document">
    <div class="modal-content bg-transparent border-0">
      <div class="modal-close">
        <button type="button" class="border-0 bg-transparent" data-dismiss="modal" aria-label="Close"
          on:click={modalClose}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="bg-white modal-b">
        {#each data as pregunta, questionIndex}
          {#if preguntas_hechas === questionIndex}
          <div class="image-container">
          <img
              src={pregunta.imagen}
              class="card-img-top img-title"
              alt="..."
          />
        </div>
          <div class="section-title m-2 text-center">{pregunta.pregunta}</div>
          <div class="card-body">
              <div class="row">
                {#each pregunta.opciones as item}
                  <div class="col-md-4">
                  <AnswerImg img={item.img} text={item.text} on:click-evt={clickMethod}></AnswerImg>
                </div>
                {/each}
              </div>
          </div>
          {/if}
        {/each}
      </div>
    </div>
  </div>
</div>
{#if showBackdrop}
  <div class="modal-backdrop show" />
{/if}
{/if}

<style>
.modal {
  display: block;
  bottom: 0;
  right: 0;
  height: auto;
  width: auto;
  top: auto;
  left: auto;
}
.image-container {
        overflow: hidden;
    }
    .modal-b{
border-top-left-radius: 12px;
    }
</style>