/* eslint-disable max-len */
import React from 'react';

interface IProps {
  fill?: string,
  width?: number,//original 45
  height?: number//original 37
}

const IconBike: React.FC<IProps> = (({ fill= 'red', width = 24.6, height= 30}) => {
  return (
    // its a SVG example, it`s by half, or corrupted, to not occupy large caracter space here, use your SVG file here...
    <svg width={width} height={height} viewBox="0 0 26 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 12.781 0.357 C 6.028 0.357 0.532 5.963 0.532 12.854 C 0.532 14.922 1.04 16.973 2.003 18.793 L 12.112 32.637 C 12.247 32.886 12.502 33.04 12.781 33.04 C 13.06 33.04 13.316 32.886 13.452 32.637 L 23.564 18.786 C 24.524 16.973 25.031 14.922 25.031 12.854 C 25.031 5.963 19.536 0.357 12.781 0.357 Z" fill={fill} />
      <path className="bike1" d="M 7.871 20.859 C 5.374 20.859 3.812 17.908 5.061 15.547 C 6.311 13.186 9.432 13.186 10.681 15.547 C 10.967 16.085 11.117 16.694 11.117 17.319 C 11.113 19.273 9.662 20.856 7.871 20.859 Z M 7.871 15.35 C 6.483 15.35 5.617 16.989 6.311 18.302 C 7.005 19.614 8.739 19.614 9.432 18.302 C 9.589 18.004 9.674 17.668 9.674 17.325 C 9.679 16.235 8.871 15.35 7.871 15.35 Z" />
      <path className="bike1" d="M 17.248 20.859 C 14.749 20.859 13.187 17.908 14.437 15.547 C 15.686 13.186 18.808 13.186 20.058 15.547 C 20.342 16.085 20.493 16.694 20.493 17.319 C 20.488 19.273 19.037 20.856 17.248 20.859 Z M 17.248 15.35 C 15.859 15.35 14.991 16.989 15.686 18.302 C 16.379 19.614 18.114 19.614 18.808 18.302 C 18.966 18.003 19.05 17.663 19.05 17.319 C 19.05 16.231 18.242 15.35 17.248 15.35 Z" />
      <path className="bike1" d="M 12.56 18.498 C 12.16 18.498 11.838 18.146 11.838 17.711 L 11.838 14.894 L 9.531 12.383 C 9.247 12.075 9.247 11.573 9.531 11.265 L 11.564 9.093 C 11.918 8.625 12.602 8.751 12.797 9.319 C 12.907 9.643 12.811 10.007 12.56 10.218 L 11.053 11.792 L 13.058 13.972 C 13.205 14.126 13.285 14.341 13.281 14.564 L 13.281 17.711 C 13.281 18.146 12.957 18.498 12.56 18.498 Z" />
      <path className="bike1" d="M 16.395 12.745 L 14.233 12.745 C 14.044 12.744 13.862 12.662 13.727 12.517 L 11.564 10.218 C 11.124 9.848 11.214 9.098 11.728 8.867 C 12.02 8.735 12.357 8.827 12.56 9.093 L 14.514 11.17 L 16.383 11.17 C 16.937 11.17 17.284 11.826 17.006 12.351 C 16.878 12.594 16.639 12.745 16.383 12.745 Z" />
      <circle className="bike1" cx="14.32" cy="4" r="2" transform="matrix(0.721159, 0, 0, 0.787069, 3.905845, 4.331152)" />
    </svg>
  );
});
export default IconBike;
