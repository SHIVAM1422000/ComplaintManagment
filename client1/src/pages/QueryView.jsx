import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/query";
import ChatBox from "../components/ChatBox";
import TicketDeleteModal from "../components/Ticket/TicketDeleteModal";
import { useAuth } from "../context/AuthContext";

export default function QueryView() {
  const { id } = useParams();
  const {user} = useAuth();
  const [query, setQuery] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const loadQuery = async () => {
    try {
      const res = await API.get(`/${id}`);
      setQuery(res.data);
    } catch (error) {
      alert("Error loading query");
      console.error(error);
    }
  };

  useEffect(() => {
    loadQuery();
  }, [id]);

  if (!query) return <p className="p-6 text-gray-400">Loading query…</p>;

  return (
    <>
      {openDeleteModal && (
        <TicketDeleteModal
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
        />
      )}

      <div className="p-6 max-w-5xl mx-auto mt-8 bg-white rounded-2xl shadow-xl h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Query Chat 💬</h1>
        </div>

        {/* Query Meta */}
        <div className="p-4 bg-gray-100 rounded-lg mb-4 space-y-1">
          <p><strong>Message:</strong> {query.message}</p>
          <p><strong>Priority:</strong> {query.priority}</p>
          <p><strong>Status:</strong> {query.status}</p>
          <p><strong>Tags:</strong> {query.tags.join(", ")}</p>
        </div>

        {/* ✅ SINGLE CHAT SYSTEM */}
        <div className="flex-1 border rounded-lg overflow-hidden">
          <ChatBox queryId={query._id} currentUser={user.name} />
        </div>

        {/* Footer Actions */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setOpenDeleteModal(true)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Delete Ticket
          </button>
        </div>
      </div>
    </>
  );
}
