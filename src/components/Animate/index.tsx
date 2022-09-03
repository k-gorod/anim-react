
import React, {
  MutableRefObject, useEffect, useMemo, useRef,
} from 'react';

import { defaultAnimConfig } from '../../constants';

// ======================================TYPES
interface IAnimate {
  children: React.ReactNode;
  withRef?: boolean;
}

// ======================================UTILS

const mergeRefs = (...refs) => {
  const filteredRefs = refs.filter(Boolean);
  if (!filteredRefs.length) return null;
  if (filteredRefs.length === 0) return filteredRefs[0];
  return (el) => {
    filteredRefs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(el);
      } else if (ref) {
        ref.current = el;
      }
    });
  };
};

// ====================================Component
export const Animate: React.FC<IAnimate> = ({ children, withRef }) => {
  const animationRef = useRef(null);

  const renderChild = () => (
    React.cloneElement(children, {
      ref: mergeRefs(children.ref, animationRef),
    })
  );

  const { keyframes, ...config } = React.useMemo(() => defaultAnimConfig, [defaultAnimConfig]);

  const animationInstance: React.MutableRefObject<Animation | null | undefined> = React.useRef(null);

  React.useEffect(() => {
    if (animationRef && animationRef.current) {
      animationInstance.current = animationRef.current.animate(keyframes as PropertyIndexedKeyframes | Keyframe[] | null, config);
    }
  }, []);

  return withRef
    ? renderChild() : (
      <div ref={animationRef} style={{ all: 'inherit' }}>
        {renderChild()}
      </div>
    );
};
