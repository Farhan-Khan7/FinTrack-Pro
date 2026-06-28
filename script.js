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
    }else{
        authContainer.style.display = "none"
        localStorage.setItem("isLoggedIn", "true");
    }

    loginForm.reset();
})


const logoutBtn = document.querySelector("#logout")

logoutBtn.addEventListener("click", function(event){
    event.preventDefault();
    signupPage.style.display = "none"
    authContainer.style.display = "flex"

    localStorage.setItem("page", "login");
    localStorage.setItem("isLoggedIn", "false");
})


const showLogin = document.querySelector("#show-login");
const showSignup = document.querySelector("#show-signup");


showLogin.addEventListener("click" , function(){
    loginPage.style.display = "initial";
    signupPage.style.display = "none";

    localStorage.setItem("page" , "login")
})

showSignup.addEventListener("click" , function(){
    loginPage.style.display = "none";
    signupPage.style.display = "initial"

    localStorage.setItem("page" , "signup")
})

const isLoggedIn = localStorage.getItem("isLoggedIn");

if (isLoggedIn === "true") {
    authContainer.style.display = "none";
}

const currentPage = localStorage.getItem("page");

if (currentPage === "signup") {

    signupPage.style.display = "block";
    loginPage.style.display = "none";

} else {

    signupPage.style.display = "none";
    loginPage.style.display = "block";

}