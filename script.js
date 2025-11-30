// Expense data storage
let expenses = [];
let currentQuickCategory = '';

// Category configuration
const categories = {
    food: { name: 'Food', icon: '🍔' },
    transportation: { name: 'Transportation', icon: '🚗' },
    entertainment: { name: 'Entertainment', icon: '🎬' },
    shopping: { name: 'Shopping', icon: '🛍️' },
    bills: { name: 'Bills', icon: '💳' },
    healthcare: { name: 'Healthcare', icon: '🏥' },
    education: { name: 'Education', icon: '📚' },
    other: { name: 'Other', icon: '📦' }
};

// Load expenses from localStorage on page load
function loadExpenses() {
    const savedExpenses = localStorage.getItem('expenses');
    if (savedExpenses) {
        expenses = JSON.parse(savedExpenses);
        updateDisplay();
    }
}

// Save expenses to localStorage
function saveExpenses() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Add expense function
function addExpense(amount, category) {
    if (!amount || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }

    if (!category || !categories[category]) {
        alert('Please select a valid category');
        return;
    }

    const expense = {
        id: Date.now(),
        amount: parseFloat(amount),
        category: category,
        date: new Date().toLocaleString()
    };

    expenses.unshift(expense); // Add to beginning of array
    saveExpenses();
    updateDisplay();
    
    // Clear input
    document.getElementById('amountInput').value = '';
    document.getElementById('categorySelect').value = '';
}

// Calculate totals
function calculateTotals() {
    const totals = {};
    let grandTotal = 0;

    expenses.forEach(expense => {
        if (!totals[expense.category]) {
            totals[expense.category] = 0;
        }
        totals[expense.category] += expense.amount;
        grandTotal += expense.amount;
    });

    return { totals, grandTotal };
}

// Update all displays
function updateDisplay() {
    updateTotalDisplay();
    updateCategorySummary();
    updateExpenseList();
}

// Update total display
function updateTotalDisplay() {
    const { grandTotal } = calculateTotals();
    document.getElementById('totalAmount').textContent = `$${grandTotal.toFixed(2)}`;
}

// Update category summary
function updateCategorySummary() {
    const { totals } = calculateTotals();
    const summaryContainer = document.getElementById('categorySummary');
    
    if (Object.keys(totals).length === 0) {
        summaryContainer.innerHTML = '<p class="empty-message">No expenses yet</p>';
        return;
    }

    summaryContainer.innerHTML = Object.keys(totals)
        .sort((a, b) => totals[b] - totals[a]) // Sort by amount descending
        .map(category => {
            const categoryInfo = categories[category];
            return `
                <div class="category-item">
                    <span class="category-item-name">${categoryInfo.icon} ${categoryInfo.name}</span>
                    <span class="category-item-amount">$${totals[category].toFixed(2)}</span>
                </div>
            `;
        })
        .join('');
}

// Update expense list
function updateExpenseList() {
    const listContainer = document.getElementById('expenseList');
    
    if (expenses.length === 0) {
        listContainer.innerHTML = '<p class="empty-message">No expenses yet. Start tracking your spending!</p>';
        return;
    }

    listContainer.innerHTML = expenses
        .slice(0, 50) // Show last 50 expenses
        .map(expense => {
            const categoryInfo = categories[expense.category];
            return `
                <div class="expense-item">
                    <div class="expense-item-info">
                        <span class="expense-item-category">${categoryInfo.icon} ${categoryInfo.name}</span>
                        <span class="expense-item-date">${expense.date}</span>
                    </div>
                    <span class="expense-item-amount">$${expense.amount.toFixed(2)}</span>
                </div>
            `;
        })
        .join('');
}

// Show modal for quick add
function showQuickAddModal(category) {
    currentQuickCategory = category;
    const categoryInfo = categories[category];
    document.getElementById('modalCategoryName').textContent = `Add ${categoryInfo.icon} ${categoryInfo.name} Expense`;
    document.getElementById('quickAmountInput').value = '';
    document.getElementById('amountModal').style.display = 'block';
    document.getElementById('quickAmountInput').focus();
}

// Close modal
function closeModal() {
    document.getElementById('amountModal').style.display = 'none';
    currentQuickCategory = '';
}

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Use relative path to work in both root and subdirectory
        const swPath = './service-worker.js';
        navigator.serviceWorker.register(swPath)
            .then((registration) => {
                console.log('ServiceWorker registration successful:', registration.scope);
            })
            .catch((error) => {
                console.log('ServiceWorker registration failed:', error);
            });
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Load saved expenses
    loadExpenses();

    // Add expense button
    document.getElementById('addExpenseBtn').addEventListener('click', () => {
        const amount = document.getElementById('amountInput').value;
        const category = document.getElementById('categorySelect').value;
        addExpense(amount, category);
    });

    // Enter key on amount input
    document.getElementById('amountInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const amount = document.getElementById('amountInput').value;
            const category = document.getElementById('categorySelect').value;
            addExpense(amount, category);
        }
    });

    // Category buttons (quick add)
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');
            showQuickAddModal(category);
        });
    });

    // Modal close button
    document.querySelector('.close').addEventListener('click', closeModal);

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('amountModal');
        if (e.target === modal) {
            closeModal();
        }
    });

    // Confirm quick add
    document.getElementById('confirmQuickAdd').addEventListener('click', () => {
        const amount = document.getElementById('quickAmountInput').value;
        if (amount && currentQuickCategory) {
            addExpense(amount, currentQuickCategory);
            closeModal();
        }
    });

    // Enter key on quick amount input
    document.getElementById('quickAmountInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const amount = document.getElementById('quickAmountInput').value;
            if (amount && currentQuickCategory) {
                addExpense(amount, currentQuickCategory);
                closeModal();
            }
        }
    });
});

