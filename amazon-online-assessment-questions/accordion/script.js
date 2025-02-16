const multiSelectButton = document.getElementById("multiselect");
const accordionList = document.querySelectorAll(".accordion");
// console.log(accordionList[0].childNodes[1].children[1].classList);

accordionList[0].childNodes[1].children[1].classList.remove("expand-icon");
for (let i = 1; i < accordionList.length; i++) {
  accordionList[i].childNodes[1].children[2].classList.remove("collapse-icon");
  accordionList[i].childNodes[3].style.display = "none";
}

for (let i = 0; i < accordionList.length; i++) {
  accordionList[i].addEventListener("click", function () {
    if (multiSelectButton.checked) {
      // allow multiple accordions to stay opened
      if (
        accordionList[i].childNodes[1].children[1].classList.contains(
          "expand-icon"
        )
      ) {
        accordionList[i].childNodes[1].children[1].classList.remove(
          "expand-icon"
        );
        accordionList[i].childNodes[1].children[2].classList.add(
          "collapse-icon"
        );
        accordionList[i].childNodes[3].style.display = "inline-block";
      } else {
        accordionList[i].childNodes[1].children[1].classList.add("expand-icon");
        accordionList[i].childNodes[1].children[2].classList.remove(
          "collapse-icon"
        );
        accordionList[i].childNodes[3].style.display = "none";
      }
    } else {
      // close all accordions except the one clicked on. Close that as well if it was already open
      for (let j = 0; j < accordionList.length; j++) {
        accordionList[j].childNodes[1].children[1].classList.add("expand-icon");
        accordionList[j].childNodes[1].children[2].classList.remove(
          "collapse-icon"
        );
        accordionList[j].childNodes[3].style.display = "none";
      }
      accordionList[i].childNodes[1].children[1].classList.remove(
        "expand-icon"
      );
      accordionList[i].childNodes[1].children[2].classList.add("collapse-icon");
      accordionList[i].childNodes[3].style.display = "inline-block";
    }
  });
}
