const SomeReactComponent = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log('count changed');
    }, [count]);

    return (
        <div>
            <button onClick={() => setCount((count) => count + 1)}>
                私は{count}回クリックされました
            </button>
        </div>
    );
};

const cardToolBarItem = ({ $ }) => () => at`
	*color=#333
	*flex=1
	*padding=1rem
	*border=none
	*background-color=#fff
	*transition=background-color 0.2s ease-in-out;
	*cursor=pointer

	:hover {
		*background-color=rgb(218, 218, 218);
	};
`;

const Ours = () => {
    let count = 0;

    return () => html`
		<div>
			<button ${cardToolBarItem} @click=${() => count++};>
				私は${count}回クリックされました
			</button>
		</div>
	`;
};

const TodoApp = ({ $ }) => {
    const addTodo = () => {
        $`#todoList`.push(($$) => {
            const todo = $$.std.ptr($`#todoInput`.value, 'closed');

            return (html) =>
                html`
				<div>
					<label>${todo}</label>
					<button @click=${() => todo.switch()}>edit</button>
					<button @click=${() => $$.remove()}>delete</button>
					<button>
				</div>
			`;
        });
        $`#todoInput`.value = '';
    };

    return (html) =>
        html`
		<div>
			<div #todoList></div>
			<input
				#todoInput

				type=text;
				@@keydown.enter=${addTodo}
			/>
		</div>
	`;
};

const FallbackTest = () => {
	return () => html`
		<div ${fallback}=${html`<div></div>`}>
	`
}

const Todo = () => {

	const TodoRow = ({ todoContent }) => {
		let todoContentBuffer = todoContent;
		return () => html`
			<h1>${todoContentBuffer}</h1>
		`;
	}

	const todoArray = [];

	return () => html`
		<ul>${todoArray}</ul>
		<input type=text @@keydown.Enter=${({ target: { value } }) => {
			todoArray.push(html`<${TodoRow} .todoContent=${value}; />`)
		}} />
	`
}