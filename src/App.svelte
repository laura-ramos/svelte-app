<script>
	 //import { Router, Route, Link } from "svelte-navigator";
	 import { Router, Route, Link } from "svelte-routing";
	import Widget from "./Widget.svelte";
	import Estadistica from "./Estadistica.svelte";
	import Test from "./Quiz2.svelte";

	import { writable } from "svelte/store";
	import Modal from "svelte-simple-modal";
	import Popup from "./Popup.svelte";
	const modal = writable(null);
	const showModal = () => modal.set(Popup);
	import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
	import '../node_modules/animate.css/animate.css';
</script>

<Router>
	<header>
		<h2>Ejemplo de widgets</h2>
	  <nav>
		<Link to="/">Ejemplo 1</Link>
		<Link to="popup">Ejemplo 2</Link>
		<Link to="estadistica">Ejemplo 3</Link>
	  </nav>
	</header>
  
	  <Route path="/">
		<h3>Preguntas y respuestas</h3>
		<p>El usuario responde a las preguntas y se verifica si es correcta su respuesta</p>
		<Widget />
	  </Route>
  
	  <Route path="popup">
		<h3>Recomendacion de productos</h3>
		<p>Se realiza algunas preguntas sobre los gustos de los usuarios y al final se recomienda un producto</p>
		<Modal show={$modal}>
			<div class="widget">
				<div class="msg-box">
					<!-- <span style="opacity: 0.5;">- Mike (the creator of this site)</span> -->
					<div class="flamelab-cw-buttons">
						<button on:click={showModal}>Ver</button>
					</div>
				</div>
			</div>
		</Modal>
		<Test></Test>
	  </Route>
  
	  <Route path="estadistica">
		<h3>Otro ejemplo mas</h3>
		<Estadistica/>
	  </Route>
  </Router>