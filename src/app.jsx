import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "./styles/theme.css";

function ChoresPlaceholder() {
  return (
    <main style={{ padding: 30 }}>
      <h2>Chores Page</h2>
      <p>This will be your email request form page.</p>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chores" element={<ChoresPlaceholder />} />
      </Routes>
    </BrowserRouter>
  );
}
