const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* ---------------- MIDDLEWARE ---------------- */
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

/* ---------------- STATIC ROUTES ---------------- */
app.get("/printer-model", (req, res) => {
  res.sendFile(path.join(__dirname, "public/printer-model.html"));
});

app.get("/hp123", (req, res) => {
  res.sendFile(path.join(__dirname, "public/hp123.html"));
});

app.get("/epson-net", (req, res) => {
  res.sendFile(path.join(__dirname, "public/epson-net.html"));
});

app.get("/brother-printer", (req, res) => {
  res.sendFile(path.join(__dirname, "public/brother-printer.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public/contact.html"));
});

/* ---------------- MAIL 1: MODEL SUBMIT ---------------- */
app.post("/send-model", async (req, res) => {
  const { printerModel, brand } = req.body;

  if (!printerModel) {
    return res.status(400).json({ success: false });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"Printer Setup" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `Printer Model Submitted - ${brand || "Unknown"}`,
      html: `
        <h3>Printer Model Submitted</h3>
        <p><b>Brand:</b> ${brand || "N/A"}</p>
        <p><b>Printer Model:</b> ${printerModel}</p>
        <p>Stage: Initial Setup</p>
      `
    });

    res.json({ success: true });
  } catch (err) {
    console.error("MODEL MAIL ERROR:", err);
    res.status(500).json({ success: false });
  }
});

/* ---------------- MAIL 2: CONTACT FORM ---------------- */
app.post("/send-contact", async (req, res) => {
  const { name, email, message, printerModel } = req.body;

  if (!name || !email || !message || !printerModel) {
    return res.status(400).json({ success: false });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"Printer Support" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `Support Request - ${printerModel}`,
      html: `
        <h3>New Support Request</h3>
        <p><b>Printer Model:</b> ${printerModel}</p>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `
    });

    res.json({ success: true });
  } catch (err) {
    console.error("CONTACT MAIL ERROR:", err);
    res.status(500).json({ success: false });
  }
});

/* ---------------- START SERVER ---------------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("✅ Server running on http://localhost:" + PORT);
});
