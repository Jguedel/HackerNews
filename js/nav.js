"use strict";

//SHOW HOME PAGE
function navAllStories(evt) {
  hidePageComponents();
  putStoriesOnPage();
}
$body.on("click", "#nav-all", navAllStories);

//SHOW LOGIN/SIGNUP PAGE
function navLoginClick(evt) {
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}
$navLogin.on("click", navLoginClick);

//SHOW FULL NAV WHEN USER IS SIGNED IN
function updateNavOnLogin() {
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navSubmit.show();
  $navFavorite.show();
  $navStories.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

//SHOW ADD PAGE
function navSubmitClick(evt) {
  hidePageComponents();
  putStoriesOnPage();
  $("#submitStory-form").show();
}
$navSubmit.on("click", navSubmitClick);

//SHOW FAVORITES
function navFavClick(evt) {
  hidePageComponents();
  getFavorites();
  $("#favMsg").show();
}
$navFavorite.on("click", navFavClick);

//SHOW MY STORIES
function navYourStoryClick(evt) {
  hidePageComponents();
  getMyStories();
  $("#yourStory").show();
}
$navStories.on("click", navYourStoryClick);
