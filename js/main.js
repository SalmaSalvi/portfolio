(function(){
var d=document,root=d.documentElement;
var reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
var sel=".sec,.entry,.hl div,.cc,.chips li,.social a";
var els=[].slice.call(d.querySelectorAll(sel));
els.forEach(function(e){e.classList.add("rv")});
if(reduce||!("IntersectionObserver" in window)){els.forEach(function(e){e.classList.add("in")})}
else{
var timers=new WeakMap();
var io=new IntersectionObserver(function(es){es.forEach(function(x){var t=x.target;clearTimeout(timers.get(t));
if(x.isIntersecting){var sib=[].filter.call(t.parentNode.children,function(c){return c.matches(sel)});var i=Math.min(sib.indexOf(t),6);timers.set(t,setTimeout(function(){t.classList.add("in")},i*70))}
else{t.classList.remove("in");t.classList.toggle("from-top",x.boundingClientRect.bottom<=0)}})},{threshold:.1,rootMargin:"0px 0px -5% 0px"});
els.forEach(function(e){io.observe(e)})}
var bar=d.querySelector(".progress");
function sc(){var h=root.scrollHeight-innerHeight;bar.style.transform="scaleX("+(h>0?Math.min(1,scrollY/h):0)+")"}
addEventListener("scroll",sc,{passive:true});sc();
if("IntersectionObserver" in window){
var links={};[].forEach.call(d.querySelectorAll("header.top nav a"),function(a){links[a.getAttribute("href").slice(1)]=a});
var so=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){for(var k in links)links[k].classList.toggle("on",k===x.target.id)}})},{rootMargin:"-40% 0px -55% 0px"});
["about","experience","education","skills","contact"].forEach(function(id){var s=d.getElementById(id);if(s)so.observe(s)});
}
var lb=d.querySelector(".lb"),lbi=lb.querySelector("img"),last=null;
function closeLB(){lb.hidden=true;lbi.removeAttribute("src");d.body.style.overflow="";if(last)last.focus()}
[].forEach.call(d.querySelectorAll(".thumb"),function(b){b.addEventListener("click",function(){var im=b.querySelector("img");lbi.src=im.src;lbi.alt=im.alt;last=b;lb.hidden=false;d.body.style.overflow="hidden";lb.focus()})});
lb.addEventListener("click",closeLB);
d.addEventListener("keydown",function(e){if(e.key==="Escape"&&!lb.hidden)closeLB()});
})();
(function(){
var root=document.documentElement,btns=[].slice.call(document.querySelectorAll(".sw")),KEY="sa-accent";
function set(c){root.setAttribute("data-accent",c);btns.forEach(function(b){b.setAttribute("aria-pressed",b.getAttribute("data-c")===c?"true":"false")})}
var s=null;try{s=localStorage.getItem(KEY)}catch(e){}
set(s==="teal"||s==="pink"?s:"indigo");
btns.forEach(function(b){b.addEventListener("click",function(){var c=b.getAttribute("data-c");set(c);try{localStorage.setItem(KEY,c)}catch(e){}})});
})();
