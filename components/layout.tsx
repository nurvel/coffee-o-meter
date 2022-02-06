import styles from "../styles/Home.module.css";
import { Text } from "@nextui-org/react";
import Navigation from "./navigation";

type Props = {
  children: JSX.Element;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <main>
        <Navigation />
        {children}
        <footer className={styles.footer}>
          <Text>Footer Here</Text>
        </footer>
      </main>
    </>
  );
}
