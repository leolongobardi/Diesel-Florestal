// One route controls the visible page, its heading and the selected sidebar item.
const dieselViews={
 overview:['Visão geral','PAINEL DE CONSUMO','Uma visão integrada do diesel e da movimentação da frota.'],
 imports:['Gerenciar importações','BASES COMPARTILHADAS','Acompanhe os arquivos importados e gerencie a participação de cada base nas análises.'],
 drivers:['Análise por motorista','EFICIÊNCIA NA CONDUÇÃO','Compare consumo, utilização e comportamento de condução por motorista.'],
 cadastro:['Cadastro Telemetria','BASE DE REFERÊNCIA','Relacione placas, equipamentos e tipos de operação às bases de consumo.'],
 parameters:['Parametrização','CONTROLE DA ANÁLISE','Escolha os empresas e as placas que participam dos indicadores e rankings.'],
 daily:['Histórico diário','EVOLUÇÃO DO CONSUMO','Acompanhe dia a dia o rendimento, as distâncias CAN e GPS e os litros consumidos.'],
 operators:['Empresas','DESEMPENHO POR EMPRESA','Compare a movimentação e o consumo ponderado de cada empresa.'],
 brands:['Marcas e modelos','PERFIL DA FROTA','Compare o rendimento das marcas e dos modelos no período selecionado.'],
 fleet:['Placas','DESEMPENHO DOS VEÍCULOS','Explore os destaques da frota e os dados de telemetria de cada placa.'],
 quality:['Qualidade dos dados','CONFIABILIDADE DA ANÁLISE','Confira registros válidos, inconsistências e as regras de cálculo do consumo.']
};
function navigateView(route,{historyMode='push',focus=false,scroll=true}={}){
 if(!Object.hasOwn(dieselViews,route))route='overview';
 const detail=['imports','drivers','cadastro','parameters'].includes(route);
 for(const id of ['dashboard','imports','drivers','cadastro','parameters'])$(id).hidden=id==='dashboard'?detail:id!==route;
 for(const section of document.querySelectorAll('#dashboard [data-analysis]'))section.hidden=route!=='overview'&&section.dataset.analysis!==route;
 const grid=$('daily').parentElement;
 grid.hidden=!['overview','daily','operators'].includes(route);
 grid.classList.toggle('dashboard-focus',route!=='overview');
 document.querySelectorAll('nav a').forEach(link=>{
  const selected=link.getAttribute('href')==='#'+route;
  link.style.background='';
  if(selected)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');
 });
 const [title,eyebrow,description]=dieselViews[route];
 $('pageTitle').textContent=title;$('pageEyebrow').textContent=eyebrow;$('pageDescription').textContent=description;
 document.title=title+' · Diesel Florestal';
 $('qualityDetails').open=route==='quality';
 if(route==='parameters')renderParams();
 if(route==='imports')renderImports();
 if(route==='cadastro')renderCadastro();
 if(route==='drivers')renderDrivers();
 // Valid hash routes take precedence over legacy import/login query shortcuts.
 if(historyMode!=='none'&&location.hash!=='#'+route){const url=new URL(location.href);url.hash=route;history[historyMode==='replace'?'replaceState':'pushState'](null,'',url);}
 if(route==='overview'&&typeof renderPositions==='function')renderPositions();
 if(scroll)window.scrollTo({top:0,behavior:'instant'});
 if(focus)$('pageTitle').focus({preventScroll:true});
}
document.querySelector('nav').addEventListener('click',event=>{
 const link=event.target.closest('a[href^="#"]');if(!link)return;
 event.preventDefault();navigateView(link.getAttribute('href').slice(1),{focus:true});
});
window.addEventListener('popstate',()=>navigateView(location.hash.slice(1),{historyMode:'none'}));
window.addEventListener('hashchange',()=>navigateView(location.hash.slice(1),{historyMode:'none'}));
navigateView(location.hash.slice(1),{historyMode:'none',scroll:false});
