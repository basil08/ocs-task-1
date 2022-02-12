// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dotenv from "dotenv"
dotenv.config()

import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message?: string
  data?: [Object],
  error?: Object
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  return new Promise((resolve, reject) => {
    const { orgName, repoCount, forkerCount } = req.body; 

    if (req.method !== 'POST') {
      res.status(405).json({ message: 'Only POST requests are allowed'});
    }

    fetch(`${process.env.GITHUB_GRAPHQL_API_ENDPOINT}`, {
      method: 'POST',
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${process.env.ACCESS_TOKEN}` },
      body: JSON.stringify({
         "query": "query($org_name: String!, $repo_count: Int!, $forker_count: Int!) { organization(login: $org_name) { repositories(first: $repo_count) { edges { node { name forkCount forks(orderBy: { field: CREATED_AT, direction: ASC }, first: $forker_count) { edges { node { createdAt owner { login } }}}   }}} }}",
         "variables": { "org_name": orgName, "repo_count": Number(repoCount), "forker_count": Number(forkerCount) } 
        })
    }).then(async (response) => {
      const data = await response.json();

      if (!response.ok) {
        res.json({ error: data.error });
        return
      }
      res.setHeader("Content-Type", "application/json")
      res.status(200).json({ data: data})
      resolve(200);
      
    }).catch(error => {
      res.json({ error })
      res.status(405).end();
      resolve(405);
    })
  });

}
