import { testapi_model } from "../models/test.model.js";

export const testapi_controller = async (req, res) => {
  try {
    const result = await testapi_model();
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
