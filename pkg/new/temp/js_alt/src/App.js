import { $, at, h as html, on } from '@strix/std';
import { card, logo, readTheDocs } from './Style.js';

function App() {
	const count = $(0);

	return html`
    <div>
      <a ${{ [at]: { href: 'https://vite.dev', target: '_blank', class: '' } }}>
        <img ${{ [at]: { src: viteLogo, alt: 'Vite logo' }, logo }} />
      </a>
      <a ${{ [at]: { href: 'https://strix.sh', target: '_blank' } }}>
        <img ${{ [at]: { src: strixLogo, alt: 'Strix logo' }, logo }} />
      </a>
    </div>
    <h1>Vite + Strix</h1>
    <div ${{ card }}>
      <button ${{ [on.click]: () => $[count]++ }}>
        count is ${count}
      </button>
      <p>
        Edit <code>src/App.js</code> and save to test HMR
      </p>
    </div>
    <p ${{ readTheDocs }}>
      Click on the Vite and Strix logos to learn more
    </p>
  `;
}

export default App;
