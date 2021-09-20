import {getFullPage, getFullPagebyNumber, getFullPost, getPagesCount, getCommentsToPost} from "./getdata.js";

let lastPage;
if (window.location.pathname.includes('blogpage')) {
  lastPage = await getPagesCount();
  getFullPage();

  const onmainbutton = document.getElementById('onmainbutton');
  const prevBtn = document.getElementById('prevbutton');
  const nextBtn = document.getElementById('nextbutton');

  onmainbutton.addEventListener('click', moveonmain);
  prevBtn.addEventListener('click', movebackward);
  nextBtn.addEventListener('click', moveforward);

  linksListen();
} else {
  const pageParams = new URLSearchParams(window.location.search);
  let postSend = pageParams.get('post_id');
  console.log(postSend);
  getFullPost(postSend);

  const onmainbutton = document.getElementById('onmainbutton');
  onmainbutton.addEventListener('click', movetoMainpage);
}

// initial DOM
const currentPageid = document.getElementById('currentPage');
let currentPage = 1;


// buttons functions
function moveforward() {
  currentPage++;
  updatePageId();
  getFullPagebyNumber(currentPage);
}
function movebackward() {
  currentPage--;
  updatePageId();
  getFullPagebyNumber(currentPage);
}
function moveonmain() {
  currentPage = 1;
  updatePageId();
  getFullPage();
}
function movetoMainpage() {
  window.location.href = `blogpage.html`
}

export function updatePageId() {
  if (currentPage < 1) {
    currentPage = 1;
  }
  if (currentPage > lastPage) {
    currentPage = lastPage;
  }
  currentPageid.innerHTML = `Current page = ${currentPage} of ${lastPage}`
}
export function createPostTitle(data) {
  const contentDiv = document.getElementById('contentDiv');
  contentDiv.innerHTML = "";

  for (let i = 0; i < data.data.length; i++) {
    const itemCard = document.createElement('div');
    itemCard.classList.add('itemCard');
    const itemLink = document.createElement('a');
    itemLink.innerHTML = data.data[i].title;
    itemLink.setAttribute('postId', `${data.data[i].id}`);
    const itemId = document.createElement('span');
    itemId.classList.add('idCard');
    itemId.innerHTML = `ID ${data.data[i].id}`;

    itemCard.append(itemLink);
    itemCard.append(itemId);
    contentDiv.append(itemCard);

    linksListen();
  }
}

// listeners to links
function linksListen() {
  const link = document.getElementsByTagName('a');
  const links = [...link];
  for (let el of links) {
    el.addEventListener('click', redirect);
  }
}
function redirect() {
  let postId = +this.getAttribute('postId');
  window.location.href = `blogpost.html?post_id=${postId}`;
}

export function createPost(data) {
  const contentDiv = document.getElementById('contentDiv');

  const postCard = document.createElement('div');
  const mainPostTitle = document.createElement('h1');
  mainPostTitle.innerHTML = data.data.title;
  const mainPostText = document.createElement('p');
  mainPostText.innerHTML = data.data.body;

  postCard.append(mainPostTitle);
  postCard.append(mainPostText);

  contentDiv.append(postCard);

  getCommentsToPost(data.data.id);
}

export function createComments(data) {
  const contentDiv = document.getElementById('contentDiv');
  for (let i = 0; i < data.data.length; i++) {
    const commentCard = document.createElement('div');
    commentCard.classList.add('comment');
    const commentAuthor = document.createElement('h2');
    const commentBody = document.createElement('p');

    commentAuthor.innerHTML = data.data[i].name;
    commentBody.innerHTML = data.data[i].body;

    commentCard.append(commentAuthor);
    commentCard.append(commentBody);

    contentDiv.append(commentCard);
  }
}
