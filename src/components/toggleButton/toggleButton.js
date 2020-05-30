import React, { useEffect, useState } from 'react';
import './toggleButton.scss';

export const ToggleButton = () => {
  const [checked, setChecked] = useState(
    localStorage.getItem('theme') === 'dark' ? true : false
  );

  useEffect(() => {
    if (!localStorage.getItem('theme')) {
      window.matchMedia('(prefers-color-scheme: dark)').matches
        ? localStorage.setItem('theme', 'dark')
        : localStorage.setItem('theme', 'light');
    }

    document
      .querySelector('HTML')
      .setAttribute('data-theme', localStorage.getItem('theme'));

    setChecked(localStorage.getItem('theme') === 'dark' ? true : false);
  }, []);

  const toggleThemeChange = () => {
    if (!checked) {
      localStorage.setItem('theme', 'dark');
      document.querySelector('HTML').setAttribute('data-theme', 'dark');

      setChecked(true);
    } else {
      localStorage.setItem('theme', 'light');
      document.querySelector('HTML').setAttribute('data-theme', 'light');

      setChecked(false);
    }
  };

  return (
    <div className='toggle-button'>
      <label className='switch'>
        <input type='checkbox' onChange={toggleThemeChange} checked={checked} />
        <span className='slider round' />
      </label>
    </div>
  );
};
