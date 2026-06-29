const toast = document.querySelector("#toast");

function showToast(message) {
  toast.textContent = message;

  toast.classList.add("show");

  setTimeout(function () {
    toast.classList.remove("show");
  }, 2000);
}

const toggle = document.querySelector("#darkMode");

// Page load hote hi theme check karo
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "dark") {
  document.body.classList.add("dark");
  toggle.checked = true;
}

// Toggle change hone par
toggle.addEventListener("change", () => {
  if (toggle.checked) {
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
});

// Authentication code

const authContainer = document.querySelector(".auth-container");

const signupUsername = document.querySelector("#signup-username");
const signupPassword = document.querySelector("#signup-password");
const signupPage = document.querySelector(".signup-card");

const loginUsername = document.querySelector("#login-username");
const loginPassword = document.querySelector("#login-password");
const loginPage = document.querySelector(".login-card");

const signupUsernameError = document.querySelector("#signup-username-error");
const signupPasswordError = document.querySelector("#signup-password-error");

const registerBtn = document.querySelector(".register-btn");
const loginBtn = document.querySelector(".login-btn");

const signupForm = document.querySelector("#signup-form");
const loginForm = document.querySelector("#login-form");

registerBtn.addEventListener("click", function (event) {
  event.preventDefault();
  signupUsernameError.textContent = "";
  signupPasswordError.textContent = "";
  signupUsernameError.style.opacity = "0";
  signupPasswordError.style.opacity = "0";

  const username = signupUsername.value.trim();
  const password = signupPassword.value.trim();

  if (username === "") {
    signupUsernameError.style.opacity = "1";
    signupUsernameError.textContent = "Username is required.";
    return;
  } else if (password === "") {
    signupPasswordError.style.opacity = "1";
    signupPasswordError.textContent = "Password is required.";
    return;
  } else {
    const userDetails = {
      username,
      password,
    };
    localStorage.setItem("registerDetails", JSON.stringify(userDetails));

    signupPage.style.display = "none";
    loginPage.style.display = "initial";
    localStorage.setItem("page", "login");
  }

  signupForm.reset();
  showToast("Account created successfully!");
});

const loginUsernameError = document.querySelector("#login-username-error");
const loginPasswordError = document.querySelector("#login-password-error");

loginBtn.addEventListener("click", function (event) {
  event.preventDefault();
  loginUsernameError.textContent = "";
  loginPasswordError.textContent = "";
  loginUsernameError.style.opacity = "0";
  loginPasswordError.style.opacity = "0";

  const username = loginUsername.value.trim();
  const password = loginPassword.value.trim();

  const userDetails = JSON.parse(localStorage.getItem("registerDetails"));

  if (username !== userDetails.username) {
    loginUsernameError.textContent = "Username is invalid.";
    loginUsernameError.style.opacity = "1";
  } else if (password !== userDetails.password) {
    loginPasswordError.textContent = "Password is invalid.";
    loginPasswordError.style.opacity = "1";
  } else {
      authContainer.style.display = "none";
    localStorage.setItem("isLoggedIn", "true");
    profileName.textContent = userDetails.username;
  }

  loginForm.reset();
  showToast("Welcome back!");
});

const logoutBtn = document.querySelector("#logout");

logoutBtn.addEventListener("click", function (event) {
  event.preventDefault();
  signupPage.style.display = "none";
  authContainer.style.display = "flex";

  localStorage.setItem("page", "login");
  localStorage.setItem("isLoggedIn", "false");
  showToast("Logged out successfully!");
});

const showLogin = document.querySelector("#show-login");
const showSignup = document.querySelector("#show-signup");

showLogin.addEventListener("click", function () {
  loginPage.style.display = "initial";
  signupPage.style.display = "none";

  localStorage.setItem("page", "login");
});

showSignup.addEventListener("click", function () {
  loginPage.style.display = "none";
  signupPage.style.display = "initial";

  localStorage.setItem("page", "signup");
});

const isLoggedIn = localStorage.getItem("isLoggedIn");

if (isLoggedIn === "true") {
  authContainer.style.display = "none";
}

const currentPage = localStorage.getItem("page");

if (currentPage === "login") {
  signupPage.style.display = "none";
  loginPage.style.display = "block";
} else {
  signupPage.style.display = "block";
  loginPage.style.display = "none";
}

const profileName = document.querySelector(".user-name");

const userDetails = JSON.parse(localStorage.getItem("registerDetails"));

if (userDetails) {
  profileName.textContent = userDetails.username;
}

// Add Transactin Btn

const addTransaction = document.querySelector("#add-transaction");
const transactionModel = document.querySelector(".transaction-modal");
const closetransactionForm = document.querySelector("#close-modal");

addTransaction.addEventListener("click", function () {
  transactionModel.style.display = "flex";
});

closetransactionForm.addEventListener("click", function () {
  transactionModel.style.display = "none";
});

// Chart Import

const ctx = document.querySelector("#myChart");
const chart = new Chart(ctx, {
  type: "bar",

  data: {
    labels: ["Income", "Expense"],

    datasets: [
      {
        label: "Amount",

        data: [0, 0],

        backgroundColor: ["#22C55E", "#EF4444"],

        borderRadius: 8,
        borderWidth: 0,
        barThickness: 150,
      },
    ],
  },

  options: {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Income vs Expense",
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },
      },

      y: {
        beginAtZero: true,

        ticks: {
          stepSize: 100,
        },
      },
    },
  },
});
const Balance = document.querySelector(".currentBalance");
const Income = document.querySelector(".totalIncome");
const Expenses = document.querySelector(".totalExpenses");
const transactionCount = document.querySelector(".transactionCount");

