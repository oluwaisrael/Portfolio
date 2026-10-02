export const profile = {
  name: 'Adeoti Israel',
  displayName: 'Derin',
  location: 'Lagos',
  availability: 'always',
  school: 'University of Lagos',
  course: 'Statistics',
  level: '300 level',
  intro: 'I love what I do mehn.',
  bio: 'Learning fast, building carefully, and shipping real work.',
  positioning:
    'A Statistics student building backend, data, and machine-learning products.',
  journey:
    'Statistics taught him to work with data, patterns, and uncertainty. Software engineering became the practical way to turn that thinking into tools people can use.',
  lookingFor:
    'Full-stack, backend, machine-learning, and software development opportunities where he can build useful systems and keep growing fast.',
  focusAreas: [
    'Full-stack engineering',
    'Machine-learning products',
    'Software development',
  ],
  strengths: [
    'Backend APIs and product infrastructure',
    'Retrieval systems and applied machine learning',
    'Data-aware product thinking',
    'Shipping real interfaces, not just demos',
  ],
  contact: {
    phone: '+2349129528984',
    email: 'adeotiisrael93@gmail.com',
    github: 'oluwaisrael',
    linkedin: 'Adeoti-israel',
    resume: 'To be uploaded',
  },
  tone:
    'Confident, warm, concise, slightly playful, and technical when needed.',
  projects: [
    {
      name: 'Price Universe',
      summary:
        'An e-commerce price tracker for collecting, processing, and comparing product prices through a usable web interface.',
      detail:
        'The interesting part is the system shape: scrapers collect price data, background workers process it, FastAPI exposes it, and React turns it into a usable product.',
      stack: [
        'Python',
        'FastAPI',
        'PostgreSQL',
        'Redis',
        'Celery',
        'React',
      ],
      link: 'https://github.com/oluwaisrael/ecommerce-price',
    },
    {
      name: 'UniRAG',
      summary:
        'A course-aware RAG assistant that answers questions from uploaded academic material using semantic and lexical retrieval.',
      detail:
        'It combines FAISS for semantic search with BM25 for exact keyword matching, so answers are grounded in the course material instead of being pure generation.',
      stack: [
        'Python',
        'Gemini',
        'FAISS',
        'BM25',
        'Sentence Transformers',
        'Streamlit',
      ],
      link: 'https://github.com/oluwaisrael/rag-course-app',
    },
    {
      name: 'Lael',
      summary:
        'A native macOS assistant experiment built around speech, memory, local models, and a system-level interface.',
      detail:
        'Lael is the ambitious one: an attempt to make a desktop assistant feel closer to a native tool than a chat window.',
      stack: [
        'Tauri',
        'React',
        'TypeScript',
        'Rust',
        'Whisper',
        'Ollama',
        'Qwen',
      ],
    },
  ],
}
