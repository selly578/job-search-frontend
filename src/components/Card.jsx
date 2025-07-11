/** @jsx m */
import m from "mithril";

function getBadgeColor(status) {
  switch (status.toLowerCase()) {
    case "open":
      return "badge-success";
    case "taken":
      return "badge-warning";
    case "closed":
      return "badge-error";
    default:
      return "badge-neutral";
  }
}

export function JobCard({ attrs }) {
  const token = localStorage.getItem("token") || null;
  const job = attrs.job;
  const username = localStorage.getItem("username");
  var isDelete = false;

  return {
    delete(){
      m.request({
        url: `${import.meta.env.VITE_API_URL}/job/${job.id}/`,
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }).then(function(data){
        isDelete = true;
      }).catch(function(error){
        console.log(error);
      });
    },
    view() {
      return (
        <div class={`card bg-base-100 shadow-sm border border-base-200 mb-4 ${isDelete && "hidden"}`}>
          <div class="card-body">
            <div class="flex justify-between items-center">
              <h2 class="card-title">{job.name}</h2>
              <div class={`badge badge-outline ${getBadgeColor(job.status)}`}>{job.status}</div>
            </div>

            <p class="text-sm text-gray-500">{job.description}</p>

            <div class="text-sm mt-2 space-y-1">
              <p>
                <span class="font-semibold">Budget:</span> Rp {job.budget_from.toLocaleString()} – {job.budget_to.toLocaleString()}
              </p>
              <p>
                <span class="font-semibold">Dibuat oleh:</span> {job.author.username} ({job.author.email})
              </p>
              <p>
                <span class="font-semibold">Tanggal posting:</span>{" "}
                {new Date(job.date_created).toLocaleDateString()}
              </p>
              {job.deadline && (
                <p>
                  <span class="font-semibold">Deadline:</span>{" "}
                  {new Date(job.deadline).toLocaleDateString()}
                </p>
              )}
            </div>

            <div class="card-actions justify-end mt-6 flex flex-wrap gap-2">
              <m.route.Link
                class="btn btn-sm btn-outline"
                href={`/job/${job.id}`}
              >
                Lihat Detail
              </m.route.Link>
              {
                username == job.author.username? 
                <m.route.Link
                  class="btn btn-sm btn-outline btn-primary"
                  href={`/job/${job.id}/edit`}
                >
                  Edit
                </m.route.Link>
                :
                <></>
              }
              {
                username == job.author.username? 
                <button
                  class="btn btn-sm btn-outline btn-error"
                  onclick={() => {
                    if (confirm("Apakah kamu yakin ingin menghapus pekerjaan ini?")) {
                      this.delete(); 
                      // console.log("test");
                    }
                  }}
                >
                  Hapus
                </button>
                :
                <></>
              }


            </div>
          </div>
        </div>
      );
    },
  };
}
