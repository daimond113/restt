## API Report File for "@restt/server"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { AnyZodObject } from 'zod';
import { z } from 'zod';
import { ZodType } from 'zod';
import { ZodTypeAny } from 'zod';

// @public
export type Awaitable<T> = T | Promise<T>;

// @public
export interface IResttAdapter {
    registerRoute: (data: ResttRouteOptions) => void;
}

// @public
export class Restt<Adapter extends IResttAdapter> extends ResttRouter<Adapter> {
    constructor({ adapter }: {
        adapter: Adapter;
    });
    router<const Router extends ResttRouter<Adapter>, const Prefix extends string = "">(router: Router, prefix?: Prefix): this & {
        typedData: {
            [key in Prefix]: Router["typedData"];
        };
    };
}

// @public
export type ResttBodyInit = unknown;

// @public
export type ResttHandlerData<RequestBody, BodyValidator, Params, Query, Headers, IsRequestData extends boolean = false> = {
    request: Request;
    params: Params extends AnyZodObject ? ZodRequestData<Params, IsRequestData> : unknown;
    query: Query extends AnyZodObject ? ZodRequestData<Query, IsRequestData> : unknown;
    headers: Headers extends ZodType<ResttHeadersInit | undefined, any, any> ? ZodRequestData<Headers, IsRequestData> : unknown;
    body: BodyValidator extends ZodType<ResttBodyInit | undefined, any, RequestBody> ? ZodRequestData<BodyValidator, IsRequestData> : unknown;
};

// @public
export type ResttHeadersInit = Record<string, any>;

// @public
export type ResttMiddleware = (request: Request, err?: ResttResponse<number>) => Awaitable<void | object | ResttResponse<number>>;

// @public
export type ResttParseBody<HandlerData extends ResttHandlerData<any, any, any, any, any>, R = any> = ResttStringParseBody | ((data: Omit<HandlerData, "body">) => Awaitable<R>);

// @public
export class ResttResponse<const Status extends number, const Body extends BodyInit | undefined = undefined> extends Response {
    constructor(body?: Body, init?: ResponseInit & {
        status: Status;
    });
    rawBody: Body | undefined;
}

// @public
export interface ResttRouteOptions<Url = string, Response = undefined, BodyValidator = undefined, Params = undefined, Query = undefined, Headers = undefined, Method = string, RequestBody = undefined, Handler = (data: ResttHandlerData<RequestBody, BodyValidator, Params, Query, Headers>) => Awaitable<ResttResponse<number>>> {
    body?: BodyValidator;
    handler: Handler;
    headers?: Headers;
    method: Method;
    params?: Params;
    parseBody?: RequestBody;
    query?: Query;
    response?: Response;
    url: Url;
}

