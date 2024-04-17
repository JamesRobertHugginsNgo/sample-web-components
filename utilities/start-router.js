export default function startRouter(callback) {
	function navigate(fragment, { replace = false, trigger = false } = {}) {
		if (replace) {
			history.replaceState({}, '', `#${fragment}`);
		} else {
			history.pushState({}, '', `#${fragment}`);
		}
		if (trigger) {
			callback(navigate);
		}
	}

	window.addEventListener('popstate', () => {
		callback(navigate);
	});
	callback(navigate);
}
