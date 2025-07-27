import type { Component } from 'vue'

export interface IApp {
  name: string
  logo: Component
  desc: string
  connected: boolean
}
