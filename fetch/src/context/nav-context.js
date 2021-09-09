import { useState, createContext } from "react";

const NavContext = createContext();

export const NavContextProvider = props => {
  const [expand, setExpand] = useState('Polstermöbel');

  return (
    <NavContext.Provider value={{ expand, setExpand }}>
      {props.children}
    </NavContext.Provider>
  );
};

export default NavContext;