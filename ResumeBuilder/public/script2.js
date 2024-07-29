// Fetch resume data using query parameter ID and populate the HTML
window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (id) {
    fetch(`/get-resume?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Example of populating data, add more as needed
        document.getElementById("nameT2").innerHTML = `${data.name}`;

        document.getElementById("imgTemplate").innerHTML = `
          <img
              src="/uploads/profile.jpg"
              alt="Profile Picture"
              style="width: 200px; height: 250px;border-radius:100px"
            />
        `;

        document.getElementById("personal-info").innerHTML = `
                            <p id="nameT1">${data.name}</p>
                            <p id="contactT">${data.contact}</p>
                            <p id="addressT">${data.address}</p>
                            <hr />
                            <p id="linkedT"></p>
                            <p id="githubT"></p>
                        `;
        document.getElementById("objective-info").innerHTML = `
                            <p>${data.objective}</p>
                        `;
        document.getElementById("work-experience").innerHTML = `
                            <p>${data.workExperience}</p>
                        `;
        document.getElementById("academic-qualification").innerHTML = `
                            <p>${data.academicQualification}</p>
                        `;
        document.getElementById("linkedT").innerHTML = `
              <a href="https://${data.linkedIn}">${data.linkedIn}</a>
                        `;
        document.getElementById("githubT").innerHTML = `
              <a href="https://${data.github}" target="_blank">${data.github}</a>
                        `;
        // Continue for other sections...

        let file = document.getElementById("imgField").files[0];
        console.log(file);

        let reader = new FileReader();
        reader.readAsDataURL(file);
        console.log(reader.result);

        //set the image into template
        reader.onloadend = function () {
          document.getElementById("imgTemplate").src = reader.result;
        };
      })
      .catch((error) => console.error("Error fetching resume data:", error));
  }
};

//print CV
function printCV() {
  window.print();
}
