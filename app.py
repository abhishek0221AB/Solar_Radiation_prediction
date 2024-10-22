from flask import Flask, render_template, request, jsonify
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split

app = Flask(__name__)

# Load and prepare the data
df = pd.read_csv("Data_solar_Radiation.csv")
df = df.drop(['UNIXTime', 'TimeSunRise', 'TimeSunSet'], axis=1)

# Prepare features and target
X = df[['Temperature', 'Pressure', 'Humidity', 'WindDirection', 'Speed']].values
y = df['Radiation'].values

# Train the model
RF_model = RandomForestRegressor(random_state=42)
RF_model.fit(X, y)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    features = [float(request.form[f]) for f in ['temp', 'pressure', 'humidity', 'windDirection', 'speed']]
    prediction = RF_model.predict([features])[0]
    return jsonify({'radiation': round(prediction, 2)})

if __name__ == '__main__':
    app.run(debug=True)