function updateDashboard() {
  const transactions =
    JSON.parse(localStorage.getItem("transactionDetails")) || [];

  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach((transaction) => {
    if (transaction.transactionTag === "Income") {
      totalIncome += Number(transaction.transactionamount);
    } else {
      totalExpense += Number(transaction.transactionamount);
    }
  });

  // Total Transactions
  transactionCount.textContent = transactions.length;
  const balance = totalIncome - totalExpense;

  Income.textContent = totalIncome;

  Expenses.textContent = totalExpense;

  Balance.textContent = balance;

  chart.data.datasets[0].data = [totalIncome, totalExpense];

  const max = Math.max(totalIncome, totalExpense);

  chart.options.scales.y.suggestedMax = max + 100;

  chart.options.scales.y.ticks.stepSize = Math.ceil((max + 100) / 10);

  chart.update();
}
updateDashboard();

const transactionForm = document.querySelector("#transaction-form");
const transactionSubmitBtn = document.querySelector(".submit-btn");

const transactionType = document.querySelector("#type");
const description = document.querySelector("#description");
const amount = document.querySelector("#amount");
const date = document.querySelector("#date");
const transactionCategories = document.querySelector("#category");

transactionSubmitBtn.addEventListener("click", function (event) {
  event.preventDefault();

  const transactionTag = transactionType.value;
  const transactiondesc = description.value;
  const transactionamount = amount.value;
  const transactiondate = date.value;
  const transactionCategory = transactionCategories.value;

  const transactionDetails = {
    transactionTag,
    transactiondesc,
    transactionamount,
    transactiondate,
    transactionCategory,
  };

  const transactions =
    JSON.parse(localStorage.getItem("transactionDetails")) || [];

  if (editIndex === -1) {
    transactions.push(transactionDetails);
    showToast("Transaction added successfully!");
  } else {
    transactions[editIndex] = transactionDetails;
    editIndex = -1;
    showToast("Transaction updated successfully!");
  }

  localStorage.setItem("transactionDetails", JSON.stringify(transactions));

  renderTransactions(transactions);
  updateDashboard();
  transactionModel.style.display = "none";
  transactionSubmitBtn.textContent = "Add Transaction";

  transactionForm.reset();
});

const transactionList = document.querySelector("#transaction-list");

function renderTransactions(transactions) {
  transactionList.innerHTML = "";

  const settingsData = JSON.parse(localStorage.getItem("settings"));

  const currentCurrency = settingsData ? settingsData.currency : "$";

  transactions.forEach((transaction, index) => {
    transactionList.innerHTML += `

            <tr>

                <td>${transaction.transactiondate}</td>

                <td>${transaction.transactiondesc}</td>

                <td>
                    <span class="category ${transaction.transactionCategory.toLowerCase()}">
                        ${transaction.transactionCategory}
                    </span>
                </td>

          <td class="${
            transaction.transactionTag === "Income" ? "income" : "expense"
          }">

    ${transaction.transactionTag === "Income" ? "+" : "-"}

    <span class="changeCurrency">${currentCurrency}</span>

    ${transaction.transactionamount}

</td>

                <td>

                    <div class="actions">

                        <i class="ri-pencil-ai-line edit" data-index="${index}"></i>

                        <i class="ri-delete-bin-6-line delete" data-index="${index}"></i>

                    </div>

                </td>

            </tr>

        `;
  });
}

updateDashboard();

const transactions =
  JSON.parse(localStorage.getItem("transactionDetails")) || [];

renderTransactions(transactions);

const dashboardBtn = document.querySelector("#dashboard-btn");
const settingBtn = document.querySelector("#setting-btn");

