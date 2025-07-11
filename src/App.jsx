import m from "mithril";
import { JobCard } from "./components/Card";

export function App(){

  var jobs =  [];
  return {
    oninit() {
      m.request({
        method: "GET",
        url: `${import.meta.env.VITE_API_URL}/job/`,
      }).then(function(data){
        jobs = data.results
      });
    },
    view(){
      return (
        <>
        <div class="p-4 max-w-3xl mx-auto">
          <h1 class="text-xl font-bold mb-4">Daftar Job</h1>
          {jobs.map((job) => <JobCard job={job} />)}
        </div>
        </>
      )
    }
  }
}