import React from 'react';

interface LogoProps {
    size: string;
    color: string;
}

const Logo: React.FC<LogoProps> = ({ size, color }) => {
    return (
        <div>
            {color === 'white' ? (
                <img src="./logo/pectoral-logo-w.svg"  style={{ width: size }}/>
            ) : (
                <img src="./logo/pectoral-logo-b.svg" style={{ width: size }} />
            )}
        </div>
    );
};

export default Logo;
