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
// CUSTOM ELEMENT(S)
// ==

customElements.define('sample-sidebar', class extends HTMLElement {

	// --
	// STATIC PROPERTY(IES)
	// --

	static observedAttributes = [
		'active',
		'items'
	];

	// --
	// PRIVATE PROPERTY(IES)
	// --

	#active;
	#listGroupElement;
	#childNodes = [];
	#items;
	#mutationObserver;

	// --
	// PUBLIC PROPERTY(IES)
	// --

	get active() {
		return this.#active;
	}
	set active(newValue) {
		this.#active = +newValue || 0;

		const activeElement = this.shadowRoot.querySelector(`a[aria-current="true"]`);
		if (activeElement) {
			activeElement.classList.remove('active');
			activeElement.removeAttribute('aria-current');
		}

		if (this.#active) {
			const newActiveElement = this.shadowRoot.querySelector(`a:nth-of-type(${this.#active})`);
			if (newActiveElement) {
				newActiveElement.classList.add('active');
				newActiveElement.setAttribute('aria-current', true);
			}
		}
	}

	get items() {
		console.log('GET - ITEMS');

		return this.#items;
	}
	set items(newValue) {
		console.log('SET - ITEMS');

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
	}

	// --
	// LIFE CYCLE METHOD(S)
	// --

	constructor() {
		super();

		console.log('CONSTRUCTOR', this);

		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(templateElement.content.cloneNode(true));

		this.#listGroupElement = this.shadowRoot.querySelector('.list-group');

		this.#mutationObserver = new MutationObserver((mutationRecords) => {
			this.#childNodes = Array.from(this.childNodes);
			this.mutationCallback(mutationRecords);
		});

		this.#childNodes = Array.from(this.childNodes);
		this.mutationCallback();
	}

	connectedCallback() {
		console.group('CONNECTED CALLBACK');
		console.log('Custom element added to page.');
		console.groupEnd();

		console.log('CHILD NODES', this.#childNodes);
		if (this.#childNodes.length !== this.childNodes.length || !this.#childNodes.every((node, index) => {
			return node === this.childNodes[index];
		})) {
			this.#childNodes = Array.from(this.childNodes);
			this.mutationCallback();
		}

		this.#mutationObserver.observe(this, { childList: true });
	}

	disconnectedCallback() {
		console.group('DISCONNECTED CALLBACK');
		console.log('Custom element removed from page.');
		console.groupEnd();

		this.#mutationObserver.disconnect();
	}

	adoptedCallback() {
		console.group('ADOPTED CALLBACK');
		console.log('Custom element moved to new page.');
		console.groupEnd();
	}

	attributeChangedCallback(name, oldValue, newValue) {
		console.group('ATTRIBUTE CHANGED CALLBACK');
		console.log('NAME', name);
		console.log('OLD VALUE', oldValue);
		console.log('NEW VALUE', newValue);
		console.groupEnd();

		switch (name) {
			case 'active': {
				this.active = newValue;
				break;
			}
			case 'items':
				try {
					this.items = JSON.parse(newValue);
				} catch (error) {
					console.log(error);
					this.items = null;
				}
				break;
		}
	}

	mutationCallback(mutationRecords) {
		console.group('MUTATION CALLBACK');
		console.log('MUTATION RECORDS', mutationRecords);
		console.groupEnd();

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
});