// @public
export class ResttRouter<Adapter extends IResttAdapter = IResttAdapter> {
    get adapter(): Adapter;
    // @internal
    _adapter: Adapter;
    // @internal
    _apply(prefix?: string): void;
    connect: <const Url extends string, const Handler extends (data: ResttHandlerData<RequestBody, BodyValidator, Params, Query, Headers_1, false> & this["middlewareArgs"]) => Awaitable<Res extends undefined ? ResttResponse<number, undefined> : { [K in keyof Res]: ResttResponse<K & number, Res[K & number] extends {
            body: infer B extends z.ZodType<BodyInit | undefined, any, any>;
        } ? z.input<B> : never>; }[keyof Res]>, const Res extends Record<number, {
        body?: z.ZodType<BodyInit | undefined, any, any> | undefined;
        headers?: AnyZodObject | undefined;
    }>, const BodyValidator extends z.ZodType<unknown, any, any> | undefined = undefined, const ParseBody extends ResttParseBody<ResttHandlerData<any, BodyValidator, Params, Query, Headers_1, false>, any> | undefined = undefined, const RequestBody = ParseBody extends ResttStringParseBody ? Awaited<ReturnType<Body[ParseBody] extends (...args: any) => any ? Body[ParseBody] : never>> : Awaited<ReturnType<ParseBody extends (...args: any) => any ? ParseBody : never>>, const Params extends AnyZodObject | undefined = undefined, const Query extends AnyZodObject | undefined = undefined, const Headers_1 extends z.ZodType<ResttHeadersInit | undefined, any, any> | undefined = undefined>(options: Omit<ResttRouteOptions<Url, Res, BodyValidator, Params, Query, Headers_1, "CONNECT", ParseBody, Handler>, "method">) => this & {
        typedData: { [key in Url]: {
                request: Omit<ResttHandlerData<RequestBody, BodyValidator, Params, Query, Headers_1, true>, "request">;
                response: { [key_1 in keyof Res]: Res[key_1] extends {
                        body?: infer V | undefined;
                        headers?: infer H | undefined;
                    } ? {
                        body: V extends z.ZodType<BodyInit, any, any> ? z.output<V> : unknown;
                        headers: H extends z.ZodType<HeadersInit, any, any> ? z.output<H> : unknown;
                    } : never; };
            }; };
    };
    delete: <const Url extends string, const Handler extends (data: ResttHandlerData<RequestBody, BodyValidator, Params, Query, Headers_1, false> & this["middlewareArgs"]) => Awaitable<Res extends undefined ? ResttResponse<number, undefined> : { [K in keyof Res]: ResttResponse<K & number, Res[K & number] extends {
            body: infer B extends z.ZodType<BodyInit | undefined, any, any>;
        } ? z.input<B> : never>; }[keyof Res]>, const Res extends Record<number, {
        body?: z.ZodType<BodyInit | undefined, any, any> | undefined;
        headers?: AnyZodObject | undefined;
    }>, const BodyValidator extends z.ZodType<unknown, any, any> | undefined = undefined, const ParseBody extends ResttParseBody<ResttHandlerData<any, BodyValidator, Params, Query, Headers_1, false>, any> | undefined = undefined, const RequestBody = ParseBody extends ResttStringParseBody ? Awaited<ReturnType<Body[ParseBody] extends (...args: any) => any ? Body[ParseBody] : never>> : Awaited<ReturnType<ParseBody extends (...args: any) => any ? ParseBody : never>>, const Params extends AnyZodObject | undefined = undefined, const Query extends AnyZodObject | undefined = undefined, const Headers_1 extends z.ZodType<ResttHeadersInit | undefined, any, any> | undefined = undefined>(options: Omit<ResttRouteOptions<Url, Res, BodyValidator, Params, Query, Headers_1, "DELETE", ParseBody, Handler>, "method">) => this & {
        typedData: { [key in Url]: {
                request: Omit<ResttHandlerData<RequestBody, BodyValidator, Params, Query, Headers_1, true>, "request">;
                response: { [key_1 in keyof Res]: Res[key_1] extends {
                        body?: infer V | undefined;
                        headers?: infer H | undefined;
                    } ? {
                        body: V extends z.ZodType<BodyInit, any, any> ? z.output<V> : unknown;
                        headers: H extends z.ZodType<HeadersInit, any, any> ? z.output<H> : unknown;
                    } : never; };
            }; };
    };
    get: <const Url extends string, const Handler extends (data: ResttHandlerData<RequestBody, BodyValidator, Params, Query, Headers_1, false> & this["middlewareArgs"]) => Awaitable<Res extends undefined ? ResttResponse<number, undefined> : { [K in keyof Res]: ResttResponse<K & number, Res[K & number] extends {
            body: infer B extends z.ZodType<BodyInit | undefined, any, any>;
        } ? z.input<B> : never>; }[keyof Res]>, const Res extends Record<number, {
        body?: z.ZodType<BodyInit | undefined, any, any> | undefined;
        headers?: AnyZodObject | undefined;
    }>, const BodyValidator extends z.ZodType<unknown, any, any> | undefined = undefined, const ParseBody extends ResttParseBody<ResttHandlerData<any, BodyValidator, Params, Query, Headers_1, false>, any> | undefined = undefined, const RequestBody = ParseBody extends ResttStringParseBody ? Awaited<ReturnType<Body[ParseBody] extends (...args: any) => any ? Body[ParseBody] : never>> : Awaited<ReturnType<ParseBody extends (...args: any) => any ? ParseBody : never>>, const Params extends AnyZodObject | undefined = undefined, const Query extends AnyZodObject | undefined = undefined, const Headers_1 extends z.ZodType<ResttHeadersInit | undefined, any, any> | undefined = undefined>(options: Omit<ResttRouteOptions<Url, Res, BodyValidator, Params, Query, Headers_1, "GET", ParseBody, Handler>, "method">) => this & {
        typedData: { [key in Url]: {
                request: Omit<ResttHandlerData<RequestBody, BodyValidator, Params, Query, Headers_1, true>, "request">;
                response: { [key_1 in keyof Res]: Res[key_1] extends {
                        body?: infer V | undefined;
                        headers?: infer H | undefined;
                    } ? {
                        body: V extends z.ZodType<BodyInit, any, any> ? z.output<V> : unknown;
                        headers: H extends z.ZodType<HeadersInit, any, any> ? z.output<H> : unknown;
                    } : never; };
            }; };
    };
    head: <const Url extends string, const Handler extends (data: ResttHandlerData<RequestBody, BodyValidator, Params, Query, Headers_1, false> & this["middlewareArgs"]) => Awaitable<Res extends undefined ? ResttResponse<number, undefined> : { [K in keyof Res]: ResttResponse<K & number, Res[K & number] extends {
            body: infer B extends z.ZodType<BodyInit | undefined, any, any>;
        } ? z.input<B> : never>; }[keyof Res]>, const Res extends Record<number, {
        body?: z.ZodType<BodyInit | undefined, any, any> | undefined;
        headers?: AnyZodObject | undefined;
    }>, const BodyValidator extends z.ZodType<unknown, any, any> | undefined = undefined, const ParseBody extends ResttParseBody<ResttHandlerData<any, BodyValidator, Params, Query, Headers_1, false>, any> | undefined = undefined, const RequestBody = ParseBody extends ResttStringParseBody ? Awaited<ReturnType<Body[ParseBody] extends (...args: any) => any ? Body[ParseBody] : never>> : Awaited<ReturnType<ParseBody extends (...args: any) => any ? ParseBody : never>>, const Params extends AnyZodObject | undefined = undefined, const Query extends AnyZodObject | undefined = undefined, const Headers_1 extends z.ZodType<ResttHeadersInit | undefined, any, any> | undefined = undefined>(options: Omit<ResttRouteOptions<Url, Res, BodyValidator, Params, Query, Headers_1, "HEAD", ParseBody, Handler>, "method">) => this & {
        typedData: { [key in Url]: {
                request: Omit<ResttHandlerData<RequestBody, BodyValidator, Params, Query, Headers_1, true>, "request">;
                response: { [key_1 in keyof Res]: Res[key_1] extends {
                        body?: infer V | undefined;
                        headers?: infer H | undefined;
                    } ? {
                        body: V extends z.ZodType<BodyInit, any, any> ? z.output<V> : unknown;
                        headers: H extends z.ZodType<HeadersInit, any, any> ? z.output<H> : unknown;
                    } : never; };
            }; };
    };
    // @internal
    protected _middleware: ResttMiddleware[];
    middlewareArgs: {};
    options: <const Url extends string, const Handler extends (data: ResttHandlerData<RequestBody, BodyValidator, Params, Query, Headers_1, false> & this["middlewareArgs"]) => Awaitable<Res extends undefined ? ResttResponse<number, undefined> : { [K in keyof Res]: ResttResponse<K & number, Res[K & number] extends {
            body: infer B extends z.ZodType<BodyInit | undefined, any, any>;
        } ? z.input<B> : never>; }[keyof Res]>, const Res extends Record<number, {
        body?: z.ZodType<BodyInit | undefined, any, any> | undefined;
        headers?: AnyZodObject | undefined;
    }>, const BodyValidator extends z.ZodType<unknown, any, any> | undefined = undefined, const ParseBody extends ResttParseBody<ResttHandlerData<any, BodyValidator, Params, Query, Headers_1, false>, any> | undefined = undefined, const RequestBody = ParseBody extends ResttStringParseBody ? Awaited<ReturnType<Body[ParseBody] extends (...args: any) => any ? Body[ParseBody] : never>> : Awaited<ReturnType<ParseBody extends (...args: any) => any ? ParseBody : never>>, const Params extends AnyZodObject | undefined = undefined, const Query extends AnyZodObject | undefined = undefined, const Headers_1 extends z.ZodType<ResttHeadersInit | undefined, any, any> | undefined = undefined>(options: Omit<ResttRouteOptions<Url, Res, BodyValidator, Params, Query, Headers_1, "OPTIONS", ParseBody, Handler>, "method">) => this & {
        typedData: { [key in Url]: {
                request: Omit<ResttHandlerData<RequestBody, BodyValidator, Params, Query, Headers_1, true>, "request">;
                response: { [key_1 in keyof Res]: Res[key_1] extends {
                        body?: infer V | undefined;
                        headers?: infer H | undefined;
                    } ? {
                        body: V extends z.ZodType<BodyInit, any, any> ? z.output<V> : unknown;
                        headers: H extends z.ZodType<HeadersInit, any, any> ? z.output<H> : unknown;
                    } : never; };
            }; };
    };
    patch: <const Url extends string, const Handler extends (data: ResttHandlerData<RequestBody, BodyValidator, Params, Query, Headers_1, false> & this["middlewareArgs"]) => Awaitable<Res extends undefined ? ResttResponse<number, undefined> : { [K in keyof Res]: ResttResponse<K & number, Res[K & number] extends {
            body: infer B extends z.ZodType<BodyInit | undefined, any, any>;
        } ? z.input<B> : never>; }[keyof Res]>, const Res extends Record<number, {
        body?: z.ZodType<BodyInit | undefined, any, any> | undefined;
        headers?: AnyZodObject | undefined;
    }>, const BodyValidator extends z.ZodType<unknown, any, any> | undefined = undefined, const ParseBody extends ResttParseBody<ResttHandlerData<any, BodyValidator, Params, Query, Headers_1, false>, any> | undefined = undefined, const RequestBody = ParseBody extends ResttStringParseBody ? Awaited<ReturnType<Body[ParseBody] extends (...args: any) => any ? Body[ParseBody] : never>> : Awaited<ReturnType<ParseBody extends (...args: any) => any ? ParseBody : never>>, const Params extends AnyZodObject | undefined = undefined, const Query extends AnyZodObject | undefined = undefined, const Headers_1 extends z.ZodType<ResttHeadersInit | undefined, any, any> | undefined = undefined>(options: Omit<ResttRouteOptions<Url, Res, BodyValidator, Params, Query, Headers_1, "PATCH", ParseBody, Handler>, "method">) => this & {
        typedData: { [key in Url]: {
                request: Omit<ResttHandlerData<RequestBody, BodyValidator, Params, Query, Headers_1, true>, "request">;
                response: { [key_1 in keyof Res]: Res[key_1] extends {
                        body?: infer V | undefined;
                        headers?: infer H | undefined;
                    } ? {
                        body: V extends z.ZodType<BodyInit, any, any> ? z.output<V> : unknown;
                        headers: H extends z.ZodType<HeadersInit, any, any> ? z.output<H> : unknown;
                    } : never; };
            }; };
    };
    post: <const Url extends string, const Handler extends (data: ResttHandlerData<RequestBody, BodyValidator, Params, Query, Headers_1, false> & this["middlewareArgs"]) => Awaitable<Res extends undefined ? ResttResponse<number, undefined> : { [K in keyof Res]: ResttResponse<K & number, Res[K & number] extends {
            body: infer B extends z.ZodType<BodyInit | undefined, any, any>;
        } ? z.input<B> : never>; }[keyof Res]>, const Res extends Record<number, {
        body?: z.ZodType<BodyInit | undefined, any, any> | undefined;
        headers?: AnyZodObject | undefined;
    }>, const BodyValidator extends z.ZodType<unknown, any, any> | undefined = undefined, const ParseBody extends ResttParseBody<ResttHandlerData<any, BodyValidator, Params, Query, Headers_1, false>, any> | undefined = undefined, const RequestBody = ParseBody extends ResttStringParseBody ? Awaited<ReturnType<Body[ParseBody] extends (...args: any) => any ? Body[ParseBody] : never>> : Awaited<ReturnType<ParseBody extends (...args: any) => any ? ParseBody : never>>, const Params extends AnyZodObject | undefined = undefined, const Query extends AnyZodObject | undefined = undefined, const Headers_1 extends z.ZodType<ResttHeadersInit | undefined, any, any> | undefined = undefined>(options: Omit<ResttRouteOptions<Url, Res, BodyValidator, Params, Query, Headers_1, "POST", ParseBody, Handler>, "method">) => this & {
        typedData: { [key in Url]: {
                request: Omit<ResttHandlerData<RequestBody, BodyValidator, Params, Query, Headers_1, true>, "request">;
                response: { [key_1 in keyof Res]: Res[key_1] extends {
                        body?: infer V | undefined;
                        headers?: infer H | undefined;
                    } ? {
                        body: V extends z.ZodType<BodyInit, any, any> ? z.output<V> : unknown;
                        headers: H extends z.ZodType<HeadersInit, any, any> ? z.output<H> : unknown;
                    } : never; };
            }; };
    };
    put: <const Url extends string, const Handler extends (data: ResttHandlerData<RequestBody, BodyValidator, Params, Query, Headers_1, false> & this["middlewareArgs"]) => Awaitable<Res extends undefined ? ResttResponse<number, undefined> : { [K in keyof Res]: ResttResponse<K & number, Res[K & number] extends {
            body: infer B extends z.ZodType<BodyInit | undefined, any, any>;
        } ? z.input<B> : never>; }[keyof Res]>, const Res extends Record<number, {
        body?: z.ZodType<BodyInit | undefined, any, any> | undefined;
        headers?: AnyZodObject | undefined;
    }>, const BodyValidator extends z.ZodType<unknown, any, any> | undefined = undefined, const ParseBody extends ResttParseBody<ResttHandlerData<any, BodyValidator, Params, Query, Headers_1, false>, any> | undefined = undefined, const RequestBody = ParseBody extends ResttStringParseBody ? Awaited<ReturnType<Body[ParseBody] extends (...args: any) => any ? Body[ParseBody] : never>> : Awaited<ReturnType<ParseBody extends (...args: any) => any ? ParseBody : never>>, const Params extends AnyZodObject | undefined = undefined, const Query extends AnyZodObject | undefined = undefined, const Headers_1 extends z.ZodType<ResttHeadersInit | undefined, any, any> | undefined = undefined>(options: Omit<ResttRouteOptions<Url, Res, BodyValidator, Params, Query, Headers_1, "PUT", ParseBody, Handler>, "method">) => this & {
        typedData: { [key in Url]: {
                request: Omit<ResttHandlerData<RequestBody, BodyValidator, Params, Query, Headers_1, true>, "request">;
                response: { [key_1 in keyof Res]: Res[key_1] extends {
                        body?: infer V | undefined;
                        headers?: infer H | undefined;
                    } ? {
                        body: V extends z.ZodType<BodyInit, any, any> ? z.output<V> : unknown;
                        headers: H extends z.ZodType<HeadersInit, any, any> ? z.output<H> : unknown;
                    } : never; };
            }; };
    };
    routeGenerator<const Method extends string>(method: Method): <const Url extends string, const Handler extends (data: ResttHandlerData<RequestBody, BodyValidator, Params, Query, Headers_1, false> & this["middlewareArgs"]) => Awaitable<Res extends undefined ? ResttResponse<number, undefined> : { [K in keyof Res]: ResttResponse<K & number, Res[K & number] extends {
            body: infer B extends z.ZodType<BodyInit | undefined, any, any>;
        } ? z.input<B> : never>; }[keyof Res]>, const Res extends Record<number, {
        body?: z.ZodType<BodyInit | undefined, any, any> | undefined;
        headers?: AnyZodObject | undefined;
    }>, const BodyValidator extends z.ZodType<unknown, any, any> | undefined = undefined, const ParseBody extends ResttParseBody<ResttHandlerData<any, BodyValidator, Params, Query, Headers_1, false>, any> | undefined = undefined, const RequestBody = ParseBody extends ResttStringParseBody ? Awaited<ReturnType<Body[ParseBody] extends (...args: any) => any ? Body[ParseBody] : never>> : Awaited<ReturnType<ParseBody extends (...args: any) => any ? ParseBody : never>>, const Params extends AnyZodObject | undefined = undefined, const Query extends AnyZodObject | undefined = undefined, const Headers_1 extends z.ZodType<ResttHeadersInit | undefined, any, any> | undefined = undefined>(options: Omit<ResttRouteOptions<Url, Res, BodyValidator, Params, Query, Headers_1, Method, ParseBody, Handler>, "method">) => this & {
        typedData: { [key in Url]: {
                request: Omit<ResttHandlerData<RequestBody, BodyValidator, Params, Query, Headers_1, true>, "request">;
                response: { [key_1 in keyof Res]: Res[key_1] extends {
                        body?: infer V | undefined;
                        headers?: infer H | undefined;
                    } ? {
                        body: V extends z.ZodType<BodyInit, any, any> ? z.output<V> : unknown;
                        headers: H extends z.ZodType<HeadersInit, any, any> ? z.output<H> : unknown;
                    } : never; };
            }; };
    };
    trace: <const Url extends string, const Handler extends (data: ResttHandlerData<RequestBody, BodyValidator, Params, Query, Headers_1, false> & this["middlewareArgs"]) => Awaitable<Res extends undefined ? ResttResponse<number, undefined> : { [K in keyof Res]: ResttResponse<K & number, Res[K & number] extends {
            body: infer B extends z.ZodType<BodyInit | undefined, any, any>;
        } ? z.input<B> : never>; }[keyof Res]>, const Res extends Record<number, {
        body?: z.ZodType<BodyInit | undefined, any, any> | undefined;
        headers?: AnyZodObject | undefined;
    }>, const BodyValidator extends z.ZodType<unknown, any, any> | undefined = undefined, const ParseBody extends ResttParseBody<ResttHandlerData<any, BodyValidator, Params, Query, Headers_1, false>, any> | undefined = undefined, const RequestBody = ParseBody extends ResttStringParseBody ? Awaited<ReturnType<Body[ParseBody] extends (...args: any) => any ? Body[ParseBody] : never>> : Awaited<ReturnType<ParseBody extends (...args: any) => any ? ParseBody : never>>, const Params extends AnyZodObject | undefined = undefined, const Query extends AnyZodObject | undefined = undefined, const Headers_1 extends z.ZodType<ResttHeadersInit | undefined, any, any> | undefined = undefined>(options: Omit<ResttRouteOptions<Url, Res, BodyValidator, Params, Query, Headers_1, "TRACE", ParseBody, Handler>, "method">) => this & {
        typedData: { [key in Url]: {
                request: Omit<ResttHandlerData<RequestBody, BodyValidator, Params, Query, Headers_1, true>, "request">;
                response: { [key_1 in keyof Res]: Res[key_1] extends {
                        body?: infer V | undefined;
                        headers?: infer H | undefined;
                    } ? {
                        body: V extends z.ZodType<BodyInit, any, any> ? z.output<V> : unknown;
                        headers: H extends z.ZodType<HeadersInit, any, any> ? z.output<H> : unknown;
                    } : never; };
            }; };
    };
    typedData: {};
    use<const Middleware extends ResttMiddleware>(middleware: Middleware): this & {
        middlewareArgs: Exclude<Awaited<ReturnType<Middleware>>, void | ResttResponse<number>>;
    };
}

// @public
export type ResttRouterData = {
    [key: string]: {
        request: {
            body: unknown;
            headers: unknown;
            params: unknown;
            query: unknown;
        };
        response: {
            [key: number]: {
                body: unknown;
                headers: unknown;
            };
        };
    };
};

// @public
export type ResttStringParseBody = "json" | "text" | "blob" | "arrayBuffer" | "formData";

// @public
export type ZodRequestData<T extends ZodTypeAny, Is extends boolean> = Is extends true ? z.input<T> : z.output<T>;

// (No @packageDocumentation comment for this package)

```