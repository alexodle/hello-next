import Header from "./Header";
import { FunctionComponent } from "react";

const Layout: FunctionComponent<{}> = ({ children }) => (
  <div className='datenight-container'>
    <Header />
    {children}
    <style jsx global>{`
      * {
        box-sizing: border-box;
      }

      body {
        font-family: "Arial", Helvetica, sans-serif;
      }

      .datenight-form input, .datenight-form textarea, .datenight-form select {
        margin: 0.5em;
        height: 2.5em;
        padding: 1em;
        border-radius: 5px;
        border: 1px solid #ccc;
      }

      .datenight-form textarea {
        height: 6em;
      }

      button {
        margin: 0.75em;
        padding: 1em;
        border-radius: 5px;
      }
    `}</style>
  </div>
);

export default Layout;
