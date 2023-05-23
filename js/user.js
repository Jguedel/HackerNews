"use strict";
//USER VARIABLE
let currentUser;

//LOGIN
async function login(evt) {
  evt.preventDefault();
  const username = $("#login-username").val();
  const password = $("#login-password").val();
  currentUser = await User.login(username, password);
  $loginForm.trigger("reset");
  saveUserCredentialsInLocalStorage();
  updateUIOnUserLogin();
  $loginForm.hide();
  $signupForm.hide();
}
$loginForm.on("submit", login);

//SIGN UP
async function signup(evt) {
  evt.preventDefault();
  const name = $("#signup-name").val();
  const username = $("#signup-username").val();
  const password = $("#signup-password").val();
  currentUser = await User.signup(username, password, name)
  saveUserCredentialsInLocalStorage();
  updateUIOnUserLogin();
  $signupForm.trigger("reset");
  $loginForm.hide();
  $signupForm.hide();
}
$signupForm.on("submit", signup);

//SIGN OUT
function logout(evt) {
  localStorage.clear();
  location.reload();
}
$navLogOut.on("click", logout);

//CHECK IF USER IS IN LOCAL STORAGE
async function checkForRememberedUser() {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  if (!token || !username) return false;
  currentUser = await User.loginViaStoredCredentials(token, username);
}

//SAVE USER TO LOCAL STORAGE
function saveUserCredentialsInLocalStorage() {
  if (currentUser) {
    localStorage.setItem("token", currentUser.loginToken);
    localStorage.setItem("username", currentUser.username);
  }
}

//UPDATE USER
function updateUIOnUserLogin() {
  $allStoriesList.show();
  updateNavOnLogin();
}