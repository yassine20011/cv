import React from 'react';

const NextImageMock: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
    return <img src={src} alt={alt} />;
};

export default NextImageMock;