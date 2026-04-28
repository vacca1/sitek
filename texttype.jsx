// TextType — adapted for inline-Babel React (no GSAP, no imports)
const { useState: tt_useState, useEffect: tt_useEffect, useRef: tt_useRef, useMemo: tt_useMemo, useCallback: tt_useCallback, createElement: tt_createElement } = React;

function TextType({
  text,
  as: Component = "span",
  typingSpeed = 55,
  initialDelay = 0,
  pauseDuration = 2200,
  deletingSpeed = 28,
  loop = true,
  className = "",
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = "|",
  cursorClassName = "",
  cursorBlinkDuration = 0.55,
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
  style,
  ...props
}) {
  const [displayedText, setDisplayedText] = tt_useState("");
  const [currentCharIndex, setCurrentCharIndex] = tt_useState(0);
  const [isDeleting, setIsDeleting] = tt_useState(false);
  const [currentTextIndex, setCurrentTextIndex] = tt_useState(0);
  const [isVisible, setIsVisible] = tt_useState(!startOnVisible);
  const containerRef = tt_useRef(null);

  const textArray = tt_useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

  const getRandomSpeed = tt_useCallback(() => {
    if (!variableSpeed) return typingSpeed;
    const { min, max } = variableSpeed;
    return Math.random() * (max - min) + min;
  }, [variableSpeed, typingSpeed]);

  const getCurrentTextColor = () => {
    if (!textColors || textColors.length === 0) return "inherit";
    return textColors[currentTextIndex % textColors.length];
  };

  tt_useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setIsVisible(true); }),
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [startOnVisible]);

  tt_useEffect(() => {
    if (!isVisible) return;
    let timeout;
    const currentText = textArray[currentTextIndex];
    const processedText = reverseMode ? currentText.split("").reverse().join("") : currentText;

    const exec = () => {
      if (isDeleting) {
        if (displayedText === "") {
          setIsDeleting(false);
          if (currentTextIndex === textArray.length - 1 && !loop) return;
          if (onSentenceComplete) onSentenceComplete(textArray[currentTextIndex], currentTextIndex);
          setCurrentTextIndex((p) => (p + 1) % textArray.length);
          setCurrentCharIndex(0);
          timeout = setTimeout(() => {}, pauseDuration);
        } else {
          timeout = setTimeout(() => setDisplayedText((p) => p.slice(0, -1)), deletingSpeed);
        }
      } else {
        if (currentCharIndex < processedText.length) {
          timeout = setTimeout(() => {
            setDisplayedText((p) => p + processedText[currentCharIndex]);
            setCurrentCharIndex((p) => p + 1);
          }, variableSpeed ? getRandomSpeed() : typingSpeed);
        } else if (textArray.length >= 1) {
          if (!loop && currentTextIndex === textArray.length - 1) return;
          timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      }
    };

    if (currentCharIndex === 0 && !isDeleting && displayedText === "") {
      timeout = setTimeout(exec, initialDelay);
    } else {
      exec();
    }
    return () => clearTimeout(timeout);
  }, [currentCharIndex, displayedText, isDeleting, typingSpeed, deletingSpeed, pauseDuration, textArray, currentTextIndex, loop, initialDelay, isVisible, reverseMode, variableSpeed]);

  // reset displayed text when text array changes (e.g. language switch)
  tt_useEffect(() => {
    setDisplayedText("");
    setCurrentCharIndex(0);
    setIsDeleting(false);
    setCurrentTextIndex(0);
  }, [textArray.join("|")]);

  const shouldHideCursor = hideCursorWhileTyping && (currentCharIndex < (textArray[currentTextIndex] || "").length || isDeleting);

  return tt_createElement(
    Component,
    { ref: containerRef, className: `text-type ${className}`, style },
    React.createElement("span", { className: "text-type__content", style: { color: getCurrentTextColor() } }, displayedText),
    showCursor && React.createElement("span", {
      className: `text-type__cursor ${cursorClassName} ${shouldHideCursor ? "text-type__cursor--hidden" : ""}`,
    }, cursorCharacter)
  );
}

Object.assign(window, { TextType });
