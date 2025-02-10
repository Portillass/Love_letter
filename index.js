//->Made it by 1vanbrav0
//Variables
let mobile_media_query = window.matchMedia("(max-width: 400px)");
let tablet_media_query = window.matchMedia(
  "(min-width: 400px) and (max-width: 600px)"
);
const notes = document.querySelectorAll(".js-note");

//-> Function that resets the size of the notes.
function recize_notes() {
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].classList.contains("active")) {
      notes[i].classList.remove("active");
      gsap.set(notes[i], {
        height: "30%",
        clearProps: "all"
      });
    }
  }
}

//-> Main function that enables all the notes.
function notes_ready() {
  gsap.to(".js-envelop-content", {
    height: "110%",
    duration: 0.5
  });

  for (let i = 0; i < notes.length; i++) {
    notes[i].addEventListener("click", function () {
      if (mobile_media_query.matches) {
        if (this.classList.contains("active")) {
          this.classList.remove("active");
          gsap.set(this, {
            height: "30%",
            clearProps: "all"
          });
        } else {
          recize_notes();
          this.classList.add("active");
          gsap.set(this, {
            height: 125 + 40 * i + "%"
          });
        }
      } else if (tablet_media_query.matches) {
        if (this.classList.contains("active")) {
          this.classList.remove("active");
          gsap.set(this, {
            height: "30%",
            clearProps: "all"
          });
        } else {
          recize_notes();
          this.classList.add("active");
          gsap.set(this, {
            height: 80 + 21 * i + "%"
          });
        }
      } else {
        if (this.classList.contains("active")) {
          this.classList.remove("active");
          gsap.set(this, {
            height: "30%",
            clearProps: "all"
          });
        } else {
          recize_notes();
          this.classList.add("active");
          gsap.set(this, {
            height: 70 + 20 * i + "%"
          });
        }
      }
    });
  }
}

//-> Function that set up the up paper of the envelope.
function set_up_paper() {
  var arr = [0, 0, 100, 0, 50, 61];
  gsap.set(".js-up-paper", {
    bottom: "97%",
    rotation: 180,
    zIndex: 200,
    clipPath:
      "polygon(" +
      arr[0] +
      "%" +
      arr[1] +
      "%," +
      arr[2] +
      "%" +
      arr[3] +
      "%," +
      arr[4] +
      "%" +
      arr[5] +
      "%)",
    onComplete: notes_ready
  });
}

//-> Function that starts the up paper transition.
function envelop_transition() {
  gsap.to(".js-up-paper", {
    bottom: "1%",
    duration: 0.25,
    onComplete: set_up_paper
  });
  document
    .querySelector(".js-up-paper")
    .removeEventListener("click", envelop_transition);
  document.querySelector(".js-up-paper").classList.remove("cursor");
}

//-> Function that allows cut the sticker.
function handleSticker() {
  gsap.set(".js-sticker", { width: "20%", left: "-80%" });
  document.body.classList.remove("scissors");
  document.querySelector(".js-sticker").removeEventListener("click", handleSticker);
  document
    .querySelector(".js-up-paper")
    .addEventListener("click", envelop_transition);
  document.querySelector(".js-up-paper").classList.add("cursor");
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const stickerElement = document.querySelector(".js-sticker");
    if (stickerElement) {
        stickerElement.addEventListener("click", handleSticker);
    }
});

window.onresize = recize_notes;

function moveButton() {
    const button = document.querySelector('.no-btn');
    
    // Get viewport dimensions with safety margin
    const viewportWidth = window.innerWidth - 20; // 10px margin on each side
    const viewportHeight = window.innerHeight - 20; // 10px margin on each side
    
    // Get button dimensions
    const buttonWidth = button.offsetWidth;
    const buttonHeight = button.offsetHeight;
    
    // Calculate maximum positions to keep button fully visible
    const maxX = viewportWidth - buttonWidth;
    const maxY = viewportHeight - buttonHeight;
    
    // Random position within safe bounds
    const randomX = Math.min(Math.max(10, Math.random() * maxX), maxX - 10);
    const randomY = Math.min(Math.max(10, Math.random() * maxY), maxY - 10);
    
    // Make button bigger each time but limit size
    const currentSize = parseFloat(window.getComputedStyle(button).fontSize);
    const maxSize = Math.min(50, window.innerWidth * 0.1); // 10% of viewport width
    
    if (currentSize < maxSize) {
        button.style.fontSize = (currentSize + 2) + 'px';
    }
    
    // Apply new position
    button.style.position = 'fixed';
    button.style.left = randomX + 'px';
    button.style.top = randomY + 'px';
}

function redirectNo() {
    // Just move the button to a new position when clicked
    moveButton();
    
    // Make the button bigger but limit its maximum size
    const button = document.querySelector('.no-btn');
    const currentSize = parseFloat(window.getComputedStyle(button).fontSize);
    const maxSize = 50; // Maximum font size in pixels
    
    if (currentSize < maxSize) {
        button.style.fontSize = (currentSize + 5) + 'px';
    }
    
    // Make the Yes button slightly bigger
    const yesBtn = document.querySelector('.yes-btn');
    const currentYesSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
    const maxYesSize = 40; // Maximum font size for Yes button
    
    if (currentYesSize < maxYesSize) {
        yesBtn.style.fontSize = (currentYesSize + 2) + 'px';
    }
}

function showLetter() {
    // Hide the choice container
    const choiceContainer = document.querySelector('.choice-container');
    const celebrationContainer = document.querySelector('.celebration-container');
    const letterContent = document.querySelector('.letter-content');
    
    // Fade out choice container
    choiceContainer.style.opacity = '0';
    
    setTimeout(() => {
        // Hide choice container and show celebration
        choiceContainer.style.display = 'none';
        celebrationContainer.style.display = 'flex';
        
        requestAnimationFrame(() => {
            celebrationContainer.classList.add('visible');
        });
        
        // After 3 seconds, show the letter
        setTimeout(() => {
            celebrationContainer.style.opacity = '0';
            
            setTimeout(() => {
                celebrationContainer.style.display = 'none';
                letterContent.style.display = 'flex';
                
                requestAnimationFrame(() => {
                    letterContent.classList.add('visible');
                    document.body.classList.add('scissors');
                });
            }, 500);
        }, 3000);
    }, 500);
}