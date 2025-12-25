import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/query";
import { useAuth } from "./AuthContext";

export const QueryContext = createContext();

export const QueryProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const [loadingTickets, setLoadingTickets] = useState(true);
  const [visibleTickets, setVisibleTickets] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    if (!user) return;
    API.get("/")
      .then((res) => {
        setTickets(res.data);
        setLoadingTickets(false);
      })
      .catch((error) => {
        console.log("Error in Loading Tickets..!!!", error);
      });
  }, [user]);

  return (
    <QueryContext.Provider
      value={{
        tickets,
        setTickets,
        loadingTickets,
        setLoadingTickets,
        visibleTickets,
        setVisibleTickets,
      }}
    >
      {children}
    </QueryContext.Provider>
  );
};

export const useQuery = () => useContext(QueryContext);
