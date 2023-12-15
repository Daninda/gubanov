import React, { Component } from "react";
import { withSnackbar } from "react-simple-snackbar";
import withRouter from "../withRouter.js";
import withSearchParams from "../withSearchParams.js";
import DataService from "../../services/DataService.js";

class UpdateReaderCopy extends Component {
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

	componentDidMount() {
		this.retrieve();
	}

	async retrieve() {
		const reader_id = +this.props.searchParams.get("reader_id");
		const copy_id = +this.props.searchParams.get("copy_id");
		DataService.getReaderCopy(reader_id, copy_id).then((res) => {
			this.setState({
				reader_id: reader_id,
				copy_id: copy_id,
				issue_date: new Date(res.data[0].issue_date).toLocaleDateString(
					"fr-CA"
				),
				return_date: res.data[0].return_date
					? new Date(res.data[0].return_date).toLocaleDateString("fr-CA")
					: "",
			});
		});
	}

	onClickSubmit() {
		if (this.state.issue_date) {
			DataService.updateReaderCopy(this.state.reader_id, this.state.copy_id, {
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
					<caption className="table__title">
						Обновление экземпляра у читателя
					</caption>
					<thead>
						<tr>
							<th>Номер читательского билета</th>
							<th>Инвентарный номер</th>
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
									disabled={true}
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
				<button className="add-button btn" onClick={this.onClickSubmit}>
					Обновить
				</button>
			</>
		);
	}
}

export default withSearchParams(withRouter(withSnackbar(UpdateReaderCopy)));
