import minigpt from "../assets/images/minigpt.png";
import chatwithyourpdf from "../assets/images/chatwithyourpdf_web.webp";
import ecommerce from "../assets/images/ecommerce_web.webp";
import delivery from "../assets/images/delivery_web.webp";
import music from "../assets/images/music_web.webp";
import har from "../assets/images/har_web.webp";

export const projectCategories = [
  "All",
  "GenAI & NLP",
  "Machine Learning",
  "Web Dev",
];

export const projects = [
  {
    title: "Chat with your pdf",
    category: "GenAI & NLP",
    featured: true,
    description:
      "A local interface built for researchers who live inside dozens of PDFs at once. Instead of the endless Ctrl+F dance across separate files, you load all your papers together and simply ask, and it answers from across every document with exact page level citations so you can jump straight to the source that backs each claim. It is built to be flexible where it matters, you can swap the underlying LLM from a config to trade speed for depth, and switch between vector stores like ChromaDB and FAISS to match your setup. Everything runs on your own machine, which keeps unpublished or sensitive research data off third party servers.",
    tags: ["RAG", "Vector Store", "NLP", "ML"],
    tools: ["LangChain", "ChromaDB", "FAISS", "HuggingFace", "Streamlit", "PyPDF"],
    image: chatwithyourpdf,
    github: "https://github.com/rabinverse/chat_with_your_pdf",
  },
  {
    title: "Mini Gpt",
    category: "GenAI & NLP",
    featured: true,
    description:
      "A small language model I built from the ground up in PyTorch to really understand how GPT style models work under the hood. It is a decoder only transformer that learns to write text one character at a time, predicting the next token over and over. I trained it on two very different bodies of work, the lyrics of Narayan Gopal and the plays of Shakespeare, and watching it slowly pick up the rhythm and voice of each was the best way to see causal self attention actually doing its job.",
    tags: ["Transformer", "NLP", "Text Generation", "DL"],
    tools: ["PyTorch", "NumPy", "Streamlit"],
    image: minigpt,
    link: "https://minigpt-rabinverse.streamlit.app/",
    github: "https://github.com/rabinverse/miniGpt",
  },
  {
    title: "Delivery Time Prediction",
    category: "Machine Learning",
    description:
      "An end to end machine learning system that predicts how many minutes a food order will actually take to arrive. I spent most of the effort on the unglamorous parts that decide whether a model works in the real world, cleaning messy data, testing different ways to handle missing values, and tuning models with Optuna. A stacked ensemble of Random Forest and LightGBM does the final prediction, and the whole thing ships as a FastAPI backend with a Streamlit app anyone can try in the browser.",
    tags: ["MLflow", "lightgbm", "Optuna", "Random Forest"],
    tools: ["scikit-learn", "LightGBM", "Optuna", "MLflow", "DVC", "DagsHub", "FastAPI", "Streamlit", "Render"],
    image: delivery,
    link: "https://deliverytimeprediction-zrx8yweudjdjhcrcwu3nir.streamlit.app/",
    blog: "https://medium.com/@poudelrabin/predicting-online-delivery-time-with-machine-learning-5d92c0c76bcc",
    github: "https://github.com/rabinverse/delivery_time_prediction",
  },
  {
    title: "Music Recommender",
    category: "Machine Learning",
    featured: true,
    description:
      "A music recommendation engine that suggests songs the way the big streaming platforms do, by combining three different approaches instead of relying on just one. Content based filtering matches songs by their audio features, collaborative filtering learns from what similar listeners enjoy, and a hybrid model blends both so it still gives good picks even for brand new users or songs with no history. Building all three side by side made it clear why real systems almost always end up using a mix.",
    tags: ["Stacking Model", "Dask", "Optuna", "Random Forest"],
    tools: ["scikit-learn", "Dask", "Optuna", "Pandas", "Streamlit"],
    image: music,
    link: "https://the-musicrecommender.streamlit.app/",
    github: "https://github.com/rabinverse/music_recommender",
    blog: "https://medium.com/@poudelrabin/building-a-music-recommender-system-why-recommendation-systems-are-essential-d83e888af29b",
  },
  {
    title: "Human Activity Recognition",
    category: "Machine Learning",
    description:
      "A model that figures out what a person is physically doing, like walking, sitting, or climbing stairs, purely from the accelerometer and gyroscope signals a smartphone already collects. The interesting challenge here was turning noisy raw motion data into clean features a classifier can trust, and I compared bagging and boosting methods with proper hyperparameter search to find what generalized best across different people.",
    tags: ["Boosting", "GridSearchCV", "RandomSearchCV", "Bagging"],
    tools: ["scikit-learn", "XGBoost", "Pandas", "NumPy"],
    image: har,
    github: "https://github.com/rabinverse/human_activity_recognition",
  },
  {
    title: "Ecommerce Website",
    category: "Web Dev",
    description:
      "A full stack e commerce site I built to get comfortable with how a real product ties together, from the database all the way to the browser. React handles the storefront with category browsing and a smooth shopping flow, while a FastAPI backend serves the data through a clean API. I deployed the two halves separately, the backend on Render and the frontend on Vercel, which taught me a lot about wiring a live app together across services.",
    tags: ["FastApi", "React", "Render", "Vercel"],
    tools: ["FastAPI", "React", "PostgreSQL", "Render", "Vercel"],
    image: ecommerce,
    link: "https://react-fast-api.vercel.app/",
    github: "https://github.com/rabinverse/React_FastApi",
  },
];
