const container = document.querySelector(".container");
const cards = Array.from(document.querySelectorAll(".card"));
let isAnimating = false;

function updateCards(direction) {
  if (isAnimating) return;
  isAnimating = true;

  container.classList.add(direction === "down" ? "scroll-down" : "scroll-up");

  setTimeout(() => {
    if (direction === "down") {
      const firstCard = cards.shift(); //remove the first card
      cards.push(firstCard); //add the first card to the end
    } else {
      const lastCard = cards.pop(); //remove the last card
      cards.unshift(lastCard); //add the last card to the beginning
    }

    container.innerHTML = "";
    cards.forEach((card, index) => {
      card.classList.remove("middle-card");
      container.appendChild(card);
      if (index === 1) {
        card.classList.add("middle-card");
      }
    });
    container.classList.remove("scroll-down", "scroll-up");
    isAnimating = false;
  }, 300);
}

function handleScroll(event) {
  if (event.deltaY > 0 || event.key === "ArrowDown") {
    updateCards("down");
  } else if (event.deltaY < 0 || event.key === "ArrowUp") {
    updateCards("up");
  }
}

document.addEventListener("wheel", handleScroll);
document.addEventListener("keydown", handleScroll);
