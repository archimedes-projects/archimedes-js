import { CacheInvalidations, Command, InvalidationPolicy, Query } from '@archimedes/arch'
import { Class } from '@archimedes/utils'

const LOG_MESSAGES = {
  CMD_MISSING_DECORATOR: (cmdName: string) =>
    `Please apply the @InvalidateQueriesCache decorator on [ ${cmdName} ] command`,
  CMD_ONLY: (qryName: string) =>
    `[ ${qryName} ] is not a command, only apply the @InvalidateQueriesCache decorator to commands`,
  MISSING_CACHE_KEY_DECORATOR: (useCaseName: string) =>
    `You forgot to apply the @CacheKey decorator on [ ${useCaseName} ] or is not under @InvalidateQueriesCache decorator`
}

/**
 * Decorator to invalidate queries cache when a command is executed.
 * Must be used with the @CacheKey decorator and QueryCacheLink.
 * It will get the queries within the constructor of the command and the queries passed in the decorator param and
 * then for each query will search recursively for any nested queries and invalidate them.
 * @example CmdA invalidates QryA, QryB and QryC
 * ```ts
 * @InvalidateQueriesCache(QryC)
 * @CacheKey('CmdA')
 * class CmdA extends Command {
 *   constructor(private qryA: QryA) {}
 * }
 *
 * @CacheKey('QryA')
 * class QryA extends Query {
 *  constructor(private qryB: QryB) {}
 * }
 *
 * @CacheKey('QryB')
 * class QryB extends Query {
 *  constructor() {}
 * }
 *
 * @CacheKey('QryC')
 * class QryC extends Query {
 *  constructor() {}
 * }
 * ```
 * @param {any[] | InvalidationPolicy} otherQueriesOrInvalidationPolicy: Other queries that need to be invalidated when the command runs or the invalidation policy
 * */
export function InvalidateQueriesCache(otherQueriesOrInvalidationPolicy: any[] | InvalidationPolicy = []) {
  return (command: Class & { cacheKey?: string }) => {
    const isCommand = command.prototype instanceof Command

    if (isCommand) {
      if (command.prototype.cacheKey === undefined) {
        console.warn(LOG_MESSAGES.MISSING_CACHE_KEY_DECORATOR(command.name))
      }

      if (otherQueriesOrInvalidationPolicy === InvalidationPolicy.ALL) {
        CacheInvalidations.set(command.prototype.cacheKey, [InvalidationPolicy.ALL])
      } else {
        const queriesInCommand = getQueriesInCommand(command)
        const queriesToInvalidate = getQueriesToInvalidate([
          ...queriesInCommand,
          ...(otherQueriesOrInvalidationPolicy as any[])
        ])
        CacheInvalidations.set(command.prototype.cacheKey, queriesToInvalidate)
      }
    } else {
      console.warn(LOG_MESSAGES.CMD_ONLY(command.name))
    }
  }
}

function getQueriesInCommand(command: Class) {
  const queriesInCommand: Class[] | undefined = Reflect.getMetadata('design:paramtypes', command)
  if (queriesInCommand === undefined) {
    console.warn(LOG_MESSAGES.CMD_MISSING_DECORATOR(command.name))
    return []
  } else {
    return queriesInCommand.filter((x: any) => x.prototype instanceof Query)
  }
}

export function getQueriesToInvalidate(queries: any[]): string[] {
  const queriesToInvalidate = new Set<string>()

  function doGetQueries(queries: any[]) {
    queries.forEach(query => {
      const metadata: Class[] | undefined = Reflect.getMetadata('design:paramtypes', query)

      if (metadata === undefined || query.prototype.cacheKey === undefined) {
        // Decorator is missing
        console.warn(LOG_MESSAGES.MISSING_CACHE_KEY_DECORATOR(query.name))
      } else {
        // Add cache key to invalidations
        queriesToInvalidate.add(query.prototype.cacheKey)

        // Search for nested queries
        const queriesInQuery = metadata.filter(clazz => clazz.prototype instanceof Query)
        const atLeastOneQueryNotInvalidated = queriesInQuery.some(
          query => !queriesToInvalidate.has(query.prototype.cacheKey)
        )
        if (atLeastOneQueryNotInvalidated) {
          doGetQueries(queriesInQuery)
        }
      }
    })
  }

  doGetQueries(queries)

  return Array.from(queriesToInvalidate)
}
