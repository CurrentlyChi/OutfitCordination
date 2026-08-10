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
  console.log(clothes_img[currenIndex]);
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
    console.log("ok");
  }
  return randomize;
}
carousel_control_button(
  "top-img",
  tops,
  "top-next-button",
  "top-previous-button",
);
carousel_control_button(
  "bottom-img",
  bottoms,
  "bottom-next-button",
  "bottom-previous-button",
);
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
  randomizeTop();
  randomizeBottom();
});
