import md from "@libh/md"

export default $ => {
	const accent = at => at`
		*color=#3D72D7;
	`;

	const randomPhrase = [
		'Finally, React without Hooks',
		'#NoMoreUseState()',
		'So Long, HTML Classes!',
	][Math.floor(Math.random() * 5)];

	const LibhToken = $ => h => h`
		<span>lib<span *color=#3d72D7;>h</span></span>
	`;

	const { std: { ptr } } = $;

	const todoInput = ptr("", true);

	return html => html`
		<div>
			<h1 *background=transition(0);>
				lib<span ${accent}>h</span>
			</h1>

			The <span ${accent}>"${randomPhrase}"</span> JavaScript

			<hr/>

			<div ${md}>
				## introduction
				lib<span ${accent}>h</span> gives you access to AJAX, CSS Transitions, WebSockets and Server Sent Events directly in HTML, using attributes, so you can build modern user interfaces with the simplicity and power of hypertext/
				lib<span ${accent}>h</span> is small (~3k min.gz'd), dependency-free, extendable, IE11 compatible & has reduced code base sizes by 67% when compared with react
			</div>
		</div>
	`;
};