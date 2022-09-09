import {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';

import { defaultAnimConfig, namedConfig } from '../../constants';
import {
  AnimConfigType, AnimInstT, animReturn, animType, KeyframesType,
} from '../../types';
import { changeOffsets, elementInViewCheck, updateScrollPosition } from '../../utils';

export const useAnim: animType = (props): animReturn => {
  const {
    ref,
    animName,
    userConfig,
  } = useMemo(() => props, [props]);

  const [config, setAnimConfig] = useState<AnimConfigType>({
    ...defaultAnimConfig,
    ...(animName ? namedConfig[animName] : {}),
    ...userConfig,
  });

  const animationInstance: AnimInstT = useRef<Animation>(null);

  const finnishCallback = useRef(() => {});

  const setState = (activity: ((isActive: boolean) => boolean) | boolean) => {
    switch (typeof activity) {
      case 'function':
        setAnimConfig((prev) => ({ ...prev, isActive: activity(config.isActive!) }));
        break;
      case 'boolean':
        setAnimConfig((prev) => ({ ...prev, isActive: activity }));
        break;
      default:
        console.error('React animation: attempt to use animation.setState function with forbidden argument');
    }
  };

  const handleScroll = useCallback((e: any) => {
    updateScrollPosition(e?.target?.defaultView?.visualViewport, setAnimConfig);
  }, []);

  const elementInView = useCallback(() => {
    elementInViewCheck(
      config.spacing,
      () => {
        setAnimConfig((prev) => ({ ...prev, isActive: true, startInSight: false }));
        ref.current?.ownerDocument.removeEventListener('scroll', handleScroll);
      },
    );
  }, [config.spacing]);

  const onFinish = () => {
    setAnimConfig((prev) => ({ ...prev, isActive: false, finished: true }));
    finnishCallback.current();
  };

  const hardStop = () => {
    animationInstance.current?.cancel();
  };

  const clearFromAllJSAnimations = () => {
    ref?.current?.getAnimations().forEach((e) => e.cancel());
  };

  const updateConfig = (newConfigs: AnimConfigType) => {
    hardStop(); // cancel current  animation

    setAnimConfig((prev) => ({ ...prev, newConfigs })); // update config

    animationInstance.current = (ref.current as Element)!.animate(config.keyframes!, {
      ...config,
    }); // define updated animation
  };

  const setEndCallback = (callback: ()=> any) => {
    finnishCallback.current = callback;
  };

  // ========TODO

  // const keyframeParse = (data: PropertyIndexedKeyframes | Keyframe[]): PropertyIndexedKeyframes | Keyframe[] => {
  //   return (
  //      Array.isArray(data)
  //    ?
  //      data
  //    :
  //      Object.entries(data).map((el)=>({
  //        ...el[1] as {},
  //        offset: Number(el[0].replace("%",""))/100
  //      })) as Keyframe[]
  //    )
  //  }

  const defineAnimation = () => {
    if (ref && ref.current) {
      animationInstance.current = ref.current.animate(config.keyframes as KeyframesType, config);
      if (config.startInSight || !config.isActive) {
        animationInstance.current.pause(); // to prevent station conflict bug
        setState(false);
      }

      if (config.startInSight) {
        updateScrollPosition(ref.current?.ownerDocument.defaultView?.visualViewport, setAnimConfig);
        elementInView();
      }
    }
  };

  useEffect(() => {
    const { current: animation } = animationInstance;

    if (animation) {
      animation.onfinish = onFinish;
      animation.oncancel = onFinish;
    }
  }, [finnishCallback.current]);

  useEffect(() => {
    changeOffsets(ref?.current, setAnimConfig);
  }, [
    ref?.current,
  ]);

  useEffect(() => {
    config.isActive
      ? animationInstance.current?.play()
      : animationInstance.current?.pause();
  }, [config.isActive]);

  useEffect(() => {
    if (config.startInSight) {
      ref.current?.ownerDocument.addEventListener('scroll', handleScroll);
    }
  }, [
    config.startInSight,
    handleScroll,
  ]);

  useEffect(() => {
    if (config.startInSight) {
      elementInView();
    }
  }, [
    config.spacing,
    config.startInSight,
  ]);

  useEffect(() => {
    defineAnimation();
  }, []);

  return {
    config, setState, updateConfig, hardStop, setEndCallback,
  };
};
