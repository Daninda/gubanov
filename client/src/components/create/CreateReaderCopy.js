import React, { Component } from "react";
import { withSnackbar } from "react-simple-snackbar";
import DataService from "../../services/DataService.js";
import { Link } from "react-router-dom";

class CreateReaderCopy extends Component {
	constructor(params) {
		super(params);
		this.state = {
			reader_id: "",
			copy_id: "",
			issue_date: "",
			return_date: "",
		};

		this.onClickSubmit = this.onClickSubmit.bind(this);
	}

	onClickSubmit() {
		if (this.state.reader_id && this.state.copy_id && this.state.issue_date) {
			DataService.createReaderCopy({
				reader_id: +this.state.reader_id,
				copy_id: +this.state.copy_id,
				issue_date: this.state.issue_date,
				return_date: this.state.return_date,
			})
				.then(() => {
					this.setState({
						reader_id: "",
						copy_id: "",
						issue_date: "",
						return_date: "",
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
					<caption className="table__title">
						Добавление экземпляра читателю
					</caption>
					<thead>
						<tr>
							<th>Номер читательского билета</th>
							<th>Инвентарный номер книги</th>
							<th>Дата выдачи</th>
							<th>Дата возврата</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<input
									type="text"
									className="input"
									value={this.state.reader_id}
									onChange={(e) => {
										this.setState({
											reader_id: e.target.value,
										});
									}}
								/>
							</td>
							<td>
								<input
									type="text"
									className="input"
									value={this.state.copy_id}
									onChange={(e) => {
										this.setState({
											copy_id: e.target.value,
										});
									}}
								/>
							</td>
							<td>
								<input
									type="text"
									className="input"
									value={this.state.issue_date}
									onChange={(e) => {
										this.setState({
											issue_date: e.target.value,
										});
									}}
								/>
							</td>
							<td>
								<input
									type="text"
									className="input"
									value={this.state.return_date}
									onChange={(e) => {
										this.setState({
											return_date: e.target.value,
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

export default withSnackbar(CreateReaderCopy);
