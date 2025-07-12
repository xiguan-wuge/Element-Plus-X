<script lang="ts" setup>
import type { AppConfigProps } from './types'
import { defineProps, provide, withDefaults } from 'vue'
import { APP_CONFIG_PROVIDE_KEY, defaultAppConfig } from './constants'

const props = withDefaults(defineProps<AppConfigProps>(), {

})
provide<AppConfigProps>(APP_CONFIG_PROVIDE_KEY, {
  mdPlugins: props.mdPlugins ?? defaultAppConfig.mdPlugins,
  highLight: props.highLight ?? defaultAppConfig.highLight,
})

const prevT = 1750890813414 // Thu Jun 26 2025 06:34:02 GMT+0800 (中国标准时间)
const next = 1750894501180 // Thu Jun 26 2025 07:35:01 GMT+0800 (中国标准时间)
</script>

<template>
  <slot />
</template>
