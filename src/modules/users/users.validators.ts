import Joi from "joi";
import { UsersTypes } from "@app/modules/users/users.types";

const validators: Record<keyof UsersTypes.Validators, Joi.ObjectSchema> = {
  create: Joi.object<UsersTypes.CreateBody>({
    email: Joi.string().required().email(),
    password: Joi.string()
      .required()
      .regex(/(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/),
    role: Joi.string().allow("USER", "VIEWER", "OWNER", "ADMIN"),
    firstName: Joi.string().trim(),
    lastName: Joi.string().trim(),
  }),
  login: Joi.object<UsersTypes.LoginBody>({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

export const validateUser = <T extends keyof UsersTypes.Validators>(
  operation: T,
  value: UsersTypes.Validators[T]
) => {
  return validators[operation].validate(value);
};
