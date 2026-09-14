import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../types/project'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({
  project,
}: ProjectCardProps) {
  return (
    <article className="project-card">
      <div className="project-number">
        {project.number}
      </div>

      <div className="project-main">
        <div className="project-meta">
          <span>{project.category}</span>

          <span
            className={`project-status status-${project.status.toLowerCase()}`}
          >
            {project.status}
          </span>
        </div>

        <h3>{project.title}</h3>

        <p>{project.description}</p>

        <div className="project-footer">
          <div className="project-technologies">
            {project.technologies.map((technology) => (
              <span key={technology}>
                {technology}
              </span>
            ))}
          </div>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="project-link"
              aria-label={`View ${project.title} on GitHub`}
            >
              <ArrowUpRight size={20} />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}