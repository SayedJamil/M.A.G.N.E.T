import { CreateUserInput, CredentialsInput } from "./user.type";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "./user.model";
import { IUser } from "./user.type";
export const getAllUsers = async () => {
  return await Users.find({})
    .then((response) => {
      return {
        success: true,
        message: "Fetched all users",
        users: response,
      };
    })
    .catch(() => {
      return {
        success: false,
        message: "Failed to fetch all users",
        users: null,
      };
    });
};
function splitFullName(fullName: string): {
  firstName: string;
  lastName: string;
} {
  const parts = fullName.split(" ");
  const firstName = parts[0];
  const lastName = parts.slice(1).join(" ");

  return { firstName, lastName };
}
export const registerUser = async (user: CreateUserInput) => {
  const salt = await bcrypt.genSalt(10);
  const encryptPassword = await bcrypt
    .hash(user.password, salt)
    .then((hash: string) => {
      return hash;
    })
    .catch((err) => {
      console.log(err);
      return undefined;
    });
  if (!encryptPassword) {
    return {
      success: false,
      message: "User not created. Unknown error occurred",
      users: null,
    };
  }
  const { firstName, lastName } = splitFullName(user.fullName);
  const newUser = new Users<IUser>({
    firstName: firstName,
    lastName: lastName,
    email: user.email,
    password: encryptPassword,
    source: "Email",
    verified: false,
    creationDate: new Date().toISOString(),
  });
  const token = jwt.sign(
    { userID: newUser.id },
    process.env.JWT_TOKEN as string
  );
  const response = await newUser
    .save()
    .then((response) => {
      return {
        success: true,
        message: "Fetched all users",
        users: response,
        accessToken: token,
      };
    })
    .catch((err) => {
      console.log(err, "err");
      if (err.code === 11000) {
        return {
          success: false,
          message: `User already exists with this email`,
          users: null,
          accessToken: null,
        };
      }
      return {
        success: false,
        message: "User not created. Unknown error occurred",
        users: null,
        accessToken: null,
      };
    });
  return response;
};
export const signInUser = async (credentials: CredentialsInput) => {
  const checkUser = await Users.findOne({ email: credentials.email });
  if (!checkUser) {
    return {
      success: false,
      message: "User does'nt exist. Please check the email entered",
      users: null,
      accessToken: null,
    };
  }
  const checkPassword = await bcrypt
    .compare(credentials.password, checkUser.password as string)
    .then(function (result) {
      return result;
    });
  if (!checkPassword) {
    return {
      success: false,
      message: "Incorrect password. Please check the password entered",
      users: null,
      accessToken: null,
    };
  } else {
    const token = jwt.sign(
      { userID: checkUser.id },
      process.env.JWT_TOKEN as string
    );
    return {
      success: true,
      message: "User logged in successfully.",
      users: checkUser,
      accessToken: token,
    };
  }
};
export const confirmUser = (token: string) => {
  const tokenDecoded = token.split(" ")[1];
  var data: { userID: string; iat: number } | undefined;
  jwt.verify(
    tokenDecoded,
    process.env.JWT_TOKEN as string,
    function (err, decoded) {
      if (err) data = undefined;
      if (decoded) data = decoded as { userID: string; iat: number };
      else data = undefined;
    }
  );
  if (data) return { success: true, data };
  else return { success: false, data: null };
};

export const getUserByID = async (userID: string) => {
  return await Users.findOne({ _id: userID })
    .then((response) => {
      return {
        success: true,
        message: "Fetched all users",
        users: response,
      };
    })
    .catch(() => {
      return {
        success: false,
        message: "Failed to fetch all users",
        users: null,
      };
    });
};
