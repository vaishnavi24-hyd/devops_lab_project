 SmartSpend – Personal Finance Management Dashboard

A modern, responsive and user-friendly Personal Finance Management Dashboard developed using HTML, CSS and JavaScript.

SmartSpend helps users track their income, expenses, savings and monthly budget through an interactive dashboard. The application provides expense analytics, transaction management, budget monitoring, search and filtering, dark mode, and CSV export functionality.

---

 Project Overview

Managing personal finances manually can be difficult and time-consuming. Users often struggle to keep track of their daily expenses, income, savings and monthly spending limits.

SmartSpend provides a simple web-based solution where users can:

* Record income and expenses
* View their total balance
* Monitor monthly spending
* Set and track a monthly budget
* Analyze expenses by category
* Search and filter transactions
* Edit and delete transactions
* Export transaction data as CSV
* Switch between Light and Dark mode
* Store data locally using browser LocalStorage

The application is designed with a modern dashboard interface to provide a professional and easy-to-use experience.

---

 Objectives

The main objectives of SmartSpend are:

1. To provide an easy-to-use personal finance management system.
2. To help users track their income and expenses.
3. To calculate the available balance automatically.
4. To monitor monthly spending against a predefined budget.
5. To provide visual expense analytics.
6. To allow users to search and filter transactions.
7. To provide transaction editing and deletion functionality.
8. To store financial data locally in the browser.
9. To provide a responsive interface for desktop and mobile devices.
10. To demonstrate software development and DevOps practices.

---

 Features

## 📊 Financial Dashboard

The dashboard provides an overview of:

* Total Balance
* Total Income
* Total Expenses
* Monthly Budget
* Monthly Savings
* Budget Usage

---

 Income Management

Users can add income transactions by providing:

* Amount
* Category
* Date
* Description

The total income is automatically calculated.

---

 Expense Management

Users can record expenses under different categories such as:

*  Food
*  Travel
*  Shopping
*  Education
*  Bills
*  Entertainment
*  Health
*  Other

---

 Expense Analytics

SmartSpend provides a visual Doughnut Chart showing how expenses are distributed across different categories.

This makes it easier to identify where most of the money is being spent.

---

 Budget Management

Users can set their monthly spending budget.

The application displays:

* Budget amount
* Amount spent
* Remaining amount
* Budget usage percentage
* Budget progress bar

The application also displays an alert when spending approaches or exceeds the budget.

---

 Search and Filtering

Transactions can be searched using their:

* Description
* Category

Users can also filter transactions by:

* Income
* Expense
* Category

---

 Edit Transactions

Existing transactions can be edited without deleting and recreating them.

---

 Delete Transactions

Individual transactions can be deleted.

Users can also clear all transactions at once.

---

 CSV Export

Users can export their transaction history as a CSV file.

The exported file contains:

```text
ID
Type
Amount
Category
Date
Description
```

---

 Dark Mode

SmartSpend includes a Light/Dark mode switch for better usability.

The selected theme is stored in LocalStorage and remains available when the application is reopened.

---

 LocalStorage

Transaction information and budget settings are stored using the browser's **LocalStorage**.

Therefore, the information remains available even after refreshing or reopening the page in the same browser.

---

 Responsive Design

The application is designed to work on:

* Desktop
* Laptop
* Tablet
* Mobile devices

The navigation sidebar automatically changes for smaller screens.

---

 Technologies Used

| Technology   | Purpose                      |
| ------------ | ---------------------------- |
| HTML5        | Web page structure           |
| CSS3         | Styling and responsive UI    |
| JavaScript   | Application functionality    |
| Chart.js     | Expense visualization        |
| LocalStorage | Client-side data persistence |
| Git          | Version control              |
| GitHub       | Source code management       |
| VS Code      | Development environment      |

---

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
├── README.md
│
└── .vscode/
    └── launch.json
