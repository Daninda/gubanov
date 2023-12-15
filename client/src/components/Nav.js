import React from "react";
import { Link } from "react-router-dom";

function Nav() {
	return (
		<div className="navbar">
			<nav className="navbar__links">
				<Link to="/books">Книги</Link>
				<Link to="/themes">Темы</Link>
				<Link to="/book-themes">Темы у книг</Link>
				<Link to="/readers">Читатели</Link>
				<Link to="/copies">Экземпляры</Link>
				<Link to="/reader-copies">Экземпляры у читателей</Link>
				<Link to={"/report"}>Отчет</Link>
			</nav>
		</div>
	);
}

export default Nav;
