import * as React from "react";
import { useContext } from "react";

import {
  GlobalDispatchContext,
  GlobalStateContext
} from "../context/GlobalContextProvider";

import styled from "styled-components";

import * as style from "../css_modules/leaderboard.module.css";

// ******* Styled Components ************
const LeaderboardContainerStyled = styled.section`
  margin-top: 3rem;
  /* makes table responsive */
  overflow-x: auto;
`;

// global table styles are in layout.css
const TableStyled = styled.table`
  td {
    text-align: center;
  }
  th {
    background-color: var(--btn-background-based-on-general);
  }
  tr:nth-child(even) {
    background-color: var(--green-btn-background);
  }
  tr:hover {
    transition: all 0.35s ease-Out;
    background-color: var(--red-btn-color);
  }
`;

const Leaderboard = () => {
  // context variables
  const state = useContext(GlobalStateContext);

  // making a mutable varible of the db state
  // const mwrEntries = data;

  // variable of just the names value from the objects within the array
  const namesFromData = state.map((mwr) => {
    return mwr.name;
  });

  // returning no duplicates from the list of names
  const uniqueNames = namesFromData.filter((name, index) => {
    return namesFromData.indexOf(name) === index;
  });

  // function that will count how many times a value appears within an array.
  const countOfNames = function (array, value) {
    return array.reduce((n, x) => n + (x === value), 0);
  };

  // Using the reduce function above inside a mapping function of the unique names to return the number of times the unique name appears in the namesFromData array
  const uniqueNamesAndSubmittionsNumber = uniqueNames.map((name) => {
    return {
      name: name,
      numberOfSubmitions: countOfNames(namesFromData, name)
    };
  });

  // sorting by numberOfSubmitions in a decinding manner
  const desendingOrder = uniqueNamesAndSubmittionsNumber.sort(
    (a, b) => b.numberOfSubmitions - a.numberOfSubmitions
  );

  const buildLeaderBoardTable = desendingOrder.map((person, index) => {
    return (
      <tr key={index}>
        <td>
          {index + 1}. {person.name}
        </td>
        <td>{person.numberOfSubmitions}</td>
      </tr>
    );
  });

  return (
    <LeaderboardContainerStyled>
      <h2>Leaderboard</h2>
      <TableStyled>
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}># Submited</th>
          </tr>
        </thead>
        <tbody>{buildLeaderBoardTable}</tbody>
      </TableStyled>
    </LeaderboardContainerStyled>
  );
};

export default Leaderboard;
