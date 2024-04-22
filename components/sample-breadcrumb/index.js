// ==
// TEMPLATE(S)
// ==

const templateElement = document.createElement('template');
templateElement.innerHTML = /* html */ `
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/JamesRobertHugginsNgo/bootstrap@main/dist/css/bootstrap.min.css">

	<nav aria-label="breadcrumb">
		<ol class="breadcrumb">
		</ol>
	</nav>
`;

const itemTemplateElement = document.createElement('template');
itemTemplateElement.innerHTML = /* html */ `
	<li class="breadcrumb-item"><a></a></li>
`;

const activeItemTemplateElement = document.createElement('template');
activeItemTemplateElement.innerHTML = /* html */ `
	<li class="breadcrumb-item active" aria-current="page"></li>
`;

// ==
// CLASS(ES)
// ==

class SampleBreadcrumb extends HTMLElement {

	// --
	// STATIC PROPERTY(IES)
	// --

	static observedAttributes = [
		'items'
	];

	// --
	// PRIVATE PROPERTY(IES)
	// --

	#breadcrumbElement;
	#items;

	// --
	// PUBLIC PROPERTY(IES)
	// --

	get items() {
		return this.#items;
	}
	set items(newValue) {
		this.#items = newValue;

		if (!Array.isArray(this.#items)) {
			this.#breadcrumbElement.replaceChildren();
			return;
		}

		const breadcrumbDocumentFragment = document.createDocumentFragment();
		for (let index = 0; index < this.#items.length; index++) {
			const item = this.#items[index];
			if (!item || typeof item !== 'object') {
				continue;
			}

			if (index + 1 === this.#items.length) {
				const { text } = item;
				const documentFragment = activeItemTemplateElement.content.cloneNode(true);
				documentFragment.querySelector('.breadcrumb-item').textContent = text;
				breadcrumbDocumentFragment.appendChild(documentFragment);
				continue;
			}

			const { text, link } = item;
			const documentFragment = itemTemplateElement.content.cloneNode(true);
			const linkElement = documentFragment.querySelector('a');
			linkElement.textContent = text;
			linkElement.setAttribute('href', link);
			breadcrumbDocumentFragment.appendChild(documentFragment);
		}
		this.#breadcrumbElement.replaceChildren(breadcrumbDocumentFragment);
	}

	// --
	// LIFE CYCLE METHOD(S)
	// --

	constructor() {
		super();

		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(templateElement.content.cloneNode(true));

		this.#breadcrumbElement = this.shadowRoot.querySelector('.breadcrumb');

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

customElements.define('sample-breadcrumb', SampleBreadcrumb);
