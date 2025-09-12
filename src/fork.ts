import { spawn } from 'child_process';

export type Fork = {
  chain: string;
  port: number;
  rpcUrl: string;
  pid: number;
  blockNumber?: number;
  startedAt?: Date;
  kill: () => Promise<void>;
  reset: (blockNumber?: number) => Promise<void>;
}

export type ForkProxy = {
  port: number;
  fork: Fork;
}

const networkName = process.argv[3]

export async function main() {
  // Check if the network name is provided
  if (!networkName) {
    console.error('Please provide a network name to fork.');
    process.exit(1);
  }

  // Check if a fork is already running for the given network
  // start fork
  // start a proxy to the fork
}

const startFork = () => {

}

const killFork = () => {

}

function startProxy({ proxyPort, targetPort }: { proxyPort: number, targetPort: number })  {

}