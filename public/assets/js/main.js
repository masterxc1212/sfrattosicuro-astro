(function(){
'use strict';
function initLazyLoad(){
if('IntersectionObserver'in window){
const io=new IntersectionObserver((entries,obs)=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
const img=entry.target;
if(!img.hasAttribute('loading'))img.setAttribute('loading','lazy');
if(img.dataset.src){
img.src=img.dataset.src;
img.removeAttribute('data-src');
}
obs.unobserve(img);
}
});
},{rootMargin:'50px'});
document.querySelectorAll('img:not([fetchpriority="high"])').forEach(img=>io.observe(img));
}else{
document.querySelectorAll('img:not([fetchpriority="high"])').forEach(img=>{
if(!img.hasAttribute('loading'))img.setAttribute('loading','lazy');
});
}
}
function initSmoothScroll(){
document.querySelectorAll('a[href^="#"]').forEach(link=>{
link.addEventListener('click',function(e){
const href=this.getAttribute('href');
if(!href||href==='#')return;
e.preventDefault();
const targetId=href.substring(1);
const target=document.getElementById(targetId);
if(!target)return;
const header=document.getElementById('site-header');
const headerHeight=header?header.offsetHeight:90;
const isMobile=window.innerWidth<=640;
const extraOffset=isMobile?50:30;
const targetPosition=target.getBoundingClientRect().top+window.pageYOffset;
const offsetPosition=targetPosition-headerHeight-extraOffset;
window.scrollTo({
top:offsetPosition,
behavior:'smooth'
});
if(history.pushState){
history.pushState(null,null,href);
}
});
});
}
function optimizeForms(){
const forms=document.querySelectorAll('form');
forms.forEach(form=>{
form.addEventListener('submit',function(e){
const submitBtn=this.querySelector('button[type="submit"]');
if(submitBtn&&!submitBtn.disabled){
submitBtn.disabled=true;
submitBtn.classList.add('loading');
setTimeout(()=>{
submitBtn.disabled=false;
submitBtn.classList.remove('loading');
},3000);
}
});
const inputs=form.querySelectorAll('input[required],select[required],textarea[required]');
inputs.forEach(input=>{
input.addEventListener('blur',function(){
if(!this.validity.valid){
this.classList.add('border-red-500');
}else{
this.classList.remove('border-red-500');
}
});
});
});
}
function loadFontAwesome(){
const link=document.querySelector('link[href*="font-awesome"]');
if(link&&link.media==='print'){
link.media='all';
}
}
function init(){
initLazyLoad();
setTimeout(()=>{
initSmoothScroll();
},100);
optimizeForms();
loadFontAwesome();
document.querySelectorAll('.btn-primary,.btn-secondary,.card-shadow').forEach(el=>{
el.addEventListener('transitionend',function(){
this.style.willChange='auto';
},{once:true});
});
}
window.addEventListener('load',init);
if(document.readyState==='complete'){
init();
}
})();
