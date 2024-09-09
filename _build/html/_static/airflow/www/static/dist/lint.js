!function(t){"object"==typeof exports&&"object"==typeof module?t(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],t):t(CodeMirror)}((function(t){"use strict";var e="CodeMirror-lint-markers";function n(t){t.parentNode&&t.parentNode.removeChild(t)}function o(e,o,r,i){var a=function(e,n,o){var r=document.createElement("div");function i(e){if(!r.parentNode)return t.off(document,"mousemove",i);r.style.top=Math.max(0,e.clientY-r.offsetHeight-5)+"px",r.style.left=e.clientX+5+"px"}return r.className="CodeMirror-lint-tooltip cm-s-"+e.options.theme,r.appendChild(o.cloneNode(!0)),e.state.lint.options.selfContain?e.getWrapperElement().appendChild(r):document.body.appendChild(r),t.on(document,"mousemove",i),i(n),null!=r.style.opacity&&(r.style.opacity=1),r}(e,o,r);function s(){var e;t.off(i,"mouseout",s),a&&((e=a).parentNode&&(null==e.style.opacity&&n(e),e.style.opacity=0,setTimeout((function(){n(e)}),600)),a=null)}var l=setInterval((function(){if(a)for(var t=i;;t=t.parentNode){if(t&&11==t.nodeType&&(t=t.host),t==document.body)return;if(!t){s();break}}if(!a)return clearInterval(l)}),400);t.on(i,"mouseout",s)}function r(t,e,n){this.marked=[],this.options=e,this.timeout=null,this.hasGutter=n,this.onMouseOver=function(e){!function(t,e){var n=e.target||e.srcElement;if(!/\bCodeMirror-lint-mark-/.test(n.className))return;for(var r=n.getBoundingClientRect(),i=(r.left+r.right)/2,a=(r.top+r.bottom)/2,l=t.findMarksAt(t.coordsChar({left:i,top:a},"client")),u=[],c=0;c<l.length;++c){var f=l[c].__annotation;f&&u.push(f)}u.length&&function(t,e,n){for(var r=n.target||n.srcElement,i=document.createDocumentFragment(),a=0;a<e.length;a++){var l=e[a];i.appendChild(s(l))}o(t,n,i,r)}(t,u,e)}(t,e)},this.waitingFor=0}function i(t){var n=t.state.lint;n.hasGutter&&t.clearGutter(e);for(var o=0;o<n.marked.length;++o)n.marked[o].clear();n.marked.length=0}function a(e,n,r,i,a){var s=document.createElement("div"),l=s;return s.className="CodeMirror-lint-marker CodeMirror-lint-marker-"+r,i&&((l=s.appendChild(document.createElement("div"))).className="CodeMirror-lint-marker CodeMirror-lint-marker-multiple"),0!=a&&t.on(l,"mouseover",(function(t){o(e,t,n,l)})),s}function s(t){var e=t.severity;e||(e="error");var n=document.createElement("div");return n.className="CodeMirror-lint-message CodeMirror-lint-message-"+e,void 0!==t.messageHTML?n.innerHTML=t.messageHTML:n.appendChild(document.createTextNode(t.message)),n}function l(e){var n=e.state.lint.options,o=n.options||n,r=n.getAnnotations||e.getHelper(t.Pos(0,0),"lint");if(r)if(n.async||r.async)!function(e,n,o){var r=e.state.lint,i=++r.waitingFor;function a(){i=-1,e.off("change",a)}e.on("change",a),n(e.getValue(),(function(n,o){e.off("change",a),r.waitingFor==i&&(o&&n instanceof t&&(n=o),e.operation((function(){u(e,n)})))}),o,e)}(e,r,o);else{var i=r(e.getValue(),o,e);if(!i)return;i.then?i.then((function(t){e.operation((function(){u(e,t)}))})):e.operation((function(){u(e,i)}))}}function u(t,n){i(t);for(var o,r,l=t.state.lint,u=l.options,c=function(t){for(var e=[],n=0;n<t.length;++n){var o=t[n],r=o.from.line;(e[r]||(e[r]=[])).push(o)}return e}(n),f=0;f<c.length;++f){var m=c[f];if(m){var d=[];m=m.filter((function(t){return!(d.indexOf(t.message)>-1)&&d.push(t.message)}));for(var p=null,h=l.hasGutter&&document.createDocumentFragment(),g=0;g<m.length;++g){var v=m[g],C=v.severity;C||(C="error"),r=C,p="error"==(o=p)?o:r,u.formatAnnotation&&(v=u.formatAnnotation(v)),l.hasGutter&&h.appendChild(s(v)),v.to&&l.marked.push(t.markText(v.from,v.to,{className:"CodeMirror-lint-mark CodeMirror-lint-mark-"+C,__annotation:v}))}l.hasGutter&&t.setGutterMarker(f,e,a(t,h,p,c[f].length>1,l.options.tooltips))}}u.onUpdateLinting&&u.onUpdateLinting(n,c,t)}function c(t){var e=t.state.lint;e&&(clearTimeout(e.timeout),e.timeout=setTimeout((function(){l(t)}),e.options.delay||500))}t.defineOption("lint",!1,(function(n,o,a){if(a&&a!=t.Init&&(i(n),!1!==n.state.lint.options.lintOnChange&&n.off("change",c),t.off(n.getWrapperElement(),"mouseover",n.state.lint.onMouseOver),clearTimeout(n.state.lint.timeout),delete n.state.lint),o){for(var s=n.getOption("gutters"),u=!1,f=0;f<s.length;++f)s[f]==e&&(u=!0);var m=n.state.lint=new r(n,(d=o)instanceof Function?{getAnnotations:d}:(d&&!0!==d||(d={}),d),u);!1!==m.options.lintOnChange&&n.on("change",c),0!=m.options.tooltips&&"gutter"!=m.options.tooltips&&t.on(n.getWrapperElement(),"mouseover",m.onMouseOver),l(n)}var d})),t.defineExtension("performLint",(function(){this.state.lint&&l(this)}))}));