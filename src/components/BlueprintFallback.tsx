import { blueprintModules } from '../data/blueprint'

export default function BlueprintFallback() {
  return (
    <div className="hero-blueprint-fallback" aria-hidden="true">
      {blueprintModules.map((module) => (
        <span
          className={module.accent ? 'is-accent' : ''}
          key={module.id}
          style={{
            left: `${((module.position[0] + 2.2) / 4.4) * 100}%`,
            top: `${((1.4 - module.position[1]) / 2.8) * 100}%`,
          }}
        />
      ))}
    </div>
  )
}
