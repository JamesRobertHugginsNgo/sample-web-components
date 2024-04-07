import '../../index.js';

document.body.insertAdjacentHTML('beforeend', /* html */ `
	<template>
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/JamesRobertHugginsNgo/bootstrap@main/dist/css/bootstrap.min.css">

		<style>
			li {
				margin-bottom: 1rem;
			}
		</style>

		<sample-page title="Oops! Looks Like You're Lost">
			<p>Uh-oh! It seems like you've ventured into uncharted territory. The page you're looking for might have taken a detour or doesn't exist anymore. But don't worry, we'll help you get back on track!</p>

			<p>Here are a few steps you can take:</p>

			<ol>
				<li><strong>Double-check the URL:</strong> Make sure you've entered the correct web address. Sometimes a small typo can lead you astray.</li>
				<li><strong>Navigate Back:</strong> You can always click the back button on your browser to return to the previous page.</li>
				<li><strong>Explore Our Site:</strong> While you're here, why not explore some of our other pages? You might discover something new and interesting!</li>
				<li><strong>Contact Us:</strong> If you believe this is a mistake or you need further assistance, feel free to contact our support team. We're here to help you every step of the way.</li>
				<li>While you're here, why not take a moment to ponder the wonders of the digital universe? After all, getting lost is just another opportunity for adventure!</li>
			</ol>

			<p>Thanks for your patience, and happy browsing!</p>

			<slot slot="sidebar"></slot>
		</sample-page>
	</template>
`);
const templateElement = document.body.lastElementChild;

customElements.define('not-found-page', class extends HTMLElement {
	#samplePageElement;

	constructor() {
		super();

		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(templateElement.content.cloneNode(true));

		this.#samplePageElement = this.shadowRoot.querySelector('sample-page');
	}

	focus() {
		this.#samplePageElement.focus();
	}
});
