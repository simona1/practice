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
  const cannotSubmit = sidesAsInt == null;

  const onChangeDieSides = (e: ChangeEvent<HTMLInputElement>) => {
    setSidesAsString(e.target.value);
  };

  const onSubmit = cannotSubmit
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

  const isSubmitDisabled = onSubmit == null || isSubmitting;

  return (
    <>
      Die roll{' '}
      <input
        type="text"
        placeholder="type die sides"
        value={sidesAsString}
        onChange={onChangeDieSides}
        disabled={isSubmitting}
      />
      <button onClick={onSubmit} disabled={isSubmitDisabled}>
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
  const container = document.getElementById('root')!;
  ReactDOM.createRoot(container).render(<AppRoot />);
}

window.addEventListener('load', main, { once: true });
