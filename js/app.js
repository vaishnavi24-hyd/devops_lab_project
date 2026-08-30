/* =========================================
   EXPENSE TRACKER - PHASE 2
========================================= */


/* =========================================
   TRANSACTION DATA
========================================= */

let transactions = [];

let currentType = "expense";


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

            /*
                Remove active class
                from both buttons
            */

            typeButtons.forEach(
                function(btn) {

                    btn.classList.remove(
                        "active"
                    );

                }
            );


            /*
                Make clicked button active
            */

            button.classList.add("active");


            /*
                Store selected type
            */

            currentType =
                button.textContent
                    .trim()
                    .toLowerCase();

        }
    );

});


/* =========================================
   ADD TRANSACTION
========================================= */

form.addEventListener(
    "submit",
    function(event) {

        /*
            Prevent page refresh
        */

        event.preventDefault();


        /*
            Get amount
        */

        const amount =
            Number(amountInput.value);


        /*
            Validate amount
        */

        if (amount <= 0) {

            alert(
                "Please enter a valid amount."
            );

            return;

        }


        /*
            Create transaction object
        */

        const transaction = {

            id: Date.now(),

            type: currentType,

            amount: amount,

            category:
                categoryInput.value,

            date:
                dateInput.value,

            description:
                descriptionInput.value.trim()

        };


        /*
            Add transaction
            to array
        */

        transactions.push(
            transaction
        );


        /*
            Update screen
        */

        renderTransactions();

        updateDashboard();


        /*
            Clear form
        */

        form.reset();


        /*
            Set date again
        */

        dateInput.value =
            new Date()
                .toISOString()
                .split("T")[0];


        /*
            Reset transaction
            type to Expense
        */

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
                ".type-btn"
            )
            .classList.add(
                "active"
            );

    }
);


/* =========================================
   DISPLAY TRANSACTIONS
========================================= */

function renderTransactions() {

    /*
        Clear current list
    */

    transactionList.innerHTML = "";


    /*
        If no transactions
    */

    if (transactions.length === 0) {

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


    /*
        Display each transaction
    */

    transactions.forEach(
        function(transaction) {


            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "transaction";


            /*
                Determine + or -
            */

            const sign =
                transaction.type ===
                "income"
                    ? "+"
                    : "-";


            /*
                Determine color
            */

            const amountClass =
                transaction.type ===
                "income"
                    ? "income"
                    : "expense";


            /*
                Create transaction HTML
            */

            item.innerHTML = `

                <div>

                    <div class="transaction-title">

                        ${transaction.description}

                    </div>


                    <div class="transaction-meta">

                        ${transaction.category}
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

                        ${sign}₹${transaction.amount
                            .toLocaleString("en-IN")}

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


            /*
                Add to page
            */

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

    /*
        Ask for confirmation
    */

    const confirmed =
        confirm(
            "Delete this transaction?"
        );


    if (!confirmed) {

        return;

    }


    /*
        Remove transaction
    */

    transactions =
        transactions.filter(
            function(transaction) {

                return transaction.id !== id;

            }
        );


    /*
        Update screen
    */

    renderTransactions();

    updateDashboard();

}


/* =========================================
   UPDATE DASHBOARD
========================================= */

function updateDashboard() {

    let totalIncome = 0;

    let totalExpense = 0;


    /*
        Calculate totals
    */

    transactions.forEach(
        function(transaction) {

            if (
                transaction.type ===
                "income"
            ) {

                totalIncome +=
                    transaction.amount;

            } else {

                totalExpense +=
                    transaction.amount;

            }

        }
    );


    /*
        Calculate balance
    */

    const balance =
        totalIncome -
        totalExpense;


    /*
        Display values
    */

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

}


/* =========================================
   CLEAR ALL TRANSACTIONS
========================================= */

clearAllButton.addEventListener(
    "click",
    function() {

        /*
            Don't do anything
            if list is empty
        */

        if (
            transactions.length === 0
        ) {

            return;

        }


        /*
            Confirmation
        */

        const confirmed =
            confirm(
                "Are you sure you want to delete all transactions?"
            );


        if (!confirmed) {

            return;

        }


        /*
            Empty array
        */

        transactions = [];


        /*
            Update screen
        */

        renderTransactions();

        updateDashboard();

    }
);


/* =========================================
   FORMAT CURRENCY
========================================= */

function formatCurrency(amount) {

    return (
        "₹" +
        amount.toLocaleString("en-IN")
    );

}