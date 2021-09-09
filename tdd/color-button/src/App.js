import { useState } from "react";
import "./App.css";

export const replaceWithCamelWithSpaces = (colorName) => {
  return colorName.replace(/\B([A-Z])\B/g, ' $1');
}

function App() {
  const [buttonColor, setButtonColor] = useState("MediumVioletRed");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const buttonColorText = buttonColor === "MediumVioletRed" ? "MidnightBlue" : "MediumVioletRed";

  return (
    <div className="App">
      <button
        onClick={() => setButtonColor(buttonColorText)}
        disabled={isButtonDisabled}
        style={{ backgroundColor: isButtonDisabled ? 'gray' : buttonColor, color: "white" }}
      >
        Change to {replaceWithCamelWithSpaces(buttonColorText)}
      </button>
      <input
        type="checkbox"
        id="disable-button-checkbox"
        defaultChecked={isButtonDisabled}
        aria-checked={isButtonDisabled}
        onClick={() => {
          setIsButtonDisabled(prevState => !prevState);
        }}
      />
      <label htmlFor='disable-button-checkbox'>Disable Button</label>

    </div>
  );
}

export default App;
