// ==
// TEMPLATE(S)
// ==

const templateElement = document.createElement('template');
templateElement.innerHTML = /* html */ `
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/JamesRobertHugginsNgo/bootstrap@main/dist/css/bootstrap.min.css">
	<style>
		th[scope="col"] {
			position: relative;

			button {
				background-color: transparent;
				border: 0;
				bottom: 0;
				curosr: pointer;
				display: inline;
				font-size: 100%;
				font-weight: bold;
				left: 0;
				margin: 0;
				padding: 0;
				right: 0;
				text-align: left;
				text-decoration: underline;
				top: 0;
				width: 100%;

				span {
					position: absolute;
					right: 4px;
				}
			}

			&[aria-sort="ascending"] span:after {
				content: "▲";
				color: currentcolor;
				font-size: 100%;
				top: 0;
			}

			&[aria-sort="descending"] span:after {
				content: "▼";
				color: currentcolor;
				font-size: 100%;
				top: 0;
			}
		}
	</style>
	<div class="table-responsive">
		<table class="table table-striped">
			<thead></thead>
			<tbody class="table-group-divider"></tbody>
		</table>
	</div>
`;

const columnsTemplateElement = document.createElement('template');
columnsTemplateElement.innerHTML = /* html */ `
	<tr></tr>
`;

const columnTemplateElement = document.createElement('template');
columnTemplateElement.innerHTML = /* html */ `
	<th scope="col"></th>
`;

const sortableColumnTemplateElement = document.createElement('template');
sortableColumnTemplateElement.innerHTML = /* html */ `
	<th scope="col"><button><span aria-hidden="true"></span></button></th>
`;

const dataTemplateElement = document.createElement('template');
dataTemplateElement.innerHTML = /* html */ `
	<tr></tr>
`;

const dataColumnTemplateElement = document.createElement('template');
dataColumnTemplateElement.innerHTML = /* html */ `
	<td></td>
`;

// ==
// CUSTOM ELEMENT(S)
// ==

