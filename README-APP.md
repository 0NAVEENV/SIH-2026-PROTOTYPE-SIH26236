# Packwise AI

> **AI-Powered Smart Food Packaging Recommendation Platform**

Packwise AI is a full-stack intelligent packaging decision-support platform that helps users select suitable packaging materials for food commodities using AI/ML, scientific analysis, OCR, sustainability analysis, cost comparison, analytics, and recommendation history.

## 🚀 Features

- 🤖 **AI Packaging Recommendation** — ranks packaging materials using suitability, barrier compatibility, shelf-life prediction, cost, and sustainability.
- 🔬 **Scientific Analysis** — evaluates temperature, humidity, moisture, pH, water activity, respiration rate, OTR, and WVTR.
- 📷 **OCR Scanner** — extracts text from food/packaging images using Tesseract OCR and Pillow.
- 📜 **Recommendation History** — stores and displays previous recommendations.
- 📦 **Packaging Library** — explore material properties such as OTR, WVTR, cost, sustainability, and protection.
- 🌱 **Sustainability Analysis** — compare environmental characteristics and greener alternatives.
- 💰 **Cost Analysis** — compare packaging cost and alternatives.
- 📊 **Analytics** — visualize recommendation, risk, material, shelf-life, cost, and sustainability data.
- 🛠️ **Admin Panel** — manage commodities and packaging materials.
- ❤️ **System Health** — monitor API, database, AI model, and OCR availability.
- 📱 **Responsive UI** — designed for desktop, tablet, and mobile.

## 🧰 Technology Stack

### Frontend
- Flutter or React/TypeScript/Vite depending on the deployed client
- Responsive UI
- REST API integration
- Charting support

### Backend
- Python
- FastAPI
- Pydantic
- SQLAlchemy
- Uvicorn

### AI/ML
- Python
- NumPy
- scikit-learn
- XGBoost

### OCR
- Tesseract OCR
- pytesseract
- Pillow

### Database
- SQLite for local development
- PostgreSQL recommended for production

## 🏗️ Architecture

```text
User
  │
  ▼
Packwise Frontend
  │ REST API
  ▼
FastAPI Backend
  ├── Recommendation Engine
  ├── Scientific Engine
  ├── AI/ML Pipeline
  ├── OCR Service
  ├── History
  ├── Commodity APIs
  └── Admin APIs
       │
       ├── SQLAlchemy → SQLite/PostgreSQL
       ├── XGBoost/ML models
       └── Tesseract OCR
```

## 📁 Recommended Structure

```text
packwise/
├── frontend/
├── backend/
│   └── app/
│       ├── core_engine/
│       │   ├── ml_pipeline.py
│       │   ├── recommendation_engine.py
│       │   └── scientific_engine.py
│       ├── routers/
│       │   ├── scanner.py
│       │   ├── recommendations.py
│       │   ├── history.py
│       │   └── ...
│       ├── models.py
│       ├── schemas.py
│       ├── database.py
│       └── main.py
├── models/
├── uploads/
├── .env.example
└── README.md
```

## ⚙️ Backend Setup

### 1. Check Python

```bash
python3 --version
```

Python 3.10+ is recommended.

### 2. Create a virtual environment

```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

## 📷 Install Tesseract OCR

Ubuntu/Debian:

```bash
sudo apt update
sudo apt install tesseract-ocr
```

Verify:

```bash
tesseract --version
```

## 🔐 Environment

Create `.env`:

```env
DATABASE_URL=sqlite:///./packwise.db
SECRET_KEY=change-this-secret
CORS_ORIGINS=http://localhost:5173
```

Use a strong secret and PostgreSQL in production.

## ▶️ Start Backend

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

API:

```text
http://localhost:8000
```

Swagger documentation:

```text
http://localhost:8000/docs
```

## 🌐 Frontend Configuration

For a Vite client:

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

When using a physical phone against a development server, replace `localhost` with the Ubuntu computer's LAN IP.

Example:

```env
VITE_API_BASE_URL=http://YOUR_UBUNTU_IP:8000/api/v1
```

Never hard-code the development IP throughout the application.

## ▶️ Start Frontend

```bash
cd frontend
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## 🔌 API Endpoints

Base path:

```text
/api/v1
```

### Health

```http
GET /api/v1/health
```

### Commodities

```http
GET /api/v1/commodities
```

### Create Commodity

```http
POST /api/v1/admin/commodities
```

Example:

```json
{
  "name": "Mango",
  "category": "Fruit",
  "moisture_content": 65.0,
  "ph": 4.5,
  "water_activity": 0.90,
  "respiration_rate": 2.5
}
```

### Recommendation

```http
POST /api/v1/recommendations
```

Request:

```json
{
  "commodity_id": 1,
  "temp": 25,
  "rh": 60,
  "shelf_life": 30,
  "weight_kg": 1
}
```

Typical result information includes:

```json
{
  "material": "LDPE Film",
  "suitability_score": 68.4,
  "predicted_shelf_life": 26.5,
  "spoilage_risk": "Low",
  "model_status": "Active"
}
```

### History

```http
GET /api/v1/history
```

Example:

