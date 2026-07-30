import {Router} from "express";
import {test , thread , threadId , deleteThread , chat}  from "../controllers/chat.controller.js"

const router = Router();

router.route("/test").post(test);
router.route("/thread").get(thread);
router.route("/thread/:threadId").get(threadId);
router.route("/deleteThread/:threadId").delete(deleteThread);
router.route("/chat").post(chat);

export default router;
