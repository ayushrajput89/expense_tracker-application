let expenses = [];
let totalIncome = 0;
let totalExpenses = 0;

const incomeInput = document.getElementById('income-input');
const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expensesTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');

const totalIncomeElement = document.getElementById('total-income');
const totalExpensesElement = document.getElementById('total-expenses');
const remainingBalanceElement = document.getElementById('remaining-balance');

// Function to update the balance
function updateBalance() {
    const remainingBalance = totalIncome - totalExpenses;
    totalIncomeElement.textContent = `$${totalIncome.toFixed(2)}`;
    totalExpensesElement.textContent = `$${totalExpenses.toFixed(2)}`;
    remainingBalanceElement.textContent = `$${remainingBalance.toFixed(2)}`;
}

// Add Transaction (Income or Expense)
addBtn.addEventListener('click', function() {
    const income = Number(incomeInput.value);
    if (!isNaN(income) && income > 0) {
        totalIncome += income;
        incomeInput.value = ''; // Clear the input
        updateBalance();
    }

    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (category === '' || isNaN(amount) || amount <= 0 || date === '') {
        alert('Please fill in all fields correctly');
        return;
    }

    expenses.push({ category, amount, date });
    totalExpenses += amount;
    totalAmountCell.textContent = `$${totalExpenses.toFixed(2)}`;

    const newRow = expensesTableBody.insertRow();

    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const deleteBtn = document.createElement('button');

    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function () {
        expenses.splice(expenses.indexOf(expense), 1);
        totalExpenses -= expense.amount;
        totalAmountCell.textContent = `$${totalExpenses.toFixed(2)}`;
        expensesTableBody.removeChild(newRow);
        updateBalance();
    });

    const expense = expenses[expenses.length - 1];
    categoryCell.textContent = expense.category;
    amountCell.textContent = `$${expense.amount}`;
    dateCell.textContent = expense.date;
    deleteCell.appendChild(deleteBtn);

    updateBalance();
});
