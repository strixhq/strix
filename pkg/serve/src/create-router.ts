const createRouter = ({ entry, base }: { entry: string; base: string }) => {
	const resolveEntry = new URL(entry, import.meta.url).pathname
}

createRouter({ entry: './app.ts', base: 'file' })
