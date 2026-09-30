import { Router } from "express";
import { healthCheck } from "../controllers/health.controller.js";

const router = Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health Check
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Server is running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 timestamp:
 *                   type: string
 */
router.get("/", healthCheck);

export default router;
