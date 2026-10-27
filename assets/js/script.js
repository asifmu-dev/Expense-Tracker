const form = document.getElementById('expense-form');
const list = document.getElementById('expense-list');
const totalEl = document.getElementById('total');
const emptyEl = document.getElementById('empty');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

const save = () => localStorage.setItem('expenses', JSON.stringify(expenses));

const render = () => {
  list.innerHTML = expenses.map(e => `
    <li>
      <div class="info">
        <strong>${e.title}</strong>
        <small>${e.category} • ${e.date}</small>
      </div>
      <span class="amount">Rs ${e.amount.toFixed(2)}</span>
      <button class="delete-btn" data-id="${e.id}">✕</button>
    </li>
  `).join('');

  totalEl.textContent = expenses.reduce((sum, e) => sum + e.amount, 0).toFixed(2);
  emptyEl.style.display = expenses.length ? 'none' : 'block';
};

form.addEventListener('submit', e => {
  e.preventDefault();

  expenses.unshift({
    id: Date.now(),
    title: form.title.value.trim(),
    amount: parseFloat(form.amount.value),
    category: form.category.value,
    date: form.date.value
  });

  save();
  render();
  form.reset();
});

list.addEventListener('click', e => {
  if (!e.target.matches('.delete-btn')) return;

  expenses = expenses.filter(exp => exp.id !== Number(e.target.dataset.id));
  save();
  render();
});

render();