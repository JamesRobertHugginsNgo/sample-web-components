document.body.insertAdjacentHTML('beforeend', /* html */ `
	<template>
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/JamesRobertHugginsNgo/bootstrap@main/dist/css/bootstrap.min.css">

		<style>
		</style>

		<div>
			<h1 tabindex="0"></h1>

			<div class="row">
				<div class="col-12 col-md-8 col-lg-9">
					<slot></slot>
				</div>
				<div class="col-12 col-md-4 col-lg-3">
					<slot name="sidebar"></slot>
				</div>
			</div>
		</div>
	</template>
`);
const templateElement = document.body.lastElementChild;

customElements.define('sample-page', class extends HTMLElement {
	static observedAttributes = [
		'title'
	];

	#titleElement;

	constructor() {
		super();

		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(templateElement.content.cloneNode(true));

		this.#titleElement = this.shadowRoot.querySelector('h1');
	}

	attributeChangedCallback(name, oldValue, newValue) {
		switch (name) {
			case 'title': {
				if (!newValue) {
					this.#titleElement.textContent = 'Untitled';
				} else {
					this.#titleElement.textContent = newValue;
				}
				break;
			}
		}
	}

	focus() {
		this.#titleElement.focus();
	}
});
