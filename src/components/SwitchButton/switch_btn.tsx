import './switch_btn.css';

interface SwitchBtnProps {
    onToggle: (isChecked: boolean | null) => void;
}

export default function SwitchBtn({ onToggle }: SwitchBtnProps) {
    const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        onToggle(isChecked ? true : null);
        console.log(isChecked)
    };


    return (
        <div className="switch__container">
            <input
                id="switch-flat"
                className="switch switch--flat"
                type="checkbox"
                onChange={handleToggle}
            />
            <label htmlFor="switch-flat"></label>
        </div>
    );
}
