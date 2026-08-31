/* =========================================
   EXPENSE TRACKER - PHASE 2
========================================= */


/* =========================================
   TRANSACTION DATA
========================================= */

let transactions =
    JSON.parse(
        localStorage.getItem("transactions")
    ) || [];

let currentType = "expense";

let monthlyBudget =
    Number(
        localStorage.getItem("monthlyBudget")
    ) || 20000;


/* =========================================
   GET HTML ELEMENTS
========================================= */

const form =
    document.getElementById("transactionForm");

const amountInput =
    document.getElementById("amount");

const categoryInput =
    document.getElementById("category");

const dateInput =
    document.getElementById("date");

const descriptionInput =
    document.getElementById("description");

const transactionList =
    document.getElementById("transactionList");

const balanceElement =
    document.getElementById("balance");

const incomeElement =
    document.getElementById("income");

const expenseElement =
    document.getElementById("expense");

const clearAllButton =
    document.getElementById("clearAll");

const themeToggle =
    document.getElementById("themeToggle");

const budgetAlert =
    document.getElementById("budgetAlert");

const monthlyIncomeElement =
    document.getElementById("monthlyIncome");

const monthlyExpenseElement =
    document.getElementById("monthlyExpense");

const monthlySavingsElement =
    document.getElementById("monthlySavings");


/* =========================================
   SET TODAY'S DATE
========================================= */

dateInput.value =
    new Date()
        .toISOString()
        .split("T")[0];


/* =========================================
   EXPENSE / INCOME BUTTONS
========================================= */

const typeButtons =
    document.querySelectorAll(".type-btn");


typeButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            typeButtons.forEach(
                function(btn) {

                    btn.classList.remove(
                        "active"
                    );

                }
            );

            button.classList.add(
                "active"
            );

            currentType =
                button.dataset.type;

        }
    );

});


/* =========================================
   ADD TRANSACTION
========================================= */

form.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const amount =
            Number(amountInput.value);


        if (amount <= 0) {

            alert(
                "Please enter a valid amount."
            );

            return;

        }


        const description =
            descriptionInput.value.trim();


        if (description === "") {

            alert(
                "Please enter a description."
            );

            return;

        }


        const transaction = {

            id: Date.now(),

            type: currentType,

            amount: amount,

            category:
                categoryInput.value,

            date:
                dateInput.value,

            description:
                description

        };


        transactions.push(
            transaction
        );


        saveTransactions();

        renderTransactions();

        updateDashboard();


        form.reset();


        dateInput.value =
            new Date()
                .toISOString()
                .split("T")[0];


        currentType =
            "expense";


        typeButtons.forEach(
            function(button) {

                button.classList.remove(
                    "active"
                );

            }
        );


        document
            .querySelector(
                '.type-btn[data-type="expense"]'
            )
            .classList.add(
                "active"
            );

    }
);


/* =========================================
   SAVE TRANSACTIONS
========================================= */

function saveTransactions() {

    localStorage.setItem(
        "transactions",
        JSON.stringify(
            transactions
        )
    );

}


/* =========================================
   DISPLAY TRANSACTIONS
========================================= */

