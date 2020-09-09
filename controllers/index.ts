import { Response, Request, Body } from "../deps.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

interface User {
  id: string;
  name: string;
}

let users: User[] = [{ id: "1", name: "Astrid Vanegas" }];

export const getUsers = ({ response }: { response: Response }) => {
  response.body = {
    message: "Successful Response",
    users,
  };
};

export const createUser = async (
  { response, request }: { response: Response; request: Request },
) => {
  const body: Body = await request.body();
  if (!request.hasBody) {
    response.status = 404,
      response.body = {
        message: "Body is required",
      };
  } else {
    const newUser: User = await body.value;
    newUser.id = v4.generate();
    users.push(newUser);
    response.status = 200;
    response.body = { message: "User created successfully", newUser };
  }
};

export const getUser = (
  { params, response }: { params: { id: string }; response: Response },
) => {
  const isFound = users.find((user) => user.id === params.id);
  if (isFound) {
    response.status = 200;
    response.body = { message: "User Found", user: isFound };
  } else {
    response.status = 404;
    response.body = { message: "User Not Found" };
  }
};

export const updateUser = async (
  { params, request, response }: {
    params: { id: string };
    request: Request;
    response: Response;
  },
) => {
  const userFound = users.find((user) => user.id === params.id);
  if (!userFound) {
    response.status = 404;
    response.body = { message: "User Not Found" };
  } else {
    const body = await request.body();
    const userUpdated = await body.value;
    users = users.map((user) =>
      user.id === params.id ? { ...user, ...userUpdated } : user
    );
    response.status = 200;
    response.body = { users };
  }
};

export const deleteUser = (
  { params, response }: { params: { id: string }; response: Response },
) => {
  users = users.filter((user) => user.id !== params.id);
  response.status = 200;
  response.body = { message: "User removed", users };
};
