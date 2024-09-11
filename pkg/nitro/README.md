# [@strix/nitro](https://strix.sh/nitro)

```javascript
import { h as html } from '@strix/std';
import { nitro } from '@strix/nitro';

const NitroButton = ({ theme }) =>
	html`
	<button ${{ nitro }}>
		I am themed by @strix/nitro!
	</button>
`;
```
