/* =========================================
   SMARTSPEND - EXPENSE TRACKER
   Main JavaScript
========================================= */


/* =========================================
   DATA
========================================= */

let transactions =
    JSON.parse(
        localStorage.getItem("smartSpendTransactions")
    ) || [];


let monthlyBudget =
    Number(
        localStorage.getItem("smartSpendBudget")
    ) || 20000;


let currentType = "expense";

let editingId = null;

let expenseChart = null;


/* =========================================
   DOM ELEMENTS
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

const budgetAmountElement =
    document.getElementById("budgetAmount");

const monthlyIncomeElement =
    document.getElementById("monthlyIncome");

const monthlyExpenseElement =
    document.getElementById("monthlyExpense");

const monthlySavingsElement =
    document.getElementById("monthlySavings");

const progressFill =
    document.getElementById("progressFill");

const budgetPercentage =
    document.getElementById("budgetPercentage");

const budgetRemaining =
    document.getElementById("budgetRemaining");

const budgetStatus =
    document.getElementById("budgetStatus");

const budgetAlert =
    document.getElementById("budgetAlert");

const budgetAlertText =
    document.getElementById("budgetAlertText");

const searchInput =
    document.getElementById("searchInput");

const typeFilter =
    document.getElementById("typeFilter");

const categoryFilter =
    document.getElementById("categoryFilter");

const clearAllButton =
    document.getElementById("clearAll");

const themeToggle =
    document.getElementById("themeToggle");

const exportCSVButton =
    document.getElementById("exportCSV");

const setBudgetButton =
    document.getElementById("setBudget");

const submitButton =
    document.getElementById("submitBtn");

const cancelEditButton =
    document.getElementById("cancelEdit");

const transactionCount =
    document.getElementById("transactionCount");

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toastMessage");

const toastIcon =
    document.getElementById("toastIcon");

const expenseChartCanvas =
    document.getElementById("expenseChart");

const chartCenter =
    document.getElementById("chartCenter");

const chartLegend =
    document.getElementById("chartLegend");

const mobileMenu =
    document.getElementById("mobileMenu");

const sidebar =
    document.getElementById("sidebar");

const currentDateElement =
    document.getElementById("currentDate");


/* =========================================
   CATEGORY ICONS
========================================= */

const categoryIcons = {

    Food: "🍔",

    Travel: "🚗",

    Shopping: "🛍️",

    Education: "📚",

    Bills: "💡",

    Entertainment: "🎬",

    Health: "❤️",

    Other: "📦"

};


/* =========================================
   INITIALIZATION
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        setTodayDate();

        showCurrentDate();

        loadTheme();

        renderTransactions();

        updateDashboard();

        updateChart();

    }
);


/* =========================================
   TODAY'S DATE
========================================= */

function setTodayDate() {

    dateInput.value =
        new Date()
            .toISOString()
            .split("T")[0];

}


/* =========================================
   DISPLAY CURRENT DATE
========================================= */

function showCurrentDate() {

    const today =
        new Date();

    const formatted =
        today.toLocaleDateString(
            "en-IN",
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );

    currentDateElement.textContent =
        formatted;

}


/* =========================================
   TYPE SWITCH
========================================= */

document
    .querySelectorAll(".type-btn")
    .forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    document
                        .querySelectorAll(".type-btn")
                        .forEach(
                            function (btn) {

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

        }
    );


/* =========================================
   ADD / UPDATE TRANSACTION
========================================= */

