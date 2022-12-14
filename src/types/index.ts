import React from 'react';

export type refType = React.MutableRefObject<HTMLElement | null>

export type KeyframesType = PropertyIndexedKeyframes | Keyframe[] | null;

export type AnimConfSpacing = {
  windowHeight?: number,
  windowWidth?: number,
  currentScrollY?: number,
  currentScrollX?: number,
  offsetLeft?: number,
  offsetTop?: number,
  offsetHeight?: number,
  offsetWidth?: number,
} | undefined | null

export interface AnimConfigType extends KeyframeAnimationOptions {
  isActive?: boolean,
  keyframes?: KeyframesType
  finished?: boolean,
  startInSight?: boolean,
  spacing?: AnimConfSpacing
}

export type setAnimFooType = (props: boolean) => void

export type setConfigFooType = React.Dispatch<React.SetStateAction<AnimConfigType>>

export type animReturn = ({
  config: AnimConfigType;
  setState: (activity: ((isActive: boolean) => boolean) | boolean) => void;
  updateConfig: (newConfigs: AnimConfigType) => void; hardStop:() => void;
  setEndCallback: (callback: () => any) => void
})

export type NamedAnimType = (
  'slideFromLeft' |
  'slideFromRight' |
  'slideFromTop' |
  'slideFromBottom' |
  'opacityAppear'
)

export type animType = (
  props: {
    ref: refType,
    animName?: NamedAnimType,
    userConfig?: AnimConfigType
  }) => animReturn

export type AnimInstT = React.MutableRefObject<Animation | null>;
