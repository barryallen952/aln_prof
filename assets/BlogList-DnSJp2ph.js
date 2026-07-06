var Te=Object.defineProperty;var _e=(t,e,n)=>e in t?Te(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var b=(t,e,n)=>_e(t,typeof e!="symbol"?e+"":e,n);import{c as de,j as g,L as Y,r as Ce,A as ze}from"./index-DECcDA28.js";/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const je=[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]],Pe=de("arrow-left",je);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Me=[["path",{d:"M12 6v6l4 2",key:"mmk7yg"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],Ne=de("clock",Me),$e=`---
title: Building a RAG Pipeline That Holds Up in Production
date: jan 15, 2026
excerpt: Naive RAG demos great and fails in prod. Here is what actually moves the needle: chunking, reranking, and honest evaluation.
tags: RAG, LLM, NLP
cover: https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=80
---

Most RAG demos look magical and collapse the moment real users show up. The
gap is rarely the model. It's everything around it.

## 1. Chunking is the whole game

Bad chunks poison retrieval. A few rules that survived contact with reality:

- Split on **semantic boundaries**, not fixed token counts.
- Keep chunks **small enough to be precise**, big enough to stand alone.
- Store page and section metadata so you can cite sources.

\`\`\`python
splitter = RecursiveCharacterTextSplitter(
    chunk_size=800,
    chunk_overlap=120,
    separators=["\\n\\n", "\\n", ". "],
)
\`\`\`

## 2. Retrieve wide, then rerank

Vector search alone is noisy. Pull the top 20, then let a cross-encoder
reranker pick the real top 5. This single step fixed most of my "why did it
answer that?" bugs.

## 3. Evaluate like you mean it

If you can't measure it, you're guessing. Track:

1. **Retrieval hit-rate:** did the right chunk make the cut?
2. **Faithfulness:** is the answer grounded in the sources?
3. **Answer relevance:** did it actually answer the question?

> Ship the version that survives evaluation, not the one that demos well.

That's it. No magic, just discipline around the boring parts.
`,De=`---
title: Predicting Food Delivery Time: A Full Project from Data to Deployment
date: Jul 7, 2025
excerpt: An end-to-end ML system that predicts delivery ETA in minutes, covering data cleaning, stacked ensembles, Optuna tuning, DVC tracking, and a FastAPI + Streamlit deployment.
tags: ML, MLOps, Regression
cover:src/assets/images/delivery_web.webp
---

**Repo:** [github.com/rabinverse/delivery_time_prediction](https://github.com/rabinverse/delivery_time_prediction)

## Introduction: Why Delivery Time Prediction Matters

In the fast-evolving world of online deliveries, whether food, groceries, medicines, or e-commerce at your doorstep, delivery services have become the backbone of modern commerce. Customers today expect accurate Estimated Time of Arrival (ETA) updates, and businesses that meet these expectations consistently are more likely to retain users, earn trust, and grow sustainably.

From food delivery giants like Zomato and DoorDash to logistics platforms like FedEx and Amazon, time is the defining factor of customer satisfaction. Late deliveries not only frustrate customers but can also result in lost business and negative reviews.

Accurate delivery time prediction drives impact across the board:

- **Improve delivery efficiency:** understanding what causes delays, like peak hours, traffic congestion, or vehicle condition, lets platforms schedule deliveries and allocate resources intelligently.
- **Enhance customer satisfaction:** reliable ETAs reduce frustration and wait-time anxiety, increasing satisfaction and repeat usage.
- **Optimize operational costs:** predicting delays ahead of time allows businesses to deploy more personnel, reroute deliveries, or prioritize critical orders.

Predictive delivery models are not just technical tools. They are business enablers that help platforms operate with greater agility, reliability, and customer focus.

This inspired me to build a machine learning solution that reliably predicts the estimated delivery time (in minutes) for a given food delivery order. I focused not only on model performance, but also on data quality, imputation strategies, model selection, pipeline automation, and finally deployed a user-facing web app to simulate how real-world businesses benefit from such a tool.

## Who Benefits

Accurate delivery time prediction creates value for every stakeholder:

- **Customers** get clearer ETAs, more trust and transparency, fewer cancellations, less need for support calls, and confidence even during peak demand.
- **Riders and delivery partners** get smarter route planning, effective order batching, traffic-aware routing, more deliveries per day, and safer, less stressful driving.
- **Restaurants and vendors** get smart order prioritization, better staff management, prep-time sync with rider arrival, and stronger demand forecasting.
- **The company or platform** gets dispatch optimization, hotspot analysis, dynamic pricing, lower operational and support costs, reduced cancellations, and data-driven marketing.

Delivery time prediction is not just a backend feature. It's a business growth engine.

## Technical Implementation

### 1. Data Collection, Preparation & Preprocessing

In any ML project, what you do *before* training often determines how well the model performs. That was especially true here.

**Data collection.** The dataset came from a public source of historical food delivery orders. Key features:

- Order time and pickup time
- Weather conditions and traffic density
- Vehicle condition
- Rider ratings
- Festival and weekend indicators, and more
- Target: **Time Taken (min)**

**Data preparation.** The raw data needed cleaning and transformation. After inspecting patterns, distributions, and anomalies, I performed major cleaning operations and extracted useful features from timestamps.

**Handling missing data.** I experimented with several strategies:

1. Dropping rows with missing values
2. Filling with mean or mode
3. KNN imputation
4. Adding missing indicators so the model learns missingness as a signal

Each was evaluated on model performance. Surprisingly, **dropping rows with missing values gave the best overall results**, a good reminder that simpler preprocessing often wins when the dataset is large and rich in signal.

**Categorical encoding.**

- Label Encoding for ordinal features
- One-Hot Encoding for purely nominal categories

**Feature scaling.** For scale-sensitive models (Linear Regression, KNN) I applied \`StandardScaler\`. For tree-based models (Random Forest, LightGBM) scaling was skipped, since they're scale-invariant.

All of this was modularized with a \`ColumnTransformer\`, making it easy to reuse across models and pipelines.

### 2. Model Training & Evaluation

**Baseline models** to set a reference:

- Linear Regression
- Decision Tree Regressor
- K-Nearest Neighbors

**Evaluation metric: MAE.** I chose Mean Absolute Error because it's intuitive (measured in minutes), easy to communicate, and robust. It doesn't penalize large errors as aggressively as RMSE.

**Advanced models:**

- Random Forest Regressor
- LightGBM Regressor
- XGBoost Regressor and others

These outperformed the baselines by a good margin and handled non-linearity, interactions, and missing values more gracefully.

**Hyperparameter tuning with Optuna.** I used Optuna's Bayesian optimization to tune:

- Number of estimators
- Maximum tree depth
- Learning rate
- Minimum samples per split

Its **dynamic search space** focused exploration where it mattered, and **pruning** killed poor trials early to save compute. Optuna quickly found combinations that significantly reduced MAE with far less manual trial-and-error.

### Ensemble Learning with a Stacking Regressor

Random Forest and LightGBM stood out. Rather than choose one, I combined their strengths with **stacking**.

**Architecture:**

- Base models: \`RandomForestRegressor\`, \`LGBMRegressor\`
- Meta-model: \`LinearRegression\`

The base models make predictions; the meta-model learns how to best blend them into a final output.

Why it worked:

- Random Forest captured complex interactions with stability
- LightGBM handled large feature sets and missing values efficiently
- Linear Regression served as a fast, interpretable meta-model
- Together they covered each other's weaknesses and produced consistently lower MAE than any individual model

I used \`sklearn.ensemble.StackingRegressor\` and wrapped the entire stack, preprocessing plus prediction, into a single pipeline, so it runs on raw input with no extra glue code.

## Model Tracking, Versioning & Deployment

Building a good model is only half the journey. The other half is making it usable, reproducible, and accessible.

**Version control with DVC.** Tracked raw and processed datasets, versioned trained models, kept data out of Git via \`.dvc\` files, and made results reproducible across environments.

**Experiment tracking with DagsHub.** A Git + DVC platform for versioned logs of experiments, metrics, and model changes, plus a dashboard to compare performance over time. This was especially helpful when tuning or trying different imputation strategies.

**Backend with FastAPI.** The trained pipeline was saved with \`joblib\` and served through FastAPI:

- Fast, asynchronous performance
- Pydantic request validation
- Swagger UI for testing and docs
- Lightweight to deploy, robust for production

**Frontend with Streamlit.** An interactive app that lets users enter delivery conditions (weather, traffic, rider rating, and so on), sends them to the FastAPI backend, and displays the predicted delivery time in minutes. It's usable by anyone, no technical background required.

**Hosting.** Backend on Render, Streamlit frontend on Streamlit Community Cloud, both accessible via public URLs.

## Conclusion & Reflections

A large share of the timeline went to data preprocessing and cleaning, which proved crucial for reliable performance. Optuna added a powerful layer of automation to tuning, and its dynamic search spaces plus early pruning cut tuning time while boosting results. Integrating every step into a scikit-learn pipeline made the workflow reproducible and easy to deploy.

Overall, a rewarding exercise in building an end-to-end ML system, emphasizing clean data, automated tuning, and pipeline-driven workflows to deliver a practical, production-ready solution.

Thanks for reading. Have a good day :)
`,Be=`---
title: Building a Music Recommender System, and Why Recommendation Systems Are Essential
date: Sep 23, 2025
excerpt: Three recommendation approaches in one engine, content-based, collaborative, and a hybrid model, and why modern systems need all three.
tags: ML, Recommender Systems, NLP
cover: src/assets/images/music_web.webp 
---

In today's digital age, we're drowning in an ocean of choices. Spotify hosts over 100 million songs, Apple Music has 90+ million tracks, and new music is uploaded every second. How do we navigate this vast space to find songs that truly resonate with our taste? The answer lies in intelligent recommendation systems, the invisible algorithms that power our daily music discovery.

I recently built a comprehensive music recommender system that tackles this head-on. It implements three distinct approaches: **content-based filtering**, **collaborative filtering**, and a **hybrid model** that combines the best of both. This article explores why each matters, with insights from building a real-world engine.

## Why Recommendation Systems Matter

From YouTube to Facebook and Reddit, recommendation systems power personalized content delivery. They're not nice-to-have features. They're business-critical components that drive engagement, retention, and revenue.

Consider:

- Netflix attributes **80%** of watched content to its recommendation algorithm
- Amazon generates **35%** of its revenue through product recommendations
- Spotify's Discover Weekly has over **40 billion hours** of listening time

Music, in particular, faces unique challenges:

- **The discovery dilemma.** With millions of songs, users fall into "filter bubbles," replaying familiar tracks while missing potential favorites.
- **The cold start problem.** New users have no history, and new songs have no interactions. How do you recommend with no data foundation?
- **Diverse preferences.** Taste is personal and contextual. A user might love classical during work but electronic while exercising.

## Types of Recommendation Systems

### 1. Content-Based Filtering: The Music DNA Approach

Content-based filtering uses the metadata of items (song attributes) to recommend. If you liked a song with certain characteristics, you'll likely enjoy others with similar features.

![Content-based filtering](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*wpwlJft_P7mjAISCm1a3DA.png)

**How it works:**

- Analyzes song attributes: genre, tempo, key, energy, danceability, acousticness
- Builds user profiles from preferred characteristics
- Recommends songs with similar audio features

**Advantages:**

- No cold start problem for new users (can recommend from a single liked song)
- Transparent, explainable recommendations
- Works well for niche tastes and less popular content
- Doesn't require a large user base

**Limitations:**

- Limited diversity, since it tends to recommend very similar content
- Requires rich item metadata
- Struggles with subjective preferences not captured in features

### 2. Collaborative Filtering: The Wisdom of the Crowd

Collaborative filtering uses the collective behavior of users. It assumes users who agreed in the past will agree in the future.

![Collaborative filtering](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*M8FovK2fyOY6pi5A8TJTjQ.png)

### Two Main Approaches:
**User-based:** finds users with similar listening patterns. *"Users who listen to music like you also like…"*

**Item-based:** identifies songs enjoyed together. *"Users who liked this song also liked…"*

**Advantages:**

- Uncovers preferences that aren't easily put into words
- Enables discovery of diverse content
- No need for detailed item features

**Limitations:**

- Cold start problem for new users and items
- Data sparsity in large datasets
- Popularity bias toward mainstream content
- Scalability challenges as user bases grow

### 3. Hybrid Systems: The Best of Both Worlds

Hybrid systems combine approaches to overcome individual limitations while amplifying strengths, and they are the current gold standard.

Common strategies:

- **Weighted:** combine scores from different algorithms, adjusting weights by data availability and context
- **Switching:** content-based for new users, collaborative for established ones
- **Mixed:** present recommendations from multiple algorithms simultaneously
- **Cascade:** one algorithm refines another, for example collaborative filtering followed by content-based re-ranking

## How Industry Giants Do It

- **Spotify** uses collaborative filtering for "users also liked," content-based audio plus NLP of music blogs, a hybrid Discover Weekly, and deep learning for context-aware picks.
- **Netflix** uses content-based analysis on metadata, genres, and cast, hybrid models factoring viewing time and completion rates, and context-aware recommendations by device and time.
- **Amazon** uses item-based collaborative filtering for "customers who bought this also bought," content-based filtering for similar products, and hybrid systems in Amazon Music.
- **YouTube Music** uses audio fingerprinting, collaborative signals across YouTube, and hybrid intelligence blending content with user signals.

## Why Modern Systems Need All Three

1. **Comprehensive coverage.** Content-based helps new users and niche content; collaborative helps established users and popular content.
2. **Robustness.** When collaborative fails on sparse data, content-based takes over, and vice versa.
3. **Enhanced accuracy.** Combining information types yields richer profiles, reduces single-algorithm bias, and balances recommendations across user segments.
4. **Business value.** Higher engagement, better retention by solving cold start, and greater satisfaction through explainable recommendations.

## Current Landscape and Future Trends

Modern systems face challenges unlike any before: **scale** (billions of users, millions of items), **real-time** millisecond latencies, **context** awareness, **diversity** versus personalization, and **privacy**.

Emerging trends:

- **Deep learning:** neural collaborative filtering, autoencoders for feature learning, RNNs for sequential recommendations, transformers for context
- **Multi-modal:** combining audio, visual, and textual features, plus cross-domain and social signals
- **Explainable AI:** transparent reasoning, user control over factors, trust through explanation

## Conclusion

Building this system was an enlightening journey into the intersection of data science, user experience, and business strategy. It reinforced that recommendation systems aren't just technical challenges. They're human-centered solutions that must balance algorithmic sophistication with user needs.
`,Le="https://poudelrabin7.com.np/assets/chatwithyourpdf_web-_axBJncQ.webp",Ee="https://poudelrabin7.com.np/assets/delivery_web-CxYR1mrt.webp",Ze="https://poudelrabin7.com.np/assets/ecommerce_web-8V9ITXH7.webp",He="https://poudelrabin7.com.np/assets/har_web-DCwLWb2z.webp",Ge="https://poudelrabin7.com.np/assets/heroimg-_WSgooxC.png",We="https://poudelrabin7.com.np/assets/logo-CbfEFOhV.jpg",Oe="https://poudelrabin7.com.np/assets/minigpt-DSrfeFg1.png",qe="https://poudelrabin7.com.np/assets/music_web-BySfmuKb.webp",Fe="https://poudelrabin7.com.np/assets/nike_web-iTRrDfaa.png",Ye="https://poudelrabin7.com.np/assets/padel_web-Ds_GLC2T.png",Qe="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDUwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDEwNTAgNjAwIj4KICA8cmVjdCB3aWR0aD0iMTA1MCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiMwMjA2MTciLz4KICA8cmVjdCB4PSI2MCIgeT0iNTAiIHdpZHRoPSI5MzAiIGhlaWdodD0iNTAwIiBmaWxsPSIjMGYxNzJhIiBzdHJva2U9IiMzMzQxNTUiIHN0cm9rZS13aWR0aD0iMiIvPgogIDxyZWN0IHg9IjYwIiB5PSI1MCIgd2lkdGg9IjkzMCIgaGVpZ2h0PSI0NCIgZmlsbD0iIzFlMjkzYiIvPgogIDxjaXJjbGUgY3g9IjkwIiBjeT0iNzIiIHI9IjciIGZpbGw9IiNlZjQ0NDQiLz4KICA8Y2lyY2xlIGN4PSIxMTUiIGN5PSI3MiIgcj0iNyIgZmlsbD0iI2VhYjMwOCIvPgogIDxjaXJjbGUgY3g9IjE0MCIgY3k9IjcyIiByPSI3IiBmaWxsPSIjMjJjNTVlIi8+CiAgPHRleHQgeD0iMTgwIiB5PSI3OSIgZm9udC1mYW1pbHk9Ik1lbmxvLCBtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5NGEzYjgiPndlYl9zY3JhcGluZy5pcHluYiDigJQgY29tcGFuaWVzX2RmPC90ZXh0PgogIDxnIGZvbnQtZmFtaWx5PSJNZW5sbywgbW9ub3NwYWNlIiBmb250LXNpemU9IjIwIj4KICAgIDx0ZXh0IHg9IjEwMCIgeT0iMTQwIiBmaWxsPSIjODE4Y2Y4Ij4mZ3Q7Jmd0OyZndDsgZGYgPSBzY3JhcGVfYW1iaXRpb25ib3gocGFnZXM9NTApPC90ZXh0PgogICAgPHRleHQgeD0iMTAwIiB5PSIxNzUiIGZpbGw9IiM2NDc0OGIiPkZldGNoaW5nIHBhZ2UgNTAvNTAgLi4uIDIwMCBPSzwvdGV4dD4KICAgIDx0ZXh0IHg9IjEwMCIgeT0iMjMwIiBmaWxsPSIjZTJlOGYwIiBmb250LXdlaWdodD0iYm9sZCI+ICAgbmFtZSAgICAgICAgICAgIHJhdGluZyAgIHR5cGUgICAgICBqb2JzICAgcmV2aWV3czwvdGV4dD4KICAgIDxsaW5lIHgxPSIxMDAiIHkxPSIyNDUiIHgyPSI5NTAiIHkyPSIyNDUiIHN0cm9rZT0iIzMzNDE1NSIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgICA8dGV4dCB4PSIxMDAiIHk9IjI4NSIgZmlsbD0iIzk0YTNiOCI+MCAgVENTICAgICAgICAgICAgIDx0c3BhbiBmaWxsPSIjMzRkMzk5Ij4zLjc8L3RzcGFuPiAgICAgIFB1YmxpYyAgICAxLjJrICAgODhrPC90ZXh0PgogICAgPHRleHQgeD0iMTAwIiB5PSIzMjUiIGZpbGw9IiM5NGEzYjgiPjEgIEFjY2VudHVyZSAgICAgICA8dHNwYW4gZmlsbD0iIzM0ZDM5OSI+My45PC90c3Bhbj4gICAgICBQdWJsaWMgICAgODA0ICAgIDU1azwvdGV4dD4KICAgIDx0ZXh0IHg9IjEwMCIgeT0iMzY1IiBmaWxsPSIjOTRhM2I4Ij4yICBDb2duaXphbnQgICAgICAgPHRzcGFuIGZpbGw9IiMzNGQzOTkiPjMuODwvdHNwYW4+ICAgICAgUHJpdmF0ZSAgIDUxMyAgICA0OGs8L3RleHQ+CiAgICA8dGV4dCB4PSIxMDAiIHk9IjQwNSIgZmlsbD0iIzk0YTNiOCI+MyAgSW5mb3N5cyAgICAgICAgIDx0c3BhbiBmaWxsPSIjMzRkMzk5Ij4zLjY8L3RzcGFuPiAgICAgIFB1YmxpYyAgICA5NjcgICAgNjJrPC90ZXh0PgogICAgPHRleHQgeD0iMTAwIiB5PSI0NDUiIGZpbGw9IiM5NGEzYjgiPjQgIFdpcHJvICAgICAgICAgICA8dHNwYW4gZmlsbD0iIzM0ZDM5OSI+My43PC90c3Bhbj4gICAgICBQdWJsaWMgICAgNDIxICAgIDUxazwvdGV4dD4KICAgIDx0ZXh0IHg9IjEwMCIgeT0iNTA1IiBmaWxsPSIjODE4Y2Y4Ij5bNTAwIHJvd3MgeCA2IGNvbHVtbnNdPC90ZXh0PgogIDwvZz4KPC9zdmc+Cg==",Ue="https://poudelrabin7.com.np/assets/vendor_web-DZOQ7S5q.png";function J(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var C=J();function ge(t){C=t}var T={exec:()=>null};function z(t){let e=[];return n=>{let i=Math.max(0,Math.min(3,n-1)),s=e[i];return s||(s=t(i),e[i]=s),s}}function m(t,e=""){let n=typeof t=="string"?t:t.source,i={replace:(s,a)=>{let l=typeof a=="string"?a:a.source;return l=l.replace(w.caret,"$1"),n=n.replace(s,l),i},getRegex:()=>new RegExp(n,e)};return i}var Ve=((t="")=>{try{return!!new RegExp("(?<=1)(?<!1)"+t)}catch{return!1}})(),w={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:z(t=>new RegExp(`^ {0,${t}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)),hrRegex:z(t=>new RegExp(`^ {0,${t}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`)),fencesBeginRegex:z(t=>new RegExp(`^ {0,${t}}(?:\`\`\`|~~~)`)),headingBeginRegex:z(t=>new RegExp(`^ {0,${t}}#`)),htmlBeginRegex:z(t=>new RegExp(`^ {0,${t}}<(?:[a-z].*>|!--)`,"i")),blockquoteBeginRegex:z(t=>new RegExp(`^ {0,${t}}>`))},Je=/^(?:[ \t]*(?:\n|$))+/,Xe=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Ke=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,$=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,et=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,X=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,me=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,fe=m(me).replace(/bull/g,X).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),tt=m(me).replace(/bull/g,X).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),K=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,nt=/^[^\n]+/,ee=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,st=m(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ee).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),it=m(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g,X).getRegex(),W="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",te=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,rt=m("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",te).replace("tag",W).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),be=m(K).replace("hr",$).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",W).getRegex(),at=m(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",be).getRegex(),ne={blockquote:at,code:Xe,def:st,fences:Ke,heading:et,hr:$,html:rt,lheading:fe,list:it,newline:Je,paragraph:be,table:T,text:nt},ae=m("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",$).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",W).getRegex(),lt={...ne,lheading:tt,table:ae,paragraph:m(K).replace("hr",$).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",ae).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",W).getRegex()},ot={...ne,html:m(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",te).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:T,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:m(K).replace("hr",$).replace("heading",` *#{1,6} *[^
]`).replace("lheading",fe).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},ct=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,ht=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ke=/^( {2,}|\\)\n(?!\s*$)/,pt=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,j=/[\p{P}\p{S}]/u,O=/[\s\p{P}\p{S}]/u,se=/[^\s\p{P}\p{S}]/u,ut=m(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,O).getRegex(),xe=/(?!~)[\p{P}\p{S}]/u,dt=/(?!~)[\s\p{P}\p{S}]/u,gt=/(?:[^\s\p{P}\p{S}]|~)/u,mt=m(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Ve?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),we=/^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/,ft=m(we,"u").replace(/punct/g,j).getRegex(),bt=m(we,"u").replace(/punct/g,xe).getRegex(),ye="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",kt=m(ye,"gu").replace(/notPunctSpace/g,se).replace(/punctSpace/g,O).replace(/punct/g,j).getRegex(),xt=m(ye,"gu").replace(/notPunctSpace/g,gt).replace(/punctSpace/g,dt).replace(/punct/g,xe).getRegex(),wt=m("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,se).replace(/punctSpace/g,O).replace(/punct/g,j).getRegex(),yt=m(/^~~?(?:((?!~)punct)|[^\s~])/,"u").replace(/punct/g,j).getRegex(),It="^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)",vt=m(It,"gu").replace(/notPunctSpace/g,se).replace(/punctSpace/g,O).replace(/punct/g,j).getRegex(),At=m(/\\(punct)/,"gu").replace(/punct/g,j).getRegex(),St=m(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Rt=m(te).replace("(?:-->|$)","-->").getRegex(),Tt=m("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Rt).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Z=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/,_t=m(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label",Z).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Ie=m(/^!?\[(label)\]\[(ref)\]/).replace("label",Z).replace("ref",ee).getRegex(),ve=m(/^!?\[(ref)\](?:\[\])?/).replace("ref",ee).getRegex(),Ct=m("reflink|nolink(?!\\()","g").replace("reflink",Ie).replace("nolink",ve).getRegex(),le=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,ie={_backpedal:T,anyPunctuation:At,autolink:St,blockSkip:mt,br:ke,code:ht,del:T,delLDelim:T,delRDelim:T,emStrongLDelim:ft,emStrongRDelimAst:kt,emStrongRDelimUnd:wt,escape:ct,link:_t,nolink:ve,punctuation:ut,reflink:Ie,reflinkSearch:Ct,tag:Tt,text:pt,url:T},zt={...ie,link:m(/^!?\[(label)\]\((.*?)\)/).replace("label",Z).getRegex(),reflink:m(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Z).getRegex()},Q={...ie,emStrongRDelimAst:xt,emStrongLDelim:bt,delLDelim:yt,delRDelim:vt,url:m(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",le).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:m(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",le).getRegex()},jt={...Q,br:m(ke).replace("{2,}","*").getRegex(),text:m(Q.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},B={normal:ne,gfm:lt,pedantic:ot},M={normal:ie,gfm:Q,breaks:jt,pedantic:zt},Pt={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},oe=t=>Pt[t];function A(t,e){if(e){if(w.escapeTest.test(t))return t.replace(w.escapeReplace,oe)}else if(w.escapeTestNoEncode.test(t))return t.replace(w.escapeReplaceNoEncode,oe);return t}function ce(t){try{t=encodeURI(t).replace(w.percentDecode,"%")}catch{return null}return t}function he(t,e){var a;let n=t.replace(w.findPipe,(l,o,r)=>{let h=!1,c=o;for(;--c>=0&&r[c]==="\\";)h=!h;return h?"|":" |"}),i=n.split(w.splitPipe),s=0;if(i[0].trim()||i.shift(),i.length>0&&!((a=i.at(-1))!=null&&a.trim())&&i.pop(),e)if(i.length>e)i.splice(e);else for(;i.length<e;)i.push("");for(;s<i.length;s++)i[s]=i[s].trim().replace(w.slashPipe,"|");return i}function S(t,e,n){let i=t.length;if(i===0)return"";let s=0;for(;s<i&&t.charAt(i-s-1)===e;)s++;return t.slice(0,i-s)}function pe(t){let e=t.split(`
`),n=e.length-1;for(;n>=0&&w.blankLine.test(e[n]);)n--;return e.length-n<=2?t:e.slice(0,n+1).join(`
`)}function Mt(t,e){if(t.indexOf(e[1])===-1)return-1;let n=0;for(let i=0;i<t.length;i++)if(t[i]==="\\")i++;else if(t[i]===e[0])n++;else if(t[i]===e[1]&&(n--,n<0))return i;return n>0?-2:-1}function Nt(t,e=0){let n=e,i="";for(let s of t)if(s==="	"){let a=4-n%4;i+=" ".repeat(a),n+=a}else i+=s,n++;return i}function ue(t,e,n,i,s){let a=e.href,l=e.title||null,o=t[1].replace(s.other.outputLinkReplace,"$1");i.state.inLink=!0;let r={type:t[0].charAt(0)==="!"?"image":"link",raw:n,href:a,title:l,text:o,tokens:i.inlineTokens(o)};return i.state.inLink=!1,r}function $t(t,e,n){let i=t.match(n.other.indentCodeCompensation);if(i===null)return e;let s=i[1];return e.split(`
`).map(a=>{let l=a.match(n.other.beginningSpace);if(l===null)return a;let[o]=l;return o.length>=s.length?a.slice(s.length):a}).join(`
`)}var H=class{constructor(t){b(this,"options");b(this,"rules");b(this,"lexer");this.options=t||C}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let n=this.options.pedantic?e[0]:pe(e[0]),i=n.replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:n,codeBlockStyle:"indented",text:i}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let n=e[0],i=$t(n,e[3]||"",this.rules);return{type:"code",raw:n,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:i}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let n=e[2].trim();if(this.rules.other.endingHash.test(n)){let i=S(n,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(n=i.trim())}return{type:"heading",raw:S(e[0],`
`),depth:e[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:S(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let n=S(e[0],`
`).split(`
`),i="",s="",a=[];for(;n.length>0;){let l=!1,o=[],r;for(r=0;r<n.length;r++)if(this.rules.other.blockquoteStart.test(n[r]))o.push(n[r]),l=!0;else if(!l)o.push(n[r]);else break;n=n.slice(r);let h=o.join(`
`),c=h.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${h}`:h,s=s?`${s}
${c}`:c;let u=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(c,a,!0),this.lexer.state.top=u,n.length===0)break;let d=a.at(-1);if((d==null?void 0:d.type)==="code")break;if((d==null?void 0:d.type)==="blockquote"){let x=d,p=x.raw+`
`+n.join(`
`),y=this.blockquote(p);a[a.length-1]=y,i=i.substring(0,i.length-x.raw.length)+y.raw,s=s.substring(0,s.length-x.text.length)+y.text;break}else if((d==null?void 0:d.type)==="list"){let x=d,p=x.raw+`
`+n.join(`
`),y=this.list(p);a[a.length-1]=y,i=i.substring(0,i.length-d.raw.length)+y.raw,s=s.substring(0,s.length-x.raw.length)+y.raw,n=p.substring(a.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:a,text:s}}}list(t){let e=this.rules.block.list.exec(t);if(e){let n=e[1].trim(),i=n.length>1,s={type:"list",raw:"",ordered:i,start:i?+n.slice(0,-1):"",loose:!1,items:[]};n=i?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=i?n:"[*+-]");let a=this.rules.other.listItemRegex(n),l=!1;for(;t;){let r=!1,h="",c="";if(!(e=a.exec(t))||this.rules.block.hr.test(t))break;h=e[0],t=t.substring(h.length);let u=Nt(e[2].split(`
`,1)[0],e[1].length),d=t.split(`
`,1)[0],x=!u.trim(),p=0;if(this.options.pedantic?(p=2,c=u.trimStart()):x?p=e[1].length+1:(p=u.search(this.rules.other.nonSpaceChar),p=p>4?1:p,c=u.slice(p),p+=e[1].length),x&&this.rules.other.blankLine.test(d)&&(h+=d+`
`,t=t.substring(d.length+1),r=!0),!r){let y=this.rules.other.nextBulletRegex(p),k=this.rules.other.hrRegex(p),D=this.rules.other.fencesBeginRegex(p),R=this.rules.other.headingBeginRegex(p),q=this.rules.other.htmlBeginRegex(p),Re=this.rules.other.blockquoteBeginRegex(p);for(;t;){let F=t.split(`
`,1)[0],P;if(d=F,this.options.pedantic?(d=d.replace(this.rules.other.listReplaceNesting,"  "),P=d):P=d.replace(this.rules.other.tabCharGlobal,"    "),D.test(d)||R.test(d)||q.test(d)||Re.test(d)||y.test(d)||k.test(d))break;if(P.search(this.rules.other.nonSpaceChar)>=p||!d.trim())c+=`
`+P.slice(p);else{if(x||u.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||D.test(u)||R.test(u)||k.test(u))break;c+=`
`+d}x=!d.trim(),h+=F+`
`,t=t.substring(F.length+1),u=P.slice(p)}}s.loose||(l?s.loose=!0:this.rules.other.doubleBlankLine.test(h)&&(l=!0)),s.items.push({type:"list_item",raw:h,task:!!this.options.gfm&&this.rules.other.listIsTask.test(c),loose:!1,text:c,tokens:[]}),s.raw+=h}let o=s.items.at(-1);if(o)o.raw=o.raw.trimEnd(),o.text=o.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let r of s.items){this.lexer.state.top=!1,r.tokens=this.lexer.blockTokens(r.text,[]);let h=r.tokens[0];if(r.task&&((h==null?void 0:h.type)==="text"||(h==null?void 0:h.type)==="paragraph")){r.text=r.text.replace(this.rules.other.listReplaceTask,""),h.raw=h.raw.replace(this.rules.other.listReplaceTask,""),h.text=h.text.replace(this.rules.other.listReplaceTask,"");for(let u=this.lexer.inlineQueue.length-1;u>=0;u--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[u].src)){this.lexer.inlineQueue[u].src=this.lexer.inlineQueue[u].src.replace(this.rules.other.listReplaceTask,"");break}let c=this.rules.other.listTaskCheckbox.exec(r.raw);if(c){let u={type:"checkbox",raw:c[0]+" ",checked:c[0]!=="[ ]"};r.checked=u.checked,s.loose?r.tokens[0]&&["paragraph","text"].includes(r.tokens[0].type)&&"tokens"in r.tokens[0]&&r.tokens[0].tokens?(r.tokens[0].raw=u.raw+r.tokens[0].raw,r.tokens[0].text=u.raw+r.tokens[0].text,r.tokens[0].tokens.unshift(u)):r.tokens.unshift({type:"paragraph",raw:u.raw,text:u.raw,tokens:[u]}):r.tokens.unshift(u)}}else r.task&&(r.task=!1);if(!s.loose){let c=r.tokens.filter(d=>d.type==="space"),u=c.length>0&&c.some(d=>this.rules.other.anyLine.test(d.raw));s.loose=u}}if(s.loose)for(let r of s.items){r.loose=!0;for(let h of r.tokens)h.type==="text"&&(h.type="paragraph")}return s}}html(t){let e=this.rules.block.html.exec(t);if(e){let n=pe(e[0]);return{type:"html",block:!0,raw:n,pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:n}}}def(t){let e=this.rules.block.def.exec(t);if(e){let n=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:n,raw:S(e[0],`
`),href:i,title:s}}}table(t){var l;let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let n=he(e[1]),i=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=(l=e[3])!=null&&l.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],a={type:"table",raw:S(e[0],`
`),header:[],align:[],rows:[]};if(n.length===i.length){for(let o of i)this.rules.other.tableAlignRight.test(o)?a.align.push("right"):this.rules.other.tableAlignCenter.test(o)?a.align.push("center"):this.rules.other.tableAlignLeft.test(o)?a.align.push("left"):a.align.push(null);for(let o=0;o<n.length;o++)a.header.push({text:n[o],tokens:this.lexer.inline(n[o]),header:!0,align:a.align[o]});for(let o of s)a.rows.push(he(o,a.header.length).map((r,h)=>({text:r,tokens:this.lexer.inline(r),header:!1,align:a.align[h]})));return a}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e){let n=e[1].trim();return{type:"heading",raw:S(e[0],`
`),depth:e[2].charAt(0)==="="?1:2,text:n,tokens:this.lexer.inline(n)}}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let n=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:n,tokens:this.lexer.inline(n)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let n=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let a=S(n.slice(0,-1),"\\");if((n.length-a.length)%2===0)return}else{let a=Mt(e[2],"()");if(a===-2)return;if(a>-1){let l=(e[0].indexOf("!")===0?5:4)+e[1].length+a;e[2]=e[2].substring(0,a),e[0]=e[0].substring(0,l).trim(),e[3]=""}}let i=e[2],s="";if(this.options.pedantic){let a=this.rules.other.pedanticHrefTitle.exec(i);a&&(i=a[1],s=a[3])}else s=e[3]?e[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?i=i.slice(1):i=i.slice(1,-1)),ue(e,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let n;if((n=this.rules.inline.reflink.exec(t))||(n=this.rules.inline.nolink.exec(t))){let i=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=e[i.toLowerCase()];if(!s){let a=n[0].charAt(0);return{type:"text",raw:a,text:a}}return ue(n,s,n[0],this.lexer,this.rules)}}emStrong(t,e,n=""){let i=this.rules.inline.emStrongLDelim.exec(t);if(!(!i||!i[1]&&!i[2]&&!i[3]&&!i[4]||i[4]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(i[1]||i[3])||!n||this.rules.inline.punctuation.exec(n))){let s=[...i[0]].length-1,a,l,o=s,r=0,h=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(h.lastIndex=0,e=e.slice(-1*t.length+s);(i=h.exec(e))!==null;){if(a=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!a)continue;if(l=[...a].length,i[3]||i[4]){o+=l;continue}else if((i[5]||i[6])&&s%3&&!((s+l)%3)){r+=l;continue}if(o-=l,o>0)continue;l=Math.min(l,l+o+r);let c=[...i[0]][0].length,u=t.slice(0,s+i.index+c+l);if(Math.min(s,l)%2){let x=u.slice(1,-1);return{type:"em",raw:u,text:x,tokens:this.lexer.inlineTokens(x)}}let d=u.slice(2,-2);return{type:"strong",raw:u,text:d,tokens:this.lexer.inlineTokens(d)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let n=e[2].replace(this.rules.other.newLineCharGlobal," "),i=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return i&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:e[0],text:n}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t,e,n=""){let i=this.rules.inline.delLDelim.exec(t);if(i&&(!i[1]||!n||this.rules.inline.punctuation.exec(n))){let s=[...i[0]].length-1,a,l,o=s,r=this.rules.inline.delRDelim;for(r.lastIndex=0,e=e.slice(-1*t.length+s);(i=r.exec(e))!==null;){if(a=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!a||(l=[...a].length,l!==s))continue;if(i[3]||i[4]){o+=l;continue}if(o-=l,o>0)continue;l=Math.min(l,l+o);let h=[...i[0]][0].length,c=t.slice(0,s+i.index+h+l),u=c.slice(s,-s);return{type:"del",raw:c,text:u,tokens:this.lexer.inlineTokens(u)}}}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let n,i;return e[2]==="@"?(n=e[1],i="mailto:"+n):(n=e[1],i=n),{type:"link",raw:e[0],text:n,href:i,tokens:[{type:"text",raw:n,text:n}]}}}url(t){var n;let e;if(e=this.rules.inline.url.exec(t)){let i,s;if(e[2]==="@")i=e[0],s="mailto:"+i;else{let a;do a=e[0],e[0]=((n=this.rules.inline._backpedal.exec(e[0]))==null?void 0:n[0])??"";while(a!==e[0]);i=e[0],e[1]==="www."?s="http://"+e[0]:s=e[0]}return{type:"link",raw:e[0],text:i,href:s,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let n=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:n}}}},I=class U{constructor(e){b(this,"tokens");b(this,"options");b(this,"state");b(this,"inlineQueue");b(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||C,this.options.tokenizer=this.options.tokenizer||new H,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:w,block:B.normal,inline:M.normal};this.options.pedantic?(n.block=B.pedantic,n.inline=M.pedantic):this.options.gfm&&(n.block=B.gfm,this.options.breaks?n.inline=M.breaks:n.inline=M.gfm),this.tokenizer.rules=n}static get rules(){return{block:B,inline:M}}static lex(e,n){return new U(n).lex(e)}static lexInline(e,n){return new U(n).inlineTokens(e)}lex(e){e=e.replace(w.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let i=this.inlineQueue[n];this.inlineTokens(i.src,i.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,n=[],i=!1){var a,l,o;this.tokenizer.lexer=this,this.options.pedantic&&(e=e.replace(w.tabCharGlobal,"    ").replace(w.spaceLine,""));let s=1/0;for(;e;){if(e.length<s)s=e.length;else{this.infiniteLoopError(e.charCodeAt(0));break}let r;if((l=(a=this.options.extensions)==null?void 0:a.block)!=null&&l.some(c=>(r=c.call({lexer:this},e,n))?(e=e.substring(r.raw.length),n.push(r),!0):!1))continue;if(r=this.tokenizer.space(e)){e=e.substring(r.raw.length);let c=n.at(-1);r.raw.length===1&&c!==void 0?c.raw+=`
`:n.push(r);continue}if(r=this.tokenizer.code(e)){e=e.substring(r.raw.length);let c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=(c.raw.endsWith(`
`)?"":`
`)+r.raw,c.text+=`
`+r.text,this.inlineQueue.at(-1).src=c.text):n.push(r);continue}if(r=this.tokenizer.fences(e)){e=e.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.heading(e)){e=e.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.hr(e)){e=e.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.blockquote(e)){e=e.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.list(e)){e=e.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.html(e)){e=e.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.def(e)){e=e.substring(r.raw.length);let c=n.at(-1);(c==null?void 0:c.type)==="paragraph"||(c==null?void 0:c.type)==="text"?(c.raw+=(c.raw.endsWith(`
`)?"":`
`)+r.raw,c.text+=`
`+r.raw,this.inlineQueue.at(-1).src=c.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title},n.push(r));continue}if(r=this.tokenizer.table(e)){e=e.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.lheading(e)){e=e.substring(r.raw.length),n.push(r);continue}let h=e;if((o=this.options.extensions)!=null&&o.startBlock){let c=1/0,u=e.slice(1),d;this.options.extensions.startBlock.forEach(x=>{d=x.call({lexer:this},u),typeof d=="number"&&d>=0&&(c=Math.min(c,d))}),c<1/0&&c>=0&&(h=e.substring(0,c+1))}if(this.state.top&&(r=this.tokenizer.paragraph(h))){let c=n.at(-1);i&&(c==null?void 0:c.type)==="paragraph"?(c.raw+=(c.raw.endsWith(`
`)?"":`
`)+r.raw,c.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(r),i=h.length!==e.length,e=e.substring(r.raw.length);continue}if(r=this.tokenizer.text(e)){e=e.substring(r.raw.length);let c=n.at(-1);(c==null?void 0:c.type)==="text"?(c.raw+=(c.raw.endsWith(`
`)?"":`
`)+r.raw,c.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=c.text):n.push(r);continue}if(e){this.infiniteLoopError(e.charCodeAt(0));break}}return this.state.top=!0,n}inline(e,n=[]){return this.inlineQueue.push({src:e,tokens:n}),n}inlineTokens(e,n=[]){var h,c,u,d,x;this.tokenizer.lexer=this;let i=e,s=null;if(this.tokens.links){let p=Object.keys(this.tokens.links);if(p.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(i))!==null;)p.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(i))!==null;)i=i.slice(0,s.index)+"++"+i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let a;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(i))!==null;)a=s[2]?s[2].length:0,i=i.slice(0,s.index+a)+"["+"a".repeat(s[0].length-a-2)+"]"+i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);i=((c=(h=this.options.hooks)==null?void 0:h.emStrongMask)==null?void 0:c.call({lexer:this},i))??i;let l=!1,o="",r=1/0;for(;e;){if(e.length<r)r=e.length;else{this.infiniteLoopError(e.charCodeAt(0));break}l||(o=""),l=!1;let p;if((d=(u=this.options.extensions)==null?void 0:u.inline)!=null&&d.some(k=>(p=k.call({lexer:this},e,n))?(e=e.substring(p.raw.length),n.push(p),!0):!1))continue;if(p=this.tokenizer.escape(e)){e=e.substring(p.raw.length),n.push(p);continue}if(p=this.tokenizer.tag(e)){e=e.substring(p.raw.length),n.push(p);continue}if(p=this.tokenizer.link(e)){e=e.substring(p.raw.length),n.push(p);continue}if(p=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(p.raw.length);let k=n.at(-1);p.type==="text"&&(k==null?void 0:k.type)==="text"?(k.raw+=p.raw,k.text+=p.text):n.push(p);continue}if(p=this.tokenizer.emStrong(e,i,o)){e=e.substring(p.raw.length),n.push(p);continue}if(p=this.tokenizer.codespan(e)){e=e.substring(p.raw.length),n.push(p);continue}if(p=this.tokenizer.br(e)){e=e.substring(p.raw.length),n.push(p);continue}if(p=this.tokenizer.del(e,i,o)){e=e.substring(p.raw.length),n.push(p);continue}if(p=this.tokenizer.autolink(e)){e=e.substring(p.raw.length),n.push(p);continue}if(!this.state.inLink&&(p=this.tokenizer.url(e))){e=e.substring(p.raw.length),n.push(p);continue}let y=e;if((x=this.options.extensions)!=null&&x.startInline){let k=1/0,D=e.slice(1),R;this.options.extensions.startInline.forEach(q=>{R=q.call({lexer:this},D),typeof R=="number"&&R>=0&&(k=Math.min(k,R))}),k<1/0&&k>=0&&(y=e.substring(0,k+1))}if(p=this.tokenizer.inlineText(y)){e=e.substring(p.raw.length),p.raw.slice(-1)!=="_"&&(o=p.raw.slice(-1)),l=!0;let k=n.at(-1);(k==null?void 0:k.type)==="text"?(k.raw+=p.raw,k.text+=p.text):n.push(p);continue}if(e){this.infiniteLoopError(e.charCodeAt(0));break}}return n}infiniteLoopError(e){let n="Infinite loop on byte: "+e;if(this.options.silent)console.error(n);else throw new Error(n)}},G=class{constructor(t){b(this,"options");b(this,"parser");this.options=t||C}space(t){return""}code({text:t,lang:e,escaped:n}){var a;let i=(a=(e||"").match(w.notSpaceStart))==null?void 0:a[0],s=t.replace(w.endingNewline,"")+`
`;return i?'<pre><code class="language-'+A(i)+'">'+(n?s:A(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:A(s,!0))+`</code></pre>
`}blockquote({tokens:t}){return`<blockquote>
${this.parser.parse(t)}</blockquote>
`}html({text:t}){return t}def(t){return""}heading({tokens:t,depth:e}){return`<h${e}>${this.parser.parseInline(t)}</h${e}>
`}hr(t){return`<hr>
`}list(t){let e=t.ordered,n=t.start,i="";for(let l=0;l<t.items.length;l++){let o=t.items[l];i+=this.listitem(o)}let s=e?"ol":"ul",a=e&&n!==1?' start="'+n+'"':"";return"<"+s+a+`>
`+i+"</"+s+`>
`}listitem(t){return`<li>${this.parser.parse(t.tokens)}</li>
`}checkbox({checked:t}){return"<input "+(t?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:t}){return`<p>${this.parser.parseInline(t)}</p>
`}table(t){let e="",n="";for(let s=0;s<t.header.length;s++)n+=this.tablecell(t.header[s]);e+=this.tablerow({text:n});let i="";for(let s=0;s<t.rows.length;s++){let a=t.rows[s];n="";for(let l=0;l<a.length;l++)n+=this.tablecell(a[l]);i+=this.tablerow({text:n})}return i&&(i=`<tbody>${i}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+i+`</table>
`}tablerow({text:t}){return`<tr>
${t}</tr>
`}tablecell(t){let e=this.parser.parseInline(t.tokens),n=t.header?"th":"td";return(t.align?`<${n} align="${t.align}">`:`<${n}>`)+e+`</${n}>
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${A(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:n}){let i=this.parser.parseInline(n),s=ce(t);if(s===null)return i;t=s;let a='<a href="'+t+'"';return e&&(a+=' title="'+A(e)+'"'),a+=">"+i+"</a>",a}image({href:t,title:e,text:n,tokens:i}){i&&(n=this.parser.parseInline(i,this.parser.textRenderer));let s=ce(t);if(s===null)return A(n);t=s;let a=`<img src="${t}" alt="${A(n)}"`;return e&&(a+=` title="${A(e)}"`),a+=">",a}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:A(t.text)}},re=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},v=class V{constructor(e){b(this,"options");b(this,"renderer");b(this,"textRenderer");this.options=e||C,this.options.renderer=this.options.renderer||new G,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new re}static parse(e,n){return new V(n).parse(e)}static parseInline(e,n){return new V(n).parseInline(e)}parse(e){var i,s;this.renderer.parser=this;let n="";for(let a=0;a<e.length;a++){let l=e[a];if((s=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&s[l.type]){let r=l,h=this.options.extensions.renderers[r.type].call({parser:this},r);if(h!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(r.type)){n+=h||"";continue}}let o=l;switch(o.type){case"space":{n+=this.renderer.space(o);break}case"hr":{n+=this.renderer.hr(o);break}case"heading":{n+=this.renderer.heading(o);break}case"code":{n+=this.renderer.code(o);break}case"table":{n+=this.renderer.table(o);break}case"blockquote":{n+=this.renderer.blockquote(o);break}case"list":{n+=this.renderer.list(o);break}case"checkbox":{n+=this.renderer.checkbox(o);break}case"html":{n+=this.renderer.html(o);break}case"def":{n+=this.renderer.def(o);break}case"paragraph":{n+=this.renderer.paragraph(o);break}case"text":{n+=this.renderer.text(o);break}default:{let r='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(r),"";throw new Error(r)}}}return n}parseInline(e,n=this.renderer){var s,a;this.renderer.parser=this;let i="";for(let l=0;l<e.length;l++){let o=e[l];if((a=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&a[o.type]){let h=this.options.extensions.renderers[o.type].call({parser:this},o);if(h!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){i+=h||"";continue}}let r=o;switch(r.type){case"escape":{i+=n.text(r);break}case"html":{i+=n.html(r);break}case"link":{i+=n.link(r);break}case"image":{i+=n.image(r);break}case"checkbox":{i+=n.checkbox(r);break}case"strong":{i+=n.strong(r);break}case"em":{i+=n.em(r);break}case"codespan":{i+=n.codespan(r);break}case"br":{i+=n.br(r);break}case"del":{i+=n.del(r);break}case"text":{i+=n.text(r);break}default:{let h='Token with "'+r.type+'" type was not found.';if(this.options.silent)return console.error(h),"";throw new Error(h)}}}return i}},E,N=(E=class{constructor(t){b(this,"options");b(this,"block");this.options=t||C}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(t=this.block){return t?I.lex:I.lexInline}provideParser(t=this.block){return t?v.parse:v.parseInline}},b(E,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),b(E,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),E),Dt=class{constructor(...t){b(this,"defaults",J());b(this,"options",this.setOptions);b(this,"parse",this.parseMarkdown(!0));b(this,"parseInline",this.parseMarkdown(!1));b(this,"Parser",v);b(this,"Renderer",G);b(this,"TextRenderer",re);b(this,"Lexer",I);b(this,"Tokenizer",H);b(this,"Hooks",N);this.use(...t)}walkTokens(t,e){var i,s;let n=[];for(let a of t)switch(n=n.concat(e.call(this,a)),a.type){case"table":{let l=a;for(let o of l.header)n=n.concat(this.walkTokens(o.tokens,e));for(let o of l.rows)for(let r of o)n=n.concat(this.walkTokens(r.tokens,e));break}case"list":{let l=a;n=n.concat(this.walkTokens(l.items,e));break}default:{let l=a;(s=(i=this.defaults.extensions)==null?void 0:i.childTokens)!=null&&s[l.type]?this.defaults.extensions.childTokens[l.type].forEach(o=>{let r=l[o].flat(1/0);n=n.concat(this.walkTokens(r,e))}):l.tokens&&(n=n.concat(this.walkTokens(l.tokens,e)))}}return n}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(n=>{let i={...n};if(i.async=this.defaults.async||i.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let a=e.renderers[s.name];a?e.renderers[s.name]=function(...l){let o=s.renderer.apply(this,l);return o===!1&&(o=a.apply(this,l)),o}:e.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let a=e[s.level];a?a.unshift(s.tokenizer):e[s.level]=[s.tokenizer],s.start&&(s.level==="block"?e.startBlock?e.startBlock.push(s.start):e.startBlock=[s.start]:s.level==="inline"&&(e.startInline?e.startInline.push(s.start):e.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(e.childTokens[s.name]=s.childTokens)}),i.extensions=e),n.renderer){let s=this.defaults.renderer||new G(this.defaults);for(let a in n.renderer){if(!(a in s))throw new Error(`renderer '${a}' does not exist`);if(["options","parser"].includes(a))continue;let l=a,o=n.renderer[l],r=s[l];s[l]=(...h)=>{let c=o.apply(s,h);return c===!1&&(c=r.apply(s,h)),c||""}}i.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new H(this.defaults);for(let a in n.tokenizer){if(!(a in s))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;let l=a,o=n.tokenizer[l],r=s[l];s[l]=(...h)=>{let c=o.apply(s,h);return c===!1&&(c=r.apply(s,h)),c}}i.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new N;for(let a in n.hooks){if(!(a in s))throw new Error(`hook '${a}' does not exist`);if(["options","block"].includes(a))continue;let l=a,o=n.hooks[l],r=s[l];N.passThroughHooks.has(a)?s[l]=h=>{if(this.defaults.async&&N.passThroughHooksRespectAsync.has(a))return(async()=>{let u=await o.call(s,h);return r.call(s,u)})();let c=o.call(s,h);return r.call(s,c)}:s[l]=(...h)=>{if(this.defaults.async)return(async()=>{let u=await o.apply(s,h);return u===!1&&(u=await r.apply(s,h)),u})();let c=o.apply(s,h);return c===!1&&(c=r.apply(s,h)),c}}i.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,a=n.walkTokens;i.walkTokens=function(l){let o=[];return o.push(a.call(this,l)),s&&(o=o.concat(s.call(this,l))),o}}this.defaults={...this.defaults,...i}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return I.lex(t,e??this.defaults)}parser(t,e){return v.parse(t,e??this.defaults)}parseMarkdown(t){return(e,n)=>{let i={...n},s={...this.defaults,...i},a=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&i.async===!1)return a(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return a(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return a(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=t),s.async)return(async()=>{let l=s.hooks?await s.hooks.preprocess(e):e,o=await(s.hooks?await s.hooks.provideLexer(t):t?I.lex:I.lexInline)(l,s),r=s.hooks?await s.hooks.processAllTokens(o):o;s.walkTokens&&await Promise.all(this.walkTokens(r,s.walkTokens));let h=await(s.hooks?await s.hooks.provideParser(t):t?v.parse:v.parseInline)(r,s);return s.hooks?await s.hooks.postprocess(h):h})().catch(a);try{s.hooks&&(e=s.hooks.preprocess(e));let l=(s.hooks?s.hooks.provideLexer(t):t?I.lex:I.lexInline)(e,s);s.hooks&&(l=s.hooks.processAllTokens(l)),s.walkTokens&&this.walkTokens(l,s.walkTokens);let o=(s.hooks?s.hooks.provideParser(t):t?v.parse:v.parseInline)(l,s);return s.hooks&&(o=s.hooks.postprocess(o)),o}catch(l){return a(l)}}}onError(t,e){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let i="<p>An error occurred:</p><pre>"+A(n.message+"",!0)+"</pre>";return e?Promise.resolve(i):i}if(e)return Promise.reject(n);throw n}}},_=new Dt;function f(t,e){return _.parse(t,e)}f.options=f.setOptions=function(t){return _.setOptions(t),f.defaults=_.defaults,ge(f.defaults),f};f.getDefaults=J;f.defaults=C;f.use=function(...t){return _.use(...t),f.defaults=_.defaults,ge(f.defaults),f};f.walkTokens=function(t,e){return _.walkTokens(t,e)};f.parseInline=_.parseInline;f.Parser=v;f.parser=v.parse;f.Renderer=G;f.TextRenderer=re;f.Lexer=I;f.lexer=I.lex;f.Tokenizer=H;f.Hooks=N;f.parse=f;f.options;f.setOptions;f.use;f.walkTokens;f.parseInline;v.parse;I.lex;const Bt=Object.assign({"./posts/building-rag-that-holds-up.md":$e,"./posts/delivery-time-prediction.md":De,"./posts/music-recommender-system.md":Be}),Lt=t=>{const e=/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/.exec(t);if(!e)return{meta:{},body:t};const n={};return e[1].split(`
`).forEach(i=>{const s=i.indexOf(":");if(s===-1)return;const a=i.slice(0,s).trim(),l=i.slice(s+1).trim();n[a]=l}),{meta:n,body:e[2]}},Et=t=>{const e=t.trim().split(/\s+/).length;return Math.max(1,Math.round(e/200))},Zt=Object.assign({"../assets/images/chatwithyourpdf_web.webp":Le,"../assets/images/delivery_web.webp":Ee,"../assets/images/ecommerce_web.webp":Ze,"../assets/images/har_web.webp":He,"../assets/images/heroimg.png":Ge,"../assets/images/logo.jpg":We,"../assets/images/minigpt.png":Oe,"../assets/images/music_web.webp":qe,"../assets/images/nike_web.png":Fe,"../assets/images/padel_web.png":Ye,"../assets/images/scraping_web.svg":Qe,"../assets/images/vendor_web.png":Ue}),Ht=t=>{if(!t)return"";if(/^https?:\/\//.test(t))return t;const e=t.split("/").pop(),n=Object.entries(Zt).find(([i])=>i.endsWith(`/${e}`));return n?n[1]:t},Ae=Object.entries(Bt).map(([t,e])=>{const n=t.split("/").pop().replace(/\.md$/,""),{meta:i,body:s}=Lt(e);return{slug:n,title:i.title||n.replace(/-/g," "),date:i.date||"",excerpt:i.excerpt||s.replace(/[#*`>_-]/g,"").slice(0,160).trim(),tags:i.tags?i.tags.split(",").map(a=>a.trim()).filter(Boolean):[],cover:Ht(i.cover),readingTime:Et(s),html:f.parse(s)}}).sort((t,e)=>(Date.parse(e.date)||0)-(Date.parse(t.date)||0)),Gt=()=>Ae,Ft=t=>Ae.find(e=>e.slug===t),L=Gt(),Se=({children:t})=>g.jsxs("div",{className:"min-h-screen bg-slate-950 text-stone-300 antialiased relative overflow-x-hidden font-mono",id:"blogs",children:[g.jsx("div",{className:"fixed inset-0 -z-10",children:g.jsx("div",{className:"relative h-full w-full bg-slate-950",children:g.jsx("div",{className:"absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"})})}),g.jsx("header",{className:"border-b border-slate-800/70",children:g.jsxs("div",{className:"max-w-4xl mx-auto px-4 sm:px-8 py-5 flex items-center justify-between",children:[g.jsxs(Y,{to:"/",className:"font-display text-2xl font-semibold tracking-tight text-slate-100 lowercase hover:text-white transition-colors",children:["rabin",g.jsx("span",{className:"text-indigo-500",children:"."})]}),g.jsxs(Y,{to:"/",className:"flex items-center gap-2 text-[11px] uppercase tracking-widest text-slate-400 hover:text-indigo-300 transition-colors",children:[g.jsx(Pe,{className:"w-3.5 h-3.5"})," Home"]})]})}),g.jsx("main",{className:"max-w-4xl mx-auto px-4 sm:px-8 py-16 relative z-10",children:t})]}),Wt=()=>(Ce.useEffect(()=>(document.title="Blog - Rabin Poudel",()=>{document.title="Rabin Poudel - AI/ML Engineer & NLP Practitioner"}),[]),g.jsxs(Se,{children:[g.jsxs("div",{className:"mb-12",children:[g.jsxs("div",{className:"flex items-center gap-2 text-indigo-500 text-[10px] tracking-widest uppercase mb-4",children:[g.jsx("span",{className:"w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping"}),"blog/"]}),g.jsx("h1",{className:"font-display text-4xl sm:text-5xl font-semibold tracking-tight text-slate-100",children:"Blog"}),g.jsxs("p",{className:"text-slate-500 text-sm mt-3",children:[L.length," ",L.length===1?"post":"posts"," · notes on ML, NLP, and building things."]})]}),L.length===0?g.jsxs("p",{className:"text-slate-500 text-sm",children:["No posts yet. Drop a .md file into"," ",g.jsx("span",{className:"text-indigo-300",children:"src/blogs/posts/"}),"."]}):g.jsx("div",{className:"grid sm:grid-cols-2 gap-6",children:L.map(t=>g.jsxs(Y,{to:`/blogs/${t.slug}`,className:"group relative bg-slate-950 border border-slate-800 hover:border-indigo-500/60 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col",children:[t.cover?g.jsx("div",{className:"h-40 overflow-hidden",children:g.jsx("img",{src:t.cover,alt:t.title,loading:"lazy",className:"w-full h-full object-cover filter grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-90 scale-105 group-hover:scale-110 transition-all duration-700"})}):g.jsxs("div",{className:"h-40 relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-800 to-slate-900",children:[g.jsx("div",{className:"absolute inset-0 bg-[linear-gradient(to_right,#ffffff14_1px,transparent_1px),linear-gradient(to_bottom,#ffffff14_1px,transparent_1px)] bg-[size:22px_22px]"}),g.jsx("div",{className:"absolute -top-8 -right-8 w-32 h-32 rounded-full bg-indigo-400/30 blur-2xl group-hover:bg-indigo-400/50 transition-colors duration-700"})]}),g.jsxs("div",{className:"p-5 flex flex-col flex-1",children:[g.jsxs("div",{className:"flex items-center gap-3 text-[10px] uppercase tracking-widest text-slate-500 mb-3",children:[t.date&&g.jsx("span",{children:t.date}),g.jsxs("span",{className:"flex items-center gap-1",children:[g.jsx(Ne,{className:"w-3 h-3"})," ",t.readingTime," min"]})]}),g.jsx("h2",{className:"font-display text-xl font-semibold text-slate-100 leading-tight mb-2 group-hover:text-white transition-colors",children:t.title}),g.jsx("p",{className:"text-slate-400 text-[13px] leading-relaxed line-clamp-2 mb-4",children:t.excerpt}),g.jsxs("div",{className:"mt-auto flex items-center justify-between",children:[g.jsx("div",{className:"flex flex-wrap gap-1.5",children:t.tags.slice(0,3).map(e=>g.jsx("span",{className:"text-[9px] uppercase tracking-wider px-1.5 py-0.5 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-semibold",children:e},e))}),g.jsx(ze,{className:"w-4 h-4 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"})]})]})]},t.slug))})]})),Yt=Object.freeze(Object.defineProperty({__proto__:null,BlogShell:Se,default:Wt},Symbol.toStringTag,{value:"Module"}));export{Pe as A,Se as B,Ne as C,Yt as a,Ft as g};
