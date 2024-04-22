// ==
// TEMPLATE(S)
// ==

const templateElement = document.createElement('template');
templateElement.innerHTML = /* html */ `
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/JamesRobertHugginsNgo/bootstrap@main/dist/css/bootstrap.min.css">

	<div class="list-group"></div>
`;

const templateItemElement = document.createElement('template');
templateItemElement.innerHTML = /* html */ `
	<a href="" class="list-group-item list-group-item-action"></a>
`;

// ==
// CLASS(ES)
// ==

class SampleSidebar extends HTMLElement {

	// --
	// STATIC PROPERTY(IES)
	// --

	static observedAttributes = [
		'items',
		'select',
	];

	// --
	// PRIVATE PROPERTY(IES)
	// --

	#items;
	#listGroupElement;
	#select;

	// --
	// PRIVATE METHOD(S)
	// --

	#setSelection() {
		const activeElement = this.shadowRoot.querySelector(`a[aria-current="true"]`);
		if (activeElement) {
			activeElement.classList.remove('active');
			activeElement.removeAttribute('aria-current');
		}

		if (this.#select) {
			const newActiveElement = this.shadowRoot.querySelector(`a:nth-of-type(${this.#select})`);
			if (newActiveElement) {
				newActiveElement.classList.add('active');
				newActiveElement.setAttribute('aria-current', true);
			}
		}
	}

	// --
	// PUBLIC PROPERTY(IES)
	// --

	get select() {
		return this.#select;
	}
	set select(newValue) {
		this.#select = +newValue || 0;
		this.#setSelection();
	}

	get items() {
		return this.#items;
	}
	set items(newValue) {
		this.#items = newValue;

		this.#listGroupElement.innerHTML = '';

		if (!Array.isArray(this.#items)) {
			return;
		}

		for (let index = 0; index < this.#items.length; index++) {
			const item = this.#items[index];
			if (!item || typeof item !== 'object') {
				continue;
			}

			const { text, link } = item;
			const documentFragment = templateItemElement.content.cloneNode(true);
			const linkElement = documentFragment.querySelector('a');
			linkElement.textContent = text;
			linkElement.setAttribute('href', link);
			this.#listGroupElement.appendChild(documentFragment);
		}

		this.#setSelection();
	}

	// --
	// LIFE CYCLE METHOD(S)
	// --

	constructor() {
		super();

		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(templateElement.content.cloneNode(true));

		this.#listGroupElement = this.shadowRoot.querySelector('.list-group');

		new MutationObserver((mutationRecords) => {
			this.mutationCallback(mutationRecords);
		}).observe(this, { childList: true });
		this.mutationCallback();
	}

	// connectedCallback() {
	// }

	// disconnectedCallback() {
	// }

	// adoptedCallback() {
	// }

	attributeChangedCallback(name, oldValue, newValue) {
		switch (name) {
			case 'items':
				try {
					this.items = JSON.parse(newValue);
				} catch (error) {
					console.log(error);
					this.items = null;
				}
				break;
			case 'select': {
				this.select = newValue;
				break;
			}
		}
	}

	mutationCallback() {
		const items = [];
		const linkElements = this.querySelectorAll(':scope > a');
		for (let index = 0; index < linkElements.length; index++) {
			const linkElement = linkElements[index];
			items.push({
				text: linkElement.textContent,
				link: linkElement.getAttribute('href')
			});
		}
		this.items = items;
	}
}

// ==
// CUSTOM ELEMENT(S)
// ==

customElements.define('sample-sidebar', SampleSidebar);
