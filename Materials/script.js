
var countSubmit = 0;
let list;
let formName;
let formUrl;
let addButton;
let updateButton;

function clickAboutUs() {
  console.log("Home");
  document.getElementById("list").innerHTML = "";
  document.getElementById("list1").innerHTML = "";

  const new_p = document.createElement("p");
  new_p.innerText = "Welcome to our page!";
  const new_p2 = document.createElement("p");
  new_p2.innerText =
    "We are the new real thing in the modeling area!";
  const new_p3 = document.createElement("p");
  new_p3.innerText =
    "Models promote unique face shapes and unique personalities! It doesn't matter if you're a girl, a boy, your skin colour or your body type!";
  document.getElementById("list").appendChild(new_p);
  document.getElementById("list").appendChild(new_p2);
  document.getElementById("list").appendChild(new_p3);

  
}

function clickListModels() {
  
  document.getElementById("list").innerHTML = "";
  document.getElementById("list1").innerHTML = "";
  
  const poza = document.createElement("img");
  poza.src = "https://assets.vogue.com/photos/60a027646228981928ccf0d5/4:3/w_2560%2Cc_limit/Screen-Shot-2021-04-30-at-3.38.21-PM.png";
  const new_p = document.createElement("p");
  new_p.innerText = "Griff Is Pop’s Next Powerhouse—And She Makes Her Own Clothes, Too";
  const new_p3 = document.createElement("p");
  new_p3.innerText =
    "On Tuesday night, the British music world’s great and good came together for the first in-person celebration of music in over a year, the Brit Awards. The starry line-up of attendees included the likes of Taylor Swift, Harry Styles, and Olivia Rodrigo, but the night also marked the anointing of a bold new voice in music: the up-and-coming bedroom pop musician Griff. Not only did the emerging musician take home the Rising Star Award, previously won by the likes of Adele and Florence and the Machine, but she also delivered a show-stopping performance of her latest single “Black Hole.” Oh, and if that wasn’t enough, she wore a hand-made dress of her own design while doing so.";
    const new_p4 = document.createElement("p");
    new_p4.innerText =" “I was very nervous, as the last live show—in fact, the first live show I ever did—was with 200 people in the room, and then COVID happened, and so the next time I did a live show was at the O2 Arena, which is completely nuts,” says Griff. For her performance, she crafted a deconstructed ball gown from icy blue satin, the various panels attached with eyelets. While it brilliantly complemented Griff’s bold moves as she twirled around the stage, it also served as a perfect foil to the post-apocalyptic backdrop for the performance, which featured an enormous fabric sheet with a hole burned in the middle—a reference to the song’s title—and wooden decking for her backing musicians. “It was definitely overwhelming, but I think sometimes when it's more intimate it can be even more nerve-wracking,” Griff adds. “It was nice to get lost in the arena a little bit.”"
  document.getElementById("list").appendChild(poza);
  document.getElementById("list").appendChild(new_p);
  document.getElementById("list").appendChild(new_p3);
  document.getElementById("list").appendChild(new_p4);
}

function clickModelList() {
  console.log("Model list");
  document.getElementById("list").innerHTML = "";
  document.getElementById("list1").innerHTML = "";
 

  const br_elem3 = document.createElement("br");
  document.getElementById("list1").appendChild(br_elem3);

  const br_elem4 = document.createElement("br");
  document.getElementById("list1").appendChild(br_elem4);

  var input1_model = document.createElement("INPUT");
  input1_model.setAttribute("type", "text");
  input1_model.setAttribute("name", "name");
  input1_model.setAttribute("placeholder", "First and Last Name");
  input1_model.setAttribute("id", "formName");
  input1_model.classList.add("in-class");
  document.getElementById("list1").appendChild(input1_model);

  var input2_model = document.createElement("INPUT");
  input2_model.setAttribute("type", "text");
  input2_model.setAttribute("name", "url");
  input2_model.setAttribute("placeholder", "Age");
  input2_model.setAttribute("id", "formUrl");
  input2_model.classList.add("in-class");
  document.getElementById("list1").appendChild(input2_model);


  //-----------------------------------------


  var input3_model = document.createElement("INPUT");
  input3_model.setAttribute("type", "text");
  input3_model.setAttribute("name", "height");
  input3_model.setAttribute("placeholder", "Height");
  input3_model.setAttribute("id", "formHeight");
  input3_model.classList.add("in-class");
  document.getElementById("list1").appendChild(input3_model);


  var input4_model = document.createElement("INPUT");
  input4_model.setAttribute("type", "text");
  input4_model.setAttribute("name", "image");
  input4_model.setAttribute("placeholder", "Image");
  input4_model.setAttribute("id", "formImage");
  input4_model.classList.add("in-class");
  document.getElementById("list1").appendChild(input4_model);

  //-----------------------------------------

  var add_model = document.createElement("input");
  add_model.setAttribute("type", "button");
  add_model.setAttribute("value", "ADD");
  add_model.setAttribute("id", "addButton");
  add_model.classList.add("in-class");
  add_model.addEventListener("click", postModel);
  document.getElementById("list1").appendChild(add_model);

  var update_model = document.createElement("input");
  update_model.setAttribute("type", "button");
  update_model.setAttribute("value", "UPDATE");
  update_model.setAttribute("id", "updateButton");
  document.getElementById("list1").appendChild(update_model);
  //addButton.addEventListener('click', postModel);
  //console.log(addButton);
  list = document.getElementById("list");
  formName = document.getElementById("formName");
  formUrl = document.getElementById("formUrl");
  formHeight = document.getElementById("formHeight");
  formImage = document.getElementById("formImage");
  addButton = document.getElementById("addButton");
  updateButton = document.getElementById("updateButton");

  getModels();
}



