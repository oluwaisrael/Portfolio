export type ProjectStatus =
  | 'Building'
  | 'Selected'
  | 'Completed'
  | 'Experimental'

export interface Project {
  id: string
  number: string
  title: string
  category: string
  description: string
  status: ProjectStatus
  technologies: string[]
  github?: string
  live?: string
  featured?: boolean
}