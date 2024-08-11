import { Bottombutton } from "../components/bottombutton";
import { BottomFooter } from "../components/bottomfooter";
import { Heading } from "../components/heading";
import { InputBox } from "../components/inputbox";
import { Subheading } from "../components/subheading";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  
  const handleSignup = async () => {
    try{
      const response = await axios.post("http://localhost:3000/api/v1/user/signup",{},{params: {
        username: username,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      }});
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    }
    catch (error) {
      if (error.response.status === 411) {
        alert("Email already taken/Incorrect inputs");
      }
    }
  };

  return (
    <div className="bg-slate-800 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-100 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <Subheading label={"Enter your information to create an account"} />
          <InputBox
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="adithyahegdek"
            label={"Username"}
          />
          <InputBox
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            placeholder="adithya"
            label={"Firstname"}
          />
          <InputBox
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            placeholder="hegde"
            label={"Lastname"}
          />
          <InputBox
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="sample@gmail.com"
            label={"Email"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="123456"
            label={"Password"}
          />
          <div className="pt-4">
            <Bottombutton onClick={handleSignup} label={"Sign up"} />
          </div>
          <BottomFooter label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
        </div>
      </div>
    </div>
  );
};