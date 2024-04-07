class Router {
	routes = [];

	route() {
		const [fragment, queryString] = !window.location.hash
			? ['']
			: window.location.hash.substring(1).split('?');
		for (let index = 0; index < this.routes.length; index++) {
			const { regexp = /.*/, callback } = this.routes[index];
			const match = fragment.match(regexp);
			if (match) {
				callback(match, queryString);
				break;
			}
		}
	}

	navigate(fragment, { replace = false, trigger = false } = {}) {
		if (replace) {
			history.replaceState({}, '', `#${fragment}`);
		} else {
			history.pushState({}, '', `#${fragment}`);
		}
		if (trigger) {
			this.route();
		}
	}

	start() {
		window.addEventListener('popstate', () => {
			this.route();
		});
		this.route();
	}
}

export default new Router();
