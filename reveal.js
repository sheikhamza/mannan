// --- 1. REVEAL / CURTAIN OPEN SYSTEM LOGIC ---
// function openInvitation() {
function openInvitation() {
    const overlay = document.getElementById('reveal-overlay');
    const btnContainer = document.getElementById('reveal-btn-container');
    const leaves = document.querySelectorAll('.side-leaf');

    btnContainer.style.transform = 'scale(0)';

    leaves.forEach(leaf => {
        leaf.style.transition = 'opacity .8s ease';
        leaf.style.opacity = '0';
    });

    setTimeout(() => {
        overlay.classList.add('reveal-active');

        const audio = document.getElementById('bg-audio');
        audio.play().catch(() => {
            console.log("Audio autoplay restricted.");
        });

        overlay.addEventListener('transitionend', function handler() {
            overlay.classList.remove('fixed');
            overlay.removeEventListener('transitionend', handler);
        });

    }, 900);
}

// --- 2. AUDIO BACKGROUND TOGGLE MANAGEMENT ---
function toggleMusic() {
    const audio = document.getElementById('bg-audio');
    const icon = document.getElementById('music-icon');
    if (audio.paused) {
        audio.play();
        icon.className = 'fa-solid fa-music animate-spin';
    } else {
        audio.pause();
        icon.className = 'fa-solid fa-volume-xmark';
    }
}