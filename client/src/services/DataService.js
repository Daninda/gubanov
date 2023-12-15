import axios from "axios";
const http = axios.create({
	baseURL: "http://localhost:3000/api",
	headers: {
		"Content-Type": "application/json",
	},
});

class DataService {
	getBooks() {
		return http.get("/books");
	}
	getBook(id) {
		return http.get(`/book/${id}`);
	}
	createBook(data) {
		return http.post("/book", data);
	}
	updateBook(id, data) {
		return http.put(`/book/${id}`, data);
	}
	deleteBook(id) {
		return http.delete(`/book/${id}`);
	}

	getBookThemes() {
		return http.get("/book-themes");
	}
	createBookTheme(data) {
		return http.post("/book-theme", data);
	}
	deleteBookTheme(id) {
		return http.delete(`/book-theme/${id}`);
	}

	getThemes() {
		return http.get("/themes");
	}
	getTheme(id) {
		return http.get(`/theme/${id}`);
	}
	createTheme(data) {
		return http.post("/theme", data);
	}
	updateTheme(id, data) {
		return http.put(`/theme/${id}`, data);
	}
	deleteTheme(id) {
		return http.delete(`/theme/${id}`);
	}

	getReaders() {
		return http.get("/readers");
	}
	getReader(id) {
		return http.get(`/reader/${id}`);
	}
	createReader(data) {
		return http.post("/reader", data);
	}
	updateReader(id, data) {
		return http.put(`/reader/${id}`, data);
	}
	deleteReader(id) {
		return http.delete(`/reader/${id}`);
	}

	getReaderCopies() {
		return http.get("/reader-copies");
	}
	getReaderCopy(reader_id, copy_id) {
		return http.get(`/reader-copy/?reader_id=${reader_id}&copy_id=${copy_id}`);
	}
	createReaderCopy(data) {
		return http.post("/reader-copy", data);
	}
	updateReaderCopy(reader_id, copy_id, data) {
		return http.put(
			`/reader-copy/?reader_id=${reader_id}&copy_id=${copy_id}`,
			data
		);
	}
	deleteReaderCopy(reader_id, copy_id) {
		return http.delete(
			`/reader-copy/?reader_id=${reader_id}&copy_id=${copy_id}`
		);
	}

	getCopies() {
		return http.get("/copies");
	}
	createCopy(data) {
		return http.post("/copy", data);
	}
	deleteCopy(id) {
		return http.delete(`/copy/${id}`);
	}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new DataService();
