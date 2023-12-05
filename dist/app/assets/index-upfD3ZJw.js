(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const i of e.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function r(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function s(t){if(t.ep)return;t.ep=!0;const e=r(t);fetch(t.href,e)}})();const p="modulepreload",m=function(n){return"/"+n},d={},g=function(o,r,s){if(!r||r.length===0)return o();const t=document.getElementsByTagName("link");return Promise.all(r.map(e=>{if(e=m(e),e in d)return;d[e]=!0;const i=e.endsWith(".css"),h=i?'[rel="stylesheet"]':"";if(!!s)for(let u=t.length-1;u>=0;u--){const a=t[u];if(a.href===e&&(!i||a.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${e}"]${h}`))return;const l=document.createElement("link");if(l.rel=i?"stylesheet":p,i||(l.as="script",l.crossOrigin=""),l.href=e,document.head.appendChild(l),i)return new Promise((u,a)=>{l.addEventListener("load",u),l.addEventListener("error",()=>a(new Error(`Unable to preload CSS for ${e}`)))})})).then(()=>o()).catch(e=>{const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=e,window.dispatchEvent(i),!i.defaultPrevented)throw e})},c={};function _(n,o){let r;return()=>{clearTimeout(r),r=setTimeout(n,o)}}const y=_(c.performReactRefresh,16);function R(n,o){for(const r in o){if(r==="__esModule")continue;const s=o[r];c.isLikelyComponentType(s)&&c.register(s,n+" export "+r)}}function w(n,o){if(!f(n,t=>t in o))return"Could not Fast Refresh (export removed)";if(!f(o,t=>t in n))return"Could not Fast Refresh (new export)";let r=!1;const s=f(o,(t,e)=>(r=!0,c.isLikelyComponentType(e)?!0:n[t]===o[t]));if(r&&s)y();else return"Could not Fast Refresh. Learn more at https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react#consistent-components-exports"}function f(n,o){for(const r in n){if(r==="__esModule")continue;const s=Object.getOwnPropertyDescriptor(n,r);if(s&&s.get||!o(r,n[r]))return!1}return!0}function v(n){return g(()=>import(n),__vite__mapDeps([]))}c.__hmr_import=v;c.registerExportsForReactRefresh=R;c.validateRefreshBoundaryAndEnqueueUpdate=w;c.injectIntoGlobalHook(window);window.$RefreshReg$=()=>{};window.$RefreshSig$=()=>n=>n;window.__vite_plugin_react_preamble_installed__=!0;
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}