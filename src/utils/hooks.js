import { useEffect, useState, useRef } from "react";

const _usePrevious = (value, initialValue) => {
  const ref = useRef(initialValue);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

/**
 * Debug function to diagnose which dependencies are triggering execution of useEffect(). To use, simply replace
 * a call to `useEffect()` with `useEffectDebugger()`.
 * @param effectHook
 * @param dependencies
 * @param dependencyNames
 */
export const useEffectDebugger = (effectHook, dependencies, dependencyNames = []) => {
  const previousDeps = _usePrevious(dependencies, []);

  const changedDeps = dependencies.reduce((accum, dependency, index) => {
    if (dependency !== previousDeps[index]) {
      const keyName = dependencyNames[index] || index;
      return {
        ...accum,
        [keyName]: {
          before: previousDeps[index],
          after: dependency
        }
      };
    }

    return accum;
  }, {});

  if (Object.keys(changedDeps).length) {
    console.log('[use-effect-debugger] ', changedDeps);
  }

  useEffect(effectHook, dependencies);
};

/**
 * Custom hook which returns an element's height and width in the format [height, width]
 * @param {React.RefObject} ref the ref you want to monitor for size changes
 */
export const useDimensions = (ref) => {
  const [dimensions, setDimensions] = useState([ 0, 0 ]);
  const resizeObserverRef = useRef(null);

  useEffect(() => {
    resizeObserverRef.current = new ResizeObserver((entries) => {
      // only care about the first element
      const { clientHeight, clientWidth } = entries[0].target;
      setDimensions([clientHeight, clientWidth]);
    });
    if (ref.current) {
      resizeObserverRef.current.observe(ref.current);
    }
    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, [ref]);
  return dimensions;
};
