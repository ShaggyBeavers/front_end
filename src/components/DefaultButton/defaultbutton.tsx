import "./defaultbutton.css";

interface buttonProps{
    height: number,
    width: number,
    font?: string;
    text: string,
    action: ()=>void,
};

const DefaultButton = ({height, width, font, text, action}: buttonProps) => {
    const buttonStyle = {
        height: `${height}px`,
        width: `${width}px`,
        fontSize: font ? `${font}` : '13px',
    };


  return (
    <button 
        className="default-button"
        style={buttonStyle}
        onClick={action}
    >
        {text}
    </button>
  );
};

export default DefaultButton;