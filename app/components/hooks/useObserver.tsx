"use client";
import React, {useEffect} from "react";

interface Props {
  visibilityRef: React.MutableRefObject<HTMLDivElement | null>;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isVisible: boolean;
}

const useObserver = ({visibilityRef, setIsVisible, isVisible}: Props) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
        rootMargin: "0px",
        root: null,
      }
    );

    if (visibilityRef.current) {
      observer.observe(visibilityRef.current);
    }

    return () => {
      if (visibilityRef.current) {
        observer.unobserve(visibilityRef.current);
      }
      observer.disconnect();
    };
  }, []);
};

export default useObserver;
