const mouseEventsList = ['mousedown', 'mousemove', 'mouseleave', 'mouseup'];
const touchEvensList = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];

export function transpileMouseEventsForDrag(fromElement, toElement) {
  mouseEventsList.forEach(eventName => {
    fromElement.addEventListener(eventName, e => transpileMouseEvent(eventName, e, toElement));
  });
}

function transpileMouseEvent(eventName, e, elementToTranspile) {
  if (!e.isTrusted) return;
  const event = new CustomEvent(eventName, {detail: e});
  elementToTranspile.dispatchEvent(event);
}

export function transpileTouchEventsForDrag(fromElement, toElement) {
  touchEvensList.forEach(eventName => {
    fromElement.addEventListener(eventName, e => dispatchDragFromTouchEvent(eventName, e, toElement));
  });
}

const position = {
  x: 0,
  y: 0,
};

function dispatchDragFromTouchEvent(eventName, e, element) {
  if (!e.isTrusted) return;

  const map = {
    touchstart: 'mousedown',
    touchmove: 'mousemove',
    touchend: 'mouseup',
    touchcancel: 'mouseup',
  };
  const currentX = e.touches[0]?.pageX || e.changedTouches[0]?.pageX;
  const currentY = e.touches[0]?.pageY || e.changedTouches[0]?.pageY;

  if (currentX && currentY) {
    position.x -= currentX;
    position.y -= currentY;
  }

  element.dispatchEvent(
    new CustomEvent(map[eventName], {
      detail: {
        x: currentX,
        y: currentY,
      },
    }),
  );
}
