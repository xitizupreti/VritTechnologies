const container = document.querySelector(".container");
const cards = Array.from(document.querySelectorAll(".card"));
let isAnimating = false;

function updateCards(direction) {
  if (isAnimating) return; // Prevent multiple animations
  isAnimating = true;

  // Add the appropriate animation class
  container.classList.add(`scroll-${direction}`);

  // Wait for animation to complete before reordering and updating
  setTimeout(() => {
    // Reorder cards based on direction
    direction === "down"
      ? cards.push(cards.shift()) // Move the first card to the end
      : cards.unshift(cards.pop()); // Move the last card to the beginning

    // Update the DOM and assign the "middle-card" class
    updateDOM();

    // Reset animation state
    container.classList.remove(`scroll-${direction}`);
    isAnimating = false;
  }, 300); // Match with CSS animation duration
}

function updateDOM() {
  container.innerHTML = ""; // Clear existing cards
  cards.forEach((card, index) => {
    card.classList.toggle("middle-card", index === 1); // Add "middle-card" to the second card
    container.appendChild(card); // Append the card to the container
  });
}

function handleScroll(event) {
  const direction =
    event.deltaY > 0 || event.key === "ArrowDown" ? "down" : "up";
  updateCards(direction);
}

// Event listeners for scroll and key press
document.addEventListener("wheel", handleScroll);
document.addEventListener("keydown", handleScroll);
