import React from "react";

interface SelectProps {
  options: Array<SelectOptionType>;
  className: string;
}

export interface SelectOptionType {
  value: string | number;
  text: string | number;
}

const Select = ({ options, className }: SelectProps) => {
  console.log(options);
  return (
    <>
      <label htmlFor="my-select" className="my-select-label">
        <select id="my-select" required className={className}>
          {options.map((x) => (
            <option value={x.value} key={x.value}>
              {x.text}
            </option>
          ))}
        </select>
        <svg className="select-arrow-svg">
          <use xlinkHref="#select-arrow-down"></use>
        </svg>
      </label>
      <svg className="select-sprite">
        <symbol id="select-arrow-down" viewBox="0 0 10 6">
          <polyline points="1 1 5 5 9 1" />
        </symbol>
      </svg>
    </>
  );
};

Select.defaultProps = { className: "" };

export default Select;
