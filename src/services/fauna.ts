import { Client } from 'faunadb'

/* Creating a new client object with the secret key and domain. */
export const fauna = new Client({
    secret: process.env.FAUNADB_KEY,
    domain: "db.us.fauna.com",
})
