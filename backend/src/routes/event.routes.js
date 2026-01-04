const express = require("express");
const router = express.Router();
const { getEventById, getAllEvents, createEvent, updateEvent, deleteEvent } = require("../controller/event.controller");

router.get("/:id",getEventById);
router.get("/",getAllEvents) 
router.post("/",createEvent); 
router.put("/:id",updateEvent) 
router.delete("/:id",deleteEvent) 

module.exports = router;


