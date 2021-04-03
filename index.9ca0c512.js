!function(){const e=document.querySelector("#username-input"),t=document.querySelector("#submit-button"),n=()=>{const{value:t}=e;null!=t&&""!==t?window.location.href=`/sheet.html?u=${t}`:alert("Please enter a username")};t.addEventListener("click",n),e.addEventListener("keypress",(e=>{"Enter"===e.key&&n()}))}();
//# sourceMappingURL=index.9ca0c512.js.map
