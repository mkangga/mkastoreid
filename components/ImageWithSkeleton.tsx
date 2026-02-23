import React, { useState } from 'react';

interface ImageWithSkeletonProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
}

export const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({ src, alt, className, wrapperClassName = '', ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden w-full h-full ${wrapperClassName}`}>
      {/* Skeleton / Shimmer */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-800 animate-pulse z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-700/50 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
        </div>
      )}
      
      <img
        src={src}
        alt={alt}
        className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className || 'w-full h-full object-cover'}`}
        onLoad={() => setIsLoaded(true)}
        {...props}
      />
    </div>
  );
};
