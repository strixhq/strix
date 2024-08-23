import { h as html, $, on } from "@strix/std";

function App() {

  const count = $(0);

  return html`
    <h1>Welcome to Strix!</h1>
    <button ${{ [on.click]: () => $[count]++ }}>
      I got clicked ${count} times!
    </button><br/>
    <code>edit src/App.js to change preferences...</code>
  `;
}

export default App;

