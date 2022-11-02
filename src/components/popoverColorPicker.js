import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";

import { HexColorPicker } from "react-colorful";

import useClickOutside from "./useClickOutside";

const ColorPickerStyled = styled.button`
  position: relative;

  .swatch {
    width: 50px;
    height: 28px;
    border-radius: 8px;
    border: 3px solid #fff;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  .popover {
    position: absolute;
    top: calc(100% + 2px);
    left: 0;
    border-radius: 9px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    z-index: 1;
  }
`;

export const PopoverPicker = ({ color, onChange }) => {
  const popover = useRef();
  const [isOpen, toggle] = useState(false);

  const close = useCallback(() => toggle(false), []);
  useClickOutside(popover, close);

  return (
    <ColorPickerStyled>
      <div
        className="swatch"
        style={{ backgroundColor: color }}
        onClick={() => toggle(true)}
        onClick={(e) => console.log(e.target)}
      />

      {isOpen && (
        <div className="popover" ref={popover}>
          <HexColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </ColorPickerStyled>
  );
};
