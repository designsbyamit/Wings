import React,{useMemo,useState} from "react";
import {createRoot} from "react-dom/client";
import * as XLSX from "xlsx";
import {Upload,Download,BarChart3,Target,Compass,Star} from "lucide-react";
import "./styles.css";

const seedProjects=[{name:"Sample project",industry:"Enterprise",role:"Designer",duration:6,skills:["Interaction design","Research"],outcome:"Improved workflow"}];
const tabs=["01 Career Data","02 Strengths","03 Interests","04 Market","05 Sweet Spot","06 Roadmap"];
function normalise(inputs){const inferred=["Research","Interaction design","Storytelling"];return {projects:seedProjects.map((p,i)=>({...p,name:inputs.length?"Imported project "+(i+1):p.name})),hardSkills:inferred,softSkills:["Communication","Collaboration","Strategic thinking"],sourceCount:inputs.length};}
function score(strength,interest,market){return Math.round(.35*strength+.25*interest+.4*market);}
function App(){
const [tab,setTab]=useState(0),[inputs,setInputs]=useState([]),[data,setData]=useState(normalise([]));
const [market,setMarket]=useState([{territory:"AI experience strategy",demand:88,trend:92,fit:78},{territory:"Design systems leadership",demand:82,trend:74,fit:91},{territory:"Research-led product strategy",demand:76,trend:80,fit:86}]);
const sweet=useMemo(()=>market.map(m=>({...m,score:score(m.fit,78,m.demand)})).sort((a,b)=>b.score-a.score),[market]);
const addFiles=files=>{const next=[...inputs,...[...files].map(f=>({name:f.name,type:f.type}))];setInputs(next);setData(normalise(next));};
const exportExcel=()=>{const wb=XLSX.utils.book_new();const sheets={
Projects:data.projects.map(p=>({Project:p.name,Industry:p.industry,Role:p.role,DurationMonths:p.duration,Skills:p.skills.join(", "),Outcome:p.outcome})),
"Hard Skills":data.hardSkills.map((s,i)=>({Skill:s,Type:"Hard",Frequency:Math.max(1,4-i),Confidence:80})),
"Soft Skills":data.softSkills.map((s,i)=>({Skill:s,Type:"Soft",Frequency:Math.max(1,5-i),Confidence:82})),
Interests:[{Interest:"Example interest",Pull:80,Energy:75,Depth:55,Persistence:65,Experimentation:50}],
"Market Signals":market.map(m=>({Territory:m.territory,Demand:m.demand,Trend:m.trend,Fit:m.fit})),
"Growth Opportunities":sweet.map(m=>({Territory:m.territory,OverallScore:m.score}))
};Object.entries(sheets).forEach(([n,rows])=>XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(rows),n.slice(0,31)));XLSX.writeFile(wb,"portfolio-career-dataset.xlsx");};
return <div className="app"><header><div><div className="eyebrow">PORTFOLIO CAREER LAB</div><h1>Beyond the Portfolio</h1><p>Turn career evidence into your next direction.</p></div><button onClick={exportExcel}><Download size={17}/> Export Excel</button></header>
<nav>{tabs.map((t,i)=><button className={tab===i?"active":""} onClick={()=>setTab(i)} key={t}>{t}</button>)}</nav>
<main>{tab===0&&<section><span className="kicker">PRE-WORK / ACTIVITY 1</span><h2>Career Data Playground</h2><p>Upload the messy stuff. The system turns it into a clean career dataset.</p><div className="drop"><div className="dropicon"><Upload/></div><h3>Drop anything here</h3><p>Resume, PDF, text, portfolio notes, spreadsheet, screenshots or audio.</p><input id="file" type="file" multiple onChange={e=>addFiles(e.target.files)}/><label htmlFor="file">Choose files</label></div><div className="grid2"><Card icon={<BarChart3/>} title="Project timeline"><div className="bars">{data.projects.map((p,i)=><div className="barrow" key={i}><span>{p.name}</span><div><i style={{width:Math.min(100,p.duration*11)+"%"}}/></div><b>{p.duration}m</b></div>)}</div></Card><Card icon={<Star/>} title="Skill constellation"><div className="chips">{[...data.hardSkills,...data.softSkills].map(s=><span key={s}>{s}</span>)}</div></Card></div></section>}{tab===1&&<Strengths data={data}/>} {tab===2&&<Interests/>}{tab===3&&<Market market={market} setMarket={setMarket}/>} {tab===4&&<Sweet sweet={sweet}/>} {tab===5&&<Roadmap/>}</main></div>}
const Card=({icon,title,children})=><div className="card"><div className="cardhead">{icon}<b>{title}</b></div>{children}</div>;
const Strengths=({data})=><section><span className="kicker">ACTIVITY 2</span><h2>Find Your Strengths</h2><p>Separate Hard Skills and Soft Skills. Challenge every claim with evidence.</p><div className="grid2"><Card icon={<Target/>} title="Hard Skills"><List items={data.hardSkills}/></Card><Card icon={<Compass/>} title="Soft Skills"><List items={data.softSkills}/></Card></div><div className="callout">Core = repeated + impactful + evidenced. Emerging = promising evidence. Unproven = claim without enough proof.</div></section>;
const List=({items})=><div>{items.map((x,i)=><div className="listrow" key={x}><span>{x}</span><small>{90-i*8}/100</small></div>)}</div>;
const Interests=()=> <section><span className="kicker">ACTIVITY 3</span><h2>Ruchi Radar</h2><p>Separate genuine interest from borrowed inspiration.</p><div className="radar">{[["Pull","Would you choose it without external validation?"],["Energy","Does doing it give energy back?"],["Depth","Have you gone beyond surface curiosity?"],["Persistence","Do you keep returning to it?"],["Experimentation","Have you actually tried it?"]].map(([a,b])=><div key={a}><b>{a}</b><span>{b}</span></div>)}</div></section>;
const Market=({market,setMarket})=><section><span className="kicker">ACTIVITY 4</span><h2>Disha Guardrail</h2><p>Fine-tune the master industry dataset for role, geography, domain and maturity.</p>{market.map((m,i)=><div className="marketrow" key={m.territory}><b>{m.territory}</b><label>Demand <input type="range" min="0" max="100" value={m.demand} onChange={e=>{const x=[...market];x[i]={...x[i],demand:+e.target.value};setMarket(x)}}/></label><span>{m.demand}</span></div>)}</section>;
const Sweet=({sweet})=><section><span className="kicker">ACTIVITY 5</span><h2>Growth Sweet Spot</h2><p>Generate high-potential territories, not one supposedly perfect career.</p><div className="sweetgrid">{sweet.map((s,i)=><div className="sweet" key={s.territory}><span>#{i+1}</span><h3>{s.territory}</h3><strong>{s.score}</strong><p>Evidence × interest × market demand</p></div>)}</div></section>;
const Roadmap=()=> <section><span className="kicker">ACTIVITY 6</span><h2>Future Self Blueprint</h2><div className="road">{[["0-30 days","Explore one experiment"],["30-90 days","Build something meaningful"],["3-6 months","Create proof"],["6-12 months","Position yourself"],["12-24 months","Expand responsibility"]].map(([a,b])=><div key={a}><b>{a}</b><span>{b}</span></div>)}</div></section>;
createRoot(document.getElementById("root")).render(<App/>);