
import { useState } from 'react';
import './App.css';

const COUNTRIES: { id: number, label: string }[] = [
  { id: 1, label: 'USA' },
  { id: 2, label: 'India' },
  { id: 3, label: 'France' },
]

const INITIAL_STATE: { [key: string]: boolean; } = COUNTRIES.reduce((o, key) => ({ ...o, [key.label]: false}), {})

function App() {
  const [checkedAll, setCheckedAll] = useState(false);
  const [checked, setChecked] = useState(INITIAL_STATE);

  const selectAll = (value: boolean) => {
    setCheckedAll(prevState => !prevState)
    setChecked(prevState => {
      const newState = { ...prevState };
      for (const key in newState) {
        newState[key] = value;
      }
      return newState;
    });
  }

  const toggleCheck = (key: string) => {
    const prevValue = checked[key]
    setChecked(prevState => ({ ...prevState, [key]: !prevValue }))
    if (prevValue && checkedAll) setCheckedAll(false)
  };

  return (
    <div className='container'>
      <div>
        <label>Select All</label>
        <input
          type="checkbox"
          onChange={(event) => selectAll(event.target.checked)}
          checked={checkedAll}
        />
      </div>
      {COUNTRIES.map(country => (
        <div>
          <label>{country.label}</label>
          <input
            type="checkbox"
            name={country.label}
            onChange={() => toggleCheck(country.label)}
            checked={checked[country.label]}
            />
        </div>
      ))}
    </div>
  );
}

export default App;
