import { lazy, Suspense } from 'react'
import type { SceneMode } from './HeroScene'
import SceneBoundary from './SceneBoundary'

const HeroScene = lazy(() => import('./HeroScene'))

export default function ExperienceCanvas({ sceneMode }: { sceneMode: SceneMode }) {
  return (
    <div className="experience-layer" aria-hidden="true">
      <SceneBoundary>
        <Suspense fallback={null}>
          <HeroScene sceneMode={sceneMode} fullScreen />
        </Suspense>
      </SceneBoundary>
    </div>
  )
}
