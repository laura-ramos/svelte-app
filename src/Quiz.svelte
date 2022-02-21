<script>
    import { fade, blur, slide, scale, fly } from "svelte/transition";
    import CardImagen from "./componentes/card-img.svelte";
    import CardText from "./componentes/card-text.svelte";
    import { onMount } from "svelte";
    import { useParams } from "svelte-navigator";
    import { request, gql } from "graphql-request"; //https://github.com/prisma-labs/graphql-request
    let datos;
    let total_preguntas = 0;
    let respuestas = [];
    const params = useParams();
    let id = parseInt($params.id);
    //endpoint donde vamos a obtener los datos
    const endpoint = "http://nvi-cs.docksal/graphql/preguntas";
    //definir el schema de datos que queremos obtener
    const query = gql`
        query getTest($id: Int!) {
            pregunta(id: $id) {
                title
                id
                preguntas {
                    imagen
                    opciones {
                        correcto
                        text
                    }
                    pregunta
                }
            }
        }
    `;
    //Parametros que le vamos a enviar a la consulta 
    const parametros = { id };
    async function obtenerDatos() {
        let res = await request(endpoint, query, parametros);
        console.log(res);
        total_preguntas = res.pregunta.preguntas.length;
        respuestas = Array(res.pregunta.preguntas.length).fill(null);
        return res;
    }
    let promise = obtenerDatos();

    let preguntas_hechas = 0;
    let respuesta_correcta = 0;
    
    //funcion para pasar a la siguente pregunta
    function next(respuesta) {
        setTimeout(() => {
            if (respuesta == true) {
                respuesta_correcta++;//sumar respuestas correctas
            }
            if (preguntas_hechas < total_preguntas) {
                preguntas_hechas++;//sumar preguntas hechas
            }
        }, 1000);
    }
    //funcion que registra la respuesta de la pregunta
    function selectOption(i,respuesta){
        respuestas[preguntas_hechas]=i;
        next(respuesta);
    }
    //funcion para repetir el quiz
    function repetir() {
        preguntas_hechas = 0;
        respuesta_correcta = 0;
        respuestas = Array(datos.length).fill(null);
    }
</script>

<div class="body-container">
    {#await promise}
        <div class="text-center">
        <div class="spinner-grow text-dark" role="status">
            <span class="visually-hidden">Cargando...</span>
        </div>  
        </div>
    {:then data}
        <br>
        <div class="section-title">
            <p>{data.pregunta.title}</p>
        </div>
        <div class="widget-quiz">
        <br>
        {#each data.pregunta.preguntas as question, questionIndex}
            {#if preguntas_hechas === questionIndex}
                <div class="card border-0">
                    <div class="card-inner" in:fade>
                        <CardImagen imagen={question.imagen} alt=""></CardImagen>
                        <div class="card-body shadow">
                            <h5 class="card-title mb-4">{question.pregunta}</h5>
                            {#each question.opciones as opcion, index}
                                <div class="btn-custom" on:click={()=>selectOption(index, opcion.correcto)}>
                                    {opcion.text}
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>
            {/if}
        {/each}
        </div>
        {#if total_preguntas == preguntas_hechas}
            <div in:slide>
                <CardText title={respuesta_correcta}/{total_preguntas}></CardText>
                <div class="card-footer bg-secondary">
                    <spam class="text-muted"> 120 personas realizaron este quiz </spam>
                    <button class="btn btn-light pulse" on:click={repetir}
                            >Repetir</button>
                </div>
            </div> 
        {/if}
    {/await}
   
    
</div>
<style>
    .widget-quiz {
        margin-left: 20px;
        height: 100%;
    }
    .card::before,
    .card::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }

    .card::before,
    .card::after {
        border: 1px solid #f1f1f1;
        transition: transform 0.5s;
        border-radius: 4px;
        box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
        background-color: #fff;
    }

    .card::before,
    .card-inner {
        z-index: 1;
    }

    .card-inner {
        background: #fff;
        position: relative;
        border-radius: 4px;
        box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
        border: 1px solid #f1f1f1;
    }

    .card::before {
        transform: translate(-10px, -10px);
    }

    .card::after {
        transform: translate(-20px, -20px);
    }
    @media (max-width: 400px) {
        .card::before {
        content: none;
        }
        .card::after {
            content: none;
        }
        .widget-quiz {
            margin: 0px;
        }
    }
</style>
