import React from "react";

export interface IProps {
  client?: boolean;
  server?: boolean;
  children: JSX.Element;
}

export function ConditionallyRender(props: IProps) {
  const { client, server, children } = props;
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => setIsMounted(true), []);

  if (!isMounted && client != null) {
    return null;
  }

  if (isMounted && server != null) {
    return null;
  }

  return children;
}
