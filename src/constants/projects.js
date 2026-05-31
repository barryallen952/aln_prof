import projectImg1 from "../assets/images/minigpt.png";
import chatwithyourpdf from "../assets/images/chatwithyourpdf.png";
import medical_chatbot from "../assets/images/medicalchatbot.png";

export const projects = [
  {
    title: "Chat with your pdf",
    description:
      "Multi-PDF Research Assistant powered by RAG (LangChain + ChromaDB + LLMs), supports simultaneous cross-document querying with page-level citations.Modular, env-config-driven LLM backend lets users swap models to balance speed and accuracy.",
    tags: ["RAG", "Vector Store", "NLP", "ML"],
    image: chatwithyourpdf,
    github: "https://github.com/rabinverse/chat_with_your_pdf",
  },
  {
    title: "Delivery Time Prediction",
    description:
      "Built an Machine learning Algorithm that predicts Food delivery time in minutes.",
    tags: ["MLflow", "lightgbm", "Optuna", "Random Forest"],
    image:
      "https://english.onlinekhabar.com/wp-content/uploads/2021/03/food-delivery-5217579__340.png",
    link: "https://deliverytimeprediction-zrx8yweudjdjhcrcwu3nir.streamlit.app/",
    blog: "https://medium.com/@poudelrabin2004/predicting-online-delivery-time-with-machine-learning-5d92c0c76bcc",
    github: "https://github.com/rabinverse/delivery_time_prediction"
  },
  {
    title: "Mini Gpt",
    description:
      "A decoder-only transformer implementation built from scratch using PyTorch, designed to learn and imitate text through autoregressive generation. Trained on Narayan Gopal and Shakespeare's works, this character level language model demonstrates the power of causal self-attention and next token prediction.",
    tags: ["Transformer", "NLP", "Text Generation", "DL"],
    image: projectImg1,
    link: "https://minigpt-rabinverse.streamlit.app/",
    github: "https://github.com/rabinverse/miniGpt",
  },
  {
    title: "Music Recommender",
    description:
      "A machine learning based music recommendation system that implements content-based filtering, collaborative filtering, and hybrid recommendation approaches to deliver personalized music suggestions.",
    tags: ["Stacking Model", "Dask", "Optuna", "Random Forest"],
    image:
      "https://repository-images.githubusercontent.com/481851510/24e876a4-5f85-4c10-8b12-7638b49d6179",
    link: "the-musicrecommender.streamlit.app/",
    github: "https://github.com/rabinverse/music_recommender",
    blog: "https://medium.com/@poudelrabin2004/building-a-music-recommender-system-why-recommendation-systems-are-essential-d83e888af29b",
  },

  {
    title: "Human Activity Recognition",
    description:
      "Built an ML model to classify human activities using accelerometer and gyroscope readings from smartphone.",
    tags: ["Boosting", "GridSearchCV", "RandomSearchCV", "Bagging"],
    image: "https://micro.ai/wp-content/uploads/2020/09/har.jpg",
    link: "https://github.com/rabinverse/human_activity_recognition",
    github: "https://github.com/rabinverse/human_activity_recognition"
  },

  {
    title: "Ecommerce Website",
    description:
      "Built an E-commerce website using FastAPI and React, with API integration, category-based features, and deployed on Render and Vercel.",
    tags: ["FastApi", "React", "Render", "Vercel"],
    image:
      "https://res.cloudinary.com/dz4tg6vyg/image/upload/v1752169935/Screenshot_2025-07-10_at_11.36.54_PM_uvicls.png",
    link: "https://react-fast-api.vercel.app/",
    github: "https://github.com/rabinverse/React_FastApi"
  },
];
