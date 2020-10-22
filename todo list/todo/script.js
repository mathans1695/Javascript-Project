// Selecting the elements for DOM Manipulation
const buttonElem = document.querySelector('.button');
const inputElem = document.querySelector('#todo');

//Autofocusing the input element
inputElem.focus();

//Setting eventlistener after the document fully loaded
buttonElem.addEventListener('click', addTasks);


//Addition of tasks in DOM
function addTasks(e) {
	
	//Condition to check the user input, if not an empty string add the task
	if(inputElem.value !== '') {
		
		//addTaskTitle();
		
		//focusing the input for guiding the user to add next task
		inputElem.focus();
		
		//Creating new div and li element and append it to output div
		const div = document.createElement('div');
				
		const newTask = document.createElement('li');
		newTask.appendChild(document.createTextNode(inputElem.value));
					
		const checkBox = document.createElement('input');
		checkBox.type = 'checkbox';
		checkBox.className = 'done';
					
		div.appendChild(checkBox);
		div.appendChild(newTask);
					
		const listOfTask = document.querySelector('.output');
		listOfTask.appendChild(div);
		
		//Making the input value to empty string
		inputElem.value = '';
		
		
		//edit and remove button added to the end
		const editButton = document.createElement('button');
		editButton.className = 'edit-button';
		editButton.appendChild(document.createTextNode('Edit'));
		
		div.appendChild(editButton);
		
		//adding event listener to edit button
		editButton.addEventListener('click', editTasks);
		
		const removeButton = document.createElement('button');
		removeButton.className = 'remove-button';
		removeButton.appendChild(document.createTextNode('Remove'));
		
		div.appendChild(removeButton);
		
		//adding event listener to remove button
		removeButton.addEventListener('click', removeTask);
		
		//adding eventlistener to checkBox
		checkBox.addEventListener('change', strikeTask);
	}
	
	else {
		error();
	}
	
	
	//Prevent default behaviour of form element
	e.preventDefault();
}


//Function for adding title to output div
function addTaskTitle(e) {
	let i = 1;
	const div = document.createElement('div');
	div.className = `task-title-div`;
	
	const h3 = document.createElement('h3');
	h3.className = 'task-title-heading';
	h3.innerText = `untitled${i}`;
	
	const imgDiv = svgarrow('down-arrow', 'angle-circle-down.svg');

	div.appendChild(imgDiv);
	div.appendChild(h3);
	
	const output = document.querySelector('.output');
	output.insertBefore(div, output.firstChildElement);
}


//error function to show error message
function error() {
	//Checking for the presence of error div inside container, if so remove the error div
		if(document.querySelector('.error')) {
			document.querySelector('.error').parentElement.removeChild(document.querySelector('.error'));
		}
		
		//creating and adding error prompt
		const errorPrompt = document.createElement('div');
		errorPrompt.className = 'error';
		errorPrompt.innerHTML = '<p>Enter something that you want to finish</p>'
					
		const body = document.querySelector('.container');
		const inputDiv = document.querySelector('.input');
		body.insertBefore(errorPrompt, inputDiv);
			
		// Prompt will disapper after 3 seconds
		setTimeout(() => {
			errorPrompt.style.display = 'None';
			inputElem.focus();
		}, 3000);
}

//This function for creating custome arrows
function svgarrow(classname, filename) {
	const div = document.createElement('div');
	div.className = `${classname}`;
	
	const img = document.createElement('img');
	img.setAttribute('src', `images/svg/circle-arrow/${filename}`);
	img.setAttribute('alt', '');
	
	div.appendChild(img);
	return div;
}

