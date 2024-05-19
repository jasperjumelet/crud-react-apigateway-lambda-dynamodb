import axios from "axios";

export default axios.create({
  baseURL: "https://oi8yhze083.execute-api.us-east-1.amazonaws.com",
  headers: {
    "Content-type": "application/json",
  },
});