import React, { Component } from "react";
import { withSnackbar } from "react-simple-snackbar";
import withRouter from "../withRouter.js";
import DataService from "../../services/DataService.js";
import { Link } from "react-router-dom";

class UpdateReader extends Component {
	constructor(params) {
		super(params);
		this.state = {
			reader_id: "",
			full_name: "",
			birth: "",
			phone: "",
		};

		this.onClickSubmit = this.onClickSubmit.bind(this);
	}

	componentDidMount() {
		this.retrieve();
	}

	retrieve() {
		const reader_id = +this.props.params.id;
		DataService.getReader(reader_id).then((res) => {
			this.setState({
				reader_id: reader_id,
				full_name: res.data[0].full_name,
				birth: new Date(res.data[0].birth).toLocaleDateString("fr-CA"),
				phone: res.data[0].phone,
			});
		});
	}

	onClickSubmit() {
		if (this.state.full_name && this.state.birth && this.state.phone) {
			DataService.updateReader(this.state.reader_id, {
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
					<caption className="table__title">Обновление читателя</caption>
					<thead>
						<tr>
							<th>Номер читательского билета</th>
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
									disabled={true}
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
					Обновить
				</Link>
			</>
		);
	}
}

export default withRouter(withSnackbar(UpdateReader));
