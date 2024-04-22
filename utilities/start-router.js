export default function startRouter(callback) {
	let previousPath, previousQuery, path, query;
	let hasRouted = false;
	function getMeta(replace) {
		if (!replace) {
			previousPath = path;
			previousQuery = query;
		}

		const [hash, tempQuery] = window.location.hash.split('?');
		const [, tempPath] = hash.split('#');

		path = tempPath;
		query = tempQuery;

		return {
			path,
			query,
			previousPath,
			previousQuery,
			hasRouted: hasRouted || void (hasRouted = true)
		};
	}

	function navigate(path, { query, replace = false, trigger = false } = {}) {
		history[replace ? 'replaceState' : 'pushState']({}, '', `#${path}${!query ? '' : `?${query}`}`);
		const meta = getMeta(replace);
		if (trigger) {
			callback(navigate, meta);
		}
	}

	window.addEventListener('popstate', () => {
		callback(navigate, getMeta());
	});
	callback(navigate, getMeta());
}
