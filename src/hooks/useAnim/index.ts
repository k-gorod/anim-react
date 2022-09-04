import { defaultAnimConfig, namedConfig } from '../../constants';
import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimConfigType, AnimInstT, animReturn, animType, KeyframesType } from '../../types';

export const useAnim: animType = (props): animReturn => {
  const {
    ref,
    animName,
    userConfig
  } = useMemo(()=> props, [props]);
  
  const [config, setAnimConfig] = useState<AnimConfigType>({
    ...defaultAnimConfig,
    ...(animName ? namedConfig[animName] : {}),
    ...userConfig
  });

  const { keyframes, ...animOptions } = useMemo(() => config, [config]);

  const animationInstance: AnimInstT = useRef<Animation>(null);

  const finnishCallback = useRef(() => {})

  const setState = (activity: (isActive: boolean) => boolean | boolean) => {
    if(activity){
      if(typeof activity === 'function'){
        setAnimConfig((prev) => ({ ...prev, isActive: activity(config.isActive!) }));
      }else {
        setAnimConfig((prev) => ({ ...prev, isActive: activity }));
      }
    }else {
      console.error("React animation: attempt to use animation.setState function with forbidden argument")
    }
  };

  const onFinish = () => {
    setAnimConfig((prev) => ({ ...prev, isActive: false, finished: true }));
    finnishCallback.current()
  }

  const hardStop = () => {
    animationInstance.current?.cancel();
  };

  const clearFromAllJSAnimations = () => {
    ref?.current?.getAnimations().forEach((e) => e.cancel());
  }

  const updateConfig = (newConfigs: AnimConfigType) => {
    hardStop() // cancel current  animation

    setAnimConfig((prev) => ({ ...prev, newConfigs })); // update config

    animationInstance.current = (ref.current as Element)!.animate(config.keyframes!, {
      ...animOptions,
    }); // define updated animation
  };

  const setEndCallback = (callback: ()=> any) => {
    finnishCallback.current = callback
  }

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
    if(ref && ref.current){
      animationInstance.current = ref.current.animate(keyframes as KeyframesType, animOptions);
      if(!animOptions.isActive) animationInstance.current.pause();
    }
  }

  useEffect(()=>{
    const { current : animation } = animationInstance;

    if(animation){
      animation.onfinish = onFinish
      animation.oncancel = onFinish
    }

  }, [finnishCallback.current])

  useEffect(()=>{
    config.isActive ?
    animationInstance.current?.play() :
    animationInstance.current?.pause();
  }, [config.isActive])

  useEffect(() => {
    defineAnimation()
  }, []);

  return {
    config, setState, updateConfig, hardStop, setEndCallback
  }
};