form.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const amount =
            Number(
                amountInput.value
            );


        const description =
            descriptionInput.value.trim();


        if (
            !amount ||
            amount <= 0
        ) {

            showToast(
                "Please enter a valid amount.",
                "!"
            );

            amountInput.focus();

            return;

        }


        if (
            description === ""
        ) {

            showToast(
                "Please enter a description.",
                "!"
            );

            descriptionInput.focus();

            return;

        }


        /* EDIT MODE */

        if (
            editingId !== null
        ) {

            const index =
                transactions.findIndex(
                    function (item) {

                        return item.id === editingId;

                    }
                );


            if (index !== -1) {

                transactions[index] = {

                    id: editingId,

                    type: currentType,

                    amount: amount,

                    category:
                        categoryInput.value,

                    date:
                        dateInput.value,

                    description:
                        description

                };

            }


            showToast(
                "Transaction updated successfully."
            );

        }

        /* ADD MODE */

        else {

            const transaction = {

                id:
                    Date.now(),

                type:
                    currentType,

                amount:
                    amount,

                category:
                    categoryInput.value,

                date:
                    dateInput.value,

                description:
                    description

            };


            transactions.unshift(
                transaction
            );


            showToast(
                "Transaction added successfully."
            );

        }


        saveTransactions();

        resetForm();

        renderTransactions();

        updateDashboard();

        updateChart();

    }
);


/* =========================================
   SAVE DATA
========================================= */

function saveTransactions() {

    localStorage.setItem(
        "smartSpendTransactions",
        JSON.stringify(
            transactions
        )
    );

}


/* =========================================
   RENDER TRANSACTIONS
========================================= */

