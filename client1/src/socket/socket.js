import { io } from "socket.io-client";
import URL from "../utility/helper";


const socket = io(URL, {
  auth: {
    token: localStorage.getItem("token"),
  },
});
export default socket;
