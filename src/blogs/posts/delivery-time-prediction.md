---
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

**Feature scaling.** For scale-sensitive models (Linear Regression, KNN) I applied `StandardScaler`. For tree-based models (Random Forest, LightGBM) scaling was skipped, since they're scale-invariant.

All of this was modularized with a `ColumnTransformer`, making it easy to reuse across models and pipelines.

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

- Base models: `RandomForestRegressor`, `LGBMRegressor`
- Meta-model: `LinearRegression`

The base models make predictions; the meta-model learns how to best blend them into a final output.

Why it worked:

- Random Forest captured complex interactions with stability
- LightGBM handled large feature sets and missing values efficiently
- Linear Regression served as a fast, interpretable meta-model
- Together they covered each other's weaknesses and produced consistently lower MAE than any individual model

I used `sklearn.ensemble.StackingRegressor` and wrapped the entire stack, preprocessing plus prediction, into a single pipeline, so it runs on raw input with no extra glue code.

## Model Tracking, Versioning & Deployment

Building a good model is only half the journey. The other half is making it usable, reproducible, and accessible.

**Version control with DVC.** Tracked raw and processed datasets, versioned trained models, kept data out of Git via `.dvc` files, and made results reproducible across environments.

**Experiment tracking with DagsHub.** A Git + DVC platform for versioned logs of experiments, metrics, and model changes, plus a dashboard to compare performance over time. This was especially helpful when tuning or trying different imputation strategies.

**Backend with FastAPI.** The trained pipeline was saved with `joblib` and served through FastAPI:

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
