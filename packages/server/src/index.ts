import { AnyZodObject, z, ZodType, ZodTypeAny } from "zod"

/**
 * Loose HeadersInit so that it is not limited to string values.
 * @public
 */
export type ResttHeadersInit = Record<string, any>

/**
 * Loose BodyInit so that it is not limited to specific values.
 * @public
 */
export type ResttBodyInit = unknown

/**
 * Utility type to get either input or output data for a zod schema.
 * @public
 */
export type ZodRequestData<
	T extends ZodTypeAny,
	Is extends boolean,
> = Is extends true ? z.input<T> : z.output<T>

/**
 * Represents the type of a handler's data.
 * @public
 */
export type ResttHandlerData<
	RequestBody,
	BodyValidator,
	Params,
	Query,
	Headers,
	IsRequestData extends boolean = false,
> = {
	request: Request
	params: Params extends AnyZodObject
		? ZodRequestData<Params, IsRequestData>
		: unknown
	query: Query extends AnyZodObject
		? ZodRequestData<Query, IsRequestData>
		: unknown
	headers: Headers extends ZodType<ResttHeadersInit | undefined, any, any>
		? ZodRequestData<Headers, IsRequestData>
		: unknown
	body: BodyValidator extends ZodType<
		ResttBodyInit | undefined,
		any,
		RequestBody
	>
		? ZodRequestData<BodyValidator, IsRequestData>
		: unknown
}

/**
 * Represents the possible string values for {@link ResttRouteOptions.parseBody}.
 * @public
 */
export type ResttStringParseBody =
	| "json"
	| "text"
	| "blob"
	| "arrayBuffer"
	| "formData"

/**
 * Represents all possible values for {@link ResttRouteOptions.parseBody}.
 * @public
 */
export type ResttParseBody<
	HandlerData extends ResttHandlerData<any, any, any, any, any>,
	R = any,
> = ResttStringParseBody | ((data: Omit<HandlerData, "body">) => Awaitable<R>)

/**
 * Represents the options given to {@link IResttAdapter.registerRoute} and {@link ResttRouter.routeGenerator}'s register function.
 * @public
 */
export interface ResttRouteOptions<
	Url = string,
	Response = undefined,
	BodyValidator = undefined,
	Params = undefined,
	Query = undefined,
	Headers = undefined,
	Method = string,
	RequestBody = undefined,
	Handler = (
		data: ResttHandlerData<RequestBody, BodyValidator, Params, Query, Headers>,
	) => Awaitable<ResttResponse<number>>,
> {
	/**
	 * Represents the parameters sent in the url.
	 */
	params?: Params
	/**
	 * Represents the query parameters.
	 */
	query?: Query
	/**
	 * Represents the body (sent in, not sent out as response).
	 */
	body?: BodyValidator
	/**
	 * Represents responses for a status code.
	 */
	response?: Response
	/**
	 * Represents the headers sent by the api user.
	 */
	headers?: Headers
	/**
	 * Represents the endpoint this route corresponds to.
	 */
	url: Url
	/**
	 * Represents the method this endpoint corresponds to.
	 */
	method: Method
	/**
	 * Represents the handler for this endpoint.
	 */
	handler: Handler
	/**
	 * Represents the function that parses the body.
	 */
	parseBody?: RequestBody
}

/**
 * Represents a {@link Restt} framework adapter.
 * @public
 */
export interface IResttAdapter {
	/**
	 * This method should register a route to an HTTP framework.
	 */
	registerRoute: (data: ResttRouteOptions) => void
}

/**
 * A typed web Response class.
 * @public
 */
export class ResttResponse<
	const Status extends number,
	const Body extends BodyInit | undefined = undefined,
> extends Response {
	/**
	 * Represents the raw body of the response.
	 * @public
	 */
	public rawBody: Body | undefined = undefined

	constructor(body?: Body, init?: ResponseInit & { status: Status }) {
		super(body, init)
		this.rawBody = body
	}
}

/**
 * Represents a value that can either be a promise or not.
 * @public
 */
export type Awaitable<T> = T | Promise<T>

/**
 * Represents a Restt middleware.
 * @public
 * @remarks
 * If it returns a {@link ResttResponse} it's an error. If it returns nothing, it is ignored. But if it returns an object each of it's properties are passed to each request handler
 */
export type ResttMiddleware = (
	request: Request,
	err?: ResttResponse<number>,
) => Awaitable<void | object | ResttResponse<number>>

/**
 * Represents the type data for a {@link ResttRouter} instance.
 * @public
 */
