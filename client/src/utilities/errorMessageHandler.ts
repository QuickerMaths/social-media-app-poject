export const errorMessageHandler = (status: number): string => {
  if (status === 403) {
    return "You have to be logged in to create a post.";
  } else {
    return "Something went wrong, please try again later.";
  }
};
