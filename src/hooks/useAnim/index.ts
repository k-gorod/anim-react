import { defaultAnimConfig, namedConfig } from '../../constants';
import { useEffect, useMemo, useRef, useState } from 'react';
import { animConfigType, AnimInstT, animType } from 'types';

export const useAnim: animType = ({
  ref,
  animName,
  userConfig
}) => {
  
  const [config, setAnimConfig] = useState<animConfigType>({
    ...defaultAnimConfig,
    ...(animName ? namedConfig[animName] : {}),
    ...userConfig
  });

  const { keyframes, ...animOptions } = useMemo(() => config, [config]);

  const animationInstance: AnimInstT = useRef<Animation>(null);

  const finnishCallback = useRef(() => {})

  const setState = (isActive: boolean) => {
    setAnimConfig((prev) => ({ ...prev, isActive }));
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

  const updateConfig = (newConfigs: animConfigType) => {
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
      animationInstance.current = ref.current.animate(keyframes as PropertyIndexedKeyframes | Keyframe[] | null, animOptions);
    }
  }

  useEffect(() => {
    defineAnimation()
  }, []);

  useEffect(()=>{
    const { current : animation } = animationInstance;

    if(animation){
      animation.onfinish = onFinish
      animation.oncancel = onFinish
    }
  }, [finnishCallback.current])


  return {
    config, setState, updateConfig, hardStop, setEndCallback
  }
};
