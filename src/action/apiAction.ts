"use server";

import agent from "@/api/agent";
import CookieConfig from "@/lib/cookieconfig";
import Validation from "@/lib/validation";
import { Login, Register, UpdateProfile } from "@/model/auth";
import { redirect } from "next/navigation";

export async function register(formdata: FormData) {
  const register: Register = {
    email: formdata.get("email") as string,
    password: formdata.get("password") as string,
    password_confirmation: formdata.get("confirmpassword") as string,
    name: formdata.get("fullname") as string,
    phone: formdata.get("phone") as string,
    role: formdata.get("role") as string,
  };

  if (
    (typeof register.email == "undefined" && !register.email) ||
    (typeof register.password == "undefined" && !register.password) ||
    (typeof register.password_confirmation == "undefined" &&
      !register.password_confirmation) ||
    (typeof register.name == "undefined" && !register.name)
  ) {
    return { message: "Please fill all data!!!", success: false };
  }

  if (register.password != register.password_confirmation) {
    return {
      message: "Password and Confirn Password is not same!!!",
      success: false,
    };
  }

  const result = new Validation().validateEmail(register.email);

  if (result) {
    const req = await agent.Account.register(register);
    if (req.success == false) {
      return { message: req.message, success: false };
    }
    new CookieConfig().setToken("jwt", req.data.token);
    redirect("/");
  }
  return { message: "Your email format is not true", success: false };
}

export async function login(formdata: FormData) {
  const login: Login = {
    email: formdata.get("email") as string,
    password: formdata.get("password") as string,
  };

  if (
    (typeof login.email == "undefined" && !login.email) ||
    (typeof login.password == "undefined" && !login.password)
  ) {
    return { message: "Please fill all data!!!", error: true };
  }

  const result = new Validation().validateEmail(login.email);

  if (result) {
    const req = await agent.Account.login(login);
    if (!req.success) {
      return { message: req.message, error: true };
    }
    new CookieConfig().setToken("jwt", req.data.token);
    redirect("/");
  }
  return { message: "Your email format is not true", error: true };
}

export async function getProfile() {
  const req = await agent.Account.getProfile();
  return req?.data;
}

export async function signOut() {
  new CookieConfig().deleteCookie("jwt");
}

export async function updateProfile(formdata: FormData) {
  const update: UpdateProfile = {
    email: formdata.get("email") as string,
    name: formdata.get("fullname") as string,
    phone: formdata.get("phone") as string,
  };

  if (
    (typeof update.email == "undefined" && !update.email) ||
    (typeof update.name == "undefined" && !update.name)
  ) {
    return { message: "Please fill all data!!!", success: false };
  }
  if (typeof update.phone == "undefined" || update.phone == null) {
    update.phone = "";
  }

  const result = new Validation().validateEmail(update.email);

  if (result) {
    console.log("Update Profile", update);
    const req = await agent.Account.updateProfile(update);
    console.log("Update Profile", req);
    if (req.success == false) {
      return { message: req.message, success: false };
    }
    return { message: "Profile updated successfully", success: true };
  }
  return { message: "Your email format is not true", success: false };
}
