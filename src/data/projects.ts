import type { Project } from '../types/project'

export const projects: Project[] = [
  {
    id: 'lael',
    number: '01',
    title: 'Lael',
    category: 'Personal Intelligence',
    description:
      'An always-on macOS intelligence system designed to feel like a native presence rather than another chatbot. Local speech recognition, memory, reasoning and a visual interface work together as one system.',
    status: 'Building',
    technologies: [
      'Tauri',
      'React',
      'TypeScript',
      'Rust',
      'Whisper',
      'Ollama',
      'Qwen',
      'Three.js',
    ],
    featured: true,
  },

  {
    id: 'unirag',
    number: '02',
    title: 'UniRAG',
    category: 'AI / Information Retrieval',
    description:
      'A course-aware question answering system built around grounded retrieval. It combines semantic and lexical search to produce answers with supporting sources instead of relying purely on generation.',
    status: 'Selected',
    technologies: [
      'Python',
      'Gemini',
      'FAISS',
      'BM25',
      'Sentence Transformers',
      'RAG',
    ],
    github: 'https://github.com/oluwaisrael/rag-course-app',
    featured: true,
  },

  {
    id: 'neural-network',
    number: '03',
    title: 'Neural Network From Scratch',
    category: 'Machine Learning',
    description:
      'A neural network implemented from first principles with NumPy, including forward propagation, backpropagation and training on handwritten digit data.',
    status: 'Completed',
    technologies: [
      'Python',
      'NumPy',
      'Machine Learning',
      'Backpropagation',
      'MNIST',
    ],
    github: 'https://github.com/oluwaisrael/neural-network-from-scratch',
    featured: true,
  },

  {
    id: 'auth-service',
    number: '04',
    title: 'Authentication Service',
    category: 'Backend Engineering',
    description:
      'A backend authentication system focused on the pieces that make software dependable: API design, authentication, authorization, persistence and secure request flows.',
    status: 'Experimental',
    technologies: [
      'Python',
      'FastAPI',
      'PostgreSQL',
      'JWT',
      'REST API',
    ],
    featured: false,
  },
]