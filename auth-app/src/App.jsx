import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Home from "./pages/Home";
import PrivateRoute from "./PrivateRoute";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import EventList from "./pages/Eventlist";
import EventDetails from "./pages/EventDetails";
import RegisteredEvents from "./pages/RegisteredEvents";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        {/* Public route */}
        <Route path="/" element={<Home />} />

        {/* Protected routes */}
        <Route
          path="/events"
          element={
            <PrivateRoute>
              <EventList />
            </PrivateRoute>
          }
        />
        <Route
          path="/events/:id"
          element={
            <PrivateRoute>
              <EventDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <RegisteredEvents />
            </PrivateRoute>
          }
        />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
