import { CircleDashedIcon, CircleSlash, ClockAlert, HandCoins } from 'lucide-vue-next'
import { h } from 'vue'

export const plans = [
  { value: 'basic', label: 'Basic' },
  { value: 'Small Business', label: 'Small Business' },
  { value: 'Enterprise', label: 'Enterprise' },
]

export const statuses = [
  { value: 'paid', label: 'Paid', icon: h(HandCoins), color: 'green' },
  { value: 'unpaid', label: 'Unpaid', icon: h(CircleDashedIcon), color: 'orange' },
  { value: 'overdue', label: 'Overdue', icon: h(ClockAlert), color: 'red' },
  { value: 'cancelled', label: 'Cancelled', icon: h(CircleSlash), color: 'gray' },
]

export type PayState = 'paid' | 'unpaid' | 'overdue' | 'cancelled'
