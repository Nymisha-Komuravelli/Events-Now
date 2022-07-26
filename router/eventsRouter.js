const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const { body, validationResult } = require("express-validator");
const Event = require("../models/Event");

/* 
    Events Router
    Usage: Upload an event
    URL: http://127.0.0.1:5000/api/events/upload
    params: name, image, date, type, price, info
    access: private
*/
router.post(
  "/upload",
  authenticate,
  [
    body("name").notEmpty().withMessage("Name of the event is required"),
    body("image").notEmpty().withMessage("Image of the event is required"),
    body("date").notEmpty().withMessage("Date of the event is required"),
    body("type").notEmpty().withMessage("Type of the event is required"),
    body("price").notEmpty().withMessage("Price of the event is required"),
    body("info").notEmpty().withMessage("Information of the event is required"),
  ],
  async (request, response) => {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(401).json({ errors: errors.array() });
    }
    try {
      let { name, image, date, type, price, info } = request.body;
      let user = request.user.id;
      let event = new Event({ user, name, image, date, type, price, info });
      event = await event.save();
      response
        .status(200)
        .json({ message: "Event upload is successful", event: event });
    } catch (error) {
      console.log(error);
      response.status(500).json({
        errors: [{ message: error.message }],
      });
    }
  }
);
/* 
    Events Router
    Usage: Get Free Events
    URL: http://127.0.0.1:5000/api/events/free
    params: no-fields
    access: public
*/
router.get("/free", async (request, response) => {
  try {
    let events = await Event.find({type: "FREE"});
    response.status(200).json(events);
  } catch (error) {
    console.log(error);
      response.status(500).json({
        errors: [{ message: error.message }],
      });
  }
});
/* 
    Events Router
    Usage: Get PRO Events
    URL: http://127.0.0.1:5000/api/events/pro
    params: no-fields
    access: private
*/
router.get("/pro", authenticate, async (request, response) => {
    try {
        let events = await Event.find({type: "PRO"});
        response.status(200).json(events);
      } catch (error) {
        console.log(error);
          response.status(500).json({
            errors: [{ message: error.message }],
          });
      }
});

module.exports = router;
