import React, { Component } from "react";
import { withSnackbar } from "react-simple-snackbar";
import DataService from "../../services/DataService.js";
import { Link } from "react-router-dom";

class CreateBookTheme extends Component {
	constructor(params) {
		super(params);
		this.state = {
			book_id: "",
			theme_id: "",
		};

		this.onClickSubmit = this.onClickSubmit.bind(this);
	}

	onClickSubmit() {
		if (this.state.book_id && this.state.theme_id) {
			DataService.createBookTheme({
				book_id: +this.state.book_id,
				theme_id: +this.state.theme_id,
			})
				.then(() => {
					this.setState({
						book_id: "",
						theme_id: "",
					});
					this.props.openSnackbar("Успешно", 5000);
				})
				.catch(() => {
					this.props.openSnackbar("Ошибка", 5000);
				});
		} else {
			this.props.openSnackbar("Ошибка", 5000);
		}
	}
	render() {
		return (
			<>
				<table className="table student-table">
					<caption className="table__title">Добавление темы к книге</caption>
					<thead>
						<tr>
							<th>Код книги</th>
							<th>Код темы</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<input
									type="text"
									className="input"
									value={this.state.book_id}
									onChange={(e) => {
										this.setState({
											book_id: e.target.value,
										});
									}}
								/>
							</td>
							<td>
								<input
									type="text"
									className="input"
									value={this.state.theme_id}
									onChange={(e) => {
										this.setState({
											theme_id: e.target.value,
										});
									}}
								/>
							</td>
						</tr>
					</tbody>
				</table>
				<Link className="add-button" onClick={this.onClickSubmit}>
					Добавить
				</Link>
			</>
		);
	}
}

export default withSnackbar(CreateBookTheme);
