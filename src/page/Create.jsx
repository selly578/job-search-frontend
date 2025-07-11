import m from "mithril";
import { JobForm } from "../components/JobForm";

export function Create(){
    return {
        oninit(){
            document.title = `Buat job baru`
        },
        view(){
            return(

            <>
                <JobForm edit={false}/>
            </>
            ) 
        }
    }
}