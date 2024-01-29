import './defaultbutton.css';

interface buttonProps {
    height: number;
    width: number;
    font?: string;
    text: string;
    action: () => void;
    selected?: boolean;
}

const DefaultButton = ({ height, width, font, text, action, selected }: buttonProps) => {
    const buttonStyle = {
        height: `${height}px`,
        width: `${width}px`,
        fontSize: font ? `${font}` : '13px',
    };

    return (
        <button className={`default-button ${selected ? 'selected' : ''}`} style={buttonStyle} onClick={action}>
            {text}
        </button>
    );
};

export default DefaultButton;
