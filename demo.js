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

const cardToolBarItem = ($) => (at) =>
    at`
	*color=#333;
	*flex=1;
	*padding=1rem;
	*border=none;
	*background-color=#fff;
	*transition=background-color 0.2s ease-in-out;
	*cursor=pointer;

	:hover {
		*background-color=rgb(218, 218, 218);
	};
`;

const Ours = () => {
    let count = 0;

    const addCount = () => count++;

    return (html) =>
        html`
		<div>
			<button ${cardToolBarItem} @click=${addCount};>
				私は${count}回クリックされました
			</button>
		</div>
	`;
};

const TodoApp = ($) => {
    const addTodo = () => {
        $`#todoList`.push(($$) => {
            const todo = $$.std.ptr($`#todoInput`.value, 'closed');

            return (html) =>
                html`
				<div>
					<label>${todo}</label>
					<button @click=${() => todo.switch()}>edit</button>
					<button @click=${() => $$.remove()}>delete</button>
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