import m from "mithril";
import { JobCard } from "../components/Card";

export function Profile(vnode){
    const userId = vnode.attrs.id;
    const username = localStorage.getItem("username");
    var user = {};
    var postedJob = [];

    return {
        oninit(){
            m.request({
                url: `${import.meta.env.VITE_API_URL}/users/${userId}/`,
                method: "GET"
            }).then(async function(data){
                user = data;
                document.title = user.username;
                m.request({
                    url: `${import.meta.env.VITE_API_URL}/job/?author=${user.username}`,
                    method: "GET",
                }).then(function(data){
                    postedJob = data.results;                    
                });
            });
            
        },
        view(){
            return (
                <>
                    <div className="card w-96 bg-base-100 shadow-lg hover:shadow-2xl transition-shadow duration-300 mx-auto">
                        <figure className="mt-4 flex justify-center">
                            <img 
                                src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"
                                alt="Profile" 
                                className="rounded-full w-32 h-32 border-4 border-primary shadow-md transition-all duration-300 hover:scale-105" 
                            />
                        </figure>
                        <div className="card-body text-center space-y-3">
                            <h2 className="text-center text-xl font-semibold">{user.username}</h2>
                            <p className="text-sm text-gray-600">{user.email}</p>
                            <p className="text-sm text-gray-500">{user.phone || "Phone number not available"}</p>
                            <div className="card-actions justify-center">
                                {user.username === username && <button className="btn btn-primary w-full">Edit Profile</button>}
                            </div>
                        </div>
                    </div>
                    <div class="mt-5 p-4 max-w-3xl mx-auto">
                        <h3 className="font-semibold text-xl">Job posted by {user.username}</h3>
                        {
                            postedJob.length > 0?postedJob.map(function(job){
                                return (
                                    <JobCard job={job}/>
                                )
                            }):<></>
                        }
                    </div>
                </>


            )
        }
    }
}