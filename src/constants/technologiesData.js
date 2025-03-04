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
} from "react-icons/si";

export const technologies = [
  {
    name: "NumPy",
    icon: SiNumpy,
    link: "https://numpy.org/",
    color: "text-blue-600",
  },
  {
    name: "Pandas",
    icon: SiPandas,
    link: "https://pandas.pydata.org/",
    color: "text-blue-900",
  },

  {
    name: "TensorFlow",
    icon: SiTensorflow,
    link: "https://www.tensorflow.org/",
    color: "text-orange-600",
  },
  {
    name: "PyTorch",
    icon: SiPytorch,
    link: "https://pytorch.org/",
    color: "text-red-600",
  },
  {
    name: "Jupyter",
    icon: SiJupyter,
    link: "https://jupyter.org/",
    color: "text-orange-500",
  },
  {
    name: "Scikit-learn",
    icon: SiScikitlearn,
    link: "https://scikit-learn.org/",
    color: "text-orange-400",
  },
  {
    name: "Python",
    icon: FaPython,
    link: "https://www.python.org/",
    color: "bg-gradient-to-b from-[#3776AB] to-[#FFD43B] p-1 rounded-lg",
  },

  {
    name: "FastAPI",
    icon: SiFastapi,
    link: "https://fastapi.tiangolo.com/",
    color: "text-teal-500",
  },
  {
    name: "React",
    icon: FaReact,
    link: "https://reactjs.org/",
    color: "text-cyan-400",
  },
  {
    name: "Streamlit",
    icon: SiStreamlit,
    link: "https://streamlit.io/",
    color: "text-red-500",
  },
  {
    name: "Flask",
    icon: SiFlask,
    link: "https://flask.palletsprojects.com/",
    color: "text-gray-800",
  },
];
