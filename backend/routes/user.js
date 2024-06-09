const express = require('express');
const zod = require("zod");
const router = express.Router();
const { User } = require("../db");
const jwtsecret = require("../config");
const {authmiddleware} = require("../middleware.js")


const signupschema = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
});

router.get("/signup",async (req, res) => {
    const body = req.body;
    const success = signupschema.safeParse(body);
    if (!success) {
        return res.json({
            message: "Email already exists"
        })
    }

    const user  = User.findOne({
        username: body.username
    });
    
    if(user._id){
        return res.json({
            message: "Email already exists"
        })
    }

    const dbUser = await User.create(body);
    const token = jwt.sign({ id: dbUser._id }, jwtsecret);
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

    const user = User.findOne({
        username : body.username,
        password : body.password
    })

    if(user){
        const token = jwt.sign({ id: user._id }, jwtsecret);
        return res.json({
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