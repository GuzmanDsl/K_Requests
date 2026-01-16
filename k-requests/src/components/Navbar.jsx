import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
    const links = [
        { name: "Company", path: "/" },
        { name: "Attention", path: "/" },
        { name: "Some Sugar", path: "/" },
        { name: "Book of Memories", path: "/" },
        { name: "Chores", path: "/chores" },
    ];

    return (
        <header className="navWrap">
            <div className="navInner">
                <div className="brand">
                    <span className="brandDot" />
                    <span className="brandText">BF Request</span>
                </div>

                <nav className="navLinks">
                    {links.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            className={({ isActive }) =>
                                isActive ? "navLink active" : "navLink"
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </header>
    );
}
