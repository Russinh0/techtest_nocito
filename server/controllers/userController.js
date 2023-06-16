import userServices from "../services/userServices.js";
import controllerInterface from "./interfaceController.js";

export async function register(req, res) {
  return controllerInterface(res, userServices.register, req.body);
}

export async function find(req, res) {
  return controllerInterface(res, userServices.find, req.body);
}

export async function edit(req, res) {
  return controllerInterface(res, userServices.edit, req.body);
}

export async function login(req, res) {
  return controllerInterface(res, userServices.login, req.body);
}