export type ResttRouterData = {
	[key: string]: {
		request: {
			body: unknown
			headers: unknown
			params: unknown
			query: unknown
		}
		response: {
			[key: number]: {
				body: unknown
				headers: unknown
			}
		}
	}
}

/**
 * Represents the base of Restt.
 * @public
 */
export class ResttRouter<Adapter extends IResttAdapter = IResttAdapter> {
	/**
	 * Represents the route data for this router.
	 * @remarks
	 * This field does not exist in a router! It is only to access the typed data.
	 */
	declare typedData: {}
	/**
	 * Represents the additional arguments given by all middleware. DO NOT MODIFY MANUALLY.
	 * @remarks
	 * This field does not exist in a router! It is only to access the type data.
	 */
	declare middlewareArgs: {}
	/**
	 * Represents the middleware for this router.
	 * @internal
	 */
	protected _middleware: ResttMiddleware[] = []
	/**
	 * Represents the adapter for this router.
	 * @internal
	 */
	public _adapter: Adapter = undefined as never
	/**
	 * Represents the routes for this router.
	 * @internal
	 */
	private _routes: ResttRouteOptions[] = []

	/**
	 * Returns the user provided adapter. Errors if it is not set - which shouldn't happen unless you're using the {@link ResttRouter} manually.
	 */
	public get adapter() {
		if (!this._adapter)
			throw new Error(
				"@restt/server: Expected an adapter to be set. Unless you are calling a ResttRouter manually (don't), this is an internal issue.",
			)
		return this._adapter
	}

	/**
	 * Registers a middleware to the router.
	 * @param middleware - the middleware to add
	 * @returns this {@link ResttRouter} instance
	 */
	use<const Middleware extends ResttMiddleware>(
		middleware: Middleware,
	): this & {
		middlewareArgs: Exclude<
			Awaited<ReturnType<Middleware>>,
			void | ResttResponse<number>
		>
	} {
		this._middleware.push(middleware)
		return this as never
	}

	/**
	 * Runs the middleware for this router.
	 * @param request - the request to run the middleware for
	 * @param err - the error to run the middleware for
	 * @returns the result of the middleware
	 */
	private async _runMiddleware(
		request: Request,
		err?: ResttResponse<number>,
	): Promise<object | ResttResponse<number>> {
		let result: object | ResttResponse<number> = {}
		for (const middleware of this._middleware) {
			try {
				const middlewareResult = await middleware(request, err)
				if (middlewareResult instanceof ResttResponse) {
					result = middlewareResult
				} else if (middlewareResult) {
					result = { ...result, ...middlewareResult }
				}
			} catch (e) {
				if (e instanceof ResttResponse) {
					result = e
				} else {
					throw e
				}
			}
		}
		return result
	}

