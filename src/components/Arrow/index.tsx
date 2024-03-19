import { CSSProperties } from 'react';

const Arrow = (props: any) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            style={props.arrowStyles}
            className={props.className}
            // width="15"
            // height="9"
            viewBox="0 0 15 9"
            fill="none"
        >
            <path
                d="M1.90332 1.49829L7.90332 7.49829L13.9033 1.49829"
                // stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default Arrow;
