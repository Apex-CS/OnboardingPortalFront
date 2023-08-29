import React, { useState } from 'react';

type StarRatingProps = {
  rating: number;
  onRatingChange?: (newRating: number) => void;
  customClass?: string,
  onlyReview?: boolean,
};

const StarRating = ({ rating, onRatingChange, customClass = `w-10 h-10`, onlyReview = false }: StarRatingProps) => {  
  const defaultClass = `text-yellow-400 ${customClass}`;
  const defaultDisabledClass = `text-gray-300 dark:text-gray-500 ${customClass}`;
  const [hoverRating, setHoverRating] = useState(0);
  
  const handleMouseEnter = (rating: number) => {
    setHoverRating(rating);
  };
  
  const handleMouseLeave = () => {
    setHoverRating(0);
  };
  
  const handleClick = (rating: number) => {
    if (onRatingChange) {
        onRatingChange(rating);
    }
        
  };
  
  const renderStar = (starRating: number) => {
    const filled = starRating <= rating || starRating <= hoverRating;
    const cssClass = filled ? 'filled text-yellow-400' : 'no-filled';
    
    return (
      <span
        style={{'pointerEvents': onlyReview ? 'none' : 'auto'}}
        className={`star  ${cssClass}`}
        key={starRating}
        onMouseEnter={() => handleMouseEnter(starRating) }
        onMouseLeave={() => handleMouseLeave() }
        onClick={() => handleClick(starRating)}
      >
        {filled ? (
          <svg aria-hidden="true" className={defaultClass} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
        ) : (
          <svg aria-hidden="true" className={defaultDisabledClass} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>

        )}
      </span>
    );
  };
  
  return (
    <div className="star-rating flex">
      {[1,2,3,4,5].map(renderStar)}
    </div>
  );
};

export default StarRating;