import React, { Component, useEffect, useState } from "react";

import {
  InstantSearch,
  SearchBox,
  connectStateResults,
  VoiceSearch,
  ScrollTo,
  Breadcrumb,
} from "react-instantsearch-dom";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";
import algoliasearch from "algoliasearch/lite";

const algolia = algoliasearch(
  process.env.NEXT_PUBLIC_API_NAME2!,
  process.env.NEXT_PUBLIC_API_KEY2!
);

const SearchErrorCatcher = connectStateResults(
  class SearchErrorCatcher extends Component {
    error = null;

    componentDidUpdate(nextProps: any) {
      if (this.error && !nextProps.error) {
        this.error = null;
      }
      if (!this.error && nextProps.error) {
        // only throw on new errors
        //throw nextProps.error;
      }
    }
    render() {
      return null;
    }
  }
);

let dformat = "leftright";

function SearchGrid({ searchClient }: any) {
  const [selectedMode, setSelectedMode] = useState("open");
  const [format, setFormat] = useState("leftright");
  const changeformatpage = () => {
    if (dformat === "leftright") {
      //console.log("page format change to right to left");
      dformat = "rightleft";
      document.getElementById("content-id").style.textAlign = "right";
    } else {
      //console.log("page format change to left to right");
      dformat = "leftright";
      document.getElementById("content-id").style.textAlign = "left";
    }
  };

  return (
    <>
      <InstantSearch searchClient={searchClient} indexName="instant_search">
        <SearchErrorCatcher />
        <header className="header">
          <div>
            <ScrollTo>
              <SearchBox
                translations={{ placeholder: "Search for products here" }}
              />
            </ScrollTo>
            <VoiceSearch />
            <Breadcrumb
              attributes={[
                "category.lvl0",
                "category.lvl1",
                "category.lvl2",
                "category.lvl3",
              ]}
            />
          </div>
          <label className="switch">
            <input type="checkbox" onClick={changeformatpage} />
            <span className="slider round"></span>
          </label>
        </header>
        <main>
          <Sidebar />
          <div id="content-id" style={{ width: "100%" }}>
            <Content />
          </div>
        </main>
      </InstantSearch>
    </>
  );
}

export default SearchGrid;
