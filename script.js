// Select elements
const salaryForm = document.getElementById("salary-form");
const expenseForm = document.getElementById("expense-form");
const monthlySalaryInput = document.getElementById("monthly-salary");
const expenseReasonInput = document.getElementById("expense-reason");
const expenseAmountInput = document.getElementById("expense-amount");
const expenseList = document.getElementById("expense-list");
const totalExpensesDisplay = document.getElementById("total-expenses");
const moneyLeftDisplay = document.getElementById("money-left");

// Data
let monthlySalary = 0;
let expenses = [];

// Function to update the total expenses and money left
function updateSummary() {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const moneyLeft = monthlySalary - totalExpenses;

  totalExpensesDisplay.textContent = totalExpenses.toFixed(2);
  moneyLeftDisplay.textContent = moneyLeft.toFixed(2);
}

// Function to render the expense list
function renderExpenses() {
  expenseList.innerHTML = "";
  expenses.forEach((expense, index) => {
    const expenseItem = document.createElement("div");
    expenseItem.className = "expense-item";
    expenseItem.innerHTML = `
      <span>${expense.reason}: Rs. ${expense.amount.toFixed(2)}</span>
      <button onclick="deleteExpense(${index})">Delete</button>
    `;
    expenseList.appendChild(expenseItem);
  });
}

// Function to delete an expense
function deleteExpense(index) {
  expenses.splice(index, 1);
  renderExpenses();
  updateSummary();
}

// Handle salary form submission
salaryForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const salary = parseFloat(monthlySalaryInput.value);
  if (!isNaN(salary) && salary > 0) {
    monthlySalary = salary;
    updateSummary();
    alert(`Monthly salary set to Rs. ${salary.toFixed(2)}`);
    monthlySalaryInput.value = "";
  } else {
    alert("Please enter a valid salary amount.");
  }
});

// Handle expense form submission
expenseForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const reason = expenseReasonInput.value.trim();
  const amount = parseFloat(expenseAmountInput.value);

  if (reason && !isNaN(amount) && amount > 0) {
    expenses.push({ reason, amount });
    renderExpenses();
    updateSummary();
    expenseReasonInput.value = "";
    expenseAmountInput.value = "";
  } else {
    alert("Please enter valid expense details.");
  }
});
