# SIH-2026-PROTOTYPE-SIH26236
Packwise — AI-powered food packaging recommendation system that analyzes food properties and storage conditions to recommend suitable packaging materials, barrier specifications, MAP requirements, and sustainable alternatives.

# 🥫 Packwise AI

### AI-Based Intelligent Food Packaging Material Recommendation System

> **Smart Packaging. Longer Shelf Life. Less Food Waste.**

## 📌 SIH 2026 Problem Statement

Packaging plays a crucial role in maintaining the **quality, safety, and shelf life of food commodities** during storage, transportation, and distribution.

Different food commodities require different packaging materials depending on their **moisture content, oil/fat content, pH, respiration rate, oxygen sensitivity, storage conditions, and desired shelf life**.

Improper packaging selection can lead to:

* 💧 Moisture absorption
* 🫧 Oxygen-induced oxidation
* 🦠 Microbial spoilage
* 📉 Texture degradation
* 🧪 Nutrient loss
* ⏳ Reduced shelf life
* 🗑️ Increased food wastage

Currently, packaging material selection often depends on **manual analysis, trial-and-error, or expert knowledge**, making the process difficult and expensive for small food industries, startups, farmers, and local manufacturers.

### 💡 Our Solution

**Packwise AI** is an intelligent web-based decision-support system that recommends suitable **food packaging materials and packaging configurations** based on the characteristics of a food commodity.

The system analyzes the user's inputs and evaluates important packaging requirements such as:

* Oxygen transmission
* Water vapour transmission
* Moisture sensitivity
* Fat/oil sensitivity
* Food acidity
* Respiration rate
* Storage conditions
* Required shelf life

It then provides a ranked packaging recommendation along with the reasoning behind the recommendation.

---

## 🎯 Objectives

1. Develop an intelligent packaging material recommendation system.
2. Reduce dependency on manual trial-and-error selection.
3. Help small food businesses and farmers make informed packaging decisions.
4. Improve food quality and shelf life.
5. Reduce food losses caused by inappropriate packaging.
6. Provide an easy-to-use web interface for packaging analysis.
7. Create a scalable platform that can incorporate AI/ML models in the future.

---

## 🚀 Key Features

### 1. 🧾 Commodity Input

Users can enter important characteristics of the food commodity:

* Commodity type
* Moisture content
* Oil/Fat content
* pH
* Respiration rate
* Desired shelf life
* Storage temperature
* Storage conditions

### 2. 🧠 Intelligent Recommendation

OptiWrap evaluates the input parameters and recommends suitable packaging materials based on their properties.

### 3. 📦 Packaging Material Database

The system can maintain information about materials such as:

* LDPE
* HDPE
* PET
* Metalized films
* Aluminium foil laminates
* Biodegradable PLA

### 4. 💧 WVTR Analysis

**Water Vapour Transmission Rate (WVTR)** is considered when determining the moisture-barrier requirements of the packaging.

### 5. 🌬️ OTR Analysis

**Oxygen Transmission Rate (OTR)** is considered for products that are sensitive to oxidation or require controlled oxygen transfer.

### 6. 🍎 Respiration Analysis

For fresh fruits and vegetables, OptiWrap considers respiration characteristics and the need for appropriate **O₂/CO₂ exchange**.

### 7. 🏆 Ranked Recommendations

Instead of providing only one material, the system can display multiple suitable options ranked according to their compatibility.

Example:

| Rank | Material                 | Compatibility | Main Reason                         |
| ---- | ------------------------ | ------------: | ----------------------------------- |
| 🥇 1 | PET + Aluminium Laminate |           94% | Excellent oxygen & moisture barrier |
| 🥈 2 | Metalized Film           |           89% | Strong barrier properties           |
| 🥉 3 | HDPE                     |           76% | Good moisture resistance            |

### 8. 📊 Explainable Results

The system explains **why** a particular material was recommended instead of simply displaying a prediction.

---

## 🔬 Packaging Materials

