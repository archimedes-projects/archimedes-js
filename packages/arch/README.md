# `@archimedes/arch`

Different architectural pieces to use:

-   Use Cases
-   Commands
-   Runner
-   Links

## Usage

`npm i @archimedes/arch -SE`

_Note: If you want to use cache-link and your framework mangles the name of the classes (like Angular does) you should either disable that option or avoid using that link. For example, to disable that option in Angular when you build the application set `NG_BUILD_MANGLE=false`._

## Runner

The runner configures a [chain of responsibility](https://refactoring.guru/design-patterns/chain-of-responsibility) which allows a use case to be processed through links. In order to create the chain you have to do this as soon as possible in your app:

```ts
Runner.createChain([loggerLink, executorLink])
```

You can configure the chain however you can, even dynamically:

```ts
if (isProduction) {
    Runner.createChain([executorLink])
} else {
    Runner.createChain([executorLink, loggerLink])
}
```

_Note: The `executor-link` is always required, even if you use the `cache-link`._

## Links

## ExecutorLink

This link merely executes the use case. It is always needed if you want to execute the use cases.

## LoggerLink

This link logs information to the console about the execution of the use case, like parameters, result and name of the use case:

```text
BazQry
  Parameters: -
  Result:
      42
```

## NotificationLink

This link is meant to capture errors occurred when executing a use case. This link should be placed after `ExecutorLink`. When an error occurs it will notify the `NotificationCenter`. From the UI you can subscribe to the `NotificationCenter` in order to show the user an error message:

```ts
import { NotificationCenter } from './notification-center'
import { Observer } from './subscriber'

class ErrorAlerter implements Observer {
    update(publisher: NotificationCenter) {
        publisher.notifications.map(x => ({
            ...x,
            message: x.message ?? 'Error'
        }))
    }
}

new NotificationCenter().register(new ErrorAlerter())
```

### CacheLink

#### Cache eviction

You can automatically evict the cache of dependant use cases using the `EvictCache` decorator in conjunction with the `cache-link` link. If use case `a` depends on use case `b`, and use case `b` depends on use case `c` (`a` ➡ `b` ➡ `c`️) if we invalidate the cache of use case `a` we should evict the cache of use case `b` and `c` too. We should add this decorator to all use cases we want this handled.

```ts
@EvictCache
export class AQry extends Query {
    constructor(private readonly bQry: BQry) {
        super()
    }

    async internalExecute() {
        return this.bQry.execute()
    }
}
```

It's important to activate `emitDecoratorMetadata` to true in the `tsconfig.json` compiler's options. See the `examples` directory for more information.

#### Cache invalidations

If you want to set that certain commands or queries invalidate the cache of other commands and queries you can set the cache invalidations the `CacheInvalidations` class:

```ts
CacheInvalidations.set(FooCmd.name, [BarQry.name])
```

You can also use these invalidation policies:

-   ALL: The use case will invalidate all the cache of all the use cases
-   NO_CACHE: The use case will never be cached

```ts
CacheInvalidations.set(FooCmd.name, [InvalidationPolicy.ALL])
```
