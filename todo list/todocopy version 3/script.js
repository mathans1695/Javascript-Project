// Selecting the elements for DOM Manipulation
const buttonElem = document.querySelector('.button');
const addNew = document.querySelector('.add-new-todo-button');
const inputElem = document.querySelector('#todo');

//Autofocusing the input element
inputElem.focus();

//Setting eventlistener after the document fully loaded
buttonElem.addEventListener('click', addTasks);

addNew.addEventListener('click', addNewTodo);
addNew.addEventListener('click', addTasks);

let newTaskState = 0;
let forTaskTitleName = 1;
let uniqueKey = 10001;

let targetUniqueKey = uniqueKey;
let previousTargetUniqueKey = targetUniqueKey;

let movementTracker = 0;


//function tasksTracker
function tasksTracker(key) {
	this.key = key;
	this.totalTasks = 0;
	this.completed = 0;
	this.notCompleted = 0;
	this.removed = 0;
}


//setting state for addNewTodo
function addNewTodo() {
	try {
		removeHighlighter();
	}catch(err) {
	}
	
	newTaskState = 0;
	uniqueKey += 1;
	targetUniqueKey = uniqueKey;
	previousTargetUniqueKey = targetUniqueKey;
	
	hideDescription();
}


//Addition of tasks in DOM
function addTasks(e) {
	
	//Condition to check the user input, if not an empty string add the task
	if((inputElem.value !== '') || (e.target.className === 'add-new-todo-button')) {
		
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
			
			div.className = `task-list task-list-main-${uniqueKey}`;
			
			output.appendChild(listOfTask);
			addTaskTitle(e);
			
			if(e.target.className !== 'add-new-todo-button') {
				div.appendChild(divChild);
				hideDescription();
				newTask.addEventListener('click', addTaskDescription);
				
				updateSidebar(e);
			}
			
			newTaskState = newTaskState + 1;
		} else {
			const div = output.querySelector(`.task-list-main-${targetUniqueKey}`);
			div.appendChild(divChild);
			hideDescription();
			newTask.addEventListener('click', addTaskDescription);
			
			updateSidebar(e);
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

function addTaskTitleDescription(e) {
	hideDescription();
	const rightSidebar = document.body.querySelector('.right-sidebar');
	
	try {
		const para = rightSidebar.querySelector('.heading');
		rightSidebar.removeChild(para);
	} catch(err) {
	}
	
	const target = e.target.parentElement.parentElement;
	const targetUniqueKeyCopy = target.classList[1].slice(16);
	
	const superParent = e.target.parentElement.parentElement.parentElement.parentElement;
	
	const targetChildren = superParent.children;
	let targetChildrenPosition;
	
	for(let i=0; i<targetChildren.length; i++){
		if(superParent.children[i].querySelector('h3') === e.target) {
			targetChildrenPosition = i;
		}
	}
	
	
	let textAreaTemp;
	let targetState = 0;
	
	if(rightSidebar.querySelectorAll(`.task-title-description`).length !== 0) {
		const temp = rightSidebar.querySelectorAll('.task-title-description');
		
		for(let i=0; i<temp.length; i++) {
			if(temp[i].querySelector('textarea')) {
				if(temp[i].querySelector('textarea').value === '') {
					temp[i].parentElement.removeChild(temp[i]);
				} else {
					if(temp[i].classList[1] + ' ' + temp[i].classList[2] === `task-title-description-${targetUniqueKeyCopy} task-title-${targetChildrenPosition}`) {
						temp[i].style.display = 'block';
						targetState = 1;
						textAreaTemp = temp[i].querySelector('textarea');
						
					} else {
						temp[i].style.display = 'none';
					}
				}
			} else {
				if(temp[i].classList[1] + ' ' + temp[i].classList[2] === `task-title-description-${targetUniqueKeyCopy} task-title-${targetChildrenPosition}`) {
					temp[i].style.display = 'block';
					targetState = 1;
				} else {
					temp[i].style.display = 'none';
				}
			}
		}
	}
	
	
	if(targetState === 1) {
		targetState = 0;
		return 0;
	}
	
	const div = document.createElement('div');
	div.className = `task-title-description task-title-description-${targetUniqueKeyCopy} task-title-${targetChildrenPosition}`;
	
	const textArea = document.createElement('textarea');
	textArea.id = 'task-title-description-textarea';
	textArea.setAttribute('rows', '10');
	textArea.setAttribute('placeholder', 'Add small description about the tasks(optional)');
	
	const buttonDiv = document.createElement('div');
	buttonDiv.className = 'task-title-description-button-div';
	
	const button = document.createElement('button');
	button.className = 'button task-title-description-button';
	button.appendChild(document.createTextNode('Add Tasks Description'));
	
	buttonDiv.appendChild(button);

	div.appendChild(textArea);
	div.appendChild(buttonDiv);
	rightSidebar.appendChild(div);
	
	button.addEventListener('click', addTaskTitleDescriptionContinuation);
}


function addTaskTitleDescriptionContinuation(e) {
	const superParent = e.target.parentElement.parentElement;
	const para = document.createElement('p');
	
	const textArea = superParent.querySelector('textarea')
	const textAreaContent = textArea.value;
	
	if(textAreaContent !== '') {
		para.appendChild(document.createTextNode(textAreaContent));
		superParent.insertBefore(para, textArea);
		superParent.removeChild(textArea);
		
		const editDiv = document.createElement('div');
		editDiv.className = 'edit-title-description-button-div';
		
		const editButton = document.createElement('button');
		editButton.className = 'button edit-title-description-button';
		editButton.appendChild(document.createTextNode('Edit'));
		
		editDiv.appendChild(editButton);
		
		superParent.removeChild(e.target.parentElement);
		superParent.appendChild(editDiv);
		
		editButton.addEventListener('click', editTitleDescription);
	} else {
		if(document.querySelector('.error-description')) {
			document.querySelector('.error-description').parentElement.removeChild(document.querySelector('.error-description'));
		}
		
		//creating and adding error prompt
		const errorPrompt = document.createElement('div');
		errorPrompt.className = 'error error-description';
		errorPrompt.innerHTML = '<p>Please enter valid description</p>';
		
		superParent.parentElement.insertBefore(errorPrompt, superParent);
			
		// Prompt will disapper after 3 seconds
		setTimeout(() => {
			errorPrompt.style.display = 'None';
			textArea.focus();
		}, 3000);
	}
}


function editTitleDescription(e) {
	const textArea = document.createElement('textarea');
	textArea.id = 'task-title-description-textarea';
	textArea.setAttribute('rows', '10');
	textArea.setAttribute('placeholder', 'Add small description about the tasks(optional)');
	
	const superParent = e.target.parentElement.parentElement;
	const curDescription = superParent.firstElementChild.innerHTML;
	
	const buttonDiv = document.createElement('div');
	buttonDiv.className = 'task-title-description-button-div';
	
	const button = document.createElement('button');
	button.className = 'button task-title-description-button';
	button.appendChild(document.createTextNode('Add Task Description'));
	
	buttonDiv.appendChild(button);
	
	superParent.removeChild(e.target.parentElement);
	superParent.removeChild(superParent.querySelector('p'));
	
	textArea.value = curDescription;
	
	superParent.appendChild(textArea);
	superParent.appendChild(buttonDiv);
	
	textArea.select();
	
	button.addEventListener('click', addTaskTitleDescriptionContinuation);
}

function addTaskDescription(e) {
	hideDescription();
	const rightSidebar = document.body.querySelector('.right-sidebar');
	
	try {
		const para = rightSidebar.querySelector('.heading');
		rightSidebar.removeChild(para);
	} catch(err) {
	}
	
	const target = e.target.parentElement.parentElement;
	const targetUniqueKeyCopy = target.classList[1].slice(15);
	
	const targetChildren = target.children;
	let targetChildrenPosition;
	
	for(let i=0; i<targetChildren.length; i++){
		if(target.children[i].querySelector('li') === e.target) {
			targetChildrenPosition = i;
		}
	}
	
	let textAreaTemp;
	let targetState = 0;
	
	if(rightSidebar.querySelectorAll(`.task-description`).length !== 0) {
		const temp = rightSidebar.querySelectorAll('.task-description');
		
		for(let i=0; i<temp.length; i++) {
			if(temp[i].querySelector('textarea')) {
				if(temp[i].querySelector('textarea').value === '') {
					temp[i].parentElement.removeChild(temp[i]);
				} else {
					if(temp[i].classList[1] + ' ' + temp[i].classList[2] === `task-description-${targetUniqueKeyCopy} task-${targetChildrenPosition}`) {
						temp[i].style.display = 'block';
						targetState = 1;
						textAreaTemp = temp[i].querySelector('textarea');
						textAreaTemp.focus();
						textAreaTemp.select();
						
					} else {
						temp[i].style.display = 'none';
					}
				}
			} else {
				if(temp[i].classList[1] + ' ' + temp[i].classList[2] === `task-description-${targetUniqueKeyCopy} task-${targetChildrenPosition}`) {
					temp[i].style.display = 'block';
					targetState = 1;
				} else {
					temp[i].style.display = 'none';
				}
			}
		}
	}
	
	if(targetState === 1) {
		targetState = 0;
		return 0;
	}
	
	const div = document.createElement('div');
	div.className = `task-description task-description-${targetUniqueKeyCopy} task-${targetChildrenPosition}`;
	
	const textArea = document.createElement('textarea');
	textArea.id = 'task-description-textarea';
	textArea.setAttribute('rows', '10');
	textArea.setAttribute('placeholder', 'Add small description about the task(optional)');
	
	const buttonDiv = document.createElement('div');
	buttonDiv.className = 'task-description-button-div';
	
	const button = document.createElement('button');
	button.className = 'button task-description-button';
	button.appendChild(document.createTextNode('Add Task Description'));
	
	buttonDiv.appendChild(button);

	div.appendChild(textArea);
	div.appendChild(buttonDiv);
	rightSidebar.appendChild(div);
	
	textArea.focus();
	
	button.addEventListener('click', addTasksDescriptionContinuation);
}

function addTasksDescriptionContinuation(e) {
	const superParent = e.target.parentElement.parentElement;
	const para = document.createElement('p');
	
	const textArea = superParent.querySelector('textarea')
	const textAreaContent = textArea.value;
	
	if(textAreaContent !== '') {
		para.appendChild(document.createTextNode(textAreaContent));
		superParent.insertBefore(para, textArea);
		superParent.removeChild(textArea);
		
		const editDiv = document.createElement('div');
		editDiv.className = 'edit-description-button-div';
		
		const editButton = document.createElement('button');
		editButton.className = 'button edit-description-button';
		editButton.appendChild(document.createTextNode('Edit'));
		
		editDiv.appendChild(editButton);
		
		superParent.removeChild(e.target.parentElement);
		superParent.appendChild(editDiv);
		
		editButton.addEventListener('click', editDescription);
	} else {
		if(document.querySelector('.error-description')) {
			document.querySelector('.error-description').parentElement.removeChild(document.querySelector('.error-description'));
		}
		
		//creating and adding error prompt
		const errorPrompt = document.createElement('div');
		errorPrompt.className = 'error error-description';
		errorPrompt.innerHTML = '<p>Please enter valid description</p>';
		
		superParent.parentElement.insertBefore(errorPrompt, superParent);
			
		// Prompt will disapper after 3 seconds
		setTimeout(() => {
			errorPrompt.style.display = 'None';
			textArea.focus();
		}, 3000);
	}
}


function editDescription(e) {
	const textArea = document.createElement('textarea');
	textArea.id = 'task-description-textarea';
	textArea.setAttribute('rows', '10');
	textArea.setAttribute('placeholder', 'Add small description about the task(optional)');
	
	const superParent = e.target.parentElement.parentElement;
	const curDescription = superParent.firstElementChild.innerHTML;
	
	const buttonDiv = document.createElement('div');
	buttonDiv.className = 'task-description-button-div';
	
	const button = document.createElement('button');
	button.className = 'button task-description-button';
	button.appendChild(document.createTextNode('Add Task Description'));
	
	buttonDiv.appendChild(button);
	
	superParent.removeChild(e.target.parentElement);
	superParent.removeChild(superParent.querySelector('p'));
	
	textArea.value = curDescription;
	
	superParent.appendChild(textArea);
	superParent.appendChild(buttonDiv);
	
	textArea.focus();
	textArea.select();
	
	button.addEventListener('click', addTasksDescriptionContinuation);
}

function hideDescription() {
	const rightSidebar = document.body.querySelector('.right-sidebar');
	
	if(rightSidebar.querySelector('.heading') === null) {
		const para = document.createElement('p');
		para.className = 'heading';
		para.appendChild(document.createTextNode('Click the task text to add description about the task'));
	
		rightSidebar.appendChild(para);
	}
	
	const temp = rightSidebar.querySelectorAll('.task-description');
	for(let i=0; i<temp.length; i++) {
		if((temp[i].style.display !== '') || (temp[i].style.display !== 'none')) {
			temp[i].style.display = 'none';
		}
	}
	
	
	const temp1 = rightSidebar.querySelectorAll('.task-title-description');
	
	for(let i=0; i<temp1.length; i++) {
		if((temp1[i].style.display !== '') || (temp1[i].style.display !== 'none')) {
			temp1[i].style.display = 'none';
		}
	}
}

function addHighlighter() {
	const target = document.body.querySelector(`.task-title-main-${targetUniqueKey}`);

	target.setAttribute('id', 'target');
}

function removeHighlighter() {
	
	const target = document.body.querySelector(`.task-title-main-${targetUniqueKey}`);
		
	target.removeAttribute('id');
}


//Function for adding title to output div
function addTaskTitle(e) {
	
	const div = document.createElement('div');
	div.className = `task-title task-title-main-${uniqueKey}`;
	
	const h3 = document.createElement('h3');
	h3.innerText = `Untitled-${forTaskTitleName}`;
	
	const headingDiv = document.createElement('div');
	headingDiv.className = `task-title-heading task-title-heading-main-${uniqueKey}`;
	
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
	
	const listOfTask = document.querySelector(`.main-${uniqueKey}`);
	listOfTask.insertBefore(div, listOfTask.firstElementChild);
	
	addHighlighter();
	
	addToLeftBar(e, forTaskTitleName);	
	forTaskTitleName = forTaskTitleName + 1;
	
	h3.addEventListener('click', expandTasks);
	h3.addEventListener('click', addTaskTitleDescription);
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
	input.select();
	
	//eventlistener for input element
	button.addEventListener('click', temp);
	
	function temp(e) {
		
		if(input.value !== '') {
			const headingElem = document.createElement('h3');
			headingElem.appendChild(document.createTextNode(input.value));
			
			sidebarHeading = document.body.querySelector(`.${sidebarClassName} h3`);
			
			sidebarHeading.innerHTML = input.value;
			
			headingDiv.appendChild(headingElem);
			headingDiv.removeChild(form);
			
			headingElem.addEventListener('click', addTaskTitleDescription);
			headingElem.addEventListener('click', expandTasks);
			
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
					headingElem.addEventListener('click', addTaskTitleDescription);
					headingElem.addEventListener('click', expandTasks);
				
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
						headingElem.addEventListener('click', addTaskTitleDescription);
						headingElem.addEventListener('click', expandTasks);
				
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
					headingElem.addEventListener('click', addTaskTitleDescription);
					headingElem.addEventListener('click', expandTasks);
				
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
	const rightSidebarTitleDesClassName = `task-title-description` + parentDiv.className.slice(10);
	const rightSidebarTasksDesClassName = `task-description` + parentDiv.className.slice(10);
	
	if(prompt('Are you sure?')) {
		
		target = document.body.querySelector(`.main-${targetUniqueKey}`);
		previous = document.body.querySelector(`.main-${previousTargetUniqueKey}`);
		
		document.body.querySelector(`.${sidebarClassName}`).parentElement.removeChild(document.body.querySelector(`.${sidebarClassName}`), document.body.querySelector(`.${sidebarClassName}`).parentElement);
		
		superParent.removeChild(parentDiv);
		
		try {
			document.body.querySelector(`.${rightSidebarTitleDesClassName}`).parentElement.removeChild(document.body.querySelector(`.${rightSidebarTitleDesClassName}`),document.body.querySelector(`.${rightSidebarTitleDesClassName}`).parentElement);
			
			const temp = document.body.querySelectorAll(`.${rightSidebarTasksDesClassName}`);
			
			for(let i=0; i<temp.length; i++) {
				temp[i].parentElement.removeChild(temp[i], temp[i].parentElement);
			}
		}catch(err) {
		}
		
		if((parentDiv === target) || (parentDiv === previous)) {
			if(previousTargetUniqueKey == targetUniqueKey) {
				addNewTodo();
			} else {
				if(parentDiv === target) {
					previousTaskTitle = document.body.querySelector(`.task-title-main-${previousTargetUniqueKey}`);
					
					previousTaskTitleImgDiv = previousTaskTitle.firstElementChild;
					
					previousTaskTitleImgDiv.removeEventListener('click', addOrRemove);
					
					previousTaskTitleClassName = previousTaskTitle.firstElementChild.className;
					
					if(previousTaskTitleClassName === 'main-right-arrow') {
						addNewTodo();
					} else {
						targetUniqueKey = previousTargetUniqueKey;
						
						addHighlighter();
					}
				} else {
					targetTaskTitle = document.body.querySelector(`.task-title-main-${targetUniqueKey}`);
					
					targetTaskTitleImgDiv = targetTaskTitle.firstElementChild;
					
					targetTaskTitleImgDiv.removeEventListener('click', addOrRemove);
					
					targetTaskTitleClassName = targetTaskTitle.firstElementChild.className;
					
					if(targetTaskTitleClassName === 'main-right-arrow') {
						addNewTodo();
					} else {
						previousTargetUniqueKey = targetUniqueKey;
					}
				}
			}
		}
		inputElem.focus();
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
	input.select();
	
	//eventlistener for input element
	button.addEventListener('click', temp);
	
	function temp(e) {
		
		if(input.value !== '') {
			const liElem = document.createElement('li');
			liElem.appendChild(document.createTextNode(input.value));
			
			parentDiv.insertBefore(liElem, parentDiv.querySelector('.edit-button'));
			parentDiv.removeChild(form);
			
			editButton.innerHTML = 'Edit';
			liElem.addEventListener('click', addTaskDescription);
			
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
					liElem.addEventListener('click', addTaskDescription);
				
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
						liElem.addEventListener('click', addTaskDescription);
				
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
					liElem.addEventListener('click', addTaskDescription);
				
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
	updateSidebar(e);
	
	//updating task description
	updateTaskDescription(e);
	
	e.target.parentElement.parentNode.removeChild(e.target.parentElement);
}


function updateTaskDescription(e) {
	const rightSidebar = document.querySelector('.right-sidebar');
	
	const temp = e.target.parentElement.parentElement.children;
	const nextElement = e.target.parentElement.nextElementSibling;
	let removedDivPosition;
	
	if(nextElement !== null) {
		for(let i=0; i<temp.length; i++) {
			if(temp[i] === nextElement) {
				removedDivPosition = i-1;
			}
		}
	} else {
		removedDivPosition = temp.length - 1;
	}
	
	let listOfDes = rightSidebar.querySelectorAll(`.task-description-${e.target.parentElement.parentElement.classList[1].slice(15)}`);
	
	let targetTaskDescription;
	let targetPosition;
	
	if(listOfDes.length !== 0) {
		for(let i=0; i<listOfDes.length; i++) {
			if(listOfDes[i].classList[2] === `task-${removedDivPosition}`) {
				targetTaskDescription = listOfDes[i];
				targetPosition = i;
				break;
			}
		}
	}
	
	if(listOfDes.length !== 0) {
		for(let i=targetPosition + 1; i<listOfDes.length; i++) {
			try {
				listOfDes[i].classList.remove(listOfDes[i].classList[2]);
				listOfDes[i].classList.add(`task-${i-1}`);
			}catch(err) {
			}
		}
		targetTaskDescription.parentElement.removeChild(targetTaskDescription);
	}
	
	hideDescription();
}


//function to strike the text when checkbox is clicked
function strikeTask(e) {
	const curListElem = e.target.parentElement.querySelector('li');
	
	if(e.target.checked) {
		updateSidebar(e);
		
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
	updateSidebar(e);
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
	completed.appendChild(document.createTextNode('0'));
	
	const notCompleted = document.createElement('div');
	notCompleted.className = 'sidebar-statistics-not-completed';
	notCompleted.appendChild(document.createTextNode('Not Completed: '));
	notCompleted.appendChild(document.createTextNode('0'));
	
	const total = document.createElement('div');
	total.className = 'sidebar-statistics-total';
	total.appendChild(document.createTextNode('Total Tasks: '));
	total.appendChild(document.createTextNode('0'));
	
	const removed = document.createElement('div');
	removed.className = 'sidebar-statistics-removed';
	removed.appendChild(document.createTextNode('Removed: '));
	removed.appendChild(document.createTextNode('0'));
	
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

function updateSidebar(e) {
	const target = e.target;
	
	let targetSidebarStatisticsDiv;
	
	if(target.className !== 'button') {
		targetSidebarStatisticsDiv = document.body.querySelector(`.sidebar-${target.parentElement.parentElement.classList[1].slice(15)}`).querySelectorAll('.sidebar-tasks-statistics div');
		
	} else {
		targetSidebarStatisticsDiv = document.body.querySelector(`.sidebar-${targetUniqueKey}`).querySelectorAll('.sidebar-tasks-statistics div');
	}
	
	let totalTasksDiv = targetSidebarStatisticsDiv[0];
	let completedDiv = targetSidebarStatisticsDiv[1];
	let notCompletedDiv = targetSidebarStatisticsDiv[2];
	let removedDiv = targetSidebarStatisticsDiv[3];
	
	let currentTotalTasks = parseInt(totalTasksDiv.innerHTML.slice(13));
	let currentCompleted = parseInt(completedDiv.innerHTML.slice(11));
	let currentNotCompleted = parseInt(notCompletedDiv.innerHTML.slice(15));
	let currentRemoved = parseInt(removedDiv.innerHTML.slice(9));
	
	if(target.className === 'button') {
		const totalTasks = currentTotalTasks + 1;
		const notCompleted = currentNotCompleted + 1;
		
		totalTasksDiv.innerHTML = '';
		notCompletedDiv.innerHTML = '';
		
		totalTasksDiv.appendChild(document.createTextNode('Total Tasks: '));
		totalTasksDiv.appendChild(document.createTextNode(totalTasks));
		
		notCompletedDiv.appendChild(document.createTextNode('Not Completed: '));
		
		notCompletedDiv.appendChild(document.createTextNode(notCompleted));
	} else if(target.className === 'done') {
		const notCompleted = currentNotCompleted - 1;
		const completed = currentCompleted + 1;
		
		notCompletedDiv.innerHTML = '';
		completedDiv.innerHTML = '';
		
		completedDiv.appendChild(document.createTextNode('Completed: '));
		completedDiv.appendChild(document.createTextNode(completed));
		
		notCompletedDiv.appendChild(document.createTextNode('Not Completed: '));
		
		notCompletedDiv.appendChild(document.createTextNode(notCompleted));
	} else if(target.className === 'checkmark') {
		const notCompleted = currentNotCompleted + 1;
		const completed = currentCompleted - 1;
		
		notCompletedDiv.innerHTML = '';
		completedDiv.innerHTML = '';
		
		completedDiv.appendChild(document.createTextNode('Completed: '));
		completedDiv.appendChild(document.createTextNode(completed));
		
		notCompletedDiv.appendChild(document.createTextNode('Not Completed: '));
		
		notCompletedDiv.appendChild(document.createTextNode(notCompleted));
	} 
	else if(target.className === 'remove-button') {
		const temp = target.parentElement.firstElementChild.className;
		
		const removed = currentRemoved + 1;
		const totalTasks = currentTotalTasks - 1;
		
		removedDiv.innerHTML = '';
		totalTasksDiv.innerHTML = '';
		
		removedDiv.appendChild(document.createTextNode('Removed: '));
		removedDiv.appendChild(document.createTextNode(removed));
		
		totalTasksDiv.appendChild(document.createTextNode('Total Tasks: '));
		totalTasksDiv.appendChild(document.createTextNode(totalTasks));
		
		if(temp === 'checkmark') {
			const completed = currentCompleted - 1;
			
			completedDiv.innerHTML = '';
			
			completedDiv.appendChild(document.createTextNode('Completed: '));
			completedDiv.appendChild(document.createTextNode(completed));
		} else {
			const notCompleted = currentNotCompleted - 1;
			
			notCompletedDiv.innerHTML = '';
			
			notCompletedDiv.appendChild(document.createTextNode('Not Completed: '));
		
			notCompletedDiv.appendChild(document.createTextNode(notCompleted));
		}
	}
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

let temp = 1;
function hideTasks(e) {
	const imgDiv = svgarrow('main-right-arrow', 'angle-circle-right.svg');
	inputElem.focus();
	
	if(e.target.parentElement.classList[0] !== 'task-title-heading') {
		const parentDiv = e.target.parentElement.parentElement;
		
		parentDiv.insertBefore(imgDiv, parentDiv.querySelector('.task-title-heading'));
	
		parentDiv.nextElementSibling.style.display = 'none';
		
		parentDiv.removeChild(e.target.parentElement);
		
		try {
		if(document.body.querySelector(`.task-title-main-${targetUniqueKey}`).firstElementChild.className === 'main-right-arrow') {
			if(targetUniqueKey == previousTargetUniqueKey) {
				addNewTodo();
			}
		}
		} catch(err) {
			
		}
		
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
	
	if(e.target.parentElement.classList[0] !== 'task-title-heading') {
		
		const parentDiv = e.target.parentElement.parentElement;
		
		parentDiv.insertBefore(imgDiv, parentDiv.querySelector('.task-title-heading'));
	
		parentDiv.nextElementSibling.style.display = 'block';
		
		parentDiv.removeChild(e.target.parentElement);
		
		imgDiv.addEventListener('click', hideTasks);
	} else {
		inputElem.focus();
		const parentDiv = e.target.parentElement.parentElement;
		
		if(temp = 1) {
			previousTargetUniqueKey = targetUniqueKey;
		}
		temp += 1;
		
		removeHighlighter();
		
		targetUniqueKey = e.target.parentElement.parentElement.nextElementSibling.classList[1].slice(15);
		
		addHighlighter();
		
		parentDiv.removeChild(e.target.parentElement.previousElementSibling);
		
		parentDiv.insertBefore(imgDiv, e.target.parentElement);
		
		parentDiv.nextElementSibling.style.display = 'block';
		
		imgDiv.addEventListener('click', hideTasks);
		imgDiv.addEventListener('click', addOrRemove);
	}
}

function addOrRemove(e) {
	try {
	if(document.body.querySelector(`.task-title-main-${targetUniqueKey}`).firstElementChild.className === 'main-right-arrow') {
		if(document.body.querySelector(`.task-title-main-${previousTargetUniqueKey}`).firstElementChild.className === 'main-right-arrow') {
			addNewTodo();
			temp = 1;
		} else {
			removeHighlighter();
			
			targetUniqueKey = previousTargetUniqueKey;
			previousTargetUniqueKey = targetUniqueKey;
			
			addHighlighter();
		}
	}} catch(err) {
		
	}
}