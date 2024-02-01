import KeenSlider from 'keen-slider';
import 'keen-slider/keen-slider.min.css';

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
      appsSliderTop.container.addEventListener('mousedown', e => {
        if (!e.isTrusted) return;
        const event = new CustomEvent('mousedown', {detail: e});
        appSliderBottom.container.dispatchEvent(event);
      });
      appsSliderTop.container.addEventListener('mousemove', e => {
        if (!e.isTrusted) return;
        const event = new CustomEvent('mousemove', {detail: e});
        appSliderBottom.container.dispatchEvent(event);
      });
      appsSliderTop.container.addEventListener('mouseleave', e => {
        if (!e.isTrusted) return;
        const event = new CustomEvent('mouseleave', {detail: e});
        appSliderBottom.container.dispatchEvent(event);
      });
      appsSliderTop.container.addEventListener('mouseup', e => {
        if (!e.isTrusted) return;
        const event = new CustomEvent('mouseup', {detail: e});
        appSliderBottom.container.dispatchEvent(event);
      });

      setTimeout(() => {
        appSliderBottom.container.addEventListener('mousedown', e => {
          console.log(e.isTrusted);
          if (!e.isTrusted) return;
          const event = new CustomEvent('mousedown', {detail: e});
          appsSliderTop.container.dispatchEvent(event);
        });
        appSliderBottom.container.addEventListener('mousemove', e => {
          if (!e.isTrusted) return;
          const event = new CustomEvent('mousemove', {detail: e});
          appsSliderTop.container.dispatchEvent(event);
        });
        appSliderBottom.container.addEventListener('mouseleave', e => {
          if (!e.isTrusted) return;
          const event = new CustomEvent('mouseleave', {detail: e});
          appsSliderTop.container.dispatchEvent(event);
        });
        appSliderBottom.container.addEventListener('mouseup', e => {
          if (!e.isTrusted) return;
          const event = new CustomEvent('mouseup', {detail: e});
          appsSliderTop.container.dispatchEvent(event);
        });
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
