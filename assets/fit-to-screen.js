(function () {
  const container = document.getElementById('fit-to-screen');
  if (!container) return;

  function resize() {
    const firstPage = container.querySelector('.page');
    if (!firstPage) return;

    const pageW = firstPage.offsetWidth;

    const styles = window.getComputedStyle(container);
    const padX = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);

    const availW = window.innerWidth - padX;

    // Width-only scaling (ignore height completely)
    const s = Math.min(availW / pageW, 1);

    // keep watermark scaling tied to the same factor
    document.body.style.setProperty('--fit-scale', s);

    container.querySelectorAll('.page').forEach(p => {
      p.style.transform = `scale(${s})`;
    });

    // Optional: remove margins only when scaled down
    container.classList.toggle('is-scaled', s < 1);
  }

  // run once and bind
  window.addEventListener('resize', resize);
  resize();
})();