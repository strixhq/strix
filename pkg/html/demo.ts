import { h as html, map } from './mod';

const Todo = () => {
	const todoList = map();
	return () => html`
		<ul>${todoList}</ul>
		<input @@keydown{code:Enter}=${({ target: { value } }) => todoList.push(el => html`
			<li .map-swap-transition=${100} ease-in ease-out;>
				<label>${value}</label>
				<button @click=${() => el.swapAbove()}></button>
				<button @click=${() => el.swapBelow()}></button>
			</li>
		`)};/>
	`;
}

const App = () => {
	return () => html`
		<div>
	`
}