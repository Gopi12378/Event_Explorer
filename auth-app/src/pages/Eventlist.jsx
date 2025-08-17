import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EventList.css";

export default function EventList() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        // Map products to event-like objects
        const mappedEvents = data.products.map((p) => ({
          id: p.id,
          title: p.title,
          date: new Date().toLocaleDateString(), // dummy date
          location: "Hyderabad", // hardcoded location
          description: p.description,
          image: p.thumbnail,
        }));
        setEvents(mappedEvents);
      });
  }, []);

  const handleDetailsClick = (event) => {
    navigate(`/events/${event.id}`, { state: event });
  };

  return (
    <div className="event-list">
      <h2>Upcoming Events</h2>
      <div className="event-cards">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <img src={event.image} alt={event.title} />
            <h3>{event.title}</h3>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Location:</strong> {event.location}</p>
           
            <button 
              className="details-btn listen-btn listen-btn:hover"
              onClick={() => handleDetailsClick(event)}
            >
              📌 Event Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
