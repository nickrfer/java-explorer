import React from 'react';
import Griddle from 'griddle-react';
import { Link } from 'react-router';
/*import JavaDocsJson from './JavaDocsJson';

var apiTypes = JSON.parse(JavaDocsJson.get());
console.log(apiTypes);*/
var apiTypes = [
  {
    "id": 0,
    "name": "Mayer Leonard",
    "city": "Kapowsin",
    "state": "Hawaii",
    "country": "United Kingdom",
    "company": "Ovolo",
    "favoriteNumber": 7
  }
];


function Home() {
  const reactLink = 'https://github.com/facebook/react';
  const reactRouterLink = 'https://github.com/reactjs/react-router';
  const ghPagesLink = 'https://pages.github.com/';
  const repoReadmeLink = 'https://github.com/nickrfer/java-explorer#readme';

  return (
    <div>
      <Griddle results={apiTypes} tableClassName="table" showFilter={true}
        showSettings={true} columns={["name"]}/>
      <p>
        Please see the <a href={repoReadmeLink}>repo readme</a> for
        instructions on how to use this boilerplate
        to deploy your own single page app using GitHub Pages.
      </p>
      <div><Link to="/example">Example page</Link></div>
      <div><Link to="/example/two-deep?field1=foo&field2=bar#boom!">
        Example two deep with query and hash
      </Link></div>
    </div>
  );
}

export default Home;
