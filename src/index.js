import m from "mithril";
import { Home } from "./page/Home";
import { Login } from "./page/Login";
import { Register } from "./page/Register";
import { Logout } from "./page/Logout";
import { JobDetail } from "./page/JobDetail";
import { Create } from "./page/Create";
import { Edit } from "./page/Edit";
import { Layout } from "./Layout";
import "./App.css"; 

const root = document.querySelector("#app");

function withLayout(component){
    return {
        view(vnode){
            return m(Layout,m(component,{...vnode.attrs}));
        }
    }
}

function withAuth(component) {
    return {
      oninit(vnode) {
        if (!localStorage.getItem("token")) {
          console.log("a")
          m.route.set("/login");
          return false;
        }
      },
      view(vnode) {
        return m(Layout,m(component,{...vnode.attrs}));
      }
    };
  }
  

m.route.prefix = "#"
m.route(root,"/",{
    "/": withLayout(Home),
    "/login": withLayout(Login),
    "/register": withLayout(Register),
    "/logout": withAuth(Logout),
    "/job/new": withAuth(Create),
    "/job/:id": withLayout(JobDetail),
    "/job/:id/edit": withAuth(Edit),
    
})