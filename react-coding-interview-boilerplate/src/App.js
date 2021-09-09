import "./App.css";
import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import { AnotherComponent } from "./AnotherComponent";

// https://randomuser.me/api/?results=20

/*

#1 - retrieve data from the api
#2 - show the list of properties of a data.location
#3 - show the location data in a table, each column is a location's property
#4 - sort a column ASC and DESC
#5 - place a input field to search a term and retrieve the data in the table
#6 - use a context

*/

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);


const fetchData = () => {
  return axios
    .get("https://randomuser.me/api/?results=20")
    .then(res => {
      console.log(res.data.results);
      return res.data.results;
    })
    .catch(err => {
      console.error(err);
    });
};

const getFilteredRows = (locations, filter) => {
  return locations
    .filter(location => {
      return Object.values(location).some(s =>
        s
          .toString()
          .toLowerCase()
          .includes(filter.text.toString().toLowerCase())
      );
    })
    .sort((a, b) => {
      let result;
      let posA;
      let posB;
      if (filter.sortby === "Streetname") {
        posA = a.streetName;
        posB = b.streetName;
      }
      if (filter.order === "ASC") {
        result = posA < posB ? 1 : -1;
      } else if (filter.order === "DESC") {
        result = posA > posB ? 1 : -1;
      }
      return result;
    });
};

export default function App() {
  const [people, setPeople] = useState([]);
  const [locations, setLocations] = useState([]);
  const [filter, setFilter] = useState({
    sortby: "Streetname",
    order: "ASC",
    text: ""
  });
  
  const sortColumn = e => {
    console.log(e);
    setFilter({
      ...filter,
      sortby: e.target.innerHTML,
      order: filter.order === "ASC" ? "DESC" : "ASC"
    });
  };

  const setSearchField = text => {
    setFilter({
      ...filter,
      text: text
    });
  };

  useEffect(() => {
    fetchData().then(data => {
      setPeople(data);
      setLocations(
        data.map(({ location }) => {
          const tempLocation = {
            ...location,
            getFlat() {
              return {
                city: location.city,
                state: location.state,
                country: location.country,
                postcode: location.postcode,
                streetName: `${location.street.name}, ${location.street.number}`,
                coordinates: `lat: ${location.coordinates.latitude}/long: ${location.coordinates.longitude}`,
                timezone: `${location.timezone.description} [${location.timezone.offset}]`
              };
            }
          };
          return tempLocation.getFlat();
        })
      );
    });
  }, []);

  return (
    <AppContext.Provider value={{ title: "Coding Challenge" }}>
      <div className="App">
        <h1>Hello from Coding Interview Boilerplate</h1>
        <h2>Let's practice!</h2>
        <AnotherComponent />
        <input
          value={filter.text}
          onChange={e => setSearchField(e.target.value)}
        />
        <table>
          <thead>
            <tr>
              <th onClick={e => sortColumn(e)} filter={"streetName"}>
                StreetName
              </th>
              <th>Postcode</th>
              <th>City</th>
              <th>State</th>
              <th>Country</th>
              <th>Coordinates</th>
              <th>Timezone</th>
            </tr>
          </thead>
          <tbody>
            {getFilteredRows(locations, filter).map(
              (
                {
                  city,
                  coordinates,
                  country,
                  postcode,
                  state,
                  streetName,
                  timezone
                },
                locationIdx
              ) => {
                return (
                  <tr key={locationIdx}>
                    <td>{streetName}</td>
                    <td>{postcode}</td>
                    <td>{city}</td>
                    <td>{state}</td>
                    <td>{country}</td>
                    <td>{coordinates}</td>
                    <td>{timezone}</td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </AppContext.Provider>
  );
}
