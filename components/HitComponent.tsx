import React from "react";
import { Hit } from "react-instantsearch-core";
import Image from "next/image";

let keys_props = [];

type HitComponentProps = {
  hit: Hit;
};

function displaycontent(hc) {
  let mycontentdiv = document.createElement("div");
  let temp_p;
  let mykeys = Object.keys(hc);
  keys_props = mykeys;
  let myvaues = Object.values(hc);
  let mystring = [];
  for (var i = 0; i < Object.keys(hc).length; i++) {
    temp_p = document.createElement("p");
    temp_p.innerHTML = mykeys[i] + ":" + myvaues[i];
    mycontentdiv.append(temp_p);
    if (
      mykeys[i] != "objectID" &&
      mykeys[i] != "_id" &&
      mykeys[i] != "_highlightResult" &&
      mykeys[i] != "__position"
    )
      mystring.push({ thekey: mykeys[i], thevalue: myvaues[i] });
  }
  return mystring;
}

function HitComponent({ hit }: HitComponentProps) {
  return (
    <>
      <div className="hit" style={{ width: "100%" }}>
        <div
          className="hit-content"
          id="hit-content-id"
          style={{ width: "100%" }}
        >
          {displaycontent(hit).map((user) => (
            <p key={user.id} style={{ width: "100%" }}>
              <strong>{user.thekey}</strong> : {user.thevalue}
            </p>
          ))}
        </div>
      </div>
    </>
  );
}

export default HitComponent;
