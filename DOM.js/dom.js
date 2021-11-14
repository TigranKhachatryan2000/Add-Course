const addbtn = document.querySelector("header .btn");
const modal = document.getElementById("add-modal");
const backDrop = document.querySelector(".backdrop");
const cencel = document.querySelector(".modal .btn-passive");
const modalInputs = document.querySelectorAll("#add-modal input");
const addModalInfo = document.querySelector(".modal-actions .btn-success");
const ulElement = document.querySelector("main ul");
const confirmBtn = document.querySelector("main .close");
const modalConfirm = document.getElementById("delete-modal");
const cencelConfirm = document.querySelector("#delete-modal .btn-passive");
const yesConfirm = document.querySelector("#delete-modal .btn-danger");


const title = document.getElementById("title");
const imageUrl = document.getElementById("image-url");
const rating = document.getElementById("rating");

const titleText = "* Title must required";
const imageText = "* Image must required";
const ratingText = "* Rating must required";

const courses = [
   {
      id: 652314,
      title: "Advance JavaScript",
      imageUrl: "../img.DOM/js,jpg.png",
      rating: 5,
   }
]

let validate;

const openModal = () => {
    modal.classList.add("visible");
    backDrop.classList.add("visible");
}

const resetModal = () => {
   for( const inputValue of modalInputs ) {
      inputValue.value = "";
   }
}

const closeModal = () => {
   modal.classList.remove("visible");
   backDrop.classList.remove("visible");
   resetModal();
   removeRequiredText();
}

const removeRequiredText = () => {
   let removeText = document.querySelectorAll("em");
   for( const removeTxt of removeText ) {
      removeTxt.remove();
   }
}

const validateFuilds = (curInput) => {
   let worningText = () => 
    curInput === title ? titleText : curInput === imageUrl ? imageText : ratingText;
    if( curInput.value.trim() === "" ) {
       let em = document.createElement("em");
       em.textContent = worningText();
       em.classList.add("requiredText");
       curInput.after(em);
    } else if ( curInput.nextElementSibling && curInput.nextElementSibling.nodeName === "EM" ) {
       curInput.nextElementSibling.remove();
    }
}


const addInfo = () => {
   removeRequiredText();
   validate = false;
   for( const element of modalInputs ) {
      if( element.value.trim() === "" ) {
         validate = true;
         break;
      }
   } if( !validate ) {
      const course = {
         id: Math.ceil(Math.random() * 1000000 ),
         title: title.value,
         imageUrl: imageUrl.value,
         rating: rating.value,
      }
      courses.push(course);
      let liElement = document.createElement("li");
      liElement.innerHTML = ` <img src=${course.imageUrl} alt=${course.title}>
      <div class="course-info">
      <h2> ${course.title} </h2>
      <p> ${course.rating} / 5 stars </p>
      </div>
      <span class="close"> &times; </span> `
     ulElement.append(liElement);
     closeModal();
   } else {
      let requiredText = document.querySelectorAll("em");
      for( const el of modalInputs ) {
         validateFuilds(el);
      }
   }
}

const openConfirm = () => {
    modalConfirm.classList.add("visible");
    backDrop.classList.add("visible");
}

const closeConfirm = () => {
   modalConfirm.classList.remove("visible");
   backDrop.classList.remove("visible");
   resetModal();
}

const deleteCourse = () => {
   ulElement.remove();
   closeModal();
   closeConfirm();
   for( const course of courses ) {
      if( ulElement.id.split("-")[1] === course.id ) {
         course.splice(courses.indexOf(course), 1);
         return;
      }
   }
}

addbtn.addEventListener("click", openModal);
cencel.addEventListener("click", closeModal);
backDrop.addEventListener("click", () => {
   closeModal();
   closeConfirm();
});
addModalInfo.addEventListener("click", addInfo);
confirmBtn.addEventListener("click", openConfirm);
cencelConfirm.addEventListener("click", closeConfirm);
yesConfirm.addEventListener("click", deleteCourse);

