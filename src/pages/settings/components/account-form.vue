<script setup lang="ts">
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date'
import { toTypedSchema } from '@vee-validate/zod'
import { CalendarDays, Check, ChevronsUpDown } from 'lucide-vue-next'

import { toast } from 'vue-sonner'
import { useI18n } from 'vue-i18n'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

import { accountValidator } from '../validators/account.validator'

const dateOpen = ref(false)
const languageOpen = ref(false)
const dateValue = ref()


// Get i18n instance
const { t } = useI18n()

const languages = [
  { label: 'English', value: 'en' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Spanish', value: 'es' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Russian', value: 'ru' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Korean', value: 'ko' },
  { label: 'Chinese', value: 'zh' },
] as const

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})

const accountFormSchema = toTypedSchema(accountValidator)

// https://github.com/logaretm/vee-validate/issues/3521
// https://github.com/logaretm/vee-validate/discussions/3571
async function onSubmit(values: any) {
  toast(t('common.submittedValues'), {
    description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))),
  })
}
</script>

<template>
  <Form v-slot="{ setFieldValue }" :validation-schema="accountFormSchema" @submit="onSubmit">
    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-medium">{{ t('common.account') }}</h3>
        <p class="text-sm text-muted-foreground">
          {{ t('common.account') }}
        </p>
      </div>
      <Separator />
      <div class="space-y-4">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>{{ t('common.firstName') }}</FormLabel>
            <FormControl>
              <Input v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField name="dob">
          <FormItem class="flex flex-col">
            <FormLabel>{{ t('common.date') }}</FormLabel>
            <Popover v-model:open="dateOpen">
              <PopoverTrigger as-child>
                <FormControl>
                  <Button
                    variant="outline" role="combobox" :aria-expanded="dateOpen" :class="cn(
                      'w-[240px] pl-3 text-left font-normal',
                      !dateValue && 'text-muted-foreground',
                    )"
                  >
                    {{ dateValue && dateValue instanceof CalendarDate ? df.format(dateValue.toDate(getLocalTimeZone())) : t('common.pickDate') }}
                    <CalendarDays class="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent class="w-auto p-0" align="start">
                <Calendar
                  v-model="dateValue"
                  :disabled="false"
                  initial-focus
                  @update:model-value="(value) => {
                    dateValue = value
                    setFieldValue('dob', value)
                  }"
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ value }" name="language">
          <FormItem class="flex flex-col">
            <FormLabel>{{ t('common.language') }}</FormLabel>

            <Popover v-model:open="languageOpen">
              <PopoverTrigger as-child>
                <FormControl>
                  <Button
                    variant="outline" role="combobox" :aria-expanded="languageOpen" :class="cn(
                      'w-[200px] justify-between',
                      !value && 'text-muted-foreground',
                    )"
                  >
                    {{ value ? languages.find(
                      (language) => language.value === value,
                    )?.label : t('common.selectLanguage') }}

                    <ChevronsUpDown class="size-4 ml-2 opacity-50 shrink-0" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent class="w-[200px] p-0">
                <Command>
                  <CommandInput :placeholder="t('common.searchLanguage')" />
                  <CommandEmpty>{{ t('common.noLanguageFound') }}</CommandEmpty>
                  <CommandList>
                    <CommandGroup>
                      <CommandItem
                        v-for="language in languages" :key="language.value" :value="language.label"
                        @select="() => {
                          setFieldValue('language', language.value)
                          languageOpen = false
                        }"
                      >
                        <Check
                          :class="cn(
                            'mr-2 h-4 w-4',
                            value === language.value ? 'opacity-100' : 'opacity-0',
                          )"
                        />
                        {{ language.label }}
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <FormDescription>
              {{ t('common.languageDescription') }}
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      <Separator />
      <Button type="submit">{{ t('common.saveChanges') }}</Button>
    </div>
  </Form>
</template>
