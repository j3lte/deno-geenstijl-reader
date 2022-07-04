function calcSize() {
  const vh = window.innerHeight * 0.01;
  const r = document.querySelector(':root');

  r.style.setProperty("--vh", `${vh}px`);
}

calcSize();
window.onresize = calcSize;

function manifestLoader() {
  const viewPort = document.querySelector('meta[name="viewport"]');
  if (viewPort) {
    viewPort.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no')
  }
}

manifestLoader();
