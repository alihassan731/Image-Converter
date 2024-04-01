function updateIcon() {
  var selectedIcon = document.getElementById("icon-dropdown").value;
  var iconSize = document.getElementById("icon-size-slider").value;
  var iconColor = document.getElementById("color-picker").value;
  var iconContainer = document.getElementById("icon-container");

  iconContainer.innerHTML =
    '<i class="' +
    selectedIcon +
    '" style="font-size: ' +
    iconSize +
    "px; color: " +
    iconColor +
    ';"></i>';
}

document.getElementById("icon-dropdown").addEventListener("change", updateIcon);
document
  .getElementById("icon-size-slider")
  .addEventListener("input", updateIcon);
document.getElementById("color-picker").addEventListener("input", updateIcon);

document.getElementById("download-btn").addEventListener("click", function () {
  var iconContainer = document.getElementById("icon-container");

  html2canvas(iconContainer, { backgroundColor: null }).then(function (canvas) {
    var dataURL = canvas.toDataURL("image/png");

    var downloadLink = document.createElement("a");
    downloadLink.href = dataURL;
    downloadLink.download = "icon.png";

    downloadLink.click();
  });
});

updateIcon(); // Initial update to display the default selected icon
