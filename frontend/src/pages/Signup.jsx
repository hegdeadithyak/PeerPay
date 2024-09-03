import { useState } from "react";
import axios from "axios";
import { Heading } from "../components/heading";
import { Subheading } from "../components/subheading";
import { InputBox } from "../components/inputbox";
import { Bottombutton } from "../components/bottombutton";
import { BottomFooter } from "../components/bottomfooter";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const handleSignup = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        {
          username: username.trim(),
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          password: password,
        }
      );

      console.log("Signup successful:", response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Error during signup:", error.response.data);
        alert("Signup failed: " + error.response.data.message);
      } else {
        console.error("Error during signup:", error.message);
        alert("Signup failed: " + error.message);
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="adithyahegdek"
            label={"Username"}
          />
          <InputBox
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="adithya"
            label={"Firstname"}
          />
          <InputBox
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="hegde"
            label={"Lastname"}
          />
          <InputBox
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="sample@gmail.com"
            label={"Email"}
          />
          <InputBox
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="123456"
            label={"Password"}
          />
          <div className="pt-4">
            <Bottombutton onClick={handleSignup} label={"Sign up"} />
          </div>
          <BottomFooter
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};
