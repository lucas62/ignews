import { NextApiRequest, NextApiResponse } from 'next'

/* A function that returns a JSON object. */
export default (request: NextApiRequest, response: NextApiResponse) => {
    const users = [
        { id: 1, name: 'Diego' },
        { id: 2, name: 'Lucas' },
        { id: 3, name: 'Rafa' },
    ]

    return response.json(users)
}