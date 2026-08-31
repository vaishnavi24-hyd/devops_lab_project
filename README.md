 Expense Tracker

A simple and user-friendly Expense Tracker Web Application developed using HTML, CSS, and JavaScript. This application helps users manage their income and expenses and provides a clear overview of their financial activity.

Features

*  Add income and expense transactions
*  Edit transactions
*  Delete transactions
*  Clear all transactions
*  Calculate total balance
*  Track total income
*  Track total expenses
*  Set and monitor monthly budget
*  Budget exceeded alert
*  Expense breakdown by category
*  Search transactions
*  Filter transactions by type and category
*  Store transactions using Local Storage
*  Dark/Light mode
*  Export transactions as CSV
*  Responsive design for different screen sizes

 Technologies Used

* HTML5 – Structure of the application
* CSS3 – Styling and responsive design
* JavaScript – Application logic and functionality
* Chart.js – Expense visualization
* Local Storage – Storing transaction data
* Git & GitHub – Version control and source code management

 Project Structure

```text
devops_lab_project/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   └── app.js
│
└── README.md
```

 How to Run the Project

Using a Web Browser

1. Clone or download the repository.
2. Open the project folder.
3. Open `index.html` in any modern web browser.
4. Start adding your income and expenses.

 Using VS Code

1. Open the project folder in Visual Studio Code.
2. Install the Live Server extension.
3. Right-click on `index.html`.
4. Select Open with Live Server.
5. The Expense Tracker will open in your browser.

 How to Use

1. Select Expense or Income.
2. Enter the transaction amount.
3. Select a category.
4. Select the date.
5. Enter a description.
6. Click Add Transaction.
7. View the transaction in the transaction history.
8. Use Search or Filters to find specific transactions.
9. Use the dashboard to view your financial summary.
10. Set a monthly budget to monitor your spending.

 Dashboard

The dashboard displays:

* Total Balance – Difference between income and expenses.
* Total Income – Total amount of money received.
* Total Expenses – Total amount spent.
* Monthly Budget – The spending limit set by the user.
* Budget Usage – Percentage of the monthly budget used.

 Data Storage

The application uses Browser Local Storage to save transaction information.

This means:

* Data remains available after refreshing the page.
* No external database is required.
* Transaction data is stored locally in the browser.

 Search and Filter

Users can easily manage transactions using:

* Search by transaction description.
* Filter by Income or Expense.
* Filter by expense category.

 Expense Analysis

The application provides a visual representation of expenses based on categories using Chart.js.

This helps users understand where most of their money is being spent.

 Budget Management

Users can set a monthly budget and monitor their spending.

The application provides:

* Budget amount
* Current spending
* Budget usage percentage
* Progress bar
* Budget exceeded warning

 DevOps Integration

This project can be integrated with common DevOps tools and practices.

 DevOps Workflow

```text
Developer
    ↓
Git
    ↓
GitHub
    ↓
Jenkins
    ↓
Build & Test
    ↓
Docker
    ↓
Deployment
```

 DevOps Tools

| Tool           | Purpose                             |
| -------------- | ----------------------------------- |
| Git            | Version Control                     |
| GitHub         | Source Code Management              |
| Jenkins        | Continuous Integration / Deployment |
| Docker         | Containerization                    |
| GitHub Webhook | Automatic Build Trigger             |

 Future Enhancements

* User login and registration
* Cloud database integration
* Firebase or MongoDB support
* Recurring expenses
* PDF financial reports
* Multiple currency support
* Advanced analytics
* Email notifications
* Docker deployment
* Jenkins CI/CD pipeline
* Automated testing

 Project Information

Project Name: Expense Tracker

Repository: `devops_lab_project`

Project Type: Web Application

Purpose: DevOps Laboratory Project

Technologies: HTML, CSS, JavaScript

 License

This project is developed for educational and academic purposes.
