<script>
   import { onMount } from "svelte";
   let datos = [];
   const API = "/datos.json";
   onMount(async () => {
       const res = await fetch(API);
       datos = await res.json();
   });

   var pregunta = "";
   var item;
   var preguntas_hechas = 0;
   var quiz = false;

   function mostrarDatos(i) {
       if (preguntas_hechas == datos.length) {
           quiz = false;
           preguntas_hechas = 0;
           item = datos[0];
           //mostrar el ultimo
       } else {
           i = preguntas_hechas;
           item = datos[i];
           preguntas_hechas++;
       }
   }

   function oprimir_btn() {
       mostrarDatos(0);
   }
   function mostrarQuiz() {
       quiz = true;
       mostrarDatos(0); //mostrar la primera pregunta
   }
   function ocultarQuiz() {
       preguntas_hechas = 0;
       quiz = false;
   }
   function respoderQuiz() {}
   var article = false;
</script>

<button class="btn btn-quiz" on:click={mostrarQuiz}>
   <img
       src="https://img.playbuzz.com/image/upload/ar_1.8867924528301887,c_crop/q_auto:best,f_auto,fl_lossy,w_640,c_limit,dpr_1/v1591877433/ladhgrsq6rnbg8dy1j2o.jpg"
       alt="Imagen"
   /> Which New York food tour is right for you?</button
>
{#if quiz === true}
   <div id="miModal" class="modal">
       <div class="modal-contenido">
           <!-- svelte-ignore missing-declaration -->
           <div class="card">
               <div>
                   <button on:click={ocultarQuiz} class="btn-cerrar">x</button>
               </div>
               
               <!-- svelte-ignore a11y-missing-attribute -->
               <img src={item.imagen} class="card-img-top" alt="imagen"/>
               <!-- svelte-ignore missing-declaration -->
               <div class="card-body">
                   {#if article}
                       <div>
                           <h5 class="card-title">
                               Make sure you're always fully informed to make
                               the right choices.
                           </h5>
                           We delve deep into the big issues. Sign up to our newsletter
                           today and keep on top of what matters most.
                           <input type="text" />
                           <button class="">Login</button>
                       </div>
                   {:else}
                       <h5 class="card-title">{item.pregunta}</h5>
                       <div class="quiz-answer" on:click={oprimir_btn}>
                           {item.opcion1}
                       </div>
                       <div class="quiz-answer" on:click={oprimir_btn}>
                           {item.opcion2}
                       </div>
                       <div class="quiz-answer" on:click={oprimir_btn}>
                           {item.opcion3}
                       </div>
                       <div class="quiz-answer" on:click={oprimir_btn}>
                           {item.opcion4}
                       </div>
                   {/if}
               </div>
           </div>
       </div>
   </div>
{/if}
