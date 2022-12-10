import * as ReactDOM from 'react-dom/client';
import React, { ChangeEvent, useState } from 'react';

function AppRoot() {
  //   const [];
  // add state here
  return <>Hello World</>;
}

function main() {
  const div = document.getElementById('root')!;
  const root = ReactDOM.createRoot(div);
  root.render(<AppRoot />);
}

window.addEventListener('load', main, { once: true });
