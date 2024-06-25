import { createClient } from "redis"
export const connectRedis = async () => {
  const client = createClient()
  client.on("error", (err) => console.log("Redis Client Error", err))
  await client.connect()
  return client
}
