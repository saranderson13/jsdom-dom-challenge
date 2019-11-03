// OBJECTIVES:
// [x] Make the counter increase it's number by 1 each second.
// [x] Make a button that pauses the counter.
// [x] Pause button should turn into a resume button when paused.
// [x] Pause button also disables '+', '-', '<3', and 'submit' buttons.
// [x] Make the minus button decrease the counter by 1.
// [x] Make the plus button increase the counter by 1.
// [x] Make the heart button "like" the counter's current number.
// [x] Like button should also insert an <li> into the 'ul.likes' list.
// [x] If number has already been liked, increment the number of likes it has.
// [x] If it has not been liked, add a new <li> for the number.
// [x] leaving a comment inserts a <p> of that comment into 'div#list.comments'.

document.addEventListener("DOMContentLoaded", () => {

  // Grab counter
  const counter = document.getElementById('counter');

  // INCREASING THE COUNTER ONCE PER SECOND
  // Create function to increase the number in the counter by 1.
  function countUp() { counter.innerText = parseInt(counter.innerText, 10) + 1; }
  // Create interval to trigger #countUp() once per second.
  let counting = setInterval(countUp, 1000);


  // MINUS BUTTON FUNCTIONALITY
  // Create function to decrease the number in the counter by 1.
  function decreaseCount() { counter.innerText = parseInt(counter.innerText, 10) - 1; }
  // Grab minus button.
  const minusButton = document.getElementById('minus');
  // Add event listener for minus button to trigger #decreaseCount() when clicked.
  minusButton.addEventListener("click", decreaseCount);


  // PLUS BUTTON FUNCTIONALITY
  // Grab plus button.
  const plusButton = document.getElementById('plus');
  // Add event listener for minus button to trigger #countUp() when clicked.
  // Same function as interval can be used - same functionality.
  plusButton.addEventListener("click", countUp);


  // HEART BUTTON FUNCTIONALTY
  // Grab the heart button.
  const likeButton = document.getElementById('heart');
  // Grab the list node for likes.
  const likeList = document.querySelector('ul.likes');
  // Create an array to keep track of numbers that have already been liked.
  const alreadyLiked = [];

  // Create function to add a like - or increase the number of likes if already liked.
  function addLike() {
    // If the number has already been liked.
    if (alreadyLiked.includes(counter.innerText)) {
      // Grab the like in question - Id will be the number currently on counter.
      let liToUpdate = document.getElementById(`${counter.innerText}`);
      // Grab the span that contains the current number of likes.
      let likeCount = liToUpdate.querySelector('span');
      // Transform the number of likes from string to number.
      let prevLikeCount = parseInt(likeCount.innerText, 10);
      // Increase then number in the inner text of the span by 1.
      likeCount.innerText = (prevLikeCount + 1).toString(10);
      // If it had only been liked once before, change "time" to "times".
      if (prevLikeCount == 1) {
        let updateTimes = liToUpdate.innerHTML.replace("e.", "es.");
        liToUpdate.innerHTML = updateTimes;
      }

      // If the number has not yet been liked.
    } else {
      // Add the current number in the counter to the alreadyLiked array.
      alreadyLiked.push(counter.innerText);
      // Create a new <li> to hold the new list item.
      let newLike = document.createElement('li');
      // Set the id of the newLike to the number in the counter.
      newLike.id = `${counter.innerText}`;
       // Create a span to hold the number of likes the number has.
       // This makes it easy to grab the number when updating an existing like.
      let spanTimes = document.createElement('span');
      // Set the initial number of likes to 1 (inside the span).
      spanTimes.innerText = "1";
      // Build the sentence for the newLike.
      newLike.innerText = `${counter.innerText} has been liked `;
      newLike.appendChild(spanTimes);
      newLike.innerHTML += ' time.';
      // Add the newLike to the list of likes.
      likeList.appendChild(newLike);
    };
  };

  // Add event listener to like button to trigger #addLike on click.
  likeButton.addEventListener("click", addLike);


  // COMMENT FUNCTIONALITY
  // Grab the submit button.
  submitComment = document.getElementById('submit');
  // Add event listener to submit button to add new comment to list on click.
  submitComment.addEventListener("click", function(e){
    // Prevent form button from reloading page.
    e.preventDefault();
    // Grab list of comments.
    const commentList = document.getElementById('list');
    // Grab input field for new comments.
    const commentField = document.getElementById('comment-input');

    // Create a <p> in which to put the new comment.
    let newComment = document.createElement('p');
    // Add the current value of the input field to the newComment.
    newComment.innerText = commentField.value;
    // Add the newComment to the list of comments.
    commentList.appendChild(newComment);
    // Reset the value in the input field.
    commentField.value = "";
  });


  // PAUSE BUTTON FUNCTIONALITY
  // Grab the pause button.
  const pauseButton = document.getElementById('pause');

  // Create function with tasks to perform to 'pause' the application.
  function pauseCountUp() {
    // Stop the counter from counting up.
    clearInterval(counting);
    // Change the button's text to "resume"
    pauseButton.innerText = "resume";

    // Add a one time listener to the new "resume" button to resume all functions.
    pauseButton.addEventListener("click", resumeCountUp, { once: true });
    // Disable all buttons
    minusButton.disabled = true;
    plusButton.disabled = true;
    likeButton.disabled = true;
    submitComment.disabled = true;

    // *** An alternate way to disable the '+' & '-' buttons, LESS EFFICIENT.
    // minusButton.removeEventListener("click", decreaseCount);
    // plusButton.removeEventListener("click", countUp);
  };

  // Create function with tasks to restore functionality.
  function resumeCountUp() {
    // Make the counter continue counting up each second.
    counting = setInterval(countUp, 1000);
    // Return the text in the pause button to "pause".
    pauseButton.innerText = "pause";

    // Restore functionality to all buttons.
    minusButton.disabled = false;
    plusButton.disabled = false;
    likeButton.disabled = false;
    submitComment.disabled = false;

    // *** An alternate way to restore the '+' & '-' button functionality; LESS EFFICIENT.
    // minusButton.addEventListener("click", decreaseCount);
    // plusButton.addEventListener("click", countUp);
  };

  // Add event listener to trigger #pauseCountUp on click.
  pauseButton.addEventListener("click", pauseCountUp);

});
