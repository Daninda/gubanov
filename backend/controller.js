const db = require("./db");

class Controller {
	async createBook(req, res) {
		const {
			book_name,
			first_author,
			publication_place,
			year,
			sheets,
			cost,
			publication,
		} = req.body;
		await db.query(
			`INSERT INTO LibSub.\`Книги\` (\`название книги\`, \`первый автор\`, \`место издания\`, \`год издания\`, \`количество страниц\`, \`цена\`, \`Издательство\`) VALUES
            (?, ?, ?, ?, ?, ?, ?)`,
			[
				book_name,
				first_author,
				publication_place,
				year,
				sheets,
				cost,
				publication,
			],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async updateBook(req, res) {
		const id = +req.params.id;
		const {
			book_name,
			first_author,
			publication_place,
			year,
			sheets,
			cost,
			publication,
		} = req.body;
		await db.query(
			`UPDATE LibSub.\`Книги\` SET
			\`название книги\` = ?, \`первый автор\` = ?, \`место издания\` = ?, \`год издания\` = ?, \`количество страниц\` = ?, \`цена\` = ?, \`Издательство\` = ?
            WHERE \`Шифр книги\` = ?`,
			[
				book_name,
				first_author,
				publication_place,
				year,
				sheets,
				cost,
				publication,
				id,
			],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async deleteBook(req, res) {
		const id = +req.params.id;
		await db.query(
			`DELETE FROM LibSub.Экземпляры WHERE \`Книги_Шифр книги\` = ?`,
			[id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				db.query(
					`DELETE FROM LibSub.\`Книги_has_Тематические каталоги\` WHERE \`Книги_Шифр книги\` = ?`,
					[id],
					(err, result, field) => {
						if (err) {
							console.log(err);
							return res.status(500).json({ message: "Ошибка" });
						}
						db.query(
							`DELETE FROM LibSub.\`Книги\` WHERE \`Шифр книги\` = ?`,
							[id],
							(err, result, field) => {
								if (err) {
									console.log(err);
									return res.status(500).json({ message: "Ошибка" });
								}
								res.json(result);
							}
						);
					}
				);
			}
		);
	}
	async getBooks(req, res) {
		await db.query(
			`SELECT \`Шифр книги\` as book_id, \`название книги\` as book_name, \`первый автор\` as first_author, \`место издания\` as publication_place, \`год издания\` as year, \`количество страниц\` as sheets, \`цена\` as cost, \`Издательство\` as publication
            FROM \`Книги\``,
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async getBook(req, res) {
		const id = +req.params.id;
		await db.query(
			`SELECT \`Шифр книги\` as book_id, \`название книги\` as book_name, \`первый автор\` as first_author, \`место издания\` as publication_place, \`год издания\` as year, \`количество страниц\` as sheets, \`цена\` as cost, \`Издательство\` as publication
            FROM \`Книги\`
			WHERE \`Шифр книги\` = ?`,
			[id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}

	async createBookTheme(req, res) {
		const { book_id, theme_id } = req.body;
		await db.query(
			`INSERT INTO LibSub.\`Книги_has_Тематические каталоги\` (\`Книги_Шифр книги\`, \`Тематические каталоги_код темы\`)
			VALUES (?, ?);`,
			[book_id, theme_id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async deleteBookTheme(req, res) {
		const id = +req.params.id;
		await db.query(
			`DELETE FROM LibSub.\`Книги_has_Тематические каталоги\` WHERE \`Книги_Шифр книги\` = ?`,
			[id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async getBookThemes(req, res) {
		await db.query(
			`SELECT \`Шифр книги\` as book_id, \`название книги\` as book_name, \`первый автор\` as first_author, \`Тематические каталоги_код темы\` as theme_id, \`наименование темы\` as theme_name
            FROM \`Книги\`
            LEFT JOIN \`Книги_has_Тематические каталоги\` ON \`Шифр книги\` = \`Книги_Шифр книги\`
			JOIN \`Тематические каталоги\` ON \`Тематические каталоги_код темы\` = \`код темы\`
			ORDER BY book_id`,
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}

	async createTheme(req, res) {
		const { name } = req.body;
		await db.query(
			`INSERT INTO LibSub.\`Тематические каталоги\` (\`наименование темы\`) VALUES
            (?)`,
			[name],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async updateTheme(req, res) {
		const id = +req.params.id;
		const { name } = req.body;
		await db.query(
			`UPDATE LibSub.\`Тематические каталоги\` SET 
			\`наименование темы\` = ?
			WHERE \`код темы\` = ?`,
			[name, id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async deleteTheme(req, res) {
		const id = +req.params.id;
		db.query(
			`DELETE FROM LibSub.\`Тематические каталоги\` WHERE \`код темы\` = ?`,
			[id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async getThemes(req, res) {
		await db.query(
			`SELECT \`код темы\` as theme_id, \`наименование темы\` as name
            FROM \`Тематические каталоги\``,
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async getTheme(req, res) {
		const id = +req.params.id;
		await db.query(
			`SELECT \`код темы\` as theme_id, \`наименование темы\` as name
            FROM \`Тематические каталоги\`
			WHERE \`код темы\` = ?`,
			[id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}

	async createReaderCopy(req, res) {
		const { reader_id, copy_id, issue_date, return_date } = req.body;
		await db.query(
			`INSERT INTO LibSub.\`Читатели_has_Книги\` (\`Читатели_номер читательского билета\`, \`Экземпляры_инвентарный номер\`, \`Дата выдачи\`, \`Дата возврата\`)
			VALUES (?, ?, ?, ?)`,
			[reader_id, copy_id, issue_date, return_date],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async updateReaderCopy(req, res) {
		const { reader_id, copy_id } = req.query;
		const { issue_date, return_date } = req.body;
		await db.query(
			`UPDATE LibSub.\`Читатели_has_Книги\` SET
			\`Дата выдачи\` = ?, 
			\`Дата возврата\` = ?
			WHERE \`Читатели_номер читательского билета\` = ? AND \`Экземпляры_инвентарный номер\` = ?`,
			[issue_date, return_date, reader_id, copy_id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async deleteReaderCopy(req, res) {
		const { reader_id, copy_id } = req.query;
		await db.query(
			`DELETE FROM LibSub.\`Читатели_has_Книги\`
			WHERE \`Читатели_номер читательского билета\` = ? AND \`Экземпляры_инвентарный номер\` = ?`,
			[reader_id, copy_id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async getReaderCopies(req, res) {
		await db.query(
			`SELECT \`Читатели_номер читательского билета\` as reader_id, \`Ф.И.О. читателя\` as full_name, \`Экземпляры_инвентарный номер\` as copy_id, \`название книги\` as book_name, \`первый автор\` as author, \`Дата выдачи\` as issue_date, \`Дата возврата\` as return_date
            FROM LibSub.\`Читатели_has_Книги\`
			JOIN LibSub.\`Читатели\` ON \`Читатели_номер читательского билета\` = \`номер читательского билета\`
			JOIN LibSub.\`Экземпляры\` ON \`Экземпляры_инвентарный номер\` = \`инвентарный номер\`
			JOIN LibSub.\`Книги\` ON \`Книги_Шифр книги\` = \`Шифр книги\``,
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async getReaderCopy(req, res) {
		const { reader_id, copy_id } = req.query;
		await db.query(
			`SELECT \`Читатели_номер читательского билета\` as reader_id, \`Экземпляры_инвентарный номер\` as copy_id, \`Дата выдачи\` as issue_date, \`Дата возврата\` as return_date
            FROM LibSub.\`Читатели_has_Книги\`
			JOIN LibSub.\`Читатели\` ON \`Читатели_номер читательского билета\` = \`номер читательского билета\`
			WHERE \`Читатели_номер читательского билета\` = ? AND \`Экземпляры_инвентарный номер\` = ?`,
			[reader_id, copy_id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}

	async createReader(req, res) {
		const { full_name, birth, phone } = req.body;
		await db.query(
			`INSERT INTO LibSub.\`Читатели\` (\`Ф.И.О. читателя\`, \`дата рождения\`, \`телефон\`) VALUES
            (?, ?, ?)`,
			[full_name, birth, phone],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async updateReader(req, res) {
		const id = +req.params.id;
		const { full_name, birth, phone } = req.body;
		await db.query(
			`UPDATE LibSub.\`Читатели\` SET
			\`Ф.И.О. читателя\` = ?,
			\`дата рождения\` = ?,
			\`телефон\` = ?
            WHERE \`номер читательского билета\` = ?`,
			[full_name, birth, phone, id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async deleteReader(req, res) {
		const id = +req.params.id;
		await db.query(
			`DELETE FROM LibSub.Читатели WHERE \`номер читательского билета\` = ?`,
			[id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async getReaders(req, res) {
		await db.query(
			`SELECT \`номер читательского билета\` as reader_id, \`Ф.И.О. читателя\` as full_name, \`дата рождения\` as birth, \`телефон\` as phone
            FROM LibSub.\`Читатели\``,
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async getReader(req, res) {
		const id = req.params.id;
		await db.query(
			`SELECT \`номер читательского билета\` as reader_id, \`Ф.И.О. читателя\` as full_name, \`дата рождения\` as birth, \`телефон\` as phone
            FROM LibSub.\`Читатели\`
			WHERE \`номер читательского билета\` = ?`,
			[id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}

	async createCopy(req, res) {
		const { book_id } = req.body;
		await db.query(
			`INSERT INTO LibSub.\`Экземпляры\` (\`Книги_Шифр книги\`)
			VALUES (?)`,
			[book_id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async deleteCopy(req, res) {
		const copy_id = +req.params.id;
		await db.query(
			`DELETE FROM LibSub.Экземпляры WHERE \`инвентарный номер\` = ?`,
			[copy_id],
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
	async getCopies(req, res) {
		await db.query(
			`SELECT \`инвентарный номер\` as copy_id, \`Шифр книги\` as book_id, \`название книги\` as book_name, \`первый автор\` as first_author
			FROM LibSub.Экземпляры
			JOIN LibSub.\`Книги\` ON \`Книги_Шифр книги\` = \`Шифр книги\``,
			(err, result, field) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Ошибка" });
				}
				res.json(result);
			}
		);
	}
}

module.exports = new Controller();
