import { AnimConfSpacing, setConfigFooType } from '../types';

export const updateScrollPosition = (visualViewport: any, setAnimConfig: setConfigFooType) => {
  const {
    height: windowHeight,
    width: windowWidth,
    pageTop: currentScrollY,
    pageLeft: currentScrollX,
  } = visualViewport;

  setAnimConfig((prev) => ({
    ...prev,
    spacing: {
      ...prev.spacing,
      windowHeight,
      windowWidth,
      currentScrollY,
      currentScrollX,
    },
  }));
};

export const elementInViewCheck = (spacing: AnimConfSpacing, callback: () => void) => {
  if (spacing) {
    const {
      windowHeight,
      windowWidth,
      currentScrollY,
      currentScrollX,
      offsetLeft,
      offsetTop,
      offsetHeight,
      offsetWidth,
    } = spacing;

    const [midHeight, midWidth] = [offsetTop! + (offsetHeight! / 2), offsetLeft! + (offsetWidth! / 2)];

    if (windowHeight != null
        && windowWidth != null
        && currentScrollY != null
        && currentScrollX != null
        && offsetLeft != null
        && offsetTop != null
        && currentScrollY < midHeight
        && (currentScrollY + windowHeight) > midHeight
        && currentScrollX < midWidth
        && (currentScrollX + windowWidth) > midWidth
    ) {
      callback();
    }
  }
};

export const changeOffsets = (target: AnimConfSpacing, setAnimConfig: setConfigFooType) => {
  if (target) {
    const {
      offsetLeft, offsetTop, offsetHeight, offsetWidth,
    } = target;

    setAnimConfig((prev) => ({
      ...prev,
      spacing: {
        offsetLeft,
        offsetTop,
        offsetHeight,
        offsetWidth,
        ...prev.spacing,
      },
    }));
  }
};
