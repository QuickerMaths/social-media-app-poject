import React, { useState } from "react";
import {
  AiOutlineLike,
  AiOutlineComment,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import { BiRepost } from "react-icons/bi";
import { IRePost } from "../types";
import defaultImg from "../../../assets/images/default_img.png";
import moment from "moment";
import { Link } from "react-router-dom";
import { IPost } from "../types";
import { IComment } from "../../comment/types";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { RootState } from "../../../redux/store";
import axios from "axios";
import useToastCreator from "../../../hooks/useToastCreator";
import PostEditModal from "../../../portals/post-edit-modal/PostEditModal";
import PostDetailsModal from "../../../portals/post-details-modal/PostDetailsModal";
import Comment from "../../comment/Comment";

interface Props {
  rePost: IRePost;
  reRender: boolean;
  setReRender: React.Dispatch<React.SetStateAction<boolean>>;
}

const RePost: React.FC<Props> = ({ rePost, reRender, setReRender }) => {
  const {
    owner: { _id, profilePicture, username },
    postBody,
    post: rePostedPost,
    likedBy,
    commentTotal,
    comments,
    _id: rePostId,
  } = rePost;
  const { userId, userImg } = useAppSelector((state: RootState) => state.auth);

  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [isOpenDetails, setIsOpenDetails] = useState<boolean>(false);

  return <li className="re-post">RePost</li>;
};

export default RePost;
