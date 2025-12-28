import z from 'zod'

const rawEnv = import.meta.env

const envSchema = z
  .object({
    VITE_SOCKET_URL: z.url().nonempty().nonoptional()
  })
  .required()

export type Env = z.infer<typeof envSchema>

const parsedEnv = envSchema.safeParse(rawEnv)

if (!parsedEnv.success) {
  const cause = JSON.stringify(z.treeifyError(parsedEnv.error), null, 2)

  console.info('Environment Variables:', rawEnv)
  console.error('Invalid environment variables:', { cause })
  throw new Error('Invalid environment variables', { cause })
}

const env: Env = parsedEnv.data

export { env, envSchema }
