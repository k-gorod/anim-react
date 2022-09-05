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
  
  const scrollEventInstance: React.MutableRefObject<any> = useRef(null);
  
  const finnishCallback = useRef(() => {})

  const { keyframes, ...animOptions } = useMemo(() => config, [config]);

  const handleScroll = useCallback((e: any) => {
    const { 
      height: windowHeight,
      width: windowWidth,
      pageTop: currentScrollY,
      pageLeft: currentScrollX,
    } = (e?.target as Document)?.defaultView?.visualViewport!;
    setAnimConfig((prev) => ({
      ...prev,
      spacing: {
        windowHeight,
        windowWidth,
        currentScrollY,
        currentScrollX,
        ...prev.spacing
      } }));
  }, [])

  
  const elementInView = useCallback(()=>{
    if(config.spacing){
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
        (currentScrollX + windowWidth) < offsetLeft
      ){
        console.log("true")
        setState(true);
      }else{
        console.log("false")
      }
    }
  }, [config.spacing])

  const setState = (activity: ((isActive: boolean) => boolean) | boolean) => {
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
      scrollEventInstance.current = ref.current?.ownerDocument.addEventListener('scroll', handleScroll);
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
    config.spacing?.windowHeight,
    config.spacing?.windowWidth,
    config.spacing?.currentScrollY,
    config.spacing?.currentScrollX
  ])

  useEffect(() => {
    defineAnimation()
  }, []);

  return {
    config, setState, updateConfig, hardStop, setEndCallback
  }
};
