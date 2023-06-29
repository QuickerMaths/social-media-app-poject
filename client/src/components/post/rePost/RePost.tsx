import React from "react";
import { IRePost } from "../types";

interface Props {
  rePost: IRePost;
  reRender: boolean;
  setReRender: React.Dispatch<React.SetStateAction<boolean>>;
}

const RePost: React.FC<Props> = ({ rePost, reRender, setReRender }) => {
  return <div>RePost</div>;
};

export default RePost;
