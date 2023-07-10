import User from "../models/Users";

export const getAllUsersService = async () => {
  const users = await User.find().exec();

  return users;
};
// TODO: type body properly
export const updateUserService = async (
  userId: string,
  addressToUpdate: {
    street: string;
    city: string;
    state: string;
    zip: string;
  }
) => {
  const { street, city, state, zip } = addressToUpdate;
  const updatedUser = await User.findByIdAndUpdate(userId, {
    address: {
      street,
      city,
      state,
      zip,
    },
  }).exec();

  return updatedUser;
};

export const deleteUserService = async (userId: string) => {
  const deletedUser = await User.findByIdAndDelete(userId).exec();

  return deletedUser;
};

export const getUserByIdService = async (userId: string) => {
  const user = await User.findById(userId).populate([
    {
      path: "friends",
      select: "username _id profilePicture",
      model: "User",
      options: {
        limit: 8,
        sort: { _id: -1 },
      },
    },
  ]);

  return user;
};

export const uploadUserImageService = async (userId: string, path: string) => {
  const user = await User.findByIdAndUpdate(userId, {
    profilePicture: path,
  }).exec();

  return user;
};
