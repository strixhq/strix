(()=>{var i=t=>typeof t;var{Promise:s,Proxy:a,WeakMap:T,Uint8Array:p,requestAnimationFrame:l,cancelAnimationFrame:m,BigInt:L}=window,g=`strix${L(crypto.getRandomValues(new p(16)).join("")).toString(36)}`,w=new T;var M=new a(({raw:t},...e)=>new a(new s(n=>{}),{}),{}),u={function(t){let e=t(M)},object(t){}},H=t=>(u[i(t)]?.(t),[()=>{}]);var F=(t,e,n,o)=>{let c=-1,r=()=>{c=n(r),t()};return r(),[()=>o(c)]},S=(t,e)=>{let[n]=H(e),[o]=F(n,t,l,m);return{close(){o(),this.close=()=>{}}}};})();