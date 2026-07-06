import minigpt from "../assets/images/minigpt.png";
import chatwithyourpdf from "../assets/images/chatwithyourpdf_web.webp";
import ecommerce from "../assets/images/ecommerce_web.webp";
import delivery from "../assets/images/delivery_web.webp";
import music from "../assets/images/music_web.webp";
import har from "../assets/images/har_web.webp";
import padel from "../assets/images/padel_web.png";
import scraping from "../assets/images/scraping_web.svg";
import vendor from "../assets/images/vendor_web.png";
import nike from "../assets/images/nike_web.png";

export const projectCategories = [
  "All",
  "GenAI & NLP",
  "Machine Learning",
  "Computer Vision",
  "Web Dev",
  "Web Scraping",
  "Data Analytics",
];

export const projects = [
  {
    title: "Chat with your pdf",
    categories: ["GenAI & NLP"],
    featured: true,
    description:
      "A local interface built for researchers who live inside dozens of PDFs at once. Instead of the endless Ctrl+F dance across separate files, you load all your papers together and simply ask, and it answers from across every document with exact page level citations so you can jump straight to the source that backs each claim. It is built to be flexible where it matters, you can swap the underlying LLM from a config to trade speed for depth, and switch between vector stores like ChromaDB and FAISS to match your setup. Everything runs on your own machine, which keeps unpublished or sensitive research data off third party servers.",
    tags: ["RAG", "Vector Store", "NLP", "ML"],
    tools: [
      "LangChain",
      "ChromaDB",
      "FAISS",
      "HuggingFace",
      "Streamlit",
      "PyPDF",
    ],
    image: chatwithyourpdf,
    github: "https://github.com/rabinverse/chat_with_your_pdf",
  },
  {
    title: "Mini Gpt",
    categories: ["GenAI & NLP"],
    featured: true,
    description:
      "A small language model I built from the ground up in PyTorch to really understand how GPT style models work under the hood. It is a decoder only transformer that learns to write text one character at a time, predicting the next token over and over. I worked with two very different datasets separately, the writings of Shakespeare and the songs of Narayan Gopal, training the model on each for about 45 minutes on a Google Colab GPU. Watching it slowly pick up the rhythm and voice of each corpus was the best way to see causal self attention actually doing its job.",
    tags: ["Transformer", "NLP", "Text Generation", "DL", "Self Attention"],
    tools: ["PyTorch", "NumPy", "Streamlit"],
    image: minigpt,
    link: "https://minigpt-rabinverse.streamlit.app/",
    github: "https://github.com/rabinverse/miniGpt",
  },
  {
    title: "Delivery Time Prediction",
    categories: ["Machine Learning"],
    featured: true,
    description:
      "An end to end machine learning system that predicts how many minutes a food order will actually take to arrive. I spent most of the effort on the unglamorous parts that decide whether a model works in the real world, cleaning messy data, testing different ways to handle missing values, and tuning models with Optuna. A stacked ensemble of Random Forest and LightGBM does the final prediction, and the whole thing ships as a FastAPI backend with a Streamlit app anyone can try in the browser.",
    tags: [
      "MLflow",
      "lightgbm",
      "Optuna",
      "DagsHub",
      "Random Forest",
      "Render",
    ],
    tools: [
      "scikit-learn",
      "LightGBM",
      "Optuna",
      "MLflow",
      "DVC",
      "FastAPI",
      "Streamlit",
    ],
    image: delivery,
    link: "https://deliverytimeprediction-zrx8yweudjdjhcrcwu3nir.streamlit.app/",
    blog: "https://medium.com/@poudelrabin/predicting-online-delivery-time-with-machine-learning-5d92c0c76bcc",
    github: "https://github.com/rabinverse/delivery_time_prediction",
  },
  {
    title: "Music Recommender",
    categories: ["Machine Learning"],
    featured: true,
    description:
      "A music recommendation engine that suggests songs the way the big streaming platforms do, by combining three different approaches instead of relying on just one. Content based filtering matches songs by their audio features, collaborative filtering learns from what similar listeners enjoy, and a hybrid model blends both so it still gives good picks even for brand new users or songs with no history. Building all three side by side made it clear why real systems almost always end up using a mix.",
    tags: [
      "Stacking Model",
      "Dask",
      "Optuna",
      "Random Forest",
      "Collaborative Filtering",
      "Content Based Filtering",
      "Hybrid Model",
      "Recommendation System",
    ],
    tools: ["scikit-learn", "Dask", "Optuna", "Pandas", "Streamlit"],
    image: music,
    link: "https://the-musicrecommender.streamlit.app/",
    github: "https://github.com/rabinverse/music_recommender",
    blog: "https://medium.com/@poudelrabin/building-a-music-recommender-system-why-recommendation-systems-are-essential-d83e888af29b",
  },
  {
    title: "Padel Game Analytics",
    categories: ["Computer Vision", "Machine Learning"],
    featured: true,
    description:
      "A computer vision pipeline that watches raw padel gameplay footage and turns it into structured match data. YOLOv8 detects and tracks the players, while a custom trained ball model combined with frame differencing keeps up with a small fast moving ball that pretrained detectors kept losing. On top of that, MediaPipe pose estimation follows each player's wrists so rule based logic can label every shot as a forehand, backhand, or smash. From an 87 second rally the system logged 45 shots with timestamps and player IDs, exported everything as JSON and CSV, and generated shot distribution and timeline charts.",
    tags: [
      "Computer Vision",
      "Object Detection",
      "Object Tracking",
      "Pose Estimation",
      "YOLOv8",
      "Sports Analytics",
      "Roboflow",
      "Custom Data Annotation",
      "Model Fine-Tuning",
    ],
    tools: ["YOLOv8", "OpenCV", "MediaPipe", "NumPy", "Matplotlib", "Roboflow"],
    image: padel,
    github: "https://github.com/rabinverse/object-detection",
  },
  {
    title: "Human Activity Recognition",
    categories: ["Machine Learning"],
    description:
      "A model that figures out what a person is physically doing, like walking, sitting, or climbing stairs, purely from the accelerometer and gyroscope signals a smartphone already collects. The interesting challenge here was turning noisy raw motion data into clean features a classifier can trust, and I compared bagging and boosting methods with proper hyperparameter search to find what generalized best across different people.",
    tags: [
      "Boosting",
      "GridSearchCV",
      "RandomSearchCV",
      "Bagging",
      "Smartphone Sensors",
      "Accelerometer",
      "Gyroscope",
      "Feature Engineering",
    ],
    tools: ["scikit-learn", "XGBoost", "Pandas", "NumPy"],
    image: har,
    github: "https://github.com/rabinverse/human_activity_recognition",
  },
  {
    title: "Vendor Performance Analysis",
    categories: ["Data Analytics"],
    description:
      "An end to end analytics pipeline that answers a very practical business question, which vendors are actually worth the money. Raw inventory, purchase, and sales CSVs flow through an ingestion script into a SQLite database, where an ETL stage joins the tables and engineers the metrics that matter, gross profit, profit margin, stock turnover, and sales to purchase ratio. EDA notebooks then dig into vendor contributions and metric correlations, and everything rolls up into a Power BI dashboard that gives a one glance view of vendor efficiency. Large data files are versioned with DVC and hosted on DagsHub.",
    tags: [
      "ETL",
      "Data Analytics",
      "Feature Engineering",
      "EDA",
      "Business Intelligence",
      "Power BI",
      "DagsHub",
      "KPI",
    ],
    tools: ["Pandas", "SQLite", "Seaborn"],
    image: vendor,
    github: "https://github.com/rabinverse/vendor_performance_analysis",
  },
  {
    title: "Company Data Collection and Analysis",
    categories: ["Web Scraping", "Data Analytics"],
    description:
      "A web scraping project that collects company data at scale from a website. The script walks through page after page of listings, sending HTTP requests and parsing the HTML to pull out each company's name, rating, type, open job postings, employee review counts, and operating locations, then lands everything in a clean Pandas DataFrame. The result is a ready to analyze dataset for comparing companies, spotting hiring trends, or studying how ratings vary across public and private firms.",
    tags: [
      "Web Scraping",
      "Data Collection",
      "Data Analysis",
      "HTML Parsing",
      "Pandas",
    ],
    tools: ["Python", "Requests", "BeautifulSoup", "Pandas"],
    image: scraping,
    github: "https://github.com/rabin20-04/Web-Scarping",
  },
  {
    title: "Ecommerce Website",
    categories: ["Web Dev"],
    description:
      "A full stack e commerce site I built to get comfortable with how a real product ties together, from the database all the way to the browser. React handles the storefront with category browsing and a smooth shopping flow, while a FastAPI backend serves the data through a clean API. I deployed the two halves separately, the backend on Render and the frontend on Vercel, which taught me a lot about wiring a live app together across services.",
    tags: ["FastApi", "React", "Render", "Vercel"],
    tools: ["FastAPI", "React"],
    image: ecommerce,
    link: "https://react-fast-api.vercel.app/",
    github: "https://github.com/rabinverse/React_FastApi",
  },
  {
    title: "Nike Shoe Store",
    categories: ["Web Dev"],
    description:
      "A modern, responsive landing page for a Nike shoe store, built with plain HTML and CSS to nail the fundamentals before reaching for frameworks. The design leans on Flexbox and media queries to stay sharp across desktop, tablet, and mobile, with hover effects on navigation and buttons for a smooth feel. A dedicated limited edition section showcases exclusive products, and the layout spans a home page plus a store page.",
    tags: ["Responsive Design", "Landing Page", "Flexbox", "CSS Animations"],
    tools: ["HTML5", "CSS3", "Remix Icon", "Font Awesome"],
    image: nike,
    link: "https://rabinverse.github.io/Nike-shoe-store/",
    github: "https://github.com/rabinverse/Nike-shoe-store",
  },
];