	/**
	 * Generates a function that registers a route to the router with a method
	 * @param method - the method to use for these routes
	 * @returns a function that registers a route to the router
	 * @remarks
	 * This should only be used when the router doesn't provide the method you use. For example `router.routeGenerator('GET')({})` should be `router.get({})`
	 */
	routeGenerator<const Method extends string>(method: Method) {
		return <
			const Url extends string,
			const Handler extends (
				data: ResttHandlerData<
					RequestBody,
					BodyValidator,
					Params,
					Query,
					Headers
				> &
					this["middlewareArgs"],
			) => Awaitable<
				Res extends undefined
					? ResttResponse<number>
					: {
							[K in keyof Res]: ResttResponse<
								K & number,
								Res[K & number] extends {
									body: infer B extends ZodType<BodyInit | undefined, any, any>
								}
									? z.input<B>
									: never
							>
					  }[keyof Res]
			>,
			const Res extends Record<
				number,
				{
					body?: ZodType<BodyInit | undefined, any, any>
					headers?: AnyZodObject
				}
			>,
			const BodyValidator extends
				| ZodType<ResttBodyInit | undefined, any, any>
				| undefined = undefined,
			const ParseBody extends
				| ResttParseBody<
						ResttHandlerData<any, BodyValidator, Params, Query, Headers>
				  >
				| undefined = undefined,
			const RequestBody = ParseBody extends ResttStringParseBody
				? Awaited<
						ReturnType<
							Body[ParseBody] extends (...args: any) => any
								? Body[ParseBody]
								: never
						>
				  >
				: Awaited<
						ReturnType<
							ParseBody extends (...args: any) => any ? ParseBody : never
						>
				  >,
			const Params extends AnyZodObject | undefined = undefined,
			const Query extends AnyZodObject | undefined = undefined,
			const Headers extends
				| ZodType<ResttHeadersInit | undefined, any, any>
				| undefined = undefined,
		>(
			options: Omit<
				ResttRouteOptions<
					Url,
					Res,
					BodyValidator,
					Params,
					Query,
					Headers,
					Method,
					ParseBody,
					Handler
				>,
				"method"
			>,
		): this & {
			typedData: {
				[key in Url]: {
					request: Omit<
						ResttHandlerData<
							RequestBody,
							BodyValidator,
							Params,
							Query,
							Headers,
							true
						>,
						"request"
					>
					response: {
						[key in keyof Res]: Res[key] extends {
							body?: infer V
							headers?: infer H
						}
							? {
									body: V extends ZodType<BodyInit, any, any>
										? z.output<V>
										: unknown
									headers: H extends ZodType<HeadersInit, any, any>
										? z.output<H>
										: unknown
							  }
							: never
					}
				}
			}
		} => {
			const d: ResttRouteOptions<
				Url,
				Res,
				BodyValidator,
				Params,
				Query,
				Headers,
				Method,
				ParseBody
			> = {
				...options,
				method,
				handler: async ({ request, params, query, headers }) => {
					const rest = await this._runMiddleware(request)
					if (rest instanceof ResttResponse) return rest as never
					const body = await (typeof options.parseBody === "string"
						? request[options.parseBody as ResttStringParseBody]()
						: options.parseBody?.({ request, params, query, headers }))
					const res = await options.handler({
						request,
						params: (options.params?.parse(params) as never) ?? params,
						query: (options.query?.parse(query) as never) ?? query,
						headers: (options.body?.parse(headers) as never) ?? headers,
						body: (options.body?.parse(body) as never) ?? body,
						...rest,
					})
					let _res = res as ResttResponse<number, any>
					if (res instanceof ResttResponse) {
						const resValidator = options.response?.[res.status]
						_res = new ResttResponse(
							resValidator?.body?.parse(res.rawBody) ??
								res.rawBody ??
								undefined,
							{
								status: res.status,
								headers:
									resValidator?.headers?.parse(res.headers) ?? res.headers,
							},
						)
					}
					return _res as never
				},
			}
			if (this._adapter) {
				this.adapter.registerRoute(d as never)
			} else {
				this._routes.push(d as never)
			}
			return this as never
		}
	}

	/**
	 * Registers routes previously added to this router if an adapter wasn't specified before with a prefix.
	 * @internal
	 */
	_apply(prefix = "") {
		prefix = prefix.endsWith("/") ? prefix.slice(0, -1) : prefix
		const routes = this._routes.map((route) => ({
			...route,
			url: `${prefix}${
				route.url.startsWith("/") ? route.url : `/${route.url}`
			}`,
		}))
		return routes.forEach(this.adapter.registerRoute)
	}

	/**
	 * Registers a route that responds to the GET method.
	 */
	get = this.routeGenerator("GET")
	/**
	 * Registers a route that responds to the POST method.
	 */
	post = this.routeGenerator("POST")
	/**
	 * Registers a route that responds to the PUT method.
	 */
	put = this.routeGenerator("PUT")
	/**
	 * Registers a route that responds to the PATCH method.
	 */
	patch = this.routeGenerator("PATCH")
	/**
	 * Registers a route that responds to the DELETE method.
	 */
	delete = this.routeGenerator("DELETE")
	/**
	 * Registers a route that responds to the HEAD method.
	 */
	head = this.routeGenerator("HEAD")
	/**
	 * Registers a route that responds to the OPTIONS method.
	 */
	options = this.routeGenerator("OPTIONS")
	/**
	 * Registers a route that responds to the CONNECT method.
	 */
	connect = this.routeGenerator("CONNECT")
	/**
	 * Registers a route that responds to the TRACE method.
	 */
	trace = this.routeGenerator("TRACE")
}

/**
 * Represents the basic building block for a Restt project.
 * @public
 */
export class Restt<Adapter extends IResttAdapter> extends ResttRouter<Adapter> {
	constructor({ adapter }: { adapter: Adapter }) {
		super()
		this._adapter = adapter
	}

	/**
	 * Applies a {@link ResttRouter} to this {@link Restt} instance.
	 * @param router - the router to apply
	 * @param prefix - a prefix to apply to all routes of this router, for example `/my-route` with prefix `/restt-best` would become `/restt-best/my-route`
	 * @returns this {@link Restt} instance
	 */
	router<
		const Router extends ResttRouter<Adapter>,
		const Prefix extends string = "",
	>(
		router: Router,
		prefix?: Prefix,
	): this & {
		typedData: {
			[key in Prefix]: Router["typedData"]
		}
	} {
		router._adapter = this.adapter
		router._apply(prefix)
		return this as never
	}
}
