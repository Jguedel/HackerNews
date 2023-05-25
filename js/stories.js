"use strict";
let storyList;

// ON LOAD GET STORIES
async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();
  putStoriesOnPage();
}

// TURN SINGLE STORY DATA POINT INTO LIST ITEM
function generateStoryMarkup(story, trash = "") {
  console.log(`original url: ${story.url}`);
  let hostName = story.url;
  let slicePos = hostName.split("").indexOf("/");
  hostName = hostName.slice(slicePos + 2);
  console.log(`first slice: ${hostName}`);
  slicePos = hostName.split("").indexOf("/");
  if (slicePos != -1) {
    hostName = hostName.slice(0, slicePos);
    console.log(`second slice: ${hostName}`);
  }

  let star = "";
  if (currentUser !== undefined) {
    star = getStarHTML(story, currentUser);
  }
  if (trash === true) {
    trash = `
        <span class="trash-can">
          <i class="fas fa-trash-alt del"></i>
        </span> `;
  } else {
    trash = "";
  }
  return $(`
      <li id="${story.storyId}">
        ${trash}
        ${star} 
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

// CHECK STATE OF FAV STAR
function getStarHTML(story, user) {
  const isFavorite = user.isFavorite(story);
  const starType = isFavorite === true ? "fas" : "far";
  return `
      <span class="star">
        <i class="${starType} fa-star starFav"></i>
      </span>`;
}

// LOAD STORIES
function putStoriesOnPage() {
  $allStoriesList.empty();
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }
  $allStoriesList.show();
  $(".starFav").on("click", favoriteToggle);
}

// LOAD MY STORIES
function getMyStories() {
  $("#yourStory").empty();
  for (let story of currentUser.ownStories) {
    const $story = generateStoryMarkup(story, true);
    $("#yourStory").append($story);
  }
  $(".starFav").on("click", favoriteToggle);
  $(".del").on("click", deleteStory);
}

// ADD STORY
async function newStory(e) {
  e.preventDefault();
  const title = $("#title").val();
  const url = $("#url").val();
  const author = $("#author").val();
  const storyData = { title, url, author };
  const story = await storyList.addStory(currentUser, storyData);
  const $story = generateStoryMarkup(story);
  $allStoriesList.prepend($story);
  $storyForm.slideUp("slow");
  $storyForm.trigger("reset");
  $(".starFav").on("click", favoriteToggle);
}
$("#submitStory-form").on("submit", newStory);

// FAV OR UNFAV BUTTON
async function favoriteToggle(e) {
  e.preventDefault();
  const id = e.target.parentElement.parentElement.id;
  const token = currentUser.loginToken;
  let add = "far";
  let rem = "fas";
  let meth = "DELETE";
  if (e.target.classList.contains("far") === true) {
    rem = "far";
    add = "fas";
    meth = "POST";
  }
  e.target.classList.add(add);
  e.target.classList.remove(rem);
  let res = await axios({
    url: `${BASE_URL}/users/${currentUser.username}/favorites/${id}`,
    method: meth,
    data: { token },
  });
  currentUser.favorites = res.data.user.favorites;
}

// DEL BUTTON
async function deleteStory(e) {
  e.preventDefault();
  const id = e.target.parentElement.parentElement.id;
  const token = currentUser.loginToken;
  await axios({
    url: `${BASE_URL}/stories/${id}`,
    method: "DELETE",
    data: { token },
  });
  currentUser.favorites = currentUser.favorites.filter(
    (item) => item.storyId != id
  );
  currentUser.ownStories = currentUser.ownStories.filter(
    (item) => item.storyId != id
  );
  storyList = await StoryList.getStories();
  getMyStories();
}

// GET FAVORITES
function getFavorites() {
  $("#favMsg").empty();
  for (let fav of currentUser.favorites) {
    const $fav = generateStoryMarkup(fav);
    $("#favMsg").append($fav);
  }
  $(".starFav").on("click", favoriteToggle);
}
