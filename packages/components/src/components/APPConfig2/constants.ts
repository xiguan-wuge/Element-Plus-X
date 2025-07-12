/*
 * @Author: xiguanwuge 1584077483@qq.com
 * @Date: 2025-06-22 01:58:30
 * @LastEditors: xiguanwuge 1584077483@qq.com
 * @LastEditTime: 2025-06-22 02:00:49
 * @FilePath: /Element-Plus-X/packages/components/src/components/APPConfig2/constants.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { AppConfigProps } from './types'

export const APP_CONFIG_PROVIDE_KEY = Symbol('vue-element-plus-x-config')

export const defaultAppConfig: AppConfigProps = {
  mdPlugins: [],
  highLight: void 0,
}
