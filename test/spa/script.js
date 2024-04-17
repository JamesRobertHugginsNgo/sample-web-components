import '../../index.js';
import startRouter from '../../utilities/start-router.js';

const breadcrumb = document.querySelector('sample-breadcrumb');
const page = document.querySelector('sample-page');
const sidebar = document.querySelector('sample-sidebar');

let hasRouted = false;

startRouter((navigate) => {
	console.log('ROUTER CALLBACK', window.location.hash);

	const [path] = window.location.hash.split('?');

	// --
	// EMPTY
	// --

	{
		const match = path.match(/^\s*$/);
		if (match) {
			navigate('home', { trigger: true });
			return;
		}
	}

	// --
	// HOME
	// --

	{
		const match = path.match(/^#home$/);
		if (match) {
			breadcrumb.items = [
				{ text: 'Website', link: '#home' },
				{ text: 'Home', link: '#home' }
			];

			page.title = 'Welcome to [Your Website Name]';
			page.innerHTML = /* html */ `
				<p>Unlock endless possibilities and embark on a journey of discovery with [Your Website Name]. Whether you're seeking inspiration, knowledge, or connection, you've come to the right place.</p>

				<p>Here's what awaits you:</p>

				<p><strong>Explore:</strong> Dive into a world of diverse content curated just for you. From articles and videos to interactive experiences, there's something for everyone.</p>

				<p><strong>Learn:</strong> Expand your horizons and broaden your understanding. Our comprehensive resources cover a wide range of topics, from technology and science to arts and culture.</p>

				<p><strong>Connect:</strong> Join a vibrant community of enthusiasts, experts, and learners. Share your thoughts, ask questions, and engage in meaningful conversations.</p>

				<p><strong>Create:</strong> Unleash your creativity and bring your ideas to life. Whether you're a seasoned artist or a budding entrepreneur, our platform provides the tools and support you need to thrive.</p>

				<p>Join us on this exciting adventure and discover what lies beyond the horizon. The possibilities are endless, and the journey is yours to embrace.</p>

				<p>Start exploring now!</p>

				<p>[CTA Button: Explore Now]</p>
			`;
			page.appendChild(sidebar);
			sidebar.active = 1;

			if (hasRouted) {
				page.focus();
			} else {
				hasRouted = false;
			}

			return;
		}
	}

	// --
	// DIRECTORY
	// --

	{
		const match = path.match(/^#directory$/);
		if (match) {
			breadcrumb.items = [
				{ text: 'Website', link: '#home' },
				{ text: 'Home', link: '#home' },
				{ text: 'Directory', link: '#directory' }
			];

			page.title = 'Directory';
			page.innerHTML = /* html */ `
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
			`;
			page.appendChild(sidebar);
			sidebar.active = 2;

			if (hasRouted) {
				page.focus();
			} else {
				hasRouted = false;
			}

			return;
		}
	}

		// --
	// DIRECTORY
	// --

	{
		const match = path.match(/^#page$/);
		if (match) {
			breadcrumb.items = [
				{ text: 'Website', link: '#home' },
				{ text: 'Home', link: '#home' },
				{ text: 'Directory', link: '#directory' },
				{ text: 'Page', link: '#page' }
			];

			page.title = 'Page';
			page.innerHTML = /* html */ `
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
			`;
			page.appendChild(sidebar);
			sidebar.active = 3;

			if (hasRouted) {
				page.focus();
			} else {
				hasRouted = false;
			}

			return;
		}
	}

	// --
	// 404
	// --

	{
		breadcrumb.items = [
			{ text: 'Website', link: '#home' },
			{ text: '404', link: '#home' }
		];

		page.title = '404 - Page Not Found';
		page.innerHTML = /* html */ `
			<p>Oops! It seems like you've stumbled upon a page that's as elusive as a needle in a haystack. Don't worry, though; we're here to guide you back on track!</p>

			<p>Here are a few things you can try:</p>

			<ol>
				<li>Double-check the URL: Perhaps there was a tiny typo that led you astray. Go ahead and give it another shot.</li>
				<li>Navigate back to safety: Hit that back button on your browser or navigate using the menu above. There are plenty of exciting pages waiting for your exploration.</li>
				<li>Take a breather: Sometimes, a little break can work wonders. How about grabbing a cup of coffee or tea while we sort things out?</li>
			</ol>

			<p>If none of these options seem to do the trick, don't hesitate to reach out to our support team. We're here to assist you in any way we can.</p>

			<p>In the meantime, stay curious and keep exploring!</p>

			<p>
				Warm regards,<br>
				[Your Website Name] Team
			</p>
		`;
		page.appendChild(sidebar);
		sidebar.active = 0;

		if (hasRouted) {
			page.focus();
		} else {
			hasRouted = false;
		}
	}
});
