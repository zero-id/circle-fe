import { useState } from "react";
import { useAppSelector } from "../../../store";
import { IThread } from "../../../types/app";
import { likeThread } from "../../../libs/api/call/like";

export const useThreadLike = () => {
  const auth = useAppSelector((state) => state.auth);

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState<number | undefined>(0);

  const checkLike = ({ thread }: { thread?: IThread | undefined }) => {
    if (auth.user) {
      if (thread?.like) {
        const like = thread?.like.find((like) => like.userId === auth.user?.id);
        setIsLiked(like ? true : false);
      }
    }
  };

  const handleLike = async ({ thread }: { thread?: IThread | undefined }) => {
    try {
      if (thread?.id) {
        await likeThread({ threadId: thread?.id });
      }
      if (likesCount || likesCount === 0)
        setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
      setIsLiked(!isLiked);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    isLiked,
    likesCount,
    setLikesCount,
    checkLike,
    handleLike,
    auth
  };
};

export default useThreadLike;
