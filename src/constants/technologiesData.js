import { FaReact, FaPython, FaGitAlt } from "react-icons/fa";
import {
  SiFastapi,
  SiStreamlit,
  SiNumpy,
  SiTensorflow,
  SiPytorch,
  SiJupyter,
  SiScikitlearn,
  SiPandas,
  SiFlask,
  SiDvc,
  SiPostgresql,
  SiMeta,
  SiHuggingface,
} from "react-icons/si";

// Grouped by domain so visitors instantly see where I work.
export const techDomains = [
  {
    id: "genai",
    title: "GenAI & LLM Systems",
    caption: "My core focus - RAG pipelines, agents, and LLM tooling",
    technologies: [
      {
        IconName: "Langchain",
        iconLink:
          "https://cdn.prod.website-files.com/65b8cd72835ceeacd4449a53/68f1045a37643200af0d0aed_Frame%2099910.svg",
        link: "https://www.langchain.com/",
        level: 9,
      },
      {
        IconName: "LangGraph",
        iconLink:
          "https://cdn.prod.website-files.com/65b8cd72835ceeacd4449a53/69983caa0521ea61da792805_Frame%202147254720.svg",
        link: "https://www.langchain.com/langgraph",
        level: 8,
      },
      {
        IconName: "LangSmith",
        iconLink: "https://smith.langchain.com/favicon.svg",
        link: "https://smith.langchain.com/",
        level: 9,
      },
      {
        IconName: "PyTorch",
        icon: SiPytorch,
        link: "https://pytorch.org/",
        color: "text-red-600",
        level: 7,
      },
      {
        IconName: "TensorFlow",
        icon: SiTensorflow,
        link: "https://www.tensorflow.org/",
        color: "text-orange-600",
        level: 8,
      },
      {
        IconName: "MCP",
        iconLink: "https://avatars.githubusercontent.com/u/182288589?s=200",
        link: "https://modelcontextprotocol.io/",
        level: 8,
      },
      {
        IconName: "HuggingFace",
        icon: SiHuggingface,
        link: "https://huggingface.co/",
        color: "text-yellow-400",
        level: 8,
      },
    ],
  },
  {
    id: "datastores",
    title: "Databases & Vector Stores",
    caption: "Where the data and embeddings live",
    technologies: [
      {
        IconName: "Pinecone",
        iconLink: "https://avatars.githubusercontent.com/u/54333248?s=200",
        link: "https://www.pinecone.io/",
        level: 8,
      },
      {
        IconName: "FAISS",
        icon: SiMeta,
        link: "https://faiss.ai/",
        color: "text-blue-500",
        level: 8,
      },
      {
        IconName: "Chroma",
        iconLink: "https://avatars.githubusercontent.com/u/105881770?s=200",
        link: "https://www.trychroma.com/",
        level: 9,
      },
      {
        IconName: "PostgreSQL",
        icon: SiPostgresql,
        link: "https://www.postgresql.org/",
        color: "text-sky-700",
        level: 7,
      },
    ],
  },
  {
    id: "ml",
    title: "Machine Learning & Data",
    caption: "Classical ML, data wrangling, and experimentation",
    technologies: [
      {
        IconName: "Python",
        icon: FaPython,
        link: "https://www.python.org/",
        color: "bg-gradient-to-b from-[#3776AB] to-[#FFD43B] p-1 rounded-lg",
        level: 8,
      },
      {
        IconName: "Scikit-learn",
        icon: SiScikitlearn,
        link: "https://scikit-learn.org/",
        color: "text-orange-400",
        level: 10,
      },
      {
        IconName: "Pandas",
        icon: SiPandas,
        link: "https://pandas.pydata.org/",
        color: "text-blue-900",
        level: 10,
      },
      {
        IconName: "NumPy",
        icon: SiNumpy,
        link: "https://numpy.org/",
        color: "text-blue-600",
        level: 10,
      },
      {
        IconName: "Jupyter",
        icon: SiJupyter,
        link: "https://jupyter.org/",
        color: "text-orange-500",
        level: 10,
      },
    ],
  },
  {
    id: "mlops",
    title: "MLOps & Delivery",
    caption: "Versioning, tracking, and shipping models to users",
    technologies: [
      {
        IconName: "Mlflow",
        iconLink:
          "https://img.shields.io/badge/mlflow-%23d9ead3.svg?style=for-the-badge&logo=numpy&logoColor=blue",
        link: "https://mlflow.org/",
        level: 9,
      },
      {
        IconName: "Dvc",
        icon: SiDvc,
        link: "https://dvc.org/",
        color: "text-indigo-600",
        level: 5,
      },
      {
        IconName: "DagsHub",
        iconLink: "https://dagshub.com/wp-content/uploads/2024/04/dagshab.svg",
        link: "https://dagshub.com/",
        level: 9,
      },
      {
        IconName: "Streamlit",
        icon: SiStreamlit,
        link: "https://streamlit.io/",
        color: "text-red-500",
        level: 9,
      },
      {
        IconName: "Git",
        icon: FaGitAlt,
        link: "https://git-scm.com/",
        color: "text-orange-600",
        level: 8,
      },
    ],
  },
  {
    id: "web",
    title: "Backend & Web",
    caption: "APIs and interfaces that put models in front of people",
    technologies: [
      {
        IconName: "FastAPI",
        icon: SiFastapi,
        link: "https://fastapi.tiangolo.com/",
        color: "text-teal-500",
        level: 9,
      },
      {
        IconName: "Flask",
        icon: SiFlask,
        link: "https://flask.palletsprojects.com/",
        color: "text-gray-800",
        level: 9,
      },
      {
        IconName: "React",
        icon: FaReact,
        link: "https://reactjs.org/",
        color: "text-cyan-400",
        level: 7,
      },
    ],
  },
];

// Flat list kept for anything that still wants ungrouped access.
export const technologies = techDomains.flatMap((d) => d.technologies);
