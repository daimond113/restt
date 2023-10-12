import { ResttRouterData } from "@restt/server"
import type { RequestFn, request } from "./index"

export type Split<S extends string, D extends string> = string extends S
	? string[]
	: S extends ""
	? []
	: S extends `${infer T}${D}${infer U}`
	? [T, ...Split<U, D>]
	: [S]

export type Shift<T> = T extends [infer _A, ...infer B] ? B : never

export type UnionToIntersection<T> = (
	T extends any ? (x: T) => any : never
) extends (x: infer R) => any
	? R
	: never

type JoinArray<T extends string[]> = T extends []
	? `` | `/`
	: `/${T[0]}${JoinArray<Extract<Shift<T>, string[]>>}`

export type StringURLToArray<T> = ReplacePlaceholders<
	Extract<Shift<Split<Extract<T, string>, "/">>, string[]>
>

type RouterKeys<T> = {
	[K in keyof T & string as JoinArray<StringURLToArray<K>>]: T[K]
}

type Key<Target, Key, R> = Target[Key & keyof Target] & R

type SerializedRouter<T> = {
	[K in keyof T]: T[K] extends string
		? T[K]
		: T[K] extends number | bigint | boolean | null | undefined
		? T[K] | `${T[K]}`
		: string
}

export type PathToObject<
	T extends string[],
	Path extends string[],
	Router extends ResttRouterData,
> = T extends []
	? {
			[request]: RequestFn<
				SerializedRouter<
					Key<
						RouterKeys<Router>,
						JoinArray<Path>,
						ResttRouterData[string]
					>["request"]["query"]
				>
			>
	  }
	: { [K in T[0]]: PathsToObject<Extract<Shift<T>, string[]>, Router, Path> }

export type PathsToObject<
	T extends string[],
	Router extends ResttRouterData,
	Path extends string[] = T,
> = UnionToIntersection<PathToObject<T, Path, Router>>

export type ReplacePlaceholders<T extends string[]> = T extends [
	infer A,
	...infer B,
]
	? [
			A extends `:${infer _U}` ? string : A,
			...ReplacePlaceholders<Extract<B, string[]>>,
	  ]
	: []

export type DefaultNullable<T, R = NonNullable<T>> = T extends null | undefined
	? R
	: T
