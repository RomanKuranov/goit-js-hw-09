const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),o=document.querySelector("body");let r=null;t.addEventListener("click",(e=>{r=setInterval((()=>{o.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3),t.toggleAttribute("disabled")})),e.addEventListener("click",(e=>{clearInterval(r),t.removeAttribute("disabled")}));
//# sourceMappingURL=01-color-switcher.e01a07ed.js.map
