import { css } from "linaria";
import React from "react";

interface IProps {
  children: React.ReactNode;
}

const mainCss = css`
  margin-top: var(--header-height);
  height: calc(100vh - var(--header-height));

  overflow: auto;
`;

const headerCss = css`
  width: 100%;
  height: var(--header-height);
  padding: var(--gutter);

  position: fixed;

  display: grid;
  grid-auto-flow: column;
  align-items: center;

  border-bottom: 1px solid var(--border-color);
  background-color: var(--bg-color);
`;

const headerTitleCss = css`
  font-size: var(--font-size-title);
  color: var(--body-color);
`;

export function Layout(props: IProps) {
  const { children } = props;

  return (
    <>
      <header className={headerCss}>
        <h1 className={headerTitleCss}>Weather App</h1>
      </header>
      <main className={mainCss}>{children}</main>
    </>
  );
}
