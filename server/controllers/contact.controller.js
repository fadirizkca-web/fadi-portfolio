import Contact from "../models/contact.model.js";
import { createCrudController } from "./crud.controller.js";

export default createCrudController(Contact);