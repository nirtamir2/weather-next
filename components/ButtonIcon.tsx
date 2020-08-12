import { css } from "linaria";
import React from "react";

interface IProps {
  children: React.ReactNode;
  onClick: () => void;
}

const buttonIconCss = css`
  padding: 0;

  background: none;
  border: none;

  display: flex;
  align-items: center;
  justify-content: center;

  font: inherit;
  color: var(--title-color);

  cursor: pointer;

  :hover {
    color: var(--button-color);
  }
`;

export function ButtonIcon(props: IProps) {
  const { children, onClick } = props;
  return (
    <button className={buttonIconCss} onClick={onClick}>
      {children}
    </button>
  );
}
