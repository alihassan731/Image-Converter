var translator = "";
var downloadName = "";
function handleFileSelect() {
  const fileInput = document.getElementById("fileInput");
  const allowedTypes = ["image/gif"];

  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const fileType = file.type;
    var fileName = file.name;

    if (!allowedTypes.includes(fileType)) {
      alert("Please select a valid GIF file.");
      translator = "";
      downloadName = "";
      fileInput.value = ""; // Clear the file input
      const imgDemoContainer = document.getElementById("imgdemo");

      // Check if there is an existing image in the container
      const existingImg = imgDemoContainer.querySelector("img");
      // If an existing image is found, remove it
      if (existingImg) {
        imgDemoContainer.removeChild(existingImg);
      }
      return;
    } else {
      downloadName = fileName.split(".").slice(0, -1).join(".");
      displaySelectedImage();
      upload();
    }

    // Your additional logic for valid file type
    console.log("Valid file selected:", file.name);
  }
}
function displaySelectedImage() {
  const fileInput = document.getElementById("fileInput");
  const imgDemoContainer = document.getElementById("imgdemo");

  // Check if there is an existing image in the container
  const existingImg = imgDemoContainer.querySelector("img");
  // If an existing image is found, remove it
  if (existingImg) {
    imgDemoContainer.removeChild(existingImg);
  }

  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      // Create a new img element
      const imgElement = document.createElement("img");
      imgElement.src = e.target.result;
      imgElement.alt = "not available";
      imgElement.width = 200;
      imgElement.height = 150;
      imgElement.style.paddingLeft = "30px";

      // Append the new img element to the container
      imgDemoContainer.appendChild(imgElement);
    };

    reader.readAsDataURL(file);
  }
}

function upload() {
  // alert("this is good");
  var input = document.querySelector("#fileInput");
  var file = input.files[0];
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    // alert(reader.result);
    translator = reader.result;
  };
}

function convertToGif() {
  if (translator == "") {
    alert("Please select the image before Convert WEBP");
  } else {
    displayConvertedGif();
    createDownloadButton();
  }
}

function displayConvertedGif() {
  const imgDemoContainer = document.getElementById("imgdemo");
  const existingImg = imgDemoContainer.querySelector("img");

  if (existingImg) {
    existingImg.src = translator.replace("data:image/gif", "data:image/webp");
  }
}

function createDownloadButton() {
  const downloadButton = document.createElement("button");
  downloadButton.textContent = "Download";
  downloadButton.onclick = downloadBtn;

  const heloContainer = document.getElementById("dbtn");
  heloContainer.innerHTML = ""; // Clear previous content
  heloContainer.appendChild(downloadButton);
}
function downloadBtn() {
  let result = translator.replace("data:image/gif", "data:image/webp");
  let a = document.createElement("a");
  a.href = result;
  a.download = downloadName + ".webp";
  a.click();
}
