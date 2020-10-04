"use strict";
const { Router } = require('express');
const express = require('express');
const router = express.Router();

router.get((req , res , next) => {
    res.send('Register!');
    console.log("reg");
});
module.exports = router;