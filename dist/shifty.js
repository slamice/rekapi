/**
Shifty - A teeny tiny tweening engine in JavaScript. v0.5.0
By Jeremy Kahn - jeremyckahn@gmail.com

For instructions on how to use Shifty, please consult the README: https://github.com/jeremyckahn/shifty/blob/master/README.md

MIT Lincense.  This code free to use, modify, distribute and enjoy.
*/
(function(d){function a(a,b){for(var c in a)a.hasOwnProperty(c)&&b(a,c)}function i(o,b){a(b,function(a,b){o[b]=a[b]});return o}function l(o,b){a(b,function(a,b){"undefined"===typeof o[b]&&(o[b]=a[b])});return o}function e(a,b,c){var f,a=(a-b.timestamp)/b.duration;for(f in c.current)c.current.hasOwnProperty(f)&&b.to.hasOwnProperty(f)&&(c.current[f]=j(b.originalState[f],b.to[f],g[b.easing[f]],a));return c.current}function j(a,b,c,f){return a+(b-a)*c(f)}function h(a,b,c,f){var g;for(g=0;g<b[a].length;g++)b[a][g].apply(c,
f)}function k(b,c,f){a(d.Tweenable.prototype.filter,function(a,g){a[g][b]&&a[g][b].apply(c,f)})}function n(a,b){var c;c=f();c<a.timestamp+a.duration&&b.isTweening?(b.loopId=setTimeout(function(){n(a,b)},1E3/a.owner.fps),k("beforeTween",a.owner,[b.current,a.originalState,a.to]),e(c,a,b),k("afterTween",a.owner,[b.current,a.originalState,a.to]),a.hook.step&&h("step",a.hook,a.owner,[b.current]),a.step.call(b.current)):a.owner.stop(!0)}function m(b,f){var g;g={};"string"===typeof f?a(b,function(a,b){g[b]=
f}):a(b,function(a,b){g[b]||(g[b]=f[b]||c)});return g}function b(a){a=a||{};this._hook={};this._tweenParams={owner:this,hook:this._hook,data:{}};this._state={};this._state.current=a.initialState||{};this.fps=a.fps||30;this.easing=a.easing||c;this.duration=a.duration||500;return this}var f,c="linear",g;f="function"===typeof SHIFTY_DEBUG_NOW?SHIFTY_DEBUG_NOW:function(){return+new Date};b.prototype.tween=function(a,b,c,g,d){var e,h;if(!this._state.isTweening)return e=this._tweenParams,h=this._state,
this._state.loopId=0,this._state.pausedAtTime=null,b?(e.step=function(){},e.to=b||{},e.duration=c||this.duration,e.callback=g||function(){},e.easing=d||this.easing,h.current=a||{}):(e.step=a.step||function(){},e.callback=a.callback||function(){},e.to=a.to||a.target||{},e.duration=a.duration||this.duration,e.easing=a.easing||this.easing,h.current=a.from||{}),e.timestamp=f(),l(h.current,e.to),l(e.to,h.current),e.easing=m(h.current,e.easing),k("tweenCreated",e.owner,[h.current,e.originalState,e.to]),
e.originalState=i({},h.current),h.isTweening=!0,this.resume(),a.start&&a.start(),this};b.prototype.to=function(a,b,c,f){"undefined"===typeof b?(a.from=this.get(),this.tween(a)):this.tween(this.get(),a,b,c,f);return this};b.prototype.get=function(){return this._state.current};b.prototype.set=function(a){this._state.current=a||{};return this};b.prototype.stop=function(a){clearTimeout(this._state.loopId);this._state.isTweening=!1;a&&(i(this._state.current,this._tweenParams.to),k("afterTweenEnd",this,
[this._state.current,this._tweenParams.originalState,this._tweenParams.to]),this._tweenParams.callback.call(this._state.current));return this};b.prototype.pause=function(){clearTimeout(this._state.loopId);this._state.pausedAtTime=f();this._state.isPaused=!0;return this};b.prototype.resume=function(){this._state.isPaused&&(this._tweenParams.timestamp+=f()-this._state.pausedAtTime);n(this._tweenParams,this._state);return this};b.prototype.hookAdd=function(a,b){this._hook.hasOwnProperty(a)||(this._hook[a]=
[]);this._hook[a].push(b)};b.prototype.hookRemove=function(a,b){var c;if(this._hook.hasOwnProperty(a))if(b)for(c=this._hook[a].length;0<=c;c++)this._hook[a][c]===b&&this._hook[a].splice(c,1);else this._hook[a]=[]};b.prototype.filter={};b.util={now:f,each:a,tweenProps:e,tweenProp:j,applyFilter:k,simpleCopy:i,weakCopy:l,composeEasingObject:m};g=b.prototype.formula={linear:function(a){return a}};if("undefined"===typeof d.Tweenable)d.Tweenable=b})(this);
(function(d){d.Tweenable.util.simpleCopy(d.Tweenable.prototype.formula,{easeInQuad:function(a){return Math.pow(a,2)},easeOutQuad:function(a){return-(Math.pow(a-1,2)-1)},easeInOutQuad:function(a){return 1>(a/=0.5)?0.5*Math.pow(a,2):-0.5*((a-=2)*a-2)},easeInCubic:function(a){return Math.pow(a,3)},easeOutCubic:function(a){return Math.pow(a-1,3)+1},easeInOutCubic:function(a){return 1>(a/=0.5)?0.5*Math.pow(a,3):0.5*(Math.pow(a-2,3)+2)},easeInQuart:function(a){return Math.pow(a,4)},easeOutQuart:function(a){return-(Math.pow(a-
1,4)-1)},easeInOutQuart:function(a){return 1>(a/=0.5)?0.5*Math.pow(a,4):-0.5*((a-=2)*Math.pow(a,3)-2)},easeInQuint:function(a){return Math.pow(a,5)},easeOutQuint:function(a){return Math.pow(a-1,5)+1},easeInOutQuint:function(a){return 1>(a/=0.5)?0.5*Math.pow(a,5):0.5*(Math.pow(a-2,5)+2)},easeInSine:function(a){return-Math.cos(a*(Math.PI/2))+1},easeOutSine:function(a){return Math.sin(a*(Math.PI/2))},easeInOutSine:function(a){return-0.5*(Math.cos(Math.PI*a)-1)},easeInExpo:function(a){return 0==a?0:Math.pow(2,
10*(a-1))},easeOutExpo:function(a){return 1==a?1:-Math.pow(2,-10*a)+1},easeInOutExpo:function(a){return 0==a?0:1==a?1:1>(a/=0.5)?0.5*Math.pow(2,10*(a-1)):0.5*(-Math.pow(2,-10*--a)+2)},easeInCirc:function(a){return-(Math.sqrt(1-a*a)-1)},easeOutCirc:function(a){return Math.sqrt(1-Math.pow(a-1,2))},easeInOutCirc:function(a){return 1>(a/=0.5)?-0.5*(Math.sqrt(1-a*a)-1):0.5*(Math.sqrt(1-(a-=2)*a)+1)},easeOutBounce:function(a){return a<1/2.75?7.5625*a*a:a<2/2.75?7.5625*(a-=1.5/2.75)*a+0.75:a<2.5/2.75?7.5625*
(a-=2.25/2.75)*a+0.9375:7.5625*(a-=2.625/2.75)*a+0.984375},easeInBack:function(a){return a*a*(2.70158*a-1.70158)},easeOutBack:function(a){return(a-=1)*a*(2.70158*a+1.70158)+1},easeInOutBack:function(a){var d=1.70158;return 1>(a/=0.5)?0.5*a*a*(((d*=1.525)+1)*a-d):0.5*((a-=2)*a*(((d*=1.525)+1)*a+d)+2)},elastic:function(a){return-1*Math.pow(4,-8*a)*Math.sin((6*a-1)*2*Math.PI/2)+1},swingFromTo:function(a){var d=1.70158;return 1>(a/=0.5)?0.5*a*a*(((d*=1.525)+1)*a-d):0.5*((a-=2)*a*(((d*=1.525)+1)*a+d)+
2)},swingFrom:function(a){return a*a*(2.70158*a-1.70158)},swingTo:function(a){return(a-=1)*a*(2.70158*a+1.70158)+1},bounce:function(a){return a<1/2.75?7.5625*a*a:a<2/2.75?7.5625*(a-=1.5/2.75)*a+0.75:a<2.5/2.75?7.5625*(a-=2.25/2.75)*a+0.9375:7.5625*(a-=2.625/2.75)*a+0.984375},bouncePast:function(a){return a<1/2.75?7.5625*a*a:a<2/2.75?2-(7.5625*(a-=1.5/2.75)*a+0.75):a<2.5/2.75?2-(7.5625*(a-=2.25/2.75)*a+0.9375):2-(7.5625*(a-=2.625/2.75)*a+0.984375)},easeFromTo:function(a){return 1>(a/=0.5)?0.5*Math.pow(a,
4):-0.5*((a-=2)*Math.pow(a,3)-2)},easeFrom:function(a){return Math.pow(a,4)},easeTo:function(a){return Math.pow(a,0.25)}})})(this);
(function(d){function a(a,e){return function(){a();e.shift();if(e.length)e[0]();else e.running=!1}}function i(a,e,d,h,k,n){return function(){d?a.tween(e,d,h,k,n):(e.callback=k,e.from?a.tween(e):a.to(e))}}d.Tweenable.prototype.queue=function(d,e,j,h,k){if(!this._tweenQueue)this._tweenQueue=[];h=h||d.callback||function(){};h=a(h,this._tweenQueue);this._tweenQueue.push(i(this,d,e,j,h,k));return this};d.Tweenable.prototype.queueStart=function(){if(!this._tweenQueue.running&&0<this._tweenQueue.length)this._tweenQueue[0](),
this._tweenQueue.running=!0;return this};d.Tweenable.prototype.queueShift=function(){this._tweenQueue.shift();return this};d.Tweenable.prototype.queuePop=function(){this._tweenQueue.pop();return this};d.Tweenable.prototype.queueEmpty=function(){this._tweenQueue.length=0;return this};d.Tweenable.prototype.queueLength=function(){return this._tweenQueue.length}})(this);
(function(d){function a(a){return parseInt(a,16)}function i(b){d.Tweenable.util.each(b,function(b,c){if("string"===typeof b[c]&&(h.test(b[c])||k.test(b[c]))){var g;g=b[c];g=g.replace(/#/g,"");3===g.length&&(g=g.split(""),g=g[0]+g[0]+g[1]+g[1]+g[2]+g[2]);g=[a(g.substr(0,2)),a(g.substr(2,2)),a(g.substr(4,2))];b[c]="rgb("+g[0]+","+g[1]+","+g[2]+")"}})}function l(a){var f;f=[];d.Tweenable.util.each(a,function(a,b){"string"===typeof a[b]&&(h.test(a[b])||k.test(a[b])||n.test(a[b]))&&f.push(b)});return f}
function e(a,f){var c,d,e;d=f.length;for(c=0;c<d;c++)e=a[f[c]].match(/(\d+)/g),a["__r__"+f[c]]=+e[0],a["__g__"+f[c]]=+e[1],a["__b__"+f[c]]=+e[2],delete a[f[c]]}function j(a,f){var c,d;d=f.length;for(c=0;c<d;c++)a[f[c]]="rgb("+parseInt(a["__r__"+f[c]],10)+","+parseInt(a["__g__"+f[c]],10)+","+parseInt(a["__b__"+f[c]],10)+")",delete a["__r__"+f[c]],delete a["__g__"+f[c]],delete a["__b__"+f[c]]}var h=/^#([0-9]|[a-f]){3}$/i,k=/^#([0-9]|[a-f]){6}$/i,n=/^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)\s*$/i,m;if(d.Tweenable)d.Tweenable.prototype.filter.color=
{tweenCreated:function(a,f,c){i(a);i(f);i(c)},beforeTween:function(a,f,c){m=l(f);e(a,m);e(f,m);e(c,m);var a=this._tweenParams.easing,f=m,d;d=f.length;for(c=0;c<d;c++)a["__r__"+f[c]]=a[f[c]],a["__g__"+f[c]]=a[f[c]],a["__b__"+f[c]]=a[f[c]]},afterTween:function(a,f,c){j(a,m);j(f,m);j(c,m);var a=this._tweenParams.easing,f=m,d;d=f.length;for(c=0;c<d;c++)delete a["__r__"+f[c]],delete a["__g__"+f[c]],delete a["__b__"+f[c]]}}})(this);
(function(d){function a(a){var h;h={};d.Tweenable.util.each(a,function(a,b){"string"===typeof a[b]&&e.test(a[b])&&(h[b]={suffix:a[b].match(e)[0]})});return h}function i(a,e){d.Tweenable.util.each(e,function(d,b){a[b]=+a[b].replace(j,"")})}function l(a,e){d.Tweenable.util.each(e,function(d,b){a[b]+=d[b].suffix})}var e=/(px|em|%|pc|pt|mm|cm|in|ex)/i,j=/([a-z]|%)/gi,h;d.Tweenable.prototype.filter.token={beforeTween:function(d,e,j){h=a(e);i(d,h);i(e,h);i(j,h)},afterTween:function(a,d,e){l(a,h);l(d,h);
l(e,h)}}})(this);
(function(d){if(d.Tweenable)d.Tweenable.util.interpolate=function(a,i,l,e){var j;if(a&&a.from)i=a.to,l=a.position,e=a.easing,a=a.from;j=new Tweenable;j._tweenParams.easing=e;e=d.Tweenable.util.simpleCopy({},a);d.Tweenable.util.applyFilter("tweenCreated",j,[e,a,i]);d.Tweenable.util.applyFilter("beforeTween",j,[e,a,i]);var h=a,k=i,n;n=Tweenable.util.composeEasingObject(h,j._tweenParams.easing);e=d.Tweenable.util.tweenProps(l,{originalState:h,to:k,timestamp:0,duration:1,easing:n},{current:e});d.Tweenable.util.applyFilter("afterTween",
j,[e,a,i]);return e},d.Tweenable.prototype.interpolate=function(a,i,l){a=d.Tweenable.util.interpolate(this.get(),a,i,l);this.set(a);return a}})(this);
