import { Input } from "antd";
import { useEffect, useState } from "react";

export default function Search({
  setTerm,
}: {
  setTerm: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTerm(inputValue);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  return (
    <Input.Search
      placeholder="EX: amsanei.github.io"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
}
