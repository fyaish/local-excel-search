import React, { createContext } from "react";
import { Hits, Stats, Pagination } from "react-instantsearch-dom";
import HitComponent from "./HitComponent";
import { CustomStateResults } from "./connectStateResults";
import { createIndex } from "instantsearch-itemsjs-adapter";
import { useEffect, useState } from "react";
import data from "../public/products.json";
import algoliasearch from "algoliasearch/lite";
import PubSub from "pubsub-js";
import * as XLSX from "xlsx";

let options = {
  searchableFields: ["title"],
  query: "",
  aggregations: {
    category: {
      title: "category",
      size: 10,
      conjunction: false,
    },
    "category.lvl0": {},
    "category.lvl1": {},
  },
};

let myukeys;

let fdata = [];

function gethits() {
  return <Hits hitComponent={HitComponent} />;
}

function Content() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    //const script = document.createElement("script");
    const script1 = document.createElement("script");
    //script.src =
    //  "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.15.3/xlsx.full.min.js";
    script1.src =
      "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js";
    //script.async = true;
    script1.async = true;
    //document.body.appendChild(script);
    document.body.appendChild(script1);
    //createIndex(data, options);
    let selectedfile = null;
    document
      .getElementById("fileUpload")
      .addEventListener("change", (Event) => {
        //dtcount = 0;
		selectedfile = (Event.target as HTMLInputElement).files[0];
        //selectedfile = Event.target.files[0];
      });
    document.getElementById("UploadExcel").addEventListener("click", () => {
      let jsonObject;
      let data;
      let workbook;
      let rowObject;
      if (selectedfile !== null) {
        options = {
          searchableFields: ["title"],
          query: "",
          aggregations: {
            category: {
              title: "category",
              size: 10,
              conjunction: false,
            },
            "category.lvl0": {},
            "category.lvl1": {},
          },
        };
        fdata = [];
        let filereader = new FileReader();
        filereader.readAsBinaryString(selectedfile);
        filereader.onload = (Event) => {
          data = Event.target.result;
          workbook = XLSX.read(data, { type: "binary" });
          workbook.SheetNames.forEach((sheet) => {
            rowObject = XLSX.utils.sheet_to_json(
              workbook.Sheets[sheet]
            );
            jsonObject = JSON.stringify(rowObject);
          });
          var i = 0;
          while (i < rowObject.length) {
            fdata.push(rowObject[i]);
            //console.log(fdata[i]);
            i += 1;
          }

          if (rowObject.length > 0) {
            let mykeys = Object.keys(rowObject[0]);
            for (var i = 0; i < mykeys.length; i++) {
              if (
                mykeys[i] != "objectID" &&
                mykeys[i] != "_id" &&
                mykeys[i] != "_highlightResult" &&
                mykeys[i] != "__position"
              )
                options.aggregations[mykeys[i]] = {
                  title: mykeys[i],
                  size: 10,
                  conjunction: false,
                };
              options.searchableFields.push(mykeys[i]);
            }
            myukeys = mykeys;
            //console.log("printing myukeys");
            //console.log(myukeys);
            selectedfile = null;
          }
          createIndex(fdata, options);
          PubSub.publish("MY_TOPIC", myukeys);
          //setCount(count + 1);
        };
      }
    });
  });

  return (
    <div className="right-column">
      <input type="file" id="fileUpload" accept=".xls,.xlsx" />
      <button type="button" id="UploadExcel">
        Convert
      </button>

      <div className="info">
        <br />
        <Stats />
        <br />
      </div>

      {gethits()}

      <CustomStateResults />

      <div className="pagination">
        <Pagination showLast />
      </div>
    </div>
  );
}

export default Content;
export { myukeys };
