const express = require("express");
const router = express.Router();
const Token = require("./token");
let tokenCount = 0;
let tokens = [];

/* BOOK TOKEN */
router.post("/book", (req, res) => {

  const activeToken = tokens.find(
    token =>
      token.studentEmail === req.body.studentEmail &&
      (
        token.status === "waiting" ||
        token.status === "called"
      )
  );

  if(activeToken){
    return res.send(
      "You already have an active token."
    );
  }

  const office =
    req.body.office || "General";

  let prefix = "Q";

  if(office === "Library") prefix = "L";
  if(office === "Fees Office") prefix = "F";
  if(office === "Admin Office") prefix = "A";
  if(office === "Hostel Office") prefix = "H";
  if(office === "Placement Cell") prefix = "P";
  if(office === "Campus Clinic") prefix = "C";
  if(office === "Cafeteria Pickup") prefix = "K";

  tokenCount++;

const newToken = {
  tokenNumber: prefix + tokenCount,
  studentEmail: req.body.studentEmail,
  office: req.body.office || "General",
  reason: req.body.reason || "No reason given",
  status: "waiting",
  waitTime: "Pending",
  callTime: ""
};

  tokens.push(newToken);

  res.send("Token Booked: " + newToken.tokenNumber);
});

/* VIEW ALL TOKENS */
router.get("/all", (req, res) => {
  res.json(tokens);
});

/* CALL NEXT */
router.put("/next", (req, res) => {

  const nextToken =
    tokens.find(token => token.status === "waiting");

  if(nextToken){
   nextToken.status = "called";
nextToken.callTime = Date.now();
    res.send("Called " + nextToken.tokenNumber);
  } else {
    res.send("No waiting tokens");
  }

});

/* COMPLETE */
router.put("/complete", (req, res) => {

  const activeToken =
    tokens.find(token => token.status === "called");

  if(activeToken){
    activeToken.status = "completed";
    res.send("Completed " + activeToken.tokenNumber);
  } else {
    res.send("No called token");
  }

});

/* CANCEL */
router.put("/cancel", (req, res) => {

  const removeToken =
    tokens.find(
      token =>
      token.status === "waiting" ||
      token.status === "called"
    );

  if(removeToken){
    removeToken.status = "cancelled";
    res.send("Cancelled " + removeToken.tokenNumber);
  } else {
    res.send("No token found");
  }

});
/* SET WAIT TIME */
router.put("/waittime", (req, res) => {

  const token = tokens.find(
    t => t.tokenNumber === req.body.tokenNumber
  );

  if(token){

    token.waitTime =
      req.body.waitTime || "Pending";

    res.send("Wait time updated");

  } else {

    res.send("Token not found");

  }

});
router.put("/expire", (req, res) => {

  const token = tokens.find(
    t => t.tokenNumber === req.body.tokenNumber
  );

  if(token && token.status === "called"){

    token.status = "expired";

    res.send("Token expired");

  } else {

    res.send("No active called token found");

  }

});
router.put("/studentcancel", (req, res) => {

  const token = tokens.find(
    t =>
      t.studentEmail === req.body.studentEmail &&
      (
        t.status === "waiting" ||
        t.status === "called"
      )
  );

  if(token){

    token.status = "cancelled";

    res.send("Booking cancelled");

  } else {

    res.send("No active booking found");

  }

});
router.put("/nextoffice", (req, res) => {

  const nextToken = tokens.find(
    t =>
      t.office === req.body.office &&
      t.status === "waiting"
  );

  if(nextToken){

    nextToken.status = "called";
    nextToken.callTime = Date.now();

    res.send("Called " + nextToken.tokenNumber);

  } else {

    res.send("No waiting token");

  }

});
router.put("/completeoffice", (req, res) => {

  const token = tokens.find(
    t =>
      t.office === req.body.office &&
      t.status === "called"
  );

  if(token){

    token.status = "completed";

    res.send("Completed " + token.tokenNumber);

  } else {

    res.send("No called token");

  }

});
module.exports = router;
