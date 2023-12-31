/// <reference types="vitest" />
import { z } from "zod"
import { Restt, ResttResponse, ResttRouteOptions } from "../src/index"
import { describe, beforeEach, it, expect, vi } from "vitest"

describe("Restt", () => {
	let routeData: ResttRouteOptions<any, any, any, any, any, any, any>[] = []
	const restt = new Restt({
		adapter: {
			registerRoute(data) {
				routeData.push(data)
				data.handler({
					request: new Request(new URL("http://localhost")),
					body: {},
					params: {},
					headers: {},
					query: {},
				})
			},
		},
	})

	beforeEach(() => {
		routeData = []
	})

	it("should respond with the correct response", async () => {
		restt.get({
			url: "/api-test",
			handler: vi.fn(),
		})

		expect(routeData).toStrictEqual([
			{
				url: "/api-test",
				handler: expect.any(Function),
				method: "GET",
			},
		])
	})

	it("should pass in custom middleware objects", async () => {
		restt
			.use(async () => ({ customProp: "customValue" }))
			.get({
				url: "/api-test",
				response: {
					200: {
						body: z.string(),
					},
				},
				handler: ({ customProp }) => {
					expect(customProp).toEqual("customValue")
					return new ResttResponse(customProp, { status: 200 })
				},
			})
	})
})
