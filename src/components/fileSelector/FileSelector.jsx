const FileSelector = () => {
	const builtFileSelector = () => {
		const fileSelector = document.createElement('input');
		fileSelector.setAttribute('type', 'file');
		return fileSelector;
	};

	const onClick = (e) => {
		e.preventDefault();
		const fileSelector = builtFileSelector();
		fileSelector.click();
	};

	return(
		<button onClick={onClick}>
			upload file
		</button>
	)
};

export default FileSelector;
