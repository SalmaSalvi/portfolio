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
["about","experience","education","skills","activities","contact"].forEach(function(id){var s=d.getElementById(id);if(s)so.observe(s)});
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
(function(){
var d=document,btn=d.querySelector(".btn.cv");
if(!btn)return;
function txt(e){return e?e.textContent.replace(/\s+/g," ").trim():""}
function clean(s){return String(s).replace(/[\u2018\u2019]/g,"'").replace(/[\u201C\u201D]/g,'"').replace(/[\u2013\u2014]/g,"-").replace(/\s*\u00D7\s*/g," with ").replace(/\s*\u00B7\s*/g,", ").replace(/\u00A0/g," ").replace(/[^\x20-\x7E\xA1-\xFF]/g,"").replace(/\s+/g," ").trim()}
function gather(){
  var m=d.querySelector("main"),mail=d.querySelector('a[href^="mailto:"]'),li=d.querySelector('a[href*="linkedin.com/in"]');
  function entries(sec){return [].map.call(d.querySelectorAll(sec+" .entry"),function(e){
    var h=e.querySelector("h3").cloneNode(true);[].forEach.call(h.querySelectorAll(".tag"),function(t){t.remove()});
    return {title:txt(h),org:txt(e.querySelector(".org")),when:txt(e.querySelector(".when")),
      bullets:[].map.call(e.querySelectorAll(".pts li"),txt),
      paras:[].map.call(e.querySelectorAll("p:not(.org)"),txt)}})}
  return {
    name:txt(d.querySelector(".hero h1")),
    title:m.getAttribute("data-cv-title")||"",
    loc:txt(d.querySelector(".hero .loc")),
    email:mail?mail.getAttribute("href").replace("mailto:",""):"",
    linkedin:li?li.getAttribute("href").replace(/^https?:\/\/(www\.)?/,"").replace(/\/$/,""):"",
    summary:txt(d.querySelector(".lead")),
    exp:entries("#experience"),edu:entries("#education"),
    skills:[].map.call(d.querySelectorAll("#skills .chips li"),txt),
    certs:[].map.call(d.querySelectorAll("#skills .cc"),function(c){return txt(c.querySelector("h3"))+" - "+txt(c.querySelector("p"))}),
    acts:[].map.call(d.querySelectorAll("#activities .hl > div"),function(c){return {t:txt(c.querySelector("h3")),s:txt(c.querySelector("h4")),p:[].map.call(c.querySelectorAll("p"),txt)}})
  };
}
async function build(x){
  var PL=window.PDFLib,doc=await PL.PDFDocument.create();
  var F=await doc.embedFont(PL.StandardFonts.Helvetica),B=await doc.embedFont(PL.StandardFonts.HelveticaBold);
  var W=595.28,H=841.89,M=50,CW=W-2*M,page,y,K=PL.rgb(0,0,0);
  function np(){page=doc.addPage([W,H]);y=H-M}
  np();
  function wrap(t,f,s,w){var out=[],cur="";t.split(" ").forEach(function(wd){var tr=cur?cur+" "+wd:wd;if(cur&&f.widthOfTextAtSize(tr,s)>w){out.push(cur);cur=wd}else cur=tr});if(cur)out.push(cur);return out}
  function justLine(l,x,by,f,s,ws){var PLb=PL;page.setFont(f);var key=page.getFont()[1];
    page.pushOperators(PLb.beginText(),PLb.setFillingRgbColor(0,0,0),PLb.setFontAndSize(key,s),PLb.setWordSpacing(ws),PLb.moveText(x,by),PLb.showText(f.encodeText(l)),PLb.setWordSpacing(0),PLb.endText())}
  function para(t,o){o=o||{};t=clean(t);if(!t)return;var f=o.bold?B:F,s=o.size||10.5,lh=s*1.4,ind=o.indent||0,w=CW-ind,al=o.align||"justify",ls=wrap(t,f,s,w);
    ls.forEach(function(l,i){if(y-lh<M)np();
      if(o.bullet&&i===0)page.drawText("\u2022",{x:M+2,y:y-s,size:s,font:F,color:K});
      var lw=f.widthOfTextAtSize(l,s),x=M+ind,n=l.split(" ").length-1;
      if(al==="center")page.drawText(l,{x:M+(CW-lw)/2,y:y-s,size:s,font:f,color:K});
      else if(al==="justify"&&i<ls.length-1&&n>0&&(w-lw)/n<8)justLine(l,x,y-s,f,s,(w-lw)/n);
      else page.drawText(l,{x:x,y:y-s,size:s,font:f,color:K});
      y-=lh})}
  function gap(g){y-=g}
  function head(t){if(y-70<M)np();gap(10);para(t.toUpperCase(),{bold:true,size:11.5});
    page.drawLine({start:{x:M,y:y+1},end:{x:W-M,y:y+1},thickness:.8,color:K});gap(5)}
  function item(e){if(y-60<M)np();para(e.title,{bold:true});
    var sub=[e.org,e.when].filter(Boolean).join(" | ");para(sub);
    e.paras.forEach(function(p){para(p)});
    e.bullets.forEach(function(b){para(b,{bullet:true,indent:14})});gap(7)}
  para(x.name,{bold:true,size:22,align:"center"});
  para(x.title,{bold:true,size:11.5,align:"center"});gap(2);
  para([x.loc,x.email,x.linkedin].filter(Boolean).join(" | "),{size:10,align:"center"});
  head("Professional Summary");para(x.summary);
  head("Work Experience");x.exp.forEach(item);
  head("Education");x.edu.forEach(item);
  head("Skills");para(x.skills.join(", "));
  head("Certifications");x.certs.forEach(function(c){para(c,{bullet:true,indent:14});gap(2)});
  head("Activities and Volunteering");
  x.acts.forEach(function(a){if(y-50<M)np();para(a.s?a.t+" - "+a.s:a.t,{bold:true});a.p.forEach(function(p){para(p)});gap(7)});
  doc.setTitle(clean(x.name)+" - CV");doc.setAuthor(clean(x.name));doc.setSubject("Curriculum Vitae");
  doc.setKeywords(x.skills.map(clean));doc.setCreator("Portfolio CV generator");doc.setProducer("Portfolio CV generator");
  return doc.save();
}
function save(url,name){var a=d.createElement("a");a.href=url;a.download=name;d.body.appendChild(a);a.click();a.remove()}
btn.addEventListener("click",function(e){
  if(!window.PDFLib)return;
  e.preventDefault();
  build(gather()).then(function(bytes){
    var url=URL.createObjectURL(new Blob([bytes],{type:"application/pdf"}));
    save(url,"Salma-Akter-CV.pdf");setTimeout(function(){URL.revokeObjectURL(url)},4000);
  }).catch(function(){save(btn.getAttribute("href"),"Salma-Akter-CV.pdf")});
});
})();
