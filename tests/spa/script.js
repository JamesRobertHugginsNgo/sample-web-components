import '../../components/index.js';
import startRouter from '../../utilities/start-router.js';

const cframe = document.querySelector('sample-cframe');
const breadcrumb = cframe.querySelector('sample-breadcrumb');

const sidebar = document.createElement('sample-sidebar');
sidebar.setAttribute('slot', 'sidebar');
sidebar.innerHTML = /* html */ `
	<a href="#home">Home</a>
	<a href="#aboutus">About Us</a>
	<a href="#table">Table</a>
	<a href="#form">Form</a>
	<a href="#other">Other</a>
`;

let page;

startRouter((navigate, { path, query, hasRouted, previousPath, previousquery }) => {

	// --
	// BOOKMARK
	// --

	if (path === 'content' && hasRouted) {
		navigate(previousPath, { query: previousquery, replace: true, trigger: false });
		if (page) {
			page.focus();
		}
		return;
	}

	// --
	// DEFAULT
	// --

	if (!path) {
		navigate('home', { query, replace: true, trigger: true });
		return;
	}

	// --
	// HOME
	// --

	{
		const match = path.match(/^home$/);
		if (match) {
			cframe.innerHTML = '';

			breadcrumb.items = [
				{ text: 'Home', link: '#home' }
			];
			cframe.appendChild(breadcrumb);

			page = document.createElement('sample-page');
			page.setAttribute('id', 'content');
			page.title = 'Welcome to [Your Website Name]';
			page.innerHTML = /* html */ `
				<p>At [Your Website Name], we're dedicated to bringing you engaging and informative content that covers a wide range of topics. Whether you're looking for articles on lifestyle, health, technology, travel, or just about anything else, you've come to the right place.</p>

				<h2>Explore Diverse Content</h2>

				<p>Dive into our vast library of articles curated to cater to your interests and curiosity. From practical tips and advice to thought-provoking insights and entertainment, there's something for everyone. Our team of writers is passionate about delivering high-quality content that both informs and entertains.</p>

				<h2>Stay Updated</h2>

				<p>Stay in the loop with the latest trends, news, and developments across various fields. Our content is regularly updated to ensure you're always informed about what's happening in the world around you.</p>

				<h2>Connect with Our Community</h2>

				<p>Join our growing community of readers who share a passion for knowledge and discovery. Engage with fellow enthusiasts through comments, discussions, and sharing your thoughts on our articles.</p>

				<h2>Contribute Your Voice</h2>

				<p>Have a story to share or expertise to impart? We welcome contributions from guest writers who want to share their unique perspectives and insights with our audience. Get in touch with us to learn more about how you can become a part of our community of contributors.</p>

				<h2>Start Exploring Today</h2>

				<p>Ready to embark on a journey of discovery? Start exploring our content today and unlock a world of information, inspiration, and entertainment.</p>
			`;

			sidebar.select = 1;
			page.appendChild(sidebar);

			cframe.appendChild(page);

			if (hasRouted) {
				page.focus();
			}

			return;
		}
	}

	// --
	// ABOUT US
	// --

	{
		const match = path.match(/^aboutus$/);
		if (match) {
			cframe.innerHTML = '';

			breadcrumb.items = [
				{ text: 'Home', link: '#home' },
				{ text: 'About Us', link: '#aboutus' }
			];
			cframe.appendChild(breadcrumb);

			page = document.createElement('sample-page');
			page.setAttribute('id', 'content');
			page.title = 'About [Your Website Name]';
			page.innerHTML = /* html */ `
				<p>Welcome to [Your Website Name], your go-to destination for insightful content and engaging articles on a wide range of topics.</p>

				<h2>Our Mission</h2>

				<p>At [Your Website Name], our mission is simple: to inspire, inform, and entertain our readers. We believe in the power of knowledge and storytelling to enrich lives and foster meaningful connections. Through our carefully curated content, we aim to provide valuable insights, practical advice, and entertainment that resonates with our diverse audience.</p>

				<h2>Who We Are</h2>

				<p>We are a team of passionate writers, editors, and creators who are dedicated to delivering high-quality content that captivates and informs. Our team comprises individuals from various backgrounds and expertise, united by a shared commitment to excellence and creativity.</p>

				<h2>What We Offer</h2>

				<p>From articles on lifestyle, health, technology, and travel to thought-provoking essays and entertaining features, we cover a wide spectrum of topics to cater to the diverse interests of our audience. Whether you're seeking practical tips, in-depth analysis, or simply a good read, you'll find it here at [Your Website Name].</p>

				<h2>Our Values</h2>

				<p>Integrity, authenticity, and excellence are at the core of everything we do. We are committed to upholding the highest standards of journalistic integrity and ethical conduct in our content creation process. We strive to be a trusted source of information and a reliable companion on your journey of exploration and discovery.</p>

				<h2>Connect With Us</h2>

				<p>We love hearing from our readers! Whether you have feedback, suggestions, or simply want to say hello, don't hesitate to reach out to us. Connect with us on social media or drop us a message through our contact page. Your input is invaluable to us as we continue to grow and evolve.</p>

				<h2>Join Our Community</h2>

				<p>Become a part of our growing community of readers who share a passion for learning, curiosity, and discovery. Engage with us and fellow enthusiasts through comments, discussions, and sharing your thoughts on our articles. Together, let's explore the wonders of the world through the power of words and ideas.</p>

				<p>Thank you for visiting [Your Website Name]. We're thrilled to have you here, and we look forward to embarking on this journey of exploration and enlightenment with you.</p>
			`;

			sidebar.select = 2;
			page.appendChild(sidebar);

			cframe.appendChild(page);

			if (hasRouted) {
				page.focus();
			}

			return;
		}
	}

	// --
	// TABLE
	// --

	{
		const match = path.match(/^table$/);
		if (match) {
			cframe.innerHTML = '';

			breadcrumb.items = [
				{ text: 'Home', link: '#home' },
				{ text: 'Table', link: '#table' }
			];
			cframe.appendChild(breadcrumb);

			page = document.createElement('sample-page');
			page.setAttribute('id', 'content');
			page.title = 'Table';
			page.innerHTML = /* html */ `
			`;

			sidebar.select = 3;
			page.appendChild(sidebar);

			cframe.appendChild(page);

			if (hasRouted) {
				page.focus();
			}

			return;
		}
	}

	// --
	// FORM
	// --

	{
		const match = path.match(/^form$/);
		if (match) {
			cframe.innerHTML = '';

			breadcrumb.items = [
				{ text: 'Home', link: '#home' },
				{ text: 'Form', link: '#form' }
			];
			cframe.appendChild(breadcrumb);

			page = document.createElement('sample-page');
			page.setAttribute('id', 'content');
			page.title = 'Form';
			page.innerHTML = /* html */ `
			`;

			sidebar.select = 4;
			page.appendChild(sidebar);

			cframe.appendChild(page);

			if (hasRouted) {
				page.focus();
			}

			return;
		}
	}

	// --
	// 404
	// --

	{
		cframe.innerHTML = '';

		breadcrumb.items = [
			{ text: 'Home', link: '#home' },
			{ text: '404', link: '#home' }
		];
		cframe.appendChild(breadcrumb);

		page = document.createElement('sample-page');
		page.setAttribute('id', 'content');
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

		sidebar.select = 0;
		page.appendChild(sidebar);

		cframe.appendChild(page);

		if (hasRouted) {
			page.focus();
		}
	}
});
