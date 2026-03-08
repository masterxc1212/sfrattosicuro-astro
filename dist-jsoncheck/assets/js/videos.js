(async function(){
'use strict';
const API_KEY="AIzaSyCHsDTZf-Dmrce1mPnCIqEs3832dIbB25g";
const PLAYLIST_ID="PLwgun_cZLsXop3lhU9hEYwDkK-p3ppcQ7";
const grid=document.getElementById("videoGrid");
const status=document.getElementById("videoStatus");
if(!grid)return;
async function fetchVideos(){
try{
const res=await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=6&playlistId=${PLAYLIST_ID}&key=${API_KEY}`);
const data=await res.json();
if(!data.items)throw new Error("Nessun video");
return data.items.map(item=>({
videoId:item.snippet.resourceId.videoId,
title:item.snippet.title,
thumb:item.snippet.thumbnails.high.url
}));
}catch(err){
console.error("Errore YouTube:",err);
return[];
}
}
function render(videos){
if(!videos.length){
if(status)status.textContent="Nessuna video recensione disponibile al momento.";
return;
}
if(status)status.textContent="";
grid.innerHTML=videos.map(v=>
`<div class="video-card" onclick="openVideo('${v.videoId}')" role="button" tabindex="0" aria-label="Riproduci video ${v.title}" onkeypress="if(event.key==='Enter')openVideo('${v.videoId}')">
<img src="${v.thumb}" alt="${v.title}" class="video-thumb" loading="lazy" width="480" height="360">
<div class="video-play" aria-hidden="true"></div>
</div>`
).join("");
}
window.openVideo=function(videoId){
const embed=`<iframe class="video-iframe" src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" frameborder="0" allowfullscreen allow="autoplay; encrypted-media" title="Video recensione cliente" loading="lazy"></iframe>`;
const container=document.querySelector(`[onclick="openVideo('${videoId}')"]`);
if(container){
container.innerHTML=embed;
container.onclick=null;
}
};
const videos=await fetchVideos();
render(videos);
})();
