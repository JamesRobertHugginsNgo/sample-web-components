import '../../index.js';

document.body.insertAdjacentHTML('beforeend', /* html */ `
	<template>
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/JamesRobertHugginsNgo/bootstrap@main/dist/css/bootstrap.min.css">

		<sample-page title="Page">
			<p>Eget aliquet nibh praesent tristique. Enim lobortis scelerisque fermentum dui faucibus. Venenatis cras sed felis eget velit. Ipsum dolor sit amet consectetur adipiscing elit. Ultricies tristique nulla aliquet enim tortor at auctor. Integer eget aliquet nibh praesent tristique magna. Magna sit amet purus gravida quis blandit turpis. Ipsum suspendisse ultrices gravida dictum fusce ut placerat. Massa tincidunt dui ut ornare lectus. Sollicitudin aliquam ultrices sagittis orci. Varius duis at consectetur lorem donec massa sapien faucibus et. Sed blandit libero volutpat sed cras.</p>

			<p>Tellus orci ac auctor augue mauris augue neque gravida. Arcu dictum varius duis at consectetur lorem donec massa sapien. Magna fringilla urna porttitor rhoncus dolor. Ullamcorper sit amet risus nullam. At imperdiet dui accumsan sit amet nulla facilisi morbi. Rhoncus urna neque viverra justo nec ultrices. Sit amet nisl purus in. Massa sapien faucibus et molestie ac feugiat. Tempor nec feugiat nisl pretium. Mauris nunc congue nisi vitae. Nullam non nisi est sit amet facilisis magna etiam. Lorem dolor sed viverra ipsum nunc aliquet bibendum enim facilisis. Placerat in egestas erat imperdiet sed euismod nisi porta. In hac habitasse platea dictumst quisque sagittis. Diam vulputate ut pharetra sit amet aliquam id diam maecenas. Enim facilisis gravida neque convallis a cras semper auctor neque. Vitae congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque.</p>

			<slot slot="sidebar"></slot>
		</sample-page>
	</template>
`);
const templateElement = document.body.lastElementChild;

customElements.define('page-page', class extends HTMLElement {
	static observedAttributes = [
		'title'
	];

	#samplePageElement;

	constructor() {
		super();

		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(templateElement.content.cloneNode(true));

		this.#samplePageElement = this.shadowRoot.querySelector('sample-page');
	}

	attributeChangedCallback(name, oldValue, newValue) {
		switch (name) {
			case 'title':
				if (!newValue) {
					this.#samplePageElement.removeAttribute('title');
				} else {
					this.#samplePageElement.setAttribute('title', newValue);
				}
				break;
		}
	}

	focus() {
		this.#samplePageElement.focus();
	}
});
