import React from "react";
import { Modal, Box, Button, Typography } from "@mui/material";

const EnquiryModal = ({ open, onClose, phoneNumber, emailAddress }) => {
  const message = encodeURIComponent("Hi, I am interested in your project!");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  const emailSubject = encodeURIComponent("Project Inquiry");
  const emailBody = encodeURIComponent("Hi, I am interested in your project!");
  const mailUrl = `mailto:${emailAddress}?subject=${emailSubject}&body=${emailBody}`

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyles}>
        <Typography variant="h6" sx={{ mb: 2, color: "#d7dadc" }}>
          Contact Us
        </Typography>
        <Typography sx={{ mb: 3, color: "#818384" }}>
          Choose your preferred mode of communication:
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          {/* WhatsApp Button */}
          <Button
            variant="contained"
            sx={{
              bgcolor: "#25D366",
              color: "#fff",
              "&:hover": { bgcolor: "#1E9E50" },
            }}
            onClick={() => window.open(whatsappUrl, "_blank")}
          >
            WhatsApp
          </Button>

          {/* Email Button */}
          <Button
            variant="contained"
            sx={{
              bgcolor: "#0072C6",
              color: "#fff",
              "&:hover": { bgcolor: "#005B99" },
            }}
            onClick={() => (window.location.href = mailUrl)}
          >
            Email
          </Button>
        </Box>
        <Button sx={{ mt: 2, color: "#d7dadc" }} onClick={onClose}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

const modalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#1a1a1b",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
  color: "#d7dadc",
};

export default EnquiryModal;
