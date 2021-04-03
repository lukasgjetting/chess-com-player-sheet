const input = document.querySelector('#username-input') as HTMLInputElement;
const button = document.querySelector('#submit-button') as HTMLButtonElement;

const submitButtonClick = () => {
	const { value } = input;

	if (value == null || value === '') {
		alert('Please enter a username');

		return;
	}

	window.location.href = `/sheet.html?u=${value}`;
};

button.addEventListener('click', submitButtonClick);
input.addEventListener('keypress', (e) => {
	if (e.key === 'Enter') {
		submitButtonClick();
	}
});
