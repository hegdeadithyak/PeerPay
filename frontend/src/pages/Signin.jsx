import { Bottombutton } from "../components/bottombutton";
import { BottomFooter } from "../components/bottomfooter";
import { Heading } from "../components/heading";
import { InputBox } from "../components/inputbox";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const navigate = useNavigate();
    const handlesignin = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {}, {
                params: {
                    username: username,
                    password: password
                }
            });
            if (response.status === 200) {
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                alert("Invalid username or password");
            }
        }
    };


    return (
        <>
            <div className="relative h-screen flex justify-center items-center">
                <div className="absolute inset-0 overflow-hidden">

                </div>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10 flex flex-col justify-center">
                    <div className="rounded-lg bg-white w-100 text-center p-2 h-max px-4">
                        <Heading label={"Sign in"} />
                        <InputBox onChange={(e) => {
                            setUsername(e.target.value);
                        }} placeholder="adithya" label={"Email"} />
                        <InputBox onChange={(e) => {
                            setPassword(e.target.value);
                        }} placeholder="123456" label={"Password"} />
                        <Bottombutton onClick={handlesignin} label={"Sign in"} />
                        <BottomFooter label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
                    </div>
                </div>
            </div>
        </>
    );
}
