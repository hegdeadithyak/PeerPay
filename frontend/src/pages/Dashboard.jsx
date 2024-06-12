import { Appbar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { User } from "../components/users";

export function Dashboard(){
    return <>
        <Appbar />
        <Balance value={1000} />
        <User />
    </>
}