```

---

 How to Run the Project

## Step 1 – Clone the Repository

Clone the project from GitHub:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Move into the project directory:

```bash
cd devops_lab_project
```

---

 Step 2 – Open the Project

Open the project in Visual Studio Code:

```bash
code .
```

Alternatively:

1. Open Visual Studio Code
2. Select File → Open Folder
3. Select the `devops_lab_project` folder.

---

 Step 3 – Run the Application

The easiest method is using Live Server.

In VS Code:

1. Install the Live Server extension.
2. Open `index.html`.
3. Right-click the file.
4. Select Open with Live Server.

The application will open in your browser.

---

 Application Testing

The following features can be tested after launching the application.

 Test 1 – Add Income

Enter:

```text
Type: Income
Amount: 50000
Category: Other
Description: Monthly Salary
```

Click:

```text
Add Transaction
```

The income should appear in the transaction list.

---

 Test 2 – Add Expense

Enter:

```text
Type: Expense
Amount: 5000
Category: Food
Description: Grocery Shopping
```

The dashboard should automatically update:

```text
Total Expenses
Total Balance
Monthly Expenses
Budget Usage
```

---

 Test 3 – Edit Transaction

Click:

```text
Edit
```

Modify the transaction details and click:

```text
Update Transaction
```

---

 Test 4 – Delete Transaction

Click:

```text
Delete
```

Confirm the deletion.

The dashboard and chart will update automatically.

---

 Test 5 – Search

Enter a transaction name in:

```text
Search transactions...
```

Only matching transactions will be displayed.

---

 Test 6 – Filter

Use:

```text
All Types
```

or:

```text
Income
Expense
```

You can also filter by category.

---

 Test 7 – Budget

Click:

```text
Set Budget
```

Enter a new monthly budget.

The budget progress bar will update automatically.

---

 Test 8 – Dark Mode

Click the:

```text
☾
```

button in the top-right corner.

The application will switch to Dark Mode.

---

 Test 9 – Export

Click:

```text
↓ Export CSV
```

The transaction data will be downloaded as a CSV file.

---

 Working Principle

The application follows the following workflow:

```text
User
  │
  ▼
SmartSpend Dashboard
  │
  ├──────────────┐
  │              │
  ▼              ▼
Income         Expense
  │              │
  └──────┬───────┘
         │
         ▼
   JavaScript Logic
         │
         ├───────────────┐
         │               │
         ▼               ▼
   Dashboard         LocalStorage
         │
         ▼
   Expense Analytics
         │
         ▼
    Chart.js
```

---

 Dashboard Calculation

The application automatically calculates the user's balance.

 Balance

```text
Balance = Total Income - Total Expenses
```

 Savings

```text
Savings = Monthly Income - Monthly Expenses
```

 Budget Usage

```text
Budget Usage =
(Total Expenses / Monthly Budget) × 100
```

---

 Data Storage

SmartSpend currently uses browser LocalStorage.

The following information is stored:

```text
smartSpendTransactions
smartSpendBudget
smartSpendTheme
```

No external database is required for the current version.

---

 DevOps Integration

This project can be integrated with DevOps tools and practices.

 Version Control

Git is used for tracking source-code changes.

Example:

```bash
git add .
git commit -m "Update SmartSpend dashboard UI"
git push
```

---

 GitHub

GitHub is used to:

* Store source code
* Track project versions
* Manage commits
* Collaborate
* Maintain project history

---

 CI/CD

The project can be connected to a CI/CD pipeline using tools such as Jenkins or GitHub Actions.

Example workflow:

```text
Developer
    ↓
Git
    ↓
GitHub
    ↓
CI/CD Pipeline
    ↓
Build
    ↓
Test
    ↓
Deploy
```

---

 Docker Deployment

The application can also be containerized using Docker.

A basic deployment architecture is:

```text
SmartSpend Source Code
          ↓
        Docker
          ↓
      Web Server
          ↓
      Application
          ↓
        User
```

---

 Screenshots

Add screenshots of your application here after running it.

Example:

```text
screenshots/
│
├── dashboard.png
├── transactions.png
├── analytics.png
└── dark-mode.png
```

Then add them to this README using:

```markdown
![SmartSpend Dashboard](screenshots/dashboard.png)
```

---

 Future Enhancements

The following features can be added in future versions:

* User authentication
* MongoDB database
* Backend API
* Cloud deployment
* Multiple user accounts
* Recurring expenses
* Financial reports
* PDF report generation
* Email notifications
* Advanced analytics
* AI-based spending recommendations
* Payment integration
* Cloud data synchronization

---

 Academic Project

This project was developed as part of a **DevOps Lab Project** to demonstrate the development and management of a modern web application using software development, version control and DevOps practices.

---

 Project Information

**Project Name:** SmartSpend – Personal Finance Management Dashboard

**Project Type:** Web Application

**Domain:** Personal Finance Management

**Frontend:** HTML5, CSS3, JavaScript

**Visualization:** Chart.js

**Storage:** Browser LocalStorage

**Version Control:** Git & GitHub

---

 License

This project is developed for educational and academic purposes.

---

 Conclusion

SmartSpend provides a simple yet powerful way to manage personal finances through a modern and responsive web interface.

The application combines **transaction management, financial calculations, budget monitoring, expense analytics, data persistence and responsive UI design** into a single dashboard.

It also provides a foundation for future integration with backend services, databases, CI/CD pipelines and cloud deployment.
