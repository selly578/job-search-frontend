import m from "mithril"; 
import { Navbar } from "./components/Navbar";

export function Layout(){
    return {
        view(vnode){
            return (
                <div>
                  <Navbar/>
                  <main class="mx-8 my-5">{vnode.children}</main>
                </div>
              )
        }
    }
}