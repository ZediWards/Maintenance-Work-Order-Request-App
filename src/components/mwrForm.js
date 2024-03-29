import * as React from "react";
import { useState, useContext, useCallback, useRef } from "react";
import styled from "styled-components";

import useClickOutside from "./useClickOutside";

import {
  GlobalDispatchContext,
  GlobalStateContext,
  GlobalSettingsContext,
  GlobalSettingsDispatchContext,
} from "../context/GlobalContextProvider";

import { ACTIONS } from "../context/GlobalContextProvider";

// import * as style from "../css_modules/formStyles.module.css"

// **** Styled Components ****
const MwrFormStyled = styled.form`
  * {
    background-color: var(--light-background);
  }
  display: flex;
  flex-direction: column;
  /* margin: 150px 20px 20px; */

  .heading-and-close-container {
    display: flex;
    justify-content: space-between;
  }

  .form-heading {
    margin: 0;
  }

  .close-btn {
    background-color: var(--red-btn-color);
    border: 2px solid var(--red-btn-color-darker);
    /* border: 1px solid var(--gray-light); */
    box-shadow: 0px 2px 1px var(--gray-light);
    color: var(--text-black);
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    transition: all 0.35s ease-Out;
    border-radius: 10px;
    align-self: center;
    :hover {
      /* border: 2px solid var(--red-btn-color); */
      background-color: var(--red-btn-color-darker);
      /* /* background-color: var(--light-background); */
    }
  }

  label {
    flex-grow: 1;
  }

  .select-styles {
    padding-block: 0.12rem;
  }

  .problem-label,
  .solution-label {
    flex-grow: 1;
  }

  .input-label {
    margin-block: 0.5rem;
    margin-inline: 0;
    font-size: 1.25rem;
  }

  .form-input {
    margin-bottom: 0.5rem;
    border: 1px solid threedlightshadow;
  }

  .form-btn {
    display: block;
    padding: 0.75rem;
    width: 100%;
    margin-block: 2.5rem;
    text-align: center;
    transition: all 0.35s ease-Out;
    box-shadow: 0px 2px 1px var(--gray-light);
    background-color: var(--green-btn-background);
    border: 2px solid var(--btn-background-based-on-general);
    border-radius: 10px;
    :hover {
      cursor: pointer;
      background-color: var(--btn-background-based-on-general);
    }
  }

  @media (max-width: 409px) {
    .close-btn {
      align-self: flex-start;
      margin-top: 0.25rem;
    }
  }
  .problem-label,
  .solution-label {
    flex-grow: 1;
  }

  .problem-input,
  .solution-input {
    width: 100%;
    /* background: pink; */
    background: #fff;
  }

  .cursor {
    cursor: pointer;
  }

  /* !!!!!!!!!! Details Style !!!!!!!! */
  /* .input-readable-disabled {
    background-color: white;
    color: black;
    margin-bottom: 0.5rem;
  } */
`;

// lesson learned: multiple classes
let problemTextAreaClasses = ["problem-input form-input"];
let solutionTextAreaClasses = ["solution-input form-input"];

function uniqueID() {
  return Math.floor(Math.random() * Date.now());
}

function photoAlert(e) {
  e.stopPropagation();
  e.preventDefault();
  alert("Upload feature available in self-hosting branch on Github");
}


