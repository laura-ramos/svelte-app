<script>
    import { request, gql } from "graphql-request"; //https://github.com/prisma-labs/graphql-request
    const endpoint = "http://prueba-graph.docksal/graphql";
    //definir los datos que le vamos a pedir
    const query = gql`
        query {
            articles {
                items {
                    author
                    id
                    title
                }
            }
        }
    `;
    /*request(endpoint, query).then((data) => {
        articulos = data.articles.items;
        console.log(data);
    });*/

    //obtener los datos
    async function obtenerDatos() {
        let res = await request(endpoint, query);
        console.log(res);
        return res;
    }

    let promise = obtenerDatos();
</script>

<div class="body-container">
    <h1>Articulos</h1>
    {#await promise}
        <p>...Espera</p>
    {:then data}
        {#each data.articles.items as articulo}
            <div class="card border-0">
                <div class="contenedor-img">
                    <div class="text-card text-white">
                        {articulo.title}
                    </div>
                </div>
                <div class="card-body border">
                    <footer class="blockquote-footer">
                        {articulo.author}
                    </footer>
                </div>
            </div>
            <br />
        {/each}
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}
</div>

<style>
    .contenedor-img {
        text-align: center;
        height: 300px;
        background-color: #000;
        overflow: hidden;
        box-sizing: border-box;
        border-radius: 12px 12px 0px 0px;
    }
    .text-card {
        padding: 10px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