const dashboard = document.querySelector(".dashboard");
const settings = document.querySelector(".settings-page");

dashboardBtn.addEventListener("click", function () {
  settingBtn.style.backgroundColor = "transparent";
  settingBtn.style.color = "#b8c7db";
  dashboardBtn.style.backgroundColor = "#e5e7eb19";
  dashboardBtn.style.color = "#3B82F6";
  dashboard.style.display = "initial";
  settings.style.display = "none";
});

settingBtn.addEventListener("click", function () {
  dashboardBtn.style.backgroundColor = "transparent";
  dashboardBtn.style.color = "#b8c7db";
  settingBtn.style.backgroundColor = "#e5e7eb19";
  settingBtn.style.color = "#3B82F6";
  dashboard.style.display = "none";
  settings.style.display = "initial";
});

// filter Transactions

const filter = document.querySelector("#filter");

filter.addEventListener("change", function () {
  const filterValue = filter.value;

  const transactions =
    JSON.parse(localStorage.getItem("transactionDetails")) || [];

  if (filterValue === "all") {
    renderTransactions(transactions);
  } else if (filterValue === "income") {
    const incomeTransaction = transactions.filter(function (transaction) {
      return transaction.transactionTag === "Income";
    });

    renderTransactions(incomeTransaction);
  } else {
    const expenseTransaction = transactions.filter(function (transaction) {
      return transaction.transactionTag === "Expense";
    });

    renderTransactions(expenseTransaction);
  }
});

// delete Transaction

const deleteBtns = document.querySelectorAll(".delete");

transactionList.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    const index = e.target.dataset.index;

    const transactions =
      JSON.parse(localStorage.getItem("transactionDetails")) || [];

    transactions.splice(index, 1);
    showToast("Transaction deleted successfully!");

    localStorage.setItem("transactionDetails", JSON.stringify(transactions));

    renderTransactions(transactions);
    updateDashboard();
  }
});

// edit transactions

let editIndex = -1;

transactionList.addEventListener("click", function (e) {
  if (!e.target.classList.contains("edit")) return;

  const index = Number(e.target.dataset.index);

  editIndex = index;

  const transactions =
    JSON.parse(localStorage.getItem("transactionDetails")) || [];

  const transaction = transactions[index];

  transactionType.value = transaction.transactionTag;
  description.value = transaction.transactiondesc;
  amount.value = transaction.transactionamount;
  date.value = transaction.transactiondate;
  transactionCategories.value = transaction.transactionCategory;

  transactionSubmitBtn.textContent = "Save Transaction";

  transactionModel.style.display = "flex";
});

// search transactions

const searchInput = document.querySelector("#search");

searchInput.addEventListener("input", function () {
  const searchValue = searchInput.value.toLowerCase();

  const transactions =
    JSON.parse(localStorage.getItem("transactionDetails")) || [];

  const searchTransaction = transactions.filter(function (transaction) {
    return transaction.transactiondesc.toLowerCase().includes(searchValue);
  });

  renderTransactions(searchTransaction);
});

// settings

const fullName = document.querySelector("#full-name");
const currency = document.querySelector("#currency");

function updateSettings() {
  const settingsData = JSON.parse(localStorage.getItem("settings"));

  if (!settingsData) return;

  // Navbar name
  profileName.textContent = settingsData.name;

  // Currency
  const currencies = document.querySelectorAll(".changeCurrency");

  currencies.forEach(function (currency) {
    currency.textContent = settingsData.currency;
  });
}
updateSettings();

const settingsData = JSON.parse(localStorage.getItem("settings"));

if (settingsData) {
  fullName.value = settingsData.name;
  currency.value = settingsData.currency;
} else {
  const user = JSON.parse(localStorage.getItem("registerDetails"));
  fullName.value = user.username;
  currency.value = "$";
}

const settingsForm = document.querySelector("#settings-form");
settingsForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const settingsData = {
    name: fullName.value.trim(),
    currency: currency.value,
  };

  localStorage.setItem("settings", JSON.stringify(settingsData));
  updateSettings();

  const transactions =
    JSON.parse(localStorage.getItem("transactionDetails")) || [];

  renderTransactions(transactions);
  showToast("Changes saved successfully!");
});

// reset buttons

const resetBtn = document.querySelector("#reset");

resetBtn.addEventListener("click", function () {
  const confirmReset = confirm(
    "Are you sure you want to delete all transactions?",
  );

  if (!confirmReset) return;

  localStorage.removeItem("transactionDetails");

  updateDashboard();

  renderTransactions([]);

  searchInput.value = "";

  filter.value = "all";

  showToast("All transactions deleted successfully!");
});
