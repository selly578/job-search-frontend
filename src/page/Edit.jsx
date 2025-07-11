import m from "mithril";
import { JobForm } from "../components/JobForm";

export function Edit(){
    return {
        view(vnode){
            return(

            <>
                <JobForm edit={true} id={vnode.attrs.id}/>
            </>
            ) 
        }
    }
}