// eslint-disable-next-line import/extensions,import/no-cycle,import/named
import {getcommentsfrombase, getdatafrombase, getpostfrombase} from './getdata.js';

// globals
let pagesCount;
let currentNumberPage = 1;
const blog = document.getElementById('container_blog');

if (window.location.pathname.includes('blogpage')) {
  getdatafrombase(currentNumberPage);

  const currentPage = document.getElementById('current_page');
  currentPage.innerHTML = `current page = ${currentNumberPage}`;

  const prevbutton = document.getElementById('prev-button');
  const nextbutton = document.getElementById('next-button');

  prevbutton.addEventListener('click', movebackward);
  nextbutton.addEventListener('click', moveforward);
} else {
  const loadbutton = document.getElementById('postbutton');

  loadbutton.addEventListener('click', loadPage);
}

export function formatData(data) {
  // data['data'].length // 20
  // data['data'][0]['body'] // текст
  pagesCount = data.meta.pagination.pages;
  currentNumberPage = data.meta.pagination.page;
  for (let i = 0; i < data.data.length; i++) {
    // eslint-disable-next-line no-use-before-define
    createPosts(data.data[i].id);
  }
}

// buttons events
function movebackward() {
  const currentPage = document.getElementById('current_page');
  currentNumberPage--;
  getdatafrombase(currentNumberPage);
  currentPage.innerHTML = `current page = ${currentNumberPage} of ${pagesCount}`;
  blog.innerHTML = '';
}
function moveforward() {
  const currentPage = document.getElementById('current_page');
  currentNumberPage++;
  getdatafrombase(currentNumberPage);
  currentPage.innerHTML = `current page = ${currentNumberPage} of ${pagesCount}`;
  blog.innerHTML = '';
}
function loadPage() {
  blog.innerHTML = "";
  const inputnumber = document.getElementById('numberid');
  const postId = +inputnumber.value;
  getpostfrombase(postId);
  setTimeout( () => {
    if (blog.innerHTML) {
      getcommentsfrombase(postId);
    }
  } ,1000)
}

// create posts
function createPosts(linkid) {
    const blog = document.getElementById('container_blog');
    const postItem = document.createElement('div');
    postItem.classList.add('post_item');
    const link = document.createElement('a');

    const linkAdress = `https://gorest.co.in/public/v1/posts?post=${linkid}`;

    link.innerHTML = linkAdress;
    link.setAttribute('href', linkAdress);

    postItem.append(link);
    blog.append(postItem);
  }

// create post
export function createPostcard(data) {
  const card = document.createElement('div');
  const title = document.createElement('h1');
  const cardbody = document.createElement('p');

  card.classList.add('post_item');

  title.innerHTML = data.data.title;
  cardbody.innerHTML = data.data.body;

  card.append(title);
  card.append(cardbody);

  blog.append(card);
}

export function createComments(data) {
  for (let i = 0; i < data.data.length; i++) {
    const commentCard = document.createElement('div');
    const commentAuthor = document.createElement('h2');
    const commentAuthorEmail = document.createElement('h2');
    const commentCardBody = document.createElement('p');

    commentCard.classList.add('post_comment');
    commentAuthorEmail.classList.add('email');

    commentAuthor.innerHTML = data.data[i].name;
    commentAuthorEmail.innerHTML = data.data[i].email;
    commentCardBody.innerHTML = data.data[i].body;

    commentCard.append(commentAuthor);
    commentCard.append(commentAuthorEmail);
    commentCard.append(commentCardBody);

    blog.append(commentCard);
  }
}
