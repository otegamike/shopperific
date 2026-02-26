import React, { useState } from 'react';

interface ReadMoreProps {
  children: string;
  wordLimit: number;
}

const ReadMore: React.FC<ReadMoreProps> = ({ children, wordLimit }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const words = children.split(/\s+/);
  
  // If text is short, just show it
  if (words.length <= wordLimit) {
    return <p>{children}</p>;
  }

  const toggleText = () => setIsExpanded(!isExpanded);

  return (
    <p>
      {isExpanded ? children : words.slice(0, wordLimit).join(' ') + '... '}
      <span 
        onClick={toggleText} 
        style={{ color: 'var(--primary-color)', cursor: 'pointer', fontWeight: '500', transform: 'scale(0.7)' }}
      >
        {isExpanded ? ' Read Less' : 'Read More'}
      </span>
    </p>
  );
};

export default ReadMore;