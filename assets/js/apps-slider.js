// import KeenSlider from 'keen-slider';
// import 'keen-slider/keen-slider.min.css';
import {transpileMouseEventsForDrag, transpileTouchEventsForDrag} from './transpileEvents.js';

let appsSliderTop;
let appSliderBottom;
let slidersMounted = false;

const leftButton = document.getElementById('apps-slider-left');
const rightButton = document.getElementById('apps-slider-right');

const initialWindowWidth = window.innerWidth;

window.addEventListener('resize', e => {
  if (slidersMounted && window.innerWidth <= 640) {
    appsSliderTop.destroy();
    appSliderBottom.destroy();
    slidersMounted = false;
  }
  if (!slidersMounted && window.innerWidth > 640) initializeAppSliders();
});

const initializeAppSliders = () => {
  console.log('initializeAppSliders');
  appsSliderTop = new KeenSlider(
    '#apps-slider-top',
    {
      drag: true,
      loop: true,
      selector: '.apps__item',
      slides: {
        perView: 1,
        spacing: 24,
      },
    },
    [
      // add plugins here
    ],
  );

  appSliderBottom = new KeenSlider('#apps-slider-bottom', {
    drag: true,
    selector: '.apps__item',
    initial: 1,
    loop: true,
    slides: {
      perView: 1,
      spacing: 24,
    },
    spacing: 24,
    created: () => {
      setTimeout(() => {
        transpileMouseEventsForDrag(appsSliderTop.container, appSliderBottom.container);
        transpileTouchEventsForDrag(appsSliderTop.container, appSliderBottom.container);
      }, 100);

      setTimeout(() => {
        transpileMouseEventsForDrag(appSliderBottom.container, appsSliderTop.container);
        transpileTouchEventsForDrag(appSliderBottom.container, appsSliderTop.container);
      }, 200);

      leftButton.addEventListener('click', () => {
        [appsSliderTop, appSliderBottom].forEach(slider => slider.prev());
      });
      rightButton.addEventListener('click', () => {
        [appsSliderTop, appSliderBottom].forEach(slider => slider.next());
      });
    },
  });
  slidersMounted = true;
};

if (initialWindowWidth > 640) initializeAppSliders();
// appSliderBottom.container.addEventListener('mousemove', console.log);
