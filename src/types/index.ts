import React from 'react';

export type refType = React.MutableRefObject<HTMLElement | null>

export interface animConfigType extends KeyframeAnimationOptions {
  isActive?: boolean,
  keyframes?: PropertyIndexedKeyframes | Keyframe[] | {}
  finished?: boolean
}

export type setAnimFooType = (props: boolean) => void

export type animType = (props: {ref: refType, animName?: string, userConfig?: animConfigType }) => ({ config: animConfigType; setState: (props: boolean) => void; updateConfig: (newConfigs: animConfigType) => void; hardStop:() => void; setEndCallback: (callback: () => any) => void})

export type AnimInstT = React.MutableRefObject<Animation | null> ;
