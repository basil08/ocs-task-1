import Head from 'next/head'
import { useEffect, useState } from 'react'


export default function Home() {

  const GITHUB_REST_API_ENDPOINT = "https://api.github.com/";
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [warnings, setWarning] = useState(new Array());

  const [orgName, setOrgName] = useState("");
  const [repoCount, setRepoCount] = useState(10);
  const [forkerCount, setForkerCount] = useState(5);

  const [repos, setRepos] = useState([]);
  // for each "popular" repo, forks will contain an array of its oldest forkers
  const [forks, setForks] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!orgName) {
      setError("No organization name is set! Please set one to proceed!");
      // return;
    }

    if (!repoCount) {
      const newArr = warnings.slice().push("No repoCount was set! Default value of 10 is assumed!");
      setWarning("No repoCount was set! Default value of 10 is assumed!");
      setRepoCount(10);
    }

    if (!forkerCount) {
      const newArr = warnings.slice().push("No forkerCount was set! Default value of 5 is assumed!");
      setWarning("No forkerCount was set! Default value of 5 is assumed!");
      setForkerCount(5);
    }

    // make endpoint an .env variable?
    // but it's client-side request
    fetch(`${GITHUB_REST_API_ENDPOINT}orgs/${orgName}/repos`, {
      method: 'GET',
      headers: { "Content-Type": "application/json" }
    }).then(async (response) => {
      if (!response.ok) {
        // handle errors
        setError("Response was ill-formed. Please try again!");
      }

      const data = await response.json();
      console.log(data);
    })

  };

  return (
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <Head>
          <title>Home | OCS Task 1</title>
        </Head>

        <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
          <h1 className="text-6xl font-bold">
            Github Organizations Explorer
          </h1>

          <p className="mt-3 text-2xl">
            Get started by entering <code className="bg-slate-300 rounded font-mono">Organization Name</code>,{' '}
            <code className="bg-slate-300 rounded font-mono">repoCount</code>, and{' '}
            <code className="bg-slate-300 rounded font-mono">forkerCount</code>.
          </p>

          {error && <p className="p-1 m-1 text-red bg-red-300">{error}</p>}
          {warnings && <p className="p-1 m-1 text-orange bg-orange-300">{warnings}</p>}

          <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
            <form>
              <div className="py-1">
                <label htmlFor="orgname" className="block text-sm font-medium text-black-700">
                  Organization Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="text"
                    name="orgname"
                    id="orgname"
                    onChange={(e) => setOrgName(e.target.value)}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="google"
                    value={orgName}
                  />
                </div>
              </div>

              <div className="py-1">
                <label htmlFor="n" className="block text-sm font-medium text-black-700">
                  repoCount
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="text"
                    name="n"
                    id="n"
                    onChange={(e) => setRepoCount(e.target.value)}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="10"
                    value={repoCount}
                  />
                </div>
              </div>

              <div className="py-1">
                <label htmlFor="m" className="block text-sm font-medium text-black-700">
                  forkerCount
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="text"
                    name="m"
                    id="m"
                    onChange={(e) => setForkerCount(e.target.value)}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="5"
                    value={forkerCount}
                  />
                </div>
              </div>

              <div className="py-3">
                <button
                  onClick={handleSubmit}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >Fetch</button>
              </div>
            </form>
          </div>
        </main>

        <footer className="flex h-24 w-full items-center justify-center border-t">
          <a
            className="flex items-center justify-center hover:text-blue-600"
            href="https://basil08.github.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            &copy; Basil Labib
          </a>
        </footer>
      </div>
  )
}
