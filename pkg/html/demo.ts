import { h, map } from './mod';

const Todo = () => {
	const todoList = map.new((el) => h`
		<li .map-swap-transition=${100} ease-in ease-out;>
			<label>${el.data}</label>
			<button @click=${() => el.swapAbove()}></button>
			<button @click=${() => el.swapBelow()}></button>
		</li>
	`);
	return () => h`
		<ul>${todoList}</ul>
		<input @@keydown.Enter=${({ target: { value } }) => todoList.push(value)};/>
	`;
}

const App = () => {
	return () => h`
		<div>
	`
}