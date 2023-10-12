<p align="center">
    <img src="./assets/logo.svg" alt="RESTT" width="300">
</p>

# Restt

Restt is a strictly typed HTTP server wrapper, intended to be used with [TypeScript](https://www.typescriptlang.org/).
It provides a simple, yet powerful, interface for defining HTTP endpoints and handling requests. It also provides a built-in router, which can be used to define routes for your endpoints.

Restt is library-agnostic, meaning it does not depend on any specific HTTP server library. Instead, it uses an adapter pattern to allow you to use any HTTP server library you want.

## Installation

```bash
npm install @restt/server
```

## Usage

```typescript
import { Restt, ResttRouter } from "@restt/server"
import { z } from "zod"

const server = new Restt({
	adapter: {
		/* ... */
	},
})
	.use(async () => ({ hint: "Go to /api/info" }))
	.get({
		url: "/help",
		response: {
			200: {
				body: z.string(),
			},
		},
		handler: ({ hint }) => {
			return new ResttResponse(hint, { status: 200 })
		},
	})
	.router(
		new ResttRouter().get({
			url: "/info",
			response: {
				200: {
					body: z.string(),
				},
			},
			query: {
				username: z.string(),
			}
			handler: ({ query: { username } }) => {
				return new ResttResponse(`Hello, ${username}!`, { status: 200 })
			},
		}),
		"/api/",
	)
```
