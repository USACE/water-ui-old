import { useEffect, useRef } from "react";

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
const useEffectDebugger = (effectHook, dependencies, dependencyNames = []) => {
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
