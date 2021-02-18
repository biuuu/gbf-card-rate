var app=function(){"use strict";function t(){}const e=t=>t;function n(t,e){for(const n in e)t[n]=e[n];return t}function r(t){return t()}function s(){return Object.create(null)}function o(t){t.forEach(r)}function i(t){return"function"==typeof t}function l(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function c(e,n,r){e.$$.on_destroy.push(function(e,...n){if(null==e)return t;const r=e.subscribe(...n);return r.unsubscribe?()=>r.unsubscribe():r}(n,r))}function a(t,e,n=e){return t.set(n),e}const u="undefined"!=typeof window;let f=u?()=>window.performance.now():()=>Date.now(),d=u?t=>requestAnimationFrame(t):t;const h=new Set;function p(t){h.forEach((e=>{e.c(t)||(h.delete(e),e.f())})),0!==h.size&&d(p)}function g(t){let e;return 0===h.size&&d(p),{promise:new Promise((n=>{h.add(e={c:t,f:n})})),abort(){h.delete(e)}}}function m(t,e){t.appendChild(e)}function v(t,e,n){t.insertBefore(e,n||null)}function b(t){t.parentNode.removeChild(t)}function y(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function x(t){return document.createElement(t)}function $(t){return document.createTextNode(t)}function w(){return $(" ")}function _(t,e,n,r){return t.addEventListener(e,n,r),()=>t.removeEventListener(e,n,r)}function k(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function j(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function E(t,e,n,r){t.style.setProperty(e,n,r?"important":"")}const C=new Set;let A,S=0;function z(t,e,n,r,s,o,i,l=0){const c=16.666/r;let a="{\n";for(let t=0;t<=1;t+=c){const r=e+(n-e)*o(t);a+=100*t+`%{${i(r,1-r)}}\n`}const u=a+`100% {${i(n,1-n)}}\n}`,f=`__svelte_${function(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}(u)}_${l}`,d=t.ownerDocument;C.add(d);const h=d.__svelte_stylesheet||(d.__svelte_stylesheet=d.head.appendChild(x("style")).sheet),p=d.__svelte_rules||(d.__svelte_rules={});p[f]||(p[f]=!0,h.insertRule(`@keyframes ${f} ${u}`,h.cssRules.length));const g=t.style.animation||"";return t.style.animation=`${g?`${g}, `:""}${f} ${r}ms linear ${s}ms 1 both`,S+=1,f}function O(t,e){const n=(t.style.animation||"").split(", "),r=n.filter(e?t=>t.indexOf(e)<0:t=>-1===t.indexOf("__svelte")),s=n.length-r.length;s&&(t.style.animation=r.join(", "),S-=s,S||d((()=>{S||(C.forEach((t=>{const e=t.__svelte_stylesheet;let n=e.cssRules.length;for(;n--;)e.deleteRule(n);t.__svelte_rules={}})),C.clear())})))}function P(t){A=t}function q(t){(function(){if(!A)throw new Error("Function called outside component initialization");return A})().$$.after_update.push(t)}const M=[],T=[],R=[],B=[],D=Promise.resolve();let F=!1;function N(t){R.push(t)}let L=!1;const Y=new Set;function H(){if(!L){L=!0;do{for(let t=0;t<M.length;t+=1){const e=M[t];P(e),I(e.$$)}for(P(null),M.length=0;T.length;)T.pop()();for(let t=0;t<R.length;t+=1){const e=R[t];Y.has(e)||(Y.add(e),e())}R.length=0}while(M.length);for(;B.length;)B.pop()();F=!1,L=!1,Y.clear()}}function I(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(N)}}let W;function X(){return W||(W=Promise.resolve(),W.then((()=>{W=null}))),W}function G(t,e,n){t.dispatchEvent(function(t,e){const n=document.createEvent("CustomEvent");return n.initCustomEvent(t,!1,!1,e),n}(`${e?"intro":"outro"}${n}`))}const J=new Set;let K;function Q(){K={r:0,c:[],p:K}}function U(){K.r||o(K.c),K=K.p}function V(t,e){t&&t.i&&(J.delete(t),t.i(e))}function Z(t,e,n,r){if(t&&t.o){if(J.has(t))return;J.add(t),K.c.push((()=>{J.delete(t),r&&(n&&t.d(1),r())})),t.o(e)}}const tt={duration:0};function et(t,e,n){const{fragment:s,on_mount:l,on_destroy:c,after_update:a}=t.$$;s&&s.m(e,n),N((()=>{const e=l.map(r).filter(i);c?c.push(...e):o(e),t.$$.on_mount=[]})),a.forEach(N)}function nt(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function rt(t,e){-1===t.$$.dirty[0]&&(M.push(t),F||(F=!0,D.then(H)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function st(e,n,r,i,l,c,a=[-1]){const u=A;P(e);const f=n.props||{},d=e.$$={fragment:null,ctx:null,props:c,update:t,not_equal:l,bound:s(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(u?u.$$.context:[]),callbacks:s(),dirty:a,skip_bound:!1};let h=!1;if(d.ctx=r?r(e,f,((t,n,...r)=>{const s=r.length?r[0]:n;return d.ctx&&l(d.ctx[t],d.ctx[t]=s)&&(!d.skip_bound&&d.bound[t]&&d.bound[t](s),h&&rt(e,t)),n})):[],d.update(),h=!0,o(d.before_update),d.fragment=!!i&&i(d.ctx),n.target){if(n.hydrate){const t=function(t){return Array.from(t.childNodes)}(n.target);d.fragment&&d.fragment.l(t),t.forEach(b)}else d.fragment&&d.fragment.c();n.intro&&V(e.$$.fragment),et(e,n.target,n.anchor),H()}P(u)}class ot{$destroy(){nt(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function it(t){const e=t-1;return e*e*e+1}function lt(t,{delay:n=0,duration:r=400,easing:s=e}){const o=+getComputedStyle(t).opacity;return{delay:n,duration:r,easing:s,css:t=>"opacity: "+t*o}}const ct=t=>{const e=new Image;return e.src=t,new Promise(((t,n)=>{e.onload=t,e.onerror=n}))};function at(t,e){void 0===e&&(e={});var n=e.insertAt;if(t&&"undefined"!=typeof document){var r=document.head||document.getElementsByTagName("head")[0],s=document.createElement("style");s.type="text/css","top"===n&&r.firstChild?r.insertBefore(s,r.firstChild):r.appendChild(s),s.styleSheet?s.styleSheet.cssText=t:s.appendChild(document.createTextNode(t))}}function ut(n){let r,s,l;return{c(){r=x("div"),k(r,"class","mask svelte-1qj876k"),E(r,"background-color",n[3])},m(t,e){v(t,r,e),l=!0},p(t,e){(!l||8&e)&&E(r,"background-color",t[3])},i(t){l||(s&&s.end(1),l=!0)},o(n){s=function(n,r,s){let l,c=r(n,s),a=!0;const u=K;function d(){const{delay:r=0,duration:s=300,easing:i=e,tick:d=t,css:h}=c||tt;h&&(l=z(n,1,0,s,r,i,h));const p=f()+r,m=p+s;N((()=>G(n,!1,"start"))),g((t=>{if(a){if(t>=m)return d(0,1),G(n,!1,"end"),--u.r||o(u.c),!1;if(t>=p){const e=i((t-p)/s);d(1-e,e)}}return a}))}return u.r+=1,i(c)?X().then((()=>{c=c(),d()})):d(),{end(t){t&&c.tick&&c.tick(1,0),a&&(l&&O(n,l),a=!1)}}}(r,lt,{}),l=!1},d(t){t&&b(r),t&&s&&s.end()}}}function ft(n){let r,s,o;return{c(){r=x("div"),k(r,"class","pic svelte-1qj876k"),k(r,"style",s=n[0]?`background-image: url(${n[0]})`:"")},m(t,e){v(t,r,e)},p(t,e){1&e&&s!==(s=t[0]?`background-image: url(${t[0]})`:"")&&k(r,"style",s)},i(n){o||N((()=>{o=function(n,r,s){let o,l,c=r(n,s),a=!1,u=0;function d(){o&&O(n,o)}function h(){const{delay:r=0,duration:s=300,easing:i=e,tick:h=t,css:p}=c||tt;p&&(o=z(n,0,1,s,r,i,p,u++)),h(0,1);const m=f()+r,v=m+s;l&&l.abort(),a=!0,N((()=>G(n,!0,"start"))),l=g((t=>{if(a){if(t>=v)return h(1,0),G(n,!0,"end"),d(),a=!1;if(t>=m){const e=i((t-m)/s);h(e,1-e)}}return a}))}let p=!1;return{start(){p||(O(n),i(c)?(c=c(),X().then(h)):h())},invalidate(){p=!1},end(){a&&(d(),a=!1)}}}(r,lt,{}),o.start()}))},o:t,d(t){t&&b(r)}}}function dt(t){let e,n,r,s;const o=[ft,ut],i=[];function l(t,e){return t[2]?0:1}return n=l(t),r=i[n]=o[n](t),{c(){e=x("div"),r.c(),k(e,"class","card svelte-1qj876k"),k(e,"title",t[1])},m(t,r){v(t,e,r),i[n].m(e,null),s=!0},p(t,[c]){let a=n;n=l(t),n===a?i[n].p(t,c):(Q(),Z(i[a],1,1,(()=>{i[a]=null})),U(),r=i[n],r?r.p(t,c):(r=i[n]=o[n](t),r.c()),V(r,1),r.m(e,null)),(!s||2&c)&&k(e,"title",t[1])},i(t){s||(V(r),s=!0)},o(t){Z(r),s=!1},d(t){t&&b(e),i[n].d()}}}function ht(t,e,n){let{src:r=""}=e,{type:s="r"}=e,{title:o=""}=e,i=!1,l="init";const c={r:"#b87563",sr:"#e9e9e9",ssr:"#FFC107"};let a;return q((async()=>{if(r&&l!==r){n(2,i=!1);let t=r;try{await ct(r),t===r&&(l=r,n(2,i=!0))}catch(t){}}})),t.$$set=t=>{"src"in t&&n(0,r=t.src),"type"in t&&n(4,s=t.type),"title"in t&&n(1,o=t.title)},t.$$.update=()=>{16&t.$$.dirty&&n(3,a=c[s])},[r,o,i,a,s]}at(".card.svelte-1qj876k{width:100px;height:58px;margin:0 2px;position:relative;overflow:hidden}.mask.svelte-1qj876k{position:absolute;left:0;top:0;width:100%;height:100%}.pic.svelte-1qj876k{height:100%;background-size:contain;background-position:center center;background-repeat:no-repeat}");class pt extends ot{constructor(t){super(),st(this,t,ht,dt,l,{src:0,type:4,title:1})}}const gt=[];function mt(e,n=t){let r;const s=[];function o(t){if(l(e,t)&&(e=t,r)){const t=!gt.length;for(let t=0;t<s.length;t+=1){const n=s[t];n[1](),gt.push(n,e)}if(t){for(let t=0;t<gt.length;t+=2)gt[t][0](gt[t+1]);gt.length=0}}}return{set:o,update:function(t){o(t(e))},subscribe:function(i,l=t){const c=[i,l];return s.push(c),1===s.length&&(r=n(o)||t),i(e),()=>{const t=s.indexOf(c);-1!==t&&s.splice(t,1),0===s.length&&(r(),r=null)}}}}function vt(t){return"[object Date]"===Object.prototype.toString.call(t)}function bt(t,e,n,r){if("number"==typeof n||vt(n)){const s=r-n,o=(n-e)/(t.dt||1/60),i=(o+(t.opts.stiffness*s-t.opts.damping*o)*t.inv_mass)*t.dt;return Math.abs(i)<t.opts.precision&&Math.abs(s)<t.opts.precision?r:(t.settled=!1,vt(n)?new Date(n.getTime()+i):n+i)}if(Array.isArray(n))return n.map(((s,o)=>bt(t,e[o],n[o],r[o])));if("object"==typeof n){const s={};for(const o in n)s[o]=bt(t,e[o],n[o],r[o]);return s}throw new Error(`Cannot spring ${typeof n} values`)}function yt(t,e={}){const n=mt(t),{stiffness:r=.15,damping:s=.8,precision:o=.01}=e;let i,l,c,a=t,u=t,d=1,h=0,p=!1;function m(e,r={}){u=e;const s=c={};if(null==t||r.hard||v.stiffness>=1&&v.damping>=1)return p=!0,i=f(),a=e,n.set(t=u),Promise.resolve();if(r.soft){const t=!0===r.soft?.5:+r.soft;h=1/(60*t),d=0}return l||(i=f(),p=!1,l=g((e=>{if(p)return p=!1,l=null,!1;d=Math.min(d+h,1);const r={inv_mass:d,opts:v,settled:!0,dt:60*(e-i)/1e3},s=bt(r,a,t,u);return i=e,a=t,n.set(t=s),r.settled&&(l=null),!r.settled}))),new Promise((t=>{l.promise.then((()=>{s===c&&t()}))}))}const v={set:m,update:(e,n)=>m(e(u,t),n),subscribe:n.subscribe,stiffness:r,damping:s,precision:o};return v}function xt(t,e){if(t===e||t!=t)return()=>t;const n=typeof t;if(n!==typeof e||Array.isArray(t)!==Array.isArray(e))throw new Error("Cannot interpolate values of different type");if(Array.isArray(t)){const n=e.map(((e,n)=>xt(t[n],e)));return t=>n.map((e=>e(t)))}if("object"===n){if(!t||!e)throw new Error("Object cannot be null");if(vt(t)&&vt(e)){t=t.getTime();const n=(e=e.getTime())-t;return e=>new Date(t+e*n)}const n=Object.keys(e),r={};return n.forEach((n=>{r[n]=xt(t[n],e[n])})),t=>{const e={};return n.forEach((n=>{e[n]=r[n](t)})),e}}if("number"===n){const n=e-t;return e=>t+e*n}throw new Error(`Cannot interpolate ${n} values`)}function $t(t,e,n){const r=t.slice();return r[27]=e[n],r}function wt(t,e,n){const r=t.slice();return r[30]=e[n],r}function _t(t){let e,n;return e=new pt({props:{src:t[30].url,type:t[30].type,title:t[30].name}}),{c(){var t;(t=e.$$.fragment)&&t.c()},m(t,r){et(e,t,r),n=!0},p(t,n){const r={};1&n[0]&&(r.src=t[30].url),1&n[0]&&(r.type=t[30].type),1&n[0]&&(r.title=t[30].name),e.$set(r)},i(t){n||(V(e.$$.fragment,t),n=!0)},o(t){Z(e.$$.fragment,t),n=!1},d(t){nt(e,t)}}}function kt(t){let e,n,r,s=t[27],o=[];for(let e=0;e<s.length;e+=1)o[e]=_t(wt(t,s,e));const i=t=>Z(o[t],1,1,(()=>{o[t]=null}));return{c(){e=x("div");for(let t=0;t<o.length;t+=1)o[t].c();n=w(),k(e,"class","row svelte-1h3gsn3")},m(t,s){v(t,e,s);for(let t=0;t<o.length;t+=1)o[t].m(e,null);m(e,n),r=!0},p(t,r){if(1&r[0]){let l;for(s=t[27],l=0;l<s.length;l+=1){const i=wt(t,s,l);o[l]?(o[l].p(i,r),V(o[l],1)):(o[l]=_t(i),o[l].c(),V(o[l],1),o[l].m(e,n))}for(Q(),l=s.length;l<o.length;l+=1)i(l);U()}},i(t){if(!r){for(let t=0;t<s.length;t+=1)V(o[t]);r=!0}},o(t){o=o.filter(Boolean);for(let t=0;t<o.length;t+=1)Z(o[t]);r=!1},d(t){t&&b(e),y(o,t)}}}function jt(t){let e,n,r,s,i,l,c,a,u,f,d,h,p,g,C,A,S,z,O,P,q,M,T,R,B,D,F,N,L,Y,H=t[0],I=[];for(let e=0;e<H.length;e+=1)I[e]=kt($t(t,H,e));const W=t=>Z(I[t],1,1,(()=>{I[t]=null}));return{c(){e=x("div"),n=x("div"),r=w(),s=x("div"),i=x("div"),l=x("div");for(let t=0;t<I.length;t+=1)I[t].c();c=w(),a=x("div"),u=x("div"),u.textContent="再抽一次",f=w(),d=x("div"),h=x("div"),p=x("span"),p.textContent="SSR：",g=$(t[5]),C=w(),A=x("div"),S=x("span"),S.textContent="SR：",z=$(t[4]),O=w(),P=x("div"),q=x("span"),q.textContent="R：",M=$(t[3]),T=w(),R=x("div"),B=x("span"),B.textContent="一共：",D=$(t[2]),F=$(" 抽"),k(n,"class","pic svelte-1h3gsn3"),E(n,"background-image","url("+t[1]+")"),E(n,"transform","scale(1.2) translate("+t[6].x+"px, "+t[6].y+"px)"),k(e,"class","bg svelte-1h3gsn3"),k(l,"class","content svelte-1h3gsn3"),k(u,"id","gacha"),k(u,"class","btn svelte-1h3gsn3"),k(h,"class","label svelte-1h3gsn3"),k(A,"class","label svelte-1h3gsn3"),k(P,"class","label svelte-1h3gsn3"),k(R,"class","label svelte-1h3gsn3"),k(d,"id","count"),k(d,"class","svelte-1h3gsn3"),k(a,"class","footer svelte-1h3gsn3"),k(i,"class","stage svelte-1h3gsn3"),k(s,"class","starlight svelte-1h3gsn3")},m(o,b){v(o,e,b),m(e,n),v(o,r,b),v(o,s,b),m(s,i),m(i,l);for(let t=0;t<I.length;t+=1)I[t].m(l,null);m(i,c),m(i,a),m(a,u),m(a,f),m(a,d),m(d,h),m(h,p),m(h,g),m(d,C),m(d,A),m(A,S),m(A,z),m(d,O),m(d,P),m(P,q),m(P,M),m(d,T),m(d,R),m(R,B),m(R,D),m(R,F),N=!0,L||(Y=[_(u,"click",t[12]),_(s,"mousemove",t[13])],L=!0)},p(t,e){if((!N||2&e[0])&&E(n,"background-image","url("+t[1]+")"),(!N||64&e[0])&&E(n,"transform","scale(1.2) translate("+t[6].x+"px, "+t[6].y+"px)"),1&e[0]){let n;for(H=t[0],n=0;n<H.length;n+=1){const r=$t(t,H,n);I[n]?(I[n].p(r,e),V(I[n],1)):(I[n]=kt(r),I[n].c(),V(I[n],1),I[n].m(l,null))}for(Q(),n=H.length;n<I.length;n+=1)W(n);U()}(!N||32&e[0])&&j(g,t[5]),(!N||16&e[0])&&j(z,t[4]),(!N||8&e[0])&&j(M,t[3]),(!N||4&e[0])&&j(D,t[2])},i(t){if(!N){for(let t=0;t<H.length;t+=1)V(I[t]);N=!0}},o(t){I=I.filter(Boolean);for(let t=0;t<I.length;t+=1)Z(I[t]);N=!1},d(t){t&&b(e),t&&b(r),t&&b(s),y(I,t),L=!1,o(Y)}}}at(".bg.svelte-1h3gsn3.svelte-1h3gsn3{height:100vh;overflow:hidden}.bg.svelte-1h3gsn3>.pic.svelte-1h3gsn3{background:#acd5cd url(https://gacha.danmu9.com/image/char/3040311000_02.png) center center no-repeat;background-size:cover;filter:blur(8px);height:100%;transform:scale(1.2) translate(0, 0)}.starlight.svelte-1h3gsn3.svelte-1h3gsn3{width:100%;height:100%;display:flex;align-items:center;justify-content:center;position:absolute;left:0;top:0;background-color:rgb(172 172 172 / 16%)}.stage.svelte-1h3gsn3.svelte-1h3gsn3{background:url(https://gacha.danmu9.com/image/gacha_result_bg.jpg) 50% 25% no-repeat;background-size:485px;width:100%;height:300px;width:480px;display:flex;flex-direction:column;justify-content:center;border:4px solid #fff;box-shadow:0 0 8px rgb(0 0 0 / 20%)}.row.svelte-1h3gsn3.svelte-1h3gsn3{display:flex;justify-content:center;margin:0 0 10px 0;height:58px}.content.svelte-1h3gsn3.svelte-1h3gsn3{height:194px;margin-top:14px}.footer.svelte-1h3gsn3.svelte-1h3gsn3{position:relative;display:flex;justify-content:center;align-items:center;margin:8px auto;width:480px;flex-direction:column}.btn.svelte-1h3gsn3.svelte-1h3gsn3{background:url(img/d433ce8b.png) no-repeat center center;background-size:contain;width:141px;height:36px;display:inline-block;padding-top:10px;box-sizing:border-box;color:#f2eee2;text-shadow:0 0 1px #532d0d, 0 0 1px #532d0d, 0 0 1px #532d0d, 0 0 1px #532d0d, 0 0 2px #532d0d, 0 0 2px #532d0d, 0 0 2px #532d0d, 0 0 2px #532d0d;font-size:12px;text-align:center;text-decoration:none;line-height:1;cursor:pointer}.btn.svelte-1h3gsn3.svelte-1h3gsn3:active{transform:scale(0.95, 0.95) translateY(2px)}#count.svelte-1h3gsn3.svelte-1h3gsn3{display:flex;margin-top:6px}.label.svelte-1h3gsn3.svelte-1h3gsn3{color:#fff;padding:4px 6px;margin:0 2px;border-radius:4px;line-height:1;font-size:12px;text-align:center;min-width:60px}#count.svelte-1h3gsn3 .label.svelte-1h3gsn3:nth-child(1){background:#f7a62d}#count.svelte-1h3gsn3 .label.svelte-1h3gsn3:nth-child(2){background:#9e9e9e}#count.svelte-1h3gsn3 .label.svelte-1h3gsn3:nth-child(3){background:#b87563}#count.svelte-1h3gsn3 .label.svelte-1h3gsn3:nth-child(4){background:#25699a;min-width:85px}");const Et="https://gacha.danmu9.com";function Ct(t,r,s){let o,i,l,u,d;const h=()=>function(t,r={}){const s=mt(t);let o,i=t;function l(l,c){if(null==t)return s.set(t=l),Promise.resolve();i=l;let a=o,u=!1,{delay:d=0,duration:h=400,easing:p=e,interpolate:m=xt}=n(n({},r),c);if(0===h)return a&&(a.abort(),a=null),s.set(t=i),Promise.resolve();const v=f()+d;let b;return o=g((e=>{if(e<v)return!0;u||(b=m(t,l),"function"==typeof h&&(h=h(t,l)),u=!0),a&&(a.abort(),a=null);const n=e-v;return n>h?(s.set(t=l),!1):(s.set(t=b(p(n/h))),!0)})),o.promise}return{set:l,update:(e,n)=>l(e(i,t),n),subscribe:s.subscribe}}(0,{duration:400,easing:it,interpolate:(t,e)=>n=>Math.round(t+(e-t)*n)});let p=yt({x:0,y:0},{stiffness:.02,damping:.9});c(t,p,(t=>s(6,d=t)));let m=h();c(t,m,(t=>s(3,i=t)));let v=h();c(t,v,(t=>s(4,l=t)));let b=h();c(t,b,(t=>s(5,u=t)));let y=h();c(t,y,(t=>s(2,o=t)));let x={r:0,sr:0,ssr:0,total:0},$=null,w=null,_=[],k={},j=`${Et}/image/char/3040311000_02.png`;const E=["weapon","weapon","summon"],C={2:"r",3:"sr",4:"ssr"},A=async t=>{const e=await fetch(`${Et}/${t}.json`),n=await e.json(),r=[];return n.forEach((t=>{const e=E[t.category],n=C[t.rarity];t.item.forEach((t=>{r.push({id:t.reward_id,rate:parseFloat(t.drop_rate)/100,cat:e,type:n,name:t.name})}))})),r};(async()=>{const t=await fetch(`${Et}/w2c.json`),e=await t.json();k=e})();const S=t=>{let e=$;"sr"===t&&(e=w);let n=e.length,r=0;const s=Math.floor(Math.random()*n),o=Math.random();for(let t=s;t<n;t++)if(r+=e[t].rate,r>o)return e[t];for(let t=0;t<s;t++)if(r+=e[t].rate,r>o)return e[t];let i=s;return 0===s&&(i=n-1),e[i]},z=async()=>{$||($=await A("normal")),w||(w=await A("sr"));let t=(()=>{const t=[];for(let e=0;e<10;e++)9===e?t.push(S("sr")):t.push(S());return t})();(async t=>{let e="",n="";t.forEach((t=>{"ssr"===t.type&&("weapon"===t.cat&&k[t.id]?e=`${Et}/image/char/${k[t.id]}_02.png`:"summon"===t.cat&&(n=`${Et}/image/summon/${t.id}.png`))}));let r=e||n;r&&(await ct(r),s(1,j=r))})(t);let e=t.map((t=>(x[t.type]+=1,{url:`${Et}/image/card/${t.id}.jpg`,type:t.type,name:t.name})));s(0,_=[e.slice(0,3),e.slice(3,7),e.slice(7,10)]),x.total+=10,a(y,o=x.total,o),a(m,i=x.r,i),a(v,l=x.sr,l),a(b,u=x.ssr,u)},O=(t,e)=>t>e?e:t<-e?-e:t;return z(),[_,j,o,i,l,u,d,p,m,v,b,y,z,t=>{let e=70*-(t.clientX/window.innerWidth-.5),n=70*-(t.clientY/window.innerHeight-.5);e=O(e,70),n=O(n,70),p.set({x:e,y:n})}]}at("body {\n\tuser-select: none;\n\tmargin: 0;\n}");return new class extends ot{constructor(t){super(),st(this,t,Ct,jt,l,{},[-1,-1])}}({target:document.body})}();