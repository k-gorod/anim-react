import { AnimConfigType } from '../types';

export const defaultAnimConfig: AnimConfigType = {
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

export const namedConfig: {[key: string]: AnimConfigType} = {
  slideFromLeft: {
    keyframes: [
      { opacity: 0, transform: 'translate(-120px, 0)' },
      { opacity: 1, transform: 'translate(0, 0)' },
    ],
    iterations: 1,
  },
  slideFormRight: {
    keyframes: [
      { opacity: 0, transform: 'translate(120px, 0)' },
      { opacity: 1, transform: 'translate(0, 0)' },
    ],
    iterations: 1,
  },
  slideFromTop: {
  keyframes: [
    {transform:"translateY(=100%)",opacity: 0},
    {transform:"translateY(0)", opacity: 1}
  ]
    ,
    duration:500,
    iterations: 1,
  },
  slideFromBottom: {
    keyframes: [
      {transform:"translateY(100%)",opacity: 0},
      {transform:"translateY(0)", opacity: 1}
    ]
    ,
    duration:500,
    iterations: 1,
  },
  opacityAppear: {
    keyframes: [
      { opacity: 0},
      { opacity: 1}
    ]
    ,
    duration: 800,
    easing: 'ease-in',
    iterations: 1,
  }
};
