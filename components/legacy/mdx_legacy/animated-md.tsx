// src/components/magicui/animated-markdown.tsx
"use client";

import React, {
  ElementType,
  PropsWithChildren,
  useEffect,
  useRef,
} from "react"; // Added useEffect, useRef
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Components } from "react-markdown";

// Animation types (no changes)
export type AnimationType = "text" | "word" | "character" | "line";
export type AnimationVariant =
  | "fadeIn"
  | "blurIn"
  | "blurInUp"
  | "blurInDown"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight"
  | "scaleUp"
  | "scaleDown";

// animationVariants object (no changes)
const animationVariants = {
  fadeIn: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  },
  blurIn: {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.5 },
    },
  },
  blurInUp: {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5 },
    },
  },
  blurInDown: {
    hidden: { opacity: 0, y: -20, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5 },
    },
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  },
  slideDown: {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  },
  slideRight: {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        scale: { type: "spring", damping: 15, stiffness: 300 },
      },
    },
  },
  scaleDown: {
    hidden: { opacity: 0, scale: 1.2 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        scale: { type: "spring", damping: 15, stiffness: 300 },
      },
    },
  },
};

// containerVariants object (no changes)
const containerVariants = {
  hidden: { opacity: 1 }, // Container itself is not animated
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

// splitText function (no changes)
const splitText = (text: string, by: AnimationType): string[] => {
  switch (by) {
    case "word":
      return text.split(/(\s+)/);
    case "character":
      return text.split("");
    case "line":
      return text.split("\n").filter((line) => line.trim() !== "");
    case "text":
    default:
      return [text];
  }
};

// extractText function (no changes)
const extractText = (node: React.ReactNode): string => {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (React.isValidElement(node)) {
    if (node.props) {
      return extractText(
        (node.props as { children?: React.ReactNode }).children,
      );
    }
  }
  return "";
};

// --- AnimatedText Component (UPDATED) ---
function AnimatedText({
  text,
  animation = "fadeIn",
  by = "word",
  className,
  elementType = "p",
  delay = 0,
  enableAnimation = true, // Added prop, default true
}: {
  text: string;
  animation: AnimationVariant;
  by: AnimationType;
  className?: string;
  elementType?: ElementType;
  delay?: number;
  enableAnimation?: boolean; // Added prop type
}) {
  const MotionComponent = motion(elementType as any);
  const segments = splitText(text, by);
  const validSegments = segments.filter((segment) => segment.length > 0);

  // Determine initial state based on enableAnimation
  const initialVariant = enableAnimation ? "hidden" : "visible";
  // Only use whileInView if animation is enabled
  const whileInViewVariant = enableAnimation ? "visible" : undefined;

  return (
    <MotionComponent
      className={cn("whitespace-pre-wrap", className)}
      variants={containerVariants}
      initial={initialVariant} // Use calculated initial state
      whileInView={whileInViewVariant} // Use calculated whileInView trigger
      // Keep viewport settings, `once: true` is important
      viewport={{ once: true, amount: 0.2, margin: "-50px 0px -50px 0px" }}
      transition={{ staggerChildren: 0.05, delayChildren: delay }}
    >
      {validSegments.map((segment, i) => (
        <motion.span
          key={`${segment}-${i}`}
          // Use animation variants only if animation is enabled
          variants={enableAnimation ? animationVariants[animation] : {}}
          className={cn(
            "inline-block",
            segment === " " ? "whitespace-pre" : "",
            by === "line" && "block mb-1",
          )}
        >
          {segment === " " ? "\u00A0" : segment}
        </motion.span>
      ))}
    </MotionComponent>
  );
}

// MarkdownComponentProps type (no changes)
type MarkdownComponentProps = PropsWithChildren<{
  node?: any;
  className?: string;
  [key: string]: any;
}>;

// --- createAnimatedRenderer (UPDATED) ---
// Now accepts enableAnimation config
const createAnimatedRenderer = (
  elementType: ElementType,
  config: {
    animation: AnimationVariant;
    by: AnimationType;
    delay: number;
    enableAnimation: boolean; // Added config option
  },
) => {
  return ({ children, className, node, ...props }: MarkdownComponentProps) => {
    const text = extractText(children);

    if (!text.trim()) {
      const Component = elementType as any;
      return (
        <Component className={className} {...props}>
          {children}
        </Component>
      );
    }

    return (
      <AnimatedText
        text={text}
        animation={config.animation}
        by={config.by}
        className={className}
        elementType={elementType}
        delay={config.delay}
        enableAnimation={config.enableAnimation} // Pass enableAnimation down
      />
    );
  };
};

// --- AnimatedMarkdown Component Props (UPDATED) ---
interface AnimatedMarkdownProps {
  content: string;
  className?: string;
  animation?: AnimationVariant;
  by?: AnimationType;
  delay?: number;
  headingAnimation?: AnimationVariant;
  enableAnimation?: boolean; // Added prop
}

// --- AnimatedMarkdown Component (UPDATED) ---
export function AnimatedMarkdown({
  content,
  className,
  animation = "blurInUp",
  by = "word",
  delay = 0,
  headingAnimation = "blurIn",
  enableAnimation = true, // Default to true
}: AnimatedMarkdownProps) {
  // Create the configuration for ReactMarkdown components, passing enableAnimation
  const animatedComponents: Components = {
    p: createAnimatedRenderer("p", { animation, by, delay, enableAnimation }),
    h1: createAnimatedRenderer("h1", {
      animation: headingAnimation,
      by,
      delay,
      enableAnimation,
    }),
    h2: createAnimatedRenderer("h2", {
      animation: headingAnimation,
      by,
      delay,
      enableAnimation,
    }),
    h3: createAnimatedRenderer("h3", {
      animation: headingAnimation,
      by,
      delay,
      enableAnimation,
    }),
    h4: createAnimatedRenderer("h4", {
      animation: headingAnimation,
      by,
      delay,
      enableAnimation,
    }),
    h5: createAnimatedRenderer("h5", {
      animation: headingAnimation,
      by,
      delay,
      enableAnimation,
    }),
    h6: createAnimatedRenderer("h6", {
      animation: headingAnimation,
      by,
      delay,
      enableAnimation,
    }),
    li: ({ children, className, node, ...props }: MarkdownComponentProps) => {
      const text = extractText(children);
      if (!text.trim()) {
        return (
          <li className={className} {...props}>
            {children}
          </li>
        );
      }
      return (
        <li className={className} {...props}>
          <AnimatedText
            text={text}
            animation={animation}
            by={by}
            elementType="span"
            delay={delay}
            enableAnimation={enableAnimation} // Pass enableAnimation down
          />
        </li>
      );
    },
  };

  return (
    <ReactMarkdown
      className={className}
      remarkPlugins={[remarkGfm]}
      components={animatedComponents}
    >
      {content}
    </ReactMarkdown>
  );
}
