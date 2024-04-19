// ==
// TEMPLATE(S)
// ==

const templateElement = document.createElement('template');
templateElement.innerHTML = /* html */ `
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/JamesRobertHugginsNgo/bootstrap@main/dist/css/bootstrap.min.css">

	<style>
		header {
			background-color: #cccccc;
			color: #000000;

			& .banner {
				background-color: salmon;
				color: #ffffff;
				padding-top: 1rem;

				& h1 {
					margin-bottom: 1rem;
				}
			}

			& .breadcrumbs {
				padding-top: 1rem;
			}
		}

		main {
			padding-top: 1rem;
			padding-bottom: 1rem;
		}

		footer {
			background-color: salmon;
			color: #ffffff;
			padding-bottom: 1rem;
			padding-top: 1rem;
		}

		.container-fluid {
			padding-left: 2rem;
			padding-right: 2rem;
		}
	</style>

	<header>
		<div class="banner">
			<div class="container-fluid">
				<div class="row">
					<div class="col">
						<h1>
							<a href="#">
								<img src="${import.meta.resolve('./assets/logo.svg')}" alt="">
							</a>
						</h1>
					</div>
				</div>
			</div>
		</div>

		<div class="breadcrumbs">
			<div class="container-fluid">
				<div class="row">
					<div class="col">
						<slot name="breadcrumbs"></slot>
					</div>
				</div>
			</div>
		</div>
	</header>

	<main>
		<div class="container">
			<div class="row">
				<div class="col">
					<slot></slot>
				</div>
			</div>
		</div>
	</main>

	<footer>
		<div class="container-fluid">
			<div class="row">
				<div class="col text-end">
					<p>&copy; Company Name 2024 &ndash; 2024</p>
				</div>
			</div>
		</div>
	</footer>
`;

// ==
// CUSTOM ELEMENT(S)
// ==

customElements.define('sample-cframe', class extends HTMLElement {

	// --
	// LIFE CYCLE METHOD(S)
	// --

	constructor() {
		super();

		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(templateElement.content.cloneNode(true));
	}

	// connectedCallback() {
	// }

	// disconnectedCallback() {
	// }

	// adoptedCallback() {
	// }

	// attributeChangedCallback(name, oldValue, newValue) {
	// }
});
