function calcSize() {
  const vh = window.innerHeight * 0.01;
  const r = document.querySelector(':root');

  r.style.setProperty("--vh", `${vh}px`);
}

calcSize();
window.onresize = calcSize;

function manifestLoader() {
  const link = document.createElement('link');
  link.type = "manifest";

  document.head.appendChild(link);

  link.href = "/manifest.json";
}

manifestLoader();
