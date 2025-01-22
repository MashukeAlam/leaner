// script.js
document.addEventListener('DOMContentLoaded', () => {
    randomizeBackground();
    displayImages();
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
  
      if (hour < 12) greeting.textContent = `good morning`;
      else if (hour < 18) greeting.textContent = `good afternoon`;
      else greeting.textContent = `good evening`;
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

  // Image data with captions
  const imageData = {
    'arm-strech-up.jpg': [
      'Stretch those arms up high!',
      'Reach for the sky',
      'Feel the energy flow through your arms',
      'Wake up your upper body'
    ],
    'drink-water.jpg': [
      'At least drink some water if there\'s no milk',
      'Hope your throat is not sahara desert',
      'Take a water break!',
      'Hydration is key to wellness'
    ],
    'fat-heart.png': [
      'How about cutting some sugar from your diet?',
      'A leaner cat would go further than this one',
      'YHM (your heart matters)'
    ],
    'forward-bend.jpeg': [
      'Humans should be able to do that too!',
      'Can your belly allow you to do that?',
      'Feel the hamstring stretch',
      'Don\'t just sit on chair all day...'
    ],
    'praise.jpg': [
      'Were you a good boy by doing some exercises today?',
      'You\'re doing great!',
      'Keep going strong',
      'This cat is proud of you!'
    ],
    'relax-sleep.jpg': [
      'Power nap, power up.',
      'Relaxed minds think sharper.',
      'Well-rested, unstoppable.',
      'Recharge yourself'
    ],
    'save-back.jpg': [
      'Protect your back',
      'Mind your posture',
      'Back health is important',
      'Stand up straight'
    ]
  };

  function getRandomCaption(captions) {
    const randomIndex = Math.floor(Math.random() * captions.length);
    return captions[randomIndex];
  }

  function displayImages() {
    const container = document.getElementById('image-container');
    container.innerHTML = ''; // Clear existing content
    
    // Get random image
    const imageNames = Object.keys(imageData);
    const randomImageName = imageNames[Math.floor(Math.random() * imageNames.length)];
    const captions = imageData[randomImageName];
    
    const wrapper = document.createElement('div');
    wrapper.className = 'image-wrapper';
    
    const img = document.createElement('img');
    img.src = `pics/${randomImageName}`;
    img.alt = randomImageName.split('.')[0].replace(/-/g, ' ');
    
    const caption = document.createElement('div');
    caption.className = 'image-caption';
    caption.textContent = getRandomCaption(captions);
    
    wrapper.appendChild(img);
    wrapper.appendChild(caption);
    container.appendChild(wrapper);
  }

  function randomizeBackground() {
    const hue1 = Math.floor(Math.random() * 360);
    const hue2 = (hue1 + Math.floor(Math.random() * 60) - 30 + 360) % 360;
    const hue3 = (hue2 + Math.floor(Math.random() * 60) - 30 + 360) % 360;
    
    document.body.style.background = `
      linear-gradient(
        135deg,
        hsl(${hue1}, 25%, 65%) 0%,
        hsl(${hue2}, 20%, 70%) 50%,
        hsl(${hue3}, 15%, 75%) 100%
      )
    `;
  }
