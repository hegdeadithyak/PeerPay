import { Bottombutton } from "../components/bottombutton";
import { BottomFooter } from "../components/bottomfooter";
import { Heading } from "../components/heading";
import { InputBox } from "../components/inputbox";
import { Subheading } from "../components/subheading";

export const Signup = () => {
    return <div className="bg-slate-800 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-100 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <Subheading label={"Enter your infromation to create an account"} />
        <InputBox placeholder="John" label={"First Name"} />
        <InputBox placeholder="Doe" label={"Last Name"} />
        <InputBox placeholder="sample@gmail.com" label={"Email"} />
        <InputBox placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Bottombutton label={"Sign up"} />
        </div>
        <BottomFooter label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}