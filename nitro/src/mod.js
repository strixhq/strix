export default ({ element: { tagName }, attr }) => {
	switch(tagName) {
		case "BUTTON": {
			return (themeName, a) => {
				return a`
					*background-color=${
						themeName === ('system' || null)
							? '#000'
							: themeName === 'dark'
								? '#fff'
								: '#000'
					}
					*color=
				`;
			}
		}
	}
}