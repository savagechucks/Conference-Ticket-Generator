// users should complete form with their details

// Error Messages for Validation
const nameError = document.querySelector(".full-name-input .error-message");
const emailError = document.querySelector(
  ".email-address-input .error-message"
);
const githubError = document.querySelector(
  ".github-username-input .error-message"
);

// upload field
const uploadField = document.getElementById("fileInput");
// full name field
const fullName = document.querySelector(".fullname");
// email field
const emailAddress = document.querySelector(".email");
// github field
const githubUsername = document.querySelector(".github");
// ticket generator btn
const ticketBtn = document.querySelector(".ticket");

//  File upload area to hide or show
const infoContainer = document.querySelector(".upload-input .info");
const infoIcon = document.querySelector(".upload-input .info-icon");
const infoText = document.querySelector(".upload-input .info-text");
const errorMessage = document.querySelector(".upload-input .error-message");

window.addEventListener("DOMContentLoaded", function () {
  inputFormDetails();
});

// Complete form with their details
function inputFormDetails() {
  ticketBtn.addEventListener("click", function (e) {
    e.preventDefault();
    // form values
    const nameValue = fullName.value.trim();
    const emailValue = emailAddress.value.trim();
    const githubValue = githubUsername.value.trim();
    const fileValue = uploadField.files[0];
    // Pattern for email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //image size
    const maxSize = 500 * 1024;
    // Allowed Image types
    const allowedTypes = ["image/jpeg", "image/png"];

    const isFormValid = validationField(
      nameValue,
      emailValue,
      githubValue,
      emailPattern,
      // file specific arguments
      fileValue,
      maxSize,
      allowedTypes,
      infoText,
      errorMessage,
      infoIcon
    );


    // checking the return value to decide next step
    if (isFormValid) {
      console.log("Validation Successful! Proceed to generate ticket.");
      
    } else {
      console.log("Validation Failed. Error messages displayed.");
      
    }
  });
}

// Validation Message Function
function validationField(
  name,
  email,
  github,
  pattern,
  // file specific parameters
  file,
  maxSize,
  allowedTypes,
  text,
  errorMsg,
  icon
) {
  const validations = [
    {
      input: fullName,
      error: nameError,
      isInvalid: name === "",
    },
    {
      input: emailAddress,
      error: emailError,
      isInvalid: !pattern.test(email),
    },
    {
      input: githubUsername,
      error: githubError,
      isInvalid: github === "",
    },
  ];

  let formIsValid = true;
  // 1. --- TEXT/INPUT VALIDATION (Use the forEach loop) ---
  validations.forEach((field) => {
    if (field.isInvalid) {
      field.error.classList.add("show");
      formIsValid = false;
    } else {
      field.error.classList.remove("show");
    }
  });

  // 2. --- FILE VALIDATION (Use a separate, dedicated block) ---

  let fileIsInvalid = false;
  let errorMessage = "File too large. Please upload a photo under 500KB";

  // first validation is to check if it's was really an avatar image that was uploaded
  if (!file) {
    fileIsInvalid = true;
    errorMessage = "Please upload an avatar image.";
  } else if (!allowedTypes.includes(file.type.toLowerCase())) {
    fileIsInvalid = true;
    errorMessage = "Invalid file type. Only jpg or png allowed.";
  } else if (file.size > maxSize) {
    fileIsInvalid = true;
    errorMessage = "File too large. Please upload a photo under 500KB";
  }


  if (fileIsInvalid) {
    errorMsg.textContent = errorMessage;
    errorMsg.classList.add('show');
    errorMsg.style.color = "hsl(7, 86%, 67%)";
    
    text.style.display = 'none';
  } else {
    errorMsg.classList.remove('show');
    text.style.display = 'block';
  }

  return formIsValid;
}