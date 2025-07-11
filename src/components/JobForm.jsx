import m from "mithril";
import { extractErrors,authRequest } from "../utils/utils";


export function JobForm(vnode) {
  var form = {
    name: "",
    description: "",
    budget_from: 0,
    budget_to: 0,
    deadline: "",
    status: "open",
  };

  var isEdit = vnode.attrs.edit;
  var errors = [];
  var loading = false;
  const token = localStorage.getItem("token");

  return {
    oninit(vnode) {
      if(isEdit){
        m.request({
          url: `${import.meta.env.VITE_API_URL}job/${vnode.attrs.id}/`,
          method: "GET"          
        }).then(function(data){
          form.name = data.name;
          form.description = data.description;
          form.budget_from = data.budget_from;
          form.budget_to = data.budget_to;
          form.deadline = data.deadline;
          form.status = data.status;
        });
      }
    },
    submit(e){
      e.preventDefault();
      loading = true;
      authRequest({
        url: isEdit? `${import.meta.env.VITE_API_URL}job/${vnode.attrs.id}/` : `${import.meta.env.VITE_API_URL}job/`,
        method: isEdit? "PUT" :"POST",
        body: form,
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }).then(function(data){
        form = {
          name: "",
          description: "",
          budget_from: 0,
          budget_to: 0,
          deadline: "",
          status: "open",
        };
        m.route.set("/")
      }).catch(function(error){
        errors = extractErrors(error.response);
      }).finally(function(){
        loading = false;
      });
    },
    view(vnode) {
      const id = vnode.attrs.id;

      return (
        <div class="p-4 max-w-2xl mx-auto">
          <h1 class="text-xl font-bold mb-4">
            {isEdit ? "Edit Pekerjaan" : "Buat Pekerjaan"}
          </h1>

          <form onsubmit={this.submit} class="space-y-4">
              {
                errors.length > 0 && (
                  <ul role="alert" class="alert alert-error alert-soft">                  
                    {errors.map(function(_error){
                      return <li>{_error}</li>
                    })}
                  </ul>
                )
 
              }
            <div>
              <label class="label">Nama</label>
              <input
                type="text"
                class="input input-bordered w-full"
                value={form.name}
                oninput={(e) => (form.name = e.target.value)}
                required
              />
            </div>

            <div>
              <label class="label">Deskripsi</label>
              <textarea
                class="textarea textarea-bordered w-full"
                value={form.description}
                oninput={(e) => (form.description = e.target.value)}
                required
              ></textarea>
            </div>

            <div class="flex gap-4">
              <div class="flex-1">
                <label class="label">Budget Dari</label>
                <input
                  type="number"
                  class="input input-bordered w-full"
                  value={form.budget_from}
                  oninput={(e) =>
                    (form.budget_from = parseInt(e.target.value) || 0)
                  }
                  required
                />
              </div>
              <div class="flex-1">
                <label class="label">Budget Sampai</label>
                <input
                  type="number"
                  class="input input-bordered w-full"
                  value={form.budget_to}
                  oninput={(e) =>
                    (form.budget_to = parseInt(e.target.value) || 0)
                  }
                  required
                />
              </div>
            </div>

            <div>
              <label class="label">Deadline</label>
              <input
                type="date"
                class="input input-bordered w-full"
                value={form.deadline}
                oninput={(e) => (form.deadline = e.target.value)}
              />
            </div>
            {
                isEdit ?
                <div>
                <label class="label">Status</label>
                <select
                    class="select select-bordered w-full"
                    value={form.status}
                    onchange={(e) => (form.status = e.target.value)}
                >
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                    <option value="taken">Taken</option>
                </select>
                </div>
                :
                <></>
            }

            <button type="submit" class="btn btn-primary w-full disabled:btn-soft" disabled={loading}>
              {loading?
                <span className="loading loading-spinner loading-md"></span>: isEdit ? "Simpan Perubahan" : "Buat Pekerjaan"
              }
            </button>
          </form>
        </div>
      );
    },
  };
}
