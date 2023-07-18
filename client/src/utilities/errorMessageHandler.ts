export const errorMessageHandler = (status: number): string => {
  let errorMessage = "";
  if (status === 403) {
    errorMessage = "You have to be logged in to create a post.";
  } else {
    errorMessage = "Something went wrong, please try again later.";
  }
  return errorMessage;
};
