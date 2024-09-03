const express = require('express');
const zod = require("zod");
const router = express.Router();
const jwt = require("jsonwebtoken");
const jwtsecret = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxNzkyMTI1MSwiaWF0IjoxNzE3OTIxMjUxfQ.ylhvi22CC6A0EUHrSnLWtcnR1yv1Kye9O4vgI1dn0jc";
const {authmiddleware} = require("../middleware.js")
const {PrismaClient} = require("@prisma/client");


const prisma = new PrismaClient();

const signupschema = zod.object({
    username: zod.string(),
    email : zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
});

router.post("/signup", async (req, res) => {
    const { success, error, data } = signupschema.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            message: "Invalid input",
            errors: error.errors
        });
    }

    try {
        const existinguser = await prisma.user.findFirst({
            where: {
                email: data.email
            },
            select: {
                id: true
            }
        });

        if (existinguser) {
            return res.status(409).json({
                message: "Email already taken"
            });
        }

        const user = await prisma.user.create({
            data: {
                username: data.username,
                email: data.email,
                password: data.password, 
                firstName: data.firstName,
                lastName: data.lastName
            },
            select: {
                id: true
            }
        });

        await prisma.account.create({
            data: {
                balance: Math.ceil(1 + Math.random() * 10000),
                userId: user.id,
            }
        });

        const token = jwt.sign({ id: user.id }, jwtsecret);
        return res.json({
            message: "User Created",
            token: token
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
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
    console.log(body);
    const user = await prisma.user.findFirst({
        where:{
        username : body.username,
        password : body.password
        }
    })

    if(user){
        const token = jwt.sign({ id: user.id }, jwtsecret);
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
        id : req.id
    })

    res.json({
        message : "Updated Successfully"
    })

})
module.exports = router;