const MwrForm = ({ mwrType, handleClose }) => {
  const settings = useContext(GlobalSettingsContext);
  const settingsDispatch = useContext(GlobalSettingsDispatchContext);
  const dispatch = useContext(GlobalDispatchContext);
  const state = useContext(GlobalStateContext);

  const settingsDepartment = settings.departments.map((department, index) => {
    return (
      <option key={index} value={department}>
        {department}
      </option>
    );
  });
  const [formData, setFormData] = useState({
    // Employee section
    id: uniqueID(),
    type: mwrType.toLowerCase(),
    date: "",
    name: "",
    department: "",
    problem: "",
    solution: "",
    // Maininence Section
    status: "unassigned",
    workOrderNum: "",
    workOrderDate: "",
    workOrderTime: "",
    projectNum: "",
    scheduledDate: "",
    openHistory: "",
    problemType: "",
    daysToCOmplete: "",
    completedDate: "",
    dueDate: "",
    estHours: "",
    assetId: "",
    assetDescription: "",
    downtime: "",
    actHours: "",
    site: "",
    requestNum: "",
    requestedByEmail: "",
    assignTo: "",
    assistant: "",
    maintenanceTeamMember: "",
    briefDiscription: "",
    workDiscription: "",
    comments: "",
    employeeComments: {
      commentOne: "",
      commentTwo: "",
      commentThree: "",
      commentsFive: "",
      commentSix: "",
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: ACTIONS.NEW_MWR, payload: formData });
    // handleClick(formData);
    console.log("handleSubmit fired, actions, imports");
    console.log(e.target);
    console.table(state);

    setFormData({
      // Employee section
      id: uniqueID(),
      type: mwrType.toLowerCase(),
      date: "",
      name: "",
      department: "",
      problem: "",
      solution: "",
      // Maininence Section
      status: "unassigned",
      workOrderNum: "",
      workOrderDate: "",
      workOrderTime: "",
      projectNum: "",
      scheduledDate: "",
      openHistory: "",
      problemType: "",
      daysToCOmplete: "",
      completedDate: "",
      dueDate: "",
      estHours: "",
      assetId: "",
      assetDescription: "",
      downtime: "",
      actHours: "",
      site: "",
      requestNum: "",
      requestedByEmail: "",
      assignTo: "",
      assistant: "",
      maintenanceTeamMember: "",
      briefDiscription: "",
      workDiscription: "",
      comments: "",
      employeeComments: {
        commentOne: "",
        commentTwo: "",
        commentThree: "",
        commentsFive: "",
        commentSix: "",
      },
    });
    console.log(formData);

    handleClose();
    // handleClose();
    // pass this as a function to set state from the child
    // setIsOpen(true)
  };

  // Close w/o saving by clicking outside of form element
  // Lesson: give the jsx DOM element the formRef attribute, then can access it with formRef.current
  // This application is using it with useClickOutside to close form on click outside
  const formRef = useRef();

  // lesson: This way fires the handleClose function w/o error
  // const close = handleClose(); Throw error
  const close = useCallback(() => handleClose(), []);

  useClickOutside(formRef, close);

  // Close without saving
  // lesson: closing would submit the form and fire the handle submit..
  // FIX: <button> defaults to <button type="submit"> which submits the parent form, you can instead use <button type="button"> which does not submit the form.
  // ALSO: if not a btn element onClick you can return false at end of function to not fire the submit function
  const closeNoSave = (e) => {
    e.stopPropagation();
    handleClose();
  };

  //

  //
  return (
    <MwrFormStyled onSubmit={handleSubmit} ref={formRef}>
      <div className="heading-and-close-container">
        <h1 className={"form-heading"}>{mwrType} MWR Form</h1>
        <button
          type="button"
          onClick={(e) => closeNoSave(e)}
          className="close-btn"
        >
          X
        </button>
      </div>

      {/* Date */}
      <label htmlFor="date">
        <p className="input-label">Date:</p>
        <input
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          value={formData.date}
          type="date"
          name="date"
          id="date"
          className="form-input"
        />
      </label>

      {/* Name */}
      <label htmlFor="name">
        <p className="input-label">Name:</p>
        <input
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          value={formData.name}
          type="text"
          name="name"
          id="name"
          className="form-input"
        />
      </label>

      {/* Email */}
      <label htmlFor="email">
        <p className="input-label">E-mail:</p>
        <input
          onChange={(e) =>
            setFormData({ ...formData, requestedByEmail: e.target.value })
          }
          value={formData.requestedByEmail}
          type="email"
          name="email"
          id="email"
          className="form-input"
        />
      </label>

      {/* Department */}
      <label htmlFor="department">
        <p className="input-label">Department:</p>
        <select
          onChange={(e) =>
            setFormData({ ...formData, department: e.target.value })
          }
          value={formData.department}
          name="department"
          id="department"
          className={`form-input select-styles`}
        >
          <option value="empty"> </option>
          {settingsDepartment}
        </select>
      </label>
      <label htmlFor="problem" className="problem-label">
        <p className="input-label">Problem:</p>
        <textarea
          onChange={(e) =>
            setFormData({ ...formData, problem: e.target.value })
          }
          value={formData.problem}
          name="problem"
          id="problem"
          className={problemTextAreaClasses}
          rows="5"
          cols="75"
        ></textarea>
      </label>
      <label htmlFor="solution" className="solution-label">
        <p className="input-label">Solution:</p>
        <textarea
          onChange={(e) =>
            setFormData({ ...formData, solution: e.target.value })
          }
          value={formData.solution}
          name="solution"
          id="solution"
          className={solutionTextAreaClasses}
          rows="5"
          cols="75"
        ></textarea>
      </label>
      <label htmlFor="photos" className="photos-label">
        <p className="input-label">Photos:</p>
        <input
          className="cursor"
          type="file"
          onClick={(e) => photoAlert(e)}
          id="employeePhotoUpload"
          multiple={true}
          // capture="environment"
          accept="image/png, image/jpeg"
          disabled={false}
        />
      </label>

      {/* Submit */}
      <input type="submit" value="Submit" className="form-btn" />
    </MwrFormStyled>
  );
};

export default MwrForm;
