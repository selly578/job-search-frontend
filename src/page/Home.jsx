import m from "mithril";
import { JobCard } from "../components/Card";

export function Home(){
  var jobs =  [];
  var token = localStorage.getItem("token") || null;

  return {
    oninit() {
      m.request({
        method: "GET",
        url: `${import.meta.env.VITE_API_URL}job/`,
      }).then(function(data){
        jobs = data.results
      });
    },
    view(){
      if (jobs.length <= 0) {
        return <div class="p-4 text-center">Loading...</div>;
      }
      return (
        <>
        <div class="p-4 max-w-3xl mx-auto">
          <h1 class="text-xl font-bold mb-4">Daftar Job</h1>
          {
            token && <m.route.Link class="link link-primary link-hover" href="/job/new">Buat pekerjaan</m.route.Link>
          }          
          {jobs.map((job) => <JobCard job={job} />)}
        </div>
        </>
      )
    }
  }
}