function renderTransactions(
    list = getFilteredTransactions()
) {

    transactionList.innerHTML = "";


    transactionCount.textContent =
        `${list.length} transaction${list.length !== 1 ? "s" : ""} found`;


    if (
        list.length === 0
    ) {

        transactionList.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    💸
                </div>

                <h3>
                    No transactions found
                </h3>

                <p>
                    Try changing your search or filters.
                </p>

            </div>

        `;

        return;

    }


    list.forEach(
        function (transaction) {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "transaction";


            const isIncome =
                transaction.type ===
                "income";


            const sign =
                isIncome
                    ? "+"
                    : "-";


            const icon =
                categoryIcons[
                    transaction.category
                ] || "📦";


            const formattedDate =
                formatDate(
                    transaction.date
                );


            item.innerHTML = `

                <div class="transaction-left">

                    <div class="
                        transaction-icon
                        ${isIncome
                            ? "income-icon-bg"
                            : "expense-icon-bg"}
                    ">

                        ${isIncome
                            ? "↑"
                            : icon}

                    </div>


                    <div class="transaction-details">

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
                            ${formattedDate}

                        </div>

                    </div>

                </div>


                <div class="transaction-right">

                    <div class="
                        transaction-amount
                        ${isIncome
                            ? "income"
                            : "expense"}
                    ">

                        ${sign}${formatCurrency(
                            transaction.amount
                        )}

                    </div>


                    <div class="transaction-actions">

                        <button
                            class="edit-btn"
                            onclick="editTransaction(${transaction.id})">

                            Edit

                        </button>


                        <button
                            class="delete-btn"
                            onclick="deleteTransaction(${transaction.id})">

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
   FILTER
========================================= */

function getFilteredTransactions() {

    const search =
        searchInput.value
            .toLowerCase()
            .trim();


    const selectedType =
        typeFilter.value;


    const selectedCategory =
        categoryFilter.value;


    return transactions.filter(
        function (transaction) {

            const matchesSearch =

                transaction.description
                    .toLowerCase()
                    .includes(search)

                ||

                transaction.category
                    .toLowerCase()
                    .includes(search);


            const matchesType =

                selectedType === "all"

                ||

                transaction.type ===
                selectedType;


            const matchesCategory =

                selectedCategory === "all"

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

}


/* =========================================
   SEARCH
========================================= */

searchInput.addEventListener(
    "input",
    function () {

        renderTransactions();

    }
);


/* =========================================
   TYPE FILTER
========================================= */

typeFilter.addEventListener(
    "change",
    function () {

        renderTransactions();

    }
);


/* =========================================
   CATEGORY FILTER
========================================= */

categoryFilter.addEventListener(
    "change",
    function () {

        renderTransactions();

    }
);


/* =========================================
   EDIT TRANSACTION
========================================= */

function editTransaction(id) {

    const transaction =
        transactions.find(
            function (item) {

                return item.id === id;

            }
        );


    if (!transaction) {
        return;
    }


    editingId = id;


    currentType =
        transaction.type;


    amountInput.value =
        transaction.amount;


    categoryInput.value =
        transaction.category;


    dateInput.value =
        transaction.date;


    descriptionInput.value =
        transaction.description;


    document
        .querySelectorAll(".type-btn")
        .forEach(
            function (button) {

                button.classList.toggle(
                    "active",
                    button.dataset.type ===
                    transaction.type
                );

            }
        );


    submitButton.innerHTML =
        "<span>✓</span> Update Transaction";


    cancelEditButton.classList.remove(
        "hidden"
    );


    document
        .querySelector(".form-panel")
        .scrollIntoView({
            behavior: "smooth"
        });


    showToast(
        "Editing transaction..."
    );

}


/* =========================================
   CANCEL EDIT
========================================= */

cancelEditButton.addEventListener(
    "click",
    function () {

        resetForm();

        showToast(
            "Editing cancelled."
        );

    }
);


/* =========================================
   RESET FORM
========================================= */

function resetForm() {

    form.reset();

    setTodayDate();

    editingId = null;

    currentType = "expense";


    document
        .querySelectorAll(".type-btn")
        .forEach(
            function (button) {

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


    submitButton.innerHTML =
        "<span>+</span> Add Transaction";


    cancelEditButton.classList.add(
        "hidden"
    );

}


/* =========================================
   DELETE TRANSACTION
========================================= */

function deleteTransaction(id) {

    const transaction =
        transactions.find(
            function (item) {

                return item.id === id;

            }
        );


    if (!transaction) {
        return;
    }


    const confirmed =
        confirm(
            `Delete "${transaction.description}"?`
        );


    if (!confirmed) {
        return;
    }


    transactions =
        transactions.filter(
            function (item) {

                return item.id !== id;

            }
        );


    saveTransactions();

    renderTransactions();

    updateDashboard();

    updateChart();


    showToast(
        "Transaction deleted."
    );

}


/* =========================================
   CLEAR ALL
========================================= */

clearAllButton.addEventListener(
    "click",
    function () {

        if (
            transactions.length === 0
        ) {

            showToast(
                "There are no transactions to clear.",
                "!"
            );

            return;

        }


        const confirmed =
            confirm(
                "Are you sure you want to delete ALL transactions?"
            );


        if (!confirmed) {
            return;
        }


        transactions = [];


        saveTransactions();

        renderTransactions();

        updateDashboard();

        updateChart();


        showToast(
            "All transactions cleared."
        );

    }
);


/* =========================================
   UPDATE DASHBOARD
========================================= */

function updateDashboard() {

    let totalIncome = 0;

    let totalExpense = 0;


    transactions.forEach(
        function (transaction) {

            if (
                transaction.type ===
                "income"
            ) {

                totalIncome +=
                    Number(
                        transaction.amount
                    );

            }

            else {

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


    balanceElement.textContent =
        formatCurrency(balance);


    incomeElement.textContent =
        formatCurrency(totalIncome);


    expenseElement.textContent =
        formatCurrency(totalExpense);


    budgetAmountElement.textContent =
        formatCurrency(monthlyBudget);


    updateMonthlyOverview();

    updateBudget(totalExpense);

}


/* =========================================
   MONTHLY OVERVIEW
========================================= */

function updateMonthlyOverview() {

    const now =
        new Date();


    const currentMonth =
        now.getMonth();


    const currentYear =
        now.getFullYear();


    let monthlyIncome = 0;

    let monthlyExpense = 0;


    transactions.forEach(
        function (transaction) {

            const date =
                new Date(
                    transaction.date
                );


            if (
                date.getMonth() ===
                currentMonth

                &&

                date.getFullYear() ===
                currentYear
            ) {

                if (
                    transaction.type ===
                    "income"
                ) {

                    monthlyIncome +=
                        Number(
                            transaction.amount
                        );

                }

                else {

                    monthlyExpense +=
                        Number(
                            transaction.amount
                        );

                }

            }

        }
    );


    const savings =
        monthlyIncome -
        monthlyExpense;


    monthlyIncomeElement.textContent =
        formatCurrency(
            monthlyIncome
        );


    monthlyExpenseElement.textContent =
        formatCurrency(
            monthlyExpense
        );


    monthlySavingsElement.textContent =
        formatCurrency(
            savings
        );

}


/* =========================================
   BUDGET
========================================= */

function updateBudget(totalExpense) {

    const percentage =
        monthlyBudget > 0

            ? (
                totalExpense /
                monthlyBudget
            ) * 100

            : 0;


    const safePercentage =
        Math.min(
            percentage,
            100
        );


    progressFill.style.width =
        safePercentage + "%";


    budgetPercentage.textContent =
        Math.round(
            percentage
        ) + "%";


    const remaining =
        monthlyBudget -
        totalExpense;


    if (
        remaining >= 0
    ) {

        budgetRemaining.textContent =
            `${formatCurrency(remaining)} remaining`;

    }

    else {

        budgetRemaining.textContent =
            `${formatCurrency(Math.abs(remaining))} over budget`;

    }


    if (
        percentage >= 100
    ) {

        budgetStatus.textContent =
            "⚠ Budget exceeded";


        budgetStatus.style.color =
            "var(--danger)";


        budgetAlert.classList.remove(
            "hidden"
        );


        budgetAlertText.textContent =
            `You have exceeded your monthly budget by ${formatCurrency(Math.abs(remaining))}.`;

    }

    else if (
        percentage >= 80
    ) {

        budgetStatus.textContent =
            "⚠ Approaching limit";


        budgetStatus.style.color =
            "var(--warning)";


        budgetAlert.classList.remove(
            "hidden"
        );


        budgetAlertText.textContent =
            `You have used ${Math.round(percentage)}% of your monthly budget.`;

    }

    else {

        budgetStatus.textContent =
            "You're doing great!";


        budgetStatus.style.color =
            "var(--success)";


        budgetAlert.classList.add(
            "hidden"
        );

    }

}


/* =========================================
   SET BUDGET
========================================= */

setBudgetButton.addEventListener(
    "click",
    function () {

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
            Number(
                newBudget
            );


        if (
            !budget ||
            budget <= 0
        ) {

            showToast(
                "Please enter a valid budget.",
                "!"
            );

            return;

        }


        monthlyBudget =
            budget;


        localStorage.setItem(
            "smartSpendBudget",
            monthlyBudget
        );


        updateDashboard();


        showToast(
            "Monthly budget updated."
        );

    }
);


/* =========================================
   CHART
========================================= */

function updateChart() {

    const categories = {};

    let totalExpense = 0;


    transactions.forEach(
        function (transaction) {

            if (
                transaction.type !==
                "expense"
            ) {

                return;

            }


            const category =
                transaction.category;


            categories[category] =
                (
                    categories[category] ||
                    0
                )

                +

                Number(
                    transaction.amount
                );


            totalExpense +=
                Number(
                    transaction.amount
                );

        }
    );


    const labels =
        Object.keys(
            categories
        );


    const values =
        Object.values(
            categories
        );


    chartCenter.innerHTML = `

        <strong>
            ${formatCurrency(totalExpense)}
        </strong>

        <span>
            Total spent
        </span>

    `;


    if (
        expenseChart
    ) {

        expenseChart.destroy();

    }


    if (
        labels.length === 0
    ) {

        chartLegend.innerHTML = `

            <div class="legend-item">
                No expense data yet
            </div>

        `;

        return;

    }


    const chartColors = [

        "#6366f1",
        "#10b981",
        "#f59e0b",
        "#ef4444",
        "#06b6d4",
        "#8b5cf6",
        "#ec4899",
        "#64748b"

    ];


    expenseChart =
        new Chart(
            expenseChartCanvas,
            {

                type: "doughnut",

                data: {

                    labels: labels,

                    datasets: [

                        {

                            data: values,

                            backgroundColor:
                                chartColors.slice(
                                    0,
                                    labels.length
                                ),

                            borderWidth: 0,

                            hoverOffset: 6

                        }

                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    cutout: "73%",

                    plugins: {

                        legend: {
                            display: false
                        },

                        tooltip: {

                            callbacks: {

                                label:
                                    function (context) {

                                        return ` ₹${Number(context.raw).toLocaleString("en-IN")}`;

                                    }

                            }

                        }

                    }

                }

            }
        );


    chartLegend.innerHTML = "";


    labels.forEach(
        function (label, index) {

            const legend =
                document.createElement(
                    "div"
                );


            legend.className =
                "legend-item";


            legend.innerHTML = `

                <span
                    class="legend-dot"
                    style="
                        background:
                        ${chartColors[index]};
                    ">
                </span>

                ${escapeHTML(label)}

            `;


            chartLegend.appendChild(
                legend
            );

        }
    );

}


/* =========================================
   EXPORT CSV
========================================= */

exportCSVButton.addEventListener(
    "click",
    function () {

        if (
            transactions.length === 0
        ) {

            showToast(
                "No transactions available to export.",
                "!"
            );

            return;

        }


        let csv =
            "ID,Type,Amount,Category,Date,Description\n";


        transactions.forEach(
            function (transaction) {

                csv += [

                    transaction.id,

                    transaction.type,

                    transaction.amount,

                    `"${transaction.category}"`,

                    transaction.date,

                    `"${transaction.description.replace(
                        /"/g,
                        '""'
                    )}"`

                ].join(",") + "\n";

            }
        );


        const blob =
            new Blob(
                [csv],
                {
                    type:
                        "text/csv;charset=utf-8;"
                }
            );


        const url =
            URL.createObjectURL(
                blob
            );


        const link =
            document.createElement(
                "a"
            );


        link.href = url;

        link.download =
            "smartspend-transactions.csv";


        link.click();


        URL.revokeObjectURL(
            url
        );


        showToast(
            "Transactions exported successfully."
        );

    }
);


/* =========================================
   DARK MODE
========================================= */

themeToggle.addEventListener(
    "click",
    function () {

        document.body.classList.toggle(
            "dark"
        );


        const darkMode =
            document.body.classList.contains(
                "dark"
            );


        localStorage.setItem(
            "smartSpendTheme",
            darkMode
                ? "dark"
                : "light"
        );


        themeToggle.textContent =
            darkMode
                ? "☀"
                : "☾";


        updateChart();

    }
);


/* =========================================
   LOAD THEME
========================================= */

function loadTheme() {

    const savedTheme =
        localStorage.getItem(
            "smartSpendTheme"
        );


    if (
        savedTheme === "dark"
    ) {

        document.body.classList.add(
            "dark"
        );

        themeToggle.textContent =
            "☀";

    }

}


/* =========================================
   MOBILE SIDEBAR
========================================= */

mobileMenu.addEventListener(
    "click",
    function () {

        sidebar.classList.toggle(
            "open"
        );

    }
);


/* =========================================
   CLOSE SIDEBAR AFTER CLICK
========================================= */

document
    .querySelectorAll(".nav-item")
    .forEach(
        function (item) {

            item.addEventListener(
                "click",
                function () {

                    sidebar.classList.remove(
                        "open"
                    );

                }
            );

        }
    );


/* =========================================
   NAV ACTIVE STATE
========================================= */

document
    .querySelectorAll(".nav-item")
    .forEach(
        function (item) {

            item.addEventListener(
                "click",
                function () {

                    document
                        .querySelectorAll(".nav-item")
                        .forEach(
                            function (nav) {

                                nav.classList.remove(
                                    "active"
                                );

                            }
                        );


                    item.classList.add(
                        "active"
                    );

                }
            );

        }
    );


/* =========================================
   FORMAT CURRENCY
========================================= */

function formatCurrency(amount) {

    return new Intl.NumberFormat(
        "en-IN",
        {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }
    ).format(amount);

}


/* =========================================
   FORMAT DATE
========================================= */

function formatDate(dateString) {

    const date =
        new Date(
            dateString + "T00:00:00"
        );


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


/* =========================================
   ESCAPE HTML
========================================= */

function escapeHTML(value) {

    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================
   TOAST NOTIFICATION
========================================= */

let toastTimer;


function showToast(
    message,
    icon = "✓"
) {

    toastMessage.textContent =
        message;

    toastIcon.textContent =
        icon;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            function () {

                toast.classList.remove(
                    "show"
                );

            },
            2800
        );

}
