<script>
	import { Router, Route, Link } from "svelte-routing";
	//importar los componentes
	import Test from "./Test.svelte";
	import Quiz from "./Quiz.svelte";
	import Recomendacion from "./Recomendacion.svelte";
	import Encuesta from "./Encuesta.svelte";
	import Trivia from "./Trivia.svelte";
	import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
	import "../node_modules/animate.css/animate.css";
</script>

<Router>
	<!--Menu de navegacion-->
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
		<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu" aria-controls="menu" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		  </button>
		  <div class="collapse navbar-collapse" id="menu">
			<div class="navbar-nav">
				<Link to="quiz" class="nav-item nav-link">Quiz</Link>
				<Link to="test" class="nav-item nav-link">Test</Link>
				<Link to="encuesta" class="nav-item nav-link">Encuesta</Link>
				<Link to="trivia" class="nav-item nav-link">Trivia</Link>
				<Link to="recomendacion" class="nav-item nav-link">Recomendacion</Link>
			</div>
		  </div>
	  </nav>
	<!--Redireccionar a los diferentes componentes-->
	<Route path="/">
		<Quiz/>
	</Route>
	<Route path="test">
		<!--Widget para contestar un test-->
		<Test />
	</Route>
	<Route path="quiz">
		<!--Widget para realizar el quiz-->
		<Quiz />
	</Route>
	<Route path="encuesta">
		<!--Widget para realizar una encuesta-->
		<Encuesta />
	</Route>
	<Route path="trivia">
		<!--Widget para contestar una trivia-->
		<Trivia />
	</Route>
	<Route path="recomendacion">
		<Recomendacion />
	</Route>
</Router>