| Material                    | Key Property                 | Typical Advantage                        |
| --------------------------- | ---------------------------- | ---------------------------------------- |
| **LDPE**                    | Flexible, moisture resistant | Good for moisture-sensitive applications |
| **HDPE**                    | Strong moisture barrier      | Durable and economical                   |
| **PET**                     | Strength & clarity           | Good mechanical and barrier properties   |
| **Metalized Film**          | High barrier                 | Reduces oxygen and moisture transmission |
| **Aluminium Foil Laminate** | Excellent barrier            | Suitable for highly sensitive products   |
| **PLA**                     | Biodegradable                | Sustainable packaging applications       |

> Material suitability depends on the commodity and operating conditions; the system uses these properties as part of its recommendation logic.

---

## 🧠 Recommendation Workflow

```text
                    ┌──────────────────┐
                    │   User Input     │
                    │ Food Commodity   │
                    └────────┬─────────┘
                             ↓
                 ┌────────────────────────┐
                 │ Commodity Characteristics│
                 │ Moisture • pH • Fat     │
                 │ Respiration • Shelf Life│
                 └───────────┬────────────┘
                             ↓
                 ┌────────────────────────┐
                 │ Packaging Requirements │
                 │ WVTR • OTR • Barriers  │
                 └───────────┬────────────┘
                             ↓
                 ┌────────────────────────┐
                 │ Material Evaluation    │
                 │ LDPE • HDPE • PET      │
                 │ Metalized • Foil • PLA │
                 └───────────┬────────────┘
                             ↓
                 ┌────────────────────────┐
                 │ Recommendation Engine  │
                 └───────────┬────────────┘
                             ↓
                 ┌────────────────────────┐
                 │ Ranked Recommendations │
                 │ + Explanation          │
                 └────────────────────────┘
```

---

## 🏗️ System Architecture

```text
┌───────────────┐
│     User      │
└───────┬───────┘
        ↓
┌──────────────────────┐
│    Web Interface     │
│     HTML/CSS/JS      │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│    Backend / API     │
│     Node.js          │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Recommendation Engine│
│   Rules / AI / ML    │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Packaging Material   │
│      Database        │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Recommendation +     │
│ Explanation          │
└──────────────────────┘
```

---

## 💻 Technology Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* Responsive UI

### Backend

* Node.js
* Express.js

### Database

* JSON / MongoDB / SQLite *(depending on implementation)
Intelligence Layer
Rule-based recommendation engine
Scoring system
AI/ML model integration (future enhancement)
Development Tools
Git
GitHub
VS Code
npm
📁 Project Structure
Packwise AI/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── assets/
│
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   └── data/
│
├── database/
│   └── materials.json
│
├── docs/
│   └── research/
│
├── README.md
├── package.json
└── .gitignore
🌱 Expected Impact
For Farmers
Better packaging decisions
Reduced post-harvest losses
Improved product quality
For Small Food Businesses
Reduced dependence on expensive consultancy
Faster packaging selection
Better shelf-life management
For Startups
Data-driven packaging decisions
Easy-to-use digital tool
Reduced experimentation costs
For the Environment
Reduced food wastage
Better utilization of packaging materials
Potential support for sustainable alternatives
🔮 Future Scope
AI/ML-based prediction model
Real-time packaging optimization
Cost-based material recommendation
Carbon-footprint comparison
Sustainability scoring
MAP gas composition recommendation
IoT-based storage monitoring
QR-based packaging information
Regional climate-aware recommendations
Integration with laboratory packaging data
👥 Team
SIH 2026 Team — Nexora

Project: Packwise AI
Theme: Smart Food Packaging
Platform: Web Application

📜 Disclaimer

Packwise AI is intended as a decision-support and educational prototype. Packaging recommendations should be validated against applicable food-contact regulations, laboratory testing, product-specific shelf-life studies, and expert packaging knowledge before commercial deployment.

⭐ Vision

Packwise AI aims to make intelligent packaging selection accessible, data-driven, and sustainable — helping businesses protect food quality while reducing avoidable food waste.

Made for Smart India Hackathon 2026 🇮🇳

Nexora × Packwise
# Packwise AI Backend

TypeScript/Node.js backend using Express, tRPC, Drizzle ORM, database helpers, authentication, OCR parsing, deterministic packaging recommendations, analytics, history, and tests.

Install dependencies with `pnpm install` and run the project with `pnpm dev` from the complete project root. Configure the required environment variables separately; do not commit secrets.
