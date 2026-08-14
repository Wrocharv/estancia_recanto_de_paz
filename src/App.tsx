import Home from "./Home";
import EventDetailPage from "./EventDetailPage";

export default function App() {
  const path = window.location.pathname.replace(/\/$/, "");
  if (path === "/maanaim") return <EventDetailPage slug="maanaim" />;
  if (path === "/maturidade") return <EventDetailPage slug="maturidade" />;
  return <Home />;
}
