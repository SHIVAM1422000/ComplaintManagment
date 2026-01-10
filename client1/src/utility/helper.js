const URL = (process.env.NODE_ENV ==="production") ? "https://complaint-managment-theta.vercel.app/api/v1/query" : "http://localhost:8000/api/v1/query";
export default URL;

export const SocketURL = (process.env.NODE_ENV ==="production") ? "https://complaint-managment-theta.vercel.app" : "http://localhost:8000";




export const checkAuth = () => {
    const token = localStorage.getItem("token") && localStorage.getItem("company_slug");
    if(!token) {
        alert("Unauthorized, LOGIN REQUIRED...!!");
        window.location.href="/login"
    }
}

// export const useAuth = () => useContext(AuthContext);