<script>
	import { Router, Route, Link } from "svelte-routing";
	import Test from "./Test.svelte";
	import Quiz from "./Widget.svelte";
	import Recomendacion from "./Recomendacion.svelte";
	import Modal from "./Modal.svelte";
	import Encuesta from "./Encuesta.svelte";
	import Trivia from "./Trivia.svelte";
	import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
	import "../node_modules/animate.css/animate.css";
</script>

<Router>
	<Route path="/">
		<h3>widgets</h3>
		<!--<iframe
			src="http://localhost:8080/test"
			scrolling="no"
			style="width: 1px; min-width: 100%; height: 772px; border: 0px;"
		/>-->
	</Route>

	<Route path="test">
		<Test />
	</Route>
	<Route path="quiz">
		<Quiz />
	</Route>
	<Route path="recomendacion">
		<Recomendacion />
	</Route>
	<Route path="modal">
		<Modal />
	</Route>
	<Route path="encuesta">
		<Encuesta />
	</Route>
	<Route path="trivia">
		<Trivia />
	</Route>
</Router>