const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const card = document.getElementById('card');
const title = document.querySelector('.title');
const buttonsContainer = document.querySelector('.buttons');
const successMessage = document.getElementById('successMessage');

// Configuration for confetti
const confettiDefaults = {
    spread: 360,
    ticks: 100,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    shapes: ['heart'],
    colors: ['#FFC0CB', '#FF69B4', '#FF1493', '#C71585']
};

function moveNoButton() {
    const cardRect = card.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // Calculate available space within the card
    // We want to keep the button inside the card if possible, or at least on screen
    const maxX = cardRect.width - btnRect.width - 40; // 20px padding
    const maxY = cardRect.height - btnRect.height - 40;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    // Set position to absolute if it isn't already (for the first move)
    if (noBtn.style.position !== 'absolute') {
        noBtn.style.position = 'absolute';
    }

    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.transform = 'none'; // Clear center alignment transform
}

noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default click behavior
    moveNoButton();
});
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevent default tap behavior on mobile
    moveNoButton();
});

yesBtn.addEventListener('click', () => {
    // Hide buttons and title
    title.classList.add('hidden');
    buttonsContainer.classList.add('hidden');

    // Show success message
    successMessage.classList.remove('hidden');

    // Trigger confetti
    triggerConfetti();
});

function triggerConfetti() {
    confetti({
        ...confettiDefaults,
        particleCount: 50,
        scalar: 2,
    });

    confetti({
        ...confettiDefaults,
        particleCount: 25,
        scalar: 3,
        shapes: ['circle']
    });

    confetti({
        ...confettiDefaults,
        particleCount: 15,
        scalar: 4,
        shapes: ['circle']
    });

    // Continuous confetti for a few seconds
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
        // launch a few confetti from the left edge
        confetti({
            particleCount: 4,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: confettiDefaults.colors,
            shapes: ['heart']
        });
        // and a few from the right edge
        confetti({
            particleCount: 4,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: confettiDefaults.colors,
            shapes: ['heart']
        });

        // keep going until we are out of time
        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}
