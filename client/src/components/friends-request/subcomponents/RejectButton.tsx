//External dependencies

import React from "react";

// Internal dependencies

import { IUserPartial } from "../../../pages/user-profile/types";
import useToastCreator from "../../../hooks/useToastCreator";

interface Props {
  request: IUserPartial;
}

const RejectButton: React.FC<Props> = ({ request: { id } }) => {
  return (
    <button
      className="request__button request__button--accept"
      //   onClick={() =>

      //   }
      //   disabled={isSending}
    >
      {/* {isSending ? "Accepting..." : "Accept"} */}
    </button>
  );
};

export default RejectButton;
