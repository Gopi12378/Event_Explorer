import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import "./Registered.css";

export default function Profile() {
  const { user, loading } = useAuth();
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    if (!user) return;
    const saved = JSON.parse(localStorage.getItem("registeredEvents") || "{}");
    setRegisteredEvents(saved[user.uid] || []);
  }, [user]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Please login to see your registered events.</p>;
  if (!registeredEvents.length) return <p>No registered events yet.</p>;

  return (
    <div className="registered-page">
      <h2>Your Registered Events</h2>
      <ul className="registered-list">
        {registeredEvents.map((event) => (
          <li key={event.id} className="registered-item">
            <div className="registered-image">
              <img src={event.image} alt={event.title} />
            </div>
            <div className="registered-info">
              <h3>{event.title}</h3>
              <p>{event.description.slice(0, 100)}...</p>
              <small>
                Registered at:{" "}
                {new Date(event.registeredAt).toLocaleString()}
              </small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
