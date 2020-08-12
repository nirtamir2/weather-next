import { css } from "linaria";
import React from "react";

interface IProps {
  onClick: () => void;
  children: React.ReactNode;
}

const buttonCss = css`
  padding: var(--gutterSmall);

  color: var(--button-color);
  font-size: inherit;
  font-family: inherit;

  background-color: var(--button-bg-color);
  outline: none;
  border-radius: var(--border-radius);
  border: 1px solid transparent;

  transition-duration: var(--transition-duration-fast);
  transition-property: border-color, background-color;

  &:hover {
    border-color: var(--button-color);
  }

  &:focus {
    border-color: var(--button-color);
  }

  &:focus:not(:active) {
    transform: translateY(-1px);
  }
`;

export function Button(props: IProps) {
  const { children, onClick } = props;
  return (
    <button onClick={onClick} className={buttonCss}>
      {children}
    </button>
  );
}
