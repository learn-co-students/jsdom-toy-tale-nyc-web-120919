let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const toyCollection = document.getElementById("toy-collection")

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

  const getToy = (toy) => {
    let div = document.createElement('div')
    div.className = "card"
    div.dataset.id = toy.id
    div.innerHTML = `<h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes}</p><span>likes</span>
    <button class="like-btn">Like <3</button><br>
    <button class="delete-btn">Delete :(</button>`
    toyCollection.append(div)
  }

  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(function(toyData) {
    toyData.forEach(toy => getToy(toy))
  })

  toyForm.addEventListener("submit", function(event){
    event.preventDefault()
    let name = document.getElementsByClassName("input-text")[0].value
    let image = document.getElementsByClassName("input-text")[1].value
    let likes = 0
    let newToy = {name, image, likes}
    console.log(newToy)

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json"
      },
      body: JSON.stringify(newToy)
    }) // end fetch
    .then(response => response.json())
    .then(getToy(newToy))
  }) // ends event listener


  toyCollection.addEventListener("click", function(event){
    let id = event.target.parentNode.dataset.id
    if (event.target.className === "like-btn"){
      let likes = event.target.parentNode.childNodes[4]
      let newLikes = parseInt(likes.innerText)
      newLikes++
      likes.innerText = newLikes

      fetch(`http://localhost:3000/toys/${id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          accept: "application/json"
        },
        body: JSON.stringify({"likes": newLikes})
      })
    } // end like listener
    else if (event.target.className === "delete-btn"){
      let parentDiv = event.target.parentNode
      console.log(parentDiv)
      fetch(`http://localhost:3000/toys/${id}`, {
        method: "DELETE"
      })
      parentDiv.remove()
    } // end delete listener
  }) // end event listener
}) // end domLoaded



const testing = () => {
  for(i = 0; i < 10000000; i++){
    date = Date.new
  }
  console.log("done!")
}

fetchArg = jsfdiohfjishfeiworjfioshfwhfghfsdajfsf

fetch ("http://localhost:3000", fetchArg)


