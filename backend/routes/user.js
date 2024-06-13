const express = require('express');
const zod = require("zod");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { User,Account } = require("../db");
const jwtsecret = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxNzkyMTI1MSwiaWF0IjoxNzE3OTIxMjUxfQ.ylhvi22CC6A0EUHrSnLWtcnR1yv1Kye9O4vgI1dn0jc";
const {authmiddleware} = require("../middleware.js")


const signupschema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
});

router.post("/signup",async (req, res) => {
    const body = req.body;
    const success = signupschema.safeParse(body);
    if (!success) {
        return res.json({
            message: "Email already exists"
        })
    }

    const existinguser = await User.findOne({
        username: req.body.username
    });
    
    if(existinguser && existinguser._id){
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })

    const userid = user._id;
    await Account.create({
        userId : userid,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({ id: user._id }, jwtsecret);
    return res.json({
        message: "User created",
        token : token
    });
});

const signinschema = zod.object({
    username: zod.string(),
    password: zod.string()
});

router.post("/signin",async (req,res) => {
    const body = req.body;
    const success = signinschema.safeParse(body);

    if(!success){
        return res.json({
            message: "Invalid username or password"
        })
    }

    const user = await User.findOne({
        username : body.username,
        password : body.password
    })

    if(user){
        const token = jwt.sign({ id: user._id }, jwtsecret);
        return res.status(200).json({
            message: "Signin success",
            token : token
        })
    }

    res.status(401).json({
        message: "Invalid username or password"
    });
})

const updatebodyschema = zod.object({
    password : zod.string().optional(),
    firstName : zod.string().optional(),
    lastName : zod.string().optional()
})

router.put("/",authmiddleware, async (req,res)=>{
    const body = req.body;
    const {success} = updatebodyschema.safeParse(body);
    
    if(!success){
        res.status(411).json({
            message : "Error while updating information"
        })
    }

    await User.updateOne(req.body,{
        _id : req.userId
    })

    res.json({
        message : "Updated Successfully"
    })

})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;