mport React from 'react'


export default function Dashboard({analytics}){
return (
<div className="bg-white p-4 rounded shadow">
<h3 className="font-semibold mb-2">Dashboard</h3>
<div className="grid grid-cols-1 gap-3">
<div className="p-3 border rounded">
<div className="text-xs text-slate-500">Total</div>
<div className="text-xl font-bold">{analytics?.total ?? '—'}</div>
</div>
<div className="p-3 border rounded">
<div className="text-xs text-slate-500">Open</div>
<div className="text-xl font-bold">{analytics?.status?.open ?? '—'}</div>

</div>
<div className="p-3 border rounded">
<div className="text-xs text-slate-500">Responded</div>
<div className="text-xl font-bold">{analytics?.status?.responded ?? '—'}</div>
</div>
<div className="p-3 border rounded">
<div className="text-xs text-slate-500">Closed</div>
<div className="text-xl font-bold">{analytics?.status?.closed ?? '—'}</div>
</div>
</div>
</div>
)
}