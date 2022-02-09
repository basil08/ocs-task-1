const Table = ({ repos, repoCount, forkerCount }) => {

  repos.sort((a, b) => b.forks_count - a.forks_count)
  
  const splicedRepos = repos.slice(0, repoCount);

  return (
    <ul>
      {splicedRepos.map(repo => <li key={splicedRepos.indexOf(repo)}>{repo.name}{' '}{repo.forks_count}</li>)}
    </ul>
  )
}


export default Table;