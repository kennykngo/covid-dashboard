import React, { useState } from "react";
import { Manager, Reference, Popper } from "react-popper";

export default function PopperTip() {
  const [showPopup, setPopup] = useState(false);
  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <div
            className="reference-element"
            ref={ref}
            onClick={() => {
              setPopup(!showPopup);
            }}
          >
            Reference element
          </div>
        )}
      </Reference>
      <Popper placement="right">
        {({ ref, style, placement, arrowProps }) =>
          showPopup ? (
            <div
              className="popper"
              ref={ref}
              style={style}
              data-placement={placement}
            >
              Popper element
              <div ref={arrowProps.ref} style={arrowProps.style} />
            </div>
          ) : (
            ""
          )
        }
      </Popper>
    </Manager>
  );
}
