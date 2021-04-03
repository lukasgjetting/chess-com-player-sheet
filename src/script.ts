const submitButtonClick = () => {
	const input = document.querySelector('#username-input') as HTMLInputElement;

	const { value } = input;

	if (value == null || value === '') {
		alert('Please enter a username');

		return;
	}

	window.location.href = `/sheet.html?u=${value}`;
};

const button = document.querySelector('#submit-button') as HTMLButtonElement;

button.addEventListener('click', submitButtonClick);
