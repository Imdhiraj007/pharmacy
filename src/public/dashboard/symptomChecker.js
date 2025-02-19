const checkSymptoms = document.getElementById('checkSymptoms');
const questions = document.querySelector('.questions');
const duration = document.querySelector('.durationQuestions');
const disease = document.querySelector('.diseaseQuestions');


checkSymptoms.addEventListener('click', () => {

	allergydiv.style.display = 'none';
	medicationdiv.style.display = 'none';
	historydiv.style.display = 'none';
	questions.style.visibility = 'visible';
	console.log("works");
	const result = {
		symptoms: []
	};
	let selected = null;
	const container = document.querySelector('.container2');
	const submit = document.querySelector('#submit');
	const options = document.querySelectorAll('input[type="radio"][name="severity"]');

	submit.addEventListener('click', () => {

		options.forEach(option => {

			if (option.checked) {
				selected = option.value;
				result.symptoms.push(selected);
			}
		})


		duration.style.visibility = 'visible';
		console.log(result.symptoms);
	});
	const submission = document.querySelector('#submission');
	const choices = document.querySelectorAll('input[type="radio"][name="length"]');

	submission.addEventListener('click', () => {

		choices.forEach(option => {
			if (option.checked) {
				selected = option.value;
				result.symptoms.push(selected);
			}
		})

		disease.style.visibility = 'visible';
		console.log(result.symptoms);
	})
	const send = document.querySelector('#send');


	send.addEventListener('click', () => {
		duration.innerHTML = '';

		// console.log("events");
		selectionProcess(result);
	})


	//selection process exits when the option selected is none
	axios.post('http://localhost:3000/dashboard/symptoms', result)
		.then(response => { })
		.catch(error => {
			console.log(error);
		});
});


function selectionProcess(result) {


	let selectedId = null;
	const endpoint = 'http://localhost:3000/dashboard/symptoms';
	const checkOptions = document.querySelectorAll('input[type="checkbox"][name="symptoms"]');


	// Get the selected radio button
	checkOptions.forEach(options => {
		if (options.checked) {

			if (options.value == "none") {
				checkOptions.forEach(uncheck => {
					if (uncheck !== options)
						uncheck.checked = false;
				});
				result.symptoms.push(options.value);
			}
			else {

				selectedId = options.id;

				result.symptoms.push(selectedId);
			}

		}
	});
	console.log(result.symptoms);
	disease.innerHTML = '';
	// If 'none' is selected, stop the recursion
	if (selectedId === 'none') {
		questions.innerHTML = '';

		axios.post(endpoint, result)
			.then(response => {

				console.log(response);
				const resultdiv = document.createElement('div');
				resultdiv.innerText = `you have disease ${response.data}`;
				questions.appendChild(resultdiv);
				return;
			})
			.catch(error => {
				console.log(error);
			});

	}



	// Send the selected result to the server
	axios.post(endpoint, result)
		.then(response => {
			// Clear previous radio buttons
			questions.innerHTML = '';
			console.log(response);
			// Display response as radio buttons
			for (let i = 0; i < response.data.length; i++) {
				const radioButton = document.createElement('input');
				radioButton.type = 'checkbox';
				radioButton.id = response.data[i]; // Set id based on symptom
				radioButton.name = 'symptoms';

				const label = document.createElement('label');
				label.htmlFor = radioButton.id;
				label.textContent = response.data[i];

				questions.appendChild(radioButton);
				questions.appendChild(label);
				questions.appendChild(document.createElement('br'));
			}

			//create none option
			const radioButton = document.createElement('input');
			radioButton.type = 'checkbox';
			radioButton.id = 'none'; // Set id based on symptom
			radioButton.value = 'none';
			radioButton.name = 'symptoms';

			const label = document.createElement('label');
			label.htmlFor = 'none';
			label.textContent = 'none';

			questions.appendChild(radioButton);
			questions.appendChild(label);
			questions.appendChild(document.createElement('br'));

			//create submit button
			const submit = document.createElement('button');
			submit.innerText = 'Submit';
			submit.id = 'submit';
			questions.appendChild(submit);

			// If the user selects the none option all the other option selected gets unselectedX
			const noneCheckbox = document.querySelector('#none');
			let checkboxes = document.querySelectorAll('input[type="checkbox"][name="symptoms"]');

			checkboxes.forEach(checkbox => {
				checkbox.addEventListener('change', () => {
					if (checkbox === noneCheckbox && checkbox.checked) {
						// If "none" checkbox is checked, uncheck all other checkboxes
						checkboxes.forEach(cb => {
							if (cb !== noneCheckbox) {
								cb.checked = false;
							}
						});
					} else if (checkbox.checked && noneCheckbox.checked) {
						// If any other checkbox is checked while "none" checkbox is checked, uncheck "none"
						noneCheckbox.checked = false;
					}
				});
			});
			// Continue the process recursively


			submit.addEventListener('click', () => selectionProcess(result));
		})
		.catch(error => {
			// Handle error
			console.log(error);
		});
}
