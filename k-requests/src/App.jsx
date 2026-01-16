import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "./styles/theme.css";
import Chores from "./pages/Chores";


export default function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/chores" element={<Chores />} />
                
            </Routes>
        </BrowserRouter>
    );
}
