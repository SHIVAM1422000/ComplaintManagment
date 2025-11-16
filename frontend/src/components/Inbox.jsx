import React from 'react'


const Badge = ({level})=>{
const map = { low: 'bg-green-100 text-green-800', medium: 'bg-yellow-100 text-yellow-800', high: 'bg-red-100 text-red-800', critical: 'bg-purple-100 text-purple-800' }
return <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${map[level]||map.low}`}>{level}</span>
}


export default function Inbox({queries=[], onSelect}){
return (
<div className="bg-white p-4 rounded shadow">
<div className="flex items-center justify-between mb-3">
<h2 className="font-semibold">Inbox</h2>
<div className="text-xs text-slate-500">{queries.length} items</div>
</div>


<div className="space-y-2 max-h-[70vh] overflow-auto">
{queries.map(q=> (
<div key={q._id} onClick={()=>onSelect(q)} className="p-3 rounded border hover:bg-slate-50 cursor-pointer">
<div className="flex justify-between items-start">
<div>
<div className="font-medium">{(q.tags && q.tags[0]) || q.channel}</div>
<div className="text-sm text-slate-600 truncate max-w-[220px]">{q.message}</div>
</div>
<div className="text-right">
<div className="text-xs text-slate-400">{new Date(q.createdAt).toLocaleString()}</div>
<div className="mt-2"><Badge level={q.priority} /></div>
</div>
</div>
<div className="mt-2 text-xs flex gap-2">
{(q.tags||[]).slice(0,3).map(t=> <span key={t} className="text-xs px-2 py-0.5 border rounded">{t}</span>)}
</div>
</div>
))}
</div>
</div>
)
}