```json
{
  "success": true,
  "count": 1,
  "history": [
    {
      "id": 1,
      "commodity": "Apple",
      "material": "LDPE Film",
      "temperature": 25.0,
      "relative_humidity": 60.0,
      "requested_shelf_life": 30,
      "weight_kg": 1.0,
      "predicted_shelf_life": 26.5,
      "suitability_score": 68.4,
      "risk_level": "Low",
      "created_at": "2026-09-10T16:24:32"
    }
  ]
}
```

### OCR

```http
POST /api/v1/scanner/ocr
```

Request type:

```text
multipart/form-data
```

Field:

```text
file
```

Supported:

```text
JPG
JPEG
PNG
WEBP
```

Response:

```json
{
  "success": true,
  "text": "Extracted packaging text..."
}
```

## 🧠 Recommendation Engine

A representative weighted ranking is:

```text
Barrier Fit        30%
AI Suitability     40%
Cost               15%
Sustainability     15%
────────────────────────
Final Score        100%
```

The engine evaluates candidate packaging materials and ranks them.

The application should expose the factors behind the score so the recommendation is interpretable.

## 🔬 Scientific Parameters

| Parameter | Purpose |
|---|---|
| Temperature | Influences degradation and shelf life |
| Relative Humidity | Influences moisture transfer |
| pH | Characterizes commodity stability |
| Moisture Content | Indicates moisture sensitivity |
| Water Activity | Indicates microbial/spoilage potential |
| Respiration Rate | Indicates gas-exchange requirements |
| OTR | Oxygen barrier requirement |
| WVTR | Water-vapor barrier requirement |

## 📦 Example Packaging Materials

- LDPE Film
- HDPE
- BOPP Film
- PET
- PP
- Paper
- Cardboard
- Vacuum Packaging
- Modified Atmosphere Packaging
- Biodegradable Film

## 🍎 Example Commodities

- Apple
- Banana
- Mango
- Tomato
- Potato
- Onion
- Carrot
- Strawberry
- Orange
- Grapes
- Cucumber
- Spinach
- Lettuce
- Papaya

## 📊 Dashboard

The dashboard can display:

- Total recommendations
- Average AI suitability
- Average predicted shelf life
- Low-risk recommendations
- Sustainability score
- Recommendation trends
- Material distribution
- Risk distribution
- Shelf-life predictions

## 📷 OCR Workflow

```text
Upload Image
    ↓
Validate Image
    ↓
Preprocess with Pillow
    ↓
Tesseract OCR
    ↓
Extract Text
    ↓
Detect Product Information
    ↓
Edit Information
    ↓
Use for Recommendation
```

## 🤖 Recommendation Workflow

```text
Select Commodity
    ↓
Enter Storage Conditions
    ↓
Scientific Analysis
    ↓
AI/ML Prediction
    ↓
Packaging Ranking
    ↓
Best Material
    ↓
Compare Alternatives
    ↓
Save Recommendation
    ↓
History
```

## 🛡️ Security

Production deployments should include:

- Strong secret keys
- Password hashing
- Authentication
- Role-based authorization
- Restricted CORS
- File type validation
- File size limits
- Safe uploads
- Environment-based secrets
- HTTPS
- SQLAlchemy parameterized database operations

Never commit `.env` or secrets to Git.

## 🧪 Testing

Run backend tests with:

```bash
pytest
```

Test at minimum:

```text
Health
Commodities
Commodity creation
Recommendation generation
Recommendation persistence
History
OCR
Admin operations
```

Also test frontend navigation, forms, loading states, API errors, recommendation flow, history, OCR, and responsive layouts.

## 📱 Physical Phone Development

A physical phone cannot use the Ubuntu computer's `localhost`.

Start FastAPI with:

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

Find the Ubuntu IP:

```bash
hostname -I
```

If UFW is enabled:

```bash
sudo ufw allow 8000/tcp
```

Verify port 8000:

```bash
ss -tlnp | grep 8000
```

Then configure the client with the Ubuntu LAN IP.

## 🐳 Production

For production, use:

```text
Reverse Proxy
      │
      ├── Frontend
      │
      └── FastAPI
             │
             ▼
         PostgreSQL
```

Recommended production improvements:

- PostgreSQL
- HTTPS
- Reverse proxy
- Secure secrets
- Persistent uploads
- Database migrations
- Authentication
- Monitoring
- Backups

## 🏆 Hackathon Value

Packwise AI combines:

```text
Artificial Intelligence
        +
Machine Learning
        +
OCR / Computer Vision
        +
Food Science
        +
Packaging Science
        +
Sustainability
        +
Cost Optimization
        +
Analytics
```

The goal is not merely to recommend packaging, but to provide an interpretable decision-support system explaining why a packaging material is appropriate.

## ⚠️ Disclaimer

Packwise AI is a decision-support and research-oriented platform. AI predictions and scientific calculations should be validated with appropriate laboratory testing, packaging standards, regulatory requirements, and domain-expert review before commercial food-safety or regulatory use.

## 🔮 Future Enhancements

- IoT temperature/humidity monitoring
- Advanced computer vision
- Carbon-footprint estimation
- Supplier marketplace
- Packaging price APIs
- Multi-language support
- Cloud deployment
- Mobile applications
- Batch tracking
- PDF report generation
- Enterprise dashboards
- Advanced predictive shelf-life models

---

## ⭐ Packwise AI

**Smarter Packaging. Longer Shelf Life. Less Waste.**
