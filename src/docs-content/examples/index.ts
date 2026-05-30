
import type { Doc } from '../types'
import { doc as blog } from './blog'
import { doc as ecommerce } from './ecommerce'
export const allExamples: Record<string, Doc> = { blog, ecommerce }
