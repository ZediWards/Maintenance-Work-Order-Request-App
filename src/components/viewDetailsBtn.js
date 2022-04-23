import * as React from "react"
import { useState } from "react"

import ViewDetailsModalContainer from "./viewDetailsModalContainer"

// import * as style from "../css_modules/mwr-cards.module.css"

const ViewDetailsBtn = ({ mwrDetails, mwrTypes, handleUpdate }) => {
  // state for modal
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button
        // className={style.btn}
        onClick={() => setIsOpen(true)}
        type="button"
      >
        View Details
      </button>

      <ViewDetailsModalContainer
        mwrDetails={mwrDetails}
        mwrTypes={mwrTypes}
        handleUpdate={handleUpdate}
        handleClose={() => setIsOpen(false)}
        isOpen={isOpen}
      />
    </div>
  )
}

export default ViewDetailsBtn
