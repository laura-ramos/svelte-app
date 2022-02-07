<script>
	import { Router, Route, Link } from "svelte-routing";
	import Test from "./Test.svelte";
	import Quiz from "./Quiz.svelte";
	import Recomendacion from "./Recomendacion.svelte";
	import Modal from "./Modal.svelte";
	import Encuesta from "./Encuesta.svelte";
	import Trivia from "./Trivia.svelte";
	import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
	import "../node_modules/animate.css/animate.css";
</script>

<Router>
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
		<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		  </button>
		  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
			<div class="navbar-nav">
				<Link to="quiz" class="nav-item nav-link">Quiz</Link>
				<Link to="test" class="nav-item nav-link">Test</Link>
				<Link to="encuesta" class="nav-item nav-link">Encuesta</Link>
				<Link to="trivia" class="nav-item nav-link">Trivia</Link>
				<Link to="recomendacion" class="nav-item nav-link">Recomendacion</Link>
			</div>
		  </div>
	  </nav>
	<Route path="/">
		<Quiz/>
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