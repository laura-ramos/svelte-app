<script>
    import { fade, blur, slide, scale, fly } from "svelte/transition";
    import { request, gql } from "graphql-request"; //https://github.com/prisma-labs/graphql-request
    let datos;
    let total_preguntas = 0;
    let respuestas = [];
    //const params = useParams();
    //let id = parseInt($params.id);
    let id = parseInt(123);
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
                respuesta_correcta++; //sumar respuestas correctas
            }
            if (preguntas_hechas < total_preguntas) {
                preguntas_hechas++; //sumar preguntas hechas
            }
        }, 1000);
    }
    //funcion que registra la respuesta de la pregunta
    function selectOption(i, respuesta) {
        respuestas[preguntas_hechas] = i;
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
    <br />
    
    
    {#await promise}
        <div class="text-center">
        <div class="spinner-grow text-dark" role="status">
            <span class="visually-hidden">Cargando...</span>
        </div>  
        </div>
    {:then data}
        <div class="section-title">
            <p>{data.pregunta.title}</p>
        </div>
        <div class="widget-quiz">
            <br />
            {#each data.pregunta.preguntas as question, questionIndex}
                {#if preguntas_hechas === questionIndex}
                    <div class="card border-0">
                        <div class="card-inner" in:fade>
                            <img
                                src={question.imagen}
                                class="card-img-top"
                                alt="imagen"
                            />
                            <div class="card-body shadow">
                                <h5 class="card-title">{question.pregunta}</h5>
                                {#each question.opciones as opcion, index}
                                    <div
                                        class="btn-custom"
                                        class:selected={respuestas[
                                            questionIndex
                                        ] === index}
                                        on:click={() =>
                                            selectOption(
                                                index,
                                                opcion.correcto
                                            )}
                                    >
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
            <div class="card-final align-self-center text-center" in:fade>
                <h1>Resultados:</h1>
                <div class="fs-1 w-100">
                    {respuesta_correcta}/{total_preguntas}
                </div>
            </div>
            <div class="card-footer">
                <spam class="text-muted">
                    120 personas realizaron este quiz
                </spam>
                <button
                    class="btn btn-secondary animate__animated  animate__pulse animate__infinite"
                    on:click={repetir}>Repetir</button
                >
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

    .card-inner img {
        height: 200px;
        object-fit: cover;
    }

    .card::before {
        transform: translate(-10px, -10px);
    }

    .card::after {
        transform: translate(-20px, -20px);
    }

    .card-final {
        height: 200px;
        background-color: #f1f1f1;
        align-items: center;
    }
    .section-title {
        font-size: 24px;
        font-weight: 700;
        line-height: 1.25;
    }
</style>
