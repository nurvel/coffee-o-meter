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
        <footer>
          <p>Footer Here</p>
        </footer>
      </main>
    </>
  );
}
