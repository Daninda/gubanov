import React, { Component } from "react";
import { withSnackbar } from "react-simple-snackbar";
import DataService from "../../services/DataService.js";
import { Link } from "react-router-dom";

class CreateBook extends Component {
	constructor(params) {
		super(params);
		this.state = {
			book_name: "",
			first_author: "",
			publication_place: "",
			year: "",
			sheets: "",
			cost: "",
			publication: "",
		};

		this.onClickSubmit = this.onClickSubmit.bind(this);
	}

	onClickSubmit() {
		if (
			this.state.book_name &&
			this.state.first_author &&
			this.state.publication_place &&
			this.state.year &&
			this.state.sheets &&
			this.state.cost &&
			this.state.publication
		) {
			DataService.createBook({
				book_name: this.state.book_name,
				first_author: this.state.first_author,
				publication_place: this.state.publication_place,
				year: this.state.year,
				sheets: this.state.sheets,
				cost: this.state.cost,
				publication: this.state.publication,
			})
				.then(() => {
					this.setState({
						book_name: "",
						first_author: "",
						publication_place: "",
						year: "",
						sheets: "",
						cost: "",
						publication: "",
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
					<caption className="table__title">Добавление книги</caption>
					<thead>
						<tr>
							<th>Название книги</th>
							<th>Первый автор</th>
							<th>Место издания</th>
							<th>Год издания</th>
							<th>Кол-ва страниц</th>
							<th>Цена</th>
							<th>Издрательство</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<input
									type="text"
									className="input"
									value={this.state.book_name}
									onChange={(e) => {
										this.setState({
											book_name: e.target.value,
										});
									}}
								/>
							</td>
							<td>
								<input
									type="text"
									className="input"
									value={this.state.first_author}
									onChange={(e) => {
										this.setState({
											first_author: e.target.value,
										});
									}}
								/>
							</td>
							<td>
								<input
									type="text"
									className="input"
									value={this.state.publication_place}
									onChange={(e) => {
										this.setState({
											publication_place: e.target.value,
										});
									}}
								/>
							</td>
							<td>
								<input
									type="text"
									className="input"
									value={this.state.year}
									onChange={(e) => {
										this.setState({
											year: e.target.value,
										});
									}}
								/>
							</td>
							<td>
								<input
									type="text"
									className="input"
									value={this.state.sheets}
									onChange={(e) => {
										this.setState({
											sheets: e.target.value,
										});
									}}
								/>
							</td>
							<td>
								<input
									type="text"
									className="input"
									value={this.state.cost}
									onChange={(e) => {
										this.setState({
											cost: e.target.value,
										});
									}}
								/>
							</td>
							<td>
								<input
									type="text"
									className="input"
									value={this.state.publication}
									onChange={(e) => {
										this.setState({
											publication: e.target.value,
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

export default withSnackbar(CreateBook);
