//External dependencies

import React from "react";

interface Props {
  error: string;
}

const MutationError: React.FC<Props> = ({ error }) => {
  return (
    <section className="error">
      <p className="error__message">{error}</p>
    </section>
  );
};

export default MutationError;
