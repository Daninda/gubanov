import { Route, Routes } from "react-router-dom";
import SnackbarProvider from "react-simple-snackbar";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./components/Home";
import { MyReport } from "./components/MyReport";

import BookTable from "./components/tables/BookTable";
import BookThemeTable from "./components/tables/BookThemeTable";
import ThemeTable from "./components/tables/ThemeTable";
import ReaderTable from "./components/tables/ReaderTable";
import CopyTable from "./components/tables/CopyTable";
import ReaderCopyTable from "./components/tables/ReaderCopyTable";

import CreateBook from "./components/create/CreateBook";
import CreateTheme from "./components/create/CreateTheme";
import CreateBookTheme from "./components/create/CreateBookTheme";
import CreateReader from "./components/create/CreateReader";
import CreateCopy from "./components/create/CreateCopy";
import CreateReaderCopy from "./components/create/CreateReaderCopy";

import UpdateBook from "./components/update/UpdateBook";
import UpdateTheme from "./components/update/UpdateTheme";
import UpdateReader from "./components/update/UpdateReader";
import UpdateReaderCopy from "./components/update/UpdateReaderCopy";

function App() {
	return (
		<>
			<SnackbarProvider>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="books" element={<BookTable />} />
						<Route path="book-themes" element={<BookThemeTable />} />
						<Route path="themes" element={<ThemeTable />} />
						<Route path="readers" element={<ReaderTable />} />
						<Route path="copies" element={<CopyTable />} />
						<Route path="reader-copies" element={<ReaderCopyTable />} />

						<Route path="create-book" element={<CreateBook />} />
						<Route path="create-theme" element={<CreateTheme />} />
						<Route path="create-book-theme" element={<CreateBookTheme />} />
						<Route path="create-reader" element={<CreateReader />} />
						<Route path="create-copy" element={<CreateCopy />} />
						<Route path="create-reader-copy" element={<CreateReaderCopy />} />

						<Route path="update-book/:id" element={<UpdateBook />} />
						<Route path="update-theme/:id" element={<UpdateTheme />} />
						<Route path="update-reader/:id" element={<UpdateReader />} />
						<Route path="update-reader-copy" element={<UpdateReaderCopy />} />

						<Route path="report" element={<MyReport />} />

						<Route path="*" element={<></>} />
					</Route>
				</Routes>
			</SnackbarProvider>
		</>
	);
}

export default App;
