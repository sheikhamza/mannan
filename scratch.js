document.addEventListener('DOMContentLoaded', function () {

    const canvas = document.getElementById('scratch-canvas');
    const ctx = canvas.getContext('2d');

    const container = canvas.parentElement;

    let isDrawing = false;
    let revealed = false;

    function resizeCanvas() {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;

        if (!revealed) {
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = '#B89A63';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 16px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(
                '✨ Scratch To Reveal ✨',
                canvas.width / 2,
                canvas.height / 2
            );
        }
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Google Calendar Link
    const startDate = "20260822T190000";
    const endDate = "20260822T230000";

    const calendarUrl =
        `https://calendar.google.com/calendar/render?action=TEMPLATE` +
        `&text=ABDUL MANNAN and D/o Muhammad Jawaid Wedding` +
        `&dates=${startDate}/${endDate}` +
        `&details=Join us for our wedding celebration`;

    const saveBtn = document.getElementById('save-date-btn');

    if (saveBtn) {
        saveBtn.href = calendarUrl;
    }

    function getPosition(e) {
        const rect = canvas.getBoundingClientRect();
        if (e.touches && e.touches.length > 0) {
            return {
                x: e.touches[0].clientX - rect.left,
                y: e.touches[0].clientY - rect.top
            };
        }

        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    function scratch(e) {
        if (!isDrawing || revealed) return;

        const pos = getPosition(e);
        ctx.globalCompositeOperation = 'destination-out';

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 30, 0, Math.PI * 2);
        ctx.fill();

        checkReveal();
    }

    function checkReveal() {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        let transparentPixels = 0;

        for (let i = 3; i < imageData.data.length; i += 4) {
            if (imageData.data[i] === 0) {
                transparentPixels++;
            }
        }

        const percentage = transparentPixels / (canvas.width * canvas.height);

        // 70% Scratch Complete
        if (percentage > 0.5 && !revealed) {
            revealed = true;
            // Fully Clear Canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Fade Out
            canvas.style.transition = 'opacity 0.8s';
            canvas.style.opacity = '0';

            // Mobile Vibration
            if (navigator.vibrate) {
                navigator.vibrate(200);
            }

            // Confetti
            confetti({
                particleCount: 250,
                spread: 180,
                origin: {
                    y: 0.6
                }
            });

            // Extra Burst
            setTimeout(() => {
                confetti({
                    particleCount: 150,
                    spread: 120,
                    origin: {
                        x: 0.2,
                        y: 0.5
                    }
                });

                confetti({
                    particleCount: 150,
                    spread: 120,
                    origin: {
                        x: 0.8,
                        y: 0.5
                    }
                });
            }, 300);

            // Reveal Calendar Card
            setTimeout(() => {

                canvas.style.display = 'none';

                const saveCard = document.getElementById('save-date-card');

                if (saveCard) {

                    saveCard.classList.remove('hidden');

                    setTimeout(() => {
                        saveCard.classList.remove('opacity-0');
                    }, 50);
                }

            }, 800);
        }
    }

    /* Desktop Events */
    canvas.addEventListener('mousedown', () => {isDrawing = true;});
    canvas.addEventListener('mouseup', () => {isDrawing = false;});
    canvas.addEventListener('mouseleave', () => {isDrawing = false;});
    canvas.addEventListener('mousemove', scratch);

    /* Mobile Events */
    canvas.addEventListener('touchstart', () => {isDrawing = true;});
    canvas.addEventListener('touchend', () => {isDrawing = false;});
    canvas.addEventListener('touchmove',function (e) {
            e.preventDefault();
            scratch(e);
        },{
            passive: false
        }
    );


    // --- 5. LIVE COUNTDOWN SCHEDULER ENGINE ---
    // Setting event target deadline date timestamp values loop 
    // const targetDate = new Date('August 21, 2026 19:00:00').getTime();
    const targetDate = new Date(document.getElementById('wedding-date').innerText).getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference < 0) {
            document.getElementById('days').innerText = "00";
            return;
        }

        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = d < 10 ? '0' + d : d;
        document.getElementById('hours').innerText = h < 10 ? '0' + h : h;
        document.getElementById('minutes').innerText = m < 10 ? '0' + m : m;
        document.getElementById('seconds').innerText = s < 10 ? '0' + s : s;
    }
    setInterval(updateCountdown, 1000);
    updateCountdown();

});