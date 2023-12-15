import React, { Component } from "react";
import { withSnackbar } from "react-simple-snackbar";
import withRouter from "../withRouter.js";
import DataService from "../../services/DataService.js";
import { Link } from "react-router-dom";

class UpdateBook extends Component {
	constructor(params) {
		super(params);
		this.state = {
			book_id: "",
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

	componentDidMount() {
		this.retrieve();
	}

	retrieve() {
		const book_id = +this.props.params.id;
		DataService.getBook(book_id).then((res) => {
			this.setState({
				book_id: book_id,
				book_name: res.data[0].book_name,
				first_author: res.data[0].first_author,
				publication_place: res.data[0].publication_place,
				year: res.data[0].year,
				sheets: res.data[0].sheets,
				cost: res.data[0].cost,
				publication: res.data[0].publication,
			});
		});
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
			DataService.updateBook(this.state.book_id, {
				...this.state,
			})
				.then(() => {
					this.retrieve();
					this.props.openSnackbar("Успешно", 5000);
				})
				.catch(() => {
					this.retrieve();
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
					<caption className="table__title">Обновление книги</caption>
					<thead>
						<tr>
							<th>Код книги</th>
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
									disabled={true}
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
					Обновить
				</Link>
			</>
		);
	}
}

export default withRouter(withSnackbar(UpdateBook));
