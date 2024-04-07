import '../index.js';

import router from '../utilities/router.js';

import './common-sidebar/index.js';
import './home-page/index.js';
import './directory-page/index.js';
import './page-page/index.js';
import './not-found-page/index.js';

document.addEventListener('DOMContentLoaded', () => {
	const cframe = document.getElementById('cframe');
	const sidebar = document.createElement('common-sidebar');
	let hasRouted = false;

	router.routes.push(
		{
			regexp: /^$/,
			callback: () => {
				router.navigate('home', { replace: true, trigger: true });
			}
		},
		{
			regexp: /^home$/,
			callback() {
				cframe.setBreadcrumbs([
					{ text: 'Home' }
				]);
				cframe.innerHTML = /* html */ `<home-page></home-page>`;

				const page = cframe.querySelector('home-page');
				page.appendChild(sidebar);
				sidebar.setAttribute('active', 1);

				if (hasRouted) {
					page.focus();
				} else {
					hasRouted = true;
				}
			}
		},
		{
			regexp: /^directory$/,
			callback() {

				cframe.setBreadcrumbs([
					{ text: 'Home', link: '#home' },
					{ text: 'Directory' }
				]);
				cframe.innerHTML = /* html */ `<directory-page></directory-page>`;

				const page = cframe.querySelector('directory-page');
				page.appendChild(sidebar);
				sidebar.setAttribute('active', 2);

				if (hasRouted) {
					page.focus();
				} else {
					hasRouted = true;
				}
			}
		},
		{
			regexp: /^page(\/(.*)?)?$/,
			callback([,,title = 'Page']) {
				const decodedTitle = decodeURIComponent(title);

				cframe.setBreadcrumbs([
					{ text: 'Home', link: '#home' },
					{ text: 'Directory', link: '#directory' },
					{ text: decodedTitle }
				]);

				cframe.innerHTML = /* html */ `<page-page title="${decodedTitle}"></page-page>`;

				const page = cframe.querySelector('page-page');
				page.appendChild(sidebar);

				if (decodedTitle === 'Test Page') {
					sidebar.setAttribute('active', 4);
				} else if (decodedTitle === 'Other Page') {
					sidebar.setAttribute('active', 5);
				} else {
					sidebar.setAttribute('active', 3);
				}

				if (hasRouted) {
					page.focus();
				} else {
					hasRouted = true;
				}
			}
		},
		{
			callback: () => {
				cframe.setBreadcrumbs([
					{ text: 'Home', link: '#home' },
					{ text: '404' }
				]);

				cframe.innerHTML = /* html */ `<not-found-page></not-found-page>`;

				const page = cframe.querySelector('not-found-page');
				page.appendChild(sidebar);

				sidebar.removeAttribute('active');

				if (hasRouted) {
					page.focus();
				} else {
					hasRouted = true;
				}
			}
		}
	);

	router.start();
});
