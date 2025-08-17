import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import "./EventDetails.css";

export default function EventDetails() {
  const { id } = useParams();
  const { user, loading } = useAuth();
  const [event, setEvent] = useState(null);
  const [registered, setRegistered] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Fetch event data
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        if (!data || !data.id) throw new Error("No event data found");
        setEvent({
          id: data.id.toString(),
          title: data.title || "No title",
          description: data.description || "",
          image: data.thumbnail || "",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setFetching(false);
      }
    };
    fetchEvent();
  }, [id]);

  // Check if already registered
  useEffect(() => {
    if (!user || !event) return;

    const saved = JSON.parse(localStorage.getItem("registeredEvents") || "{}");
    const userEvents = saved[user.uid] || [];
    setRegistered(userEvents.some(e => e.id === event.id));
  }, [user, event]);

  // Register event
  const handleRegister = () => {
    if (!user) {
      alert("Please login first!");
      return;
    }
    if (!event) return;

    const saved = JSON.parse(localStorage.getItem("registeredEvents") || "{}");
    saved[user.uid] = saved[user.uid] || [];

    if (!saved[user.uid].some(e => e.id === event.id)) {
      saved[user.uid].push({ ...event, registeredAt: Date.now() });
      localStorage.setItem("registeredEvents", JSON.stringify(saved));
      setRegistered(true);
      alert("Event registered successfully!");
    }
  };

  if (loading || fetching) return <p>Loading...</p>;
  if (!event) return <p>Event not found.</p>;

  return (
    <div className="event-detail">
      <div className="event-image">
        <img src={event.image} alt={event.title} />
      </div>
      <div className="event-info">
        <h2>{event.title}</h2>
        <p className="event-desc">{event.description}</p>
        <button
          className="detail-btn"
          onClick={handleRegister}
          disabled={registered}
        >
          {registered ? "Registered" : "Register Now"}
        </button>
      </div>
    </div>
  );
}
