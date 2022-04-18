import "instantsearch.css/themes/satellite.css";

import SearchGrid from "../components/SearchGrid";
import { getSearchClient, createIndex } from "instantsearch-itemsjs-adapter";
import data from "../public/products.json";
import { useEffect, useState } from "react";

const options = {
  searchableFields: ["title"],
  query: "",
  aggregations: {
    category: {
      title: "category",
      size: 10,
      conjunction: false,
    },
    color: {
      title: "color",
      size: 10,
      conjunction: false,
    },
    price: {
      show_facet_stats: true,
    },
    inStock: {},
    reviews: {
      show_facet_stats: true,
    },
    rating: {
      show_facet_stats: true,
    },
    deliveryTime: {
      show_facet_stats: true,
    },
    "category.lvl0": {},
    "category.lvl1": {},
  },
  sortings: {
    price_asc: {
      field: "price",
      order: "asc",
    },
    price_desc: {
      field: "price",
      order: "desc",
    },
    "rating.rate_asc": {
      field: "rating.rate",
      order: "asc",
    },
    "rating.rate_desc": {
      field: "rating.rate",
      order: "desc",
    },
  },
};

const options1 = {
  searchableFields: ["title"],
  query: "",
  aggregations: {
    category: {
      title: "category",
      size: 10,
      conjunction: false,
    },
  },
  sortings: {},
};

//createIndex(data, options);
let fdata = [];

let searchClient = getSearchClient();

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}

function Home() {
  return (
    <>
      <SearchGrid searchClient={searchClient} />
    </>
  );
}

export default Home;
