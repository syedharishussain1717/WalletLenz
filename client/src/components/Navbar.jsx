import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar({ logout }) {
    const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <nav className="navbar">
            <h1 className="navbar-brand">WalletLenz</h1>

            <button
                className={`navbar-toggle ${
                    isOpen ? "open" : ""
                }`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={isOpen}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <div
                className={`navbar-links ${
                    isOpen ? "open" : ""
                }`}
            >
                <Link
                    to="/dashboard"
                    onClick={closeMenu}
                >
                    Dashboard
                </Link>

                <Link
                    to="/add-expense"
                    onClick={closeMenu}
                >
                    Add Expense
                </Link>

                <Link
                    to="/expenses"
                    onClick={closeMenu}
                >
                    Expenses
                </Link>

                <button
                    className="navbar-logout"
                    onClick={() => {
                        closeMenu();
                        logout();
                    }}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;