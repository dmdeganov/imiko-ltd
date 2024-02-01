import KeenSlider from 'keen-slider';
import 'keen-slider/keen-slider.min.css';

let teamSliderTop;
let teamSliderBottom;
let slidersMounted = false;

const initialWindowWidth = window.innerWidth;
let slidesPerView = initialWindowWidth > 900 ? 2 : 1;

const leftButton = document.getElementById('team-slider-left');
const rightButton = document.getElementById('team-slider-right');

window.addEventListener('resize', e => {
  if (window.innerWidth <= 900 && slidesPerView === 2) {
    [teamSliderTop, teamSliderBottom].forEach((slider, i) => {
      slider.options.slides.perView = 1;
      slidesPerView = 1;
      setTimeout(() => {
        slider.moveToIdx(i, true);
      }, 100);
    });
  }

  if (window.innerWidth > 900 && slidesPerView === 1) {
    [teamSliderTop, teamSliderBottom].forEach((slider, i) => {
      slider.options.slides.perView = 2;
      slidesPerView = 2;
      setTimeout(() => {
        slider.moveToIdx(i && 2, true);
      }, 100);
    });
  }
});

function initializeTeamSliders() {
  teamSliderTop = new KeenSlider(
    '#team-slider-top',
    {
      drag: true,
      loop: true,
      slides: {
        perView: slidesPerView,
        spacing: 24,
      },
    },
    [
      // add plugins here
    ],
  );

  teamSliderBottom = new KeenSlider('#team-slider-bottom', {
    drag: true,
    initial: slidesPerView,
    loop: true,
    slides: {
      perView: slidesPerView,
      spacing: 24,
    },
    spacing: 24,
    created: () => {
      teamSliderTop.container.addEventListener('mousedown', e => {
        if (!e.isTrusted) return;
        const event = new CustomEvent('mousedown', {detail: e});
        teamSliderBottom.container.dispatchEvent(event);
      });
      teamSliderTop.container.addEventListener('mousemove', e => {
        if (!e.isTrusted) return;
        const event = new CustomEvent('mousemove', {detail: e});
        teamSliderBottom.container.dispatchEvent(event);
      });
      teamSliderTop.container.addEventListener('mouseleave', e => {
        if (!e.isTrusted) return;
        const event = new CustomEvent('mouseleave', {detail: e});
        teamSliderBottom.container.dispatchEvent(event);
      });
      teamSliderTop.container.addEventListener('mouseup', e => {
        if (!e.isTrusted) return;
        const event = new CustomEvent('mouseup', {detail: e});
        teamSliderBottom.container.dispatchEvent(event);
      });

      setTimeout(() => {
        teamSliderBottom.container.addEventListener('mousedown', e => {
          if (!e.isTrusted) return;
          const event = new CustomEvent('mousedown', {detail: e});
          teamSliderTop.container.dispatchEvent(event);
        });
        teamSliderBottom.container.addEventListener('mousemove', e => {
          if (!e.isTrusted) return;
          const event = new CustomEvent('mousemove', {detail: e});
          teamSliderTop.container.dispatchEvent(event);
        });
        teamSliderBottom.container.addEventListener('mouseleave', e => {
          if (!e.isTrusted) return;
          const event = new CustomEvent('mouseleave', {detail: e});
          teamSliderTop.container.dispatchEvent(event);
        });
        teamSliderBottom.container.addEventListener('mouseup', e => {
          if (!e.isTrusted) return;
          const event = new CustomEvent('mouseup', {detail: e});
          teamSliderTop.container.dispatchEvent(event);
        });
      }, 200);
    },
  });
  leftButton.addEventListener('click', () => {
    [teamSliderTop, teamSliderBottom].forEach(slider => slider.prev());
  });
  rightButton.addEventListener('click', () => {
    [teamSliderTop, teamSliderBottom].forEach(slider => slider.next());
  });
  slidersMounted = true;
}
initializeTeamSliders();

// appSliderBottom.container.addEventListener('mousemove', console.log);
