// Tip Animations 
let tipIndex = 0;
const tipContainer = document.querySelector('.tip_section_2');
const leftIcon = document.querySelector('.arrow-left');
const rightIcon = document.querySelector('.arrow-right');

// Finds img to display and adds fade-in (0 or 1) depending on its index remainder 
function showTip(tipIndex) {
  const tip = document.createElement('img');
  tip.src = `images/Tip${tipIndex}.png`;
  tip.classList.add(`fadeIn-${tipIndex % 2}`);
  tipContainer.innerHTML = ''; // Clears the everything from the tip container

  // Add the arrows and image back to the container 
  tipContainer.appendChild(leftIcon);
  tipContainer.appendChild(tip);
  tipContainer.appendChild(rightIcon);
}

tipContainer.addEventListener('click', function() {
  tipContainer.querySelector('img').classList.remove('fadeIn-0', 'fadeIn-1');

  showTip(tipIndex)
});

// Left arrow move to previous image, 
leftIcon.addEventListener('click', function() {
  tipIndex--;
  if (tipIndex < 0) {
    tipIndex = 6;
  }
  showTip(tipIndex);
});

// Right arrow move to next image 
rightIcon.addEventListener('click', function() {
  tipIndex++;
  if (tipIndex > 6) {
    tipIndex = 0;
  }
  showTip(tipIndex);
});

// -- //
// Scroll Animations, Checks every 'hidden' div that intersects the viewport of the user and adds 'fade-in' to class
let threshold = 0.3;

if (window.innerWidth < 767) {
  threshold = 0.1; // Check if 10% of the div is visible for animation on small devices
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, { threshold }); // Check if 30% of the div is visible for animation on bigger devices

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));