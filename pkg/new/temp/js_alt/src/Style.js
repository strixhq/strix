import { $, css, sel } from "@strix/std";

const reactLogoDeg = $(0).to(360, 20000, { infinite: true })

export const react = $({
	[css]: {
		transform: $`rotate(${reactLogoDeg}deg)`
	}
});

export const logo = $({
	[css]: {
		height: "6em",
		padding: "1.5em",
		willChange: "filter",
		transition: "filter 300ms",
		[sel`:hover`]: {
			filter: "drop-shadow(0 0 2em #646cffaa)",
			[sel(react)]: {
				filter: "drop-shadow(0 0 2em #646cffaa)",
			}
		}
	}
});

export const card = $({
	[css]: {
		padding: "2em"
	}
});

export const readTheDocs = $({
	[css]: {
		color: "#888"
	}
})