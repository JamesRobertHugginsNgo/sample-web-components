import '../../index.js';

document.body.insertAdjacentHTML('beforeend', /* html */ `
	<template>
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/JamesRobertHugginsNgo/bootstrap@main/dist/css/bootstrap.min.css">

		<sample-sidebar>
			<a href="#home">Home</a>
			<a href="#directory">Directory</a>
			<a href="#page">Page</a>
			<a href="#page/Test%20Page">Page (Test)</a>
			<a href="#page/Other%20Page">Page (Other)</a>
			<a href="#notfound">Not Found</a>
		<sample-sidebar>
	</template>
`);
const templateElement = document.body.lastElementChild;

customElements.define('common-sidebar', class extends HTMLElement {
	static observedAttributes = [
		'active'
	];

	#sampleSidebarElement;

	constructor() {
		super();

		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(templateElement.content.cloneNode(true));

		this.#sampleSidebarElement = this.shadowRoot.querySelector('sample-sidebar');
	}

	attributeChangedCallback(name, oldValue, newValue) {
		switch (name) {
			case 'active': {
				if (!newValue) {
					this.#sampleSidebarElement.removeAttribute('active');
				} else {
					this.#sampleSidebarElement.setAttribute('active', newValue);
				}
				break;
			}
		}
	}
});
