import type { Chain } from 'viem';
import defaultConfig from './config'
import { spawn } from 'child_process';
import type { Config, ExtendedChain, Plugin } from './types';

export function defineConfig(config: Config): Config {
  return config;
}

export function definePlugin(plugin: Plugin): Plugin {
  return plugin;
}

export async function mergeConfig(): Promise<Config> {
  try {
    const userConfig = (await import(`file://${process.cwd()}/vibe.config`)).default
    let config = {
      privateKey: userConfig.privateKey ?? defaultConfig.privateKey,
      paths: {
        src: userConfig.paths?.src ?? defaultConfig.paths?.src,
        out: userConfig.paths?.out ?? defaultConfig.paths?.out,
        scripts: userConfig.paths?.scripts ?? defaultConfig.paths?.scripts,
        deployed: userConfig.paths?.deployed ?? defaultConfig.paths?.deployed
      },
      chains: {} as { [key: string]: Chain },
      contracts: userConfig.contracts ?? {},
      scripts: userConfig.scripts ?? {},
      compile: userConfig.compile ?? {},
      deploy: userConfig.deploy ?? {},
      fork: {
        privateKey: userConfig.fork?.privateKey ?? defaultConfig.fork?.privateKey,
        deploy: userConfig.fork?.deploy ?? {},
        run: userConfig.fork?.run ?? {}
      },
      optimizer: userConfig.optimizer ?? defaultConfig.optimizer,
      verbosity: userConfig.verbosity ?? defaultConfig.verbosity,
      via_ir: userConfig.via_ir ?? defaultConfig.via_ir
    }

    Object.keys(defaultConfig.chains ?? {}).forEach((c) => {
      if (userConfig.chains === undefined) userConfig.chains = {}
      let userChain = userConfig.chains != undefined && Object.keys(userConfig.chains).includes(c) ? userConfig.chains[c] : null
      let defaultChain = defaultConfig.chains ? defaultConfig.chains[c as keyof typeof defaultConfig.chains] as Chain : null
      if (userChain) userConfig.chains[c] = { ...defaultChain, ...userChain }
      else config.chains[c] = defaultChain as ExtendedChain
    })

    return config;

  } catch (e) {
    console.error(`Failed to load config: ${e}`)
    process.exit(1);
  }
}

export async function curl(chainKey: string, method: string, params: any[]) {
  return new Promise(async (resolve, reject) => {
    const config = await mergeConfig()
    const curl = spawn('curl', [
      '-H', 'Content-Type: application/json',
      '-d', `{"id":1, "jsonrpc":"2.0", "method":"${method}", "params":[${params}]}`,
      '--silent', '--write-out', 'Downloaded %{size_download} bytes in %{time_total} seconds\n',
      'http://localhost:' + (config.chains || {})[chainKey]?.fork?.port
    ])
    
    curl.stdout.on('data', (data) => {
      console.log(data.toString())
    })
    
    curl.stderr.on('data', (data) => {
      console.error(data.toString())
    })
    
    curl.on('close', (code) => {
      if (code === 0) {
        resolve(`Curl command executed successfully`);
      } else {
        reject(new Error(`Curl command failed with code ${code}`))
      }
    })
  }).catch((error) => {
    console.error(error.stack || error.message || error.toString());
    process.exit(1);
  });
}

export function optimizer(config: Config): string {
  let optimizer = ''
  if (config.optimizer?.enabled) {
    optimizer = '--optimize'
    if (config.optimizer.runs) {
      optimizer += ` --optimizer-runs ${config.optimizer.runs}`
    }
  }
  return optimizer
}

export function verbosity(config: Config): string {
  let verbosity = ''
  if (config.verbosity) {
    verbosity = '-'
    for (let i = 0; i < config.verbosity; i++) {
      verbosity += 'v'
    }
  }
  return verbosity
}

export function via_ir(config: Config): string {
  return config.via_ir ? '--via-ir' : ''
}