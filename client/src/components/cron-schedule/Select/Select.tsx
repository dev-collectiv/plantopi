import React, { MutableRefObject, useRef } from 'react';
import style from './Select.module.scss';

type onChangeFn = (label: string, event: string) => any;

interface ISelect {
  onChangeFn: onChangeFn;
  options: string[] | number[];
  label: string;
  defaultOption?: string;
  initialOption?: string;
  maxWidth?: string;
}

const Select: React.FC<ISelect> = ({ label, options, onChangeFn, defaultOption, initialOption, maxWidth = '80px' }) => {
  const selectRef = useRef() as MutableRefObject<HTMLSelectElement>;

  function renderOptions() {
    const _options = defaultOption ? [defaultOption, ...options] : options;

    return _options.map((option, idx) => (
      <option value={option} key={idx}>
        {option}
      </option>
    ));
  }

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    onChangeFn(label, event.target.value);
    if (defaultOption) selectRef.current.value = defaultOption;
  }

  return (
    <>
      <select className={style.select} onChange={handleChange} value={initialOption} ref={selectRef} style={{ maxWidth }} id={label}>
        {renderOptions()}
      </select>
    </>
  );
};

export default Select;
