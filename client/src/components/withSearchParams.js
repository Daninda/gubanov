import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const withSearchParams = (WrappedComponent) => (props) => {
	const [searchParams, setSearchParams] = useSearchParams();

	return (
		<WrappedComponent
			{...props}
			searchParams={searchParams}
			setSearchParams={setSearchParams}
			useEffect={useEffect}
		/>
	);
};

export default withSearchParams;
