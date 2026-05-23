const express = require("express");

const Lead = require("../models/Lead");

const router = express.Router();


// GET ALL LEADS
router.get("/", async (req, res) => {
  try {

    const leads = await Lead.find();

    res.status(200).json(leads);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});


// ADD LEAD
router.post("/", async (req, res) => {
  try {

    const lead = await Lead.create(req.body);

    res.status(201).json({
      message: "Lead added successfully",
      lead,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});


// UPDATE LEAD
router.put("/:id", async (req, res) => {
  try {

    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Lead updated successfully",
      updatedLead,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});


// DELETE LEAD
router.delete("/:id", async (req, res) => {
  try {

    await Lead.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Lead deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});

module.exports = router;