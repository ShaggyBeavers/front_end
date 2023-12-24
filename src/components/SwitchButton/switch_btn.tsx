import './switch_btn.css';

export default function SwitchBtn() {   
    return (
        <div className="switch__container">
              <input id="switch-flat" className="switch switch--flat" type="checkbox" />
              <label htmlFor="switch-flat"></label>
            </div>
    )
}