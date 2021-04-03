const submitButtonClick = () => {
	const input = document.querySelector<HTMLInputElement>('#username-input');

	if (input == null) {
		alert('Cannot find input element');

		return;
	}

	const { value } = input;

	if (value == null || value === '') {
		alert('Please enter a username');

		return;
	}

	window.location.href = `/sheet.html?u=${value}`;
};

const button = document.querySelector<HTMLButtonElement>('#submit-button');

if (button != null) {
	button.addEventListener('click', submitButtonClick);
} else {
	alert('Cannot find button element');
}
