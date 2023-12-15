import React, { Component } from "react";
import { withSnackbar } from "react-simple-snackbar";
import DataService from "../../services/DataService.js";
import { Link } from "react-router-dom";

class CreateReader extends Component {
	constructor(params) {
		super(params);
		this.state = {
			full_name: "",
			birth: "",
			phone: "",
		};

		this.onClickSubmit = this.onClickSubmit.bind(this);
	}

	onClickSubmit() {
		if (this.state.full_name && this.state.birth && this.state.phone) {
			DataService.createReader({
				full_name: this.state.full_name,
				birth: this.state.birth,
				phone: this.state.phone,
			})
				.then(() => {
					this.setState({
						full_name: "",
						birth: "",
						phone: "",
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
					<caption className="table__title">Добавление читателя</caption>
					<thead>
						<tr>
							<th>ФИО</th>
							<th>Дата рождения</th>
							<th>Телефон</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<input
									type="text"
									className="input"
									value={this.state.full_name}
									onChange={(e) => {
										this.setState({
											full_name: e.target.value,
										});
									}}
								/>
							</td>
							<td>
								<input
									type="text"
									className="input"
									value={this.state.birth}
									onChange={(e) => {
										this.setState({
											birth: e.target.value,
										});
									}}
								/>
							</td>
							<td>
								<input
									type="text"
									className="input"
									value={this.state.phone}
									onChange={(e) => {
										this.setState({
											phone: e.target.value,
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

export default withSnackbar(CreateReader);
