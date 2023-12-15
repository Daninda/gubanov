import React, { Component } from "react";
import { withSnackbar } from "react-simple-snackbar";

import DataService from "../../services/DataService.js";
import { Link } from "react-router-dom";

class BookThemeTable extends Component {
	constructor(params) {
		super(params);
		this.state = {
			book_themes: [],
		};
	}

	componentDidMount() {
		this.retrieve();
	}

	retrieve() {
		DataService.getBookThemes()
			.then((res) => {
				this.setState({
					book_themes: res.data,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}
	render() {
		const { book_themes } = this.state;
		return (
			<>
				<h1 className="table__title">Темы у книг</h1>
				<Link className="add-button" to={"/create-book-theme"}>
					Добавить
				</Link>
				<table className="table">
					<thead>
						<tr>
							<th>Код книги</th>
							<th>Название книги</th>
							<th>Первый автор</th>
							<th>Код темы</th>
							<th>Наименование темы</th>
							<th width="3.5%"></th>
						</tr>
					</thead>
					<tbody>
						{book_themes.map((book_theme) => {
							return (
								<tr
									key={`${book_theme.book_id}_${book_theme.theme_id}`}
									className="table__body-row"
								>
									<td>{book_theme.book_id}</td>
									<td>{book_theme.book_name}</td>
									<td>{book_theme.first_author}</td>
									<td>{book_theme.theme_id}</td>
									<td>{book_theme.theme_name}</td>
									<td>
										<Link
											className="remove-button"
											onClick={() => {
												DataService.deleteBookTheme(book_theme.book_id)
													.then(() => {
														this.props.openSnackbar("Успешно", 5000);
														this.retrieve();
													})
													.catch(() => {
														this.props.openSnackbar("Невозможно", 5000);
													});
											}}
										>
											<svg width="16" height="16" viewBox="0 0 16 16">
												<path
													fillRule="evenodd"
													clipRule="evenodd"
													d="M4.11 2.697L2.698 4.11 6.586 8l-3.89 3.89 1.415 1.413L8 9.414l3.89 3.89 1.413-1.415L9.414 8l3.89-3.89-1.415-1.413L8 6.586l-3.89-3.89z"
												></path>
											</svg>
										</Link>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</>
		);
	}
}

export default withSnackbar(BookThemeTable);