//editTasks function to edit the tasks
function editTasks(e) {
	//Creating new input element for replacing the li element inside the task div
	
	let state = 1;
	
	const editButton = e.target;
	const originalText = e.target.parentElement.querySelector('li').innerHTML;
	
	editButton.innerHTML = 'Done';

	const input = document.createElement('input');
	input.className = 'editTask';
	input.setAttribute('type', 'text');
	
	const form = document.createElement('form');
	form.setAttribute('action', '#');
	form.appendChild(input);
	
	const button = document.createElement('button');
	button.style.display = 'none';
	form.appendChild(button);
	
	
	const parentDiv = editButton.parentElement;
	const childLi = parentDiv.querySelector('li');
	
	input.value = childLi.innerHTML;
	
	parentDiv.insertBefore(form, childLi.nextSibling);
	parentDiv.removeChild(childLi);
	
	input.focus();
	
	//eventlistener for input element
	button.addEventListener('click', temp);
	
	function temp(e) {
		
		if(input.value !== '') {
			const liElem = document.createElement('li');
			liElem.appendChild(document.createTextNode(input.value));
			
			parentDiv.insertBefore(liElem, parentDiv.querySelector('.edit-button'));
			parentDiv.removeChild(form);
			
			editButton.innerHTML = 'Edit';
			
			document.body.removeEventListener('click', temp2);
			button.removeEventListener('click', temp);
			editButton.addEventListener('click', editTasks);
		}
		else {
			input.className = 'editTask editTask-focus';
			input.focus();
			
			button.removeEventListener('click', temp);
			document.body.removeEventListener('click', temp2);
			
			button.addEventListener('click', temp);
			document.body.addEventListener('click', temp2);
		}
		
		e.preventDefault();
	}
	
	document.body.addEventListener('click', temp2);
	
	function temp2(e) {
		
		if(e.target !== editButton) {
			if(e.target !== input) {
				if(input.value !== '') {
					const liElem = document.createElement('li');
					liElem.appendChild(document.createTextNode(input.value));
		
					parentDiv.insertBefore(liElem, parentDiv.querySelector('.edit-button'));
					parentDiv.removeChild(form);
				
					editButton.innerHTML = 'Edit';
				
					button.removeEventListener('click', temp);
					document.body.removeEventListener('click', temp2);
					editButton.addEventListener('click', editTasks);
				}
				else {
					if(e.target.innerHTML !== 'Done') {
						input.className = 'editTask editTask-focus';
						input.focus();
				
						button.removeEventListener('click', temp);
						document.body.removeEventListener('click', temp2);
				
						button.addEventListener('click', temp);
						document.body.addEventListener('click', temp2);
					} else {
						const liElem = document.createElement('li');
						liElem.appendChild(document.createTextNode(originalText));
		
						parentDiv.insertBefore(liElem, parentDiv.querySelector('.edit-button'));
						parentDiv.removeChild(form);
				
						editButton.innerHTML = 'Edit';
				
						button.removeEventListener('click', temp);
						document.body.removeEventListener('click', temp2);
						editButton.addEventListener('click', editTasks);
					}
				}
			} 
		} else if(e.target === editButton) {
			if(state == 2) {
				if(input.value !== '') {
					const liElem = document.createElement('li');
					liElem.appendChild(document.createTextNode(input.value));
		
					parentDiv.insertBefore(liElem, parentDiv.querySelector('.edit-button'));
					parentDiv.removeChild(form);
				
					editButton.innerHTML = 'Edit';
				
					button.removeEventListener('click', temp);
					document.body.removeEventListener('click', temp2);
					e.target.addEventListener('click', editTasks);
				}
				else {
					input.className = 'editTask editTask-focus';
					input.focus();
				
					button.removeEventListener('click', temp);
					document.body.removeEventListener('click', temp2);
				
					button.addEventListener('click', temp);
					document.body.addEventListener('click', temp2);
				}
			} else if(state == 1) {
				state = state + 1;
				e.target.removeEventListener('click', editTasks);
			}
		}
	}
}


//removeTasks function to remove the task
function removeTask(e) {
	e.target.parentElement.parentNode.removeChild(e.target.parentElement);
}


//function to strike the text when checkbox is clicked
function strikeTask(e) {
	const curListElem = e.target.parentElement.querySelector('li');
	
	if(e.target.checked) {
		
		//removing the event listener to avoid conflict
		e.target.removeEventListener('change', strikeTask);
		
		//styling the background to light green to indicate success
		curListElem.parentElement.style.backgroundColor = 'rgb(230, 255, 230)';
		curListElem.nextElementSibling.disabled = 'true';
		
		//inserting the tick svg icons in place of checkbox		
		const checkmark = document.createElement('img');
		checkmark.className = 'checkmark';
		checkmark.setAttribute('src', 'images/svg/check-mark/check-mark-line.svg');
		checkmark.setAttribute('alt', '');
		
		//inserting the tick icon
		e.target.parentElement.insertBefore(checkmark, e.target.nextSibling);
		
		//removing the checkbox
		e.target.parentElement.removeChild(e.target);
		
		//adding eventlistener to undo the default checkbox
		checkmark.addEventListener('click', strikeTaskUndo);
	}
}


//function strikeTaskUndo to get back the tasks to original, if user feel that they haven't completed the tasks
function strikeTaskUndo(e) {
	const div = e.target.parentElement;
	div.querySelector('.edit-button').disabled = false;
	
	const taskDivs = div.parentElement.children;
	for(let i=0; i<taskDivs.length; i++) {
		if(taskDivs[i] === div) {
			if(i % 2 == 0) {
				div.style.backgroundColor = 'rgb(255, 230, 230)';
			} else {
				div.style.backgroundColor = 'rgb(255, 255, 230)';
			}
		}
	}
	
	const checkBox = document.createElement('input');
	checkBox.className = 'done';
	checkBox.setAttribute('type', 'checkbox');
	
	div.insertBefore(checkBox, div.querySelector('li'));
	div.removeChild(e.target);
	
	div.querySelector('input').addEventListener('change', strikeTask);
}