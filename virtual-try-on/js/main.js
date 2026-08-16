const tops = [
  "https://placehold.co/150x180?text=Top+1",
  "https://placehold.co/150x180?text=Top+2",
  "https://placehold.co/150x180?text=Top+3",
];
const bottoms = [
  "https://placehold.co/150x180?text=Bottom+1",
  "https://placehold.co/150x180?text=Bottom+2",
  "https://placehold.co/150x180?text=Bottom+3",
  "https://placehold.co/150x180?text=Bottom+4",
];
const defautModelImg = "https://placehold.co/300x400";
const previewImgElement = document.getElementById("preview-img");
previewImgElement.src = defautModelImg;
function carousel_control_button(
  id,
  clothes_img,
  next_button,
  previous_button,
) {
  let currenIndex = 0;
  const imgElement = document.getElementById(id);
  const next_Button = document.getElementById(next_button);
  const previous_Button = document.getElementById(previous_button);
  next_Button.addEventListener("click", () => {
    currenIndex++;
    if (currenIndex >= clothes_img.length) {
      currenIndex = 0;
    }
    imgElement.src = clothes_img[currenIndex];
  });
  previous_Button.addEventListener("click", () => {
    currenIndex--;
    if (currenIndex < 0) {
      currenIndex = clothes_img.length - 1;
    }
    imgElement.src = clothes_img[currenIndex];
  });
  function randomize() {
    const randomInt = Math.floor(Math.random() * clothes_img.length);
    imgElement.src = clothes_img[randomInt];
  }
  function getCurrent() {
    return imgElement.src;
  }
  function update_carousel(clothes_img) {
    const after_upload_index = clothes_img.length - 1;
    imgElement.src = clothes_img[after_upload_index];
  }

  return { randomize, getCurrent, update_carousel };
}

const randomizeTop = carousel_control_button(
  "top-img",
  tops,
  "top-next-button",
  "top-previous-button",
);
const randomizeBottom = carousel_control_button(
  "bottom-img",
  bottoms,
  "bottom-next-button",
  "bottom-previous-button",
);
const randomButtonElement = document.getElementById("random-button");
randomButtonElement.addEventListener("click", () => {
  randomizeTop.randomize();
  randomizeBottom.randomize();
});

const selectButtonElement = document.getElementById("select-button");

function getOutfit() {
  return {
    top: randomizeTop.getCurrent(),
    bottom: randomizeBottom.getCurrent(),
  };
}
let selectedItems = {};
selectButtonElement.addEventListener("click", () => {
  selectedItems = getOutfit();
  console.log(selectedItems);
});

const outfitTranferElement = document.getElementById("outfittranfer-button");
const progressWindowElement = document.querySelector(".progress-window");
const blueProgressingContainer = document.getElementById("blue-rectangular");
const progressWindowTitleElement = document.getElementById("progress-title");

const total = 20;
let timeId = null;

outfitTranferElement.addEventListener("click", () => {
  blueProgressingContainer.innerHTML = "";
  progressWindowElement.style.display = "flex";
  let percent = 0;
  timeId = setInterval(() => {
    const fragment = document.createDocumentFragment();
    percent += 20;
    progressWindowTitleElement.textContent = `Downloading ${percent}%`;
    if (percent >= 100) {
      clearInterval(timeId);
      progressWindowElement.style.display = "none";
      previewImgElement.src = selectedItems.top;
    }
    const displayBoxNumber = Math.floor((total * percent) / 100);
    blueProgressingContainer.innerHTML = "";
    for (let i = 0; i < displayBoxNumber; i++) {
      const newDiv = document.createElement("div");
      newDiv.classList.add("rectangular-box");
      fragment.appendChild(newDiv);
    }
    blueProgressingContainer.appendChild(fragment);
  }, 600);
});
const cancelButton = document.getElementById("cancel-button");
cancelButton.addEventListener("click", () => {
  progressWindowElement.style.display = "none";
  clearInterval(timeId);
});
const removeGarment = document.getElementById("remove-garments");
removeGarment.addEventListener("click", () => {
  previewImgElement.src = defautModelImg;
  selectedItems = {};
});

function setupUploadTrigger(
  inputId,
  buttonId,
  clothesArray,
  update_carousel_object,
) {
  const fileInput = document.getElementById(inputId);
  const customBtn = document.getElementById(buttonId);
  customBtn.addEventListener("click", () => {
    fileInput.click();
  });
  fileInput.addEventListener("change", () => {
    const files = fileInput.files;
    for (const file of files) {
      const url = URL.createObjectURL(file);
      clothesArray.push(url);
    }
    update_carousel_object.update_carousel(clothesArray);
  });
}
setupUploadTrigger(
  "file-upload-tops",
  "custom-upload-top-btn",
  tops,
  randomizeTop,
);
setupUploadTrigger(
  "file-upload-bottoms",
  "custom-upload-bottoms-btn",
  bottoms,
  randomizeBottom,
);
