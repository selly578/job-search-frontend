/** @jsx m */
import m from "mithril";
import { extractErrors } from "../utils/utils";

export function Register() {
  var loading = false;
  var errors = [];
  let state = {
    username: "",
    email: "",
    phone: "",
    password: "",
  };

  return {
    oninit(){
      document.title = "Daftar akun baru";
    },
    submit(e){
        e.preventDefault();
        loading = true;
        m.request({
            url: `${import.meta.env.VITE_API_URL}users/`,
            method: "POST",
            body: state
        }).then(function(data){
            m.route.set("/login");
        }).catch(function(error){
          errors = extractErrors(error.response);
        }).finally(function(){
          loading = false;
        });
    },
    view() {
      return (
        <div class="flex justify-center items-center min-h-[80vh]">
          <div class="card w-full max-w-md bg-base-100 shadow-md">
            <form onsubmit={this.submit} class="card-body">
              {
                errors.length > 0 && (
                  <ul role="alert" class="alert alert-error alert-soft">                  
                    {errors.map(function(_error){
                      return <li>{_error}</li>
                    })}
                  </ul>
                )
 
              }
              <h2 class="card-title">Daftar Akun</h2>

              <input
                class="input input-bordered w-full"
                placeholder="Username"
                value={state.username}
                oninput={(e) => (state.username = e.target.value)}
              />
              <input
                class="input input-bordered w-full"
                placeholder="Email"
                type="email"
                value={state.email}
                oninput={(e) => (state.email = e.target.value)}
              />
              <input
                class="input input-bordered w-full"
                placeholder="Nomor HP"
                value={state.phone}
                oninput={(e) => (state.phone = e.target.value)}
              />
              <input
                class="input input-bordered w-full"
                type="password"
                placeholder="Password"
                value={state.password}
                oninput={(e) => (state.password = e.target.value)}
              />

              <button class="btn btn-primary mt-4 disabled:btn-soft" disabled={loading}>                
                {loading?<span className="loading loading-spinner loading-md"></span>:"Daftar"}
              </button>

              <p class="text-sm mt-2">
                Sudah punya akun?{" "}
                <m.route.Link
                  class="text-primary cursor-pointer"
                  href="/login"
                >
                  Masuk di sini
                </m.route.Link>
              </p>
            </form>
          </div>
        </div>
      );
    },
  };
}
