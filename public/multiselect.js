const multiFilterIds=new Set(['date','operator','brand','client','operationType','driverPeriod','driverOperator','driverOperation']);
function filterValues(id){const select=document.getElementById(id);return select.selectedOptions?[...select.selectedOptions].map(o=>o.value).filter(Boolean):select.value?[select.value]:[];}
function filterMatches(id,value){const selected=filterValues(id);return !selected.length||selected.includes(value);}
function setFilterOptions(id,values,format=x=>x){
 const select=document.getElementById(id),previous=new Set(filterValues(id));
 select.innerHTML='<option value="">Todos</option>'+[...new Set(values)].sort().map(v=>`<option value="${esc(v)}">${esc(format(v))}</option>`).join('');
 if(!multiFilterIds.has(id)){if([...select.options].some(o=>previous.has(o.value)))select.value=[...previous][0];return;}
 select.multiple=true;for(const option of select.options)option.selected=previous.has(option.value);
 enhanceMultiFilter(select);
}
function enhanceMultiFilter(select){
 let details=select.parentElement.querySelector('.multi-filter');
 if(!details){details=document.createElement('details');details.className='multi-filter';details.innerHTML='<summary></summary><div class="multi-options"></div>';select.after(details);select.hidden=true;
 details.addEventListener('change',event=>{const box=event.target;if(box.type!=='checkbox')return;for(const option of select.options){if(box.value==='')option.selected=false;else if(option.value===box.value)option.selected=box.checked;}syncMultiFilter(select,details);select.dispatchEvent(new Event('change',{bubbles:true}));});
 details.addEventListener('click',event=>event.stopPropagation());
 }
 syncMultiFilter(select,details);
}
function syncMultiFilter(select,details){const values=filterValues(select.id),chosen=[...select.options].filter(o=>values.includes(o.value));details.querySelector('summary').textContent=chosen.length===1?chosen[0].textContent:chosen.length?chosen.length+' selecionados':'Todos';details.querySelector('.multi-options').innerHTML=[...select.options].map(o=>`<label class="multi-choice"><input type="checkbox" value="${esc(o.value)}" ${o.value?values.includes(o.value)?'checked':'':!values.length?'checked':''}>${esc(o.textContent)}</label>`).join('');}
document.addEventListener('click',()=>document.querySelectorAll('.multi-filter[open]').forEach(d=>d.open=false));
