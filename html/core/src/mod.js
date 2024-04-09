const htmlStrTempCache = new WeakMap();
const anchorStrTempCache = new WeakMap();

const h = (htmlTempStrings, ...htmlTempValues) => {
	const prebuiltTemp = htmlStrTempCache.get(htmlTempStrings);
	if(!prebuiltTemp) {
		htmlStrTempCache.set(htmlTempStrings, {

		})
	}
}

function createLHAnchor() {
	let writeMode = "frame";
	return [
		{},

	]
}

function createLHInstance(templateFn, attributes) {
	
}

class LHInstance {
	constructor(templateFn, attributes) {
		templateFn(createLHAnchor()[0])
	}
}

class LHTemplate {
	constructor() {

	}
}

class LHSelector {
	constructor() {

	}
}

const templateConstructor = globalThis.document.createElement("div");

const initTag = `strix${btoa(
	String.fromCharCode.apply(
		null,
		crypto.getRandomValues(new Uint8Array(64)),
	)
).replace(/[\/=]/g, '')} `;

const localSelector = (selectorTemplates, ...selectorValues) => {
	if(
		typeof selectorTemplates !== "array" &&
		typeof selectorTemplates === "function"
	) {

	}
	return new Proxy({}, {
		get(t, props) {
			switch(props) {
				case "onload": {
					return 
				}
			}
		},
		set(t, props, value) {
			switch(props) {
				case "onload": {
					return value instanceof Function
						? () => {
							
						}
						: undefined;
				}
			}
		}
	});
}

const $ = new Proxy(localSelector, {
	get(t, p) {

	}
});

const html = (htmlTemplates, ...htmlValues) => {
	if(!templateCache.has(htmlTemplates)) {
		const joinedHTMLTemplates = htmlTemplates.join(initTag);
		templateConstructor.innerHTML = joinedHTMLTemplates;
		// instanceBuffer.htmlTempMap.set(joinedHTMLTemplates, );
	}

	const joinedString = htmlTemplates.join(""),
		encodedHTMLTemp = templateCache.get(joinedString);

	if(encodedHTMLTemp === undefined) {
		// initialization start
		htmlValues.forEach(valueIndex => {
			switch(true) {
				case valueIndex instanceof Function: {
					
				}
			}
		})
		instanceBuffer.htmlTempMap.set(joinedString);
	}

}

html.class = function(templateFn) {

}

html.map = function(constructorFn) {
	
};

html.selector = function() {

};

html.use = function(anchor) {

};

class LHInstance {
	constructor(templateFn, attributes) {
		templateFn(createLHAnchor()[0])
	}
}

Object.freeze(html);

const write = (targetSelectors) => {
	for(const targetSelectorIndex in targetSelectors) {
		globalThis.document.querySelector(targetSelectorIndex)
	}
}

export { write };

export class LitClock extends HTMLElement {

	get date() { return this._date; }
	set date(v) { this._date = v; this.invalidate(); }
  
	constructor() {
	  super();
	  this.attachShadow({mode: 'open'});
	  setInterval(() => {
		this.date = new Date();
	  }, 1000);
	}
  
	render() {
	  return html`
		<style>
		  :host {
			display: block;
		  }
		  
		  .clock-face {
			stroke: #333;
			fill: white;
		  }
		  
		  .minor {
			stroke: #999;
			stroke-width: 0.5;
		  }
		  
		  .major {
			stroke: #333;
		  }
		  
		  .hour {
			stroke: #333;
		  }
		  
		  .minute {
			stroke: #666;
		  }
		  
		  .second, .second-counterweight {
			stroke: rgb(180,0,0);
		  }
		  
		  .second-counterweight {
			stroke-width: 3;
		  }
		</style>        
		<svg viewBox='0 0 100 100'>
		  <g transform='translate(50,50)'>
			<circle class='clock-face' r='48'/>
			${minuteTicks}
			${hourTicks}
  
			<line class='hour' y1='2' y2='-20'
			  transform='rotate(${ 30 * this.date.getHours() + this.date.getMinutes() / 2 })'/>
  
			<line class='minute' y1='4' y2='-30'
			  transform='rotate(${ 6 * this.date.getMinutes() + this.date.getSeconds() / 10 })'/>
  
			<g transform='rotate(${ 6 * this.date.getSeconds() })'>
			  <line class='second' y1='10' y2='-38'/>
			  <line class='second-counterweight' y1='10' y2='2'/>
			</g>
		  </g>
		</svg>
	  `;
	}
  
	async invalidate() {
	  if (!this.needsRender) {
		this.needsRender = true;      
		this.needsRender = await false;
		render(this.render(), this.shadowRoot);
	  }
	}
  }
  customElements.define('lit-clock', LitClock);
  
  const minuteTicks = range(0, 60).map((i) => 
	svg`<line class='minor' y1='42' y2='45' transform='rotate(${360 * i / 60})'/>`);
  
  const hourTicks = range(0, 12).map((i) => 
	svg`<line class='major' y1='32' y2='45' transform='rotate(${360 * i / 12})'/>`);


const StrixClock = () => {
	let dateBuffer = Date();

	const classes = {
		hour: () => at => at`
			y12;
			y2=-20;
			transform=rotate(${ 30 * this.date.getHours() + this.date.getMinutes() / 2 });
		`,
		minute: () => at => at`
			y1=4;
			y2=-30;
			transform=rotate(${ 6 * this.date.getMinutes() + this.date.getSeconds() / 10 });
		`,
		second: () => at => at`
			y1=10;
			y2=-38;
			*stroke=rgb(180, 0, 0);
		`
	}

	return () => html`
		<svg viewBox='0 0 100 100'>
			<g transform='translate(50,50)'>
				<circle class='clock-face' r='48'/>
				<${minuteTicks} />
				<${hourTicks} />
	
				<line ${classes.hour}/>
				<line ${classes.minute}/>
				<g transform='rotate(${ 6 * this.date.getSeconds() })'>
					<line ${classes.second}/>
					<line class='second-counterweight' y1='10' y2='2'/>
				</g>
			</g>
		</svg>
	`
}