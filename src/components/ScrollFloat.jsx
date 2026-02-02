// import { useEffect, useMemo, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const ScrollFloat = ({
//   children,
//   scrollContainerRef,
//   containerClassName = "",
//   textClassName = "",
//   animationDuration = 1,
//   ease = "none", // 🔥 linear
//   scrollStart = "top 85%",
//   scrollEnd = "bottom 60%",
//   stagger = 0.025,
// }) => {
//   const containerRef = useRef(null);

//   const splitText = useMemo(() => {
//     const text = typeof children === "string" ? children : "";
//     return text.split("").map((char, index) => (
//       <span className="inline-block" key={index}>
//         {char === " " ? "\u00A0" : char}
//       </span>
//     ));
//   }, [children]);

//   useEffect(() => {
//     const el = containerRef.current;
//     if (!el) return;

//     const scroller =
//       scrollContainerRef?.current || window;

//     const chars = el.querySelectorAll(".inline-block");

//     gsap.fromTo(
//       chars,
//       {
//         opacity: 0,
//         y: 24,
//       },
//       {
//         opacity: 1,
//         y: 0,
//         duration: animationDuration,
//         ease: ease,
//         stagger: stagger,
//         scrollTrigger: {
//           trigger: el,
//           scroller,
//           start: scrollStart,
//           end: scrollEnd,
//           scrub: true,
//         },
//       }
//     );
//   }, [
//     scrollContainerRef,
//     animationDuration,
//     ease,
//     scrollStart,
//     scrollEnd,
//     stagger,
//   ]);

//   return (
//     <h2
//       ref={containerRef}
//       className={`my-5 overflow-hidden ${containerClassName}`}
//     >
//       <span
//         className={`inline-block text-[clamp(1.6rem,4vw,3rem)] leading-[1.4] ${textClassName}`}
//       >
//         {splitText}
//       </span>
//     </h2>
//   );
// };

// export default ScrollFloat;
