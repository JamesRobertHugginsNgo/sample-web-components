document.body.insertAdjacentHTML('beforeend', /* html */ `
	<template>
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/JamesRobertHugginsNgo/bootstrap@main/dist/css/bootstrap.min.css">

		<div class="list-group">
		</div>
	</template>
`);

const templateElement = document.body.lastElementChild;

customElements.define('sample-sidebar', class extends HTMLElement {
	static observedAttributes = [
		'active'
	];

	#listGroupElement;
	#observer;

	constructor() {
		super();

		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(templateElement.content.cloneNode(true));

		this.#listGroupElement = this.shadowRoot.querySelector('.list-group');

		this.#observer = new MutationObserver(() => {
			this.#render();
		});
	}

	connectedCallback() {
		this.#observer.observe(this, { attributes: false, childList: true, subtree: true });
		this.#render();
	}

	disconnectedCallback() {
		this.#observer.disconnect();
	}

	attributeChangedCallback(name, oldValue, newValue) {
		switch (name) {
			case 'active': {
				this.#setActive(newValue);
				break;
			}
		}
	}

	#render() {
		this.#listGroupElement.innerHTML = Array.from(this.querySelectorAll('a')).map((anchorElement) => {
			return `<a href="${anchorElement.getAttribute('href')}" class="list-group-item list-group-item-action">${anchorElement.innerHTML}</li>`;
		}).join('');
	}

	#setActive(active) {
		const previousActiveElement = this.shadowRoot.querySelector(`a[aria-current="true"]`);
		if (previousActiveElement) {
			previousActiveElement.classList.remove('active');
			previousActiveElement.removeAttribute('aria-current');
		}

		if (active) {
			const currentActiveElement = this.shadowRoot.querySelector(`a:nth-of-type(${active})`);
			if (currentActiveElement) {
				currentActiveElement.classList.add('active');
				currentActiveElement.setAttribute('aria-current', true);
			}
		}
	}
});
