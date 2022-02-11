<script>
    import { createEventDispatcher } from "svelte";
    export let img = "";
    export let text = "";
    const dispatch = createEventDispatcher();
    const clickFn = () => {
        dispatch("click-evt", { msn: "inside" });
    };
</script>

<button class="btn-answer" title="" type="button" on:click={clickFn}>
    <div class="pb-grid-quiz-answer">
        <div class="answer-image-container">
            <img alt="Jugo" class="img-zoom" src={img} />
        </div>
        <div class="text">
            <p>{text}</p>
        </div>
    </div>
</button>

<style>
    .btn-answer {
        background-color: transparent;
        border: none;
    }
    .answer-image-container {
        overflow: hidden;
        border-radius: 12px;
        max-height: 180px;
    }
    .answer-image-container:hover {
        border: 3px solid rgb(91, 55, 112);
    }
    button:active {
        background-color: transparent;
    }
    .text{
        padding: 5px;
    }
</style>
