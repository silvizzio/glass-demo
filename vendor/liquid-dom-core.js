var cn=Object.defineProperty;var un=(n,e)=>{for(var t in e)cn(n,t,{get:e[t],enumerable:!0})};var it={};un(it,{SDF_EPSILON:()=>Bt,aabbArea:()=>tt,aabbFromPoints:()=>Ot,blendSupportScaleForSubmersion:()=>Ke,clamp01:()=>G,estimateCellSubmersion:()=>Se,estimateShapeGridSubmersions:()=>Pe,intersectBounds:()=>nt,intersectConvexPolygons:()=>Ce,lerp:()=>Qe,normalAngleGate:()=>Ze,normalGateForNormals:()=>je,polygonArea:()=>$,polygonSignedArea:()=>ye,polygonUnionArea:()=>rt,shapeSubmergedAreaAtGridCenteredLocal:()=>It,shapeSubmergedAreaAtGridLocal:()=>et,smoothUnionGatingInfo:()=>Lt,smoothUnionWeight:()=>Je});var Bt=1e-4,be={enabled:!0},$e={acceleration:.35},ae={enabled:!0,cellSize:100},Mt=2;function G(n){return Math.min(Math.max(n,0),1)}function _t(n){let e=G(n);return e*e*(3-2*e)}function Ke(n){let e=G(n);return 1-_t(e)}function dn(n,e){let t=Mt,r=i=>_t((t+.5-Math.abs(i))*2);return Math.exp(-.5*(n*n+e*e))*r(n)*r(e)}function Qe(n,e,t){return n+(e-n)*t}function xe(n){return n===void 0?{...be}:n===!1?{...be,enabled:!1}:{enabled:n.enabled??!0}}function wt(n){return{acceleration:n?.acceleration??$e.acceleration}}function At(n){return n===void 0?{...ae}:typeof n=="boolean"?{...ae,enabled:n}:{enabled:n.enabled??!0,cellSize:n.cellSize??ae.cellSize}}function Ze(n){let e=G(n);return G(e+e*e-e*e*e)}function je(n,e,t){let r=Math.min(Math.max(n.x*e.x+n.y*e.y,-1),1),i=Math.acos(r),s=G(i/Math.PI),a=t.enabled?Ze(s):1;return{angle:i,gate:G(a)}}function Je(n,e,t){return G(.5+.5*(e-n)/Math.max(t,1e-4))}function Rt(n,e,t){let r=Math.max(Math.round(n.columns),1),i=Math.max(Math.round(n.rows),1),s=Math.min(Math.max(e,0),r-1),a=Math.min(Math.max(t,0),i-1);return n.values[a*r+s]??0}function et(n,e,t){let r=Mt,i=Math.max(Math.round(t.columns),1),s=Math.max(Math.round(t.rows),1),a=G(n.x/Math.max(e.width,1e-4)),o=G(n.y/Math.max(e.height,1e-4)),l=a*i-.5,c=o*s-.5,m=Math.floor(l+.5),p=Math.floor(c+.5),u=0,d=0;for(let f=-2;f<=2;f+=1)for(let b=-2;b<=2;b+=1){if(Math.abs(b)>r||Math.abs(f)>r)continue;let B=m+b,y=p+f,S=dn(B-l,y-c);u+=Rt(t,B,y)*S,d+=S}return d>1e-4?u/d:Rt(t,m,p)}function It(n,e,t){return et({x:n.x+e.width*.5,y:n.y+e.height*.5},e,t)}function Ot(n){return n.reduce((e,t)=>({minX:Math.min(e.minX,t.x),minY:Math.min(e.minY,t.y),maxX:Math.max(e.maxX,t.x),maxY:Math.max(e.maxY,t.y)}),{minX:Number.POSITIVE_INFINITY,minY:Number.POSITIVE_INFINITY,maxX:Number.NEGATIVE_INFINITY,maxY:Number.NEGATIVE_INFINITY})}function tt(n){return Math.max(n.maxX-n.minX,0)*Math.max(n.maxY-n.minY,0)}function nt(n,e){let t={minX:Math.max(n.minX,e.minX),minY:Math.max(n.minY,e.minY),maxX:Math.min(n.maxX,e.maxX),maxY:Math.min(n.maxY,e.maxY)};return tt(t)>1e-4?t:null}function ye(n){let e=0;for(let t=0;t<n.length;t+=1){let r=n[t],i=n[(t+1)%n.length];e+=r.x*i.y-i.x*r.y}return e*.5}function $(n){return Math.abs(ye(n))}function qe(n,e,t,r){return n*r-e*t}function Dt(n,e,t,r){let i=qe(t.x-e.x,t.y-e.y,n.x-e.x,n.y-e.y);return r>=0?i>=-1e-4:i<=1e-4}function pn(n,e,t,r){let i=e.x-n.x,s=e.y-n.y,a=r.x-t.x,o=r.y-t.y,l=qe(i,s,a,o);if(Math.abs(l)<=1e-4)return e;let c=qe(t.x-n.x,t.y-n.y,a,o)/l;return{x:n.x+i*c,y:n.y+s*c}}function hn(n,e,t,r){let i=[];if(n.length===0)return i;let s=n[n.length-1],a=Dt(s,e,t,r);for(let o of n){let l=Dt(o,e,t,r);l!==a&&i.push(pn(s,o,e,t)),l&&i.push(o),s=o,a=l}return i}function Ce(n,e){let t=n,r=ye(e);for(let i=0;i<e.length&&t.length>=3;i+=1)t=hn(t,e[i],e[(i+1)%e.length],r);return t.length>=3?t:[]}function rt(n,e){if(n.length===0)return 0;if(n.length>8)return Math.min(n.reduce((i,s)=>i+$(s),0),e);let t=0,r=(i,s,a)=>{for(let o=i;o<n.length;o+=1){let l=s?Ce(s,n[o]):n[o],c=$(l);if(c<=1e-4)continue;let m=a+1;t+=m%2===1?c:-c,r(o+1,l,m)}};return r(0,null,0),Math.min(Math.max(t,0),e)}function Se(n,e,t){if(t.area<=1e-4)return 0;let r=n.flatMap(i=>{if(i===e)return[];if(!nt(t.aabb,i.bounds.aabb))return[];let s=Ce(t.polygon,i.bounds.polygon);return $(s)>1e-4?[s]:[]});return G(rt(r,t.area)/t.area)}function Pe(n,e){let t=e.submersionGrid;return t?{columns:t.columns,rows:t.rows,values:t.cells.map(r=>Se(n,e,r.bounds))}:{columns:1,rows:1,values:[Se(n,e,e.bounds)]}}function Lt(n,e,t,r,i){let s=je(n.normal,e.normal,r),a=t*s.gate,o=Je(n.distance,e.distance,a),l=Qe(e.submergedArea,n.submergedArea,o),c=G(l),m=i?Ke(c):1;return{angle:s.angle,blendDistance:a*m,normalGate:s.gate,submergedArea:c}}var oe=class extends Event{glass;renderer;nativeEvent;pointerId;pointerType;isPrimary;button;buttons;clientX;clientY;canvasX;canvasY;localX;localY;inside;constructor(e,t){super(e,{bubbles:!1,cancelable:!0,composed:!1}),this.glass=t.glass,this.renderer=t.renderer,this.nativeEvent=t.nativeEvent,this.pointerId=t.nativeEvent.pointerId,this.pointerType=t.nativeEvent.pointerType,this.isPrimary=t.nativeEvent.isPrimary,this.button=t.nativeEvent.button,this.buttons=t.nativeEvent.buttons,this.clientX=t.nativeEvent.clientX,this.clientY=t.nativeEvent.clientY,this.canvasX=t.canvasX,this.canvasY=t.canvasY,this.localX=t.localX,this.localY=t.localY,this.inside=t.inside}};var st=3.3333333333333335;function Ut(n){return Number.isFinite(n)?Math.max(n,0):0}function at(n){return Number.isFinite(n)?Math.min(Math.max(n,0),1):.6}function Ht(n){return 2+at(n)*st}function Ee(){return{a:1,b:0,c:0,d:1,e:0,f:0}}function le(n,e){return{a:n.a*e.a+n.c*e.b,b:n.b*e.a+n.d*e.b,c:n.a*e.c+n.c*e.d,d:n.b*e.c+n.d*e.d,e:n.a*e.e+n.c*e.f+n.e,f:n.b*e.e+n.d*e.f+n.f}}function ot(n,e){return{a:1,b:0,c:0,d:1,e:n,f:e}}function mn(n,e){return{a:n,b:0,c:0,d:e,e:0,f:0}}function fn(n){let e=Math.cos(n),t=Math.sin(n);return{a:e,b:t,c:-t,d:e,e:0,f:0}}function Nt(n){return le(ot(n.x,n.y),le(ot(n.origin.x,n.origin.y),le(fn(n.rotation),le(mn(n.scaleX,n.scaleY),ot(-n.origin.x,-n.origin.y)))))}function L(n,e){return le(n,e)}function K(n){let e=n.a*n.d-n.b*n.c;if(Math.abs(e)<1e-6)return null;let t=1/e;return{a:n.d*t,b:-n.b*t,c:-n.c*t,d:n.a*t,e:(n.c*n.f-n.d*n.e)*t,f:(n.b*n.e-n.a*n.f)*t}}function Ge(n,e){return{a:n.a*e,b:n.b*e,c:n.c*e,d:n.d*e,e:n.e*e,f:n.f*e}}function A(n,e,t){return{x:n.a*e+n.c*t+n.e,y:n.b*e+n.d*t+n.f}}function Ft(n){let e=Math.hypot(n.a,n.b),t=Math.hypot(n.c,n.d);return Math.max(Math.min(e,t),1e-4)}function vn(n){return n?{x:n.x,y:n.y}:{x:0,y:0}}function kt(n){return n?{r:n.r,g:n.g,b:n.b,a:n.a}:{r:0,g:0,b:0,a:0}}function Te(n,e){e&&(e.x!==void 0&&(n.x=e.x),e.y!==void 0&&(n.y=e.y),e.scaleX!==void 0&&(n.scaleX=e.scaleX),e.scaleY!==void 0&&(n.scaleY=e.scaleY),e.rotation!==void 0&&(n.rotation=e.rotation),e.origin!==void 0&&(n.origin=vn(e.origin)))}function Wt(n){let e=n instanceof k?n:n?._parent??null;for(;e;){if(e instanceof k)return e;e=e._parent}return null}function P(n){Wt(n)?._notifyMutation()}function N(n){let e=n._parent;if(!e)return;let t=Wt(n);e._children=e._children.filter(r=>r!==n),n._parent=null,t?._notifyMutation()}function Re(n,e){if(n===e)throw new Error("A Group cannot be added to itself.");let t=n;for(;t;){if(t===e)throw new Error("A Group cannot be added to one of its descendants.");t="_parent"in t?t._parent:null}}function bn(n){let e=n;for(;e instanceof I;)e=e._parent;return e}function zt(n,e){if(!(!e||n instanceof I)&&!(e instanceof k&&(n instanceof F||n instanceof T))&&!(e instanceof F&&n instanceof te)&&!(e instanceof te&&n instanceof T))throw new Error("A Group child must match the node type accepted by its nearest non-group parent.")}function ce(n,e){for(let t of n._children)zt(t,e),t instanceof I&&ce(t,e)}var T=class{x=0;y=0;scaleX=1;scaleY=1;rotation=0;origin={x:0,y:0};host;_width=0;_height=0;_opacity=1;_blur=0;_zIndex=0;_element=null;_elementVersion=0;_parent=null;constructor(e={}){this.host=document.createElement("div"),this.host.style.position="absolute",this.host.style.left="0",this.host.style.top="0",this.host.style.display="block",this.host.style.overflow="hidden",this.host.style.transformOrigin="0 0",Te(this,e),e.width!==void 0?this.width=e.width:this.syncHostSize(),e.height!==void 0?this.height=e.height:this.syncHostSize(),e.opacity!==void 0&&(this.opacity=e.opacity),e.blur!==void 0&&(this.blur=e.blur),e.zIndex!==void 0&&(this.zIndex=e.zIndex),e.element!==void 0&&this.setElement(e.element)}get width(){return this._width}set width(e){this._width!==e&&(this._width=e,this.syncHostSize(),P(this))}get height(){return this._height}set height(e){this._height!==e&&(this._height=e,this.syncHostSize(),P(this))}get opacity(){return this._opacity}set opacity(e){this._opacity!==e&&(this._opacity=e,P(this))}get blur(){return this._blur}set blur(e){this._blur!==e&&(this._blur=e,P(this))}get zIndex(){return this._zIndex}set zIndex(e){this._zIndex!==e&&(this._zIndex=e,P(this))}get element(){return this._element}setElement(e){this._element!==e&&(this._element=e,this._elementVersion+=1,this.host.replaceChildren(),e&&this.host.append(e),P(this))}remove(){N(this)}syncHostSize(){this.host.style.width=`${this._width}px`,this.host.style.height=`${this._height}px`}},te=class extends EventTarget{x=0;y=0;scaleX=1;scaleY=1;rotation=0;origin={x:0,y:0};_width=0;_height=0;get width(){return this._width}set width(e){this._width!==e&&(this._width=e,P(this))}get height(){return this._height}set height(e){this._height!==e&&(this._height=e,P(this))}_cornerRadius=0;_cornerSmoothing=.6;get cornerRadius(){return this._cornerRadius}set cornerRadius(e){let t=Ut(e);this._cornerRadius!==t&&(this._cornerRadius=t,P(this))}get cornerSmoothing(){return this._cornerSmoothing}set cornerSmoothing(e){let t=at(e);this._cornerSmoothing!==t&&(this._cornerSmoothing=t,P(this))}_pointerEvents=!1;_zIndex=0;get pointerEvents(){return this._pointerEvents}set pointerEvents(e){this._pointerEvents!==e&&(this._pointerEvents=e,P(this))}get zIndex(){return this._zIndex}set zIndex(e){this._zIndex!==e&&(this._zIndex=e,P(this))}_parent=null;_children=[];constructor(e={}){super(),Te(this,e),e.width!==void 0&&(this.width=e.width),e.height!==void 0&&(this.height=e.height),e.cornerRadius!==void 0&&(this.cornerRadius=e.cornerRadius),e.cornerSmoothing!==void 0&&(this.cornerSmoothing=e.cornerSmoothing),e.pointerEvents!==void 0&&(this.pointerEvents=e.pointerEvents),e.zIndex!==void 0&&(this.zIndex=e.zIndex)}add(e){return e instanceof I&&(Re(this,e),ce(e,this)),N(e),this._children.push(e),e._parent=this,P(e),e}remove(){N(this)}addEventListener(e,t,r){super.addEventListener(e,t,r)}removeEventListener(e,t,r){super.removeEventListener(e,t,r)}},F=class{x=0;y=0;scaleX=1;scaleY=1;rotation=0;origin={x:0,y:0};opacity=1;spacing=12;blur=8;bezelWidth=14;thickness=90;displacementFactor=1;displacementBlur=6;_normalGating={...be};get normalGating(){return this._normalGating}set normalGating(e){this._normalGating=xe(e)}_blendSupportGating={...ae};get blendSupportGating(){return this._blendSupportGating}set blendSupportGating(e){this._blendSupportGating=At(e)}_smoothUnion={...$e};get smoothUnion(){return this._smoothUnion}set smoothUnion(e){this._smoothUnion=wt(e)}ior=1.5;contentIor=1;contentDepth=0;dispersion=0;surfaceProfile="convex";lightDirection=-Math.PI/4;specularStrength=1;specularWidth=1;specularFalloff=1;oppositeSpecularStrength=1;specularSharpness=2;specularOpacity=.45;reflectionOffset=18;tint={r:1,g:1,b:1,a:.15};shadowColor={r:0,g:0,b:0,a:.12};shadowOffsetX=0;shadowOffsetY=10;shadowBlur=24;shadowSpread=0;debugDisplacement=!1;zIndex=0;_parent=null;_children=[];constructor(e={}){Te(this,e),e.opacity!==void 0&&(this.opacity=e.opacity),e.spacing!==void 0&&(this.spacing=e.spacing),e.blur!==void 0&&(this.blur=e.blur),e.bezelWidth!==void 0&&(this.bezelWidth=e.bezelWidth),e.thickness!==void 0&&(this.thickness=e.thickness),e.displacementFactor!==void 0&&(this.displacementFactor=e.displacementFactor),e.displacementBlur!==void 0&&(this.displacementBlur=e.displacementBlur),e.normalGating!==void 0&&(this.normalGating=e.normalGating),e.blendSupportGating!==void 0&&(this.blendSupportGating=e.blendSupportGating),e.smoothUnion!==void 0&&(this.smoothUnion=e.smoothUnion),e.ior!==void 0&&(this.ior=e.ior),e.contentIor!==void 0&&(this.contentIor=e.contentIor),e.contentDepth!==void 0&&(this.contentDepth=e.contentDepth),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.surfaceProfile!==void 0&&(this.surfaceProfile=e.surfaceProfile),e.lightDirection!==void 0&&(this.lightDirection=e.lightDirection),e.specularStrength!==void 0&&(this.specularStrength=e.specularStrength),e.specularWidth!==void 0&&(this.specularWidth=e.specularWidth),e.specularFalloff!==void 0&&(this.specularFalloff=e.specularFalloff),this.oppositeSpecularStrength=e.oppositeSpecularStrength??this.specularStrength,e.specularSharpness!==void 0&&(this.specularSharpness=e.specularSharpness),e.specularOpacity!==void 0&&(this.specularOpacity=e.specularOpacity),e.reflectionOffset!==void 0&&(this.reflectionOffset=e.reflectionOffset),e.tint!==void 0&&(this.tint=kt(e.tint)),e.shadowColor!==void 0&&(this.shadowColor=kt(e.shadowColor)),e.shadowOffsetX!==void 0&&(this.shadowOffsetX=e.shadowOffsetX),e.shadowOffsetY!==void 0&&(this.shadowOffsetY=e.shadowOffsetY),e.shadowBlur!==void 0&&(this.shadowBlur=e.shadowBlur),e.shadowSpread!==void 0&&(this.shadowSpread=e.shadowSpread),e.debugDisplacement!==void 0&&(this.debugDisplacement=e.debugDisplacement),e.zIndex!==void 0&&(this.zIndex=e.zIndex)}add(e){return e instanceof I&&(Re(this,e),ce(e,this)),N(e),this._children.push(e),e._parent=this,P(e),e}remove(){N(this)}},I=class n{x=0;y=0;scaleX=1;scaleY=1;rotation=0;origin={x:0,y:0};_parent=null;_children=[];constructor(e={}){Te(this,e)}add(e){e instanceof n&&Re(this,e);let t=bn(this);return zt(e,t),e instanceof n&&ce(e,t),N(e),this._children.push(e),e._parent=this,P(e),e}remove(){N(this)}},Q=class extends I{_zIndex=0;constructor(e={}){super(e),e.zIndex!==void 0&&(this._zIndex=e.zIndex)}get zIndex(){return this._zIndex}set zIndex(e){this._zIndex!==e&&(this._zIndex=e,P(this))}},k=class{_children=[];_listeners=new Set;add(e){return e instanceof I&&(Re(this,e),ce(e,this)),N(e),this._children.push(e),e._parent=this,this._notifyMutation(),e}_subscribe(e){return this._listeners.add(e),()=>{this._listeners.delete(e)}}_notifyMutation(){for(let e of this._listeners)e()}};function Yt(n){let e=[];function t(r,i){let s={value:0},a=[];Be(r,i,s,(o,l)=>{(o instanceof F||o instanceof T)&&(a.push({child:o,transform:l,zIndex:o.zIndex,order:s.value}),s.value+=1)},(o,l)=>{a.push({child:o,transform:l,zIndex:o.zIndex,order:s.value}),s.value+=1}),a.sort((o,l)=>o.zIndex-l.zIndex||o.order-l.order);for(let o of a){if(o.child instanceof Q){t(o.child._children,o.transform);continue}e.push({child:o.child,transform:o.transform,traversalIndex:e.length})}}return t(n._children,Ee()),e}function De(n){let e=[];function t(r,i){let s={value:0},a=[];Be(r,i,s,(o,l)=>{o instanceof te&&(a.push({child:o,transform:l,zIndex:o.zIndex,order:s.value}),s.value+=1)},(o,l)=>{a.push({child:o,transform:l,zIndex:o.zIndex,order:s.value}),s.value+=1}),a.sort((o,l)=>o.zIndex-l.zIndex||o.order-l.order);for(let o of a){if(o.child instanceof Q){t(o.child._children,o.transform);continue}e.push({glass:o.child,transform:o.transform,traversalIndex:e.length})}}return t(n._children,Ee()),e}function Xt(n){let e=[];function t(r,i){let s={value:0},a=[];Be(r,i,s,(o,l)=>{o instanceof T&&(a.push({child:o,transform:l,zIndex:o.zIndex,order:s.value}),s.value+=1)},(o,l)=>{a.push({child:o,transform:l,zIndex:o.zIndex,order:s.value}),s.value+=1}),a.sort((o,l)=>o.zIndex-l.zIndex||o.order-l.order);for(let o of a){if(o.child instanceof Q){t(o.child._children,o.transform);continue}e.push({html:o.child,transform:o.transform,traversalIndex:e.length})}}return t(n._children,Ee()),e}function Be(n,e,t,r,i){for(let s of n){let a=L(e,Nt(s));if(s instanceof Q){i(s,a);continue}if(s instanceof I){Be(s._children,a,t,r,i);continue}r(s,a)}}function lt(n){let e=1;for(;e<n;)e*=2;return e}function W(n,e=Number.POSITIVE_INFINITY){if(n>e)throw new Error(`Texture size ${n} exceeds the maximum supported size ${e}.`);return Math.min(lt(Math.max(1,n)),e)}function Sn(n,e){let t=new Map,r=0,i=0,s=0;for(let a of n){let o=W(a.deviceWidth)+2,l=W(a.deviceHeight)+2;if(o>e)return null;r>0&&r+o>e&&(r=0,i+=s,s=0),t.set(a.html,{x:r,y:i}),r+=o,s=Math.max(s,l)}return{width:e,height:i+s,rects:t}}function Vt(n,e){if(n.length===0)throw new Error("Cannot build a glass content atlas without any content entries.");let t=1;for(let i of n)t=Math.max(t,W(i.deviceWidth)+2);let r=lt(t);for(;r<=e;){let i=Sn(n,r);if(i){let s=lt(i.height);if(s<=e)return{...i,height:s}}r*=2}throw new Error("Glass content atlas exceeds the maximum supported texture size.")}var xn=Float32Array.BYTES_PER_ELEMENT;function g(...n){if(n.length>4)throw new Error("A vec4 layout lane cannot contain more than four fields.");return{type:"vec4f",fields:n}}function Y(n){let e=Object.keys(n),t=e.length*4,r=t*xn,i=(s,a,o)=>{let l=a*t;if(l<0||l+t>s.length)throw new RangeError("GPU struct write is outside the target buffer.");s.fill(0,l,l+t);for(let c=0;c<e.length;c+=1){let m=e[c],p=n[m].fields,u=o[m],d=l+c*4;for(let f=0;f<p.length;f+=1)s[d+f]=u[p[f]]}};return{floatCount:t,byteSize:r,createArray(s=1){return new Float32Array(Math.max(s,1)*t)},wgsl(s){let a=e.map(o=>`  ${o}: vec4f,`).join(`
`);return`struct ${s} {
${a}
};`},write(s,a){i(s,0,a)},writeAt:i}}var U=class{constructor(e,t,r){this.device=e;this.layout=t;this.data=t.createArray(),this.buffer=e.createBuffer({size:t.byteSize,usage:r})}data;buffer;get bindingResource(){return{buffer:this.buffer}}write(e){this.layout.write(this.data,e),this.device.queue.writeBuffer(this.buffer,0,this.data)}destroy(){this.buffer.destroy()}},z=class{constructor(e,t,r){this.device=e;this.layout=t;this.usage=r;this.data=t.createArray()}data;buffer=null;capacity=0;get bindingResource(){if(!this.buffer)throw new Error("GPU struct array buffer has not been allocated.");return{buffer:this.buffer}}ensureCapacity(e){let t=Math.max(e,1);this.buffer&&t<=this.capacity||(this.buffer?.destroy(),this.buffer=this.device.createBuffer({size:t*this.layout.byteSize,usage:this.usage}),this.data=this.layout.createArray(t),this.capacity=t)}writeAt(e,t){this.layout.writeAt(this.data,e,t)}upload(e){this.buffer&&this.device.queue.writeBuffer(this.buffer,0,this.data,0,Math.max(e,1)*this.layout.floatCount)}destroy(){this.buffer?.destroy(),this.buffer=null,this.capacity=0}};var ue=Y({params:g("directionX","directionY","radius")}),de=Y({canvas:g("width","height"),container:g("opacity"),shape:g("smoothing","bezelWidth","shapeCount","surfaceProfile"),sdf:g("normalGatingEnabled"),sdfParams0:g("blendSupportGatingEnabled","smoothUnionAcceleration"),glass:g("thickness","displacementFactor","ior","dispersion"),content:g("ior","depth"),lighting:g("x","y"),specular:g("strength","width","sharpness","opacity"),specularSecondary:g("oppositeStrength","falloff","reflectionOffset"),tint:g("r","g","b","a"),shadow:g("offsetX","offsetY","spread","blur"),shadowColor:g("r","g","b","a"),debug:g("displacement")}),Me=Y({inverse0:g("a","c","e","minimumScale"),inverse1:g("b","d","f","cornerRadius"),geometry:g("halfWidth","halfHeight","cornerSmoothing"),contentRange:g("start","count"),submersionGrid:g("offset","columns","rows")}),_e=Y({values:g("x","y","z","w")}),ne=Y({inverse0:g("a","c","e","copiedWidth"),inverse1:g("b","d","f","copiedHeight"),atlasRect:g("u","v","uScale","vScale"),opacity:g("value")}),we=Y({bounds:g("minX","minY","maxX","maxY")}),Ae=Y({canvas:g("width","height","uScale","vScale"),inverse0:g("a","c","e","copiedWidth"),inverse1:g("b","d","f","copiedHeight"),opacity:g("value")});var pe=`
struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) uv: vec2f,
};

@vertex
fn vertexMain(@builtin(vertex_index) vertexIndex: u32) -> VertexOutput {
  var positions = array<vec2f, 3>(
    vec2f(-1.0, -3.0),
    vec2f(-1.0, 1.0),
    vec2f(3.0, 1.0),
  );

  let position = positions[vertexIndex];
  var output: VertexOutput;
  output.position = vec4f(position, 0.0, 1.0);
  output.uv = vec2f(position.x * 0.5 + 0.5, 0.5 - position.y * 0.5);
  return output;
}
`,qt=`
${pe}

@group(0) @binding(0) var downsampleSampler: sampler;
@group(0) @binding(1) var inputTexture: texture_2d<f32>;

@fragment
fn fragmentMain(in: VertexOutput) -> @location(0) vec4f {
  let textureSize = vec2f(textureDimensions(inputTexture));
  let texel = 1.0 / max(textureSize, vec2f(1.0));
  let clampedUv = clamp(in.uv, vec2f(0.0), vec2f(1.0));

  return (
    textureSampleLevel(inputTexture, downsampleSampler, clampedUv + texel * vec2f(-0.5, -0.5), 0.0) +
    textureSampleLevel(inputTexture, downsampleSampler, clampedUv + texel * vec2f(0.5, -0.5), 0.0) +
    textureSampleLevel(inputTexture, downsampleSampler, clampedUv + texel * vec2f(-0.5, 0.5), 0.0) +
    textureSampleLevel(inputTexture, downsampleSampler, clampedUv + texel * vec2f(0.5, 0.5), 0.0)
  ) * 0.25;
}
`,$t=`
${pe}

@group(0) @binding(0) var upsampleSampler: sampler;
@group(0) @binding(1) var inputTexture: texture_2d<f32>;

@fragment
fn fragmentMain(in: VertexOutput) -> @location(0) vec4f {
  return textureSampleLevel(inputTexture, upsampleSampler, in.uv, 0.0);
}
`,ct=`
${pe}

@group(0) @binding(0) var blitSampler: sampler;
@group(0) @binding(1) var inputTexture: texture_2d<f32>;

@fragment
fn fragmentMain(in: VertexOutput) -> @location(0) vec4f {
  return textureSampleLevel(inputTexture, blitSampler, in.uv, 0.0);
}
`,Kt=`
${ue.wgsl("BlurParams")}
${pe}

@group(0) @binding(0) var blurSampler: sampler;
@group(0) @binding(1) var inputTexture: texture_2d<f32>;
@group(0) @binding(2) var<uniform> blurParams: BlurParams;

const ADAPTIVE_BLUR_TAP_RADIUS: f32 = 6.0;
const ADAPTIVE_BLUR_CENTER_WEIGHT: f32 = 0.13702282;
const ADAPTIVE_BLUR_PAIR_OFFSETS: array<f32, 3> = array<f32, 3>(
  1.4584295,
  3.4039848,
  5.3518057,
);
const ADAPTIVE_BLUR_PAIR_WEIGHTS: array<f32, 3> = array<f32, 3>(
  0.23933733,
  0.1394403,
  0.052710965,
);

@fragment
fn fragmentMain(in: VertexOutput) -> @location(0) vec4f {
  let textureSize = vec2f(textureDimensions(inputTexture));
  let blurStep =
    blurParams.params.xy /
    max(textureSize, vec2f(1.0)) *
    (blurParams.params.z / ADAPTIVE_BLUR_TAP_RADIUS);
  let clampedUv = clamp(in.uv, vec2f(0.0), vec2f(1.0));

  var color = textureSampleLevel(inputTexture, blurSampler, clampedUv, 0.0) * ADAPTIVE_BLUR_CENTER_WEIGHT;

  for (var i = 0u; i < 3u; i = i + 1u) {
    let offset = blurStep * ADAPTIVE_BLUR_PAIR_OFFSETS[i];
    let weight = ADAPTIVE_BLUR_PAIR_WEIGHTS[i];
    color =
      color +
      (
        textureSampleLevel(inputTexture, blurSampler, clamp(clampedUv + offset, vec2f(0.0), vec2f(1.0)), 0.0) +
        textureSampleLevel(inputTexture, blurSampler, clamp(clampedUv - offset, vec2f(0.0), vec2f(1.0)), 0.0)
      ) *
      weight;
  }

  return color;
}
`,Ie=`
${de.wgsl("Globals")}

${Me.wgsl("ShapeData")}

${_e.wgsl("SubmersionCellData")}

struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) uv: vec2f,
};

// Smooth union applies a conservative finite-band smooth-min profile after a normal gate.
// Nearly aligned normals are treated as duplicate or nested boundaries and fall
// back toward a hard union; diverging normals get the full blend radius so real
// corners can form a rounded transition. A per-shape submerged-area estimate can
// further scale that blend radius when one shape is mostly inside another
// shape's submersion region.
// globals.sdf.x toggles that normal gate; when disabled, every pair receives
// the full configured smoothing distance.
const SDF_EPSILON: f32 = 0.0001;
const SDF_GRADIENT_STEP_PX: f32 = 1.0;
const SDF_NORMAL_ANGLE_INV_PI: f32 = 0.3183098861837907;
const SDF_SMOOTH_UNION_DEPTH: f32 = 0.25;
const SDF_BLEND_SUPPORT_KERNEL_RADIUS: i32 = 2;
const DEBUG_DISPLACEMENT_ENCODE_SCALE: f32 = 0.01;
// Smooth blending can flatten the fused SDF so one distance unit covers
// more than one screen pixel. Specular is a screen-space rim effect, so it
// converts SDF distance back to pixels with derivatives and caps the correction
// when the local field becomes nearly flat.
const SPECULAR_DISTANCE_SCALE_FLOOR: f32 = 0.25;
// Width of the antialiased feather around the specular band edge in device
// pixels. This is separate from the configured specular band width.
const SPECULAR_EDGE_FEATHER_PX: f32 = 1.0;
const CIRCULAR_CORNER_EXPONENT: f32 = ${2 .toFixed(8)};
const CORNER_SMOOTHING_EXPONENT_DELTA: f32 = ${st.toFixed(8)};

// Keep the SDF value and its local normal together. The normal is used to decide
// when smoothing is a real edge-to-edge blend instead of an overlap artifact.
struct SdfSample {
  distance: f32,
  gradient: vec2f,
  submergedArea: f32,
};

struct SmoothUnionResult {
  distance: f32,
  leftWeight: f32,
  rightWeight: f32,
};

fn normalizeSdfGradient(gradient: vec2f) -> vec2f {
  let magnitude = length(gradient);
  if (magnitude < SDF_EPSILON) {
    return vec2f(0.0, -1.0);
  }
  return gradient / magnitude;
}

fn hardUnion(left: SdfSample, right: SdfSample) -> SdfSample {
  if (left.distance <= right.distance) {
    return left;
  }
  return right;
}

fn normalAngleGate(value: f32) -> f32 {
  let x = clamp(value, 0.0, 1.0);
  return clamp(x + x * x - x * x * x, 0.0, 1.0);
}

fn shapeLocalPos(shape: ShapeData, pos: vec2f) -> vec2f {
  return vec2f(
    shape.inverse0.x * pos.x + shape.inverse0.y * pos.y + shape.inverse0.z,
    shape.inverse1.x * pos.x + shape.inverse1.y * pos.y + shape.inverse1.z,
  );
}

fn superellipseLength(v: vec2f, exponent: f32) -> f32 {
  let a = abs(v);
  return pow(pow(a.x, exponent) + pow(a.y, exponent), 1.0 / exponent);
}

// CPU hit testing mirrors this in renderer/interaction.ts. If this p-norm
// approximation changes, update that path at the same time.
fn sdSmoothRoundRect(localPos: vec2f, halfSize: vec2f, radius: f32, cornerSmoothing: f32) -> f32 {
  let cornerLimit = min(halfSize.x, halfSize.y);
  let clampedRadius = min(max(radius, 0.0), cornerLimit);
  let q = abs(localPos) - halfSize + vec2f(clampedRadius);
  let maxSmoothingThatFits = select(
    0.0,
    max(cornerLimit / max(radius, SDF_EPSILON) - 1.0, 0.0),
    radius > SDF_EPSILON,
  );
  let effectiveSmoothing = min(clamp(cornerSmoothing, 0.0, 1.0), maxSmoothingThatFits);
  let exponent = CIRCULAR_CORNER_EXPONENT + effectiveSmoothing * CORNER_SMOOTHING_EXPONENT_DELTA;
  let cornerDistance = superellipseLength(max(q, vec2f(0.0)), exponent);
  return cornerDistance + min(max(q.x, q.y), 0.0) - clampedRadius;
}

fn shapeDistanceFromLocal(shape: ShapeData, localPos: vec2f) -> f32 {
  let halfSize = shape.geometry.xy;
  let localDistance = sdSmoothRoundRect(
    localPos - halfSize,
    halfSize,
    shape.inverse1.w,
    shape.geometry.z,
  );
  return localDistance * shape.inverse0.w;
}

fn shapeDistance(shape: ShapeData, pos: vec2f) -> f32 {
  return shapeDistanceFromLocal(shape, shapeLocalPos(shape, pos));
}

fn shapeGradient(shape: ShapeData, pos: vec2f) -> vec2f {
  let eps = SDF_GRADIENT_STEP_PX;
  return normalizeSdfGradient(vec2f(
    shapeDistance(shape, pos + vec2f(eps, 0.0)) - shapeDistance(shape, pos - vec2f(eps, 0.0)),
    shapeDistance(shape, pos + vec2f(0.0, eps)) - shapeDistance(shape, pos - vec2f(0.0, eps)),
  ));
}

fn submersionGridValue(shape: ShapeData, x: i32, y: i32, columns: u32, rows: u32) -> f32 {
  let clampedX = u32(clamp(x, 0, i32(columns) - 1));
  let clampedY = u32(clamp(y, 0, i32(rows) - 1));
  let cellIndex = u32(round(shape.submersionGrid.x)) + clampedY * columns + clampedX;
  let packedValues = submersionCells[cellIndex / 4u].values;
  return packedValues[cellIndex % 4u];
}

fn submersionGridCutoffWeight(offset: f32, kernelRadius: i32) -> f32 {
  let radius = f32(kernelRadius) + 0.5;
  let t = clamp((radius - abs(offset)) * 2.0, 0.0, 1.0);
  return t * t * (3.0 - 2.0 * t);
}

fn submersionGridGaussianWeight(offset: vec2f, kernelRadius: i32) -> f32 {
  return exp(-0.5 * dot(offset, offset)) *
    submersionGridCutoffWeight(offset.x, kernelRadius) *
    submersionGridCutoffWeight(offset.y, kernelRadius);
}

fn shapeSubmergedArea(shape: ShapeData, localPos: vec2f) -> f32 {
  if (globals.sdfParams0.x <= 0.5) {
    return 0.0;
  }

  let size = max(shape.geometry.xy * 2.0, vec2f(SDF_EPSILON));
  let uv = clamp(localPos / size, vec2f(0.0), vec2f(1.0));
  let columns = max(u32(round(shape.submersionGrid.y)), 1u);
  let rows = max(u32(round(shape.submersionGrid.z)), 1u);
  let gridCoord = uv * vec2f(f32(columns), f32(rows)) - vec2f(0.5);
  let center = vec2i(floor(gridCoord + vec2f(0.5)));
  let kernelRadius = SDF_BLEND_SUPPORT_KERNEL_RADIUS;
  var weightedSum = 0.0;
  var weightSum = 0.0;

  for (var offsetY = -2; offsetY <= 2; offsetY += 1) {
    for (var offsetX = -2; offsetX <= 2; offsetX += 1) {
      if (abs(offsetX) > kernelRadius || abs(offsetY) > kernelRadius) {
        continue;
      }
      let cell = center + vec2i(offsetX, offsetY);
      let offset = vec2f(cell) - gridCoord;
      let weight = submersionGridGaussianWeight(offset, kernelRadius);
      weightedSum += submersionGridValue(shape, cell.x, cell.y, columns, rows) * weight;
      weightSum += weight;
    }
  }

  if (weightSum <= SDF_EPSILON) {
    return submersionGridValue(shape, center.x, center.y, columns, rows);
  }

  return weightedSum / weightSum;
}

fn shapeSdfSample(shape: ShapeData, pos: vec2f) -> SdfSample {
  let localPos = shapeLocalPos(shape, pos);
  return SdfSample(
    shapeDistanceFromLocal(shape, localPos),
    shapeGradient(shape, pos),
    shapeSubmergedArea(shape, localPos),
  );
}

fn normalGateForSamples(left: SdfSample, right: SdfSample) -> f32 {
  let normalAlignment = clamp(dot(left.gradient, right.gradient), -1.0, 1.0);
  var normalGate = 1.0;
  if (globals.sdf.x > 0.5) {
    let normalizedAngle = acos(normalAlignment) * SDF_NORMAL_ANGLE_INV_PI;
    normalGate = normalAngleGate(normalizedAngle);
  }
  return normalGate;
}

fn smoothUnionWeight(left: SdfSample, right: SdfSample, blendDistance: f32) -> f32 {
  return clamp(0.5 + 0.5 * (right.distance - left.distance) / max(blendDistance, SDF_EPSILON), 0.0, 1.0);
}

fn hardUnionResult(leftDistance: f32, rightDistance: f32) -> SmoothUnionResult {
  if (leftDistance <= rightDistance) {
    return SmoothUnionResult(leftDistance, 1.0, 0.0);
  }

  return SmoothUnionResult(rightDistance, 0.0, 1.0);
}

fn finiteSmoothUnionResult(
  leftDistance: f32,
  rightDistance: f32,
  correction: f32,
  correctionDerivative: f32,
) -> SmoothUnionResult {
  let leftIsMin = leftDistance <= rightDistance;
  let leftWeight = select(correctionDerivative, 1.0 - correctionDerivative, leftIsMin);
  return SmoothUnionResult(
    min(leftDistance, rightDistance) - correction,
    leftWeight,
    1.0 - leftWeight,
  );
}

fn conservativeSmoothUnionResult(leftDistance: f32, rightDistance: f32, blendDistance: f32) -> SmoothUnionResult {
  let k = max(blendDistance, SDF_EPSILON);
  let progress = clamp(1.0 - abs(leftDistance - rightDistance) / k, 0.0, 1.0);
  if (progress <= SDF_EPSILON) {
    return hardUnionResult(leftDistance, rightDistance);
  }

  let acceleration = clamp(globals.sdfParams0.y, 0.0, 1.0);
  let inverseProgress = 1.0 - progress;
  let remappedProgress = clamp(
    progress - acceleration * progress * inverseProgress * inverseProgress,
    0.0,
    1.0,
  );
  let remapDerivative = 1.0 - acceleration * (
    inverseProgress * inverseProgress -
    2.0 * progress * inverseProgress
  );
  let correction = k * SDF_SMOOTH_UNION_DEPTH * remappedProgress * remappedProgress;
  let derivative = clamp(2.0 * SDF_SMOOTH_UNION_DEPTH * remappedProgress * remapDerivative, 0.0, 1.0);
  return finiteSmoothUnionResult(leftDistance, rightDistance, correction, derivative);
}

fn smoothUnionResult(leftDistance: f32, rightDistance: f32, blendDistance: f32) -> SmoothUnionResult {
  return conservativeSmoothUnionResult(leftDistance, rightDistance, blendDistance);
}

fn smoothstep01(value: f32) -> f32 {
  let x = clamp(value, 0.0, 1.0);
  return x * x * (3.0 - 2.0 * x);
}

fn submergedAreaKScale(submergedArea: f32) -> f32 {
  if (globals.sdfParams0.x <= 0.5) {
    return 1.0;
  }

  let area = clamp(submergedArea, 0.0, 1.0);
  return 1.0 - smoothstep01(area);
}

fn smoothUnion(
  left: SdfSample,
  right: SdfSample,
  smoothing: f32,
  normalGate: f32,
) -> SdfSample {
  let baseBlendDistance = smoothing * normalGate;

  if (baseBlendDistance <= SDF_EPSILON) {
    return hardUnion(left, right);
  }

  let baseH = smoothUnionWeight(left, right, baseBlendDistance);
  let submergedArea = mix(right.submergedArea, left.submergedArea, baseH);
  let kScale = submergedAreaKScale(submergedArea);
  let blendDistance = baseBlendDistance * kScale;

  if (blendDistance <= SDF_EPSILON) {
    return hardUnion(left, right);
  }

  let unionResult = smoothUnionResult(left.distance, right.distance, blendDistance);
  return SdfSample(
    unionResult.distance,
    normalizeSdfGradient(left.gradient * unionResult.leftWeight + right.gradient * unionResult.rightWeight),
    submergedArea,
  );
}

fn sceneSdfSample(pos: vec2f, shapeCount: u32, smoothing: f32) -> SdfSample {
  var result = SdfSample(1e5, vec2f(0.0, -1.0), 0.0);
  var found = false;

  for (var i = 0u; i < shapeCount; i = i + 1u) {
    let nextSample = shapeSdfSample(shapes[i], pos);
    if (!found) {
      result = nextSample;
      found = true;
    } else {
      let centerNormalGate = normalGateForSamples(result, nextSample);
      result = smoothUnion(result, nextSample, smoothing, centerNormalGate);
    }
  }

  return result;
}

fn smootherstep(value: f32) -> f32 {
  let x = clamp(value, 0.0, 1.0);
  return x * x * x * (x * (x * 6.0 - 15.0) + 10.0);
}

fn smootherstepDerivative(value: f32) -> f32 {
  let x = clamp(value, 0.0, 1.0);
  return 30.0 * x * x * (x * (x - 2.0) + 1.0);
}

fn convexSquircle(x: f32) -> vec2f {
  let u = 1.0 - clamp(x, 0.0, 1.0);
  let inside = max(1.0 - pow(u, 4.0), 0.0001);
  let height = sqrt(inside);
  let derivative = 2.0 * pow(u, 3.0) / sqrt(inside);
  return vec2f(height, derivative);
}

fn concaveCircle(x: f32) -> vec2f {
  let squircle = convexSquircle(x);
  return vec2f(1.0 - squircle.x, -squircle.y);
}

fn evaluateHeightProfile(profileIndex: f32, x: f32) -> vec2f {
  if (profileIndex < 0.5) {
    return convexSquircle(x);
  }

  if (profileIndex < 1.5) {
    return concaveCircle(x);
  }

  let convex = convexSquircle(x);
  let concave = concaveCircle(x);
  let blend = smootherstep(x);
  let blendDerivative = smootherstepDerivative(x);
  let height = mix(convex.x, concave.x, blend);
  let derivative = mix(convex.y, concave.y, blend) + (concave.x - convex.x) * blendDerivative;
  return vec2f(height, derivative);
}

@vertex
fn vertexMain(@builtin(vertex_index) vertexIndex: u32) -> VertexOutput {
  var positions = array<vec2f, 3>(
    vec2f(-1.0, -3.0),
    vec2f(-1.0, 1.0),
    vec2f(3.0, 1.0),
  );

  let position = positions[vertexIndex];
  var output: VertexOutput;
  output.position = vec4f(position, 0.0, 1.0);
  output.uv = vec2f(position.x * 0.5 + 0.5, 0.5 - position.y * 0.5);
  return output;
}
`,ut=`
${Ie}

@group(0) @binding(0) var<uniform> globals: Globals;
@group(0) @binding(1) var<storage, read> shapes: array<ShapeData>;
@group(0) @binding(2) var<storage, read> submersionCells: array<SubmersionCellData>;

@fragment
fn fragmentMain(in: VertexOutput) -> @location(0) vec4f {
  let shapeCount = u32(globals.shape.z);
  let fragCoord = in.uv * globals.canvas.xy;
  let sdfSample = sceneSdfSample(fragCoord, shapeCount, globals.shape.x);
  let distance = sdfSample.distance;
  let fillMask = 1.0 - smoothstep(0.0, 1.4, distance);
  let pixelWidth = max(fwidth(distance), 0.75);
  let bezelWidth = max(globals.shape.y, pixelWidth * 2.0);
  let inwardDistance = max(-distance, 0.0);
  let bezelProgress = clamp(inwardDistance / bezelWidth, 0.0, 1.0);
  let surfaceDerivative = select(
    evaluateHeightProfile(globals.shape.w, bezelProgress).y,
    0.0,
    inwardDistance > bezelWidth,
  );
  let clampedSlope = min(surfaceDerivative, tan(1.4835298));
  let surfaceSlope = sdfSample.gradient * clampedSlope;

  return vec4f(surfaceSlope * fillMask, 0.0, fillMask);
}
`,dt=`
${Ie}

@group(0) @binding(0) var<uniform> globals: Globals;
@group(0) @binding(1) var<storage, read> shapes: array<ShapeData>;
@group(0) @binding(2) var<storage, read> submersionCells: array<SubmersionCellData>;

@fragment
fn fragmentMain(in: VertexOutput) -> @location(0) vec4f {
  let shapeCount = u32(globals.shape.z);
  let fragCoord = in.uv * globals.canvas.xy;
  let shadowCoord = fragCoord - globals.shadow.xy;
  let distance = sceneSdfSample(shadowCoord, shapeCount, globals.shape.x).distance - globals.shadow.z;
  let pixelWidth = max(fwidth(distance), 0.75);
  let alpha = 1.0 - smoothstep(0.0, pixelWidth, distance);

  return vec4f(0.0, 0.0, 0.0, alpha);
}
`,pt=`
${de.wgsl("Globals")}
${pe}

@group(0) @binding(0) var shadowSampler: sampler;
@group(0) @binding(1) var sceneTexture: texture_2d<f32>;
@group(0) @binding(2) var shadowMaskTexture: texture_2d<f32>;
@group(0) @binding(3) var<uniform> globals: Globals;

@fragment
fn fragmentMain(in: VertexOutput) -> @location(0) vec4f {
  let sceneColor = textureSampleLevel(sceneTexture, shadowSampler, in.uv, 0.0);
  let shadowMask = textureSampleLevel(shadowMaskTexture, shadowSampler, in.uv, 0.0).a;
  let containerOpacity = clamp(globals.container.x, 0.0, 1.0);
  let shadowOpacity = clamp(shadowMask * globals.shadowColor.a * containerOpacity, 0.0, 1.0);
  let color = mix(sceneColor.rgb, globals.shadowColor.rgb, shadowOpacity);

  return vec4f(color, sceneColor.a);
}
`,ht=`
${Ie}

@group(0) @binding(0) var<uniform> globals: Globals;
@group(0) @binding(1) var<storage, read> shapes: array<ShapeData>;
@group(0) @binding(2) var<storage, read> submersionCells: array<SubmersionCellData>;
@group(0) @binding(3) var backgroundSampler: sampler;
@group(0) @binding(4) var backgroundTextureSharp: texture_2d<f32>;
@group(0) @binding(5) var backgroundTextureBlurred: texture_2d<f32>;
@group(0) @binding(6) var glassContentTexture: texture_2d<f32>;

${ne.wgsl("ContentData")}

@group(0) @binding(7) var<storage, read> contentEntries: array<ContentData>;
@group(0) @binding(8) var displacementFieldTexture: texture_2d<f32>;

fn sampleBackgroundSharp(uv: vec2f) -> vec3f {
  return textureSampleLevel(backgroundTextureSharp, backgroundSampler, uv, 0.0).rgb;
}

fn sampleBackgroundBlurred(uv: vec2f) -> vec3f {
  return textureSampleLevel(backgroundTextureBlurred, backgroundSampler, uv, 0.0).rgb;
}

fn sampleSurfaceSlope(uv: vec2f) -> vec2f {
  let field = textureSampleLevel(displacementFieldTexture, backgroundSampler, uv, 0.0);
  return select(vec2f(0.0), field.xy / max(field.a, SDF_EPSILON), field.a > SDF_EPSILON);
}

fn contentLocalPos(content: ContentData, glassLocalPos: vec2f) -> vec2f {
  return vec2f(
    content.inverse0.x * glassLocalPos.x + content.inverse0.y * glassLocalPos.y + content.inverse0.z,
    content.inverse1.x * glassLocalPos.x + content.inverse1.y * glassLocalPos.y + content.inverse1.z,
  );
}

fn sampleGlassContentAtlas(content: ContentData, localPos: vec2f) -> vec4f {
  let copiedSize = vec2f(content.inverse0.w, content.inverse1.w);
  if (
    any(copiedSize <= vec2f(0.0)) ||
    any(content.atlasRect.zw <= vec2f(0.0)) ||
    any(localPos < vec2f(0.0)) ||
    any(localPos > copiedSize)
  ) {
    return vec4f(0.0);
  }

  let atlasUv = content.atlasRect.xy + localPos * content.atlasRect.zw;
  let contentColor = textureSampleLevel(glassContentTexture, backgroundSampler, atlasUv, 0.0);
  return vec4f(contentColor.rgb, contentColor.a * clamp(content.opacity.x, 0.0, 1.0));
}

fn sampleGlassContentEntry(
  content: ContentData,
  glassLocalRed: vec2f,
  glassLocalGreen: vec2f,
  glassLocalBlue: vec2f,
  contentMask: f32,
) -> vec4f {
  if (contentMask <= 0.0) {
    return vec4f(0.0);
  }

  let contentRed = sampleGlassContentAtlas(content, contentLocalPos(content, glassLocalRed));
  let contentGreen = sampleGlassContentAtlas(content, contentLocalPos(content, glassLocalGreen));
  let contentBlue = sampleGlassContentAtlas(content, contentLocalPos(content, glassLocalBlue));
  let alpha = max(contentGreen.a, max(contentRed.a, contentBlue.a)) * contentMask;
  return vec4f(vec3f(contentRed.r, contentGreen.g, contentBlue.b), alpha);
}

@fragment
fn fragmentMain(in: VertexOutput) -> @location(0) vec4f {
  let shapeCount = u32(globals.shape.z);
  let fragCoord = in.uv * globals.canvas.xy;
  let background = sampleBackgroundSharp(in.uv);
  let containerOpacity = clamp(globals.container.x, 0.0, 1.0);

  let sdfSample = sceneSdfSample(fragCoord, shapeCount, globals.shape.x);
  let distance = sdfSample.distance;
  let fillMask = 1.0 - smoothstep(0.0, 1.4, distance);
  let gradient = sdfSample.gradient;
  let pixelWidth = max(fwidth(distance), 0.75);
  let specularDistanceUnitsPerPx = max(
    length(vec2f(dpdx(distance), dpdy(distance))),
    SPECULAR_DISTANCE_SCALE_FLOOR,
  );
  let specularDistancePx = distance / specularDistanceUnitsPerPx;
  let specularInwardDistancePx = max(-specularDistancePx, 0.0);
  let rimWidthPx = max(globals.specular.y, 0.0001);
  let specularOuterMask = 1.0 - smoothstep(0.0, SPECULAR_EDGE_FEATHER_PX, specularDistancePx);
  let specularInnerMask = 1.0 - smoothstep(
    rimWidthPx,
    rimWidthPx + SPECULAR_EDGE_FEATHER_PX,
    specularInwardDistancePx,
  );
  let rimBandMask = specularOuterMask * specularInnerMask;
  let rimNormal = gradient;
  let lightDir = normalize(
    select(vec2f(1.0, 0.0), globals.lighting.xy, dot(globals.lighting.xy, globals.lighting.xy) > 0.0001),
  );
  let mirroredLightDir = -lightDir;

  let bezelWidth = max(globals.shape.y, pixelWidth * 2.0);
  let inwardDistance = max(-distance, 0.0);
  let bezelProgress = clamp(inwardDistance / bezelWidth, 0.0, 1.0);
  let profileResult = evaluateHeightProfile(globals.shape.w, bezelProgress);
  let profileHeight = profileResult.x * bezelWidth;
  let flatHeight = evaluateHeightProfile(globals.shape.w, 1.0).x * bezelWidth;
  let surfaceHeight = globals.glass.x + select(profileHeight, flatHeight, inwardDistance > bezelWidth);
  let surfaceSlope = sampleSurfaceSlope(in.uv);

  // The displacement prepass filters the 2D bevel slope before we rebuild the
  // 3D surface normal. Keeping this as a surface field, rather than a final
  // pixel displacement, lets the glass and content refraction paths still use
  // their own IOR, depth, and dispersion settings.
  let surfaceNormal = normalize(vec3f(surfaceSlope, 1.0));
  let dispersion = max(globals.glass.w, 0.0);
  let baseIor = max(globals.glass.z, 1.0001);
  let refractedRayRed = refract(
    vec3f(0.0, 0.0, -1.0),
    surfaceNormal,
    1.0 / max(baseIor + dispersion, 1.0001),
  );
  let refractedRayGreen = refract(vec3f(0.0, 0.0, -1.0), surfaceNormal, 1.0 / baseIor);
  let refractedRayBlue = refract(
    vec3f(0.0, 0.0, -1.0),
    surfaceNormal,
    1.0 / max(baseIor - dispersion, 1.0001),
  );
  let displacementPxRed = select(
    refractedRayRed.xy / max(-refractedRayRed.z, 0.0001) * surfaceHeight * globals.glass.y,
    vec2f(0.0),
    fillMask <= 0.0,
  );
  let displacementPxGreen = select(
    refractedRayGreen.xy / max(-refractedRayGreen.z, 0.0001) * surfaceHeight * globals.glass.y,
    vec2f(0.0),
    fillMask <= 0.0,
  );
  let displacementPxBlue = select(
    refractedRayBlue.xy / max(-refractedRayBlue.z, 0.0001) * surfaceHeight * globals.glass.y,
    vec2f(0.0),
    fillMask <= 0.0,
  );
  if (globals.debug.x > 0.5) {
    // Signed pixel displacement is centered at 0.5 for display in the color target:
    // red/green hold x/y displacement, blue stays zero.
    let debugDisplacement = displacementPxGreen * DEBUG_DISPLACEMENT_ENCODE_SCALE + vec2f(0.5);
    let debugColor = mix(background, vec3f(debugDisplacement, 0.0), fillMask);
    return vec4f(mix(background, debugColor, containerOpacity), 1.0);
  }
  let contentBaseIor = max(globals.content.x, 1.0001);
  let contentRefractedRayRed = refract(
    vec3f(0.0, 0.0, -1.0),
    surfaceNormal,
    1.0 / max(contentBaseIor + dispersion, 1.0001),
  );
  let contentRefractedRayGreen = refract(vec3f(0.0, 0.0, -1.0), surfaceNormal, 1.0 / contentBaseIor);
  let contentRefractedRayBlue = refract(
    vec3f(0.0, 0.0, -1.0),
    surfaceNormal,
    1.0 / max(contentBaseIor - dispersion, 1.0001),
  );
  let contentDisplacementPxRed = select(
    contentRefractedRayRed.xy /
      max(-contentRefractedRayRed.z, 0.0001) *
      globals.content.y *
      globals.glass.y,
    vec2f(0.0),
    fillMask <= 0.0,
  );
  let contentDisplacementPxGreen = select(
    contentRefractedRayGreen.xy /
      max(-contentRefractedRayGreen.z, 0.0001) *
      globals.content.y *
      globals.glass.y,
    vec2f(0.0),
    fillMask <= 0.0,
  );
  let contentDisplacementPxBlue = select(
    contentRefractedRayBlue.xy /
      max(-contentRefractedRayBlue.z, 0.0001) *
      globals.content.y *
      globals.glass.y,
    vec2f(0.0),
    fillMask <= 0.0,
  );
  let refractedUvRed = in.uv + displacementPxRed / globals.canvas.xy;
  let refractedUvGreen = in.uv + displacementPxGreen / globals.canvas.xy;
  let refractedUvBlue = in.uv + displacementPxBlue / globals.canvas.xy;
  let refractedColor = vec3f(
    sampleBackgroundBlurred(refractedUvRed).r,
    sampleBackgroundBlurred(refractedUvGreen).g,
    sampleBackgroundBlurred(refractedUvBlue).b,
  );
  let reflectedUv = in.uv + rimNormal * globals.specularSecondary.z / globals.canvas.xy;
  let reflectedColor = sampleBackgroundBlurred(reflectedUv);
  let glass = mix(refractedColor, globals.tint.rgb, globals.tint.a);
  let refractedLuma = dot(refractedColor, vec3f(0.2126, 0.7152, 0.0722));
  let reflectedLuma = dot(reflectedColor, vec3f(0.2126, 0.7152, 0.0722));

  // Reflection only shows when the reflected sample is bright enough and the refracted sample
  // underneath is dark enough to accept it.
  let reflectionPresence = smoothstep(0.2, 0.85, reflectedLuma);
  let refractionAcceptance = 1.0 - smoothstep(0.35, 0.85, refractedLuma);
  let reflectionBlend = reflectionPresence * refractionAcceptance;
  let edgeSpecularColor = mix(refractedColor, reflectedColor, reflectionBlend);

  // Content rendered into per-glass canvas children is sampled from its own sharp atlas,
  // refracted with the same displacement field, and then layered over the tinted backdrop
  // before any specular contributions are applied.
  var glassInterior = glass;
  for (var i = 0u; i < shapeCount; i = i + 1u) {
    let shape = shapes[i];
    let contentStart = u32(shape.contentRange.x);
    let contentCount = u32(shape.contentRange.y);
    let shapeDistanceAtFrag = shapeDistance(shape, fragCoord);
    let contentBand = max(globals.shape.x, pixelWidth);
    let contentMask = 1.0 - smoothstep(contentBand, contentBand + pixelWidth, shapeDistanceAtFrag);
    let glassLocalRed = shapeLocalPos(shape, fragCoord + contentDisplacementPxRed);
    let glassLocalGreen = shapeLocalPos(shape, fragCoord + contentDisplacementPxGreen);
    let glassLocalBlue = shapeLocalPos(shape, fragCoord + contentDisplacementPxBlue);

    for (var contentOffset = 0u; contentOffset < contentCount; contentOffset = contentOffset + 1u) {
      let contentLayer = sampleGlassContentEntry(
        contentEntries[contentStart + contentOffset],
        glassLocalRed,
        glassLocalGreen,
        glassLocalBlue,
        contentMask,
      );
      glassInterior = mix(glassInterior, contentLayer.rgb, contentLayer.a);
    }
  }

  // White specular is a separate rim-only highlight driven by 2D normal/light alignment and
  // then masked back to the configured rim band. The mask uses derivative-scaled
  // screen-pixel distance so smooth SDF blends do not stretch hairline highlights.
  let primaryBandProgress = clamp(
    specularInwardDistancePx / max(rimWidthPx, SPECULAR_EDGE_FEATHER_PX),
    0.0,
    1.0,
  );
  let oppositeBandProgress = primaryBandProgress;
  let primaryStrength = globals.specular.x - globals.specularSecondary.y * primaryBandProgress * primaryBandProgress;
  let oppositeStrength =
    globals.specularSecondary.x - globals.specularSecondary.y * oppositeBandProgress * oppositeBandProgress;
  let oppositeRimBandMask = rimBandMask;
  let rimSpecular = pow(max(dot(rimNormal, lightDir), 0.0), globals.specular.z);
  let mirroredRimSpecular = pow(max(dot(rimNormal, mirroredLightDir), 0.0), globals.specular.z);
  let primarySpecularOpacity = clamp(rimSpecular * primaryStrength, 0.0, 1.0);
  let oppositeSpecularOpacity = clamp(mirroredRimSpecular * oppositeStrength, 0.0, 1.0);
  let combinedRimSpecularOpacity = clamp(
    primarySpecularOpacity * rimBandMask + oppositeSpecularOpacity * oppositeRimBandMask,
    0.0,
    1.0,
  );
  let whiteSpecularOpacity = combinedRimSpecularOpacity * globals.specular.w;
  let coloredEdgeOpacity = combinedRimSpecularOpacity;
  let whiteSpecular = vec3f(1.0) * whiteSpecularOpacity;

  var color = background;
  if (fillMask > 0.0) {
    color = mix(color, glassInterior, fillMask);
    color = mix(color, edgeSpecularColor, coloredEdgeOpacity);
    color = color + whiteSpecular;
  }

  return vec4f(mix(background, color, containerOpacity), 1.0);
}
`,mt=`
${Ie}

${we.wgsl("MetricsBounds")}

@group(0) @binding(0) var<uniform> globals: Globals;
@group(0) @binding(1) var<storage, read> shapes: array<ShapeData>;
@group(0) @binding(2) var<storage, read> submersionCells: array<SubmersionCellData>;
@group(0) @binding(3) var metricsSampler: sampler;
@group(0) @binding(4) var blurredBackdrop: texture_2d<f32>;
@group(0) @binding(5) var<uniform> metricsBounds: MetricsBounds;

@fragment
fn fragmentMain(in: VertexOutput) -> @location(0) vec4f {
  let shapeCount = u32(globals.shape.z);
  let positionPx = mix(metricsBounds.bounds.xy, metricsBounds.bounds.zw, in.uv);
  let insideCanvas =
    all(positionPx >= vec2f(0.0)) &&
    all(positionPx <= globals.canvas.xy);
  let distance = sceneSdfSample(positionPx, shapeCount, globals.shape.x).distance;
  // This uses bezel width as the interior cutoff. For heavily fused shapes with
  // spacing wider than the bezel, the transition band can extend past this threshold,
  // but we accept that simplification for now because it does not occur in our target use cases.
  let isInterior = insideCanvas && distance <= -globals.shape.y;
  let color = textureSampleLevel(blurredBackdrop, metricsSampler, positionPx / globals.canvas.xy, 0.0).rgb;
  return vec4f(color, select(0.0, 1.0, isInterior));
}
`,ft=`
${Ae.wgsl("HtmlCompositeParams")}

@group(0) @binding(0) var compositeSampler: sampler;
@group(0) @binding(1) var sceneTexture: texture_2d<f32>;
@group(0) @binding(2) var htmlTexture: texture_2d<f32>;
@group(0) @binding(3) var<uniform> params: HtmlCompositeParams;

struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) uv: vec2f,
};

@vertex
fn vertexMain(@builtin(vertex_index) vertexIndex: u32) -> VertexOutput {
  var positions = array<vec2f, 3>(
    vec2f(-1.0, -3.0),
    vec2f(-1.0, 1.0),
    vec2f(3.0, 1.0),
  );

  let position = positions[vertexIndex];
  var output: VertexOutput;
  output.position = vec4f(position, 0.0, 1.0);
  output.uv = vec2f(position.x * 0.5 + 0.5, 0.5 - position.y * 0.5);
  return output;
}

@fragment
fn fragmentMain(in: VertexOutput) -> @location(0) vec4f {
  let sceneColor = textureSampleLevel(sceneTexture, compositeSampler, in.uv, 0.0);
  let fragCoord = in.uv * params.canvas.xy;
  let localPos = vec2f(
    params.inverse0.x * fragCoord.x + params.inverse0.y * fragCoord.y + params.inverse0.z,
    params.inverse1.x * fragCoord.x + params.inverse1.y * fragCoord.y + params.inverse1.z,
  );
  let copiedSize = vec2f(params.inverse0.w, params.inverse1.w);

  if (
    any(params.canvas.zw <= vec2f(0.0)) ||
    any(copiedSize <= vec2f(0.0)) ||
    any(localPos < vec2f(0.0)) ||
    any(localPos > copiedSize)
  ) {
    return sceneColor;
  }

  let htmlColor = textureSampleLevel(htmlTexture, compositeSampler, localPos * params.canvas.zw, 0.0);
  let htmlAlpha = htmlColor.a * clamp(params.opacity.x, 0.0, 1.0);
  return vec4f(mix(sceneColor.rgb, htmlColor.rgb, htmlAlpha), 1.0);
}
`;var C={MAP_READ:1,UNIFORM:64,STORAGE:128,COPY_DST:8},x={COPY_SRC:1,TEXTURE_BINDING:4,COPY_DST:2,RENDER_ATTACHMENT:16};var Qt={r:0,g:0,b:0,a:1};function R(n,e,t){return n.createBindGroup({layout:e.getBindGroupLayout(0),entries:t})}function Le(n,e,t=Qt){n.beginRenderPass({colorAttachments:[{clearValue:t,loadOp:"clear",storeOp:"store",view:e.createView()}]}).end()}function D(n,{pipeline:e,bindGroup:t,target:r,clearValue:i=Qt}){let s=n.beginRenderPass({colorAttachments:[{clearValue:i,loadOp:"clear",storeOp:"store",view:r.createView()}]});s.setPipeline(e),s.setBindGroup(0,t),s.draw(3),s.end()}var Oe=class{constructor(e,t){this.device=e;this.encoder=e.createCommandEncoder(),this.currentTexture=t.sceneA,this.nextTexture=t.sceneB,Le(this.encoder,this.currentTexture)}encoder;currentTexture;nextTexture;get current(){return this.currentTexture}get next(){return this.nextTexture}submitAndSwap(){this.device.queue.submit([this.encoder.finish()]),this.encoder=this.device.createCommandEncoder();let e=this.currentTexture;this.currentTexture=this.nextTexture,this.nextTexture=e}submit(){this.device.queue.submit([this.encoder.finish()])}};var Cn=6,Ue={r:0,g:0,b:0,a:0};function Pn(n,e){let t=Number.isFinite(e)?Math.max(0,Math.floor(e)):0,r=Number.isFinite(n)?Math.max(n,0):0;if(r<=0)return{skip:!0,level:0,scale:1,effectiveRadius:0};let i=Math.ceil(Math.log2(r/Cn)),s=Math.min(Math.max(i,0),t),a=2**s;return{skip:!1,level:s,scale:a,effectiveRadius:r/a}}function re(n,e){let t=n.createShaderModule({code:qt}),r=n.createShaderModule({code:Kt}),i=n.createShaderModule({code:$t}),s=C.UNIFORM|C.COPY_DST;return{pipelines:{downsample:gt(n,e,t),blur:gt(n,e,r),upsample:gt(n,e,i)},horizontalBuffer:new U(n,ue,s),verticalBuffer:new U(n,ue,s)}}function Z(n){n?.horizontalBuffer.destroy(),n?.verticalBuffer.destroy()}function j({device:n,sampler:e,encoder:t,source:r,radiusPx:i,chain:s,resources:a}){if(s.levels.length===0)return r;let o=Pn(i,s.levels.length-1);if(o.skip)return r;let l=r;for(let u=1;u<=o.level;u+=1){let d=s.levels[u],f=R(n,a.pipelines.downsample,[{binding:0,resource:e},{binding:1,resource:l.createView()}]);D(t,{pipeline:a.pipelines.downsample,bindGroup:f,target:d.ping,clearValue:Ue}),l=d.ping}let c=s.levels[o.level];En(o.effectiveRadius,a.horizontalBuffer,a.verticalBuffer);let m=R(n,a.pipelines.blur,[{binding:0,resource:e},{binding:1,resource:l.createView()},{binding:2,resource:a.horizontalBuffer.bindingResource}]);D(t,{pipeline:a.pipelines.blur,bindGroup:m,target:c.pong,clearValue:Ue});let p=R(n,a.pipelines.blur,[{binding:0,resource:e},{binding:1,resource:c.pong.createView()},{binding:2,resource:a.verticalBuffer.bindingResource}]);D(t,{pipeline:a.pipelines.blur,bindGroup:p,target:c.ping,clearValue:Ue}),l=c.ping;for(let u=o.level-1;u>=0;u-=1){let d=s.levels[u],f=R(n,a.pipelines.upsample,[{binding:0,resource:e},{binding:1,resource:l.createView()}]);D(t,{pipeline:a.pipelines.upsample,bindGroup:f,target:d.pong,clearValue:Ue}),l=d.pong}return l}function gt(n,e,t){return n.createRenderPipeline({layout:"auto",vertex:{module:t,entryPoint:"vertexMain"},fragment:{module:t,entryPoint:"fragmentMain",targets:[{format:e}]},primitive:{topology:"triangle-list"}})}function En(n,e,t){let r=Math.max(n,0);e.write({params:{directionX:1,directionY:0,radius:r}}),t.write({params:{directionX:0,directionY:1,radius:r}})}function H(n,e,t,r){return n.createTexture({size:{width:t,height:r,depthOrArrayLayers:1},format:e,usage:x.COPY_SRC|x.TEXTURE_BINDING|x.RENDER_ATTACHMENT|x.COPY_DST})}function J(n,e,t,r){let i=[],s=Math.max(Math.floor(t),1),a=Math.max(Math.floor(r),1);for(;i.push({ping:H(n,e,s,a),pong:H(n,e,s,a),width:s,height:a}),!(s===1&&a===1);)s=Math.max(Math.ceil(s/2),1),a=Math.max(Math.ceil(a/2),1);return{format:e,levels:i}}function M(n){if(n)for(let e of n.levels)e.ping.destroy(),e.pong.destroy()}function vt(n){n&&(M(n.backdropBlur),M(n.displacementBlur),M(n.shadowBlur),n.sceneA.destroy(),n.sceneB.destroy())}function X(n,e,t,r){let i=Math.floor(r.width),s=Math.floor(r.height);return i<=0||s<=0?!1:(n.copyTextureToTexture({texture:e,origin:{x:Math.floor(r.sourceX),y:Math.floor(r.sourceY),z:0}},{texture:t,origin:{x:Math.floor(r.destinationX),y:Math.floor(r.destinationY),z:0}},{width:i,height:s,depthOrArrayLayers:1}),!0)}var Zt=1e-4;function Gn(n,e,t){return Math.min(Math.max(n,e),t)}function Tn(n,e,t){return(Math.abs(n)**t+Math.abs(e)**t)**(1/t)}function Rn(n,e,t,r,i,s){let a=Math.min(t,r),o=Math.min(Math.max(i,0),a),l=Math.abs(n)-t+o,c=Math.abs(e)-r+o,m=i>Zt?Math.max(a/Math.max(i,Zt)-1,0):0,p=Math.min(Gn(s,0,1),m),u=Ht(p);return Tn(Math.max(l,0),Math.max(c,0),u)+Math.min(Math.max(l,c),0)-o}function bt(n){return`matrix(${n.a}, ${n.b}, ${n.c}, ${n.d}, ${n.e}, ${n.f})`}function jt(n){let e=new Map,t=[];for(let r=0;r<n.length;r+=1){let i=n[r];for(let s of De(i.container)){let a=s.glass;if(!a.pointerEvents||a.width<=0||a.height<=0)continue;let o=L(i.transform,s.transform),l=K(o);if(!l)continue;let c={glass:a,container:i.container,containerOrder:r,glassOrder:s.traversalIndex,transform:o,inverseTransform:l,halfWidth:a.width*.5,halfHeight:a.height*.5,cornerRadius:a.cornerRadius,cornerSmoothing:a.cornerSmoothing};e.set(a,c),t.push(c)}}return t.sort((r,i)=>r.containerOrder-i.containerOrder||r.glassOrder-i.glassOrder),{entriesByGlass:e,orderedEntries:t}}function He(n,e,t){let r=A(n.inverseTransform,e,t),i=r.x-n.halfWidth,s=r.y-n.halfHeight;return{localX:r.x,localY:r.y,inside:Rn(i,s,n.halfWidth,n.halfHeight,n.cornerRadius,n.cornerSmoothing)<=0}}function Ne(n,e,t){for(let r=n.length-1;r>=0;r-=1){let i=n[r];if(He(i,e,t).inside)return i}return null}function ee(n){return Yt(n)}function he(n){return De(n)}function St(n){return Xt(n)}function Fe(n){return n.filter(e=>e.child instanceof F).map(e=>({container:e.child,transform:e.transform}))}function ke(n){let e=new Map,t=1;for(let r of n){if(r.child instanceof T){r.child.width>0&&r.child.height>0&&(e.set(r.child,t),t+=1);continue}for(let i of he(r.child))for(let s of St(i.glass)){let a=s.html;a.width>0&&a.height>0&&(e.set(a,t),t+=1)}}return e}function Jt(n,e){for(let t of n)for(let r of e)if(t===r||r.contains(t))return!0;return!1}function en(n,e,t,r){n.parentElement!==e&&e.append(n),n.style.transform!==t&&(n.style.transform=t),n.style.zIndex!==r&&(n.style.zIndex=r)}function Dn(n,e){let t=[...e.entries()].sort((s,a)=>s[1]-a[1]).map(([s])=>s.host).filter(s=>s.parentElement===n),r=new Set(t),i=Array.from(n.children).filter(s=>r.has(s));if(!(i.length===t.length&&i.every((s,a)=>s===t[a])))for(let s of t)n.append(s)}function me(n,e,t){return n<=0||e<=0||t<=0?0:n/e*t}function fe(n,e,t){return n<=0||e<=0||t<=0?0:n/e/t}function tn(n,e,t,r,i){n.copyElementImageToTexture({source:e},{destination:{texture:i},width:t,height:r})}var ie=class{constructor(e){this.options=e}sceneHtmlHosts=new Set;glassContentHosts=new Set;device=null;presentationFormat=null;sceneHtmlEntries=new Map;glassContentEntries=new Map;glassContentRanges=new Map;glassContentOrder=[];needsSceneHtmlCopy=!1;needsSceneHtmlFilter=!1;needsContentCopy=!1;needsContentFilter=!1;contentEntriesBuffer=null;glassContentAtlas=null;glassContentAtlasWidth=0;glassContentAtlasHeight=0;sampler=null;htmlBlurResources=null;get atlasTexture(){return this.glassContentAtlas}get contentEntriesBindingResource(){return this.contentEntriesBuffer?.buffer?this.contentEntriesBuffer.bindingResource:null}setDevice(e,t){this.device=e,this.presentationFormat=t,this.sampler=e.createSampler({magFilter:"linear",minFilter:"linear",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"}),Z(this.htmlBlurResources),this.htmlBlurResources=re(e,t),this.contentEntriesBuffer?.destroy(),this.contentEntriesBuffer=new z(e,ne,C.STORAGE|C.COPY_DST),this.contentEntriesBuffer.ensureCapacity(0)}destroy(){for(let e of this.sceneHtmlEntries.values())e.texture?.destroy(),M(e.blurTargetChain),e.html.host.remove();this.sceneHtmlEntries.clear(),this.sceneHtmlHosts.clear();for(let e of this.glassContentEntries.values())e.sourceTexture?.destroy(),M(e.blurTargetChain),e.html.host.remove();this.glassContentEntries.clear(),this.glassContentRanges.clear(),this.glassContentOrder=[],this.glassContentHosts.clear(),this.glassContentAtlas?.destroy(),this.glassContentAtlas=null,this.glassContentAtlasWidth=0,this.glassContentAtlasHeight=0,this.contentEntriesBuffer?.destroy(),this.contentEntriesBuffer=null,Z(this.htmlBlurResources),this.htmlBlurResources=null,this.sampler=null}handlePaintEvent(e){if(!this.device)return;let t=e.changedElements,r=Array.isArray(t),i=this.needsSceneHtmlCopy||!r||Jt(t,this.sceneHtmlHosts),s=this.needsContentCopy||!r||Jt(t,this.glassContentHosts);i&&this.copySceneHtmlTextures(),this.needsSceneHtmlFilter&&this.filterSceneHtmlTextures(),s&&this.copyGlassContentAtlas(),this.needsContentFilter&&this.filterGlassContentAtlas()}copyPending(){this.needsSceneHtmlCopy&&this.copySceneHtmlTextures(),this.needsSceneHtmlFilter&&this.filterSceneHtmlTextures(),this.needsContentCopy&&this.copyGlassContentAtlas(),this.needsContentFilter&&this.filterGlassContentAtlas()}sync(e,t,r){this.syncSceneHtml(e,r),this.syncGlassContent(t,r),Dn(this.options.targetCanvas,r)}getSceneHtmlEntry(e){return this.sceneHtmlEntries.get(e)??null}getGlassContentRange(e){return this.glassContentRanges.get(e)??null}removeSceneHtmlEntry(e,t){let r=this.sceneHtmlEntries.get(e);r&&(r.texture?.destroy(),M(r.blurTargetChain),this.sceneHtmlHosts.delete(e.host),this.sceneHtmlEntries.delete(e),t||e.host.remove())}removeGlassContentEntry(e,t){let r=this.glassContentEntries.get(e);r&&(r.sourceTexture?.destroy(),M(r.blurTargetChain),this.glassContentHosts.delete(e.host),this.glassContentEntries.delete(e),t||e.host.remove())}syncSceneHtml(e,t){let r=new Set,i=!1,s=!1,a=this.options.getCurrentDpr();for(let o of e){if(!(o.child instanceof T)||o.child.width<=0||o.child.height<=0)continue;let l=o.child;r.add(l);let c=this.sceneHtmlEntries.get(l);c||(c={html:l,texture:null,filteredTexture:null,elementVersion:-1,blur:-1,width:-1,height:-1,deviceWidth:0,deviceHeight:0,copiedDeviceWidth:0,copiedDeviceHeight:0,textureWidth:0,textureHeight:0,blurTargetChain:null,transform:o.transform,inverseTransform:null},this.sceneHtmlEntries.set(l,c),i=!0,s=!0),c.transform=o.transform,c.inverseTransform=K(Ge(o.transform,a)),c.elementVersion!==l._elementVersion&&(c.elementVersion=l._elementVersion,s=!0),c.blur!==l.blur&&(c.blur=l.blur,this.needsSceneHtmlFilter=!0);let m=c.deviceWidth,p=c.deviceHeight,u=Math.max(1,Math.round(l.width*a)),d=Math.max(1,Math.round(l.height*a)),f=c.textureWidth,b=c.textureHeight,B=!1;this.device&&(f=W(u,this.device.limits.maxTextureDimension2D),b=W(d,this.device.limits.maxTextureDimension2D),B=c.textureWidth!==f||c.textureHeight!==b);let y=c.deviceWidth!==u||c.deviceHeight!==d;if((c.width!==l.width||c.height!==l.height||y)&&(c.width=l.width,c.height=l.height,c.deviceWidth=u,c.deviceHeight=d,i=!0,s=!0),this.device&&this.presentationFormat&&(!c.texture||B)){let v=c.texture,E=this.device.createTexture({size:{width:f,height:b,depthOrArrayLayers:1},format:this.presentationFormat,usage:x.COPY_SRC|x.TEXTURE_BINDING|x.COPY_DST|x.RENDER_ATTACHMENT});if(v){let h=this.device.createCommandEncoder(),_=Math.min(c.copiedDeviceWidth,m,f),w=Math.min(c.copiedDeviceHeight,p,b);X(h,v,E,{sourceX:0,sourceY:0,destinationX:0,destinationY:0,width:_,height:w})&&this.device.queue.submit([h.finish()]),c.copiedDeviceWidth=_,c.copiedDeviceHeight=w}else c.copiedDeviceWidth=0,c.copiedDeviceHeight=0;v?.destroy(),M(c.blurTargetChain),c.texture=E,c.filteredTexture=null,c.blurTargetChain=null,c.textureWidth=f,c.textureHeight=b,i=!0,s=!0}c.texture&&(this.sceneHtmlHosts.add(l.host),en(l.host,this.options.targetCanvas,bt(o.transform),String(t.get(l)??0)))}for(let o of[...this.sceneHtmlEntries.keys()])r.has(o)||(this.removeSceneHtmlEntry(o,t.has(o)),i=!0,s=!0);if(r.size===0){this.needsSceneHtmlCopy=!1,this.needsSceneHtmlFilter=!1;return}(i||s)&&(this.needsSceneHtmlCopy=!0)}syncGlassContent(e,t){let r=new Set,i=[],s=new Map,a=this.glassContentAtlas,o=new Map,l=this.options.getCurrentDpr(),c=!1,m=!1;if(a)for(let p of this.glassContentEntries.values())o.set(p.html,{copiedDeviceWidth:p.copiedDeviceWidth,copiedDeviceHeight:p.copiedDeviceHeight,atlasX:p.atlasX,atlasY:p.atlasY});for(let p of e){let u=p.transform;for(let d of he(p.container)){let f=d.glass;if(f.width<=0||f.height<=0)continue;let b=L(u,d.transform),B=i.length;for(let S of St(f)){let v=S.html;if(v.width<=0||v.height<=0)continue;let E=K(S.transform);if(this.glassContentHosts.add(v.host),en(v.host,this.options.targetCanvas,bt(L(b,S.transform)),String(t.get(v)??0)),!E)continue;r.add(v);let h=this.glassContentEntries.get(v);h||(h={html:v,glass:f,elementVersion:-1,blur:-1,width:-1,height:-1,deviceWidth:0,deviceHeight:0,copiedDeviceWidth:0,copiedDeviceHeight:0,sourceTexture:null,sourceTextureWidth:0,sourceTextureHeight:0,filteredTexture:null,blurTargetChain:null,atlasX:0,atlasY:0,inverseTransform:E},this.glassContentEntries.set(v,h),c=!0,m=!0),h.glass!==f&&(h.glass=f,c=!0),h.inverseTransform=E,h.elementVersion!==v._elementVersion&&(h.elementVersion=v._elementVersion,m=!0);let _=Math.max(1,Math.round(v.width*l)),w=Math.max(1,Math.round(v.height*l)),O=h.sourceTextureWidth,q=h.sourceTextureHeight,se=!1;this.device&&(O=W(_,this.device.limits.maxTextureDimension2D),q=W(w,this.device.limits.maxTextureDimension2D),se=h.sourceTextureWidth!==O||h.sourceTextureHeight!==q),(h.width!==v.width||h.height!==v.height||h.deviceWidth!==_||h.deviceHeight!==w)&&(h.width=v.width,h.height=v.height,h.deviceWidth=_,h.deviceHeight=w,c=!0,m=!0),h.blur!==v.blur&&(h.blur=v.blur,this.needsContentFilter=!0),this.device&&this.presentationFormat&&(!h.sourceTexture||se)&&(h.sourceTexture?.destroy(),M(h.blurTargetChain),h.sourceTexture=H(this.device,this.presentationFormat,O,q),h.sourceTextureWidth=O,h.sourceTextureHeight=q,h.filteredTexture=null,h.blurTargetChain=null,h.copiedDeviceWidth=0,h.copiedDeviceHeight=0,m=!0),i.push(h)}let y=i.length-B;y>0&&s.set(f,{start:B,count:y})}}for(let p of[...this.glassContentEntries.keys()])r.has(p)||(this.removeGlassContentEntry(p,t.has(p)),c=!0,m=!0);this.glassContentOrder=i,this.glassContentRanges.clear();for(let[p,u]of s)this.glassContentRanges.set(p,u);if(!this.device){this.needsContentCopy=!1;return}if(i.length===0){this.glassContentAtlas?.destroy(),this.glassContentAtlas=null,this.glassContentAtlasWidth=0,this.glassContentAtlasHeight=0,this.needsContentCopy=!1,this.needsContentFilter=!1;return}if(c||!this.glassContentAtlas){let p=Vt(i,this.device.limits.maxTextureDimension2D),u=p.width,d=p.height,f=this.glassContentAtlasWidth,b=this.glassContentAtlasHeight;if(!this.glassContentAtlas||u!==this.glassContentAtlasWidth||d!==this.glassContentAtlasHeight||i.some(y=>{let S=p.rects.get(y.html);return y.atlasX!==S.x||y.atlasY!==S.y})){let y=this.device.createTexture({size:{width:u,height:d,depthOrArrayLayers:1},format:this.presentationFormat??"bgra8unorm",usage:x.COPY_SRC|x.TEXTURE_BINDING|x.COPY_DST|x.RENDER_ATTACHMENT});if(a){let S=this.device.createCommandEncoder(),v=!1;for(let E of i){let h=o.get(E.html),_=p.rects.get(E.html);if(!h){E.copiedDeviceWidth=0,E.copiedDeviceHeight=0;continue}let w=h.atlasX+1,O=h.atlasY+1,q=_.x+1,se=_.y+1,Ve=Math.min(h.copiedDeviceWidth,f-w,u-q),Tt=Math.min(h.copiedDeviceHeight,b-O,d-se);v=X(S,a,y,{sourceX:w,sourceY:O,destinationX:q,destinationY:se,width:Ve,height:Tt})||v,E.copiedDeviceWidth=Math.max(0,Ve),E.copiedDeviceHeight=Math.max(0,Tt)}v&&this.device.queue.submit([S.finish()])}else for(let S of i)S.copiedDeviceWidth=0,S.copiedDeviceHeight=0;a?.destroy(),this.glassContentAtlas=y,this.glassContentAtlasWidth=u,this.glassContentAtlasHeight=d}for(let y of i){let S=p.rects.get(y.html);y.atlasX=S.x,y.atlasY=S.y}this.needsContentCopy=!0,this.needsContentFilter=!0}else m&&(this.needsContentCopy=!0);this.writeContentEntries(i)}writeContentEntries(e){if(this.contentEntriesBuffer){this.contentEntriesBuffer.ensureCapacity(e.length);for(let t=0;t<e.length;t+=1){let r=e[t],i=r.inverseTransform;this.contentEntriesBuffer.writeAt(t,{inverse0:{a:i.a,c:i.c,e:i.e,copiedWidth:me(r.copiedDeviceWidth,r.deviceWidth,r.width)},inverse1:{b:i.b,d:i.d,f:i.f,copiedHeight:me(r.copiedDeviceHeight,r.deviceHeight,r.height)},atlasRect:{u:(r.atlasX+1)/this.glassContentAtlasWidth,v:(r.atlasY+1)/this.glassContentAtlasHeight,uScale:fe(r.deviceWidth,r.width,this.glassContentAtlasWidth),vScale:fe(r.deviceHeight,r.height,this.glassContentAtlasHeight)},opacity:{value:r.html.opacity}})}this.contentEntriesBuffer.upload(e.length)}}copySceneHtmlTextures(){if(!this.device||this.sceneHtmlEntries.size===0)return this.needsSceneHtmlCopy=!1,!0;let e=!0,t=!1;for(let r of this.sceneHtmlEntries.values()){if(!r.texture){e=!1;continue}try{tn(this.device.queue,r.html.host,r.deviceWidth,r.deviceHeight,r.texture),r.copiedDeviceWidth=r.deviceWidth,r.copiedDeviceHeight=r.deviceHeight,t=!0}catch(i){e=!1,i instanceof DOMException&&i.name==="InvalidStateError"||console.error(i)}}return t&&(this.needsSceneHtmlFilter=!0),this.needsSceneHtmlCopy=!e,e}filterSceneHtmlTextures(){if(!this.device||!this.sampler||!this.htmlBlurResources)return this.needsSceneHtmlFilter=!1,!0;let e=this.device.createCommandEncoder(),t=!1;for(let r of this.sceneHtmlEntries.values()){if(r.filteredTexture=null,!r.texture||r.copiedDeviceWidth<=0||r.copiedDeviceHeight<=0)continue;let i=r.html.blur*this.options.getCurrentDpr();i<=0||((!r.blurTargetChain||r.blurTargetChain.levels[0]?.width!==r.textureWidth||r.blurTargetChain.levels[0]?.height!==r.textureHeight)&&(M(r.blurTargetChain),r.blurTargetChain=J(this.device,this.presentationFormat??"bgra8unorm",r.textureWidth,r.textureHeight)),r.filteredTexture=j({device:this.device,sampler:this.sampler,encoder:e,source:r.texture,radiusPx:i,chain:r.blurTargetChain,resources:this.htmlBlurResources}),t=!0)}return t&&this.device.queue.submit([e.finish()]),this.needsSceneHtmlFilter=!1,!0}copyGlassContentAtlas(){if(!this.device||this.glassContentOrder.length===0)return this.needsContentCopy=!1,!0;let e=!0,t=!1;for(let r of this.glassContentOrder){if(!r.sourceTexture){e=!1;continue}try{tn(this.device.queue,r.html.host,r.deviceWidth,r.deviceHeight,r.sourceTexture),r.copiedDeviceWidth=r.deviceWidth,r.copiedDeviceHeight=r.deviceHeight,t=!0}catch(i){e=!1,i instanceof DOMException&&i.name==="InvalidStateError"||console.error(i)}}return t&&(this.needsContentFilter=!0),this.needsContentCopy=!e,e}filterGlassContentAtlas(){if(!this.device||!this.sampler||!this.htmlBlurResources||!this.glassContentAtlas||this.glassContentOrder.length===0)return this.needsContentFilter=!1,!0;let e=this.device.createCommandEncoder(),t=!1;for(let r of this.glassContentOrder){if(!r.sourceTexture||r.copiedDeviceWidth<=0||r.copiedDeviceHeight<=0)continue;let i=r.sourceTexture,s=r.html.blur*this.options.getCurrentDpr();r.filteredTexture=null,s>0&&((!r.blurTargetChain||r.blurTargetChain.levels[0]?.width!==r.sourceTextureWidth||r.blurTargetChain.levels[0]?.height!==r.sourceTextureHeight)&&(M(r.blurTargetChain),r.blurTargetChain=J(this.device,this.presentationFormat??"bgra8unorm",r.sourceTextureWidth,r.sourceTextureHeight)),r.filteredTexture=j({device:this.device,sampler:this.sampler,encoder:e,source:r.sourceTexture,radiusPx:s,chain:r.blurTargetChain,resources:this.htmlBlurResources}),i=r.filteredTexture),t=X(e,i,this.glassContentAtlas,{sourceX:0,sourceY:0,destinationX:r.atlasX+1,destinationY:r.atlasY+1,width:r.copiedDeviceWidth,height:r.copiedDeviceHeight})||t}return t&&(this.writeContentEntries(this.glassContentOrder),this.device.queue.submit([e.finish()])),this.needsContentFilter=!1,!0}};function nn(n,e){let t=n.composedPath();for(let r of e)if(t.includes(r))return!0;return!1}var We=class{constructor(e){this.options=e}glassInteractionEntries=new Map;glassInteractionOrder=[];pointerStates=new Map;handlePointerMove=e=>{this.handleNativePointerEvent("pointermove",e)};handlePointerDown=e=>{this.handleNativePointerEvent("pointerdown",e)};handlePointerUp=e=>{this.handleNativePointerEvent("pointerup",e)};handlePointerCancel=e=>{this.handleNativePointerEvent("pointercancel",e)};handlePointerLeave=e=>{this.isTargetCanvasLeave(e)&&this.handleNativePointerEvent("pointerleave",e)};syncInteractions(e){let t=this.glassInteractionEntries,{entriesByGlass:r,orderedEntries:i}=jt(e);this.glassInteractionEntries=r,this.glassInteractionOrder=i,this.handleRemovedInteractionTargets(t)}clear(){this.glassInteractionEntries.clear(),this.glassInteractionOrder=[],this.pointerStates.clear()}getPointerState(e){let t=this.pointerStates.get(e);return t||(t={hoveredGlass:null,capturedGlass:null,capturedWithNativePointerCapture:!1,pressedGlass:null,lastSnapshot:null},this.pointerStates.set(e,t),t)}createPointerSnapshot(e){let t=this.options.targetCanvas.getBoundingClientRect();return{nativeEvent:e,canvasX:e.clientX-t.left,canvasY:e.clientY-t.top}}isTargetCanvasLeave(e){if(e.target!==this.options.targetCanvas)return!1;let t=e.relatedTarget;return!(t instanceof Node&&this.options.targetCanvas.contains(t))}dispatchGlassPointerEvent(e,t,r,i,s){let a=r?He(r,i.canvasX,i.canvasY):{localX:0,localY:0},o=new oe(e,{glass:t,renderer:this.options.renderer,nativeEvent:i.nativeEvent,canvasX:i.canvasX,canvasY:i.canvasY,localX:a.localX,localY:a.localY,inside:s});t.dispatchEvent(o),o.defaultPrevented&&i.nativeEvent.preventDefault()}updateHoveredGlass(e,t,r){let i=e.hoveredGlass,s=t?.glass??null;if(i!==s){if(i){let a=this.glassInteractionEntries.get(i)??null;this.dispatchGlassPointerEvent("pointerleave",i,a,r,!1)}e.hoveredGlass=s,t&&this.dispatchGlassPointerEvent("pointerenter",t.glass,t,r,!0)}}releaseNativePointerCapture(e){if(this.options.targetCanvas.hasPointerCapture(e))try{this.options.targetCanvas.releasePointerCapture(e)}catch{}}cleanupPointerState(e,t){t.hoveredGlass||t.capturedGlass||t.pressedGlass||this.pointerStates.delete(e)}finishPointerEvent(e,t){this.options.flushSceneContentSync(),this.cleanupPointerState(e,t)}handleRemovedInteractionTargets(e){for(let[t,r]of this.pointerStates){let i=r.lastSnapshot,s=r.capturedGlass;if(s&&!this.glassInteractionEntries.has(s)){let o=e.get(s)??null;i&&this.dispatchGlassPointerEvent("pointercancel",s,o,i,!1),r.capturedGlass=null,r.capturedWithNativePointerCapture=!1,r.pressedGlass=null,this.releaseNativePointerCapture(t)}let a=r.hoveredGlass;if(a&&!this.glassInteractionEntries.has(a)){let o=e.get(a)??null;i&&this.dispatchGlassPointerEvent("pointerleave",a,o,i,!1),r.hoveredGlass=null}!r.capturedGlass&&i&&this.updateHoveredGlass(r,Ne(this.glassInteractionOrder,i.canvasX,i.canvasY),i),this.cleanupPointerState(t,r)}}handleNativePointerEvent(e,t){if(this.options.isDestroyed())return;this.options.flushSceneContentSync();let r=this.getPointerState(t.pointerId),i=this.createPointerSnapshot(t);r.lastSnapshot=i;let s=r.capturedGlass?this.glassInteractionEntries.get(r.capturedGlass)??null:null;if(s){if(e==="pointerleave"){r.capturedWithNativePointerCapture||(this.dispatchGlassPointerEvent("pointercancel",s.glass,s,i,!1),r.capturedGlass=null,r.capturedWithNativePointerCapture=!1,r.pressedGlass=null,this.updateHoveredGlass(r,null,i),this.cleanupPointerState(t.pointerId,r));return}let o=He(s,i.canvasX,i.canvasY);this.dispatchGlassPointerEvent(e,s.glass,s,i,o.inside),(e==="pointerup"||e==="pointercancel")&&(e==="pointerup"&&t.button===0&&r.pressedGlass===s.glass&&o.inside&&this.dispatchGlassPointerEvent("click",s.glass,s,i,!0),r.capturedGlass=null,r.capturedWithNativePointerCapture=!1,r.pressedGlass=null,this.releaseNativePointerCapture(t.pointerId),this.updateHoveredGlass(r,Ne(this.glassInteractionOrder,i.canvasX,i.canvasY),i)),this.finishPointerEvent(t.pointerId,r);return}if(e==="pointerleave"){if(r.hoveredGlass){let o=this.glassInteractionEntries.get(r.hoveredGlass)??null;this.dispatchGlassPointerEvent("pointerleave",r.hoveredGlass,o,i,!1),r.hoveredGlass=null}this.finishPointerEvent(t.pointerId,r);return}let a=Ne(this.glassInteractionOrder,i.canvasX,i.canvasY);if(this.updateHoveredGlass(r,a,i),a&&(this.dispatchGlassPointerEvent(e,a.glass,a,i,!0),e==="pointerdown"&&(r.pressedGlass=a.glass,this.options.flushSceneContentSync(),this.glassInteractionEntries.has(a.glass)&&(r.capturedGlass=a.glass,r.capturedWithNativePointerCapture=!1,!nn(t,this.options.getSceneHtmlHosts())&&!nn(t,this.options.getGlassContentHosts())))))try{this.options.targetCanvas.setPointerCapture(t.pointerId),r.capturedWithNativePointerCapture=!0}catch{r.capturedGlass=null,r.pressedGlass=null}this.finishPointerEvent(t.pointerId,r)}};function Bn(n,e,t){return Math.min(Math.max(n,e),t)}function yt(){return{minX:Number.POSITIVE_INFINITY,minY:Number.POSITIVE_INFINITY,maxX:Number.NEGATIVE_INFINITY,maxY:Number.NEGATIVE_INFINITY}}function ze(n,e,t){n.minX=Math.min(n.minX,e),n.minY=Math.min(n.minY,t),n.maxX=Math.max(n.maxX,e),n.maxY=Math.max(n.maxY,t)}function rn(n){return Number.isFinite(n.minX)&&Number.isFinite(n.minY)&&Number.isFinite(n.maxX)&&Number.isFinite(n.maxY)&&n.maxX>n.minX&&n.maxY>n.minY}function xt(n,e){if(n.length===0)return 0;if(n.length===1)return n[0];let t=Bn((n.length-1)*e,0,n.length-1),r=Math.floor(t),i=Math.ceil(t),s=t-r;return n[r]+(n[i]-n[r])*s}function sn(n){let e=new Uint8Array(n.getMappedRange()),t=[],r=0,i=0,s=0;for(let o=0;o<32;o+=1){let l=o*256;for(let c=0;c<32;c+=1){let m=l+c*4;if(e[m+3]/255<=.5)continue;let u=e[m]/255,d=e[m+1]/255,f=e[m+2]/255,b=u*.2126+d*.7152+f*.0722;r+=u,i+=d,s+=f,t.push(b)}}if(t.length===0)return null;t.sort((o,l)=>o-l);let a=t.length;return{averageLinearColor:{r:r/a,g:i/a,b:s/a},averageLuminance:t.reduce((o,l)=>o+l,0)/a,luminanceP10:xt(t,.1),luminanceP50:xt(t,.5),luminanceP90:xt(t,.9)}}var Ye=class{constructor(e){this.isDestroyed=e}device=null;stateByContainer=new WeakMap;trackedContainers=new Set;pendingStates=new Set;setDevice(e){this.device=e;for(let t of this.trackedContainers){let r=this.stateByContainer.get(t);r&&this.ensureResources(r)}}setTracking(e,t){if(t){let i=this.getOrCreateState(e);i.cleanupAfterPending=!1,this.trackedContainers.add(e),this.ensureResources(i);return}this.trackedContainers.delete(e);let r=this.stateByContainer.get(e);if(r){if(r.metrics=null,r.inScene=!1,r.pendingReadback){r.cleanupAfterPending=!0;return}this.cleanupState(r)}}getMetrics(e){if(!this.trackedContainers.has(e))return null;let t=this.stateByContainer.get(e);return!t||!t.inScene?null:t.metrics}getTrackedState(e){return this.trackedContainers.has(e)?this.getOrCreateState(e):null}ensureResources(e){!this.device||e.readbackBuffer||(e.readbackBuffer=this.device.createBuffer({size:8192,usage:C.MAP_READ|C.COPY_DST}))}markSceneMembership(e){for(let t of this.trackedContainers){let r=this.stateByContainer.get(t);r&&(r.inScene=e.has(t),r.inScene||(r.metrics=null))}}scheduleReadback(e){let t=e.readbackBuffer;!t||e.pendingReadback||(e.pendingReadback=!0,this.pendingStates.add(e),t.mapAsync(GPUMapMode.READ).then(()=>{if(this.isDestroyed()||!this.trackedContainers.has(e.container)||!e.inScene){e.metrics=null;return}let r=sn(t);if(!r){e.metrics=null;return}e.metrics=r}).catch(r=>{!this.isDestroyed()&&!e.cleanupAfterPending&&console.error(r),e.metrics=null}).finally(()=>{t.mapState==="mapped"&&t.unmap(),e.pendingReadback=!1,this.pendingStates.delete(e),(this.isDestroyed()||e.cleanupAfterPending)&&this.cleanupState(e)}))}destroy(){for(let e of this.trackedContainers){let t=this.stateByContainer.get(e);t&&(t.pendingReadback?t.cleanupAfterPending=!0:this.cleanupState(t))}this.trackedContainers.clear();for(let e of this.pendingStates)e.cleanupAfterPending=!0}getOrCreateState(e){let t=this.stateByContainer.get(e);return t||(t={container:e,readbackBuffer:null,metrics:null,pendingReadback:!1,inScene:!1,cleanupAfterPending:!1},this.stateByContainer.set(e,t),t)}cleanupState(e){if(e.pendingReadback){e.cleanupAfterPending=!0;return}e.metrics=null,e.inScene=!1,e.cleanupAfterPending=!1,this.pendingStates.delete(e),e.readbackBuffer?.destroy(),e.readbackBuffer=null}};function Et(n,e){return n==="hairline"?1:n*e}var Ct="rgba16float",Pt="rgba8unorm",wn=1,An=12,on=1;function In(n){return n==="convex"?0:n==="concave"?1:2}function On(){return{cells:[],columns:1,rows:1}}function Ln(n,e,t){return Math.min(Math.max(n,e),t)}function ln(n){let e=yt();for(let t of n)ze(e,t.x,t.y);return{aabb:e,area:$(n),polygon:n}}function an(n,e){return Math.min(Math.max(Math.ceil(n/Math.max(e,on)),wn),An)}function Un(n,e,t,r){let i=an(e,r),s=an(t,r),a=e/i,o=t/s,l=[],c=(m,p,u,d)=>ln([A(n,m,p),A(n,u,p),A(n,u,d),A(n,m,d)]);for(let m=0;m<s;m+=1)for(let p=0;p<i;p+=1){let u=p*a,d=m*o;l.push({bounds:c(u,d,u+a,d+o)})}return{cells:l,columns:i,rows:s}}var ve=class{backdropMetrics=new Ye(()=>this.destroyed);destroyed=!1;currentDpr=1;width=1;height=1;contentSource=null;device;format;globalsBuffer;shapesBuffer=null;submersionCellsBuffer;backdropMetricsBoundsBuffer;htmlCompositeParamsBuffer;emptyContentEntriesBuffer;sampler;backdropBlurResources;displacementBlurResources;shadowBlurResources;displacementFieldPipeline;shadowMaskPipeline;shadowCompositePipeline;glassPipeline;htmlCompositePipeline;backdropMetricsPipeline;blitPipeline;targets=null;backdropMetricsTarget;constructor({device:e,format:t}){this.device=e,this.format=t,this.sampler=e.createSampler({magFilter:"linear",minFilter:"linear",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"});let r=C.UNIFORM|C.COPY_DST;this.globalsBuffer=new U(e,de,r),this.submersionCellsBuffer=new z(e,_e,C.STORAGE|C.COPY_DST),this.submersionCellsBuffer.ensureCapacity(0),this.backdropMetricsBoundsBuffer=new U(e,we,r),this.htmlCompositeParamsBuffer=new U(e,Ae,r),this.emptyContentEntriesBuffer=new z(e,ne,C.STORAGE|C.COPY_DST),this.emptyContentEntriesBuffer.ensureCapacity(0),this.backdropBlurResources=re(e,t),this.displacementBlurResources=re(e,Ct),this.shadowBlurResources=re(e,Pt),this.displacementFieldPipeline=e.createRenderPipeline({layout:"auto",vertex:{module:e.createShaderModule({code:ut}),entryPoint:"vertexMain"},fragment:{module:e.createShaderModule({code:ut}),entryPoint:"fragmentMain",targets:[{format:Ct}]},primitive:{topology:"triangle-list"}}),this.glassPipeline=e.createRenderPipeline({layout:"auto",vertex:{module:e.createShaderModule({code:ht}),entryPoint:"vertexMain"},fragment:{module:e.createShaderModule({code:ht}),entryPoint:"fragmentMain",targets:[{format:t}]},primitive:{topology:"triangle-list"}}),this.shadowMaskPipeline=e.createRenderPipeline({layout:"auto",vertex:{module:e.createShaderModule({code:dt}),entryPoint:"vertexMain"},fragment:{module:e.createShaderModule({code:dt}),entryPoint:"fragmentMain",targets:[{format:Pt}]},primitive:{topology:"triangle-list"}}),this.shadowCompositePipeline=e.createRenderPipeline({layout:"auto",vertex:{module:e.createShaderModule({code:pt}),entryPoint:"vertexMain"},fragment:{module:e.createShaderModule({code:pt}),entryPoint:"fragmentMain",targets:[{format:t}]},primitive:{topology:"triangle-list"}}),this.htmlCompositePipeline=e.createRenderPipeline({layout:"auto",vertex:{module:e.createShaderModule({code:ft}),entryPoint:"vertexMain"},fragment:{module:e.createShaderModule({code:ft}),entryPoint:"fragmentMain",targets:[{format:t}]},primitive:{topology:"triangle-list"}}),this.backdropMetricsPipeline=e.createRenderPipeline({layout:"auto",vertex:{module:e.createShaderModule({code:mt}),entryPoint:"vertexMain"},fragment:{module:e.createShaderModule({code:mt}),entryPoint:"fragmentMain",targets:[{format:"rgba8unorm"}]},primitive:{topology:"triangle-list"}}),this.blitPipeline=e.createRenderPipeline({layout:"auto",vertex:{module:e.createShaderModule({code:ct}),entryPoint:"vertexMain"},fragment:{module:e.createShaderModule({code:ct}),entryPoint:"fragmentMain",targets:[{format:t}]},primitive:{topology:"triangle-list"}}),this.backdropMetricsTarget=e.createTexture({size:{width:32,height:32,depthOrArrayLayers:1},format:"rgba8unorm",usage:x.RENDER_ATTACHMENT|x.COPY_SRC}),this.backdropMetrics.setDevice(e)}setBackdropMetricsTracking(e,t){this.backdropMetrics.setTracking(e,t)}getBackdropMetrics(e){return this.backdropMetrics.getMetrics(e)}render(e){if(this.destroyed)return;this.width=Math.max(1,Math.floor(e.width)),this.height=Math.max(1,Math.floor(e.height)),this.currentDpr=Math.max(e.dpr,1e-4),this.contentSource=e.contentSource??null,this.syncTargets();let t=e.layers??(e.scene?ee(e.scene):[]);try{this.drawFrame(t,e.outputTexture,e.backdropTexture??null)}finally{this.contentSource=null}}destroy(){this.destroyed||(this.destroyed=!0,vt(this.targets),this.targets=null,this.backdropMetricsTarget.destroy(),this.globalsBuffer.destroy(),this.shapesBuffer?.destroy(),this.submersionCellsBuffer.destroy(),this.emptyContentEntriesBuffer.destroy(),Z(this.backdropBlurResources),Z(this.displacementBlurResources),Z(this.shadowBlurResources),this.backdropMetricsBoundsBuffer.destroy(),this.htmlCompositeParamsBuffer.destroy(),this.backdropMetrics.destroy())}syncTargets(){this.targets&&this.targets.backdropBlur.levels[0]?.width===this.width&&this.targets.backdropBlur.levels[0]?.height===this.height||(vt(this.targets),this.targets={backdropBlur:J(this.device,this.format,this.width,this.height),displacementBlur:J(this.device,Ct,this.width,this.height),shadowBlur:J(this.device,Pt,this.width,this.height),sceneA:H(this.device,this.format,this.width,this.height),sceneB:H(this.device,this.format,this.width,this.height)})}ensureShapesBuffer(e){this.shapesBuffer||(this.shapesBuffer=new z(this.device,Me,C.STORAGE|C.COPY_DST)),this.shapesBuffer.ensureCapacity(e)}uploadSubmersionCells(e){let t=Math.ceil(e.length/4);this.submersionCellsBuffer.ensureCapacity(t);for(let r=0;r<Math.max(t,1);r+=1){let i=r*4;this.submersionCellsBuffer.writeAt(r,{values:{x:e[i]??0,y:e[i+1]??0,z:e[i+2]??0,w:e[i+3]??0}})}this.submersionCellsBuffer.upload(t)}resolveBlendSupportCellSize(e){return Math.max(e.blendSupportGating.cellSize,on)}writeGlobals(e,t){let r=this.currentDpr,i=xe(e.normalGating),s=t>1;this.globalsBuffer.write({canvas:{width:this.width,height:this.height},container:{opacity:e.opacity},shape:{smoothing:e.spacing*r,bezelWidth:e.bezelWidth*r,shapeCount:t,surfaceProfile:In(e.surfaceProfile)},sdf:{normalGatingEnabled:i.enabled&&s?1:0},sdfParams0:{blendSupportGatingEnabled:e.blendSupportGating.enabled&&s?1:0,smoothUnionAcceleration:Ln(e.smoothUnion.acceleration,0,1)},glass:{thickness:e.thickness*r,displacementFactor:e.displacementFactor,ior:e.ior,dispersion:e.dispersion},content:{ior:e.contentIor,depth:e.contentDepth*r},lighting:{x:Math.sin(e.lightDirection),y:-Math.cos(e.lightDirection)},specular:{strength:e.specularStrength,width:Et(e.specularWidth,r),sharpness:e.specularSharpness,opacity:e.specularOpacity},specularSecondary:{oppositeStrength:e.oppositeSpecularStrength,falloff:e.specularFalloff,reflectionOffset:e.reflectionOffset*r},tint:{r:e.tint.r,g:e.tint.g,b:e.tint.b,a:e.tint.a},shadow:{offsetX:e.shadowOffsetX*r,offsetY:e.shadowOffsetY*r,spread:e.shadowSpread*r,blur:e.shadowBlur*r},shadowColor:{r:e.shadowColor.r,g:e.shadowColor.g,b:e.shadowColor.b,a:e.shadowColor.a},debug:{displacement:e.debugDisplacement?1:0}})}writeBackdropMetricsBounds(e){this.backdropMetricsBoundsBuffer.write({bounds:{minX:e.minX,minY:e.minY,maxX:e.maxX,maxY:e.maxY}})}packShapes(e,t){let r=this.currentDpr,i=he(e),s=yt(),a=this.resolveBlendSupportCellSize(e),o=0;this.ensureShapesBuffer(i.length);let l=this.shapesBuffer,c=[];for(let u of i){let d=u.glass;if(d.width<=0||d.height<=0)continue;let f=L(t,u.transform),b=Ge(f,r),B=K(b);if(!B)continue;let y=A(b,0,0),S=A(b,d.width,0),v=A(b,0,d.height),E=A(b,d.width,d.height),h=ln([y,S,E,v]);ze(s,h.aabb.minX,h.aabb.minY),ze(s,h.aabb.maxX,h.aabb.maxY);let _=this.contentSource?.getGlassContentRange?.(d),w=d.width*.5,O=d.height*.5;c.push({bounds:h,contentRange:_??void 0,cornerRadius:d.cornerRadius,cornerSmoothing:d.cornerSmoothing,halfHeight:O,halfWidth:w,inverse:B,minimumScale:Ft(b),submersionCellOffset:0,submersionGrid:On(),worldDevice:b}),o+=1}let m=e.blendSupportGating.enabled&&o>1;if(m)for(let u of c)u.submersionGrid=Un(u.worldDevice,u.halfWidth*2,u.halfHeight*2,a);let p=[];for(let u of c){let d=m?Pe(c,u).values:Array.from({length:u.submersionGrid.cells.length},()=>0);u.submersionCellOffset=p.length,p.push(...d)}return this.uploadSubmersionCells(p),c.forEach((u,d)=>{l?.writeAt(d,{inverse0:{a:u.inverse.a,c:u.inverse.c,e:u.inverse.e,minimumScale:u.minimumScale},inverse1:{b:u.inverse.b,d:u.inverse.d,f:u.inverse.f,cornerRadius:u.cornerRadius},geometry:{halfWidth:u.halfWidth,halfHeight:u.halfHeight,cornerSmoothing:u.cornerSmoothing},contentRange:{start:u.contentRange?.start??0,count:u.contentRange?.count??0},submersionGrid:{offset:u.submersionCellOffset,columns:u.submersionGrid.columns,rows:u.submersionGrid.rows}})}),l?.upload(o),{shapeCount:o,bounds:rn(s)?s:null}}renderDisplacementField(e,t){if(!this.shapesBuffer?.buffer||!this.targets)return null;let r=this.targets.displacementBlur.levels[0],i=R(this.device,this.displacementFieldPipeline,[{binding:0,resource:this.globalsBuffer.bindingResource},{binding:1,resource:this.shapesBuffer.bindingResource},{binding:2,resource:this.submersionCellsBuffer.bindingResource}]);return D(e,{pipeline:this.displacementFieldPipeline,bindGroup:i,target:r.ping,clearValue:{r:0,g:0,b:0,a:0}}),j({device:this.device,sampler:this.sampler,encoder:e,source:r.ping,radiusPx:t.displacementBlur*this.currentDpr,chain:this.targets.displacementBlur,resources:this.displacementBlurResources})}renderShadow(e,t,r,i){if(i.opacity<=0||i.shadowColor.a<=0||!this.shapesBuffer?.buffer||!this.targets)return!1;let s=this.targets.shadowBlur.levels[0],a=R(this.device,this.shadowMaskPipeline,[{binding:0,resource:this.globalsBuffer.bindingResource},{binding:1,resource:this.shapesBuffer.bindingResource},{binding:2,resource:this.submersionCellsBuffer.bindingResource}]);D(e,{pipeline:this.shadowMaskPipeline,bindGroup:a,target:s.ping,clearValue:{r:0,g:0,b:0,a:0}});let o=j({device:this.device,sampler:this.sampler,encoder:e,source:s.ping,radiusPx:i.shadowBlur*this.currentDpr,chain:this.targets.shadowBlur,resources:this.shadowBlurResources}),l=R(this.device,this.shadowCompositePipeline,[{binding:0,resource:this.sampler},{binding:1,resource:t.createView()},{binding:2,resource:o.createView()},{binding:3,resource:this.globalsBuffer.bindingResource}]);return D(e,{pipeline:this.shadowCompositePipeline,bindGroup:l,target:r}),!0}shouldRenderShadow(e){return e.opacity>0&&e.shadowColor.a>0&&!!this.shapesBuffer?.buffer&&!!this.targets}renderBackdropMetrics(e,t,r,i){if(!this.shapesBuffer?.buffer||!r||t.pendingReadback)return!r&&!t.pendingReadback&&(t.metrics=null),!1;if(this.backdropMetrics.ensureResources(t),!t.readbackBuffer)return!1;this.writeBackdropMetricsBounds(r);let s=R(this.device,this.backdropMetricsPipeline,[{binding:0,resource:this.globalsBuffer.bindingResource},{binding:1,resource:this.shapesBuffer.bindingResource},{binding:2,resource:this.submersionCellsBuffer.bindingResource},{binding:3,resource:this.sampler},{binding:4,resource:i.createView()},{binding:5,resource:this.backdropMetricsBoundsBuffer.bindingResource}]);return D(e,{pipeline:this.backdropMetricsPipeline,bindGroup:s,target:this.backdropMetricsTarget,clearValue:{r:0,g:0,b:0,a:0}}),e.copyTextureToBuffer({texture:this.backdropMetricsTarget},{buffer:t.readbackBuffer,bytesPerRow:256,rowsPerImage:32},{width:32,height:32,depthOrArrayLayers:1}),!0}renderContainer(e,t,r,i,s){if(!this.shapesBuffer?.buffer)return;let a=this.contentSource?.contentEntriesBindingResource??this.emptyContentEntriesBuffer.bindingResource,o=this.contentSource?.atlasTexture??t,l=R(this.device,this.glassPipeline,[{binding:0,resource:this.globalsBuffer.bindingResource},{binding:1,resource:this.shapesBuffer.bindingResource},{binding:2,resource:this.submersionCellsBuffer.bindingResource},{binding:3,resource:this.sampler},{binding:4,resource:t.createView()},{binding:5,resource:r.createView()},{binding:6,resource:o.createView()},{binding:7,resource:a},{binding:8,resource:i.createView()}]);D(e,{pipeline:this.glassPipeline,bindGroup:l,target:s})}writeHtmlCompositeParams(e){if(!e.inverseTransform)return;let t=e.inverseTransform;this.htmlCompositeParamsBuffer.write({canvas:{width:this.width,height:this.height,uScale:fe(e.deviceWidth,e.width,e.textureWidth),vScale:fe(e.deviceHeight,e.height,e.textureHeight)},inverse0:{a:t.a,c:t.c,e:t.e,copiedWidth:me(e.copiedDeviceWidth,e.deviceWidth,e.width)},inverse1:{b:t.b,d:t.d,f:t.f,copiedHeight:me(e.copiedDeviceHeight,e.deviceHeight,e.height)},opacity:{value:e.html.opacity}})}compositeHtmlLayer(e,t,r,i){if(!i.filteredTexture&&!i.texture||!i.inverseTransform)return;this.writeHtmlCompositeParams(i);let s=R(this.device,this.htmlCompositePipeline,[{binding:0,resource:this.sampler},{binding:1,resource:t.createView()},{binding:2,resource:(i.filteredTexture??i.texture).createView()},{binding:3,resource:this.htmlCompositeParamsBuffer.bindingResource}]);D(e,{pipeline:this.htmlCompositePipeline,bindGroup:s,target:r})}blitTexture(e,t,r){let i=R(this.device,this.blitPipeline,[{binding:0,resource:this.sampler},{binding:1,resource:t.createView()}]);D(e,{pipeline:this.blitPipeline,bindGroup:i,target:r})}drawFrame(e,t,r){if(this.destroyed||!this.targets)return;let i=new Set,s=new Oe(this.device,this.targets);r&&this.blitTexture(s.encoder,r,s.current);for(let a of e){if(a.child instanceof T){if(a.child.opacity<=0)continue;let d=this.contentSource?.getSceneHtmlEntry?.(a.child);if(!d||!d.texture||!d.inverseTransform)continue;this.compositeHtmlLayer(s.encoder,s.current,s.next,d),s.submitAndSwap();continue}if(a.child.opacity<=0)continue;let o=this.packShapes(a.child,a.transform);this.writeGlobals(a.child,o.shapeCount);let l=a.child.blur*this.currentDpr,c=j({device:this.device,sampler:this.sampler,encoder:s.encoder,source:s.current,radiusPx:l,chain:this.targets.backdropBlur,resources:this.backdropBlurResources});l<=0&&this.shouldRenderShadow(a.child)&&(c=this.targets.backdropBlur.levels[0].pong,this.blitTexture(s.encoder,s.current,c));let m=this.renderDisplacementField(s.encoder,a.child);if(!m)continue;let p=this.backdropMetrics.getTrackedState(a.child),u=!1;p&&(i.add(a.child),u=this.renderBackdropMetrics(s.encoder,p,o.bounds,c)),this.renderShadow(s.encoder,s.current,s.next,a.child)&&s.submitAndSwap(),this.renderContainer(s.encoder,s.current,c,m,s.next),s.submitAndSwap(),p&&u&&this.backdropMetrics.scheduleReadback(p)}this.backdropMetrics.markSceneMembership(i),this.blitTexture(s.encoder,s.current,t),s.submit()}};var Xe=class{scene;targetCanvas;domContent;destroyed=!1;handlePaintEvent=e=>{this.destroyed||this.domContent.handlePaintEvent(e)};constructor({targetCanvas:e,getCurrentDpr:t,scene:r}){this.targetCanvas=e,this.scene=r??null,this.domContent=new ie({targetCanvas:e,getCurrentDpr:t}),this.targetCanvas.setAttribute("layoutsubtree","true"),this.targetCanvas.addEventListener("paint",this.handlePaintEvent)}get atlasTexture(){return this.domContent.atlasTexture}get contentEntriesBindingResource(){return this.domContent.contentEntriesBindingResource}setDevice(e,t){this.domContent.setDevice(e,t)}sync(e=this.scene){if(!e)throw new Error("WebGpuDomContentSource.sync requires a scene.");let t=ee(e);return this.domContent.sync(t,Fe(t),ke(t)),this.domContent.copyPending(),t}getSceneHtmlEntry(e){return this.domContent.getSceneHtmlEntry(e)}getGlassContentRange(e){return this.domContent.getGlassContentRange(e)}destroy(){this.destroyed||(this.destroyed=!0,this.targetCanvas.removeEventListener("paint",this.handlePaintEvent),this.domContent.destroy())}};var Gt=class{scene;canvas;maxDpr;targetCanvas;domContent;pointerController;unsubscribeSceneMutations=null;initError=null;destroyed=!1;initialized=!1;pendingSceneContentSync=!0;sceneContentSyncQueued=!1;currentDpr=1;resizeObserver=null;device=null;context=null;presentationFormat=null;core=null;canvasConfigured=!1;lastFrameTexture=null;handlePaintEvent=e=>{this.destroyed||!this.core||this.domContent.handlePaintEvent(e)};handleSceneMutation=()=>{this.queueSceneContentSync()};constructor(e={}){this.scene=e.scene??new k,this.maxDpr=e.maxDpr??2,this.targetCanvas=document.createElement("canvas"),this.targetCanvas.setAttribute("layoutsubtree","true"),this.targetCanvas.style.display="block",this.domContent=new ie({targetCanvas:this.targetCanvas,getCurrentDpr:()=>this.currentDpr}),this.pointerController=new We({targetCanvas:this.targetCanvas,renderer:this,isDestroyed:()=>this.destroyed,flushSceneContentSync:()=>this.flushSceneContentSync(),getSceneHtmlHosts:()=>this.domContent.sceneHtmlHosts,getGlassContentHosts:()=>this.domContent.glassContentHosts}),this.targetCanvas.addEventListener("paint",this.handlePaintEvent),this.targetCanvas.addEventListener("pointermove",this.pointerController.handlePointerMove,!0),this.targetCanvas.addEventListener("pointerdown",this.pointerController.handlePointerDown,!0),this.targetCanvas.addEventListener("pointerup",this.pointerController.handlePointerUp,!0),this.targetCanvas.addEventListener("pointercancel",this.pointerController.handlePointerCancel,!0),this.targetCanvas.addEventListener("pointerleave",this.pointerController.handlePointerLeave,!0),this.unsubscribeSceneMutations=this.scene._subscribe(this.handleSceneMutation),this.canvas=this.targetCanvas,this.initialize().catch(t=>{this.initError=t,console.error(t)})}setBackdropMetricsTracking(e,t){this.core?.setBackdropMetricsTracking(e,t)}getBackdropMetrics(e){return this.core?.getBackdropMetrics(e)??null}render(){if(this.destroyed)return;if(this.initError)throw this.initError;let e=this.syncSceneNow();this.initialized&&this.drawFrame(e)}destroy(){this.destroyed||(this.destroyed=!0,this.targetCanvas.removeEventListener("paint",this.handlePaintEvent),this.targetCanvas.removeEventListener("pointermove",this.pointerController.handlePointerMove,!0),this.targetCanvas.removeEventListener("pointerdown",this.pointerController.handlePointerDown,!0),this.targetCanvas.removeEventListener("pointerup",this.pointerController.handlePointerUp,!0),this.targetCanvas.removeEventListener("pointercancel",this.pointerController.handlePointerCancel,!0),this.targetCanvas.removeEventListener("pointerleave",this.pointerController.handlePointerLeave,!0),this.unsubscribeSceneMutations?.(),this.unsubscribeSceneMutations=null,this.resizeObserver?.disconnect(),this.core?.destroy(),this.core=null,this.lastFrameTexture?.destroy(),this.lastFrameTexture=null,this.domContent.destroy(),this.pointerController.clear())}async initialize(){let e=navigator;if(!e.gpu)throw new Error("WebGPU is not available in this browser.");let t=await e.gpu.requestAdapter();if(!t)throw new Error("No compatible GPU adapter was returned.");let r=await t.requestDevice(),i=this.targetCanvas.getContext("webgpu");if(!i)throw new Error("Unable to acquire a WebGPU canvas context.");let s=e.gpu.getPreferredCanvasFormat();this.device=r,this.context=i,this.presentationFormat=s,this.core=new ve({device:r,format:s}),this.domContent.setDevice(r,s),this.initialized=!0,this.syncCanvasSize(),this.resizeObserver=new ResizeObserver(()=>{this.syncCanvasSize()}),this.resizeObserver.observe(this.targetCanvas),this.queueSceneContentSync()}syncCanvasSize(){if(!this.device||!this.context||!this.presentationFormat)return;let e=this.targetCanvas.getBoundingClientRect(),t=Math.min(window.devicePixelRatio||1,this.maxDpr),r=Math.max(1,Math.round(e.width*t)),i=Math.max(1,Math.round(e.height*t));if(this.currentDpr=t,!this.canvasConfigured||this.targetCanvas.width!==r||this.targetCanvas.height!==i){let s=this.lastFrameTexture,a=this.targetCanvas.width,o=this.targetCanvas.height;this.targetCanvas.width=r,this.targetCanvas.height=i,this.context.configure({device:this.device,format:this.presentationFormat,usage:x.RENDER_ATTACHMENT|x.COPY_SRC|x.COPY_DST,alphaMode:"opaque"}),this.canvasConfigured=!0,this.lastFrameTexture=H(this.device,this.presentationFormat,r,i),this.preservePreviousFrameAfterResize(s,a,o),s?.destroy()}this.syncSceneNow()}preservePreviousFrameAfterResize(e,t,r){if(!e||!this.device||!this.context||!this.lastFrameTexture||t<=0||r<=0)return;let i=Math.min(t,this.targetCanvas.width),s=Math.min(r,this.targetCanvas.height),a=this.device.createCommandEncoder(),o=this.context.getCurrentTexture(),l={sourceX:0,sourceY:0,destinationX:0,destinationY:0,width:i,height:s};Le(a,this.lastFrameTexture),Le(a,o),X(a,e,this.lastFrameTexture,l),X(a,e,o,l),this.device.queue.submit([a.finish()])}queueSceneContentSync(){this.pendingSceneContentSync=!0,!(this.sceneContentSyncQueued||this.destroyed)&&(this.sceneContentSyncQueued=!0,queueMicrotask(()=>{this.sceneContentSyncQueued=!1,!(this.destroyed||!this.pendingSceneContentSync)&&this.syncSceneNow()}))}syncSceneNow(){let e=ee(this.scene),t=Fe(e),r=ke(e);return this.pointerController.syncInteractions(t),this.domContent.sync(e,t,r),this.domContent.copyPending(),this.pendingSceneContentSync=!1,e}flushSceneContentSync(){this.pendingSceneContentSync&&this.syncSceneNow()}drawFrame(e=ee(this.scene)){if(this.destroyed||!this.context||!this.core||!this.device||!this.lastFrameTexture||this.targetCanvas.width<=0||this.targetCanvas.height<=0)return;this.core.render({layers:e,width:this.targetCanvas.width,height:this.targetCanvas.height,dpr:this.currentDpr,outputTexture:this.lastFrameTexture,contentSource:this.domContent});let t=this.device.createCommandEncoder();X(t,this.lastFrameTexture,this.context.getCurrentTexture(),{sourceX:0,sourceY:0,destinationX:0,destinationY:0,width:this.targetCanvas.width,height:this.targetCanvas.height}),this.device.queue.submit([t.finish()])}};var fi=it;export{F as Container,te as Glass,oe as GlassPointerEvent,I as Group,T as Html,Gt as Renderer,k as Scene,Q as StackingContext,Xe as WebGpuDomContentSource,ve as WebGpuGlassCore,Et as resolveSpecularWidthPx,fi as sdfUtils};
