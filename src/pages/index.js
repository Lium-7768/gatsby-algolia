import React, { useEffect } from "react";
import { Link } from "gatsby";
import algoliaSearch from "algoliasearch/lite";
import {
  Configure,
  InstantSearch,
  InstantSearchSSRProvider,
  useRefinementList,
} from "react-instantsearch-hooks-web";
import getRouting from "../../routing";

import serverState from "../../data.json";

console.log("serverState", serverState);

const searchClient = algoliaSearch(
  "latency",
  "6be0576ff61c053d5f9a3225e2a90f76"
);
const indexName = "instant_search";

const routing = getRouting(indexName);

const CustomBrandComponent = () => {
  const { items, refine } = useRefinementList({
    attribute: "brand",
  });

  console.log("items", items);
  return (
    <>
      {items.map(({ label, value, isRefined }) => (
        <div
          onClick={() => refine(value)}
          key={label}
          style={{
            color: isRefined ? "red" : "",
          }}
        >
          {label}
        </div>
      ))}
    </>
  );
};

const IndexPage = () => {
  return (
    <InstantSearchSSRProvider {...serverState}>
      <InstantSearch
        searchClient={searchClient}
        indexName={indexName}
        routing={routing}
      >
        <CustomBrandComponent />
        <div>
          <h1>Hi people</h1>
          <p>Welcome to your new Gatsby site.</p>
          <p>Now go build something great.</p>
          <Link to="/page-2/">Go to page 2</Link>
        </div>
      </InstantSearch>
    </InstantSearchSSRProvider>
  );
};

export default IndexPage;
