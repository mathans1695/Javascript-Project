// Selecting the elements for DOM Manipulation
const buttonElem = document.querySelector('.button');
const inputElem = document.querySelector('#todo');

//Autofocusing the input element
inputElem.focus();

//Setting eventlistener after the document fully loaded
buttonElem.addEventListener('click', addTasks);

let newTaskState = 0;
let forTaskTitleName = 1;
let uniqueKey = 10000;


//Addition of tasks in DOM
function addTasks(e) {
	
	//Condition to check the user input, if not an empty string add the task
	if(inputElem.value !== '') {
		
		//focusing the input for guiding the user to add next task
		inputElem.focus();
		
		//Declaration for adding new tasks 
		const checkBox = document.createElement('input');
		const newTask = document.createElement('li');
		const editButton = document.createElement('button');
		const removeButton = document.createElement('button');
		const divChild = document.createElement('div');
		const output = document.querySelector('.output');
					
		checkBox.type = 'checkbox';
		checkBox.className = 'done';
		
		newTask.appendChild(document.createTextNode(inputElem.value));
		
		editButton.className = 'edit-button';
		editButton.appendChild(document.createTextNode('Edit'));
		
		removeButton.className = 'remove-button';
		removeButton.appendChild(document.createTextNode('Remove'));
		
					
		divChild.appendChild(checkBox);
		divChild.appendChild(newTask);
		divChild.appendChild(editButton);
		divChild.appendChild(removeButton);
		
		if(newTaskState === 0) {
			
			const listOfTask = document.createElement('div');
			const div = document.createElement('div');
			
			listOfTask.className = `tasks main-${uniqueKey}`;
			listOfTask.appendChild(div);
			
			div.className = 'task-list';
			div.appendChild(divChild);
			
			output.appendChild(listOfTask);
			addTaskTitle(e);
			
			newTaskState = newTaskState + 1;
		} else {

			const div = output.querySelector('.task-list');
			div.appendChild(divChild);
		}
		
		//Making the input value to empty string
		inputElem.value = '';
		
		editButton.addEventListener('click', editTasks);
		removeButton.addEventListener('click', removeTask);
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
	
	const div = document.createElement('div');
	div.className = `task-title`;
	
	const h3 = document.createElement('h3');
	h3.innerText = `Untitled-${forTaskTitleName}`;
	
	const headingDiv = document.createElement('div');
	headingDiv.className = 'task-title-heading';
	
	headingDiv.appendChild(h3);
	                 
	const imgDiv = svgarrow('main-down-arrow', 'angle-circle-down.svg');
	
	const editButton = document.createElement('button');
	const removeButton = document.createElement('button');
	
	editButton.className = 'edit-button';
	editButton.appendChild(document.createTextNode('Edit'));
		
	removeButton.className = 'remove-button';
	removeButton.appendChild(document.createTextNode('Remove'));

	div.appendChild(imgDiv);
	div.appendChild(headingDiv);
	div.appendChild(editButton);
	div.appendChild(removeButton);
	
	editButton.addEventListener('click', editTasksTitle);
	removeButton.addEventListener('click', removeTasksTitle);
	
	const listOfTask = document.querySelector('.tasks');
	listOfTask.insertBefore(div, listOfTask.firstElementChild);
	
	addToLeftBar(e, forTaskTitleName);	
	forTaskTitleName = forTaskTitleName + 1;
	
	h3.addEventListener('click', hideTasks);
	imgDiv.addEventListener('click', hideTasks);
	
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


//editTaskTitle function to edit the tasks
function editTasksTitle(e) {
	
	let state = 1;
	
	const editButton = e.target;
	editButton.innerHTML = 'Done';
	
	const parentDiv = e.target.parentElement;
	
	const superParent = e.target.parentElement.parentElement;
	
	const sidebarClassName = 'sidebar' + superParent.className.slice(10);

	const input = document.createElement('input');
	input.className = 'editTasksTitle';
	input.setAttribute('type', 'text');
	
	const form = document.createElement('form');
	form.setAttribute('action', '#');
	form.appendChild(input);
	
	const button = document.createElement('button');
	button.style.display = 'none';
	form.appendChild(button);
	
	
	const headingDiv = parentDiv.querySelector('.task-title-heading');
	
	input.value = headingDiv.querySelector('h3').innerHTML;
	const originalText = headingDiv.querySelector('h3').innerHTML;
	
	headingDiv.appendChild(form);
	headingDiv.removeChild(headingDiv.querySelector('h3'));
	
	input.focus();
	
	//eventlistener for input element
	button.addEventListener('click', temp);
	
	function temp(e) {
		
		if(input.value !== '') {
			const headingElem = document.createElement('h3');
			headingElem.appendChild(document.createTextNode(input.value));
			
			sidebarHeading = document.body.querySelector(`.${sidebarClassName} h3`);
			
			console.log(sidebarHeading);
			
			sidebarHeading.innerHTML = input.value;
			
			headingDiv.appendChild(headingElem);
			headingDiv.removeChild(form);
			
			editButton.innerHTML = 'Edit';
			
			document.body.removeEventListener('click', temp2);
			button.removeEventListener('click', temp);
			editButton.addEventListener('click', editTasksTitle);
		}
		else {
			input.className = 'editTasksTitle editTasksTitle-focus';
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
					const headingElem = document.createElement('h3');
					headingElem.appendChild(document.createTextNode(input.value));
					
					sidebarHeading = document.body.querySelector(`.${sidebarClassName} h3`);
			
					sidebarHeading.innerHTML = input.value;
		
					headingDiv.appendChild(headingElem);
					headingDiv.removeChild(form);
				
					editButton.innerHTML = 'Edit';
				
					button.removeEventListener('click', temp);
					document.body.removeEventListener('click', temp2);
					editButton.addEventListener('click', editTasksTitle);
				}
				else {
					if(e.target.innerHTML !== 'Done') {
						input.className = 'editTasksTitle editTasksTitle-focus';
						input.focus();
				
						button.removeEventListener('click', temp);
						document.body.removeEventListener('click', temp2);
				
						button.addEventListener('click', temp);
						document.body.addEventListener('click', temp2);
					} else {
						const headingElem = document.createElement('h3');
						headingElem.appendChild(document.createTextNode(originalText));
						
						sidebarHeading = document.body.querySelector(`.${sidebarClassName} h3`);
			
						sidebarHeading.innerHTML = originalText;
		
						headingDiv.appendChild(headingElem);
						headingDiv.removeChild(form);
				
						editButton.innerHTML = 'Edit';
				
						button.removeEventListener('click', temp);
						document.body.removeEventListener('click', temp2);
						editButton.addEventListener('click', editTasksTitle);
					}
				}
			} 
		} else if(e.target === editButton) {
			if(state == 2) {
				if(input.value !== '') {
					const headingElem = document.createElement('h3');
					headingElem.appendChild(document.createTextNode(input.value));
					
					sidebarHeading = document.body.querySelector(`.${sidebarClassName} h3`);
			
					sidebarHeading.innerHTML = input.value;
		
					headingDiv.appendChild(headingElem);
					headingDiv.removeChild(form);
				
					editButton.innerHTML = 'Edit';
				
					button.removeEventListener('click', temp);
					document.body.removeEventListener('click', temp2);
					e.target.addEventListener('click', editTasksTitle);
				}
				else {
					input.className = 'editTasksTitle editTasksTitle-focus';
					input.focus();
				
					button.removeEventListener('click', temp);
					document.body.removeEventListener('click', temp2);
				
					button.addEventListener('click', temp);
					document.body.addEventListener('click', temp2);
				}
			} else if(state == 1) {
				state = state + 1;
				e.target.removeEventListener('click', editTasksTitle);
			}
		}
	}
}


