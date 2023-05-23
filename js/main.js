"use strict";

// GLOBAL VARIBALES
const $body = $("body");
const $storiesLoadingMsg = $("#stories-loading-msg");
const $allStoriesList = $("#all-stories-list");
const $loginForm = $("#login-form");
const $signupForm = $("#signup-form");
const $storyForm = $("#submitStory-form");
const $navLogin = $("#nav-login");
const $navUserProfile = $("#nav-user-profile");
const $navLogOut = $("#nav-logout");
const $navSubmit = $("#nav-submit");
const $navFavorite = $("#nav-favorite");
const $navStories = $("#nav-stories");

// HIDE
function hidePageComponents() {
  const components = [
    $allStoriesList,
    $loginForm,
    $signupForm,
    $("#submitStory-form"),
    $("#yourStory"),
    $("#favMsg"),
  ];
  components.forEach((c) => c.hide());
}

//STARTING
async function start() {
  await checkForRememberedUser();
  await getAndShowStoriesOnStart();
  if (currentUser) updateUIOnUserLogin();
}

// ONCE LOADED START
$(start);