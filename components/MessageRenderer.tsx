
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface MessageRendererProps {
  message: string;
  styleId?: 'clean' | 'handwritten' | 'typewriter' | 'cinematic';
  className?: string;
}

const MessageRenderer: React.FC<MessageRendererProps> = ({ message, styleId = 'clean', className = "" }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (styleId === 'typewriter') {
      setIsTyping(true);
      setDisplayedText("");
      let i = 0;
      const filteredMsg = message.replace(/\n\n+/g, '\n');
      const timer = setInterval(() => {
        setDisplayedText(filteredMsg.substring(0, i));
        i++;
        if (i > filteredMsg.length) {
          clearInterval(timer);
          setIsTyping(false);
        }
      }, 50); // Speed of typewriter
      return () => clearInterval(timer);
    } else {
      setDisplayedText(message);
      setIsTyping(false);
    }
  }, [message, styleId]);

  const styles = {
    clean: "font-nunito text-gray-800 leading-relaxed",
    handwritten: "font-romantic text-gray-800 leading-relaxed",
    cinematic: "font-serif italic text-gray-800 leading-snug drop-shadow-sm",
    typewriter: "font-mono text-gray-700 leading-relaxed border-r-2 border-pink-500 pr-1 animate-pulse"
  };

  const currentStyle = styles[styleId] || styles.clean;

  if (styleId === 'cinematic') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className={`${currentStyle} ${className}`}
      >
        {message.split('\n').map((line, i) => (
          <p key={i} className="mb-4">{line}</p>
        ))}
      </motion.div>
    );
  }

  if (styleId === 'typewriter') {
    return (
      <div className={`${currentStyle} ${className} ${isTyping ? 'border-pink-500' : 'border-transparent'}`}>
        {displayedText.split('\n').map((line, i) => (
          <p key={i} className="mb-2">{line}</p>
        ))}
      </div>
    );
  }

  return (
    <motion.div 
      className={`${currentStyle} ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {message.split('\n').map((line, i) => (
        <p key={i} className="mb-4">{line}</p>
      ))}
    </motion.div>
  );
};

export default MessageRenderer;
