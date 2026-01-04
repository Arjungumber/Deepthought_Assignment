const { ObjectId } = require("mongodb");
const { connectDb } = require("../db/mongoDb");

const getEventById = async (req, res) => {
    const { id } = req.params;
    if (!id || !ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid or missing id" });
    }

    try {
        const db = await connectDb();
        const event = await db
        .collection("events")
        .findOne({ _id: new ObjectId(id) });

        if (!event) {
        return res.status(404).json({ message: "Event not found" });
        }

        return res.status(200).json({
        success: true,
        event,
        message: "Event Fetched successfully",
        });
    } catch (error) {
        console.error("getEvent error:", error);
        return res.status(500).json({
        message: "Server error",
        });
    }
};

const getAllEvents = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skipRecords = (pageNum - 1) * limitNum;

    try {
        const db = await connectDb();
        const events = await db
        .collection("events")
        .find({})
        .skip(skipRecords)
        .limit(limitNum)
        .toArray();
        const total = await db.collection("events").countDocuments();
        return res.status(200).json({
        success: true,
        events,
        totalEvents: total,
        page: pageNum,
        limit: limitNum,
        message: "Events fetched successfully",
        });
    } catch (error) {
        console.error("getAllEvents error:", error);
        return res.status(500).json({
        success: false,
        message: "Server error",
        });
    }
};

const createEvent = async (req, res) => {
    const payload = req.body;
    try {
        const db = await connectDb();
        const event = await db.collection("events").insertOne(payload);
        return res.status(201).json({
        success: true,
        event,
        message: "Events created successfully",
        });
    } catch (error) {
        return res.status(500).json({
        success: false,
        message: "Server error",
        });
    }
};

const updateEvent = async (req, res) => {
    const payload = req.body;
    const { id } = req.params;
    if (!id || !ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid or missing id" });
    }

    try {
        const db = await connectDb();
        const event = await db
        .collection("events")
        .findOne({ _id: new ObjectId(id) });
        if (!event) {
        return res.status(404).json({
            success: false,
            message: "No event found",
        });
        }

        if (!payload) {
        return res
            .status(400)
            .json({ success: false, message: "No update payload provided" });
        }

        const result = await db
        .collection("events")
        .updateOne({ _id: new ObjectId(id) }, { $set: payload });

        const updatedEvent = await db
        .collection("events")
        .findOne({ _id: new ObjectId(id) });

        return res.status(200).json({
        success: true,
        result,
        updatedEvent,
        message: "Event updated successfully",
        });
    } catch (error) {
        console.error("updateEvent error:", error);
        return res.status(500).json({
        success: false,
        message: "Server error",
        });
    }
};

const deleteEvent = async (req, res) => {
    const { id } = req.params;
    if (!id || !ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid or missing id" });
    }

    try {
        const db = await connectDb();
        const event = await db
        .collection("events")
        .findOne({ _id: new ObjectId(id) });
        if (!event) {
        return res.status(404).json({
            success: false,
            message: "No event found",
        });
        }
        const deletedEvent = await db
        .collection("events")
        .deleteOne({ _id: new ObjectId(id) });
        return res.status(200).json({
        success: true,
        deletedEvent,
        message: "Event deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
        success: false,
        message: "Server error",
        });
    }
};

module.exports = {
    getEventById,
    getAllEvents,
    createEvent,
    updateEvent,
    deleteEvent,
};
