// script.js
document.addEventListener('DOMContentLoaded', () => {
    randomizeBackground();
    // Update time
    function updateTime() {
      const timeDisplay = document.getElementById('time');
      const now = new Date();
      timeDisplay.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    setInterval(updateTime, 1000);
    updateTime();
  
    // Set greeting based on time of day
    function setGreeting() {
      const greeting = document.getElementById('greeting');
      const hour = new Date().getHours();
      const name = localStorage.getItem('name') || 'Friend';
  
      if (hour < 12) greeting.textContent = `Good morning, ${name}`;
      else if (hour < 18) greeting.textContent = `Good afternoon, ${name}`;
      else greeting.textContent = `Good evening, ${name}`;
    }
    setGreeting();
  
    // Handle focus input
    const focusInput = document.getElementById('focus-input');
    focusInput.value = localStorage.getItem('focus') || '';
    focusInput.addEventListener('change', (e) => {
      localStorage.setItem('focus', e.target.value);
    });
  
    // Fetch and display quote
    async function fetchQuote() {
      const quoteElement = document.getElementById('quote');
      try {
        const response = await fetch('https://zenquotes.io/api/today', {mode: 'no-cors'});
        const data = await response.json();
        console.log(data);
        
        quoteElement.textContent = `"${data[0].q}" - ${data[0].a}`;
      } catch (error) {
        quoteElement.textContent = "The only way to do great work is to love what you do. - Steve Jobs";
      }
    }
    fetchQuote();
  
    // Todo list functionality
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
  
    function updateTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
          const li = document.createElement('li');
          li.className = 'todo-item';
          
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.className = 'todo-checkbox';
          checkbox.checked = todo.completed;
          checkbox.onchange = () => {
            todos[index].completed = checkbox.checked;
            li.classList.toggle('completed', checkbox.checked);
            localStorage.setItem('todos', JSON.stringify(todos));
          };
          
          const todoText = document.createElement('span');
          todoText.textContent = todo;
          
          todoText.className = 'todo-text';
          
          const deleteBtn = document.createElement('button');
          deleteBtn.innerHTML = 'X';
          deleteBtn.className = 'delete-todo';
          deleteBtn.onclick = () => {
            todos.splice(index, 1);
            updateTodos();
          };
          
          li.appendChild(checkbox);
          li.appendChild(todoText);
          li.appendChild(deleteBtn);
          todoList.appendChild(li);
        });
      }
  
    todoInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && todoInput.value.trim()) {
        todos.push(todoInput.value.trim());
        todoInput.value = '';
        updateTodos();
      }
    });
  
    updateTodos();
  });

  function randomizeBackground() {
    const hue1 = Math.floor(Math.random() * 360);
    const hue2 = (hue1 + Math.floor(Math.random() * 60) - 30 + 360) % 360;
    const hue3 = (hue2 + Math.floor(Math.random() * 60) - 30 + 360) % 360;
    
    document.body.style.background = `
      linear-gradient(
        135deg,
        hsl(${hue1}, 40%, 15%) 0%,
        hsl(${hue2}, 35%, 20%) 50%,
        hsl(${hue3}, 30%, 25%) 100%
      )
    `;
  }
  
  // Call this function when the page loads
