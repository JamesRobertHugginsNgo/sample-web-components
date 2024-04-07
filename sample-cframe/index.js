document.body.insertAdjacentHTML('beforeend', /* html */ `
	<template>
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

			<div class="breadcrumbs d-none">
				<div class="container-fluid">
					<div class="row">
						<div class="col">
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
	</template>
`);
const templateElement = document.body.lastElementChild;

customElements.define('sample-cframe', class extends HTMLElement {
	static observedAttributes = [
		'breadcrumbs'
	];

	#breadcrumbsElement;
	#breadcrumbsColElement;

	constructor() {
		super();

		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(templateElement.content.cloneNode(true));

		this.#breadcrumbsElement = this.shadowRoot.querySelector('.breadcrumbs');
		this.#breadcrumbsColElement = this.#breadcrumbsElement.querySelector('.col');
	}

	attributeChangedCallback(name, oldValue, newValue) {
		switch (name) {
			case 'breadcrumbs':
				if (!newValue) {
					this.setBreadcrumbs();
				} else {
					this.setBreadcrumbs(JSON.parse(document.getElementById(newValue).textContent));
				}
				break;
		}
	}

	setBreadcrumbs(breadcrumbs) {
		if (!breadcrumbs || breadcrumbs.length === 0) {
			this.#breadcrumbsElement.classList.add('d-none');
			this.#breadcrumbsColElement.innerHTML = '';
		} else {
			this.#breadcrumbsColElement.innerHTML = /* html */ `
				<nav aria-label="breadcrumb">
					<ol class="breadcrumb">
						${breadcrumbs.map(({ text, link }, index) => {
							if (index === breadcrumbs.length - 1) {
								return `<li class="breadcrumb-item active" aria-current="page">${text}</li>`;
							}
							if (!link) {
								return `<li class="breadcrumb-item">${text}</li>`;
							}
							return `<li class="breadcrumb-item"><a href="${link}">${text}</a></li>`;
						}).join('')}
					</ol>
				</nav>
			`;
			this.#breadcrumbsElement.classList.remove('d-none');
		}
	}
});
