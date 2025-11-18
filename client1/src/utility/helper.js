const URL = (process.env.NODE_ENV ==="production") ? "https://complaint-managment-theta.vercel.app/api/v1/query" : "http://localhost:8000/api/v1/query";
export default URL;
