/// <reference types="vitest" />
import { z } from "zod"
import { Restt, ResttResponse } from "@restt/server"
import { createClient, request } from "../src/index"
import Fastify from "fastify"
import { describe, expect, it, afterAll } from "vitest"

describe("Restt Client", async () => {
	const server = Fastify()
	const port = 8573

	afterAll(() => server.close())

	const router = new Restt({
		adapter: {
			registerRoute(data) {
				server.route({
					method: data.method as any,
					url: data.url,
					handler: async (req, res) => {
						const headers = new Headers(
							Object.fromEntries(
								Object.entries(req.headers) as [string, string][],
							),
						)
						const response = await data.handler({
							request: new Request(
								new URL(req.url, `http://localhost:${port}`),
								{
									method: req.method,
									headers,
									body: req.body as BodyInit,
								},
							),
							body: req.body,
							params: req.params,
							headers: req.headers,
							query: req.query,
						})

						res.status(response.status).send(response.rawBody)
					},
				})
			},
		},
	})
		.use(async () => ({ greeting: "Hello" }))
		.get({
			url: "/users/:id",
			params: z.object({ id: z.string().transform(Number) }),
			query: z.object({ username: z.string() }),
			response: {
				200: {
					body: z.string(),
				},
			},
			handler: ({ params: { id }, query: { username }, greeting }) =>
				new ResttResponse(
					`${greeting}, ${username}! Your id is: ${id}. It is a ${typeof id}`,
					{
						status: 200,
					},
				),
		})

	await server.listen({ host: "localhost", port })
	await server.ready()

	const c = createClient<typeof router.typedData>({
		url: `http://localhost:${port}`,
	})

	it("should query the server", async () => {
		expect(
			await c.users["1"]
				[request]({ query: { username: "root" } })
				.then((r) => r.text()),
		).toEqual("Hello, root! Your id is: 1. It is a number")
	})
})
