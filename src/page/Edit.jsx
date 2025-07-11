import m from "mithril";
import { JobForm } from "../components/JobForm";

export function Edit(){
    return {
        oninit(){
            document.title = `Edit job`
        },
        view(vnode){
            return(

            <>
                <JobForm edit={true} id={vnode.attrs.id}/>
            </>
            ) 
        }
    }
}