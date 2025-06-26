import { useActionState, useState } from "react";
import { create } from "zustand";
import { Button } from "~/client/components/ui/button";

type TStore = {
  color: string;
  setColor: (color: string) => void;
};

const useStore = create<TStore>()((set) => ({
  color: "white",
  setColor: (color) =>
    set(() => ({
      color,
    })),
}));

function Message({ greeting }: { greeting: string }) {
  console.log("rendering greeting", greeting);
  return <div>{greeting}</div>;
}

const message = <Message greeting="Hello!" />;

function Counter() {
  const [count, setCount] = useState(0);
  const increment = () => setCount((c) => count + 1);
  return (
    <div>
      <Button onClick={increment}>The count is {count}</Button>
      {message}
    </div>
  );
}

//____ Two
function Footer() {
  const color = useStore((s) => s.color);
  return <footer style={{ color }}>I am the ({color}) footer</footer>;
}

const footer = <Footer />;

function Main() {
  const [count, setCount] = useState(0);
  const increment = () => setCount((c) => c + 1);
  return (
    <div>
      <button onClick={increment}>The count is {count}</button>
      {footer}
    </div>
  );
}

function App() {
  const setColor = useStore((s) => s.setColor);
  return (
    <div>
      <div>
        <p>Set the footer color:</p>
        <div style={{ display: "flex", gap: 4 }}>
          <button onClick={() => setColor("black")}>Black</button>
          <button onClick={() => setColor("blue")}>Blue</button>
          <button onClick={() => setColor("green")}>Green</button>
        </div>
      </div>
      <Main />
    </div>
  );
}
