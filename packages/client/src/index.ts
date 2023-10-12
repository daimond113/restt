import { ResttRouterData } from "@restt/server"
import type { PathsToObject, StringURLToArray } from "./types"

export const request = Symbol("restt.request")

export type RequestFn<
	Query extends Record<string, unknown> = Record<string, unknown>,
> = (info: RequestInit & { query: Query }) => Promise<Response>

const makeProxy = (obj: { url: string; path: string }): object =>
	new Proxy(obj, {
		get(target, key) {
			if (key === request) {
				const fn: RequestFn = ({ query, ...info }) => {
					const reqUrl = new URL(target.path, target.url)
					if (query)
						Object.keys(query).forEach((key) =>
							reqUrl.searchParams.append(key, String(query[key])),
						)
					return fetch(reqUrl.toString(), info)
				}
				return fn
			}
			return makeProxy({ ...target, path: `${target.path}/${key as string}` })
		},
	})

export function createClient<T extends ResttRouterData>({
	url,
}: {
	url: string
}): PathsToObject<StringURLToArray<keyof T>, T> {
	return makeProxy({
		url,
		path: "",
	}) as never
}
