const params = new URLSearchParams(window.location.search);
const model = params.get("model");

if(model){
    document.querySelector("#model").setAttribute("gltf-model", model);
}

function rotateUp() {
    let el = document.querySelector('#model');
    let r = el.getAttribute('rotation');

    let newX = r.x - 15; // up rotation
    el.setAttribute('rotation', `${newX} ${r.y} ${r.z}`);
}

function rotateDown() {
    let el = document.querySelector('#model');
    let r = el.getAttribute('rotation');

    let newX = r.x + 15; // down rotation
    el.setAttribute('rotation', `${newX} ${r.y} ${r.z}`);
}

function zoomIn() {
    let el = document.querySelector('#model');
    let s = el.getAttribute('scale');
    let newScale = s.x + 0.1;
    el.setAttribute('scale', `${newScale} ${newScale} ${newScale}`);
}

function zoomOut() {
    let el = document.querySelector('#model');
    let s = el.getAttribute('scale');

    let newScale = s.x - 0.1;

    // ❗ minimum limit (warna model gayab ho jayega)
    if (newScale < 0.1) return;

    el.setAttribute('scale', `${newScale} ${newScale} ${newScale}`);
}

function rotateLeft() {
    let el = document.querySelector('#model');
    let r = el.getAttribute('rotation');

    let newY = r.y - 15;
    el.setAttribute('rotation', `${r.x} ${newY} ${r.z}`);
}

function rotateRight() {
    let el = document.querySelector('#model');
    let r = el.getAttribute('rotation');

    let newY = r.y + 15;
    el.setAttribute('rotation', `${r.x} ${newY} ${r.z}`);
}


AFRAME.registerComponent('drag-rotate', {
  init: function () {
    let el = document.querySelector('#model');
    let isDragging = false;
    let previousX = 0;
    let previousY = 0;

    this.el.sceneEl.addEventListener('loaded', () => {

      const canvas = this.el.sceneEl.canvas;

      // DESKTOP
      canvas.addEventListener('mousedown', (e) => {
       let el = document.querySelector('#model');
    let r = el.getAttribute('rotation');

    let newX = r.x + 15; // down rotation
    el.setAttribute('rotation', `${newX} ${r.y} ${r.z}`);


      });

      window.addEventListener('mouseup', () => {
        isDragging = false;
      });

      window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        let deltaX = e.clientX - previousX;
        let deltaY = e.clientY - previousY;

        previousX = e.clientX;
        previousY = e.clientY;

        let rotation = el.getAttribute('rotation');

        // Y axis (left/right)
        rotation.y += deltaX * 0.5;

        // X axis (up/down)
        rotation.x += deltaY * 0.5;

        el.setAttribute('rotation', rotation);
      });

      // MOBILE
      canvas.addEventListener('touchstart', (e) => {
        isDragging = true;
        previousX = e.touches[0].clientX;
        previousY = e.touches[0].clientY;
      });

      window.addEventListener('touchend', () => {
        isDragging = false;
      });

      window.addEventListener('touchmove', (e) => {
        if (!isDragging) return;

        let deltaX = e.touches[0].clientX - previousX;
        let deltaY = e.touches[0].clientY - previousY;

        previousX = e.touches[0].clientX;
        previousY = e.touches[0].clientY;

        let rotation = el.getAttribute('rotation');

        rotation.y += deltaX * 0.3; // left/right
        rotation.x += deltaY * 0.3; // up/down

        el.setAttribute('rotation', rotation);
      });

    });
  }
});