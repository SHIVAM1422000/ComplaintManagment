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
    <div className="grid grid-cols-3 gap-4 p-6" style={{ marginTop: "10%", marginLeft: "35%", marginRight: "5%", height: "60vh", width:"90vw"
    }}>
    

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
