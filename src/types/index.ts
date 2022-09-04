import React from 'react';

export type refType = React.MutableRefObject<HTMLElement | null>

export type KeyframesType = PropertyIndexedKeyframes | Keyframe[] | {};
export interface AnimConfigType extends KeyframeAnimationOptions {
  isActive?: boolean,
  keyframes?: KeyframesType
  finished?: boolean
}

export type setAnimFooType = (props: boolean) => void

export type animReturn = ({ config: AnimConfigType; setState: (activity: (isActive: boolean) => boolean | boolean) => void; updateConfig: (newConfigs: AnimConfigType) => void; hardStop:() => void; setEndCallback: (callback: () => any) => void})

export type animType = (props: {ref: refType, animName?: string, userConfig?: AnimConfigType }) => animReturn

export type AnimInstT = React.MutableRefObject<Animation | null> ;
