import * as ReactDOM from 'react-dom/client';
import React, { ChangeEvent, useState } from 'react';

import { validatePosInt } from '../server/utils';

const PATH = '/api/v1/rolldie/';

function AppRoot() {
  const [dieValue, setDieValue] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sidesAsString, setSidesAsString] = useState('');

  const sidesAsInt = validatePosInt(sidesAsString);
  const canSubmit = Number.isNaN(sidesAsInt) || sidesAsInt == null;

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSidesAsString(e.target.value);
  };

  const onSubmit = canSubmit
    ? undefined
    : async () => {
        setErrorMessage(null);
        setIsSubmitting(true);

        try {
          const response = await fetch(PATH, {
            method: 'POST',
            body: JSON.stringify({ dieSides: sidesAsInt }),
          });
          const data = await response.json();
          setDieValue(data.roll);
        } catch (err) {
          setErrorMessage((err as Error).message);
          console.error('Error fetching the die sides', err);
        }
        setIsSubmitting(false);
      };

  const isDisabled = onSubmit == null || isSubmitting;

  return (
    <>
      Die roll
      <input
        type="text"
        placeholder="type die sides"
        value={sidesAsString}
        onChange={onChangeValue}
        disabled={isSubmitting}
      />
      <button onClick={onSubmit} disabled={isDisabled}>
        Submit
      </button>
      {dieValue !== 0 && <div>{`Die roll value: ${dieValue}`} </div>}
      {errorMessage != null && (
        <div>{`An error has occured: ${errorMessage}`}</div>
      )}
    </>
  );
}

function main() {
  const div = document.getElementById('root')!;
  const root = ReactDOM.createRoot(div);
  root.render(<AppRoot />);
}

window.addEventListener('load', main, { once: true });
