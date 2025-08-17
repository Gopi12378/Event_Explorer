import { useEffect } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/events", { replace: true }); 
    }
  }, [user, navigate]);

  return (
    <div className="home-container">
      <div className="home-card">
        <h1>Welcome 🎉</h1>
        <p>Please login to see the latest events</p>
      </div>
    </div>
  );
}
