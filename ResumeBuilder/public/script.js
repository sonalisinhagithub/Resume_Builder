//console.log("Adding new field");
function addNewWEField() {
  let newNode = document.createElement("textarea");
  newNode.classList.add("form-control");
  newNode.classList.add("weField");
  newNode.classList.add("mt-2");
  newNode.setAttribute("rows", 3);
  newNode.setAttribute("placeholder", "Enter here");

  let weOb = document.getElementById("we"); //let---Ob is used for find the referance
  let weAddButtonOb = document.getElementById("weAddButton");

  weOb.insertBefore(newNode, weAddButtonOb);
}

function addNewAQField() {
  let newNode = document.createElement("textarea");
  newNode.classList.add("form-control");
  newNode.classList.add("eqField");
  newNode.classList.add("mt-2");
  newNode.setAttribute("rows", 3);
  newNode.setAttribute("placeholder", "Enter here");

  let aqOb = document.getElementById("aq"); //let---Ob is used for find the referance
  let aqAddButtonOb = document.getElementById("aqAddButton");

  aqOb.insertBefore(newNode, aqAddButtonOb);
}

//generating cv

// function generateCV() {
//   console.log('gcv');
//   {
//     // console.log("generating cv");
//     // let nameField = document.getElementById("nameField").value;
//     // let nameT1 = document.getElementById("nameT1");
//     // nameT1.innerHTML = nameField;
//     // direct
//     // document.getElementById("nameT2").innerHTML = nameField;
//     // //contact
//     // document.getElementById("contactT").innerHTML = document.getElementById("contactField").value;
//     // //address
//     // document.getElementById("addressT").innerHTML = document.getElementById("addressField").value;
//     // document.getElementById("linkedT").innerHTML = document.getElementById("linkedField").value;
//     // document.getElementById("fbT").innerHTML =  document.getElementById("fbField").value;
//     // document.getElementById("instaT").innerHTML =  document.getElementById("instaField").value;
//     //objective
//     // document.getElementById("objectiveT").innerHTML =
//     //   document.getElementById("objectiveField").value;
//     //work experience
//     // let wes = document.getElementsByClassName("weField");
//     // let str = "";
//     // for (let e of wes) {
//     //   str = str + `<li> ${e.value} </li>`;
//     // }
//     // document.getElementById("weT").innerHTML = str;
//     // //acadmic
//     // let aqs = document.getElementsByClassName("eqField");
//     // let str1 = "";
//     // for (let e of aqs) {
//     //   str1 = str1 + `<li> ${e.value} </li>`;
//     // }
//     // document.getElementById("aqT").innerHTML = str1;
//   }
//   // code for setting img
//   let file = document.getElementById("imgField").files[0];
//   console.log(file);

//   let reader = new FileReader();
//   reader.readAsDataURL(file);
//   console.log(reader.result);

//   //set the image into template
//   reader.onloadend = function () {
//     document.getElementById("imgTemplate").src = reader.result;
//   };
// }


document.getElementById('imgField').addEventListener('change', function() {
  const file = this.files[0];
  if (file) {
      const formData = new FormData();
      formData.append('imgField', file, 'profile.jpg');

      fetch('/upload-image', {
          method: 'POST',
          body: formData,
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }
});
