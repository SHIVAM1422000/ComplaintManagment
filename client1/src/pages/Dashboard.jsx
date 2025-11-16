import { useEffect, useState } from "react";

import InboxList from "../components/InboxList";
import QueryDetails from "../components/QueryDetails";
import AnalyticsPanel from "../components/AnalyticsPanel";
import AssignModal from "../components/AssignModal";
import API from "../api/api";

export default function Dashboard() {
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [showAssign, setShowAssign] = useState(false);

  const loadAll = async() => {
    try {
        const res = await API.get("/");
        setList(res.data);
        const a = await API.get("/analytics");
        setAnalytics(a.data);
        
    } catch (error) {
        console.error("Error loading data:", error);
    }
  }

  useEffect(() => {
    loadAll();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 p-6">
      {/* Inbox */}
      <div className="col-span-1 bg-gradient-to-b from-blue-50 to-purple-50 p-4 rounded-xl shadow">
        <h2 className="font-bold text-xl mb-4">📬 Inbox</h2>
        <InboxList
          list={list}
          onOpen={setSelected}
          onAssign={() => setShowAssign(true)}
          onEscalate={() => {}}
        />
      </div>

      {/* Details */}
      <QueryDetails
        q={selected}
        onReply={(id, text) => console.log("reply", id, text)}
        onEscalate={() => {}}
        onCloseTicket={() => {}}
      />

      {/* Analytics */}
      <AnalyticsPanel data={analytics} />

      <AssignModal
        visible={showAssign}
        onClose={() => setShowAssign(false)}
        onAssign={(name) => console.log("assigned to", name)}
      />
    </div>
  );
}
