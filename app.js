(() => {
  const grid = document.querySelector('#rulefield');
  if (!grid) return;
  const scenarios = {
    baseline: {
      attention: 'Clarify which automations are producing verified client value and which are merely active.',
      consequence: 'Growth remains manageable when ownership, run evidence, and reuse mature together.',
      decision: 'Install one operating review that links client promise, run health, adoption, economics, and learning.',
      evidence: 'Outcome definition, owner, exception history, usage signal, support burden, reuse potential.',
      weights: ['value','authority','running','evidence','reusable','running','evidence','authority']
    },
    growth: {
      attention: 'Protect delivery quality while demand, staffing, and client commitments rise at different rates.',
      consequence: 'Without explicit capacity and service rules, custom work quietly converts growth into support debt.',
      decision: 'Segment the portfolio by repeatability, service burden, and client consequence before allocating capacity.',
      evidence: 'Pipeline-to-capacity, time-to-first-value, scope volatility, utilization, support load, gross-margin drivers.',
      weights: ['value','running','running','authority','running','exception','evidence','reusable']
    },
    strain: {
      attention: 'Find the handoff where client intent is being lost between sales, build, run, and adoption.',
      consequence: 'A portfolio can look busy while rework, exceptions, and unclear ownership absorb the economics.',
      decision: 'Define service boundaries, acceptance evidence, escalation paths, and a stop-work threshold.',
      evidence: 'Rework cause, change requests, failed handoffs, recovery time, unplanned support, owner response.',
      weights: ['exception','authority','exception','running','evidence','exception','value','authority']
    },
    trust: {
      attention: 'Contain the incident, preserve client trust, and convert the failure into an operating rule.',
      consequence: 'The real loss is not one failed run; it is repeating an avoidable failure without a learning mechanism.',
      decision: 'Use a blameless incident review tied to human authority, recovery evidence, client communication, and rule change.',
      evidence: 'Failure mode, affected decisions, human override, recovery time, recurrence risk, control change.',
      weights: ['exception','exception','authority','evidence','running','exception','reusable','evidence']
    }
  };
  const states = ['value','authority','running','evidence','reusable','exception'];
  for (let i=0;i<84;i++) {
    const cell=document.createElement('span');
    cell.className='cell';
    cell.setAttribute('aria-hidden','true');
    cell.dataset.state=states[i%5];
    grid.appendChild(cell);
  }
  const cells=[...grid.children];
  const els={
    attention:document.querySelector('#attention'), consequence:document.querySelector('#consequence'),
    decision:document.querySelector('#decision'), evidence:document.querySelector('#evidence')
  };
  let active='baseline';
  function seed(name){
    active=name; const s=scenarios[name];
    cells.forEach((cell,i)=>{cell.dataset.state=s.weights[(i*7 + Math.floor(i/12))%s.weights.length];cell.classList.remove('active')});
    Object.keys(els).forEach(k=>els[k].textContent=s[k]);
    document.querySelectorAll('.scenario-btn').forEach(b=>b.setAttribute('aria-pressed', String(b.dataset.scenario===name)));
  }
  document.querySelectorAll('.scenario-btn').forEach(btn=>btn.addEventListener('click',()=>seed(btn.dataset.scenario)));
  document.querySelector('#reset-field')?.addEventListener('click',()=>seed('baseline'));
  seed('baseline');
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
  let tick=0;
  setInterval(()=>{
    if(reduce.matches) return;
    const s=scenarios[active];
    const idx=(tick*13 + (tick%7)*3)%cells.length;
    const cell=cells[idx];
    cell.classList.add('active');
    setTimeout(()=>{cell.dataset.state=s.weights[(tick+idx)%s.weights.length];cell.classList.remove('active')},360);
    tick++;
  },420);
})();
