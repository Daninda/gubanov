import React, { PureComponent } from "react";
import DataService from "../services/DataService.js";
import { Link } from "react-router-dom";
import printJS from "print-js";

export class MyReport extends PureComponent {
	constructor(params) {
		super(params);
		this.state = {
			readers: [],
			reader_copies: [],
		};
	}

	componentDidMount() {
		this.retrieve();
	}

	retrieve() {
		DataService.getReaders()
			.then((res) => {
				this.setState({
					readers: res.data,
				});
			})
			.catch((err) => {
				console.log(err);
			});

		DataService.getReaderCopies()
			.then((res) => {
				this.setState({
					reader_copies: res.data,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	reportBody() {
		let readers = this.state.readers;
		let reader_copies = this.state.reader_copies;
		return (
			<>
				{readers.map((reader) => {
					let copies = reader_copies.filter((val) => {
						return val.reader_id === reader.reader_id;
					});

					return (
						<>
							<tr>
								<td>
									<b>
										<em>Читатель {reader.full_name}:</em>
									</b>
								</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							{copies.map((copy) => {
								let debtor = "Нет";
								if (!copy.return_date) {
									let diff = Date.now() - new Date(copy.issue_date);
									if (diff / (1000 * 3600 * 24) > 21) {
										debtor = "Да";
									}
								}
								return (
									<tr className="table__body-row">
										<td>{copy.author}</td>
										<td>{copy.book_name}</td>
										<td>
											{new Date(copy.issue_date).toLocaleDateString("fr-CA")}
										</td>
										<td>
											{copy.return_date
												? new Date(copy.return_date).toLocaleDateString("fr-CA")
												: ""}
										</td>
										<td>{debtor}</td>
									</tr>
								);
							})}
							<tr>
								<td>
									<em>&nbsp;&nbsp;&nbsp;&nbsp;Итого у читателя:</em>
								</td>
								<td></td>
								<td></td>
								<td></td>
								<td>
									<b>
										{copies.reduce((accum, item) => {
											let adding = 0;
											if (!item.return_date) {
												let diff = Date.now() - new Date(item.issue_date);
												if (diff / (1000 * 3600 * 24) > 21) {
													adding++;
												}
											}
											return accum + adding;
										}, 0)}
									</b>
								</td>
							</tr>
						</>
					);
				})}
				<tr>
					<td>
						<b>
							<em>Итого:</em>
						</b>
					</td>
					<td></td>
					<td></td>
					<td></td>
					<td>
						<b>
							{reader_copies.reduce((accum, item) => {
								let adding = 0;
								if (!item.return_date) {
									let diff = Date.now() - new Date(item.issue_date);
									if (diff / (1000 * 3600 * 24) > 21) {
										adding++;
									}
								}
								return accum + adding;
							}, 0)}
						</b>
					</td>
				</tr>
			</>
		);
	}

	render() {
		return (
			<>
				<h1 className="table__title">Отчет</h1>
				<div
					style={{
						display: "flex",
					}}
				>
					<Link
						className="add-button"
						onClick={() => {
							printJS({
								printable: "report",
								type: "html",
							});
						}}
					>
						Печать
					</Link>
				</div>
				<div id="report">
					<br />
					<table className="table">
						<caption>
							<h3 className="table__title">
								Сведения о читателях–должниках библиотеки
							</h3>
						</caption>
						<thead>
							<tr>
								<td>
									<b>Автор книги</b>
								</td>
								<td>
									<b>Название книги</b>
								</td>
								<td>
									<b>Дата выдачи</b>
								</td>
								<td>
									<b>Дата возврата</b>
								</td>
								<td>
									<b>Должник (Да/Нет)</b>
								</td>
							</tr>
						</thead>
						<tbody>{this.reportBody()}</tbody>
					</table>
				</div>
			</>
		);
	}
}
