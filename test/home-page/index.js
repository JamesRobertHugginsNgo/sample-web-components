import '../../index.js';

document.body.insertAdjacentHTML('beforeend', /* html */ `
	<template>
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/JamesRobertHugginsNgo/bootstrap@main/dist/css/bootstrap.min.css">

		<style>
			li {
				margin-bottom: 1rem;
			}
		</style>

		<sample-page title="Welcome to Our Home Page!">
			<p>Welcome to <em>[Your Company Name]</em>, where innovation meets excellence! We are dedicated to providing top-notch services/products that cater to your needs, whether you're a seasoned professional or a budding enthusiast. Here's a glimpse of what we offer:</p>

			<ol>
				<li><strong>Cutting-Edge Solutions:</strong> Explore our range of cutting-edge solutions designed to revolutionize your industry. From advanced software applications to state-of-the-art hardware, we've got you covered.</li>

				<li><strong>Exceptional Quality:</strong> Quality is our priority. We meticulously craft each product/service to ensure it meets the highest standards, delivering unparalleled performance and reliability.</li>

				<li><strong>Customer-Centric Approach:</strong> At <em>[Your Company Name]</em>, our customers are at the heart of everything we do. We strive to exceed your expectations by providing exceptional support and tailored solutions to meet your specific requirements.</li>

				<li><strong>Innovation Hub:</strong> Join us on a journey of innovation! Discover the latest trends, technologies, and insights in our innovation hub. Stay ahead of the curve with our thought-provoking articles, webinars, and events.</li>

				<li><strong>Community Engagement:</strong> We believe in giving back to the community. Learn more about our initiatives aimed at creating a positive impact on society and how you can get involved.</li>

				<li><strong>Collaborative Partnerships:</strong> Collaboration fuels innovation. Partner with us to unlock new opportunities and drive mutual growth. Together, we can achieve greatness.</li>

				<li><strong>Stay Connected:</strong> Don't miss out on the latest updates and announcements. Follow us on social media and subscribe to our newsletter to stay connected and informed.</li>
			</ol>

			<p>Explore our website to discover more about our offerings and how we can help you succeed. Thank you for choosing <em>[Your Company Name]</em>. We look forward to embarking on this journey with you!</p>

			<slot slot="sidebar"></slot>
		</sample-page>
	</template>
`);
const templateElement = document.body.lastElementChild;

customElements.define('home-page', class extends HTMLElement {
	#samplePageElement;

	constructor() {
		super();

		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(templateElement.content.cloneNode(true));

		this.#samplePageElement = this.shadowRoot.querySelector('sample-page');
	}

	focus() {
		this.#samplePageElement.focus();
	}
});
