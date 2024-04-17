// ==
// TEMPLATE(S)
// ==

const templateElement = document.createElement('template');
templateElement.innerHTML = /* html */ `
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/JamesRobertHugginsNgo/bootstrap@main/dist/css/bootstrap.min.css">

	<div>
		<h1 tabindex="0">Untitled</h1>

		<div class="row">
			<div class="col-12 col-md-8 col-lg-9">
				<slot></slot>
			</div>

			<div class="col-12 col-md-4 col-lg-3">
				<slot name="sidebar"></slot>
			</div>
		</div>
	</div>
`;

// ==
// CUSTOM ELEMENT(S)
// ==

customElements.define('sample-page', class extends HTMLElement {

	// --
	// STATIC PROPERTY(IES)
	// --

	static observedAttributes = [
		'title'
	];

	// --
	// PRIVATE PROPERTY(IES)
	// --

	#title;
	#titleElement;

	// --
	// PUBLIC PROPERTY(IES)
	// --

	get title() {
		return this.#title;
	}
	set title(newValue) {
		this.#title = newValue;

		this.#titleElement.textContent = this.#title || 'Untitled';
	}

	// --
	// PUBLIC METHOD(S)
	// --

	focus() {
		this.#titleElement.focus();
	}

	// --
	// LIFE CYCLE METHOD(S)
	// --

	constructor() {
		super();

		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(templateElement.content.cloneNode(true));

		this.#titleElement = this.shadowRoot.querySelector('h1');
	}

	attributeChangedCallback(name, oldValue, newValue) {
		switch (name) {
			case 'title': {
				this.title = newValue;
				break;
			}
		}
	}
});
