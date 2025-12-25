import { useEffect, useState } from "react";
import InboxList from "../components/InboxList";
import QueryDetails from "../components/QueryDetails";
import AnalyticsPanel from "../components/AnalyticsPanel";
import AssignModal from "../components/AssignModal";
import socket from "../socket/socket";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/query";
import { BarLoader } from "react-spinners";

export default function Dashboard() {
  
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [showAssign, setShowAssign] = useState(false);
  const { isAgent, isAdmin } = useAuth();
  const [loadingQuery, setLoadingQuery] = useState(true);



  const loadAll = async () => {
    try {
      const res = await API.get("/");
      setList(res.data);
      const a = await API.get("/analytics");
      setAnalytics(a.data);
      
      setLoadingQuery(false)
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadAll();

    socket.on("query-updated", () => {
      loadAll(); // reload list + analytics
    });

    socket.on("analytics-updated", () => {
      loadAll(); // reload analytics only
    });



    if (!isAdmin && !isAgent) {
      console.log("Access Denied");
      return <Navigate to="/login" replace />;
    }

    return () => {
      socket.off("query-updated");
      socket.off("analytics-updated");
    };
  }, []);

  return (
    <>
     {loadingQuery &&  <BarLoader width={"100%"} height={"5px"} margin={"0px"} />}
    <div className="p-6 w-full">

      <AnalyticsPanel data={analytics} />


      <AssignModal
        visible={showAssign}
        onClose={() => setShowAssign(false)}
        onAssign={(name) => console.log("assigned to", name)}
      />
    </div>
    </>
  );
}
