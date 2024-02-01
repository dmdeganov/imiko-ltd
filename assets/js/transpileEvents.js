const eventsListToTranspile = [
  'mousedown',
  'mousemove',
  'mouseleave',
  'mouseup',
  'touchstart',
  'touchmove',
  'touchend',
  'touchcancel',
];

export function transpileEvents(fromElement, toElement) {
  eventsListToTranspile.forEach(eventName => {
    fromElement.addEventListener(eventName, e => transpileEvent(eventName, e, toElement));
  });
}

function transpileEvent(eventName, e, elementToTranspile) {
  if (!e.isTrusted) return;
  const event = new CustomEvent(eventName, {detail: e});
  elementToTranspile.container.dispatchEvent(event);
}
