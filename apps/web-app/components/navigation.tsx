import React from "react";
import { useRouter } from "next/router";
import { navigationOptions } from "../common/utilsApi";

export default function Navigation() {
  const router = useRouter();

  const navLinks = navigationOptions.map((detail) => (
    <li onClick={() => router.push(detail.URL)} key={detail.URL}>
      {detail.displayName}
    </li>
  ));

  return (
    <nav>
      <ul>{navLinks}</ul>
    </nav>
  );
}
