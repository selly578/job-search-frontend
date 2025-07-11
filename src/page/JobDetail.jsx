import m from "mithril";

export function JobDetail() {
  const username = localStorage.getItem("username");
  let job = null;

  return {
    oninit(vnode) {
      const jobId = vnode.attrs.id;
      m.request({
        method: "GET",
        url: `${import.meta.env.VITE_API_URL}/job/${jobId}/`,
      }).then((data) => {
        job = data;
      });
    },
    view() {
      if (!job) {
        return <div class="p-4 text-center">Loading...</div>;
      }

      return (
        <div class="p-4 max-w-3xl mx-auto">
          <h1 class="text-2xl font-bold mb-2">{job.name}</h1>
          {
                username == job.author.username &&
                <m.route.Link
                  class="btn btn-sm btn-outline btn-primary"
                  href={`/job/${job.id}/edit`}
                >
                  Edit
                </m.route.Link>
              }
              {
                username == job.author.username &&
                <button
                  class="btn btn-sm btn-outline btn-error"
                  onclick={() => {
                    // Handler hapus nanti taruh di sini
                  }}
                >
                  Hapus
                </button>

            }
          <p class="text-sm text-gray-500 pt-5">
            Status: <span class="font-semibold">{job.status}</span> |{" "}
            Dibuat: {new Date(job.date_created).toLocaleString()}
          </p>
          <p class="text-sm text-gray-500">
            Deadline:{" "}
            {job.deadline
              ? new Date(job.deadline).toLocaleDateString()
              : "-"}
          </p>

          <div class="mt-4">
            <h2 class="text-lg font-semibold mb-1">Deskripsi</h2>
            <p class="text-gray-800">{job.description}</p>
          </div>

          <div class="mt-4">
            <h2 class="text-lg font-semibold mb-1">Budget</h2>
            <p>
              Rp {job.budget_from.toLocaleString()} - Rp{" "}
              {job.budget_to.toLocaleString()}
            </p>
          </div>

          <div class="mt-6 pt-4 border-t">
            <h2 class="text-sm text-gray-500">Diposting oleh:</h2>
            <p class="text-base">
              {job.author.username} | <a class="link link-primary link-hover" href= {`mailto:(${job.author.email})` }>{job.author.email}</a> 
            </p>
          </div>

          <div class="mt-6">
            <m.route.Link
              class="btn btn-sm btn-outline btn-primary"
              href="/"
            >
              ⬅ Kembali
            </m.route.Link>
          </div>
        </div>
      );
    },
  };
}
