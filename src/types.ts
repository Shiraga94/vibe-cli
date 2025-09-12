import type { Chain } from 'viem';

type CompileContext = {
  args: string[];
};

type DeployContext = {
  chain: string;
  contracts: string[];
  args: any[];
};

type RunContext = {
  chain: string;
  script: string;
  args: any[];
};

type ForkContext = {
  chain: string;
  rpcUrl: string;
  pid: number;
};

export type Plugin = {
  name?: string;

  extendConfig?: (config: Config) => Partial<Config> | void;

  onCompile?: (ctx: CompileContext, config: Config) => Promise<void> | void;
  onBeforeCompile?: (ctx: CompileContext, config: Config) => Promise<boolean> | boolean;
  onDeploy?: (ctx: DeployContext, config: Config) => Promise<void> | void;
  onBeforeDeploy?: (ctx: DeployContext, config: Config) => Promise<boolean> | boolean;
  onRun?: (ctx: RunContext, config: Config) => Promise<void> | void;
  onBeforeRun?: (ctx: RunContext, config: Config) => Promise<boolean> | boolean;
  onFork?: (ctx: ForkContext, config: Config) => Promise<void> | void;
}

export type ExtendedChain = Chain & {
  fork?: {
    chainId?: number;
    port?: number;
    blockNumber?: number;
    blockTime?: number;
    onFork?: Array<SolRef | string>;
    onDeploy?: Array<SolRef | string>;
  }
  onDeploy?: Array<SolRef | string>;
}

export type SolRef = {
  name?: string;
  src: string;
  args?: {} | any[];
};

export interface Config {
  privateKey?: string;
  paths?: {
    src: string;
    out: string;
    scripts: string;
    deployed: string | string[];
  };
  chains?: { [key: string]: ExtendedChain }
  contracts?: { [key: string]: SolRef }
  scripts?: { [key: string]: SolRef }
  compile?: Array<SolRef | string>
  deploy?: { [key: string]: Array<SolRef | string> }
  fork?: {
    privateKey?: string;
    deploy?: { [key: string]: Array<SolRef | string> }
  }
  optimizer?: {
    enabled: boolean;
    runs: number;
  };
  verbosity?: number;
  via_ir?: boolean;
  plugins?: Plugin[];
}