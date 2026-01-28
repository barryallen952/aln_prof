// Import the necessary icons at the top
import { FaReact, FaPython } from "react-icons/fa";
import {
  SiAnaconda,
  SiFastapi,
  SiStreamlit,
  SiNumpy,
  SiTensorflow,
  SiPytorch,
  SiJupyter,
  SiScikitlearn,
  SiPandas,
  SiFlask,
  SiMlflow,
  SiDvc,
  SiLangchain,
} from "react-icons/si";

export const technologies = [
  {
    name: "NumPy",
    IconName: "NumPy",
    icon: SiNumpy,
    link: "https://numpy.org/",
    color: "text-blue-600",
  },
  {
    name: "Pandas",
    IconName: "Pandas",
    icon: SiPandas,
    link: "https://pandas.pydata.org/",
    color: "text-blue-900",
  },

  // {
  //   IconName: "TensorFlow",
  //   icon: SiTensorflow,
  //   link: "https://www.tensorflow.org/",
  //   color: "text-orange-600",
  // },
  {
    name: "PyTorch",
    IconName: "PyTorch",
    icon: SiPytorch,
    link: "https://pytorch.org/",
    color: "text-red-600",
  },
  {
    // name: "Langchain",
    IconName: "Langchain",
    // icon: SiLangchain,
    iconLink:
      "https://cdn.prod.website-files.com/65b8cd72835ceeacd4449a53/68f1045a37643200af0d0aed_Frame%2099910.svg",
    link: "https://www.langchain.com/",
    color: "text-red-600",
  },

  {
    // name: "Mlflow",
    IconName: "Mlflow",
    // icon: SiMlflow,
    iconLink:
      "https://img.shields.io/badge/mlflow-%23d9ead3.svg?style=for-the-badge&logo=numpy&logoColor=blue",
    link: "https://mlflow.org/",
    color: "text-red-600",
  },
  {
    name: "FastAPI",
    IconName: "FastAPI",
    icon: SiFastapi,
    link: "https://fastapi.tiangolo.com/",
    color: "text-teal-500",
  },
  {
    name: "Jupyter",
    IconName: "Jupyter",
    icon: SiJupyter,
    link: "https://jupyter.org/",
    color: "text-orange-500",
  },
  {
    name: "Scikit-learn",
    IconName: "Scikit-learn",
    icon: SiScikitlearn,
    link: "https://scikit-learn.org/",
    color: "text-orange-400",
  },
  {
    // name: "DagsHub",
    IconName: "DagsHub",
    iconLink: "https://dagshub.com/wp-content/uploads/2024/04/dagshab.svg",
    link: "https://scikit-learn.org/",
    color: "text-orange-400",
  },
  {
    name: "Dvc",
    IconName: "Dvc",
    icon: SiDvc,
    // iconLink: "https://dvc.org/wp-content/uploads/2025/10/dvc-logo.svg",
    link: "https://dvc.org/",
    color: "text-indigo-600",
  },
  {
    name: "Python",
    IconName: "Python",
    icon: FaPython,
    link: "https://www.python.org/",
    color: "bg-gradient-to-b from-[#3776AB] to-[#FFD43B] p-1 rounded-lg",
  },

  {
    name: "React",
    IconName: "React",
    icon: FaReact,
    link: "https://reactjs.org/",
    color: "text-cyan-400",
  },
  {
    name: "Streamlit",
    IconName: "Streamlit",
    icon: SiStreamlit,
    link: "https://streamlit.io/",
    color: "text-red-500",
  },
  {
    name: "Flask",
    IconName: "Flask",
    icon: SiFlask,
    link: "https://flask.palletsprojects.com/",
    color: "text-gray-800",
  },
];
