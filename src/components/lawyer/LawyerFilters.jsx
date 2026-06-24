'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useTransition } from 'react'
import { Magnifier } from '@gravity-ui/icons'
import { Button, Dropdown, Label } from "@heroui/react"

const SPECIALIZATIONS = [
  "Family Law",
  "Corporate Law",
  "Criminal Law",
  "Civil Litigation",
  "Real Estate Law",
  "Immigration Law",
  "Tax Law",
  "Intellectual Property Law",
  "Labor & Employment Law",
  "Personal Injury Law",
]

const LawyerFilters = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const search = searchParams.get('search') || ''
  const category = searchParams.get('category') || ''

  const updateParams = useCallback((key, value) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    startTransition(() => {
      router.push(`/lawyers?${params.toString()}`)
    })
  }, [searchParams, router])

  const clearAll = () => {
    startTransition(() => {
      router.push('/lawyers')
    })
  }

  return (
    <div className="mb-8 flex flex-col gap-4">

      <div className="flex gap-3 items-center">

        <div className="relative flex-1">
          <Magnifier className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by name, specialization..."
            defaultValue={search}
            onChange={(e) => updateParams('search', e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#814f30]/30 focus:border-[#814f30] transition-all"
          />
          {isPending && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 border-2 border-[#814f30] border-t-transparent rounded-full animate-spin" />
          )}
        </div>

        <Dropdown>
          <Button aria-label="Filter by category" variant="secondary">
            {category || 'All Categories'}
          </Button>
          <Dropdown.Popover>
            <Dropdown.Menu
              onAction={(key) => updateParams('category', key === 'all' ? '' : key)}
            >
              <Dropdown.Item id="all" textValue="All Categories">
                <Label>All Categories</Label>
              </Dropdown.Item>
              {SPECIALIZATIONS.map((spec) => (
                <Dropdown.Item key={spec} id={spec} textValue={spec}>
                  <Label>{spec}</Label>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>

        {(search || category) && (
          <button
            onClick={clearAll}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-500 hover:bg-slate-50 transition-all shrink-0"
          >
            Clear
          </button>
        )}

      </div>
    </div>
  )
}

export default LawyerFilters;