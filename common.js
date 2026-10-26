const sb=supabase.createClient(CFG.URL,CFG.ANON);
const $=i=>document.getElementById(i);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const note=(el,m,c)=>$(el).innerHTML=m?`<div class="msg ${c}">${m}</div>`:"";
const loadImg=s=>new Promise((r,j)=>{const i=new Image();i.crossOrigin="anonymous";i.onload=()=>r(i);i.onerror=j;i.src=s});
const DEF={tpl:null,f:{nama:{x:50,y:48,s:4.2,c:"#0d1b3d"},nip:{x:50,y:58,s:2.2,c:"#333333"},sek:{x:50,y:66,s:2.2,c:"#333333"}}};
async function getCfg(){const{data}=await sb.from("config").select("data").eq("id",1).maybeSingle();
 const d=data?.data||{};return{tpl:d.tpl||null,f:{...DEF.f,...(d.f||{})}}}
async function drawCert(cv,cfg,d){let img=null;if(cfg.tpl){try{img=await loadImg(cfg.tpl)}catch(e){}}
 const w=img?img.naturalWidth:1600,h=img?img.naturalHeight:1131;cv.width=w;cv.height=h;const g=cv.getContext("2d");
 if(img)g.drawImage(img,0,0,w,h);else{g.fillStyle="#fff";g.fillRect(0,0,w,h);g.strokeStyle="#b98a1e";g.lineWidth=w*.01;g.strokeRect(w*.03,h*.04,w*.94,h*.92);g.fillStyle="#0d1b3d";g.textAlign="center";g.font="bold "+w*.06+"px Georgia,serif";g.fillText("SERTIFIKAT",w/2,h*.25);g.font=w*.02+"px Georgia,serif";g.fillText("Diklat Online Sahwahita diberikan kepada:",w/2,h*.36)}
 g.textAlign="center";g.textBaseline="middle";
 for(const k of["nama","nip","sek"]){const f=cfg.f[k];g.fillStyle=f.c;g.font=(k==="nama"?"bold ":"")+w*f.s/100+"px Georgia,serif";g.fillText(k==="nip"?"NIP/NIPPPK: "+d.nip:d[k],w*f.x/100,h*f.y/100,w*.85)}}
