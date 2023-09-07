import React, { HTMLProps } from "react";
import "./styles.css";

interface Props extends HTMLProps<HTMLButtonElement> {
  title?: string;
  color?: "success" | "remove";
  onClick?: () => void;
}

export default function Button({
  title = "Acessar minha conta",
  color = "success",
  onClick,
}: Props) {
  return (
    <button
      className={`button ${color === "success" ? "success" : "remove"}`}
      type="submit"
      onClick={onClick}
    >
      {title}
    </button>
  );
}
