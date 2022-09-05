import { defaultAnimConfig, namedConfig } from '../../constants';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
  
  const animationInstance: AnimInstT = useRef<Animation>(null);
  
  const finnishCallback = useRef(() => {})

  const { keyframes, ...animOptions } = useMemo(() => config, [config]);

  const handleScroll = useCallback((e: any) => {
    const { 
      height: windowHeight,
      width: windowWidth,
      pageTop: currentScrollY,
      pageLeft: currentScrollX,
    } = e?.target?.defaultView?.visualViewport!;

    setAnimConfig((prev) => ({
      ...prev,
      spacing: {
        ...prev.spacing,
        windowHeight,
        windowWidth,
        currentScrollY,
        currentScrollX
      } }));
  }, [])

  const elementInView = useCallback(()=>{
    if(config.spacing && config.startInSight){
      const {
        windowHeight,
        windowWidth,
        currentScrollY,
        currentScrollX,
        offsetLeft,
        offsetTop,
      } = config.spacing!
  
      if(windowHeight != null &&
        windowWidth != null &&
        currentScrollY != null &&
        currentScrollX != null &&
        offsetLeft != null &&
        offsetTop != null &&
        currentScrollY < offsetTop &&
        (currentScrollY + windowHeight) > offsetTop &&
        currentScrollX < offsetLeft &&
        (currentScrollX + windowWidth) > offsetLeft
      ){
        setAnimConfig((prev) => ({ ...prev, isActive: true, startInSight: false }));
        ref.current?.ownerDocument.removeEventListener('scroll', handleScroll);
      }
    }
  }, [config.spacing])

  const setState = (activity: ((isActive: boolean) => boolean) | boolean) => {
    switch(typeof activity){
      case "function" :
        setAnimConfig((prev) => ({ ...prev, isActive: activity(config.isActive!) }));
        break;
      case "boolean" : 
        setAnimConfig((prev) => ({ ...prev, isActive: activity }));
        break;
      default :
      console.error("React animation: attempt to use animation.setState function with forbidden argument");
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
    const { offsetLeft, offsetTop } = ref?.current!
    setAnimConfig((prev) => ({
      ...prev,
      spacing: {
        offsetLeft,
        offsetTop,
        ...prev.spacing
      } }));
  }, [
    ref?.current
  ])

  useEffect(()=>{
    config.isActive ?
    animationInstance.current?.play() :
    animationInstance.current?.pause();
  }, [config.isActive])

  useEffect(()=>{
    if(config.startInSight) {
      setState(false)
      ref.current?.ownerDocument.addEventListener('scroll', handleScroll);
    }
  }, [
    config.startInSight,
    handleScroll
  ])

  useEffect(()=>{
    if(config.spacing){
      elementInView()
    }
  }, [
    config.spacing
  ])

  useEffect(() => {
    defineAnimation()
  }, []);

  return {
    config, setState, updateConfig, hardStop, setEndCallback
  }
};
