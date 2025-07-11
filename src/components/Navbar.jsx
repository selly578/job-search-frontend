import m from "mithril";

export function Navbar() {
  const token = localStorage.getItem("token") || null;

  return {
    view() {
      return (
        <div class="navbar bg-base-100 shadow-sm">
          <div class="flex-1">
            <m.route.Link href="/" class="btn btn-ghost text-xl">
              MiniJob
            </m.route.Link>
          </div>

          {token ? (
            <div class="flex-none">
              <div class="dropdown dropdown-end">
                <div
                  tabindex="0"
                  role="button"
                  class="btn btn-ghost btn-circle avatar"
                >
                  <div class="w-10 rounded-full">
                    <img
                      alt="User Avatar"
                      src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"
                    />
                  </div>
                </div>
                <ul
                  tabindex="0"
                  class="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52"
                >
                  {/* <li>
                    <a class="justify-between">
                      Profile
                      <span class="badge">New</span>
                    </a>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li> */}
                  <li>
                    <m.route.Link href="/logout">Logout</m.route.Link>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div class="flex-none space-x-2 mr-4">
              <m.route.Link href="/login" class="btn btn-sm btn-outline">
                Login
              </m.route.Link>
              <m.route.Link href="/register" class="btn btn-sm btn-primary">
                Register
              </m.route.Link>
            </div>
          )}
        </div>
      );
    },
  };
}
