import React, { useRef, useEffect } from 'react';
import isEqual from 'lodash/isEqual'; // Or use another deep comparison library

function useWhyDidYouUpdate(name, props) {
  const previousProps = useRef();

  useEffect(() => {
    if (previousProps.current) {
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      const changes = {};
      allKeys.forEach((key) => {
        if (!isEqual(props[key], previousProps.current[key])) {
          changes[key] = {
            from: previousProps.current[key],
            to: props[key],
          };
        }
      });
      if (Object.keys(changes).length) {
        console.log("This is causing the re-renders", name, changes);
      }
    }
    previousProps.current = props;
  }, [props, name]); // Include name in dependency array if it's dynamic

  return changes; // Return changes if needed
}