function getModels() {
  fetch("http://localhost:3000/models").then(function (response) {
    // Trasform server response to get the dogs
    response.json().then(function (models) {
      appendModelsToDOM(models);
    });
  });
}

// post dogs
function postModel() {
  // creat post object
  const postObject = {
    name: formName.value,
    age: formUrl.value,
    height:formHeight.value,
    image:formImage.value,
  };
  // post dog
  fetch("http://localhost:3000/models", {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(postObject),
  }).then(function () {
    // Get the new dogs list
    getModels();
    // Reset Form
    resetForm();
  });
}

// delete dog
function deleteModel(id) {
  // delete dog
  fetch(`http://localhost:3000/models/${id}`, {
    method: "DELETE",
  }).then(function () {
    // Get the new dogs list
    getModels();
  });
}

// update dog
function updateModel(id) {
  // creat put object
  const putObject = {
    name: formName.value,
    age: formUrl.value,
    height:formHeight.value,
    image:formImage.value,
  };
  // update dog
  fetch(`http://localhost:3000/models/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(putObject),
  }).then(function () {
    // Get the new dogs list
    getModels();

    // change button event from update to add
    addButton.disabled = false;

    // remove all event from update button
    clearUpdateButtonEvents();

    // Reset Form
    resetForm();
  });
}

// copy edited dog information to form and add event listener on update button
function editModel(model) {
  // copy dog information to form
  formName.value = model.name;
  formUrl.value = model.age;
  formHeight.value = model.height;
  formUrl.value = model.image;

  // disable add button
  addButton.disabled = true;

  // clear all events update button events
  clearUpdateButtonEvents();

  // enable and add event on update button
  updateButton.disabled = false;
  updateButton.addEventListener("click", function () {
    updateModel(model.id);
  });
}

// Create and append img and name DOM tags
function appendModelsToDOM(models) {
  //remove dog list if exist
   while (list.firstChild) {
       list.removeChild(list.firstChild);
   }
  // create and append tags
  for (let i = 0; i < models.length; i++) {
    // create name obj
    let name = document.createElement("span");
    name.innerText = models[i].name;

    // create image obj
    let img = document.createElement("p");
    img.innerText = models[i].age;

    //create height obj

    let height = document.createElement("p");
    height.innerText = models[i].height;

    // img obj

    let imagep = document.createElement("img");
    imagep.src = models[i].image;

    const hrk = document.createElement("hr");

    // create button and event for edit and delete
    let editButton = document.createElement("button");
    // add event on btn and pass dog id more at https://stackoverflow.com/questions/256754/how-to-pass-arguments-to-addeventlistener-listener-function
    editButton.addEventListener("click", function () {
      editModel(models[i]);
    });
    editButton.innerText = "Edit";
    let deleteButton = document.createElement("button");
    // add event on btn and pass dog object more at https://stackoverflow.com/questions/256754/how-to-pass-arguments-to-addeventlistener-listener-function
    deleteButton.addEventListener("click", function () {
      deleteModel(models[i].id);
    });
    deleteButton.innerText = "Delete";
    // create a container for img and name
    let container = document.createElement("div");
    // append elements to container
    container.appendChild(name);
    container.appendChild(editButton);
    container.appendChild(deleteButton);
    container.appendChild(img);
    container.appendChild(height);
    container.appendChild(imagep);
    container.appendChild(hrk);


    // append container to DOM (list div)
    list.appendChild(container);
  }
}

// reset form
function resetForm() {
  formName.value = "";
  formUrl.value = "";
}
//  remove Update Button to clear events more at https://stackoverflow.com/questions/9251837/how-to-remove-all-listeners-in-an-element
function clearUpdateButtonEvents() {
  let newUpdateButton = updateButton.cloneNode(true);
  updateButton.parentNode.replaceChild(newUpdateButton, updateButton);
  updateButton = document.getElementById("updateButton");
}
// add event listener on add button
// addButton.addEventListener('click', postModel);
// console.log(addButton);