customElements.define('sample-table', class extends HTMLElement {

	// --
	// STATIC PROPERTY(IES)
	// --

	static observedAttributes = [
		'columns',
		'data',
		'sortby'
	];

	// --
	// PRIVATE PROPERTY(IES)
	// --

	#columns;
	#data;
	#sortBy;
	#theadElement;
	#tbodyElement;

	// --
	// PRIVATE METHOD(S)
	// --

	#renderColumns() {
		this.#theadElement.innerHTML = '';

		if (!Array.isArray(this.#columns)) {
			return;
		}

		const columnsDocumentFragment = columnsTemplateElement.content.cloneNode(true);
		const rowElement = columnsDocumentFragment.firstElementChild;
		for (let columnIndex = 0; columnIndex < this.#columns.length; columnIndex++) {
			let columnDocumentFragment;

			const column = this.#columns[columnIndex];
			if (column && typeof column === 'object') {
				const {
					data,
					title,
					sortable
				} = column;

				if (sortable) {
					columnDocumentFragment = sortableColumnTemplateElement.content.cloneNode(true);
					const columnElement = columnDocumentFragment.firstElementChild;
					const buttonElement = columnElement.querySelector('button');
					const spanElement = buttonElement.firstElementChild;
					buttonElement.textContent = title;
					buttonElement.appendChild(spanElement);

					buttonElement.clickEventListener = () => { this.sortBy = columnElement.getAttribute('data-key'); };
					buttonElement.addEventListener('click', buttonElement.clickEventListener);
				} else {
					columnDocumentFragment = columnTemplateElement.content.cloneNode(true);
					const columnElement = columnDocumentFragment.firstElementChild;
					columnElement.textContent = title;
				}

				if (data != null) {
					columnDocumentFragment.firstElementChild.setAttribute('data-key', data);
				}
			} else {
				columnDocumentFragment = columnTemplateElement.content.cloneNode(true);
			}

			rowElement.appendChild(columnDocumentFragment);
		}

		this.#theadElement.appendChild(columnsDocumentFragment);

		this.#renderSortBy();
		this.#renderData();
	}

	#renderData() {
		this.#tbodyElement.innerHTML = '';

		if (!Array.isArray(this.#columns) || !Array.isArray(this.#data)) {
			return;
		}

		for (let rowIndex = 0; rowIndex < this.#data.length; rowIndex++) {
			const data = this.#data[rowIndex];

			const dataDocumentFragment = dataTemplateElement.content.cloneNode(true);
			const rowElement = dataDocumentFragment.firstElementChild;
			for (let columnIndex = 0; columnIndex < this.#columns.length; columnIndex++) {
				const dataColumnDocumentFragment = dataColumnTemplateElement.content.cloneNode(true);

				const column = this.#columns[columnIndex];
				if (column && typeof column === 'object') {
					const { data: columnData, type } = column;

					const columnElement = dataColumnDocumentFragment.firstElementChild;

					if (type === 'number') {
						columnElement.classList.add('text-end');
					}

					if (data && typeof data === 'object') {
						const value = data[columnData];

						if (value != null) {
							columnElement.textContent = value;
						}
					}
				}

				rowElement.appendChild(dataColumnDocumentFragment);
			}

			this.#tbodyElement.appendChild(dataDocumentFragment);
		}
	}

	#renderSortBy() {
		const columnElements = this.#theadElement.querySelectorAll('[aria-sort]');
		for (let index = 0; index < columnElements.length; index++) {
			const columnElement = columnElements[index];
			columnElement.removeAttribute('aria-sort');
			const buttonElement = columnElement.querySelector('button');

			buttonElement.removeEventListener('click', buttonElement.clickEventListener);
			buttonElement.clickEventListener = () => { this.sortBy = columnElement.getAttribute('data-key'); };
			buttonElement.addEventListener('click', buttonElement.clickEventListener);
		}

		if (!this.sortBy) {
			return;
		}

		const matchDescending = this.#sortBy.match(/^(.*)\sdescending$/);
		if (matchDescending) {
			const columnElement = this.#theadElement.querySelector(`[data-key="${matchDescending[1]}"]`);
			if (columnElement) {
				const buttonElement = columnElement.querySelector('button');
				if (buttonElement) {
					columnElement.setAttribute('aria-sort', 'descending');

					buttonElement.removeEventListener('click', buttonElement.clickEventListener);
					buttonElement.clickEventListener = () => { this.sortBy = columnElement.getAttribute('data-key'); };
					buttonElement.addEventListener('click', buttonElement.clickEventListener);

					return {
						data: matchDescending[1],
						type: 'descending'
					};
				}
			}

			return;
		}

		const matchAscending = this.#sortBy.match(/^(.*)\sascending$/);
		if (matchAscending) {
			const columnElement = this.#theadElement.querySelector(`[data-key="${matchAscending[1]}"]`);
			if (columnElement) {
				const buttonElement = columnElement.querySelector('button');
				if (buttonElement) {
					columnElement.setAttribute('aria-sort', 'ascending');

					buttonElement.removeEventListener('click', buttonElement.clickEventListener);
					buttonElement.clickEventListener = () => { this.sortBy = `${columnElement.getAttribute('data-key')} descending`; };
					buttonElement.addEventListener('click', buttonElement.clickEventListener);

					return {
						data: matchAscending[1],
						type: 'ascending'
					};
				}
			}

			return;
		}

		const columnElement = this.#theadElement.querySelector(`[data-key="${this.#sortBy}"]`);
		if (columnElement) {
			const buttonElement = columnElement.querySelector('button');
			if (buttonElement) {
				columnElement.setAttribute('aria-sort', 'ascending');

				buttonElement.removeEventListener('click', buttonElement.clickEventListener);
				buttonElement.clickEventListener = () => { this.sortBy = `${columnElement.getAttribute('data-key')} descending`; };
				buttonElement.addEventListener('click', buttonElement.clickEventListener);

				return {
					data: this.#sortBy,
					type: 'ascending'
				};
			}
		}
	}

	// --
	// PUBLIC PROPERTY(IES)
	// --

	get columns() {
		return this.#columns;
	}
	set columns(newValue) {
		this.#columns = newValue;
		this.#renderColumns();
	}

	get data() {
		return this.#data;
	}
	set data(newValue) {
		this.#data = newValue;
		this.#renderData();
	}

	get sortBy() {
		return this.#sortBy;
	}
	set sortBy(newValue) {
		this.#sortBy = newValue;
		const detail = this.#renderSortBy();
		this.dispatchEvent(new CustomEvent('sortby', { detail }));
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
				try {
					this.columns = JSON.parse(newValue);
				} catch (error) {
					this.columns = null;
				}
				break;
			}
			case 'data': {
				try {
					this.data = JSON.parse(newValue);
				} catch (error) {
					this.data = null;
				}
				break;
			}
			case 'sortby': {
				this.sortBy = newValue;
				break;
			}
		}
	}
});
