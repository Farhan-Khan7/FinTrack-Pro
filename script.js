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

const authContainer = document.querySelector(".auth-container")

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
    event.preventDefault()
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
            password
        }
        localStorage.setItem("registerDetails", JSON.stringify(userDetails));

        signupPage.style.display = "none"
        loginPage.style.display = "initial"
        localStorage.setItem("page", "login");

    }

    signupForm.reset();

})


const loginUsernameError = document.querySelector("#login-username-error");
const loginPasswordError = document.querySelector("#login-password-error");

loginBtn.addEventListener("click", function (event) {
    event.preventDefault()
    loginUsernameError.textContent = "";
    loginPasswordError.textContent = "";
    loginUsernameError.style.opacity = "0";
    loginPasswordError.style.opacity = "0";

    const username = loginUsername.value.trim();
    const password = loginPassword.value.trim();

    const userDetails = JSON.parse(localStorage.getItem("registerDetails"))



    if (username !== userDetails.username) {
        loginUsernameError.textContent = "Username is invalid.";
        loginUsernameError.style.opacity = "1";
    } else if (password !== userDetails.password) {
        loginPasswordError.textContent = "Password is invalid.";
        loginPasswordError.style.opacity = "1";
    } else {
        authContainer.style.display = "none"
        localStorage.setItem("isLoggedIn", "true");
    }

    loginForm.reset();
})


const logoutBtn = document.querySelector("#logout")

logoutBtn.addEventListener("click", function (event) {
    event.preventDefault();
    signupPage.style.display = "none"
    authContainer.style.display = "flex"

    localStorage.setItem("page", "login");
    localStorage.setItem("isLoggedIn", "false");
})


const showLogin = document.querySelector("#show-login");
const showSignup = document.querySelector("#show-signup");


showLogin.addEventListener("click", function () {
    loginPage.style.display = "initial";
    signupPage.style.display = "none";

    localStorage.setItem("page", "login")
})

showSignup.addEventListener("click", function () {
    loginPage.style.display = "none";
    signupPage.style.display = "initial"

    localStorage.setItem("page", "signup")
})

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

const addTransaction = document.querySelector("#add-transaction")
const transactionModel = document.querySelector(".transaction-modal")
const closetransactionForm = document.querySelector("#close-modal")


addTransaction.addEventListener("click", function () {
    transactionModel.style.display = "flex";
})

closetransactionForm.addEventListener("click", function () {
    transactionModel.style.display = "none"
})

// Chart Import

const ctx = document.querySelector("#myChart");
const chart = new Chart(ctx, {
    type: "bar",

    data: {

        labels: ["Income", "Expense"],

        datasets: [{
            label: "Amount",

            data: [0, 0],

            backgroundColor: [
                "#22C55E",
                "#EF4444"
            ],

            borderRadius: 8,
            borderWidth: 0,
            barThickness: 150
        }]
    },

    options: {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: "Income vs Expense"
            }
        },

        scales: {

            x: {
                grid: {
                    display: false
                }
            },

            y: {
                beginAtZero: true,

                ticks: {
                    stepSize: 100
                }
            }
        }

    }

});
const Balance = document.querySelector(".currentBalance");
const Income = document.querySelector(".totalIncome");
const Expenses = document.querySelector(".totalExpenses");
const transactionCount = document.querySelector(".transactionCount")

function updateDashboard() {

    const transactions =
        JSON.parse(localStorage.getItem("transactionDetails")) || [];

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(transaction => {

        if (transaction.transactionTag === "Income") {

            totalIncome += Number(transaction.transactionamount);

        } else {

            totalExpense += Number(transaction.transactionamount);

        }

    });

    const balance = totalIncome - totalExpense;

    Income.textContent = totalIncome;

    Expenses.textContent = totalExpense;

    Balance.textContent = balance;

    chart.data.datasets[0].data = [
        totalIncome,
        totalExpense
    ];

    const max = Math.max(totalIncome, totalExpense);

    chart.options.scales.y.suggestedMax =
        max + 100;

    chart.options.scales.y.ticks.stepSize =
        Math.ceil((max + 100) / 10);

    chart.update();

}
updateDashboard()


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
        transactionCategory
    }

    const transactions = JSON.parse(localStorage.getItem("transactionDetails")) || [];

    transactions.push(transactionDetails);

    localStorage.setItem("transactionDetails", JSON.stringify(transactions));

    updateDashboard()
    renderTransactions();
    transactionModel.style.display = "none"
})





const transactionList = document.querySelector("#transaction-list");

function renderTransactions() {

    const transactions =
        JSON.parse(localStorage.getItem("transactionDetails")) || [];

    transactionList.innerHTML = "";

    transactions.forEach((transaction, index) => {

        transactionList.innerHTML += `

            <tr>

                <td>${transaction.transactiondate}</td>

                <td>${transaction.transactiondesc}</td>

                <td>

                    <span class="category ${transaction.transactionCategory}">
                        ${transaction.transactionCategory}
                    </span>

                </td>

                <td class="${transaction.transactionTag === "Income"
                ? "income"
                : "expense"
            }">

                    ${transaction.transactionTag === "Income"
                ? "+"
                : "-"
            }$${transaction.transactionamount}

                </td>

                <td>

                    <div
                        class="actions"
                        data-index="${index}"
                    >   
                        <i class="ri-pencil-ai-line"></i>
                        <i class="ri-delete-bin-6-line"></i>
                    </div>

                </td>

            </tr>

        `;

    });

}

updateDashboard();

renderTransactions();