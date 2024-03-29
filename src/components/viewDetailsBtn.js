import * as React from "react";
import { useState, useContext } from "react";

import styled from "styled-components";

import ViewDetailsModalContainer from "./viewDetailsModalContainer";

// import * as style from "../css_modules/mwr-cards.module.css"

// **** Styled Components ****
const DetailsBtn = styled.button`
  background-color: var(--light-background);
  border: 1px solid var(--btn-background-based-on-general);
  box-shadow: 0px 2px 1px var(--gray-light);
  color: var(--text-black);
  transition: all 0.35s ease-Out;
  cursor: pointer;
  min-width: min-content;
  padding: 0.5rem;
  margin: auto;
  font-size: 16px;
  border-radius: 10px;
  display: block;
  :hover {
    background-color: var(--btn-background-based-on-general);
  }

  @media (max-width: 1000px) {
    min-width: max-content;
  }
`;

const ViewDetailsBtn = ({ mwrDetails }) => {
  // state for modal
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <DetailsBtn
        // className={style.btn}
        onClick={() => setIsOpen(true)}
        type="button"
      >
        View Details
      </DetailsBtn>

      <ViewDetailsModalContainer
        mwrDetails={mwrDetails}
        handleClose={() => setIsOpen(false)}
        isOpen={isOpen}
      />
    </div>
  );
};

export default ViewDetailsBtn;
