# Heart Health Predictor 🩺❤️

An AI-powered clinical assessment application designed to predict the risk of heart disease/stroke based on patient clinical parameters. The system is built with a decoupled architecture featuring a modern, high-performance React frontend and a FastAPI backend serving a K-Nearest Neighbors (KNN) classification model.

---

## 🏗️ Architecture Overview

The project is divided into two primary services:

1. **Frontend (`/frontend`)**:
   - Built on **React 19** and **TanStack Start** for server-side rendering (SSR) and seamless routing.
   - Styled with Tailwind CSS, utilizing Framer Motion for high-fidelity animations, micro-interactions, and visual feedback.
   - Axios-driven state management to request predictions from the ML backend.

2. **Backend (`/backend`)**:
   - Powered by **FastAPI** for fast, asynchronous request handling and automated Swagger UI (`/docs`).
   - Serves a trained **KNN classification model** (`knn_heart_model.pkl`), loaded along with a pre-trained `StandardScaler` and feature columns mapping.
   - Configured with CORS middleware to support local and production origin access.

---

## 📂 Directory Structure

```directory
heart-health-predictor/
├── backend/
│   ├── main.py                  # FastAPI server and prediction pipeline
│   ├── requirements.txt         # Python dependencies
│   ├── knn_heart_model.pkl      # Trained K-Nearest Neighbors model
│   ├── heart_scaler.pkl         # Fitted StandardScaler object
│   └── heart_columns.pkl        # Expected feature columns for one-hot encoding
└── frontend/
    ├── src/
    │   ├── components/          # Reusable UI components (Form, Result Cards, etc.)
    │   ├── routes/              # TanStack router layout and index page
    │   ├── server.ts            # SSR entry point and error wrapper
    │   └── styles.css           # Styling tokens and Tailwind integration
    ├── package.json             # Node dependencies and scripts
    └── tsconfig.json            # TypeScript configuration
```

---

## 🚀 Getting Started

Follow these steps to run the complete stack locally:

### 1. Start the Backend

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install Python dependencies:
   ```bash
   python3 -m pip install -r requirements.txt
   ```
3. Run the Uvicorn server:
   ```bash
   python3 -m uvicorn main:app --port 8000 --reload
   ```
   *The backend will be running at [http://localhost:8000](http://localhost:8000). You can access the auto-generated documentation and test endpoints at [http://localhost:8000/docs](http://localhost:8000/docs).*

### 2. Start the Frontend

1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Launch the development server:
   ```bash
   npm run dev
   ```
   *The frontend will start on an open port (typically [http://localhost:8080](http://localhost:8080) or similar, check output logs for the exact port).*

---

## 🔌 API Reference

### Predict Risk

- **Endpoint**: `POST /predict`
- **Content-Type**: `application/json`
- **Request Body Schema**:

```json
{
  "Age": 45,
  "Sex": "M",
  "ChestPainType": "ATA",
  "RestingBP": 120,
  "Cholesterol": 200,
  "FastingBS": 0,
  "RestingECG": "Normal",
  "MaxHR": 150,
  "ExerciseAngina": "N",
  "Oldpeak": 1.0,
  "ST_Slope": "Up"
}
```

#### Valid Parameter Options:
*   `Sex`: `"M"`, `"F"`
*   `ChestPainType`: `"ATA"` (Atypical Angina), `"NAP"` (Non-Anginal Pain), `"TA"` (Typical Angina), `"ASY"` (Asymptomatic)
*   `RestingECG`: `"Normal"`, `"ST"` (ST-T abnormality), `"LVH"` (Left Ventricular Hypertrophy)
*   `ExerciseAngina`: `"Y"`, `"N"`
*   `ST_Slope`: `"Up"`, `"Flat"`, `"Down"`

- **Success Response**:

```json
{
  "prediction": 0,
  "risk": "Low Risk"
}
```

---

## 🧠 ML Inference Details

When a request arrives at `/predict`, the backend performs the following steps:
1. Translates categorical string values (e.g., `Sex`, `ChestPainType`) into one-hot encoded columns matching the format expected by the model.
2. Pads missing dummy columns with `0`s and reorders columns to align perfectly with `heart_columns.pkl`.
3. Standardizes features using the fitted scaler in `heart_scaler.pkl`.
4. Runs inference using the KNN classifier in `knn_heart_model.pkl` to compute the prediction.
# HeartDiseasePredictor
