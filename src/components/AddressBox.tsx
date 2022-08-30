import React from "react";

function AddressBox({
  words,
  lineRight,
  lineBottom,
  lineOpacity,
}: {
  words: string;
  lineRight: number;
  lineBottom: number;
  lineOpacity: number;
}) {
  return (
    <>
      {lineBottom >= 0 && lineRight >= 0 && (
        <div
          className="line-container"
          style={{
            width: lineRight + "px",
            height: lineBottom + "px",
            opacity: lineOpacity,
          }}
        >
          <svg
            viewBox={`0 0 ${lineRight} ${lineBottom}`}
            preserveAspectRatio="xMinYMax meet"
          >
            <line
              x1="0"
              y1="0"
              x2={`${lineRight}`}
              y2={`${lineBottom}`}
              stroke="#0A3049"
              strokeWidth="2"
            />
          </svg>
        </div>
      )}
      <div className="address-box">
        <span className="red-slashes">///</span> {words}
      </div>
    </>
  );
}

export default AddressBox;
