// ==
// TEMPLATE(S)
// ==

const templateElement = document.createElement('template');
templateElement.innerHTML = /* html */ `
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/JamesRobertHugginsNgo/bootstrap@main/dist/css/bootstrap.min.css">

	<style>
		:host {
			display: block;
		}
	</style>

	<table class="table">
		<thead></thead>
		<tbody></tbody>
	</table>
`;

const columnsTrTemplateElement = document.createElement('template');
columnsTrTemplateElement.innerHTML = /* html */ `
	<tr></tr>
`;

const columnsThTemplateElement = document.createElement('template');
columnsThTemplateElement.innerHTML = /* html */ `
	<th></th>
`;

const dataTrTemplateElement = document.createElement('template');
dataTrTemplateElement.innerHTML = /* html */ `
	<tr></tr>
`;

const dataTdTemplateElement = document.createElement('template');
dataTdTemplateElement.innerHTML = /* html */ `
	<td></td>
`;

const numberDataTdTemplateElement = document.createElement('template');
numberDataTdTemplateElement.innerHTML = /* html */ `
	<td class="text-end"></td>
`;

// ==
// CLASS(ES)
// ==

class SampleTable extends HTMLElement {

	// --
	// STATIC PROPERTY(IES)
	// --

	static observedAttributes = [
		'columns',
		'data'
	];

	// --
	// PRIVATE PROPERTY(IES)
	// --

	#columns;
	#data;
	#tbodyElement;
	#theadElement;

	// --
	// PRIVATE METHOD(S)
	// --

	#renderData() {
		if (!Array.isArray(this.#columns) || !Array.isArray(this.#data)) {
			this.#tbodyElement.replaceChildren();
			return;
		}

		const tbodyDocumentFragment = document.createDocumentFragment();
		for (let dataIndex = 0; dataIndex < this.#data.length; dataIndex++) {
			const data = this.#data[dataIndex];

			if (!data || typeof data !== 'object') {
				continue;
			}

			const trDocumentFragment = dataTrTemplateElement.content.cloneNode(true);
			const trElement = trDocumentFragment.firstElementChild;
			for (let columnIndex = 0; columnIndex < this.#columns.length; columnIndex++) {
				const column = this.#columns[columnIndex];

				if (!column || typeof column !== 'object') {
					continue;
				}

				const {
					data: columnData,
					type
				} = column;

				let tdDocumentFragment;
				switch(type) {
					case 'number': {
						tdDocumentFragment = numberDataTdTemplateElement.content.cloneNode(true);
						const contentElement = tdDocumentFragment.firstElementChild;
						if (columnData) {
							const num = +data[columnData];
							contentElement.textContent = isNaN(num) ? '' : num.toLocaleString();
						}
						break;
					}
					default: {
						tdDocumentFragment = dataTdTemplateElement.content.cloneNode(true);
						const contentElement = tdDocumentFragment.firstElementChild;
						if (columnData) {
							contentElement.textContent = data[columnData];
						}
					}
				}
				trElement.appendChild(tdDocumentFragment);
			}
			tbodyDocumentFragment.appendChild(trDocumentFragment);
		}
		this.#tbodyElement.replaceChildren(tbodyDocumentFragment);
	}

	// --
	// PUBLIC PROPERTY(IES)
	// --

	get columns() {
		return this.#columns;
	}
	set columns(newValue) {
		this.#columns = newValue;

		if (!Array.isArray(this.#columns)) {
			this.#theadElement.replaceChildren();
			this.#renderData();
			return;
		}

		const trDocumentFragment = columnsTrTemplateElement.content.cloneNode(true);
		const trElement = trDocumentFragment.firstElementChild;
		for (let index = 0; index < this.#columns.length; index++) {
			const column = this.#columns[index];

			if (!column || typeof column !== 'object') {
				continue;
			}

			const {
				data,
				title = data || 'Untitled'
			} = column;

			const documentFragment = columnsThTemplateElement.content.cloneNode(true);
			const thElement = documentFragment.firstElementChild;
			thElement.textContent = title;
			trElement.appendChild(documentFragment);
		}

		this.#theadElement.replaceChildren(trDocumentFragment);
		this.#renderData();
	}

	get data() {
		return this.#data;
	}
	set data(newValue) {
		this.#data = newValue;

		this.#renderData();
	}

	// --
	// LIFE CYCLE METHOD(S)
	// --

	constructor() {
		super();

		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(templateElement.content.cloneNode(true));

		this.#theadElement = this.shadowRoot.querySelector('thead');
		this.#tbodyElement = this.shadowRoot.querySelector('tbody');

		// new MutationObserver((mutationRecords) => {
		// 	this.mutationCallback(mutationRecords);
		// }).observe(this, { childList: true });
		// this.mutationCallback();
	}

	// connectedCallback() {
	// }

	// disconnectedCallback() {
	// }

	// adoptedCallback() {
	// }

	attributeChangedCallback(name, oldValue, newValue) {
		switch (name) {
			case 'columns': {
				let columns;
				try {
					columns = JSON.parse(newValue);
				} catch (error) {
					columns = null;
				}
				this.columns = columns;
				break;
			}
			case 'data': {
				let data;
				try {
					data = JSON.parse(newValue);
				} catch (error) {
					data = null;
				}
				this.data = data;
				break;
			}
		}
	}

	// mutationCallback(mutationRecords) {
	// 	const items = [];
	// 	const linkElements = this.querySelectorAll(':scope > a');
	// 	for (let index = 0; index < linkElements.length; index++) {
	// 		const linkElement = linkElements[index];
	// 		items.push({
	// 			text: linkElement.textContent,
	// 			link: linkElement.getAttribute('href')
	// 		});
	// 	}
	// 	this.items = items;
	// }
}

// ==
// CUSTOM ELEMENT(S)
// ==

customElements.define('sample-table', SampleTable);
