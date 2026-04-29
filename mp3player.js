(function(){
  const container = document.createElement("div");
  container.id = "mp3-player";
  container.style = "background:#fff;padding:20px;border-radius:10px;width:400px;margin:auto;box-shadow:0 4px 8px rgba(0,0,0,0.1);";

  container.innerHTML = `
    <h3>我的 MP3 播放器</h3>
    <audio id="audio" controls></audio>
    <div>
      <button id="prev">⏮ 上一首</button>
      <button id="next">⏭ 下一首</button>
      <button id="mode">模式: 顺序</button>
      <button id="download">⬇ 下载</button>
    </div>
    <ul id="playlist"></ul>
  `;

  document.body.appendChild(container);

  // 以下 JS 逻辑同之前
  const tracks = [
    {title:"歌曲1", src:"song1.mp3"},
    {title:"歌曲2", src:"song2.mp3"},
    {title:"歌曲3", src:"song3.mp3"}
  ];

  let currentIndex = 0;
  let playMode = 0;
  const audio = document.getElementById("audio");
  const playlist = document.getElementById("playlist");
  const modeBtn = document.getElementById("mode");
  const downloadBtn = document.getElementById("download");

  function renderPlaylist(){
    playlist.innerHTML = "";
    tracks.forEach((track, idx)=>{
      const li = document.createElement("li");
      li.textContent = track.title;
      li.style.cursor = "pointer";
      li.style.borderBottom = "1px solid #eee";
      li.style.padding = "5px";
      li.onclick = ()=>playTrack(idx);
      if(idx===currentIndex) li.style.background="#d0eaff";
      playlist.appendChild(li);
    });
  }

  function playTrack(index){
    currentIndex=index;
    audio.src=tracks[index].src;
    audio.play();
    updateActive();
  }

  function updateActive(){
    const items = playlist.querySelectorAll("li");
    items.forEach((li,idx)=>li.style.background = idx===currentIndex?"#d0eaff":"");
  }

  function switchMode(){
    playMode=(playMode+1)%3;
    modeBtn.textContent=["模式: 顺序","模式: 循环","模式: 单曲"][playMode];
  }

  function nextTrack(){
    if(playMode===2){audio.currentTime=0;audio.play(); return;}
    currentIndex++;
    if(currentIndex>=tracks.length){ if(playMode===1) currentIndex=0; else {currentIndex=tracks.length-1; return;} }
    playTrack(currentIndex);
  }

  function prevTrack(){
    currentIndex--;
    if(currentIndex<0){ if(playMode===1) currentIndex=tracks.length-1; else {currentIndex=0; return;} }
    playTrack(currentIndex);
  }

  function downloadTrack(){
    const a=document.createElement("a");
    a.href=tracks[currentIndex].src;
    a.download=tracks[currentIndex].title+".mp3";
    a.click();
  }

  audio.addEventListener("ended",nextTrack);
  document.getElementById("next").addEventListener("click",nextTrack);
  document.getElementById("prev").addEventListener("click",prevTrack);
  modeBtn.addEventListener("click",switchMode);
  downloadBtn.addEventListener("click",downloadTrack);

  renderPlaylist();
  playTrack(currentIndex);
})();