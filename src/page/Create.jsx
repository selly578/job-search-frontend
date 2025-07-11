import m from "mithril";
import { JobForm } from "../components/JobForm";

export function Create(){
    return {
        view(){
            return(

            <>
                <JobForm edit={false}/>
            </>
            ) 
        }
    }
}