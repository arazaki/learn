/**
 * 
1. If the user clicks on the bullet icon (>) it should expand all 
the child elements of this item.
- If any other children elements were previously expanded they 
should collapse, in order to display only one children group.
2. Only the elements with children should display the bullet icon (>).
3. If the user clicks the text, it should change the color 
(to simulate the navigation that displays the current page)
4. And finally this menu should be developed using the JSON 
file attached to this email
 */

/**
 * Questions:
 *
 * Steps:
 * - import styled components
 * - Structure:
 *   - Nav
 *     - NavItem
 *       - NavLink [name] [icon]
 *       - NavMenu
 *         - NavItem...
 * - visible NavMenus stored like breadcrumbs -> useState or context ?
 * - pass parent params to child -> array?
 * - useEffect to fetch data
 * - useState do store data fetched
 */

import styled, { createGlobalStyle } from "styled-components";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { NavContextProvider } from "./context/nav-context";
import NavContext from "./context/nav-context";

const GlobalStyles = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html{
    font-size: 62.5%;
    font-family: 'Roboto', sans-serif;
  }
`;

const NavMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
  visibility: ${p => (p.isVisible ? "visible" : "collapse")};
  height: ${p => (p.isVisible ? "100%" : "0")};
`;

const NavMenu = ({ data, expandedItems }) => {
  const { expand } = useContext(NavContext);
  const {children, name} = data || {};

  return (
    <NavMenuWrapper isVisible={expand.includes(name)}>
      {children &&
        children.map((item, index) => {
          return (
            <NavItem
              key={item.name + index}
              data={item}
              expandedItems={[...expandedItems, item.name]}
            />
          );
        })}
    </NavMenuWrapper>
  );
};

const NavItemWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;
const NavLink = styled.a`
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  cursor: pointer;
  text-decoration: none;
  color: black;
  &:hover {
    background-color: #cccccc;
  }
  background-color: ${p => p.isSelected && "red"};
`;

const NavItem = ({ data, expandedItems }) => {
  const { expand, setExpand } = useContext(NavContext);
  const onClickHandler = () => {
    setExpand(expandedItems);
  };
  const {children, name, articleCount} = data || {}
  return (
    <NavItemWrapper>
      <NavLink
        onClick={onClickHandler}
        isSelected={expand[expand.length - 1] === name}
      >
        {children && <span>></span>}
        <label>{name}</label>&nbsp;&nbsp;
        <span>{articleCount}</span>
      </NavLink>
      {children && <NavMenu data={data} expandedItems={expandedItems} />}
    </NavItemWrapper>
  );
};

const Nav = styled.nav`
  max-width: 20rem;
  font-size: 1.6rem;
`;

function App() {
  const [menuData, setMenuData] = useState(null);

  useEffect(() => {
    fetch("data.json")
      .then(res => res.json())
      .then(data => setMenuData(data.polstermoebel));
  }, []);
  return (
    <NavContextProvider>
      <GlobalStyles />
      <Nav>
        <NavItem data={menuData} expandedItems={["Polstermöbel"]} />
      </Nav>
    </NavContextProvider>
  );
}

export default App;
