// eslint-disable-next-line import/extensions,import/no-cycle
import {createPostcard, createComments, formatData} from './allData.js';

// eslint-disable-next-line import/prefer-default-export
// for page
export function getdatafrombase(page) {
  fetch(`https://gorest.co.in/public-api/posts?page=${page}`)
    .then(
      (response) => {
        if (response.status !== 200) {
          console.log(`Looks like there was a problem. Status Code: ${
            response.status}`);
          return;
        }
        response.json().then((data) => {
          formatData(data);
        });
      },
    )
    .catch((err) => {
      console.log('Fetch Error :-S', err);
    });
}

// for post and comments
export function getpostfrombase(postid) {
  fetch(`https://gorest.co.in/public-api/posts/${postid}`)
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }
        // Examine the text in the response
        response.json().then(function(data) {
          createPostcard(data);
        });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
}
export function getcommentsfrombase(postid) {
  fetch(`https://gorest.co.in/public-api/comments?post_id=${postid}`)
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }

        // Examine the text in the response
        response.json().then(function(data) {
          createComments(data);
        });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
}
