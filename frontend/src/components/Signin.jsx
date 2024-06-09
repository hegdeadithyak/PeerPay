import { Bottombutton } from "./bottombutton";
import { Heading } from "./heading";
import { InputBox } from "./inputbox";

export function Signin() {
    return (
        <>
            <div className="relative h-screen flex justify-center items-center">
                <div className="absolute inset-0 overflow-hidden">
                    <iframe
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/wdD8rshrx80?autoplay=1&mute=1&loop=1&controls=0"
                        title="YouTube video player"
                        allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10 flex flex-col justify-center">
                    <div className="rounded-lg bg-white w-100 text-center p-2 h-max px-4">
                        <Heading label={"Sign in"} />
                        <InputBox placeholder="sample@gmail.com" label={"Email"} />
                        <InputBox placeholder="123456" label={"Password"} />
                        <Bottombutton label={"Sign in"} />
                    </div>
                </div>
            </div>
        </>
    );
}