function renderTransactions(
    list = transactions
) {

    transactionList.innerHTML = "";


    if (list.length === 0) {

        transactionList.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    💸
                </div>

                <h3>
                    No transactions yet
                </h3>

                <p>
                    Add your first transaction
                    to get started.
                </p>

            </div>

        `;

        return;

    }


    list.forEach(
        function(transaction) {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "transaction";


            const sign =
                transaction.type ===
                "income"
                    ? "+"
                    : "-";


            const amountClass =
                transaction.type ===
                "income"
                    ? "income"
                    : "expense";


            item.innerHTML = `

                <div>

                    <div class="transaction-title">

                        ${escapeHTML(
                            transaction.description
                        )}

                    </div>


                    <div class="transaction-meta">

                        ${escapeHTML(
                            transaction.category
                        )}

                        •

                        ${transaction.date}

                    </div>

                </div>


                <div class="transaction-right">

                    <div
                        class="
                            transaction-amount
                            ${amountClass}
                        "
                    >

                        ${sign}${formatCurrency(
                            transaction.amount
                        )}

                    </div>


                    <div class="transaction-actions">

                        <button
                            class="delete-btn"
                            onclick="
                                deleteTransaction(
                                    ${transaction.id}
                                )
                            "
                        >

                            Delete

                        </button>

                    </div>

                </div>

            `;


            transactionList.appendChild(
                item
            );

        }
    );

}


/* =========================================
   DELETE TRANSACTION
========================================= */

function deleteTransaction(id) {

    const confirmed =
        confirm(
            "Delete this transaction?"
        );


    if (!confirmed) {

        return;

    }


    transactions =
        transactions.filter(
            function(transaction) {

                return transaction.id !== id;

            }
        );


    saveTransactions();

    renderTransactions();

    updateDashboard();

}


/* =========================================
   UPDATE DASHBOARD
========================================= */

function updateDashboard() {

    let totalIncome = 0;

    let totalExpense = 0;


    transactions.forEach(
        function(transaction) {

            if (
                transaction.type ===
                "income"
            ) {

                totalIncome +=
                    Number(
                        transaction.amount
                    );

            } else {

                totalExpense +=
                    Number(
                        transaction.amount
                    );

            }

        }
    );


    const balance =
        totalIncome -
        totalExpense;


    incomeElement.textContent =
        formatCurrency(
            totalIncome
        );


    expenseElement.textContent =
        formatCurrency(
            totalExpense
        );


    balanceElement.textContent =
        formatCurrency(
            balance
        );


    updateMonthlyOverview(
        totalIncome,
        totalExpense
    );


    updateBudget(
        totalExpense
    );

}


/* =========================================
   MONTHLY OVERVIEW
========================================= */

function updateMonthlyOverview(
    totalIncome,
    totalExpense
) {

    if (monthlyIncomeElement) {

        monthlyIncomeElement.textContent =
            formatCurrency(
                totalIncome
            );

    }


    if (monthlyExpenseElement) {

        monthlyExpenseElement.textContent =
            formatCurrency(
                totalExpense
            );

    }


    const savings =
        totalIncome -
        totalExpense;


    if (monthlySavingsElement) {

        monthlySavingsElement.textContent =
            formatCurrency(
                savings
            );

    }

}


/* =========================================
   BUDGET
========================================= */

function updateBudget(
    totalExpense
) {

    const percentage =
        monthlyBudget > 0
            ? (
                totalExpense /
                monthlyBudget
            ) * 100
            : 0;


    const progressLabel =
        document.querySelector(
            ".progress-label span:last-child"
        );


    if (progressLabel) {

        progressLabel.textContent =
            Math.round(
                percentage
            ) + "%";

    }


    const progressFill =
        document.querySelector(
            ".progress-fill"
        );


    if (progressFill) {

        progressFill.style.width =
            Math.min(
                percentage,
                100
            ) + "%";

    }


    if (!budgetAlert) {

        return;

    }


    if (
        totalExpense >
        monthlyBudget
    ) {

        budgetAlert.classList.remove(
            "hidden"
        );

        budgetAlert.textContent =
            "⚠️ You have exceeded your monthly budget!";

    } else {

        budgetAlert.classList.add(
            "hidden"
        );

    }

}


/* =========================================
   SET MONTHLY BUDGET
========================================= */

const budgetButton =
    document.querySelector(
        ".secondary-btn"
    );


if (budgetButton) {

    budgetButton.addEventListener(
        "click",
        function() {

            const newBudget =
                prompt(
                    "Enter your monthly budget:",
                    monthlyBudget
                );


            if (
                newBudget === null
            ) {

                return;

            }


            const budget =
                Number(newBudget);


            if (
                isNaN(budget) ||
                budget <= 0
            ) {

                alert(
                    "Please enter a valid budget."
                );

                return;

            }


            monthlyBudget =
                budget;


            localStorage.setItem(
                "monthlyBudget",
                monthlyBudget
            );


            updateDashboard();

        }
    );

}


/* =========================================
   CLEAR ALL TRANSACTIONS
========================================= */

clearAllButton.addEventListener(
    "click",
    function() {

        if (
            transactions.length === 0
        ) {

            alert(
                "There are no transactions to clear."
            );

            return;

        }


        const confirmed =
            confirm(
                "Are you sure you want to delete all transactions?"
            );


        if (!confirmed) {

            return;

        }


        transactions = [];


        saveTransactions();

        renderTransactions();

        updateDashboard();

    }
);


/* =========================================
   SEARCH
========================================= */

const searchInput =
    document.querySelector(
        ".search-box input"
    );


if (searchInput) {

    searchInput.addEventListener(
        "input",
        applyFilters
    );

}


/* =========================================
   FILTERS
========================================= */

const filterSelects =
    document.querySelectorAll(
        ".filters select"
    );


const typeFilter =
    filterSelects[0];

const categoryFilter =
    filterSelects[1];


if (typeFilter) {

    typeFilter.addEventListener(
        "change",
        applyFilters
    );

}


if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        applyFilters
    );

}


/* =========================================
   SEARCH + FILTER
========================================= */

function applyFilters() {

    const searchText =
        searchInput
            ? searchInput.value
                .toLowerCase()
                .trim()
            : "";


    const selectedType =
        typeFilter
            ? typeFilter.value
            : "All Types";


    const selectedCategory =
        categoryFilter
            ? categoryFilter.value
            : "All Categories";


    const filteredTransactions =
        transactions.filter(
            function(transaction) {


                const matchesSearch =

                    transaction.description
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    transaction.category
                        .toLowerCase()
                        .includes(searchText);


                const matchesType =

                    selectedType ===
                    "All Types"

                    ||

                    (
                        selectedType ===
                        "Income"

                        &&
                        transaction.type ===
                        "income"
                    )

                    ||

                    (
                        selectedType ===
                        "Expenses"

                        &&
                        transaction.type ===
                        "expense"
                    );


                const matchesCategory =

                    selectedCategory ===
                    "All Categories"

                    ||

                    transaction.category ===
                    selectedCategory;


                return (
                    matchesSearch &&
                    matchesType &&
                    matchesCategory
                );

            }
        );


    renderTransactions(
        filteredTransactions
    );

}


/* =========================================
   DARK MODE
========================================= */

if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        function() {

            document.body.classList.toggle(
                "dark-mode"
            );


            const darkMode =
                document.body.classList.contains(
                    "dark-mode"
                );


            localStorage.setItem(
                "darkMode",
                darkMode
            );


            themeToggle.textContent =
                darkMode
                    ? "☀️"
                    : "🌙";

        }
    );

}


/* =========================================
   LOAD DARK MODE
========================================= */

const savedDarkMode =
    localStorage.getItem(
        "darkMode"
    );


if (
    savedDarkMode === "true"
) {

    document.body.classList.add(
        "dark-mode"
    );


    if (themeToggle) {

        themeToggle.textContent =
            "☀️";

    }

}


/* =========================================
   CATEGORY ICON
========================================= */

function getCategoryIcon(
    category
) {

    const icons = {

        Food: "🍔",

        Travel: "🚗",

        Shopping: "🛍️",

        Education: "📚",

        Bills: "💡",

        Entertainment: "🎬",

        Health: "❤️",

        Other: "📦"

    };


    return (
        icons[category] ||
        "📦"
    );

}


/* =========================================
   FORMAT CURRENCY
========================================= */

function formatCurrency(
    amount
) {

    return (
        "₹" +
        Number(amount)
            .toLocaleString(
                "en-IN"
            )
    );

}


/* =========================================
   ESCAPE HTML
========================================= */

function escapeHTML(
    text
) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        text;


    return div.innerHTML;

}


/* =========================================
   INITIAL LOAD
========================================= */

renderTransactions();

updateDashboard();
