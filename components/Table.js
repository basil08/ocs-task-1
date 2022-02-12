const Table = ({ repos, repoCount, forkerCount }) => {

  repos.sort((a, b) => b.node.forkCount - a.node.forkCount)

  return (
    <ul>
      {repos.map(repo => {
        return <li className="py-2">
          <a href="#" className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h6 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{repo.node.name}</h6>
            <p className="font-bold text-gray-700 dark:text-gray-300">forkCount: {repo.node.forkCount}</p>
            <hr />
            <ul>
              {repo.node.forks.edges.map(fork => {
                return <li className="font-normal text-gray-700 dark:text-gray-400">
                  {fork.node.owner.login}
                  <br />
                  <p style={{fontSize: "small"}}>
                    {new Date(fork.node.createdAt).toDateString()}
                  </p>
                  <hr />
                </li>
              })}
            </ul>
          </a>
        </li>

      })}
    </ul>
  )
}


export default Table;