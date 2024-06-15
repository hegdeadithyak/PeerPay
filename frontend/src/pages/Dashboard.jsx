import { Appbar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Bottombutton } from "../components/bottombutton";
import { User } from "../components/users";

export function Dashboard() {

    return <>
        <div className="bg-black h-screen">
            <div className="bg-gray-100 h-screen m-5 p-5">
                <Appbar />
                <Balance value={1000} />
                <User />
                <div className="flex justify-end mt-8 mr-5">
                    <Bottombutton label="Add Friends" />
                </div>
            </div>
        </div>
    </>
}