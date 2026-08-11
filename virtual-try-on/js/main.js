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
    console.log(currenIndex);
    imgElement.src = clothes_img[currenIndex];
  });
  function randomize() {
    const randomInt = Math.floor(Math.random() * clothes_img.length);
    imgElement.src = clothes_img[randomInt];
  }
  function getCurrent() {
    return imgElement.src;
  }
  return { randomize, getCurrent };
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
const previewImgElement = document.getElementById("preview-img");
const progressWindowElement = document.querySelector(".progress-window");
const blueProgressingContainer = document.getElementById("blue-rectangular");
const progressWindowTitleElement = document.getElementById("progress-title");

const total = 20;

outfitTranferElement.addEventListener("click", () => {
  blueProgressingContainer.innerHTML = "";
  progressWindowElement.style.display = "flex";
  let percent = 0;
  const timeId = setInterval(() => {
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
