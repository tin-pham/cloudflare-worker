import { Ai } from '@cloudflare/ai'
import { Hono } from 'hono';

export interface Env {
	AI: any
}

const app = new Hono<{ Bindings: Env }>();

app.get("/", async (c) => {
	const ai = new Ai(c.env.AI)
	const content = c.req.query("query") || "Hello"

	const messages = [
		{ role: "system", content: "You are a helpful assistant." },
		{ role: "user", content },
	]

	const res = await ai.run('@cf/mistral/mistral-7b-instruct-v0.1', { messages })

	return c.json(res)
})

export default app;

