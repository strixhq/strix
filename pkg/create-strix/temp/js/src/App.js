import { h as html, $, on } from "../node_modules/lib_strix/std/mod.js";

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

