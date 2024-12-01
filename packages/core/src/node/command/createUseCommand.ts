import {CAC} from 'cac'

import { consoleUtil } from '../utils/index.js'
import { getReviliConfig, setReviliConfig, type ReviliConfig } from './handleConfig.js'

export function createUseCommand(program: CAC) {
  program
    .command('use <kit>', 'Use kit')
    .action(async kit => {
      const reviliConfig: ReviliConfig = await getReviliConfig()

      if (reviliConfig.activeKit === kit) {
        consoleUtil.warn(`${kit} is active and does not need to be switched.`)
      } else if (!reviliConfig.kitList.includes(kit)) {
        consoleUtil.warn(`${kit} has not been added, please execute 'revili add ${kit}' first.`)
      } else {
        reviliConfig.activeKit = kit
        setReviliConfig(reviliConfig)

        consoleUtil.success(`Switching ${kit} succeeded!`)
      }
    })
}
