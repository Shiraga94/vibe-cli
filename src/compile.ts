import { mergeConfig, optimizer, via_ir } from "./util";
import { execSync } from 'child_process'

const config = await mergeConfig()

export async function main() {
  try {
    const args = process.argv.slice(3);

    execSync(`forge build --sizes ${optimizer(config)} ${via_ir(config)} ${args.join(' ')}`, { stdio: 'inherit' });

    // if (!existsSync(config.paths.deployed as string)) {
    //   mkdirSync(`./${config.paths.deployed}`, { recursive: true })
    // }

    // config.compile?.forEach(c => {
    //   c.contracts.forEach(contract => {
    //     const path = `${config.paths.out}/${c.fileName}.sol/${contract}.json`
  
    //     if (!existsSync(path)) {
    //       console.error(`Contract ${contract} not found at ${path}`)
    //       process.exit(1)
    //     }
  
    //     if (existsSync(`${config.paths.deployed}/${contract}.json`)) {
    //       const destJson = JSON.parse(readFileSync(`${config.paths.deployed}/${contract}.json`, 'utf8'))
    //       const json = JSON.parse(readFileSync(path, 'utf8'))
    //       if (JSON.stringify(destJson.abi) === JSON.stringify(json.abi)) {
    //         console.log(`Skipping ${contract}`)
    //         return;
    //       }
    //     }
    //     console.log(`Copying ${contract} to ${config.paths.deployed}`)
    //     copyFileSync(path, `${config.paths.deployed}/${contract}.json`)
    //   })
    // })
  } catch (error) {
    console.error('Failed to build forge project: ', error);
    process.exit(1);
  }
}