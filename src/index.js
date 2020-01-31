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

 const toysDbUrl = "http://localhost:3000/toys"
 
 fetch(toysDbUrl)
  .then(function(response) {
    return response.json()
  }).then(function(data) {
    data.forEach(function (dataItem) {
      newDiv = document.createElement('div');
      newDiv.className = 'card';
      newDiv.innerHTML = populateToyInfo(dataItem);
      targetDiv = document.getElementById('toy-collection');
      
      targetDiv.appendChild(newDiv);
    })  
  })

  function populateToyInfo(toyData) { 
    return `<h2>${toyData.name}</h2>
    <img src=${toyData.image} class="toy-avatar" />
    <p>${toyData.likes} Likes </p>
    <button class="like-btn" id="${toyData.id}">Like <3</button>`
  }
 
 const likeContainer = document.getElementById("toy-collection") 
 likeContainer.addEventListener('click', function(event) {
   if (event.target.className === 'like-btn') {
    const targetP = event.target.parentNode.querySelector('p') 
    let likes = parseInt(targetP.innerText.slice(0, -6));
    targetP.innerText = (++likes) + " likes";
    const toyId = event.target.id 
    fetch(`${toysDbUrl}/${toyId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        accept: "application/json"
      },
      body: JSON.stringify( {likes} )
    })
   }
 })



 const addToyForm = document.querySelector('.add-toy-form');
 addToyForm.addEventListener('submit', function(event) {
   event.preventDefault();
   let name = event.target.name.value;
   let image = event.target.image.value;
   let likes = 0;

   let newToy = { name, image, likes };
  createToy(newToy);
  event.target.reset() 
 })
  
 function createToy(newToy) {
  fetch(toysDbUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json"
    },
    body: JSON.stringify(newToy)
  })
  .then(response => response.json())
  .then(toy => {
    let newDiv = document.createElement('div');
    newDiv.className = 'card';
    newDiv.innerHTML = populateToyInfo(toy);
    targetDiv = document.getElementById('toy-collection');
    
    targetDiv.appendChild(newDiv);
  }) 

 }



})
