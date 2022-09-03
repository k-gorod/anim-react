import { animConfigType } from '../types';

export const defaultAnimConfig: animConfigType = {
  keyframes: [
    { opacity: 1 },
    { opacity: 0 },
    { opacity: 1 },
  ],
  isActive: true,
  finished: false,
  delay: 0,
  direction: 'normal',
  duration: 1000,
  easing: 'linear',
  endDelay: 0,
  //   fill: 'forwards',
  iterationStart: 0,
  iterations: Infinity,
  /*
    iterationComposite: 'accumulate',
    composite: 'accumulate',
    spacing: 'distribute'
    */
};

export const namedConfig: {[key: string]: animConfigType} = {
  slideFromLeft: {
    keyframes: [
      { opacity: 0, transform: 'translate(120px, 0)' },
      { opacity: 1, transform: 'translate(0, 0)' },
    ],
    iterations: 1,
  },
  slideFormRight: {
    keyframes: [
      { opacity: 0, transform: 'translate(-120px, 0)' },
      { opacity: 1, transform: 'translate(0, 0)' },
    ],
    iterations: 1,
  },
  slideFromTop: {
    keyframes: {
      "0":{transform:"translateY(-100%)",opacity: 0},
    "100":{transform:"translateY(0)", opacity: 1}
  }
    ,
    duration:500,
    iterations: 1,
  },
  slideFromBottom: {
    keyframes: {
      "0":{"WebkitTransform":"translateY(100%)","transform":"translateY(100%)",opacity: 0},
    "100":{"WebkitTransform":"translateY(0)","transform":"translateY(0)", opacity: 1}
  }
    ,
    duration:500,
    iterations: 1,
  },

  
  jumpTextHighlight: {
    keyframes: [
      { transform: 'scale(1)', textShadow: 'none' },
      { transform: 'scale(1.2)', textShadow: '#000 5px 5px 5px' },
    ],
    iterations: Infinity,
    direction: 'alternate',
    fill: 'none',
    duration: 300,
  },
};
