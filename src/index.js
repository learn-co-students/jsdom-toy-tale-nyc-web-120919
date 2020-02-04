let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })
  populateToys();
  newToy();
})


function populateToys() {
  fetch('http://localhost:3000/toys')
    .then(function (response) {
      return response.json();
    })
    .then(function (toys) {
      toys.forEach(function (toy) {
        displayToy(toy);
      });
    });
}

function displayToy(toy) {
  const toyCollection = document.getElementById('toy-collection');
  const div = document.createElement('div');
  div.setAttribute('class', 'card');
  //make a `<div class="card">` 
  toyCollection.appendChild(div);
  toyInfo(div, toy);
}

// pass in div because its going inside the div and
// pass in toy because you need the toy info
function toyInfo(div, toy) {
  const h2 = document.createElement('h2');
  h2.innerText = toy.name;
  const image = document.createElement('img');
  image.setAttribute('class', 'toy-avatar');
  image.src = toy.image;
  // image.src because src is a property of img toy.img link will be the src
  const p = document.createElement('p');
  p.innerText = `${toy.likes} Likes`;
  const likeButton = document.createElement('button');
  likeButton.setAttribute('class', 'like-btn');
  likeButton.innerText = "Like <3";
  likeToy(likeButton);

  div.appendChild(h2);
  div.appendChild(image);
  div.appendChild(p);
  div.appendChild(likeButton);
  div.dataset.id = toy.id;
  // div.innerHTML = `
  // <h2>${toy.name}</h2>
  // <img src=${toy.image} class="toy-avatar" />
  // <p>${toy.likes} Likes </p>
  // <button class="like-btn">Like <3</button>
  // `
}

function newToy() {
  const form = document.getElementsByClassName("add-toy-form")[0];
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": form.name.value,
        "image": form.image.value,
        "likes": 0
      })
    });
  });
}

function likeToy(likeButton) {
  likeButton.addEventListener('click', function (event) {
    const id = event.target.parentNode.dataset.id;
    const likes = event.target.parentNode.querySelector('p');
    const stringLikes = likes.innerText.split(' ')[0];
    likes.innerText = `${parseInt(stringLikes) + 1} Likes`;

    fetch(`http://localhost:3000/toys/${id}`, {
      method: 'PATCH',
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": parseInt(stringLikes) + 1
      })
    });
  }); }