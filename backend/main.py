import os
import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

# Determine absolute path to the directory containing this script
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load saved model, scaler, and expected columns
try:
    model = joblib.load(os.path.join(BASE_DIR, "knn_heart_model.pkl"))
    scaler = joblib.load(os.path.join(BASE_DIR, "heart_scaler.pkl"))
    expected_columns = joblib.load(os.path.join(BASE_DIR, "heart_columns.pkl"))
except Exception as e:
    print(f"Error loading model artifacts: {e}")
    # In case loading fails during server startup, print traceback but don't crash
    model = None
    scaler = None
    expected_columns = None

app = FastAPI(
    title="Heart Stroke Prediction API",
    description="API to predict heart stroke/disease risk based on clinical parameters",
    version="1.0.0"
)

# Configure CORS so the frontend can securely communicate with it
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class HeartPredictionInput(BaseModel):
    Age: int = Field(..., ge=18, le=100, description="Age of the patient")
    Sex: str = Field(..., description="Sex of the patient (M/F)")
    ChestPainType: str = Field(..., description="Chest pain type (ATA/NAP/TA/ASY)")
    RestingBP: float = Field(..., ge=60, le=250, description="Resting blood pressure in mm Hg")
    Cholesterol: float = Field(..., ge=0, le=700, description="Cholesterol in mg/dL")
    FastingBS: int = Field(..., description="Fasting blood sugar > 120 mg/dL (1=True, 0=False)")
    RestingECG: str = Field(..., description="Resting ECG results (Normal/ST/LVH)")
    MaxHR: float = Field(..., ge=60, le=230, description="Maximum heart rate achieved")
    ExerciseAngina: str = Field(..., description="Exercise-induced angina (Y/N)")
    Oldpeak: float = Field(..., description="ST depression induced by exercise relative to rest")
    ST_Slope: str = Field(..., description="The slope of the peak exercise ST segment (Up/Flat/Down)")

@app.get("/")
def read_root():
    return {
        "status": "online",
        "message": "Heart Health Predictor API is running. Send POST to /predict.",
        "model_loaded": model is not None
    }

@app.post("/predict")
def predict(data: HeartPredictionInput):
    if model is None or scaler is None or expected_columns is None:
        raise HTTPException(
            status_code=503, 
            detail="Prediction model artifacts are not loaded. Please check backend configuration."
        )
    
    try:
        # Construct raw input mapping matching original training logic
        raw_input = {
            'Age': data.Age,
            'RestingBP': data.RestingBP,
            'Cholesterol': data.Cholesterol,
            'FastingBS': data.FastingBS,
            'MaxHR': data.MaxHR,
            'Oldpeak': data.Oldpeak,
            'Sex_' + data.Sex: 1,
            'ChestPainType_' + data.ChestPainType: 1,
            'RestingECG_' + data.RestingECG: 1,
            'ExerciseAngina_' + data.ExerciseAngina: 1,
            'ST_Slope_' + data.ST_Slope: 1
        }
        
        # Create input dataframe
        input_df = pd.DataFrame([raw_input])
        
        # Fill in missing columns with 0s
        for col in expected_columns:
            if col not in input_df.columns:
                input_df[col] = 0
                
        # Reorder columns to match expected model features
        input_df = input_df[expected_columns]
        
        # Scale the inputs
        scaled_input = scaler.transform(input_df)
        
        # Predict
        prediction = int(model.predict(scaled_input)[0])
        
        return {
            "prediction": prediction,
            "risk": "High Risk" if prediction == 1 else "Low Risk"
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred during prediction: {str(e)}"
        )