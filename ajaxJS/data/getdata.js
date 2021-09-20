import {updatePageId, createPostTitle, createPost, createComments} from './allData.js'

// on load (initial)
export async function getFullPage() {
  const data = await fetch('https://gorest.co.in/public-api/posts?page=1');
  const response = await data.json();
  updatePageId();
  createPostTitle(response);
}
export async function getPagesCount() {
  const data = await fetch('https://gorest.co.in/public-api/posts?page=1');
  const response = await data.json();
  let lastPageEx = response.meta.pagination.pages;
  return parseInt(lastPageEx);
}

// fetch by listeners (IMPORT)
export async function getFullPagebyNumber(n) {
  const data = await fetch(`https://gorest.co.in/public-api/posts?page=${n}`);
  const response = await data.json();
  createPostTitle(response);
}

// fetch post and comments

export async function getFullPost(id) {
  const data = await fetch(`https://gorest.co.in/public-api/posts/${id}`);
  const response = await data.json();
  createPost(response);
}

export async function getCommentsToPost(id) {
  const data = await fetch(`https://gorest.co.in/public-api/comments?post_id=${id}`);
  const response = await data.json();
  createComments(response);
}
