export type BlueprintPoint = [number, number, number]

export type BlueprintModule = {
  id: string
  label: string
  position: BlueprintPoint
  scale: BlueprintPoint
  accent?: boolean
}

export const blueprintModules: BlueprintModule[] = [
  {
    id: 'ingest',
    label: 'PRICE / INGEST',
    position: [-1.7, 0.86, 0],
    scale: [0.46, 0.24, 0.12],
  },
  {
    id: 'api',
    label: 'API LAYER',
    position: [-0.77, -0.62, 0],
    scale: [0.58, 0.26, 0.12],
    accent: true,
  },
  {
    id: 'retrieval',
    label: 'UNIRAG / RAG',
    position: [0.42, 0.74, 0],
    scale: [0.52, 0.3, 0.12],
  },
  {
    id: 'workers',
    label: 'WORKERS',
    position: [1.5, -0.1, 0],
    scale: [0.44, 0.22, 0.12],
  },
  {
    id: 'product',
    label: 'LAEL / UI',
    position: [1.17, -1.05, 0],
    scale: [0.36, 0.18, 0.12],
    accent: true,
  },
]

export const blueprintLinks: [number, number][] = [
  [0, 1], [0, 2], [1, 2], [1, 4], [2, 3], [3, 4],
]
