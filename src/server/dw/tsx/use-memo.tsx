import { createContext, memo, use, useMemo, useState } from "react";

const ColorContext = createContext<string | null>(null);

function useColor() {
  const color = use(ColorContext);
  if (!color) throw new Error("ColorContext not found");
  return color;
}

const Footer = memo(function ({ name }: { name: string }) {
  console.log("i rendered");
  const color = useColor();
  return (
    <footer style={{ color }}>
      I am the ({color}) footer, {name || "Unnamed"}
    </footer>
  );
});

function Main({ footer }: { footer: React.ReactNode }) {
  const [count, setCount] = useState(0);
  const increment = () => setCount((c) => c + 1);
  return (
    <div>
      <button onClick={increment}>The count is {count}</button>
      {footer}
    </div>
  );
}

export function UseMemoApp() {
  const [appCount, setAppCount] = useState(0);
  const [color, setColor] = useState("black");
  const [name, setName] = useState("Kody");

  return (
    <ColorContext value={color}>
      <div>
        <div>
          <p>Set the footer color:</p>
          <div style={{ display: "flex", gap: 4 }}>
            <button onClick={() => setColor("black")}>Black</button>
            <button onClick={() => setColor("blue")}>Blue</button>
            <button onClick={() => setColor("green")}>Green</button>
          </div>
        </div>
        <div>
          <p>Set the footer name:</p>
          <label>
            Name:
            <input
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
          </label>
        </div>
        <button onClick={() => setAppCount((c) => c + 1)}>
          The app count is {appCount}
        </button>
        <Main footer={<Footer name={name} />} />
      </div>
    </ColorContext>
  );
}
