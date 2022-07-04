function calcSize() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

calcSize();
window.onresize = calcSize;
