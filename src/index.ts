import { v4 as uuidv4 } from 'uuid'; 

type Task = { 
  id: string,
  title: string,
  completed: boolean,
  createdAt: Date
}

const list = document.querySelector<HTMLUListElement>('#list');
const form = document.querySelector<HTMLFormElement>('#newTask_form');
const input = document.querySelector<HTMLInputElement>('#newTask_title');

const tasks: Task[] = loadTasks();

tasks.forEach(addListItem);

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  if(input?.value === '' || input?.value === null) return;
  
  const newTask: Task = {
    id: uuidv4(),
    title: input?.value || 'no title',
    completed: false,
    createdAt: new Date()
  }
  tasks.push(newTask);
  saveTasks();
  if(input) input.value = '';
  addListItem(newTask);
})


function addListItem(task: Task): void{
  const item = document.createElement('li');;
  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;
    saveTasks();
  })
  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks(): Task[] {
  const taskJson = localStorage.getItem('tasks');
  return (taskJson) ? JSON.parse(taskJson) : [];
}