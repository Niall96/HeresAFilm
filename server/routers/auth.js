const { Router } = require("express");
const { check } = require("express-validator");
const { validateUtils } = require("../utils");
const { AuthController } = require("../controllers");

const auth = Router();

/**
 * @swagger
 * /auth:
 *   post:
 *     tags: [
 *       auth
 *     ]
 *     summary: Authenticates User
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emailAddress:
 *                 type: string
 *                 required: true
 *                 description: User Email
 *                 example: rooneyniall@rocketmail.com
 *               password:
 *                 type: string
 *                 required: true
 *                 description: User Password
 *                 example: Password12!
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '{ "accessToken": "lcdjn", "refreshToken": "lhiudsff"}'
 *       401:
 *         description: Invalid Credentials
 */
auth.post(
  "/",
  [
    check("emailAddress").exists().withMessage("Email").trim(),
    check("password")
      .exists()
      .matches(/[!@#$%^&*(),.?":{}|<>]/),
  ],
  validateUtils.validate,
  AuthController.authenticate
);

/**
 * @swagger
 * /auth/refresh:
 *   get:
 *     tags: [
 *       auth
 *     ]
 *     summary: Authenticates User
 *     parameters:
 *       - name: id
 *         in: path
 *         type: integer
 *         description: The ID of the requested user.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '{ "accessToken": "lcdjn", "refreshToken": "lhiudsff"}'
 *       401:
 *         description: Invalid Credentials
 */
auth.get("/refresh", AuthController.refresh);

module.exports = auth;
