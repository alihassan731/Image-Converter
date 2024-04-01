const textarea = document.querySelector("textarea"),
  fileNameInput = document.querySelector(".file-name input"),
  selectMenu = document.querySelector(".save-as select"),
  saveBtn = document.querySelector(".save-btn");

selectMenu.addEventListener("change", () => {
  const selectedFormat = selectMenu.options[selectMenu.selectedIndex].text;
  saveBtn.innerText = `Save As ${selectedFormat.split(" ")[0]} File`;
});

saveBtn.addEventListener("click", () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Set text properties
  const fontSize = 16;
  const fontFamily = "Arial";
  const maxWidth = 400; // Set the maximum width of the rectangular image

  ctx.font = `${fontSize}px ${fontFamily}`;
  ctx.fillStyle = "#000000"; // Set text color

  // Split the textarea content into words
  const words = textarea.value.split(" ");
  let currentLine = "";
  let lines = [];

  // Create lines with words that fit within the maxWidth
  words.forEach((word) => {
    const testLine = currentLine + word + " ";
    const testWidth = ctx.measureText(testLine).width;
    if (testWidth > maxWidth) {
      lines.push(currentLine.trim());
      currentLine = word + " ";
    } else {
      currentLine = testLine;
    }
  });

  // Push the last line
  lines.push(currentLine.trim());

  // Set canvas size based on text size
  canvas.width = maxWidth;
  canvas.height = lines.length * fontSize + 10; // Add some padding

  // Draw the text on the canvas
  ctx.fillStyle = "#FFFFFF"; // Set background color (optional)
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#000000"; // Set text color

  lines.forEach((line, index) => {
    const y = fontSize + index * fontSize;
    ctx.fillText(line, 10, y); // Adjust the position as needed
  });

  // Convert canvas to data URL (PNG format)
  const dataUrl = canvas.toDataURL("image/png");

  // Create a blob from the data URL
  const blob = dataURItoBlob(dataUrl);

  // Create a link and trigger a download
  const link = document.createElement("a");
  link.download = fileNameInput.value + ".png";
  link.href = URL.createObjectURL(blob);
  link.click();
});

// Function to convert data URL to Blob
function dataURItoBlob(dataURI) {
  const byteString = atob(dataURI.split(",")[1]);
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}
