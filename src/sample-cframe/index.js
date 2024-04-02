fetch('{{DEST}}/sample-cframe/template{{INFIX}}.html').then((response) => {
	return response.text();
}).then((templateString) => {
	document.body.insertAdjacentHTML('beforeend', templateString);
	const templateElement = document.body.lastElementChild;

	customElements.define('sample-cframe', class extends HTMLElement {
		static observedAttributes = [
			'breadcrumbs',
			'title'
		];

		#breadcrumbsElement;
		#breadcrumbsColElement;
		#titleElement;

		constructor() {
			super();

			// console.log('CONSTRUCTOR');

			this.attachShadow({ mode: 'open' });
			this.shadowRoot.appendChild(templateElement.content.cloneNode(true));

			this.#breadcrumbsElement = this.shadowRoot.querySelector('.breadcrumbs');
			this.#breadcrumbsColElement = this.#breadcrumbsElement.querySelector('.container > .row > .col');
			this.#titleElement = this.shadowRoot.querySelector('.title');
		}

		// connectedCallback() {
		// 	console.group('CONNECTED CALLBACK');
		// 	console.log('Custom element added to page.');
		// 	console.groupEnd();
		// }

		// disconnectedCallback() {
		// 	console.group('DISCONNECTED CALLBACK');
		// 	console.log('Custom element removed from page.');
		// 	console.groupEnd();
		// }

		// adoptedCallback() {
		// 	console.group('ADOPTED CALLBACK');
		// 	console.log('Custom element moved to new page.');
		// 	console.groupEnd();
		// }

		attributeChangedCallback(name, oldValue, newValue) {
			// console.group('ATTRIBUTE CHANGED CALLBACK');
			// console.log('NAME', name);
			// console.log('OLD VALUE', oldValue);
			// console.log('NEW VALUE', newValue);
			// console.groupEnd();

			switch (name) {
				case 'breadcrumbs':
					if (!newValue) {
						this.setBreadcrumbs(null);
					} else {
						this.setBreadcrumbs(JSON.parse(document.getElementById(newValue).textContent));
					}
					break;
				case 'title':
					if (!newValue) {
						this.#titleElement.classList.add('d-none');
						this.#titleElement.textContent = '';
					} else {
						this.#titleElement.textContent = newValue;
						this.#titleElement.classList.remove('d-none');
					}
					break;
			}
		}

		setBreadcrumbs(breadcrumbs) {
			if (!breadcrumbs) {
				this.#breadcrumbsElement.classList.add('d-none');
				this.#breadcrumbsColElement.innerHTML = '';
			} else {
				this.#breadcrumbsElement.classList.remove('d-none');
				const breadcrumbItems = breadcrumbs.map(({ text, link }) => {
					return `<li class="breadcrumb-item"><a href="${link}">${text}</a></li>`;
				});
				this.#breadcrumbsColElement.innerHTML = `
					<nav aria-label="breadcrumb">
						<ol class="breadcrumb">
							${breadcrumbItems.join('')}
						</ol>
					</nav>
				`;
			}
		}

		focus() {
			this.#titleElement.focus();
		}
	});
});
