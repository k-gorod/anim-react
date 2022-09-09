import { AnimConfigType } from '../types';

export const slideFromLeft = {
  keyframes: [
    { opacity: 0, transform: 'translate(-50%, 0)' },
    { opacity: 1, transform: 'translate(0, 0)' },
  ],
  duration: 500,
  iterations: 1,
};

export const slideFromRight = {
  keyframes: [
    { opacity: 0, transform: 'translate(50%, 0)' },
    { opacity: 1, transform: 'translate(0, 0)' },
  ],
  duration: 500,
  iterations: 1,
};

export const slideFromTop = {
  keyframes: [
    { transform: 'translateY(-50%)', opacity: 0 },
    { transform: 'translateY(0)', opacity: 1 },
  ],
  duration: 500,
  iterations: 1,
};

export const slideFromBottom = {
  keyframes: [
    { transform: 'translateY(50%)', opacity: 0 },
    { transform: 'translateY(0)', opacity: 1 },
  ],
  duration: 500,
  iterations: 1,
};

export const opacityAppear = {
  keyframes: [
    { opacity: 0 },
    { opacity: 1 },
  ],
  duration: 800,
  easing: 'ease-in',
  iterations: 1,
};
