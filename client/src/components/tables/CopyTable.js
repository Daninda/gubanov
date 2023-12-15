import React, { Component } from "react";
import { withSnackbar } from "react-simple-snackbar";

import DataService from "../../services/DataService.js";
import { Link } from "react-router-dom";

class CopyTable extends Component {
	constructor(params) {
		super(params);
		this.state = {
			copies: [],
		};
	}

	componentDidMount() {
		this.retrieve();
	}

	retrieve() {
		DataService.getCopies()
			.then((res) => {
				this.setState({
					copies: res.data,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}
	render() {
		const { copies } = this.state;
		return (
			<>
				<h1 className="table__title">Экземпляры</h1>
				<Link className="add-button" to={"/create-copy"}>
					Добавить
				</Link>
				<table className="table">
					<thead>
						<tr>
							<th>Инвентарный номер</th>
							<th>Код книги</th>
							<th>Название книги</th>
							<th>Первый автор</th>
							<th width="3.5%"></th>
						</tr>
					</thead>
					<tbody>
						{copies.map((copy) => {
							return (
								<tr key={copy.copy_id} className="table__body-row">
									<td>{copy.copy_id}</td>
									<td>{copy.book_id}</td>
									<td>{copy.book_name}</td>
									<td>{copy.first_author}</td>
									<td>
										<Link
											className="remove-button"
											onClick={() => {
												DataService.deleteCopy(copy.copy_id)
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

export default withSnackbar(CopyTable);
