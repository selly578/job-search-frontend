import m from "mithril";

export function Logout(){
    return {
        oninit(){
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            m.route.set("/login");
        },
        view(){
            return <></>
        }
    }
}