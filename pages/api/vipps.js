import mongoose from "mongoose";
import { Vipps } from "../../models/schema.js";
import { url } from "./state";

export default async function handler(req, res) {
  const { method } = req;

  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  switch (method) {
    case "POST":
      const vipps = new Vipps(req.body);
      await vipps.save();
      res.status(200).json(vipps);
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
