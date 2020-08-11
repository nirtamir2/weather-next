import { css } from "linaria";
import React from "react";

import { Button } from "./Button";

interface IProps {
  children: React.ReactNode;
}

const headerCss = css`
  position: sticky;

  height: var(--header-height);
  padding: var(--gutter);

  display: grid;
  grid-gap: var(--gutter);
  grid-auto-flow: column;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid var(--border-color);
`;

const headerTitleCss = css`
  font-size: var(--font-size-title);
  color: var(--body-color);
`;

export function Layout(props: IProps) {
  const { children } = props;

  function handleClickAddCity() {
    //   NOOP
  }

  return (
    <>
      <header className={headerCss}>
        <h1 className={headerTitleCss}>Weather App</h1>
        <Button onClick={handleClickAddCity}>Add City</Button>
      </header>
      <main>{children}</main>
    </>
  );
}