function removeTasksTitle(e) {
	
	const superParent = e.target.parentElement.parentElement.parentElement;
	const parentDiv = e.target.parentElement.parentElement;
	
	const sidebarClassName = 'sidebar' + parentDiv.className.slice(10);
	
	if(prompt('Are you sure?')) {
		document.body.querySelector(`.${sidebarClassName}`).parentElement.removeChild(document.body.querySelector(`.${sidebarClassName}`), document.body.querySelector(`.${sidebarClassName}`).parentElement);
		
		superParent.removeChild(parentDiv);
		
		newTaskState = 0;
		inputElem.focus();
		forTaskTitleName = forTaskTitleName - 1;
	}
}


//editTasks function to edit the tasks
function editTasks(e) {
	
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

//function addToLeftBar to add it to side bar
function addToLeftBar(e, number) {
	const div = document.createElement('div');
	div.className = `sidebar-tasks sidebar-${uniqueKey}`;
	
	const divForTitle = document.createElement('div');
	divForTitle.className = 'sidebar-tasks-title';
	
	const leftSideBar = document.querySelector('.left-sidebar');
	
	const imgDiv = svgarrow('sidebar-right-arrow', 'angle-circle-right.svg');
	
	const title = document.createElement('h3');
	title.className = 'sidebar-tasks-title-h3';
	title.innerText = `Untitled-${number}`;
	
	divForTitle.appendChild(imgDiv);
	divForTitle.appendChild(title);
	
	div.appendChild(divForTitle);
	
	const sidebarStatistics = document.createElement('div');
	sidebarStatistics.className = `sidebar-tasks-statistics`;
	
	const completed = document.createElement('div');
	completed.className = 'sidebar-statistics-completed';
	completed.appendChild(document.createTextNode('Completed: '));
	
	const notCompleted = document.createElement('div');
	notCompleted.className = 'sidebar-statistics-not-completed';
	notCompleted.appendChild(document.createTextNode('Not Completed: '));
	
	const total = document.createElement('div');
	total.className = 'sidebar-statistics-total';
	total.appendChild(document.createTextNode('Total Tasks: '));
	
	const removed = document.createElement('div');
	removed.className = 'sidebar-statistics-removed';
	removed.appendChild(document.createTextNode('Removed: '));
	
	sidebarStatistics.appendChild(total);
	sidebarStatistics.appendChild(completed);
	sidebarStatistics.appendChild(notCompleted);
	sidebarStatistics.appendChild(removed);
	
	
	leftSideBar.appendChild(div);
	div.appendChild(sidebarStatistics);
	sidebarStatistics.style.display = 'none';
	
	imgDiv.addEventListener('click', sidebarTaskExpand);
	title.addEventListener('click', sidebarTaskExpand);
}


function sidebarTaskExpand(e) {
	
	const imgDiv = svgarrow('sidebar-down-arrow', 'angle-circle-down.svg');
	
	if(e.target.className !== 'sidebar-tasks-title-h3') {
		const parentDiv = e.target.parentElement.parentElement;
	
		parentDiv.insertBefore(imgDiv, parentDiv.querySelector('.sidebar-tasks-title-h3'));
	
		parentDiv.nextElementSibling.style.display = 'block';
		
		parentDiv.removeChild(e.target.parentElement);
		
		parentDiv.querySelector('.sidebar-tasks-title-h3').removeEventListener('click', sidebarTaskExpand);
		
		imgDiv.addEventListener('click', hideStatistics);
		parentDiv.querySelector('.sidebar-tasks-title-h3').addEventListener('click', hideStatistics);
	} else {
		const parentDiv = e.target.parentElement;
		
		parentDiv.removeChild(e.target.previousElementSibling);
		
		parentDiv.insertBefore(imgDiv, e.target);
		
		parentDiv.nextElementSibling.style.display = 'block';
		
		e.target.removeEventListener('click', sidebarTaskExpand);
		
		e.target.addEventListener('click', hideStatistics);
		imgDiv.addEventListener('click', hideStatistics);
	}
}

function hideStatistics(e) {
	
	const imgDiv = svgarrow('sidebar-right-arrow', 'angle-circle-right.svg');
	
	if(e.target.className !== 'sidebar-tasks-title-h3') {
		const parentDiv = e.target.parentElement.parentElement;
	
		parentDiv.insertBefore(imgDiv, parentDiv.querySelector('.sidebar-tasks-title-h3'));
	
		parentDiv.nextElementSibling.style.display = 'none';
		
		parentDiv.removeChild(e.target.parentElement);
		
		parentDiv.querySelector('.sidebar-tasks-title-h3').removeEventListener('click', hideStatistics);
		
		imgDiv.addEventListener('click', sidebarTaskExpand);
		parentDiv.querySelector('.sidebar-tasks-title-h3').addEventListener('click', sidebarTaskExpand);
	} else {
		const parentDiv = e.target.parentElement;
		parentDiv.removeChild(e.target.previousElementSibling);
		parentDiv.insertBefore(imgDiv, e.target);
		
		parentDiv.nextElementSibling.style.display = 'none';
		
		e.target.removeEventListener('click', hideStatistics);
		
		e.target.addEventListener('click', hideStatistics);
		
		e.target.addEventListener('click', sidebarTaskExpand);
		imgDiv.addEventListener('click', sidebarTaskExpand);
	}
}


function hideTasks(e) {
	const imgDiv = svgarrow('main-right-arrow', 'angle-circle-right.svg');
	
	if(e.target.parentElement.className !== 'task-title-heading') {
		const parentDiv = e.target.parentElement.parentElement;
		
		parentDiv.insertBefore(imgDiv, parentDiv.querySelector('.task-title-heading'));
	
		parentDiv.nextElementSibling.style.display = 'none';
		
		parentDiv.removeChild(e.target.parentElement);
		
		parentDiv.querySelector('.task-title-heading h3').removeEventListener('click', hideTasks);
		
		imgDiv.addEventListener('click', expandTasks);
		parentDiv.querySelector('.task-title-heading h3').addEventListener('click', expandTasks);
	} else {
		const parentDiv = e.target.parentElement.parentElement;
		
		parentDiv.removeChild(e.target.parentElement.previousElementSibling);
		
		parentDiv.insertBefore(imgDiv, e.target.parentElement);
		
		parentDiv.nextElementSibling.style.display = 'none';
		
		e.target.removeEventListener('click', hideTasks);
		
		e.target.addEventListener('click', expandTasks);
		imgDiv.addEventListener('click', expandTasks);
	}
}

function expandTasks(e) {
	const imgDiv = svgarrow('main-down-arrow', 'angle-circle-down.svg');
	
	if(e.target.parentElement.className !== 'task-title-heading') {
		const parentDiv = e.target.parentElement.parentElement;
		
		parentDiv.insertBefore(imgDiv, parentDiv.querySelector('.task-title-heading'));
	
		parentDiv.nextElementSibling.style.display = 'block';
		
		parentDiv.removeChild(e.target.parentElement);
		
		parentDiv.querySelector('.task-title-heading h3').removeEventListener('click', expandTasks);
		
		imgDiv.addEventListener('click', hideTasks);
		parentDiv.querySelector('.task-title-heading h3').addEventListener('click', hideTasks);
	} else {
		const parentDiv = e.target.parentElement.parentElement;
		
		parentDiv.removeChild(e.target.parentElement.previousElementSibling);
		
		parentDiv.insertBefore(imgDiv, e.target.parentElement);
		
		parentDiv.nextElementSibling.style.display = 'block';
		
		e.target.removeEventListener('click', expandTasks);
		
		e.target.addEventListener('click', hideTasks);
		imgDiv.addEventListener('click', hideTasks);
	}
}