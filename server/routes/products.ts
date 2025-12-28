import e, { Router } from "express";
import { withDb } from "../middleware/withDB";
import { validateUser } from "../middleware/validateUser";

const router = Router();

// New product route
router.post("/new", withDb, validateUser, (req, res) => {
 
  res.status(201).json({ message: "Product created successfully." , requestUser: req.user});
});

export default router;