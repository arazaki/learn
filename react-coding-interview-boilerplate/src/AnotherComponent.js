import { useContext } from "react";
import { useAppContext } from "./App";

export const AnotherComponent = () => {
  const { title } = useAppContext();
  return (
    <div>
      <h1>Another component - {title} </h1>
    </div>
  );
};
