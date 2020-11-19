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
 * Helper function to output a JSDoc type definition.
 * @param model
 * @param typeName
 */
export const toTypeDef = ( model, typeName ) => {
  if( !model ) return;
  let result = `/**\n`;
  result += ` * @typedef a2w.models.${ typeName }\n`;

  for( const [ key, value ] of Object.entries( model ) ) {
    result += ` * @property {${ typeof value }} ${ key }\n`;
  }

  result += "*/";

  console.log( "toTypeDef:" );
  console.log( result );
};
