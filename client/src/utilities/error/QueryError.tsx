//External dependencies

import React from "react";

interface Props {
  error: string;
  refetch: any;
}

const QueryError: React.FC<Props> = ({ error, refetch }) => {
  return (
    <section className="error">
      <h2 className="error__title">Error occured</h2>
      <p className="error__message">{error}</p>
      <button className="error__reset-button" onClick={() => refetch()}>
        Try Again
      </button>
    </section>
  );
};

export default QueryError;
