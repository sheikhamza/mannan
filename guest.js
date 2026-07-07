document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;

    if (path.startsWith("/guest=")) {
        const guestName = decodeURIComponent(path.replace("/guest=", ""));
        document.getElementById("guest-name").textContent = guestName;
    }
});