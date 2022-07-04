function calcSize() {
  const vh = window.innerHeight * 0.01;
  const r = document.querySelector(':root');

  r.style.setProperty("--vh", `${vh}px`);
}

calcSize();
window.onresize = calcSize;

function manifestLoader() {
  const link = document.createElement('link');
  link.rel = "manifest";
  document.head.appendChild(link);
  link.href = "/manifest.json";

  const favicon = document.createElement('link');
  favicon.rel = 'shortcut icon';
  favicon.type = 'image/x-icon';
  document.head.appendChild(favicon);
  favicon.href = "/images/icons-256.png";

  const themeColor = document.createElement('meta');
  themeColor.name = 'theme-color';
  themeColor.content = '#fc32a9';
  document.head.appendChild(themeColor);

  const viewPort = document.querySelector('meta[name="viewport"]');
  if (viewPort) {
    viewPort.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no')
  }

  console.log(viewPort)
}

manifestLoader();
