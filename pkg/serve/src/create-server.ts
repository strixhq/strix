<<<<<<< HEAD
const createServer = (source: Promise<Function> | Function | string | URL) => {
}

createServer("./app.js");
=======
export const createServer = ({ entry }: { entry: string | URL }) => {
	return (request, env, event) => {
	}
}
>>>>>>> 8c106313e0ec35c03dcc4a1d445d19a8b4c1d6c2
