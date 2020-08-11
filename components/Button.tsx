import { css } from "linaria";
import React from "react";

interface IProps {
  onClick: () => void;
  children: React.ReactNode;
}

const buttonCss = css`
  border-radius: var(--gutter);
  padding: var(--gutterSmall);
  background-color: var(--button-bg-color);
  outline: none;

  border: 1px solid transparent;

  color: var(--button-color);
  font-size: inherit;
  font-family: inherit;

  transition-duration: var(--transition-duration-fast);
  transition-property: border-color, background-color;

  &:hover {
    background-color: var(--body-bg-color);
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
  const { children } = props;
  return <button className={buttonCss}>{children}</button>;
}
