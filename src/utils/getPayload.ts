import { Payload } from 'payload'

export const getPayload = async (): Promise<Payload> => {
  const payload = (await import('payload')).default

  if (!((payload as any).collections && Object.keys((payload as any).collections).length)) {
    try {
      const config = (await import('@payload-config')).default
      if (process.env.NODE_ENV === 'development') console.log('Initializing Payload with local config (server-side)')
      await (payload as any).init({ config })
    } catch (initErr) {
      if (process.env.NODE_ENV === 'development') console.warn('Payload init skipped or failed:', initErr)
    }
  }

  return payload as unknown as Payload
}
