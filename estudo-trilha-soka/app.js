(function(){
fetch('data/trilha-soka.json').then(response=>{if(!response.ok)throw new Error('Não foi possível ler a base JSON.');return response.json();}).then(D=>{
  const $=s=>document.querySelector(s);
  const $$=s=>Array.from(document.querySelectorAll(s));
  const byConcept=Object.fromEntries(D.concepts.map(x=>[x.id,x]));
  const byModule=Object.fromEntries(D.modules.map(x=>[x.number,x]));
  const byEdge=Object.fromEntries(D.edges.map(x=>[x.id,x]));
  const moduleName=n=>"Módulo "+n;
  const esc=s=>String(s==null?"":s).replace(/[&<>\"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c]));
  const categoryClass=c=>({"princípio budista":"principio","conceito filosófico":"filosofico","prática religiosa":"pratica","personagem histórico":"pessoa","instituição":"instituicao","acontecimento ou efeito":"evento","metáfora":"metafora","personagem ou narrativa":"narrativa","instituição ou local":"local"}[c]||"conceito");
  let currentGraph=D.graphs[0],selectedConcept=null,selectedEdge=null,timelineRedraw=()=>{};
  const layouts={
    ichinen:{w:1860,h:1110,pos:{"dez-mundos":[300,140],"possessao-mutua":[560,140],"dez-fatores":[870,140],"tres-dominios":[1250,140],"ichinen-sanzen":[1640,140],"mundo-inferno":[190,300],"mundo-fome":[410,300],"mundo-animalidade":[190,420],"mundo-ira":[410,420],"mundo-tranquilidade":[190,540],"mundo-alegria":[410,540],"mundo-erudicao":[190,660],"mundo-absorcao":[410,660],"mundo-bodhisattva":[190,780],"mundo-buda":[410,780],"fator-aparencia":[770,300],"fator-natureza":[990,300],"fator-entidade":[770,420],"fator-poder":[990,420],"fator-influencia":[770,540],"fator-causa-interna":[990,540],"fator-relacao":[770,660],"fator-efeito-latente":[990,660],"fator-efeito-manifesto":[770,780],"fator-consistencia":[990,780],"cinco-componentes":[1490,350],"seres-vivos":[1490,500],"meio-ambiente":[1490,650]}},
    "tres-leis":{w:1050,h:650,pos:{"tres-leis":[525,115],santuario:[190,300],gohonzon:[525,300],daimoku:[860,300],preceitos:[190,510],meditacao:[525,510],sabedoria:[860,510]}},
    venenos:{w:1580,h:760,pos:{"tres-venenos":[130,365],avareza:[360,170],ira:[360,365],estupidez:[360,560],ilusoes:[610,260],"tres-calamidades":[850,260],fome:[1080,130],peste:[1080,300],guerra:[1080,470],transformacao:[1300,260],pratica:[1490,260]}},
    dominios:{w:1280,h:650,pos:{"tres-dominios":[620,110],"cinco-componentes":[250,295],"seres-vivos":[640,295],"meio-ambiente":[1030,295],forma:[90,520],percepcao:[300,520],conceicao:[510,520],volicao:[720,520],consciencia:[930,520]}},
    observar:{w:1050,h:640,pos:{"observar-mente":[800,300],gohonzon:[250,150],"dez-mundos":[550,150],"estado-buda":[300,480],daimoku:[650,480],"ichinen-sanzen":[550,300]}},
    causa:{w:1350,h:700,pos:{"nam-myoho-renge-kyo":[180,150],"estado-buda":[520,150],fé:[830,150],simultaneidade:[1180,150],determinacao:[230,500],niji:[675,500],pratica:[1120,500]}},
    myo:{w:1050,h:620,pos:{myo:[530,150],abrir:[230,360],"dotado-perfeicao":[530,360],reviver:[830,360],daimoku:[240,150],"estado-buda":[830,150]}},
    beneficio:{w:1100,h:600,pos:{"verdadeiro-aspecto":[250,170],"vida-eterna":[550,170],kudoku:[850,170],"estado-buda":[300,430],pratica:[800,430]}},
    gratidao:{w:1100,h:620,pos:{"dozen-bo":[180,190],gratidão:[460,190],"mestre-discipulo":[460,450],sabedoria:[730,310],compaixao:[970,190],"kosen-rufu":[970,450]}},
    sucessao:{w:1350,h:700,pos:{makiguchi:[150,160],"josei-toda":[400,160],"daisaku-ikeda":[650,160],"soka-gakkai":[900,160],sgi:[1160,160],"mestre-discipulo":[360,470],indigo:[650,470],"revolucao-humana":[910,470],"kosen-rufu":[650,620]}},
    zuiho:{w:1000,h:620,pos:{"zuiho-bini":[500,130],keho:[300,340],kegui:[700,340],gohonzon:[270,520],"nam-myoho-renge-kyo":[520,520]}}
  };
  function go(name){
    const target=document.getElementById(name);if(!target)return;
    $$('.page-section').forEach(x=>x.classList.toggle('active-section',x.id===name));
    $$('.nav-button').forEach(x=>x.classList.toggle('active',x.dataset.section===name));
    window.scrollTo({top:0,behavior:'smooth'});
    if(name==='historia')requestAnimationFrame(timelineRedraw);
  }
  document.addEventListener('click',e=>{
    const start=e.target.closest('a[href="#inicio"]');if(start){e.preventDefault();go('inicio');return;}
    const n=e.target.closest('[data-section]');if(n){go(n.dataset.section);return;}
    const g=e.target.closest('[data-go]');if(g){go(g.dataset.go);return;}
  });
  function conceptChips(ids){return ids.map(id=>byConcept[id]).filter(Boolean).map(c=>'<button class="detail-chip" data-concept="'+esc(c.id)+'">'+esc(c.name)+'</button>').join('');}
  function setDetailConcept(c){
    selectedConcept=c.id;selectedEdge=null;
    const refs=c.sourceRef?'<p class="detail-label">Referência no arquivo</p><p>'+esc(c.sourceRef)+'</p>':'';
    const quotes=(c.quotes||[]).map(q=>'<p class="detail-quote">“'+esc(q.text)+'”<br><small>'+esc(q.attribution||'')+(q.source?' · '+esc(q.source):'')+'</small></p>').join('');
    $('#detail-panel').innerHTML='<p class="detail-type">'+esc(c.category)+'</p><h3>'+esc(c.name)+'</h3>'+(c.term?'<p><strong>Termo:</strong> '+esc(c.term)+'</p>':'')+'<p>'+esc(c.definition)+'</p><p class="detail-label">Contexto no curso</p><p>'+esc(c.context)+'</p><p class="detail-label">Módulos relacionados</p><div>'+c.modules.map(n=>'<button class="detail-chip" data-module="'+n+'">'+esc(moduleName(n))+'</button>').join('')+'</div><p class="detail-label">Conceitos relacionados</p><div>'+conceptChips(c.related)+'</div>'+quotes+refs;
  }
  function setDetailEdge(e){
    selectedEdge=e.id;selectedConcept=null;const a=byConcept[e.from],b=byConcept[e.to];
    const status=e.status==='explícita'?'Relação descrita diretamente no texto-base.':e.status==='complementar fornecida pelo usuário'?'Relação da lista complementar fornecida pelo usuário.':'Síntese inferida para organizar as explicações do texto; consulte a referência para avaliar seu alcance.';
    $('#detail-panel').innerHTML='<p class="detail-type">Relação entre conceitos</p><h3>'+esc(a.name)+' <span aria-hidden="true">→</span> '+esc(b.name)+'</h3>'+(e.label?'<p><strong>'+esc(e.label)+'.</strong></p>':'')+(e.description?'<p>'+esc(e.description)+'</p>':'')+'<p class="detail-label">Como ler</p><p>'+esc(status)+'</p><p class="detail-label">Referência</p><p>'+esc(e.sourceRef)+'</p><p class="detail-label">Nós</p><div>'+conceptChips([e.from,e.to])+'</div>';
  }
  function shortLines(label,max=16){const source=label==='Nam-myoho-renge-kyo'?'Nam-myoho renge-kyo':label,words=source.split(/\s+/),lines=[];let current='';for(const w of words){if((current+' '+w).trim().length>max&&current){lines.push(current);current=w;}else current=(current+' '+w).trim();}if(current)lines.push(current);return lines;}
  function renderGraph(g){
    currentGraph=g;selectedConcept=null;selectedEdge=null;
    const layout=layouts[g.id]||{w:1100,h:640,pos:{}};
    const categories=Array.from(new Set(g.nodes.map(id=>byConcept[id]).filter(Boolean).map(c=>c.category)));
    const categoryLegend=categories.map(category=>'<span class="category-legend-item"><i class="category-swatch '+categoryClass(category)+'"></i>'+esc(category)+'</span>').join('');
    $('#graph-summary').innerHTML='<h3>'+esc(g.title)+'</h3><p>'+esc(g.goal)+' <span class="source-ref">'+esc(g.sourceRef)+'</span></p><div class="category-legend" aria-label="Categorias do mapa">'+categoryLegend+'</div>';
    const scale=1,W=layout.w*scale,H=layout.h*scale,nodeW=156,nodeH=76,positions={};
    g.nodes.forEach((id,i)=>{const p=layout.pos[id]||[130+(i%4)*230,150+Math.floor(i/4)*170];positions[id]=[p[0]*scale,p[1]*scale];});
    let parts=['<svg width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="xMidYMid meet" role="img" aria-label="'+esc(g.title)+'"><defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#718b84"></path></marker></defs><g id="map-layer">'];
    g.edges.map(id=>byEdge[id]).filter(Boolean).forEach(e=>{
      const p1=positions[e.from],p2=positions[e.to];if(!p1||!p2)return;
      const dx=p2[0]-p1[0],dy=p2[1]-p1[1],length=Math.max(1,Math.hypot(dx,dy)),ux=dx/length,uy=dy/length;
      const sx=p1[0]+ux*nodeW*.43,sy=p1[1]+uy*nodeH*.43,tx=p2[0]-ux*nodeW*.47,ty=p2[1]-uy*nodeH*.47,label=e.label||'';
      let d='M '+sx+' '+sy+' L '+tx+' '+ty,mx=(sx+tx)/2,my=(sy+ty)/2-(Math.abs(dy)<35?nodeH*.78:12)+(Number(e.labelOffsetY)||0);
      if(e.route==='arco-superior'){const startY=p1[1]-nodeH/2,endY=p2[1]-nodeH/2,controlY=Math.min(startY,endY)-130;d='M '+p1[0]+' '+startY+' Q '+mx+' '+controlY+' '+p2[0]+' '+endY;my=(startY+endY+2*controlY)/4-18;}
      const labelW=Math.min(240,Math.max(68,label.length*7+22)),labelMarkup=label?'<rect class="edge-label-bg" x="'+(mx-labelW/2)+'" y="'+(my-12)+'" width="'+labelW+'" height="24" rx="7"></rect><text class="edge-label" x="'+mx+'" y="'+(my+4)+'">'+esc(label)+'</text>':'';
      const edgeClass=e.status==='inferida a partir do texto'?'inferred':e.status==='complementar fornecida pelo usuário'?'supplementary':'';
      parts.push('<g class="edge-group" tabindex="0" role="button" data-edge="'+esc(e.id)+'" aria-label="'+esc(byConcept[e.from].name+' '+(label||e.description||'relaciona-se a')+' '+byConcept[e.to].name)+'"><path class="edge-path '+edgeClass+'" d="'+d+'"></path>'+labelMarkup+'</g>');
    });
    g.nodes.forEach(id=>{
      const c=byConcept[id],p=positions[id];if(!c||!p)return;
      const lines=shortLines(c.name,16),lineHeight=19,startY=-((lines.length-1)*lineHeight)/2;
      parts.push('<g class="node-card '+categoryClass(c.category)+'" tabindex="0" role="button" data-node="'+esc(id)+'" aria-label="'+esc(c.name)+', '+esc(c.category)+'" transform="translate('+p[0]+' '+p[1]+')"><rect x="'+(-nodeW/2)+'" y="'+(-nodeH/2)+'" width="'+nodeW+'" height="'+nodeH+'"></rect><text class="node-label" x="0" y="'+startY+'">'+lines.map((x,i)=>'<tspan x="0" dy="'+(i===0?0:lineHeight)+'">'+esc(x)+'</tspan>').join('')+'</text></g>');
    });
    if(g.equation){const x=W/2,y=960,w=560,h=112;parts.push('<g class="equation-card" transform="translate('+x+' '+y+')"><rect x="'+(-w/2)+'" y="'+(-h/2)+'" width="'+w+'" height="'+h+'" rx="12"></rect><text class="equation-title" x="0" y="-32">'+esc(g.equation.title)+'</text><text class="equation-lines" x="0" y="-7">'+g.equation.lines.map((line,i)=>'<tspan x="0" dy="'+(i===0?0:24)+'">'+esc(line)+'</tspan>').join('')+'</text></g>');}
    parts.push('</g></svg>');$('#graph-viewport').innerHTML=parts.join('');$('#detail-panel').innerHTML='<div class="detail-empty"><span class="detail-symbol">◉</span><p>Selecione um conceito ou uma conexão para consultar os detalhes.</p></div>';
    $('#graph-list').innerHTML=D.graphs.filter(x=>visibleGraph(x)).map(x=>'<button class="'+(x.id===g.id?'active':'')+'" data-graph="'+esc(x.id)+'">'+esc(x.title)+'</button>').join('');
    installPanZoom();
  }
  function visibleGraph(g){const m=$('#graph-module-filter').value;return m==='todos'||g.modules.includes(Number(m));}
  function fillGraphLists(){
    $('#graph-select').innerHTML=D.graphs.map(g=>'<option value="'+esc(g.id)+'">'+esc(g.title)+'</option>').join('');
    $('#graph-module-filter').innerHTML='<option value="todos">Todos</option>'+D.modules.map(m=>'<option value="'+m.number+'">Módulo '+m.number+'</option>').join('');
    $('#graph-list').addEventListener('click',e=>{const b=e.target.closest('[data-graph]');if(b){$('#graph-select').value=b.dataset.graph;renderGraph(D.graphs.find(x=>x.id===b.dataset.graph));}});
    $('#graph-select').addEventListener('change',e=>renderGraph(D.graphs.find(x=>x.id===e.target.value)));
    $('#graph-module-filter').addEventListener('change',()=>{let chosen=D.graphs.find(g=>g.id===$('#graph-select').value);if(!visibleGraph(chosen))chosen=D.graphs.find(visibleGraph)||D.graphs[0];$('#graph-select').value=chosen.id;renderGraph(chosen);});
    $('#graph-viewport').addEventListener('click',e=>{const n=e.target.closest('[data-node]'),ed=e.target.closest('[data-edge]');if(n){const c=byConcept[n.dataset.node];setDetailConcept(c);$$('.node-card').forEach(x=>x.classList.toggle('selected',x.dataset.node===c.id));}else if(ed){setDetailEdge(byEdge[ed.dataset.edge]);}});
    $('#graph-viewport').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){const n=e.target.closest('[data-node]'),ed=e.target.closest('[data-edge]');if(n)setDetailConcept(byConcept[n.dataset.node]);if(ed)setDetailEdge(byEdge[ed.dataset.edge]);}});
    $('#graph-search').addEventListener('input',e=>{const q=e.target.value.trim().toLocaleLowerCase('pt-BR');$$('.node-card').forEach(n=>{const c=byConcept[n.dataset.node];n.style.opacity=!q||c.name.toLocaleLowerCase('pt-BR').includes(q)||c.term&&c.term.toLocaleLowerCase('pt-BR').includes(q)?'1':'.2';});});
  }
  function installPanZoom(){
    const view=$('#graph-viewport'),svg=view.querySelector('svg'),layer=svg&&svg.querySelector('#map-layer');if(!svg||!layer)return;
    let scale=1,tx=0,ty=0,drag=null;const apply=()=>layer.setAttribute('transform','translate('+tx+' '+ty+') scale('+scale+')');
    const point=e=>{const p=svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;return p.matrixTransform(svg.getScreenCTM().inverse());};
    const fit=()=>{svg.style.width='100%';svg.style.height='100%';scale=1;tx=0;ty=0;apply();view.scrollTo({top:0,left:0});};
    $('#graph-fit').onclick=fit;
    view.onpointerdown=e=>{if(e.target.closest('[data-node],[data-edge]'))return;const p=point(e);drag={x:p.x-tx,y:p.y-ty};view.classList.add('dragging');view.setPointerCapture(e.pointerId);};
    view.onpointermove=e=>{if(!drag)return;const p=point(e);tx=p.x-drag.x;ty=p.y-drag.y;apply();};
    view.onpointerup=()=>{drag=null;view.classList.remove('dragging');};
    view.onwheel=e=>{if(!e.ctrlKey)return;e.preventDefault();const p=point(e),next=Math.max(.4,Math.min(2.2,scale*(e.deltaY<0?1.08:.92)));tx=p.x-(p.x-tx)*next/scale;ty=p.y-(p.y-ty)*next/scale;scale=next;apply();};
  }
  function renderOverview(){
    $('#concept-count').textContent=D.concepts.length;$('#graph-count').textContent=D.graphs.length;$('#event-count').textContent=D.timeline.length;
    $('#overview-modules').innerHTML=D.modules.map(m=>'<article class="module-card" data-open-module="'+m.number+'"><div><span class="module-num">0'+m.number+'</span><h3>'+esc(m.title)+'</h3></div><span class="module-arrow" aria-hidden="true">↗</span></article>').join('');
    $('#overview-modules').addEventListener('click',e=>{const card=e.target.closest('[data-open-module]');if(card){go('modulos');document.getElementById('module-'+card.dataset.openModule).scrollIntoView({behavior:'smooth',block:'start'});}});
    $('#overview-graphs').innerHTML=D.graphs.map(g=>'<article class="graph-card" data-open-graph="'+esc(g.id)+'"><p class="eyebrow">'+esc(g.theme)+'</p><h3>'+esc(g.title)+'</h3><p>'+esc(g.goal)+'</p><div class="card-foot"><span>'+g.nodes.length+' conceitos · '+g.modules.map(moduleName).join(', ')+'</span><span aria-hidden="true">↗</span></div></article>').join('');
    $('#overview-graphs').addEventListener('click',e=>{const card=e.target.closest('[data-open-graph]');if(card){go('mapas');$('#graph-select').value=card.dataset.openGraph;renderGraph(D.graphs.find(g=>g.id===card.dataset.openGraph));}});
  }
  function renderModules(){
    $('#module-details').innerHTML=D.modules.map(m=>'<article class="module-detail" id="module-'+m.number+'"><div class="module-detail-head"><span class="module-detail-num">'+m.number+'</span><h3>'+esc(m.title)+'</h3></div><p>'+esc(m.summary)+'</p><p class="detail-label">Objetivo</p><p>'+esc(m.objective)+'</p><p class="detail-label">Conceitos fundamentais</p><div class="concept-chips">'+conceptChips(m.concepts)+'</div><p class="detail-label">Relação com outros módulos</p><p>'+esc(m.relations[0])+'</p><p class="glossary-meta">'+esc(m.sourceRef)+'</p></article>').join('');
  }
  const month={janeiro:1,fevereiro:2,março:3,abril:4,maio:5,junho:6,julho:7,agosto:8,setembro:9,outubro:10,novembro:11,dezembro:12};
  function dateKey(s){let y=(s.match(/\d{4}/)||['0'])[0],m=0,d=0;const mt=s.toLocaleLowerCase('pt-BR').match(/(janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)/);if(mt)m=month[mt[1]];const dt=s.match(/^\s*(\d{1,2})\s+de\s/);if(dt)d=Number(dt[1]);const range=s.match(/(\d{4})\s*[–-]\s*(\d{4})/);return Number((range?range[1]:y)+String(m).padStart(2,'0')+String(d).padStart(2,'0'));}
  function renderTimeline(){
    const persons=Array.from(new Set(D.timeline.map(e=>e.person.split('; ')).flat())).sort((a,b)=>a.localeCompare(b,'pt-BR'));
    $('#timeline-person').innerHTML='<option value="todos">Todos</option>'+persons.map(p=>'<option>'+esc(p)+'</option>').join('');
    const timeline=$('#timeline');
    const columns=()=>window.innerWidth>1100?4:window.innerWidth>760?3:window.innerWidth>480?2:1;
    const drawPath=()=>{
      timeline.querySelector('.timeline-path')?.remove();
      const cards=Array.from(timeline.querySelectorAll('.timeline-item'));
      if(cards.length<2||!timeline.clientWidth)return;
      const box=timeline.getBoundingClientRect(),points=cards.map(card=>{const r=card.getBoundingClientRect();return [r.left-box.left+r.width/2,r.top-box.top+r.height/2];});
      const path=points.map((p,i)=>(i?'L ':'M ')+p[0]+' '+p[1]).join(' ');
      const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('class','timeline-path');svg.setAttribute('viewBox','0 0 '+timeline.clientWidth+' '+timeline.clientHeight);svg.setAttribute('aria-hidden','true');
      const line=document.createElementNS('http://www.w3.org/2000/svg','path');line.setAttribute('d',path);svg.appendChild(line);timeline.insertBefore(svg,timeline.firstChild);
    };
    timelineRedraw=drawPath;
    const update=()=>{
      const who=$('#timeline-person').value,q=$('#timeline-search').value.trim().toLocaleLowerCase('pt-BR');
      const events=D.timeline.slice().sort((a,b)=>dateKey(a.date)-dateKey(b.date)||a.title.localeCompare(b.title,'pt-BR')).filter(ev=>(who==='todos'||ev.person.split('; ').includes(who))&&(!q||(ev.title+' '+ev.description+' '+ev.date+' '+ev.person).toLocaleLowerCase('pt-BR').includes(q)));
      $('#timeline-result-count').textContent=events.length+' acontecimentos';
      const cols=columns();
      timeline.innerHTML=events.length?events.map((ev,i)=>{const row=Math.floor(i/cols),slot=i%cols,col=row%2===0?slot+1:cols-slot;return '<article class="timeline-item" style="--row:'+(row+1)+';--col:'+col+'"><div class="timeline-card"><span class="timeline-date">'+esc(ev.date)+'</span><h3>'+esc(ev.title)+'</h3><span class="timeline-person">'+esc(ev.person)+'</span><p>'+esc(ev.description)+'</p><details><summary>Contexto no módulo</summary><p class="timeline-more">'+esc(ev.importance)+' · '+esc(ev.sourceRef)+' · Módulo '+ev.module+'</p></details></div></article>';}).join(''):'<p class="no-events">Nenhum acontecimento encontrado com esses filtros.</p>';
      requestAnimationFrame(drawPath);
    };
    let resizeTimer;window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(update,120);},{passive:true});
    $('#timeline-person').addEventListener('change',update);$('#timeline-search').addEventListener('input',update);update();
  }
  function renderGlossary(){
    const categories=Array.from(new Set(D.concepts.map(c=>c.category))).sort((a,b)=>a.localeCompare(b,'pt-BR'));
    $('#glossary-category').innerHTML='<option value="todas">Todas</option>'+categories.map(c=>'<option>'+esc(c)+'</option>').join('');
    const cards=D.concepts.slice().sort((a,b)=>a.name.localeCompare(b.name,'pt-BR')).map(c=>'<article class="glossary-card" data-glossary="'+esc(c.id)+'" data-category="'+esc(c.category)+'"><h3>'+esc(c.name)+'</h3>'+(c.term?'<p class="glossary-term">'+esc(c.term)+'</p>':'')+'<p>'+esc(c.definition)+'</p><p class="glossary-meta">'+esc(c.category)+' · '+c.modules.map(moduleName).join(', ')+' · '+esc(c.sourceRef)+'</p></article>').join('');
    $('#glossary-list').innerHTML=cards;
    const update=()=>{const q=$('#glossary-search').value.trim().toLocaleLowerCase('pt-BR'),cat=$('#glossary-category').value;let count=0;$$('.glossary-card').forEach(el=>{const c=byConcept[el.dataset.glossary],text=(c.name+' '+(c.term||'')+' '+c.definition+' '+c.category).toLocaleLowerCase('pt-BR'),show=(!q||text.includes(q))&&(cat==='todas'||cat===c.category);el.hidden=!show;if(show)count++;});$('#glossary-count').textContent=count+' conceitos';};
    $('#glossary-search').addEventListener('input',update);$('#glossary-category').addEventListener('change',update);update();
    $('#glossary-list').addEventListener('click',e=>{const card=e.target.closest('[data-glossary]');if(card){go('mapas');const c=byConcept[card.dataset.glossary];setDetailConcept(c);}});
  }
  document.addEventListener('click',e=>{
    const c=e.target.closest('[data-concept]');if(c){const item=byConcept[c.dataset.concept];if(item){go('mapas');setDetailConcept(item);}return;}
    const m=e.target.closest('[data-module]');if(m){go('modulos');const target=document.getElementById('module-'+m.dataset.module);if(target)target.scrollIntoView({behavior:'smooth'});}
  });
  $('#global-search').addEventListener('keydown',e=>{if(e.key==='Enter'){const q=e.target.value.toLocaleLowerCase('pt-BR');const found=D.concepts.find(c=>c.name.toLocaleLowerCase('pt-BR').includes(q)||(c.term||'').toLocaleLowerCase('pt-BR').includes(q));if(found){go('glossario');$('#glossary-search').value=found.name;$('#glossary-search').dispatchEvent(new Event('input'));const el=document.querySelector('[data-glossary="'+found.id+'"]');if(el)el.scrollIntoView({behavior:'smooth',block:'center'});}}});
  document.addEventListener('keydown',e=>{if(e.key==='/'&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)){e.preventDefault();$('#global-search').focus();}if(e.key==='Escape'){$('#global-search').blur();}});
  renderOverview();renderModules();fillGraphLists();renderGraph(D.graphs[0]);renderTimeline();renderGlossary();
}).catch(()=>{document.querySelector('main').innerHTML='<section class="page-section active-section"><div class="notice"><p>Não foi possível carregar a base JSON. Abra este projeto por um servidor local, conforme as instruções do README.</p></div></section>';});
})();
