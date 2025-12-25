import React from "react";

const TicketStatusDisplay = ({ ticketData }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          alignContent: "center",
        }} className="my-4"
      >
        <div className=" p-3 text-red-600 bg-green-100 flex items-center justify-center text-lg mr-4">
          <span className="font-bold">Ticket Status: </span>{" "}
          {ticketData.status || "Open"}
        </div>

        <div className=" p-3  bg-blue-100 flex items-center justify-center text-lg ">
          <span className="font-bold">Assigned To:  </span>{" "}
          {ticketData?.assignedTo || "U/A"}
        </div>
      </div>
    </>
  );
};

export default TicketStatusDisplay;
