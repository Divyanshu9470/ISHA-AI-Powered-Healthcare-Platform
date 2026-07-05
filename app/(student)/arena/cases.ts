export interface ClinicalCase {
  id: string;
  patient: string;
  vitals: string;
  symptoms: string[];
  options: string[];
  answer: number;
}

export const clinicalCases: ClinicalCase[] = [
  {
    "id": "CASE-0921",
    "patient": "John D., 55M",
    "vitals": "BP 85/50 • HR 120 • O2 92%",
    "symptoms": [
      "Sudden onset 'tearing' chest pain",
      "Pain radiates to the back",
      "Asymmetric blood pressure in arms",
      "Widened mediastinum on CXR"
    ],
    "options": [
      "Myocardial Infarction",
      "Aortic Dissection",
      "Pulmonary Embolism",
      "Tension Pneumothorax"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1102",
    "patient": "Arthur P., 68M",
    "vitals": "BP 90/60 • HR 45 • O2 95%",
    "symptoms": [
      "Crushing substernal chest pain",
      "Diaphoresis and nausea",
      "Pain radiating to left jaw",
      "ECG shows ST elevation in II, III, aVF"
    ],
    "options": [
      "Inferior STEMI",
      "Anterior STEMI",
      "Pericarditis",
      "Costochondritis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-3310",
    "patient": "Maria Garcia, 42F",
    "vitals": "BP 110/70 • HR 115 • O2 98%",
    "symptoms": [
      "Palpitations starting abruptly",
      "Lightheadedness",
      "ECG shows narrow complex tachycardia",
      "No P waves visible"
    ],
    "options": [
      "Atrial Fibrillation",
      "Supraventricular Tachycardia (SVT)",
      "Ventricular Tachycardia",
      "Sinus Tachycardia"
    ],
    "answer": 1
  },
  {
    "id": "CASE-4421",
    "patient": "Leon S., 72M",
    "vitals": "BP 140/90 • HR 88 • O2 93%",
    "symptoms": [
      "Progressive shortness of breath",
      "Waking up gasping for air at night",
      "Bilateral pitting edema in legs",
      "S3 gallop on auscultation"
    ],
    "options": [
      "Congestive Heart Failure",
      "COPD Exacerbation",
      "Pulmonary Fibrosis",
      "Cor Pulmonale"
    ],
    "answer": 0
  },
  {
    "id": "CASE-5590",
    "patient": "Emily R., 22F",
    "vitals": "BP 105/65 • HR 90 • O2 99%",
    "symptoms": [
      "Sharp chest pain that worsens on inspiration",
      "Pain improves when leaning forward",
      "Recent viral URI",
      "Friction rub heard on auscultation"
    ],
    "options": [
      "Myocardial Infarction",
      "Pulmonary Embolism",
      "Acute Pericarditis",
      "Gastroesophageal Reflux"
    ],
    "answer": 2
  },
  {
    "id": "CASE-0234",
    "patient": "Kevin B., 34M",
    "vitals": "BP 120/80 • HR 110 • O2 88%",
    "symptoms": [
      "Sudden onset shortness of breath",
      "Sharp pleuritic chest pain",
      "Recent long-haul flight from Tokyo",
      "Right leg swelling"
    ],
    "options": [
      "Pneumonia",
      "Asthma Exacerbation",
      "Pulmonary Embolism",
      "Pneumothorax"
    ],
    "answer": 2
  },
  {
    "id": "CASE-0288",
    "patient": "Sam T., 19M",
    "vitals": "BP 115/75 • HR 125 • O2 90%",
    "symptoms": [
      "Sudden severe dyspnea while playing basketball",
      "Tall, thin body habitus",
      "Decreased breath sounds on the right",
      "Hyperresonance to percussion on right"
    ],
    "options": [
      "Spontaneous Pneumothorax",
      "Asthma Attack",
      "Pulmonary Embolism",
      "Cardiac Tamponade"
    ],
    "answer": 0
  },
  {
    "id": "CASE-0312",
    "patient": "Clara H., 65F",
    "vitals": "BP 130/85 • HR 95 • Temp 39.2C • O2 91%",
    "symptoms": [
      "Productive cough with rust-colored sputum",
      "Chills and rigors",
      "Dullness to percussion at right lung base",
      "Bronchial breath sounds present"
    ],
    "options": [
      "Lobar Pneumonia",
      "Tuberculosis",
      "Lung Cancer",
      "Pulmonary Edema"
    ],
    "answer": 0
  },
  {
    "id": "CASE-0450",
    "patient": "David L., 12M",
    "vitals": "BP 100/60 • HR 120 • O2 92%",
    "symptoms": [
      "Wheezing on expiration",
      "Use of accessory respiratory muscles",
      "Prolonged expiratory phase",
      "History of atopy/eczema"
    ],
    "options": [
      "Foreign Body Aspiration",
      "Asthma Exacerbation",
      "Croup",
      "Epiglottitis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-0923",
    "patient": "Robert T., 65M",
    "vitals": "BP 160/90 • HR 88 • O2 96%",
    "symptoms": [
      "Sudden right-sided weakness",
      "Difficulty speaking (expressive aphasia)",
      "Facial droop sparing the forehead",
      "Symptoms started 45 minutes ago"
    ],
    "options": [
      "Ischemic Stroke (MCA)",
      "Hemorrhagic Stroke",
      "Bell's Palsy",
      "Complex Partial Seizure"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1044",
    "patient": "Linda W., 52F",
    "vitals": "BP 180/100 • HR 90 • O2 97%",
    "symptoms": [
      "'Worst headache of my life'",
      "Sudden onset during exercise",
      "Photophobia and neck stiffness",
      "Nausea and vomiting"
    ],
    "options": [
      "Migraine",
      "Subarachnoid Hemorrhage",
      "Meningitis",
      "Tension Headache"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1188",
    "patient": "Alice C., 28F",
    "vitals": "BP 110/70 • HR 75 • Temp 39.0C",
    "symptoms": [
      "Severe headache",
      "Fever and chills",
      "Neck stiffness (nuchal rigidity)",
      "Positive Brudzinski's sign"
    ],
    "options": [
      "Viral Encephalitis",
      "Subarachnoid Hemorrhage",
      "Bacterial Meningitis",
      "Brain Abscess"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1250",
    "patient": "Tom N., 45M",
    "vitals": "BP 125/80 • HR 80 • O2 98%",
    "symptoms": [
      "Unilateral facial weakness",
      "Unable to close right eye",
      "Unable to wrinkle right forehead",
      "Drooling from right side of mouth"
    ],
    "options": [
      "Stroke",
      "Bell's Palsy",
      "Trigeminal Neuralgia",
      "Myasthenia Gravis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-0922",
    "patient": "Sarah M., 28F",
    "vitals": "BP 110/70 • HR 95 • Temp 38.5C",
    "symptoms": [
      "Right lower quadrant abdominal pain",
      "Nausea and vomiting",
      "Pain started around the umbilicus",
      "Rebound tenderness at McBurney's point"
    ],
    "options": [
      "Ectopic Pregnancy",
      "Ovarian Torsion",
      "Acute Appendicitis",
      "Kidney Stone"
    ],
    "answer": 2
  },
  {
    "id": "CASE-2033",
    "patient": "Frank O., 50M",
    "vitals": "BP 140/85 • HR 105 • Temp 38.8C",
    "symptoms": [
      "Severe right upper quadrant pain",
      "Pain radiates to right shoulder",
      "Positive Murphy's sign",
      "History of gallstones"
    ],
    "options": [
      "Acute Cholecystitis",
      "Acute Pancreatitis",
      "Peptic Ulcer Disease",
      "Hepatitis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-2101",
    "patient": "Gary V., 42M",
    "vitals": "BP 90/60 • HR 115 • O2 98%",
    "symptoms": [
      "Severe epigastric pain radiating to the back",
      "Vomiting uncontrollably",
      "History of heavy alcohol use",
      "Cullen's sign (periumbilical bruising)"
    ],
    "options": [
      "Perforated Ulcer",
      "Acute Pancreatitis",
      "Mesenteric Ischemia",
      "Aortic Aneurysm Rupture"
    ],
    "answer": 1
  },
  {
    "id": "CASE-2255",
    "patient": "Henry D., 70M",
    "vitals": "BP 100/65 • HR 100 • Temp 38.2C",
    "symptoms": [
      "Left lower quadrant abdominal pain",
      "Fever",
      "Changes in bowel habits",
      "Tender palpable mass in LLQ"
    ],
    "options": [
      "Appendicitis",
      "Acute Diverticulitis",
      "Colon Cancer",
      "Ulcerative Colitis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-3011",
    "patient": "Jessica L., 24F",
    "vitals": "BP 85/50 • HR 125 • Temp 37.0C",
    "symptoms": [
      "Sudden severe unilateral pelvic pain",
      "Vaginal spotting",
      "Missed menstrual period by 2 weeks",
      "Dizziness and shoulder pain"
    ],
    "options": [
      "Ovarian Torsion",
      "Ruptured Ectopic Pregnancy",
      "Pelvic Inflammatory Disease",
      "Endometriosis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-3120",
    "patient": "Mark S., 35M",
    "vitals": "BP 130/80 • HR 100 • O2 99%",
    "symptoms": [
      "Sudden, excruciating flank pain",
      "Pain radiates to the groin",
      "Hematuria (blood in urine)",
      "Pacing around the room, unable to sit still"
    ],
    "options": [
      "Pyelonephritis",
      "Testicular Torsion",
      "Nephrolithiasis (Kidney Stone)",
      "Appendicitis"
    ],
    "answer": 2
  },
  {
    "id": "CASE-3244",
    "patient": "Alex J., 16M",
    "vitals": "BP 115/75 • HR 110 • Temp 37.2C",
    "symptoms": [
      "Sudden severe scrotal pain",
      "High-riding testicle",
      "Absent cremasteric reflex",
      "Nausea and vomiting"
    ],
    "options": [
      "Epididymitis",
      "Testicular Torsion",
      "Inguinal Hernia",
      "Hydrocele"
    ],
    "answer": 1
  },
  {
    "id": "CASE-4022",
    "patient": "Rachel K., 19F",
    "vitals": "BP 90/55 • HR 130 • Temp 37.1C • RR 28",
    "symptoms": [
      "Nausea, vomiting, and abdominal pain",
      "Fruity breath odor",
      "Deep, rapid breathing (Kussmaul respirations)",
      "Blood glucose 450 mg/dL"
    ],
    "options": [
      "Diabetic Ketoacidosis (DKA)",
      "Hyperosmolar Hyperglycemic State",
      "Sepsis",
      "Salicylate Toxicity"
    ],
    "answer": 0
  },
  {
    "id": "CASE-4155",
    "patient": "Barbara W., 65F",
    "vitals": "BP 80/50 • HR 110 • Temp 39.5C",
    "symptoms": [
      "Confusion and lethargy",
      "Warm, flushed skin",
      "Decreased urine output",
      "WBC count 22,000"
    ],
    "options": [
      "Cardiogenic Shock",
      "Septic Shock",
      "Hypovolemic Shock",
      "Neurogenic Shock"
    ],
    "answer": 1
  },
  {
    "id": "CASE-4280",
    "patient": "Jim P., 40M",
    "vitals": "BP 110/70 • HR 120 (Tremor)",
    "symptoms": [
      "Weight loss despite increased appetite",
      "Heat intolerance",
      "Exophthalmos (bulging eyes)",
      "Palpitations and anxiety"
    ],
    "options": [
      "Hypothyroidism",
      "Pheochromocytoma",
      "Hyperthyroidism (Graves' Disease)",
      "Cushing's Syndrome"
    ],
    "answer": 2
  },
  {
    "id": "CASE-5010",
    "patient": "Motorcycle Rider, 25M",
    "vitals": "BP 70/40 • HR 140 • O2 85%",
    "symptoms": [
      "Severe chest trauma from steering wheel",
      "Distended neck veins (JVD)",
      "Muffled heart sounds",
      "Pulsus paradoxus"
    ],
    "options": [
      "Tension Pneumothorax",
      "Cardiac Tamponade",
      "Massive Hemothorax",
      "Flail Chest"
    ],
    "answer": 1
  },
  {
    "id": "CASE-5120",
    "patient": "Construction Worker, 30M",
    "vitals": "BP 80/40 • HR 130 • O2 88%",
    "symptoms": [
      "Fell from 2nd story roof",
      "Tracheal deviation to the left",
      "Absent breath sounds on the right",
      "Severe respiratory distress"
    ],
    "options": [
      "Cardiac Tamponade",
      "Tension Pneumothorax",
      "Pulmonary Contusion",
      "Aortic Rupture"
    ],
    "answer": 1
  },
  {
    "id": "CASE-5290",
    "patient": "Mary L., 75F",
    "vitals": "BP 130/80 • HR 85",
    "symptoms": [
      "Fell on outstretched hand (FOOSH)",
      "Pain in the wrist",
      "Dinner fork deformity of the forearm",
      "Numbness in fingers"
    ],
    "options": [
      "Smith's Fracture",
      "Colles' Fracture",
      "Scaphoid Fracture",
      "Galeazzi Fracture"
    ],
    "answer": 1
  },
  {
    "id": "CASE-6055",
    "patient": "Unknown, ~30M",
    "vitals": "BP 100/60 • HR 50 • O2 82% • RR 6",
    "symptoms": [
      "Found unresponsive in an alley",
      "Pinpoint pupils (Miosis)",
      "Severe respiratory depression",
      "Cyanosis around the lips"
    ],
    "options": [
      "Cocaine Overdose",
      "Benzodiazepine Overdose",
      "Opioid Overdose",
      "Alcohol Poisoning"
    ],
    "answer": 2
  },
  {
    "id": "CASE-6110",
    "patient": "Child, 4M",
    "vitals": "BP 90/60 • HR 130 • Temp 38.5C",
    "symptoms": [
      "Found open medicine cabinet",
      "Tinnitus (ringing in ears)",
      "Hyperventilation",
      "Vomiting and confusion"
    ],
    "options": [
      "Acetaminophen Toxicity",
      "Aspirin (Salicylate) Toxicity",
      "Iron Toxicity",
      "Lead Poisoning"
    ],
    "answer": 1
  },
  {
    "id": "CASE-6200",
    "patient": "Farmer, 45M",
    "vitals": "BP 90/50 • HR 45 • O2 90%",
    "symptoms": [
      "Excessive salivation and tearing",
      "Urination and defecation",
      "Muscle twitching",
      "Pinpoint pupils"
    ],
    "options": [
      "Organophosphate Poisoning",
      "Anticholinergic Toxicity",
      "Opioid Toxicity",
      "Carbon Monoxide Poisoning"
    ],
    "answer": 0
  },
  {
    "id": "CASE-7011",
    "patient": "Ethan H., 29M",
    "vitals": "BP 110/70 • HR 90 • Temp 39.8C",
    "symptoms": [
      "High fever and headache",
      "Rose spots on the abdomen",
      "Relative bradycardia",
      "Step-ladder pattern of fever"
    ],
    "options": [
      "Typhoid Fever",
      "Malaria",
      "Dengue Fever",
      "Leptospirosis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-7122",
    "patient": "Chloe S., 24F",
    "vitals": "BP 105/65 • HR 110 • Temp 39.0C",
    "symptoms": [
      "Sudden high fever",
      "Severe retro-orbital pain",
      "Extreme joint and muscle pain ('breakbone')",
      "Maculopapular rash"
    ],
    "options": [
      "Zika Virus",
      "Dengue Fever",
      "Chikungunya",
      "Yellow Fever"
    ],
    "answer": 1
  },
  {
    "id": "CASE-7233",
    "patient": "Marcus J., 32M",
    "vitals": "BP 115/75 • HR 85 • Temp 38.5C",
    "symptoms": [
      "Cyclical fever every 48 hours",
      "Splenomegaly",
      "Anemia and jaundice",
      "Recent travel to sub-Saharan Africa"
    ],
    "options": [
      "Malaria (P. falciparum)",
      "Malaria (P. vivax)",
      "Babesiosis",
      "Visceral Leishmaniasis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-8010",
    "patient": "Sophia G., 34F",
    "vitals": "BP 120/80 • HR 75",
    "symptoms": [
      "Malar rash (butterfly rash)",
      "Photosensitivity",
      "Joint pain and swelling",
      "Proteinuria on urinalysis"
    ],
    "options": [
      "Systemic Lupus Erythematosus",
      "Rosacea",
      "Dermatomyositis",
      "Rheumatoid Arthritis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-8155",
    "patient": "George K., 55M",
    "vitals": "BP 140/90 • HR 80",
    "symptoms": [
      "Sudden severe pain in the first MTP joint",
      "Joint is red, hot, and swollen",
      "History of high alcohol consumption",
      "Uric acid 9.5 mg/dL"
    ],
    "options": [
      "Pseudogout",
      "Septic Arthritis",
      "Acute Gouty Arthritis",
      "Osteoarthritis Exacerbation"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1001",
    "patient": "William N., 61M",
    "vitals": "BP 94/61 • HR 89 • O2 90%",
    "symptoms": [
      "Profuse diaphoresis, nausea, and shortness of breath",
      "Crushing retrosternal chest pain radiating to the left arm or jaw",
      "ECG showing ST-segment elevations in anterior leads V1-V4",
      "History of coronary artery disease, hyperlipidemia, and heavy smoking"
    ],
    "options": [
      "Myocardial Infarction",
      "Gastroesophageal Reflux",
      "Costochondritis",
      "Acute Pericarditis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1002",
    "patient": "Virginia B., 58F",
    "vitals": "BP 172/105 • HR 118 • O2 93%",
    "symptoms": [
      "History of poorly controlled chronic hypertension",
      "Aortic regurgitation murmur heard along the right sternal border",
      "Asymmetric blood pressure readings in upper extremities",
      "Widened mediastinum on chest radiograph"
    ],
    "options": [
      "Myocardial Infarction",
      "Aortic Dissection",
      "Pulmonary Embolism",
      "Tension Pneumothorax"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1003",
    "patient": "Kevin F., 54M",
    "vitals": "BP 119/67 • HR 183 • O2 96%",
    "symptoms": [
      "Sudden onset of heart racing and severe palpitations",
      "ECG showing regular, narrow-complex tachycardia without visible P waves",
      "Rapid resolution of tachycardia upon carotid sinus massage",
      "Mild lightheadedness and feeling of chest pressure"
    ],
    "options": [
      "Atrial Fibrillation",
      "Supraventricular Tachycardia (SVT)",
      "Ventricular Tachycardia",
      "Sinus Tachycardia"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1004",
    "patient": "James G., 67M",
    "vitals": "BP 145/94 • HR 110 • O2 90%",
    "symptoms": [
      "Increased cardiomegaly and cephalization on chest X-ray",
      "Bilateral pitting lower extremity edema and jugular venous distension",
      "Paroxysmal nocturnal dyspnea causing patient to wake up gasping",
      "Progressive exertional dyspnea and orthopnea"
    ],
    "options": [
      "Congestive Heart Failure",
      "COPD Exacerbation",
      "Pulmonary Fibrosis",
      "Cor Pulmonale"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1005",
    "patient": "Amy N., 24F",
    "vitals": "BP 116/75 • HR 89 • O2 97% • Temp 37.7C",
    "symptoms": [
      "Sharp retrosternal chest pain that worsens on inspiration and lying flat",
      "Chest pain that is relieved by sitting up and leaning forward",
      "ECG showing diffuse ST-segment elevation with PR-segment depression",
      "Pericardial friction rub heard best at the left lower sternal border"
    ],
    "options": [
      "Myocardial Infarction",
      "Pulmonary Embolism",
      "Acute Pericarditis",
      "Gastroesophageal Reflux"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1006",
    "patient": "Mark N., 28M",
    "vitals": "BP 102/78 • HR 128 • O2 89%",
    "symptoms": [
      "Significantly elevated D-dimer levels and mismatched perfusion defect on V/Q scan",
      "Sinus tachycardia and S1Q3T3 pattern on electrocardiogram",
      "Unilateral calf swelling, erythema, and deep venous tenderness",
      "Recent prolonged immobilization due to a transatlantic flight or surgery"
    ],
    "options": [
      "Pneumonia",
      "Asthma Exacerbation",
      "Pulmonary Embolism",
      "Pneumothorax"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1007",
    "patient": "Jose Y., 19M",
    "vitals": "BP 111/72 • HR 100 • O2 89%",
    "symptoms": [
      "Markedly decreased breath sounds and tactile fremitus on the affected side",
      "Asthenic tall, thin male body habitus",
      "Chest radiograph showing a visible pleural line and absence of lung markings",
      "Sudden onset of sharp, unilateral pleuritic chest pain and dyspnea"
    ],
    "options": [
      "Spontaneous Pneumothorax",
      "Asthma Attack",
      "Pulmonary Embolism",
      "Cardiac Tamponade"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1008",
    "patient": "Sharon S., 70F",
    "vitals": "BP 131/69 • HR 90 • O2 91% • Temp 38.8C",
    "symptoms": [
      "Dullness to percussion and increased tactile fremitus at the lung base",
      "Bronchial breath sounds and late inspiratory crackles on auscultation",
      "High fever, shaking chills, and pleuritic chest discomfort",
      "Chest X-ray showing lobar consolidation with air bronchograms"
    ],
    "options": [
      "Lobar Pneumonia",
      "Tuberculosis",
      "Lung Cancer",
      "Pulmonary Edema"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1009",
    "patient": "Pamela O., 9F",
    "vitals": "BP 109/64 • HR 113 • O2 93%",
    "symptoms": [
      "Use of accessory respiratory muscles and intercostal retractions",
      "Long-standing history of atopy, allergic rhinitis, or childhood eczema",
      "Prolonged expiratory phase and reduced peak expiratory flow rate",
      "Widespread expiratory wheezing, chest tightness, and dry cough"
    ],
    "options": [
      "Foreign Body Aspiration",
      "Asthma Exacerbation",
      "Croup",
      "Epiglottitis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1010",
    "patient": "Kimberly F., 55F",
    "vitals": "BP 142/110 • HR 89 • O2 98%",
    "symptoms": [
      "Symptoms developed suddenly within the past few hours",
      "Contralateral hemisensory loss and marked pronator drift",
      "Expressive or receptive motor aphasia and slurred speech",
      "Gaze deviation toward the side of the cortical lesion"
    ],
    "options": [
      "Ischemic Stroke (MCA)",
      "Hemorrhagic Stroke",
      "Bell's Palsy",
      "Complex Partial Seizure"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1011",
    "patient": "Tyler W., 61M",
    "vitals": "BP 206/113 • HR 88 • O2 97%",
    "symptoms": [
      "Sudden onset of excruciating headache, described as the 'worst of life'",
      "Transient loss of consciousness followed by severe neck stiffness",
      "Marked photophobia, nausea, vomiting, and meningismus",
      "Non-contrast head CT showing hyperdensity in the basal cisterns"
    ],
    "options": [
      "Migraine",
      "Subarachnoid Hemorrhage",
      "Meningitis",
      "Tension Headache"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1012",
    "patient": "Donna D., 38F",
    "vitals": "BP 115/68 • HR 109 • O2 96% • Temp 39.1C",
    "symptoms": [
      "Positive Kernig's and Brudzinski's signs on physical exam",
      "Altered mental status ranging from confusion to stupor",
      "Marked nuchal rigidity and neck stiffness on passive flexion",
      "Severe generalized headache, high fever, and shaking chills"
    ],
    "options": [
      "Viral Encephalitis",
      "Subarachnoid Hemorrhage",
      "Bacterial Meningitis",
      "Brain Abscess"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1013",
    "patient": "Jose O., 31M",
    "vitals": "BP 131/83 • HR 85 • O2 98%",
    "symptoms": [
      "Inability to raise the eyebrow or wrinkle the forehead on the affected side",
      "Drooling from the corner of the mouth and loss of taste on anterior tongue",
      "Inability to close the eye on the affected side completely",
      "Hyperacusis and decreased lacrimation on the affected side"
    ],
    "options": [
      "Stroke",
      "Bell's Palsy",
      "Trigeminal Neuralgia",
      "Myasthenia Gravis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1014",
    "patient": "Robert R., 20M",
    "vitals": "BP 107/66 • HR 102 • O2 96% • Temp 38.1C",
    "symptoms": [
      "Mild fever and peripheral leukocytosis with left shift",
      "Positive Rovsing's sign and obturator sign on examination",
      "Dull periumbilical pain migrating and localizing to the right lower quadrant",
      "Nausea, vomiting, anorexia, and localized abdominal guarding"
    ],
    "options": [
      "Ectopic Pregnancy",
      "Ovarian Torsion",
      "Acute Appendicitis",
      "Kidney Stone"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1015",
    "patient": "Eric O., 30M",
    "vitals": "BP 119/79 • HR 100 • O2 95% • Temp 38.2C",
    "symptoms": [
      "Severe right upper quadrant pain radiating to the right scapula",
      "Inspiration arrest on deep palpation of the right upper quadrant (Murphy's sign)",
      "Pain triggered or worsened by ingestion of fatty meals",
      "Ultrasound showing gallstones, gallbladder wall thickening, and pericholecystic fluid"
    ],
    "options": [
      "Acute Cholecystitis",
      "Acute Pancreatitis",
      "Peptic Ulcer Disease",
      "Hepatitis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1016",
    "patient": "Nancy R., 40F",
    "vitals": "BP 116/61 • HR 115 • O2 97% • Temp 38.5C",
    "symptoms": [
      "History of chronic alcohol abuse or gallstones",
      "Constant nausea and intractable vomiting without relief of pain",
      "Severe, boring epigastric abdominal pain radiating straight to the back",
      "Marked elevations in serum amylase and lipase levels (>3x normal)"
    ],
    "options": [
      "Perforated Ulcer",
      "Acute Pancreatitis",
      "Mesenteric Ischemia",
      "Aortic Aneurysm Rupture"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1017",
    "patient": "Emma S., 68F",
    "vitals": "BP 120/72 • HR 98 • O2 95% • Temp 38.1C",
    "symptoms": [
      "Low-grade fever, chills, and mild abdominal bloating",
      "Tender palpable mass in the left lower quadrant on palpation",
      "Constant left lower quadrant abdominal pain and tenderness",
      "CT scan of abdomen showing colonic wall thickening and fat stranding"
    ],
    "options": [
      "Appendicitis",
      "Acute Diverticulitis",
      "Colon Cancer",
      "Ulcerative Colitis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1018",
    "patient": "Cynthia E., 33F",
    "vitals": "BP 76/51 • HR 133 • O2 97%",
    "symptoms": [
      "Missed menstrual cycle by 2-4 weeks with vaginal bleeding or spotting",
      "Hemoperitoneum and pelvic free fluid seen on transvaginal ultrasound",
      "Sudden onset of severe, sharp, unilateral pelvic and lower abdominal pain",
      "Dizziness, lightheadedness, and referred left shoulder pain"
    ],
    "options": [
      "Ovarian Torsion",
      "Ruptured Ectopic Pregnancy",
      "Pelvic Inflammatory Disease",
      "Endometriosis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1019",
    "patient": "Ashley D., 58F",
    "vitals": "BP 144/80 • HR 91 • O2 98%",
    "symptoms": [
      "Sudden onset of severe, colicky flank pain radiating to the groin",
      "Exquisite costovertebral angle tenderness on the affected side",
      "Inability to lie still, pacing or squirming in pain",
      "Gross or microscopic hematuria on urinalysis"
    ],
    "options": [
      "Pyelonephritis",
      "Testicular Torsion",
      "Nephrolithiasis (Kidney Stone)",
      "Appendicitis"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1020",
    "patient": "Paul G., 15M",
    "vitals": "BP 119/71 • HR 101 • O2 99%",
    "symptoms": [
      "Sudden onset of severe, constant unilateral scrotal and inguinal pain",
      "High-riding, horizontally oriented testicle on the affected side",
      "Absent cremasteric reflex on the affected side upon thigh stroking",
      "Negative Prehn's sign (no relief of pain with scrotal elevation)"
    ],
    "options": [
      "Epididymitis",
      "Testicular Torsion",
      "Inguinal Hernia",
      "Hydrocele"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1021",
    "patient": "Mary D., 35F",
    "vitals": "BP 101/68 • HR 132 • O2 95%",
    "symptoms": [
      "Polydipsia, polyuria, weight loss, and signs of dry mucosal dehydration",
      "Fruity breath odor (acetone) and deep, rapid Kussmaul respirations",
      "Progressive nausea, vomiting, diffuse abdominal pain, and fatigue",
      "Serum blood glucose level of 450 mg/dL and metabolic acidosis"
    ],
    "options": [
      "Diabetic Ketoacidosis (DKA)",
      "Hyperosmolar Hyperglycemic State",
      "Sepsis",
      "Salicylate Toxicity"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1022",
    "patient": "Anna S., 73F",
    "vitals": "BP 81/47 • HR 113 • O2 89% • Temp 39.4C",
    "symptoms": [
      "Warm, flushed skin (early phase) or cool, clammy mottled extremities (late)",
      "Active focus of infection, such as pyelonephritis or severe pneumonia",
      "Altered mental status, confusion, and worsening lethargy",
      "Refractory hypotension unresponsive to adequate intravenous fluid resuscitation"
    ],
    "options": [
      "Cardiogenic Shock",
      "Septic Shock",
      "Hypovolemic Shock",
      "Neurogenic Shock"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1023",
    "patient": "Daniel D., 23M",
    "vitals": "BP 144/79 • HR 119 • O2 97%",
    "symptoms": [
      "Heat intolerance, fine hand tremors, palpitations, and anxiety",
      "Diffuse non-tender thyroid enlargement (goiter) with thyroid bruit",
      "Proptosis, lid lag, exophthalmos, and pretibial myxedema",
      "Weight loss despite increased appetite and frequent bowel movements"
    ],
    "options": [
      "Hypothyroidism",
      "Pheochromocytoma",
      "Hyperthyroidism (Graves' Disease)",
      "Cushing's Syndrome"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1024",
    "patient": "Paul N., 23M",
    "vitals": "BP 88/55 • HR 137 • O2 88%",
    "symptoms": [
      "Severe dyspnea and hypotension following penetrating chest trauma",
      "Distended jugular veins (JVD) with prominent x-descent and absent y-descent",
      "Muffled, distant heart sounds on auscultation (Beck's triad)",
      "Pulsus paradoxus (drop in systolic blood pressure >10 mmHg on inspiration)"
    ],
    "options": [
      "Tension Pneumothorax",
      "Cardiac Tamponade",
      "Massive Hemothorax",
      "Flail Chest"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1025",
    "patient": "Edward J., 27M",
    "vitals": "BP 78/42 • HR 138 • O2 85%",
    "symptoms": [
      "Tracheal deviation to the contralateral side away from the injury",
      "Immediate clinical improvement upon needle decompression in 2nd intercostal space",
      "Distended neck veins and ipsilateral chest wall hyperexpansion",
      "Severe progressive respiratory distress and hypotension after chest wall injury"
    ],
    "options": [
      "Cardiac Tamponade",
      "Tension Pneumothorax",
      "Pulmonary Contusion",
      "Aortic Rupture"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1026",
    "patient": "Melissa L., 55F",
    "vitals": "BP 139/71 • HR 86 • O2 97%",
    "symptoms": [
      "Pain exacerbated by active or passive wrist movements",
      "Localized tenderness over the distal radial metaphysis",
      "Radiograph showing extra-articular transverse distal radius fracture",
      "Classic dorsal displacement and angulation of the distal radius (dinner fork deformity)"
    ],
    "options": [
      "Smith's Fracture",
      "Colles' Fracture",
      "Scaphoid Fracture",
      "Galeazzi Fracture"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1027",
    "patient": "Mary T., 35F",
    "vitals": "BP 93/60 • HR 54 • O2 84% • Temp 36.0C",
    "symptoms": [
      "Rapid improvement in respiratory rate and level of consciousness after IV naloxone",
      "Patient found completely unresponsive, cyanotic, and hypoventilating",
      "Symmetric pinpoint pupils (miosis) bilaterally",
      "Severe respiratory depression with respiratory rate less than 8 breaths/minute"
    ],
    "options": [
      "Cocaine Overdose",
      "Benzodiazepine Overdose",
      "Opioid Overdose",
      "Alcohol Poisoning"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1028",
    "patient": "Michael M., 50M",
    "vitals": "BP 125/76 • HR 111 • O2 95% • Temp 37.8C",
    "symptoms": [
      "Intense bilateral tinnitus (ringing in the ears) and hearing loss",
      "Mixed respiratory alkalosis and high anion gap metabolic acidosis",
      "Toxic serum salicylate levels following ingestion of an unknown medication",
      "Marked hyperventilation, nausea, vomiting, and epigastric distress"
    ],
    "options": [
      "Acetaminophen Toxicity",
      "Aspirin (Salicylate) Toxicity",
      "Iron Toxicity",
      "Lead Poisoning"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1029",
    "patient": "Eric K., 28M",
    "vitals": "BP 86/72 • HR 51 • O2 92%",
    "symptoms": [
      "Recent exposure to agricultural pesticides or crop dusting",
      "Pinpoint pupils (miosis) and muscle fasciculations/weakness",
      "Profuse generalized sweating, salivation, lacrimation, and rhinorrhea",
      "Diffuse wheezing, bradycardia, and bronchial hypersecretion"
    ],
    "options": [
      "Organophosphate Poisoning",
      "Anticholinergic Toxicity",
      "Opioid Toxicity",
      "Carbon Monoxide Poisoning"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1030",
    "patient": "Patricia E., 20F",
    "vitals": "BP 108/76 • HR 57 • O2 98% • Temp 40.2C",
    "symptoms": [
      "Gradual onset of step-ladder pattern fever and severe frontal headache",
      "Faint, rose-colored macules (rose spots) on the abdomen and chest",
      "Relative bradycardia (pulse-temperature dissociation)",
      "Recent travel to an endemic country with poor sanitation"
    ],
    "options": [
      "Typhoid Fever",
      "Malaria",
      "Dengue Fever",
      "Leptospirosis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1031",
    "patient": "Lisa I., 24F",
    "vitals": "BP 115/60 • HR 106 • O2 96% • Temp 40.2C",
    "symptoms": [
      "Generalized maculopapular rash blanching on pressure",
      "Laboratory evidence of marked leukopenia and thrombocytopenia",
      "Exquisite joint, muscle, and bone pain described as 'breakbone'",
      "Sudden onset of high-grade fever, chills, and severe retro-orbital pain"
    ],
    "options": [
      "Zika Virus",
      "Dengue Fever",
      "Chikungunya",
      "Yellow Fever"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1032",
    "patient": "Rebecca D., 45F",
    "vitals": "BP 120/60 • HR 115 • O2 96% • Temp 39.2C",
    "symptoms": [
      "Paroxysmal cyclical high fevers and shaking chills occurring every 48 hours",
      "Recent travel to a tropical region without taking chemoprophylaxis",
      "Profuse sweating as the fever breaks, followed by extreme fatigue",
      "Scleral icterus, splenomegaly, anemia, and mild thrombocytopenia"
    ],
    "options": [
      "Malaria (P. falciparum)",
      "Malaria (P. vivax)",
      "Babesiosis",
      "Visceral Leishmaniasis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1033",
    "patient": "Catherine V., 45F",
    "vitals": "BP 128/70 • HR 72 • O2 99%",
    "symptoms": [
      "Photosensitivity rash and multiple painful joints (polyarthritis)",
      "Urinalysis showing proteinuria and red blood cell casts",
      "Painless oral ulcers, fatigue, and recurrent low-grade fevers",
      "Erythematous malar rash over the cheeks and bridge of nose, sparing nasolabial folds"
    ],
    "options": [
      "Systemic Lupus Erythematosus",
      "Rosacea",
      "Dermatomyositis",
      "Rheumatoid Arthritis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1034",
    "patient": "Stephen E., 61M",
    "vitals": "BP 142/84 • HR 92 • O2 98%",
    "symptoms": [
      "Symptoms peaked rapidly within 12 to 24 hours of onset",
      "Joint aspirate showing needle-shaped, negatively birefringent crystals",
      "Sudden onset of excruciating pain and swelling in the first metatarsophalangeal joint",
      "Joint is erythematous, hot, swollen, and exquisitely sensitive to light touch"
    ],
    "options": [
      "Pseudogout",
      "Septic Arthritis",
      "Acute Gouty Arthritis",
      "Osteoarthritis Exacerbation"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1035",
    "patient": "Richard V., 46M",
    "vitals": "BP 89/54 • HR 120 • O2 88%",
    "symptoms": [
      "Inspiratory stridor, wheezing, dyspnea, and feeling of throat tightness",
      "Profound hypotension and dizziness shortly after eating peanut butter or seafood",
      "Rapid resolution of symptoms following intramuscular epinephrine injection",
      "Nausea, vomiting, and diffuse abdominal cramps"
    ],
    "options": [
      "Asthma Attack",
      "Panic Attack",
      "Vasovagal Syncope",
      "Anaphylaxis"
    ],
    "answer": 3
  },
  {
    "id": "CASE-1036",
    "patient": "Brenda W., 76F",
    "vitals": "BP 125/75 • HR 82 • O2 99%",
    "symptoms": [
      "Compression ultrasound showing non-compressible popliteal or femoral vein",
      "Unilateral lower extremity calf pain, swelling, and warmth",
      "Calf circumference measurement is 4 cm larger on the symptomatic side",
      "Pain in the calf elicited by passive dorsiflexion of the foot (Homan's sign)"
    ],
    "options": [
      "Cellulitis",
      "Baker's Cyst Rupture",
      "Deep Vein Thrombosis (DVT)",
      "Superficial Thrombophlebitis"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1037",
    "patient": "Mark K., 78M",
    "vitals": "BP 136/94 • HR 107 • O2 86%",
    "symptoms": [
      "Worsening baseline shortness of breath and chronic cough",
      "Marked increase in sputum volume and sputum purulence",
      "ABG showing chronic respiratory acidosis with compensatory bicarb retention",
      "Diffuse wheezing and distant breath sounds on lung auscultation"
    ],
    "options": [
      "Asthma Exacerbation",
      "Congestive Heart Failure",
      "COPD Exacerbation",
      "Pulmonary Embolism"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1038",
    "patient": "Katherine C., 56F",
    "vitals": "BP 120/79 • HR 89 • O2 97% • Temp 38.9C",
    "symptoms": [
      "Spreading, poorly demarcated area of skin erythema, warmth, and swelling",
      "Localized skin tenderness and pain over the lower leg",
      "Small portal of entry, such as tinea pedis or a minor abrasion",
      "Associated low-grade fever, chills, and mild inguinal lymphadenopathy"
    ],
    "options": [
      "Deep Vein Thrombosis",
      "Cellulitis",
      "Erysipelas",
      "Necrotizing Fasciitis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1039",
    "patient": "Anthony Y., 30M",
    "vitals": "BP 114/83 • HR 95 • O2 99%",
    "symptoms": [
      "Confusion, fatigue, and irritability without fever or neck stiffness",
      "Multiple family members or roommates presenting with identical symptoms",
      "Falsely normal 100% pulse oximetry readings on room air",
      "Elevated carboxyhemoglobin levels on arterial blood gas analysis"
    ],
    "options": [
      "Influenza",
      "Food Poisoning",
      "Migraine",
      "Carbon Monoxide Poisoning"
    ],
    "answer": 3
  },
  {
    "id": "CASE-1040",
    "patient": "Susan O., 40F",
    "vitals": "BP 118/77 • HR 108 • O2 97%",
    "symptoms": [
      "Sudden onset of profuse diaphoresis, hand tremors, and palpitations",
      "Severe confusion, irritability, slurred speech, and combative behavior",
      "Rapid correction of symptoms and recovery of consciousness after D50 IV push",
      "Fingerstick blood glucose reading of 42 mg/dL"
    ],
    "options": [
      "Ischemic Stroke",
      "Opioid Overdose",
      "Diabetic Ketoacidosis",
      "Hypoglycemia"
    ],
    "answer": 3
  },
  {
    "id": "CASE-1041",
    "patient": "Nicholas F., 52M",
    "vitals": "BP 93/64 • HR 86 • O2 91%",
    "symptoms": [
      "Crushing retrosternal chest pain radiating to the left arm or jaw",
      "Profuse diaphoresis, nausea, and shortness of breath",
      "ECG showing ST-segment elevations in anterior leads V1-V4",
      "Significantly elevated serum cardiac troponin levels"
    ],
    "options": [
      "Myocardial Infarction",
      "Gastroesophageal Reflux",
      "Costochondritis",
      "Acute Pericarditis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1042",
    "patient": "Samantha A., 74F",
    "vitals": "BP 187/97 • HR 100 • O2 93%",
    "symptoms": [
      "Aortic regurgitation murmur heard along the right sternal border",
      "Widened mediastinum on chest radiograph",
      "Asymmetric blood pressure readings in upper extremities",
      "Sudden onset, tearing substernal chest pain radiating to the back"
    ],
    "options": [
      "Myocardial Infarction",
      "Aortic Dissection",
      "Pulmonary Embolism",
      "Tension Pneumothorax"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1043",
    "patient": "Cynthia L., 41F",
    "vitals": "BP 120/69 • HR 198 • O2 96%",
    "symptoms": [
      "Recurrent episodes of sudden heart racing resolving spontaneously",
      "Sudden onset of heart racing and severe palpitations",
      "Mild lightheadedness and feeling of chest pressure",
      "ECG showing regular, narrow-complex tachycardia without visible P waves"
    ],
    "options": [
      "Atrial Fibrillation",
      "Supraventricular Tachycardia (SVT)",
      "Ventricular Tachycardia",
      "Sinus Tachycardia"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1044",
    "patient": "Alexander K., 79M",
    "vitals": "BP 135/99 • HR 107 • O2 89%",
    "symptoms": [
      "S3 gallop on heart auscultation and bibasilar rales",
      "Bilateral pitting lower extremity edema and jugular venous distension",
      "Paroxysmal nocturnal dyspnea causing patient to wake up gasping",
      "Increased cardiomegaly and cephalization on chest X-ray"
    ],
    "options": [
      "Congestive Heart Failure",
      "COPD Exacerbation",
      "Pulmonary Fibrosis",
      "Cor Pulmonale"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1045",
    "patient": "Katherine D., 21F",
    "vitals": "BP 104/75 • HR 91 • O2 96%",
    "symptoms": [
      "ECG showing diffuse ST-segment elevation with PR-segment depression",
      "Pericardial friction rub heard best at the left lower sternal border",
      "Sharp retrosternal chest pain that worsens on inspiration and lying flat",
      "Chest pain that is relieved by sitting up and leaning forward"
    ],
    "options": [
      "Myocardial Infarction",
      "Pulmonary Embolism",
      "Acute Pericarditis",
      "Gastroesophageal Reflux"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1046",
    "patient": "Emma A., 23F",
    "vitals": "BP 103/74 • HR 125 • O2 84%",
    "symptoms": [
      "Sudden onset of severe shortness of breath and pleuritic chest pain",
      "Recent prolonged immobilization due to a transatlantic flight or surgery",
      "Unilateral calf swelling, erythema, and deep venous tenderness",
      "Sinus tachycardia and S1Q3T3 pattern on electrocardiogram"
    ],
    "options": [
      "Pneumonia",
      "Asthma Exacerbation",
      "Pulmonary Embolism",
      "Pneumothorax"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1047",
    "patient": "Nicholas O., 23M",
    "vitals": "BP 118/70 • HR 109 • O2 92%",
    "symptoms": [
      "Asthenic tall, thin male body habitus",
      "Markedly decreased breath sounds and tactile fremitus on the affected side",
      "Hyperresonance to percussion over the ipsilateral chest wall",
      "Chest radiograph showing a visible pleural line and absence of lung markings"
    ],
    "options": [
      "Spontaneous Pneumothorax",
      "Asthma Attack",
      "Pulmonary Embolism",
      "Cardiac Tamponade"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1048",
    "patient": "Justin W., 29M",
    "vitals": "BP 106/74 • HR 100 • O2 91% • Temp 39.3C",
    "symptoms": [
      "Productive cough with thick rust-colored or purulent sputum",
      "Chest X-ray showing lobar consolidation with air bronchograms",
      "Bronchial breath sounds and late inspiratory crackles on auscultation",
      "High fever, shaking chills, and pleuritic chest discomfort"
    ],
    "options": [
      "Lobar Pneumonia",
      "Tuberculosis",
      "Lung Cancer",
      "Pulmonary Edema"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1049",
    "patient": "Lisa K., 7F",
    "vitals": "BP 113/80 • HR 105 • O2 94%",
    "symptoms": [
      "Widespread expiratory wheezing, chest tightness, and dry cough",
      "Use of accessory respiratory muscles and intercostal retractions",
      "Prolonged expiratory phase and reduced peak expiratory flow rate",
      "Triggered by recent exposure to cold air, pollen, or an upper respiratory infection"
    ],
    "options": [
      "Foreign Body Aspiration",
      "Asthma Exacerbation",
      "Croup",
      "Epiglottitis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1050",
    "patient": "Raymond Y., 73M",
    "vitals": "BP 140/114 • HR 84 • O2 96%",
    "symptoms": [
      "Expressive or receptive motor aphasia and slurred speech",
      "Symptoms developed suddenly within the past few hours",
      "Contralateral hemisensory loss and marked pronator drift",
      "Gaze deviation toward the side of the cortical lesion"
    ],
    "options": [
      "Ischemic Stroke (MCA)",
      "Hemorrhagic Stroke",
      "Bell's Palsy",
      "Complex Partial Seizure"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1051",
    "patient": "Nancy K., 43F",
    "vitals": "BP 179/107 • HR 86 • O2 99%",
    "symptoms": [
      "Sudden onset of excruciating headache, described as the 'worst of life'",
      "Non-contrast head CT showing hyperdensity in the basal cisterns",
      "Transient loss of consciousness followed by severe neck stiffness",
      "Marked photophobia, nausea, vomiting, and meningismus"
    ],
    "options": [
      "Migraine",
      "Subarachnoid Hemorrhage",
      "Meningitis",
      "Tension Headache"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1052",
    "patient": "Janet K., 43F",
    "vitals": "BP 114/62 • HR 107 • O2 94% • Temp 38.8C",
    "symptoms": [
      "Severe generalized headache, high fever, and shaking chills",
      "Marked nuchal rigidity and neck stiffness on passive flexion",
      "Positive Kernig's and Brudzinski's signs on physical exam",
      "Altered mental status ranging from confusion to stupor"
    ],
    "options": [
      "Viral Encephalitis",
      "Subarachnoid Hemorrhage",
      "Bacterial Meningitis",
      "Brain Abscess"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1053",
    "patient": "Shirley P., 54F",
    "vitals": "BP 125/75 • HR 89 • O2 98%",
    "symptoms": [
      "Sudden onset of unilateral facial paralysis involving the entire half face",
      "Drooling from the corner of the mouth and loss of taste on anterior tongue",
      "Inability to raise the eyebrow or wrinkle the forehead on the affected side",
      "Inability to close the eye on the affected side completely"
    ],
    "options": [
      "Stroke",
      "Bell's Palsy",
      "Trigeminal Neuralgia",
      "Myasthenia Gravis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1054",
    "patient": "Jerry S., 23M",
    "vitals": "BP 125/80 • HR 110 • O2 99% • Temp 38.9C",
    "symptoms": [
      "Positive Rovsing's sign and obturator sign on examination",
      "Dull periumbilical pain migrating and localizing to the right lower quadrant",
      "Nausea, vomiting, anorexia, and localized abdominal guarding",
      "Mild fever and peripheral leukocytosis with left shift"
    ],
    "options": [
      "Ectopic Pregnancy",
      "Ovarian Torsion",
      "Acute Appendicitis",
      "Kidney Stone"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1055",
    "patient": "Benjamin P., 45M",
    "vitals": "BP 138/82 • HR 108 • O2 97% • Temp 38.4C",
    "symptoms": [
      "Severe right upper quadrant pain radiating to the right scapula",
      "Inspiration arrest on deep palpation of the right upper quadrant (Murphy's sign)",
      "Persistent nausea, vomiting, low-grade fever, and mild leukocytosis",
      "Pain triggered or worsened by ingestion of fatty meals"
    ],
    "options": [
      "Acute Cholecystitis",
      "Acute Pancreatitis",
      "Peptic Ulcer Disease",
      "Hepatitis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1056",
    "patient": "Dorothy B., 51F",
    "vitals": "BP 97/69 • HR 100 • O2 96% • Temp 37.9C",
    "symptoms": [
      "Marked elevations in serum amylase and lipase levels (>3x normal)",
      "Pain that is partially relieved by sitting up and leaning forward",
      "Constant nausea and intractable vomiting without relief of pain",
      "Severe, boring epigastric abdominal pain radiating straight to the back"
    ],
    "options": [
      "Perforated Ulcer",
      "Acute Pancreatitis",
      "Mesenteric Ischemia",
      "Aortic Aneurysm Rupture"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1057",
    "patient": "Matthew V., 59M",
    "vitals": "BP 125/80 • HR 95 • O2 99% • Temp 39.0C",
    "symptoms": [
      "CT scan of abdomen showing colonic wall thickening and fat stranding",
      "Tender palpable mass in the left lower quadrant on palpation",
      "Changes in bowel habits, commonly constipation or loose stools",
      "Low-grade fever, chills, and mild abdominal bloating"
    ],
    "options": [
      "Appendicitis",
      "Acute Diverticulitis",
      "Colon Cancer",
      "Ulcerative Colitis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1058",
    "patient": "Sarah O., 39F",
    "vitals": "BP 95/56 • HR 126 • O2 96%",
    "symptoms": [
      "Dizziness, lightheadedness, and referred left shoulder pain",
      "Missed menstrual cycle by 2-4 weeks with vaginal bleeding or spotting",
      "Sudden onset of severe, sharp, unilateral pelvic and lower abdominal pain",
      "Hemoperitoneum and pelvic free fluid seen on transvaginal ultrasound"
    ],
    "options": [
      "Ovarian Torsion",
      "Ruptured Ectopic Pregnancy",
      "Pelvic Inflammatory Disease",
      "Endometriosis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1059",
    "patient": "Melissa Z., 20F",
    "vitals": "BP 151/94 • HR 95 • O2 100%",
    "symptoms": [
      "CT scan of abdomen/pelvis without contrast showing obstructive calculus",
      "Inability to lie still, pacing or squirming in pain",
      "Exquisite costovertebral angle tenderness on the affected side",
      "Sudden onset of severe, colicky flank pain radiating to the groin"
    ],
    "options": [
      "Pyelonephritis",
      "Testicular Torsion",
      "Nephrolithiasis (Kidney Stone)",
      "Appendicitis"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1060",
    "patient": "Matthew T., 15M",
    "vitals": "BP 124/76 • HR 108 • O2 99%",
    "symptoms": [
      "Negative Prehn's sign (no relief of pain with scrotal elevation)",
      "Absent cremasteric reflex on the affected side upon thigh stroking",
      "High-riding, horizontally oriented testicle on the affected side",
      "Markedly decreased or absent blood flow on scrotal Doppler ultrasound"
    ],
    "options": [
      "Epididymitis",
      "Testicular Torsion",
      "Inguinal Hernia",
      "Hydrocele"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1061",
    "patient": "Richard R., 32M",
    "vitals": "BP 96/52 • HR 120 • O2 95%",
    "symptoms": [
      "Serum blood glucose level of 450 mg/dL and metabolic acidosis",
      "Progressive nausea, vomiting, diffuse abdominal pain, and fatigue",
      "Polydipsia, polyuria, weight loss, and signs of dry mucosal dehydration",
      "Positive urine and serum ketones with increased anion gap"
    ],
    "options": [
      "Diabetic Ketoacidosis (DKA)",
      "Hyperosmolar Hyperglycemic State",
      "Sepsis",
      "Salicylate Toxicity"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1062",
    "patient": "Brandon B., 66M",
    "vitals": "BP 76/52 • HR 126 • O2 90% • Temp 39.6C",
    "symptoms": [
      "Elevated blood lactate levels and severe peripheral leukocytosis",
      "Altered mental status, confusion, and worsening lethargy",
      "Active focus of infection, such as pyelonephritis or severe pneumonia",
      "Warm, flushed skin (early phase) or cool, clammy mottled extremities (late)"
    ],
    "options": [
      "Cardiogenic Shock",
      "Septic Shock",
      "Hypovolemic Shock",
      "Neurogenic Shock"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1063",
    "patient": "Donna M., 21F",
    "vitals": "BP 131/78 • HR 123 • O2 98%",
    "symptoms": [
      "Proptosis, lid lag, exophthalmos, and pretibial myxedema",
      "Heat intolerance, fine hand tremors, palpitations, and anxiety",
      "Weight loss despite increased appetite and frequent bowel movements",
      "Undetectable serum TSH with elevated free T3 and T4 levels"
    ],
    "options": [
      "Hypothyroidism",
      "Pheochromocytoma",
      "Hyperthyroidism (Graves' Disease)",
      "Cushing's Syndrome"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1064",
    "patient": "Jose L., 60M",
    "vitals": "BP 91/61 • HR 128 • O2 92%",
    "symptoms": [
      "Muffled, distant heart sounds on auscultation (Beck's triad)",
      "Echocardiogram showing diastolic collapse of the right ventricle",
      "Distended jugular veins (JVD) with prominent x-descent and absent y-descent",
      "Pulsus paradoxus (drop in systolic blood pressure >10 mmHg on inspiration)"
    ],
    "options": [
      "Tension Pneumothorax",
      "Cardiac Tamponade",
      "Massive Hemothorax",
      "Flail Chest"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1065",
    "patient": "Cynthia A., 23F",
    "vitals": "BP 80/42 • HR 127 • O2 81%",
    "symptoms": [
      "Hyperresonance to percussion and absent breath sounds on the affected side",
      "Tracheal deviation to the contralateral side away from the injury",
      "Distended neck veins and ipsilateral chest wall hyperexpansion",
      "Severe progressive respiratory distress and hypotension after chest wall injury"
    ],
    "options": [
      "Cardiac Tamponade",
      "Tension Pneumothorax",
      "Pulmonary Contusion",
      "Aortic Rupture"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1066",
    "patient": "Sandra L., 73F",
    "vitals": "BP 138/86 • HR 77 • O2 98%",
    "symptoms": [
      "Localized tenderness over the distal radial metaphysis",
      "Radiograph showing extra-articular transverse distal radius fracture",
      "Pain exacerbated by active or passive wrist movements",
      "Classic dorsal displacement and angulation of the distal radius (dinner fork deformity)"
    ],
    "options": [
      "Smith's Fracture",
      "Colles' Fracture",
      "Scaphoid Fracture",
      "Galeazzi Fracture"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1067",
    "patient": "Samantha M., 53F",
    "vitals": "BP 103/61 • HR 46 • O2 81% • Temp 35.7C",
    "symptoms": [
      "Symmetric pinpoint pupils (miosis) bilaterally",
      "Patient found completely unresponsive, cyanotic, and hypoventilating",
      "Multiple skin track marks over forearm veins",
      "Severe respiratory depression with respiratory rate less than 8 breaths/minute"
    ],
    "options": [
      "Cocaine Overdose",
      "Benzodiazepine Overdose",
      "Opioid Overdose",
      "Alcohol Poisoning"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1068",
    "patient": "Kimberly W., 39F",
    "vitals": "BP 121/79 • HR 119 • O2 98% • Temp 38.1C",
    "symptoms": [
      "Intense bilateral tinnitus (ringing in the ears) and hearing loss",
      "Toxic serum salicylate levels following ingestion of an unknown medication",
      "Marked hyperventilation, nausea, vomiting, and epigastric distress",
      "Agitation, confusion, diaphoresis, and progressive lethargy"
    ],
    "options": [
      "Acetaminophen Toxicity",
      "Aspirin (Salicylate) Toxicity",
      "Iron Toxicity",
      "Lead Poisoning"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1069",
    "patient": "Timothy A., 21M",
    "vitals": "BP 110/75 • HR 53 • O2 85%",
    "symptoms": [
      "Incontinence of urine and feces with severe abdominal cramping",
      "Profuse generalized sweating, salivation, lacrimation, and rhinorrhea",
      "Diffuse wheezing, bradycardia, and bronchial hypersecretion",
      "Pinpoint pupils (miosis) and muscle fasciculations/weakness"
    ],
    "options": [
      "Organophosphate Poisoning",
      "Anticholinergic Toxicity",
      "Opioid Toxicity",
      "Carbon Monoxide Poisoning"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1070",
    "patient": "Joshua A., 30M",
    "vitals": "BP 105/70 • HR 64 • O2 97% • Temp 39.9C",
    "symptoms": [
      "Relative bradycardia (pulse-temperature dissociation)",
      "Abdominal pain, splenomegaly, and constipation followed by watery diarrhea",
      "Gradual onset of step-ladder pattern fever and severe frontal headache",
      "Faint, rose-colored macules (rose spots) on the abdomen and chest"
    ],
    "options": [
      "Typhoid Fever",
      "Malaria",
      "Dengue Fever",
      "Leptospirosis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1071",
    "patient": "Betty A., 32F",
    "vitals": "BP 97/72 • HR 100 • O2 96% • Temp 39.8C",
    "symptoms": [
      "Sudden onset of high-grade fever, chills, and severe retro-orbital pain",
      "Positive tourniquet test showing petechiae formation",
      "Laboratory evidence of marked leukopenia and thrombocytopenia",
      "Exquisite joint, muscle, and bone pain described as 'breakbone'"
    ],
    "options": [
      "Zika Virus",
      "Dengue Fever",
      "Chikungunya",
      "Yellow Fever"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1072",
    "patient": "Rebecca D., 41F",
    "vitals": "BP 118/66 • HR 92 • O2 93% • Temp 40.1C",
    "symptoms": [
      "Paroxysmal cyclical high fevers and shaking chills occurring every 48 hours",
      "Recent travel to a tropical region without taking chemoprophylaxis",
      "Profuse sweating as the fever breaks, followed by extreme fatigue",
      "Thick and thin blood smears showing trophozoites and Schüffner's dots"
    ],
    "options": [
      "Malaria (P. falciparum)",
      "Malaria (P. vivax)",
      "Babesiosis",
      "Visceral Leishmaniasis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1073",
    "patient": "Ashley C., 35F",
    "vitals": "BP 132/79 • HR 87 • O2 98%",
    "symptoms": [
      "Painless oral ulcers, fatigue, and recurrent low-grade fevers",
      "High titer positive antinuclear antibodies (ANA) and anti-dsDNA antibodies",
      "Urinalysis showing proteinuria and red blood cell casts",
      "Photosensitivity rash and multiple painful joints (polyarthritis)"
    ],
    "options": [
      "Systemic Lupus Erythematosus",
      "Rosacea",
      "Dermatomyositis",
      "Rheumatoid Arthritis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1074",
    "patient": "Timothy D., 48M",
    "vitals": "BP 136/80 • HR 82 • O2 99% • Temp 38.0C",
    "symptoms": [
      "Symptoms peaked rapidly within 12 to 24 hours of onset",
      "History of frequent alcohol consumption and purine-rich diet",
      "Joint aspirate showing needle-shaped, negatively birefringent crystals",
      "Joint is erythematous, hot, swollen, and exquisitely sensitive to light touch"
    ],
    "options": [
      "Pseudogout",
      "Septic Arthritis",
      "Acute Gouty Arthritis",
      "Osteoarthritis Exacerbation"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1075",
    "patient": "Dennis O., 18M",
    "vitals": "BP 70/42 • HR 121 • O2 82%",
    "symptoms": [
      "Inspiratory stridor, wheezing, dyspnea, and feeling of throat tightness",
      "Nausea, vomiting, and diffuse abdominal cramps",
      "Acute onset of diffuse pruritic hives, urticaria, and lip/tongue swelling",
      "Rapid resolution of symptoms following intramuscular epinephrine injection"
    ],
    "options": [
      "Asthma Attack",
      "Panic Attack",
      "Vasovagal Syncope",
      "Anaphylaxis"
    ],
    "answer": 3
  },
  {
    "id": "CASE-1076",
    "patient": "Kevin L., 64M",
    "vitals": "BP 123/81 • HR 83 • O2 98%",
    "symptoms": [
      "Unilateral lower extremity calf pain, swelling, and warmth",
      "Calf circumference measurement is 4 cm larger on the symptomatic side",
      "Pain in the calf elicited by passive dorsiflexion of the foot (Homan's sign)",
      "Compression ultrasound showing non-compressible popliteal or femoral vein"
    ],
    "options": [
      "Cellulitis",
      "Baker's Cyst Rupture",
      "Deep Vein Thrombosis (DVT)",
      "Superficial Thrombophlebitis"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1077",
    "patient": "Virginia I., 79F",
    "vitals": "BP 127/91 • HR 103 • O2 87% • Temp 37.7C",
    "symptoms": [
      "Diffuse wheezing and distant breath sounds on lung auscultation",
      "Classic barrel chest, accessory muscle use, and history of heavy smoking",
      "Marked increase in sputum volume and sputum purulence",
      "ABG showing chronic respiratory acidosis with compensatory bicarb retention"
    ],
    "options": [
      "Asthma Exacerbation",
      "Congestive Heart Failure",
      "COPD Exacerbation",
      "Pulmonary Embolism"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1078",
    "patient": "Lisa P., 72F",
    "vitals": "BP 121/85 • HR 91 • O2 99% • Temp 37.9C",
    "symptoms": [
      "Spreading, poorly demarcated area of skin erythema, warmth, and swelling",
      "Localized skin tenderness and pain over the lower leg",
      "Failure to improve with elevation alone; requires systemic antibiotics",
      "Small portal of entry, such as tinea pedis or a minor abrasion"
    ],
    "options": [
      "Deep Vein Thrombosis",
      "Cellulitis",
      "Erysipelas",
      "Necrotizing Fasciitis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1079",
    "patient": "Brandon J., 42M",
    "vitals": "BP 127/82 • HR 97 • O2 100%",
    "symptoms": [
      "Elevated carboxyhemoglobin levels on arterial blood gas analysis",
      "Falsely normal 100% pulse oximetry readings on room air",
      "Confusion, fatigue, and irritability without fever or neck stiffness",
      "Multiple family members or roommates presenting with identical symptoms"
    ],
    "options": [
      "Influenza",
      "Food Poisoning",
      "Migraine",
      "Carbon Monoxide Poisoning"
    ],
    "answer": 3
  },
  {
    "id": "CASE-1080",
    "patient": "Kimberly V., 25F",
    "vitals": "BP 131/71 • HR 119 • O2 96%",
    "symptoms": [
      "Fingerstick blood glucose reading of 42 mg/dL",
      "History of type 1 diabetes mellitus and missed a meal after taking insulin",
      "Sudden onset of profuse diaphoresis, hand tremors, and palpitations",
      "Rapid correction of symptoms and recovery of consciousness after D50 IV push"
    ],
    "options": [
      "Ischemic Stroke",
      "Opioid Overdose",
      "Diabetic Ketoacidosis",
      "Hypoglycemia"
    ],
    "answer": 3
  },
  {
    "id": "CASE-1081",
    "patient": "Kimberly F., 60F",
    "vitals": "BP 118/55 • HR 96 • O2 92%",
    "symptoms": [
      "Significantly elevated serum cardiac troponin levels",
      "Crushing retrosternal chest pain radiating to the left arm or jaw",
      "Profuse diaphoresis, nausea, and shortness of breath",
      "History of coronary artery disease, hyperlipidemia, and heavy smoking"
    ],
    "options": [
      "Myocardial Infarction",
      "Gastroesophageal Reflux",
      "Costochondritis",
      "Acute Pericarditis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1082",
    "patient": "Brian F., 69M",
    "vitals": "BP 210/95 • HR 105 • O2 93%",
    "symptoms": [
      "History of poorly controlled chronic hypertension",
      "Sudden onset, tearing substernal chest pain radiating to the back",
      "Asymmetric blood pressure readings in upper extremities",
      "Widened mediastinum on chest radiograph"
    ],
    "options": [
      "Myocardial Infarction",
      "Aortic Dissection",
      "Pulmonary Embolism",
      "Tension Pneumothorax"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1083",
    "patient": "Dennis B., 26M",
    "vitals": "BP 106/61 • HR 164 • O2 96%",
    "symptoms": [
      "Sudden onset of heart racing and severe palpitations",
      "Rapid resolution of tachycardia upon carotid sinus massage",
      "Recurrent episodes of sudden heart racing resolving spontaneously",
      "Mild lightheadedness and feeling of chest pressure"
    ],
    "options": [
      "Atrial Fibrillation",
      "Supraventricular Tachycardia (SVT)",
      "Ventricular Tachycardia",
      "Sinus Tachycardia"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1084",
    "patient": "Gary H., 90M",
    "vitals": "BP 133/86 • HR 103 • O2 90%",
    "symptoms": [
      "Bilateral pitting lower extremity edema and jugular venous distension",
      "Paroxysmal nocturnal dyspnea causing patient to wake up gasping",
      "S3 gallop on heart auscultation and bibasilar rales",
      "Progressive exertional dyspnea and orthopnea"
    ],
    "options": [
      "Congestive Heart Failure",
      "COPD Exacerbation",
      "Pulmonary Fibrosis",
      "Cor Pulmonale"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1085",
    "patient": "Christine W., 49F",
    "vitals": "BP 108/68 • HR 90 • O2 99% • Temp 38.3C",
    "symptoms": [
      "Sharp retrosternal chest pain that worsens on inspiration and lying flat",
      "Chest pain that is relieved by sitting up and leaning forward",
      "ECG showing diffuse ST-segment elevation with PR-segment depression",
      "Pericardial friction rub heard best at the left lower sternal border"
    ],
    "options": [
      "Myocardial Infarction",
      "Pulmonary Embolism",
      "Acute Pericarditis",
      "Gastroesophageal Reflux"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1086",
    "patient": "Stephanie L., 25F",
    "vitals": "BP 117/80 • HR 112 • O2 85%",
    "symptoms": [
      "Significantly elevated D-dimer levels and mismatched perfusion defect on V/Q scan",
      "Sinus tachycardia and S1Q3T3 pattern on electrocardiogram",
      "Unilateral calf swelling, erythema, and deep venous tenderness",
      "Recent prolonged immobilization due to a transatlantic flight or surgery"
    ],
    "options": [
      "Pneumonia",
      "Asthma Exacerbation",
      "Pulmonary Embolism",
      "Pneumothorax"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1087",
    "patient": "Aaron T., 32M",
    "vitals": "BP 126/82 • HR 116 • O2 92%",
    "symptoms": [
      "Hyperresonance to percussion over the ipsilateral chest wall",
      "Markedly decreased breath sounds and tactile fremitus on the affected side",
      "Chest radiograph showing a visible pleural line and absence of lung markings",
      "Asthenic tall, thin male body habitus"
    ],
    "options": [
      "Spontaneous Pneumothorax",
      "Asthma Attack",
      "Pulmonary Embolism",
      "Cardiac Tamponade"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1088",
    "patient": "Anthony J., 68M",
    "vitals": "BP 111/77 • HR 104 • O2 93% • Temp 38.6C",
    "symptoms": [
      "Dullness to percussion and increased tactile fremitus at the lung base",
      "Chest X-ray showing lobar consolidation with air bronchograms",
      "Productive cough with thick rust-colored or purulent sputum",
      "High fever, shaking chills, and pleuritic chest discomfort"
    ],
    "options": [
      "Lobar Pneumonia",
      "Tuberculosis",
      "Lung Cancer",
      "Pulmonary Edema"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1089",
    "patient": "Amanda C., 39F",
    "vitals": "BP 105/71 • HR 118 • O2 90%",
    "symptoms": [
      "Long-standing history of atopy, allergic rhinitis, or childhood eczema",
      "Widespread expiratory wheezing, chest tightness, and dry cough",
      "Use of accessory respiratory muscles and intercostal retractions",
      "Prolonged expiratory phase and reduced peak expiratory flow rate"
    ],
    "options": [
      "Foreign Body Aspiration",
      "Asthma Exacerbation",
      "Croup",
      "Epiglottitis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1090",
    "patient": "Tyler O., 60M",
    "vitals": "BP 184/94 • HR 80 • O2 95%",
    "symptoms": [
      "Expressive or receptive motor aphasia and slurred speech",
      "Sudden onset of contralateral face, arm, and leg weakness",
      "Gaze deviation toward the side of the cortical lesion",
      "Contralateral hemisensory loss and marked pronator drift"
    ],
    "options": [
      "Ischemic Stroke (MCA)",
      "Hemorrhagic Stroke",
      "Bell's Palsy",
      "Complex Partial Seizure"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1091",
    "patient": "Christopher T., 38M",
    "vitals": "BP 191/106 • HR 99 • O2 96%",
    "symptoms": [
      "Rupture of an anterior communicating artery berry aneurysm",
      "Sudden onset of excruciating headache, described as the 'worst of life'",
      "Transient loss of consciousness followed by severe neck stiffness",
      "Non-contrast head CT showing hyperdensity in the basal cisterns"
    ],
    "options": [
      "Migraine",
      "Subarachnoid Hemorrhage",
      "Meningitis",
      "Tension Headache"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1092",
    "patient": "William A., 54M",
    "vitals": "BP 119/75 • HR 101 • O2 94% • Temp 39.1C",
    "symptoms": [
      "Altered mental status ranging from confusion to stupor",
      "Positive Kernig's and Brudzinski's signs on physical exam",
      "Marked nuchal rigidity and neck stiffness on passive flexion",
      "CSF analysis showing elevated neutrophils, low glucose, and high protein"
    ],
    "options": [
      "Viral Encephalitis",
      "Subarachnoid Hemorrhage",
      "Bacterial Meningitis",
      "Brain Abscess"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1093",
    "patient": "Benjamin Y., 21M",
    "vitals": "BP 128/79 • HR 70 • O2 97%",
    "symptoms": [
      "Sudden onset of unilateral facial paralysis involving the entire half face",
      "Inability to raise the eyebrow or wrinkle the forehead on the affected side",
      "Inability to close the eye on the affected side completely",
      "Drooling from the corner of the mouth and loss of taste on anterior tongue"
    ],
    "options": [
      "Stroke",
      "Bell's Palsy",
      "Trigeminal Neuralgia",
      "Myasthenia Gravis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1094",
    "patient": "Jennifer P., 27F",
    "vitals": "BP 124/74 • HR 93 • O2 97% • Temp 38.6C",
    "symptoms": [
      "Positive Rovsing's sign and obturator sign on examination",
      "Exquisite tenderness at McBurney's point and positive rebound tenderness",
      "Nausea, vomiting, anorexia, and localized abdominal guarding",
      "Mild fever and peripheral leukocytosis with left shift"
    ],
    "options": [
      "Ectopic Pregnancy",
      "Ovarian Torsion",
      "Acute Appendicitis",
      "Kidney Stone"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1095",
    "patient": "Margaret E., 52F",
    "vitals": "BP 133/90 • HR 96 • O2 95% • Temp 38.3C",
    "symptoms": [
      "Severe right upper quadrant pain radiating to the right scapula",
      "Pain triggered or worsened by ingestion of fatty meals",
      "Ultrasound showing gallstones, gallbladder wall thickening, and pericholecystic fluid",
      "Inspiration arrest on deep palpation of the right upper quadrant (Murphy's sign)"
    ],
    "options": [
      "Acute Cholecystitis",
      "Acute Pancreatitis",
      "Peptic Ulcer Disease",
      "Hepatitis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1096",
    "patient": "Jack K., 61M",
    "vitals": "BP 106/78 • HR 119 • O2 96% • Temp 38.4C",
    "symptoms": [
      "Severe, boring epigastric abdominal pain radiating straight to the back",
      "Constant nausea and intractable vomiting without relief of pain",
      "Pain that is partially relieved by sitting up and leaning forward",
      "History of chronic alcohol abuse or gallstones"
    ],
    "options": [
      "Perforated Ulcer",
      "Acute Pancreatitis",
      "Mesenteric Ischemia",
      "Aortic Aneurysm Rupture"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1097",
    "patient": "Nicole I., 72F",
    "vitals": "BP 110/75 • HR 102 • O2 99% • Temp 38.3C",
    "symptoms": [
      "Tender palpable mass in the left lower quadrant on palpation",
      "Changes in bowel habits, commonly constipation or loose stools",
      "Low-grade fever, chills, and mild abdominal bloating",
      "CT scan of abdomen showing colonic wall thickening and fat stranding"
    ],
    "options": [
      "Appendicitis",
      "Acute Diverticulitis",
      "Colon Cancer",
      "Ulcerative Colitis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1098",
    "patient": "Ashley N., 30F",
    "vitals": "BP 86/48 • HR 123 • O2 94%",
    "symptoms": [
      "Positive serum beta-hCG with lack of an intrauterine gestational sac",
      "Hemoperitoneum and pelvic free fluid seen on transvaginal ultrasound",
      "Dizziness, lightheadedness, and referred left shoulder pain",
      "Missed menstrual cycle by 2-4 weeks with vaginal bleeding or spotting"
    ],
    "options": [
      "Ovarian Torsion",
      "Ruptured Ectopic Pregnancy",
      "Pelvic Inflammatory Disease",
      "Endometriosis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1099",
    "patient": "Emily P., 32F",
    "vitals": "BP 139/84 • HR 99 • O2 99%",
    "symptoms": [
      "Gross or microscopic hematuria on urinalysis",
      "Exquisite costovertebral angle tenderness on the affected side",
      "Sudden onset of severe, colicky flank pain radiating to the groin",
      "CT scan of abdomen/pelvis without contrast showing obstructive calculus"
    ],
    "options": [
      "Pyelonephritis",
      "Testicular Torsion",
      "Nephrolithiasis (Kidney Stone)",
      "Appendicitis"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1100",
    "patient": "Daniel A., 16M",
    "vitals": "BP 110/80 • HR 111 • O2 99%",
    "symptoms": [
      "Absent cremasteric reflex on the affected side upon thigh stroking",
      "High-riding, horizontally oriented testicle on the affected side",
      "Sudden onset of severe, constant unilateral scrotal and inguinal pain",
      "Markedly decreased or absent blood flow on scrotal Doppler ultrasound"
    ],
    "options": [
      "Epididymitis",
      "Testicular Torsion",
      "Inguinal Hernia",
      "Hydrocele"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1101",
    "patient": "Raymond E., 12M",
    "vitals": "BP 97/51 • HR 128 • O2 96%",
    "symptoms": [
      "Serum blood glucose level of 450 mg/dL and metabolic acidosis",
      "Fruity breath odor (acetone) and deep, rapid Kussmaul respirations",
      "Progressive nausea, vomiting, diffuse abdominal pain, and fatigue",
      "Polydipsia, polyuria, weight loss, and signs of dry mucosal dehydration"
    ],
    "options": [
      "Diabetic Ketoacidosis (DKA)",
      "Hyperosmolar Hyperglycemic State",
      "Sepsis",
      "Salicylate Toxicity"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1102",
    "patient": "Andrew I., 53M",
    "vitals": "BP 88/60 • HR 123 • O2 90% • Temp 39.9C",
    "symptoms": [
      "Altered mental status, confusion, and worsening lethargy",
      "Warm, flushed skin (early phase) or cool, clammy mottled extremities (late)",
      "Refractory hypotension unresponsive to adequate intravenous fluid resuscitation",
      "Elevated blood lactate levels and severe peripheral leukocytosis"
    ],
    "options": [
      "Cardiogenic Shock",
      "Septic Shock",
      "Hypovolemic Shock",
      "Neurogenic Shock"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1103",
    "patient": "Betty Z., 44F",
    "vitals": "BP 129/72 • HR 130 • O2 96%",
    "symptoms": [
      "Weight loss despite increased appetite and frequent bowel movements",
      "Heat intolerance, fine hand tremors, palpitations, and anxiety",
      "Undetectable serum TSH with elevated free T3 and T4 levels",
      "Diffuse non-tender thyroid enlargement (goiter) with thyroid bruit"
    ],
    "options": [
      "Hypothyroidism",
      "Pheochromocytoma",
      "Hyperthyroidism (Graves' Disease)",
      "Cushing's Syndrome"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1104",
    "patient": "Joseph O., 21M",
    "vitals": "BP 92/52 • HR 121 • O2 93%",
    "symptoms": [
      "Severe dyspnea and hypotension following penetrating chest trauma",
      "Echocardiogram showing diastolic collapse of the right ventricle",
      "Muffled, distant heart sounds on auscultation (Beck's triad)",
      "Pulsus paradoxus (drop in systolic blood pressure >10 mmHg on inspiration)"
    ],
    "options": [
      "Tension Pneumothorax",
      "Cardiac Tamponade",
      "Massive Hemothorax",
      "Flail Chest"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1105",
    "patient": "Jack E., 59M",
    "vitals": "BP 75/48 • HR 144 • O2 80%",
    "symptoms": [
      "Severe progressive respiratory distress and hypotension after chest wall injury",
      "Tracheal deviation to the contralateral side away from the injury",
      "Immediate clinical improvement upon needle decompression in 2nd intercostal space",
      "Hyperresonance to percussion and absent breath sounds on the affected side"
    ],
    "options": [
      "Cardiac Tamponade",
      "Tension Pneumothorax",
      "Pulmonary Contusion",
      "Aortic Rupture"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1106",
    "patient": "Helen P., 65F",
    "vitals": "BP 122/79 • HR 75 • O2 96%",
    "symptoms": [
      "Radiograph showing extra-articular transverse distal radius fracture",
      "Localized tenderness over the distal radial metaphysis",
      "Classic dorsal displacement and angulation of the distal radius (dinner fork deformity)",
      "Severe wrist pain and swelling after falling on an outstretched hand (FOOSH)"
    ],
    "options": [
      "Smith's Fracture",
      "Colles' Fracture",
      "Scaphoid Fracture",
      "Galeazzi Fracture"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1107",
    "patient": "Shirley J., 37F",
    "vitals": "BP 95/64 • HR 63 • O2 81% • Temp 35.6C",
    "symptoms": [
      "Symmetric pinpoint pupils (miosis) bilaterally",
      "Rapid improvement in respiratory rate and level of consciousness after IV naloxone",
      "Patient found completely unresponsive, cyanotic, and hypoventilating",
      "Severe respiratory depression with respiratory rate less than 8 breaths/minute"
    ],
    "options": [
      "Cocaine Overdose",
      "Benzodiazepine Overdose",
      "Opioid Overdose",
      "Alcohol Poisoning"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1108",
    "patient": "Gregory K., 23M",
    "vitals": "BP 113/61 • HR 129 • O2 98% • Temp 38.6C",
    "symptoms": [
      "Intense bilateral tinnitus (ringing in the ears) and hearing loss",
      "Marked hyperventilation, nausea, vomiting, and epigastric distress",
      "Mixed respiratory alkalosis and high anion gap metabolic acidosis",
      "Agitation, confusion, diaphoresis, and progressive lethargy"
    ],
    "options": [
      "Acetaminophen Toxicity",
      "Aspirin (Salicylate) Toxicity",
      "Iron Toxicity",
      "Lead Poisoning"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1109",
    "patient": "Eric E., 51M",
    "vitals": "BP 97/54 • HR 59 • O2 91%",
    "symptoms": [
      "Profuse generalized sweating, salivation, lacrimation, and rhinorrhea",
      "Recent exposure to agricultural pesticides or crop dusting",
      "Incontinence of urine and feces with severe abdominal cramping",
      "Diffuse wheezing, bradycardia, and bronchial hypersecretion"
    ],
    "options": [
      "Organophosphate Poisoning",
      "Anticholinergic Toxicity",
      "Opioid Toxicity",
      "Carbon Monoxide Poisoning"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1110",
    "patient": "Catherine V., 22F",
    "vitals": "BP 113/65 • HR 58 • O2 95% • Temp 39.1C",
    "symptoms": [
      "Abdominal pain, splenomegaly, and constipation followed by watery diarrhea",
      "Gradual onset of step-ladder pattern fever and severe frontal headache",
      "Recent travel to an endemic country with poor sanitation",
      "Relative bradycardia (pulse-temperature dissociation)"
    ],
    "options": [
      "Typhoid Fever",
      "Malaria",
      "Dengue Fever",
      "Leptospirosis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1111",
    "patient": "Patricia C., 22F",
    "vitals": "BP 112/71 • HR 97 • O2 98% • Temp 40.2C",
    "symptoms": [
      "Laboratory evidence of marked leukopenia and thrombocytopenia",
      "Sudden onset of high-grade fever, chills, and severe retro-orbital pain",
      "Exquisite joint, muscle, and bone pain described as 'breakbone'",
      "Generalized maculopapular rash blanching on pressure"
    ],
    "options": [
      "Zika Virus",
      "Dengue Fever",
      "Chikungunya",
      "Yellow Fever"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1112",
    "patient": "Paul N., 36M",
    "vitals": "BP 104/73 • HR 95 • O2 93% • Temp 39.5C",
    "symptoms": [
      "Thick and thin blood smears showing trophozoites and Schüffner's dots",
      "Scleral icterus, splenomegaly, anemia, and mild thrombocytopenia",
      "Paroxysmal cyclical high fevers and shaking chills occurring every 48 hours",
      "Recent travel to a tropical region without taking chemoprophylaxis"
    ],
    "options": [
      "Malaria (P. falciparum)",
      "Malaria (P. vivax)",
      "Babesiosis",
      "Visceral Leishmaniasis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1113",
    "patient": "Lisa P., 36F",
    "vitals": "BP 133/83 • HR 79 • O2 98%",
    "symptoms": [
      "Urinalysis showing proteinuria and red blood cell casts",
      "Erythematous malar rash over the cheeks and bridge of nose, sparing nasolabial folds",
      "Painless oral ulcers, fatigue, and recurrent low-grade fevers",
      "Photosensitivity rash and multiple painful joints (polyarthritis)"
    ],
    "options": [
      "Systemic Lupus Erythematosus",
      "Rosacea",
      "Dermatomyositis",
      "Rheumatoid Arthritis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1114",
    "patient": "Ronald Z., 73M",
    "vitals": "BP 135/86 • HR 86 • O2 97% • Temp 38.1C",
    "symptoms": [
      "Joint aspirate showing needle-shaped, negatively birefringent crystals",
      "Symptoms peaked rapidly within 12 to 24 hours of onset",
      "Joint is erythematous, hot, swollen, and exquisitely sensitive to light touch",
      "History of frequent alcohol consumption and purine-rich diet"
    ],
    "options": [
      "Pseudogout",
      "Septic Arthritis",
      "Acute Gouty Arthritis",
      "Osteoarthritis Exacerbation"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1115",
    "patient": "Helen L., 47F",
    "vitals": "BP 87/58 • HR 118 • O2 82%",
    "symptoms": [
      "Rapid resolution of symptoms following intramuscular epinephrine injection",
      "Nausea, vomiting, and diffuse abdominal cramps",
      "Profound hypotension and dizziness shortly after eating peanut butter or seafood",
      "Inspiratory stridor, wheezing, dyspnea, and feeling of throat tightness"
    ],
    "options": [
      "Asthma Attack",
      "Panic Attack",
      "Vasovagal Syncope",
      "Anaphylaxis"
    ],
    "answer": 3
  },
  {
    "id": "CASE-1116",
    "patient": "Susan O., 51F",
    "vitals": "BP 119/75 • HR 96 • O2 98%",
    "symptoms": [
      "Unilateral lower extremity calf pain, swelling, and warmth",
      "Calf circumference measurement is 4 cm larger on the symptomatic side",
      "Pain in the calf elicited by passive dorsiflexion of the foot (Homan's sign)",
      "History of prolonged bed rest, malignancy, or oral contraceptive use"
    ],
    "options": [
      "Cellulitis",
      "Baker's Cyst Rupture",
      "Deep Vein Thrombosis (DVT)",
      "Superficial Thrombophlebitis"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1117",
    "patient": "Justin E., 71M",
    "vitals": "BP 143/87 • HR 115 • O2 85% • Temp 37.6C",
    "symptoms": [
      "Worsening baseline shortness of breath and chronic cough",
      "Marked increase in sputum volume and sputum purulence",
      "Diffuse wheezing and distant breath sounds on lung auscultation",
      "Classic barrel chest, accessory muscle use, and history of heavy smoking"
    ],
    "options": [
      "Asthma Exacerbation",
      "Congestive Heart Failure",
      "COPD Exacerbation",
      "Pulmonary Embolism"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1118",
    "patient": "Aaron P., 72M",
    "vitals": "BP 121/85 • HR 95 • O2 99% • Temp 37.8C",
    "symptoms": [
      "Spreading, poorly demarcated area of skin erythema, warmth, and swelling",
      "Small portal of entry, such as tinea pedis or a minor abrasion",
      "Associated low-grade fever, chills, and mild inguinal lymphadenopathy",
      "Localized skin tenderness and pain over the lower leg"
    ],
    "options": [
      "Deep Vein Thrombosis",
      "Cellulitis",
      "Erysipelas",
      "Necrotizing Fasciitis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1119",
    "patient": "Pamela L., 45F",
    "vitals": "BP 129/74 • HR 110 • O2 99%",
    "symptoms": [
      "Multiple family members or roommates presenting with identical symptoms",
      "Dull, throbbing, generalized headache, dizziness, and nausea",
      "Confusion, fatigue, and irritability without fever or neck stiffness",
      "Falsely normal 100% pulse oximetry readings on room air"
    ],
    "options": [
      "Influenza",
      "Food Poisoning",
      "Migraine",
      "Carbon Monoxide Poisoning"
    ],
    "answer": 3
  },
  {
    "id": "CASE-1120",
    "patient": "Samantha R., 47F",
    "vitals": "BP 131/67 • HR 113 • O2 96%",
    "symptoms": [
      "Sudden onset of profuse diaphoresis, hand tremors, and palpitations",
      "Rapid correction of symptoms and recovery of consciousness after D50 IV push",
      "Fingerstick blood glucose reading of 42 mg/dL",
      "Severe confusion, irritability, slurred speech, and combative behavior"
    ],
    "options": [
      "Ischemic Stroke",
      "Opioid Overdose",
      "Diabetic Ketoacidosis",
      "Hypoglycemia"
    ],
    "answer": 3
  },
  {
    "id": "CASE-1121",
    "patient": "Cynthia P., 46F",
    "vitals": "BP 90/80 • HR 83 • O2 91%",
    "symptoms": [
      "History of coronary artery disease, hyperlipidemia, and heavy smoking",
      "Significantly elevated serum cardiac troponin levels",
      "ECG showing ST-segment elevations in anterior leads V1-V4",
      "Profuse diaphoresis, nausea, and shortness of breath"
    ],
    "options": [
      "Myocardial Infarction",
      "Gastroesophageal Reflux",
      "Costochondritis",
      "Acute Pericarditis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1122",
    "patient": "Matthew D., 54M",
    "vitals": "BP 169/102 • HR 104 • O2 92%",
    "symptoms": [
      "Sudden onset, tearing substernal chest pain radiating to the back",
      "Asymmetric blood pressure readings in upper extremities",
      "History of poorly controlled chronic hypertension",
      "Aortic regurgitation murmur heard along the right sternal border"
    ],
    "options": [
      "Myocardial Infarction",
      "Aortic Dissection",
      "Pulmonary Embolism",
      "Tension Pneumothorax"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1123",
    "patient": "Melissa K., 23F",
    "vitals": "BP 108/73 • HR 193 • O2 98%",
    "symptoms": [
      "Rapid resolution of tachycardia upon carotid sinus massage",
      "ECG showing regular, narrow-complex tachycardia without visible P waves",
      "Mild lightheadedness and feeling of chest pressure",
      "Sudden onset of heart racing and severe palpitations"
    ],
    "options": [
      "Atrial Fibrillation",
      "Supraventricular Tachycardia (SVT)",
      "Ventricular Tachycardia",
      "Sinus Tachycardia"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1124",
    "patient": "Timothy F., 69M",
    "vitals": "BP 141/89 • HR 106 • O2 90%",
    "symptoms": [
      "Increased cardiomegaly and cephalization on chest X-ray",
      "Progressive exertional dyspnea and orthopnea",
      "Paroxysmal nocturnal dyspnea causing patient to wake up gasping",
      "Bilateral pitting lower extremity edema and jugular venous distension"
    ],
    "options": [
      "Congestive Heart Failure",
      "COPD Exacerbation",
      "Pulmonary Fibrosis",
      "Cor Pulmonale"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1125",
    "patient": "Jerry D., 22M",
    "vitals": "BP 123/67 • HR 105 • O2 96% • Temp 38.0C",
    "symptoms": [
      "Pericardial friction rub heard best at the left lower sternal border",
      "Chest pain that is relieved by sitting up and leaning forward",
      "Sharp retrosternal chest pain that worsens on inspiration and lying flat",
      "ECG showing diffuse ST-segment elevation with PR-segment depression"
    ],
    "options": [
      "Myocardial Infarction",
      "Pulmonary Embolism",
      "Acute Pericarditis",
      "Gastroesophageal Reflux"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1126",
    "patient": "Stephanie K., 48F",
    "vitals": "BP 117/63 • HR 110 • O2 88%",
    "symptoms": [
      "Sudden onset of severe shortness of breath and pleuritic chest pain",
      "Recent prolonged immobilization due to a transatlantic flight or surgery",
      "Unilateral calf swelling, erythema, and deep venous tenderness",
      "Significantly elevated D-dimer levels and mismatched perfusion defect on V/Q scan"
    ],
    "options": [
      "Pneumonia",
      "Asthma Exacerbation",
      "Pulmonary Embolism",
      "Pneumothorax"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1127",
    "patient": "Robert G., 21M",
    "vitals": "BP 111/83 • HR 107 • O2 91%",
    "symptoms": [
      "Sudden onset of sharp, unilateral pleuritic chest pain and dyspnea",
      "Asthenic tall, thin male body habitus",
      "Markedly decreased breath sounds and tactile fremitus on the affected side",
      "Hyperresonance to percussion over the ipsilateral chest wall"
    ],
    "options": [
      "Spontaneous Pneumothorax",
      "Asthma Attack",
      "Pulmonary Embolism",
      "Cardiac Tamponade"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1128",
    "patient": "Gregory C., 39M",
    "vitals": "BP 111/70 • HR 95 • O2 89% • Temp 38.6C",
    "symptoms": [
      "Chest X-ray showing lobar consolidation with air bronchograms",
      "Productive cough with thick rust-colored or purulent sputum",
      "High fever, shaking chills, and pleuritic chest discomfort",
      "Bronchial breath sounds and late inspiratory crackles on auscultation"
    ],
    "options": [
      "Lobar Pneumonia",
      "Tuberculosis",
      "Lung Cancer",
      "Pulmonary Edema"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1129",
    "patient": "Lisa R., 37F",
    "vitals": "BP 111/75 • HR 126 • O2 91%",
    "symptoms": [
      "Prolonged expiratory phase and reduced peak expiratory flow rate",
      "Long-standing history of atopy, allergic rhinitis, or childhood eczema",
      "Use of accessory respiratory muscles and intercostal retractions",
      "Triggered by recent exposure to cold air, pollen, or an upper respiratory infection"
    ],
    "options": [
      "Foreign Body Aspiration",
      "Asthma Exacerbation",
      "Croup",
      "Epiglottitis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1130",
    "patient": "Cynthia C., 83F",
    "vitals": "BP 157/97 • HR 85 • O2 98%",
    "symptoms": [
      "Expressive or receptive motor aphasia and slurred speech",
      "Symptoms developed suddenly within the past few hours",
      "Gaze deviation toward the side of the cortical lesion",
      "Contralateral hemisensory loss and marked pronator drift"
    ],
    "options": [
      "Ischemic Stroke (MCA)",
      "Hemorrhagic Stroke",
      "Bell's Palsy",
      "Complex Partial Seizure"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1131",
    "patient": "Jerry T., 50M",
    "vitals": "BP 176/100 • HR 78 • O2 97%",
    "symptoms": [
      "Transient loss of consciousness followed by severe neck stiffness",
      "Marked photophobia, nausea, vomiting, and meningismus",
      "Sudden onset of excruciating headache, described as the 'worst of life'",
      "Rupture of an anterior communicating artery berry aneurysm"
    ],
    "options": [
      "Migraine",
      "Subarachnoid Hemorrhage",
      "Meningitis",
      "Tension Headache"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1132",
    "patient": "Paul G., 55M",
    "vitals": "BP 128/80 • HR 99 • O2 95% • Temp 39.4C",
    "symptoms": [
      "Marked nuchal rigidity and neck stiffness on passive flexion",
      "Altered mental status ranging from confusion to stupor",
      "Positive Kernig's and Brudzinski's signs on physical exam",
      "Severe generalized headache, high fever, and shaking chills"
    ],
    "options": [
      "Viral Encephalitis",
      "Subarachnoid Hemorrhage",
      "Bacterial Meningitis",
      "Brain Abscess"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1133",
    "patient": "Scott C., 41M",
    "vitals": "BP 111/85 • HR 79 • O2 100%",
    "symptoms": [
      "Sudden onset of unilateral facial paralysis involving the entire half face",
      "Hyperacusis and decreased lacrimation on the affected side",
      "Inability to raise the eyebrow or wrinkle the forehead on the affected side",
      "Drooling from the corner of the mouth and loss of taste on anterior tongue"
    ],
    "options": [
      "Stroke",
      "Bell's Palsy",
      "Trigeminal Neuralgia",
      "Myasthenia Gravis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1134",
    "patient": "Brian S., 16M",
    "vitals": "BP 109/74 • HR 109 • O2 99% • Temp 38.7C",
    "symptoms": [
      "Dull periumbilical pain migrating and localizing to the right lower quadrant",
      "Nausea, vomiting, anorexia, and localized abdominal guarding",
      "Mild fever and peripheral leukocytosis with left shift",
      "Positive Rovsing's sign and obturator sign on examination"
    ],
    "options": [
      "Ectopic Pregnancy",
      "Ovarian Torsion",
      "Acute Appendicitis",
      "Kidney Stone"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1135",
    "patient": "Cynthia O., 44F",
    "vitals": "BP 129/83 • HR 108 • O2 95% • Temp 38.8C",
    "symptoms": [
      "Ultrasound showing gallstones, gallbladder wall thickening, and pericholecystic fluid",
      "Inspiration arrest on deep palpation of the right upper quadrant (Murphy's sign)",
      "Persistent nausea, vomiting, low-grade fever, and mild leukocytosis",
      "Pain triggered or worsened by ingestion of fatty meals"
    ],
    "options": [
      "Acute Cholecystitis",
      "Acute Pancreatitis",
      "Peptic Ulcer Disease",
      "Hepatitis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1136",
    "patient": "Jose G., 59M",
    "vitals": "BP 94/69 • HR 112 • O2 95% • Temp 37.7C",
    "symptoms": [
      "Marked elevations in serum amylase and lipase levels (>3x normal)",
      "History of chronic alcohol abuse or gallstones",
      "Pain that is partially relieved by sitting up and leaning forward",
      "Constant nausea and intractable vomiting without relief of pain"
    ],
    "options": [
      "Perforated Ulcer",
      "Acute Pancreatitis",
      "Mesenteric Ischemia",
      "Aortic Aneurysm Rupture"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1137",
    "patient": "Carol M., 51F",
    "vitals": "BP 115/71 • HR 85 • O2 98% • Temp 38.0C",
    "symptoms": [
      "Constant left lower quadrant abdominal pain and tenderness",
      "Tender palpable mass in the left lower quadrant on palpation",
      "CT scan of abdomen showing colonic wall thickening and fat stranding",
      "Low-grade fever, chills, and mild abdominal bloating"
    ],
    "options": [
      "Appendicitis",
      "Acute Diverticulitis",
      "Colon Cancer",
      "Ulcerative Colitis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1138",
    "patient": "Deborah G., 32F",
    "vitals": "BP 89/50 • HR 126 • O2 94%",
    "symptoms": [
      "Sudden onset of severe, sharp, unilateral pelvic and lower abdominal pain",
      "Positive serum beta-hCG with lack of an intrauterine gestational sac",
      "Missed menstrual cycle by 2-4 weeks with vaginal bleeding or spotting",
      "Hemoperitoneum and pelvic free fluid seen on transvaginal ultrasound"
    ],
    "options": [
      "Ovarian Torsion",
      "Ruptured Ectopic Pregnancy",
      "Pelvic Inflammatory Disease",
      "Endometriosis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1139",
    "patient": "Emily W., 40F",
    "vitals": "BP 151/92 • HR 96 • O2 100%",
    "symptoms": [
      "CT scan of abdomen/pelvis without contrast showing obstructive calculus",
      "Gross or microscopic hematuria on urinalysis",
      "Exquisite costovertebral angle tenderness on the affected side",
      "Inability to lie still, pacing or squirming in pain"
    ],
    "options": [
      "Pyelonephritis",
      "Testicular Torsion",
      "Nephrolithiasis (Kidney Stone)",
      "Appendicitis"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1140",
    "patient": "John S., 13M",
    "vitals": "BP 110/71 • HR 114 • O2 98%",
    "symptoms": [
      "Sudden onset of severe, constant unilateral scrotal and inguinal pain",
      "High-riding, horizontally oriented testicle on the affected side",
      "Markedly decreased or absent blood flow on scrotal Doppler ultrasound",
      "Absent cremasteric reflex on the affected side upon thigh stroking"
    ],
    "options": [
      "Epididymitis",
      "Testicular Torsion",
      "Inguinal Hernia",
      "Hydrocele"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1141",
    "patient": "Dennis M., 25M",
    "vitals": "BP 95/57 • HR 131 • O2 96%",
    "symptoms": [
      "Polydipsia, polyuria, weight loss, and signs of dry mucosal dehydration",
      "Fruity breath odor (acetone) and deep, rapid Kussmaul respirations",
      "Serum blood glucose level of 450 mg/dL and metabolic acidosis",
      "Positive urine and serum ketones with increased anion gap"
    ],
    "options": [
      "Diabetic Ketoacidosis (DKA)",
      "Hyperosmolar Hyperglycemic State",
      "Sepsis",
      "Salicylate Toxicity"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1142",
    "patient": "Donna B., 69F",
    "vitals": "BP 88/48 • HR 119 • O2 88% • Temp 39.9C",
    "symptoms": [
      "Refractory hypotension unresponsive to adequate intravenous fluid resuscitation",
      "Warm, flushed skin (early phase) or cool, clammy mottled extremities (late)",
      "Elevated blood lactate levels and severe peripheral leukocytosis",
      "Altered mental status, confusion, and worsening lethargy"
    ],
    "options": [
      "Cardiogenic Shock",
      "Septic Shock",
      "Hypovolemic Shock",
      "Neurogenic Shock"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1143",
    "patient": "Kathleen Y., 36F",
    "vitals": "BP 141/67 • HR 122 • O2 99%",
    "symptoms": [
      "Undetectable serum TSH with elevated free T3 and T4 levels",
      "Proptosis, lid lag, exophthalmos, and pretibial myxedema",
      "Diffuse non-tender thyroid enlargement (goiter) with thyroid bruit",
      "Heat intolerance, fine hand tremors, palpitations, and anxiety"
    ],
    "options": [
      "Hypothyroidism",
      "Pheochromocytoma",
      "Hyperthyroidism (Graves' Disease)",
      "Cushing's Syndrome"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1144",
    "patient": "Dennis O., 48M",
    "vitals": "BP 89/60 • HR 122 • O2 92%",
    "symptoms": [
      "Pulsus paradoxus (drop in systolic blood pressure >10 mmHg on inspiration)",
      "Severe dyspnea and hypotension following penetrating chest trauma",
      "Echocardiogram showing diastolic collapse of the right ventricle",
      "Distended jugular veins (JVD) with prominent x-descent and absent y-descent"
    ],
    "options": [
      "Tension Pneumothorax",
      "Cardiac Tamponade",
      "Massive Hemothorax",
      "Flail Chest"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1145",
    "patient": "Kevin Y., 33M",
    "vitals": "BP 81/53 • HR 122 • O2 80%",
    "symptoms": [
      "Immediate clinical improvement upon needle decompression in 2nd intercostal space",
      "Hyperresonance to percussion and absent breath sounds on the affected side",
      "Tracheal deviation to the contralateral side away from the injury",
      "Severe progressive respiratory distress and hypotension after chest wall injury"
    ],
    "options": [
      "Cardiac Tamponade",
      "Tension Pneumothorax",
      "Pulmonary Contusion",
      "Aortic Rupture"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1146",
    "patient": "Kathleen Z., 73F",
    "vitals": "BP 130/83 • HR 94 • O2 96%",
    "symptoms": [
      "Localized tenderness over the distal radial metaphysis",
      "Pain exacerbated by active or passive wrist movements",
      "Radiograph showing extra-articular transverse distal radius fracture",
      "Severe wrist pain and swelling after falling on an outstretched hand (FOOSH)"
    ],
    "options": [
      "Smith's Fracture",
      "Colles' Fracture",
      "Scaphoid Fracture",
      "Galeazzi Fracture"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1147",
    "patient": "Catherine F., 50F",
    "vitals": "BP 103/51 • HR 46 • O2 81%",
    "symptoms": [
      "Severe respiratory depression with respiratory rate less than 8 breaths/minute",
      "Symmetric pinpoint pupils (miosis) bilaterally",
      "Patient found completely unresponsive, cyanotic, and hypoventilating",
      "Multiple skin track marks over forearm veins"
    ],
    "options": [
      "Cocaine Overdose",
      "Benzodiazepine Overdose",
      "Opioid Overdose",
      "Alcohol Poisoning"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1148",
    "patient": "Aaron Z., 41M",
    "vitals": "BP 106/60 • HR 110 • O2 96% • Temp 38.4C",
    "symptoms": [
      "Agitation, confusion, diaphoresis, and progressive lethargy",
      "Intense bilateral tinnitus (ringing in the ears) and hearing loss",
      "Marked hyperventilation, nausea, vomiting, and epigastric distress",
      "Toxic serum salicylate levels following ingestion of an unknown medication"
    ],
    "options": [
      "Acetaminophen Toxicity",
      "Aspirin (Salicylate) Toxicity",
      "Iron Toxicity",
      "Lead Poisoning"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1149",
    "patient": "Ronald C., 37M",
    "vitals": "BP 84/71 • HR 51 • O2 90%",
    "symptoms": [
      "Recent exposure to agricultural pesticides or crop dusting",
      "Diffuse wheezing, bradycardia, and bronchial hypersecretion",
      "Pinpoint pupils (miosis) and muscle fasciculations/weakness",
      "Incontinence of urine and feces with severe abdominal cramping"
    ],
    "options": [
      "Organophosphate Poisoning",
      "Anticholinergic Toxicity",
      "Opioid Toxicity",
      "Carbon Monoxide Poisoning"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1150",
    "patient": "Frank G., 20M",
    "vitals": "BP 114/71 • HR 59 • O2 97% • Temp 39.6C",
    "symptoms": [
      "Relative bradycardia (pulse-temperature dissociation)",
      "Abdominal pain, splenomegaly, and constipation followed by watery diarrhea",
      "Recent travel to an endemic country with poor sanitation",
      "Faint, rose-colored macules (rose spots) on the abdomen and chest"
    ],
    "options": [
      "Typhoid Fever",
      "Malaria",
      "Dengue Fever",
      "Leptospirosis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1151",
    "patient": "Christopher P., 44M",
    "vitals": "BP 114/70 • HR 98 • O2 96% • Temp 39.1C",
    "symptoms": [
      "Sudden onset of high-grade fever, chills, and severe retro-orbital pain",
      "Exquisite joint, muscle, and bone pain described as 'breakbone'",
      "Generalized maculopapular rash blanching on pressure",
      "Laboratory evidence of marked leukopenia and thrombocytopenia"
    ],
    "options": [
      "Zika Virus",
      "Dengue Fever",
      "Chikungunya",
      "Yellow Fever"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1152",
    "patient": "Betty S., 38F",
    "vitals": "BP 119/69 • HR 106 • O2 95% • Temp 38.8C",
    "symptoms": [
      "Recent travel to a tropical region without taking chemoprophylaxis",
      "Thick and thin blood smears showing trophozoites and Schüffner's dots",
      "Scleral icterus, splenomegaly, anemia, and mild thrombocytopenia",
      "Profuse sweating as the fever breaks, followed by extreme fatigue"
    ],
    "options": [
      "Malaria (P. falciparum)",
      "Malaria (P. vivax)",
      "Babesiosis",
      "Visceral Leishmaniasis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1153",
    "patient": "Jennifer R., 24F",
    "vitals": "BP 120/80 • HR 77 • O2 99%",
    "symptoms": [
      "High titer positive antinuclear antibodies (ANA) and anti-dsDNA antibodies",
      "Photosensitivity rash and multiple painful joints (polyarthritis)",
      "Erythematous malar rash over the cheeks and bridge of nose, sparing nasolabial folds",
      "Urinalysis showing proteinuria and red blood cell casts"
    ],
    "options": [
      "Systemic Lupus Erythematosus",
      "Rosacea",
      "Dermatomyositis",
      "Rheumatoid Arthritis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1154",
    "patient": "Robert A., 49M",
    "vitals": "BP 142/81 • HR 100 • O2 99% • Temp 38.2C",
    "symptoms": [
      "Joint aspirate showing needle-shaped, negatively birefringent crystals",
      "History of frequent alcohol consumption and purine-rich diet",
      "Symptoms peaked rapidly within 12 to 24 hours of onset",
      "Joint is erythematous, hot, swollen, and exquisitely sensitive to light touch"
    ],
    "options": [
      "Pseudogout",
      "Septic Arthritis",
      "Acute Gouty Arthritis",
      "Osteoarthritis Exacerbation"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1155",
    "patient": "Emma E., 40F",
    "vitals": "BP 76/49 • HR 134 • O2 85%",
    "symptoms": [
      "Acute onset of diffuse pruritic hives, urticaria, and lip/tongue swelling",
      "Inspiratory stridor, wheezing, dyspnea, and feeling of throat tightness",
      "Profound hypotension and dizziness shortly after eating peanut butter or seafood",
      "Nausea, vomiting, and diffuse abdominal cramps"
    ],
    "options": [
      "Asthma Attack",
      "Panic Attack",
      "Vasovagal Syncope",
      "Anaphylaxis"
    ],
    "answer": 3
  },
  {
    "id": "CASE-1156",
    "patient": "Karen F., 40F",
    "vitals": "BP 132/85 • HR 90 • O2 98% • Temp 37.8C",
    "symptoms": [
      "History of prolonged bed rest, malignancy, or oral contraceptive use",
      "Compression ultrasound showing non-compressible popliteal or femoral vein",
      "Pain in the calf elicited by passive dorsiflexion of the foot (Homan's sign)",
      "Calf circumference measurement is 4 cm larger on the symptomatic side"
    ],
    "options": [
      "Cellulitis",
      "Baker's Cyst Rupture",
      "Deep Vein Thrombosis (DVT)",
      "Superficial Thrombophlebitis"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1157",
    "patient": "Jeffrey D., 68M",
    "vitals": "BP 138/88 • HR 108 • O2 86%",
    "symptoms": [
      "Classic barrel chest, accessory muscle use, and history of heavy smoking",
      "ABG showing chronic respiratory acidosis with compensatory bicarb retention",
      "Diffuse wheezing and distant breath sounds on lung auscultation",
      "Worsening baseline shortness of breath and chronic cough"
    ],
    "options": [
      "Asthma Exacerbation",
      "Congestive Heart Failure",
      "COPD Exacerbation",
      "Pulmonary Embolism"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1158",
    "patient": "Eric V., 49M",
    "vitals": "BP 116/83 • HR 80 • O2 99% • Temp 38.9C",
    "symptoms": [
      "Localized skin tenderness and pain over the lower leg",
      "Small portal of entry, such as tinea pedis or a minor abrasion",
      "Failure to improve with elevation alone; requires systemic antibiotics",
      "Associated low-grade fever, chills, and mild inguinal lymphadenopathy"
    ],
    "options": [
      "Deep Vein Thrombosis",
      "Cellulitis",
      "Erysipelas",
      "Necrotizing Fasciitis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1159",
    "patient": "Emily I., 29F",
    "vitals": "BP 110/80 • HR 92 • O2 100%",
    "symptoms": [
      "Confusion, fatigue, and irritability without fever or neck stiffness",
      "Multiple family members or roommates presenting with identical symptoms",
      "Elevated carboxyhemoglobin levels on arterial blood gas analysis",
      "Dull, throbbing, generalized headache, dizziness, and nausea"
    ],
    "options": [
      "Influenza",
      "Food Poisoning",
      "Migraine",
      "Carbon Monoxide Poisoning"
    ],
    "answer": 3
  },
  {
    "id": "CASE-1160",
    "patient": "Michael E., 25M",
    "vitals": "BP 123/78 • HR 102 • O2 96%",
    "symptoms": [
      "Sudden onset of profuse diaphoresis, hand tremors, and palpitations",
      "Severe confusion, irritability, slurred speech, and combative behavior",
      "Fingerstick blood glucose reading of 42 mg/dL",
      "History of type 1 diabetes mellitus and missed a meal after taking insulin"
    ],
    "options": [
      "Ischemic Stroke",
      "Opioid Overdose",
      "Diabetic Ketoacidosis",
      "Hypoglycemia"
    ],
    "answer": 3
  },
  {
    "id": "CASE-1161",
    "patient": "Frank I., 61M",
    "vitals": "BP 94/60 • HR 90 • O2 93%",
    "symptoms": [
      "Crushing retrosternal chest pain radiating to the left arm or jaw",
      "ECG showing ST-segment elevations in anterior leads V1-V4",
      "History of coronary artery disease, hyperlipidemia, and heavy smoking",
      "Significantly elevated serum cardiac troponin levels"
    ],
    "options": [
      "Myocardial Infarction",
      "Gastroesophageal Reflux",
      "Costochondritis",
      "Acute Pericarditis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1162",
    "patient": "Alexander O., 54M",
    "vitals": "BP 192/113 • HR 97 • O2 92%",
    "symptoms": [
      "History of poorly controlled chronic hypertension",
      "Widened mediastinum on chest radiograph",
      "Asymmetric blood pressure readings in upper extremities",
      "Sudden onset, tearing substernal chest pain radiating to the back"
    ],
    "options": [
      "Myocardial Infarction",
      "Aortic Dissection",
      "Pulmonary Embolism",
      "Tension Pneumothorax"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1163",
    "patient": "Barbara L., 53F",
    "vitals": "BP 111/79 • HR 203 • O2 99%",
    "symptoms": [
      "Recurrent episodes of sudden heart racing resolving spontaneously",
      "ECG showing regular, narrow-complex tachycardia without visible P waves",
      "Mild lightheadedness and feeling of chest pressure",
      "Sudden onset of heart racing and severe palpitations"
    ],
    "options": [
      "Atrial Fibrillation",
      "Supraventricular Tachycardia (SVT)",
      "Ventricular Tachycardia",
      "Sinus Tachycardia"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1164",
    "patient": "Matthew O., 87M",
    "vitals": "BP 149/94 • HR 108 • O2 93%",
    "symptoms": [
      "Progressive exertional dyspnea and orthopnea",
      "Paroxysmal nocturnal dyspnea causing patient to wake up gasping",
      "Bilateral pitting lower extremity edema and jugular venous distension",
      "S3 gallop on heart auscultation and bibasilar rales"
    ],
    "options": [
      "Congestive Heart Failure",
      "COPD Exacerbation",
      "Pulmonary Fibrosis",
      "Cor Pulmonale"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1165",
    "patient": "Laura K., 35F",
    "vitals": "BP 115/69 • HR 98 • O2 97% • Temp 38.1C",
    "symptoms": [
      "Chest pain that is relieved by sitting up and leaning forward",
      "Sharp retrosternal chest pain that worsens on inspiration and lying flat",
      "ECG showing diffuse ST-segment elevation with PR-segment depression",
      "Recent history of a self-limiting viral upper respiratory tract infection"
    ],
    "options": [
      "Myocardial Infarction",
      "Pulmonary Embolism",
      "Acute Pericarditis",
      "Gastroesophageal Reflux"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1166",
    "patient": "Scott P., 36M",
    "vitals": "BP 115/65 • HR 120 • O2 86%",
    "symptoms": [
      "Significantly elevated D-dimer levels and mismatched perfusion defect on V/Q scan",
      "Sinus tachycardia and S1Q3T3 pattern on electrocardiogram",
      "Unilateral calf swelling, erythema, and deep venous tenderness",
      "Recent prolonged immobilization due to a transatlantic flight or surgery"
    ],
    "options": [
      "Pneumonia",
      "Asthma Exacerbation",
      "Pulmonary Embolism",
      "Pneumothorax"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1167",
    "patient": "David V., 23M",
    "vitals": "BP 119/85 • HR 120 • O2 90%",
    "symptoms": [
      "Sudden onset of sharp, unilateral pleuritic chest pain and dyspnea",
      "Asthenic tall, thin male body habitus",
      "Markedly decreased breath sounds and tactile fremitus on the affected side",
      "Chest radiograph showing a visible pleural line and absence of lung markings"
    ],
    "options": [
      "Spontaneous Pneumothorax",
      "Asthma Attack",
      "Pulmonary Embolism",
      "Cardiac Tamponade"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1168",
    "patient": "Jeffrey T., 49M",
    "vitals": "BP 105/85 • HR 108 • O2 89% • Temp 38.6C",
    "symptoms": [
      "Chest X-ray showing lobar consolidation with air bronchograms",
      "Bronchial breath sounds and late inspiratory crackles on auscultation",
      "Productive cough with thick rust-colored or purulent sputum",
      "High fever, shaking chills, and pleuritic chest discomfort"
    ],
    "options": [
      "Lobar Pneumonia",
      "Tuberculosis",
      "Lung Cancer",
      "Pulmonary Edema"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1169",
    "patient": "Christopher S., 31M",
    "vitals": "BP 112/61 • HR 115 • O2 91%",
    "symptoms": [
      "Triggered by recent exposure to cold air, pollen, or an upper respiratory infection",
      "Prolonged expiratory phase and reduced peak expiratory flow rate",
      "Use of accessory respiratory muscles and intercostal retractions",
      "Widespread expiratory wheezing, chest tightness, and dry cough"
    ],
    "options": [
      "Foreign Body Aspiration",
      "Asthma Exacerbation",
      "Croup",
      "Epiglottitis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1170",
    "patient": "Timothy C., 85M",
    "vitals": "BP 176/105 • HR 76 • O2 96%",
    "symptoms": [
      "Gaze deviation toward the side of the cortical lesion",
      "Symptoms developed suddenly within the past few hours",
      "Sudden onset of contralateral face, arm, and leg weakness",
      "Expressive or receptive motor aphasia and slurred speech"
    ],
    "options": [
      "Ischemic Stroke (MCA)",
      "Hemorrhagic Stroke",
      "Bell's Palsy",
      "Complex Partial Seizure"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1171",
    "patient": "Sarah E., 46F",
    "vitals": "BP 202/125 • HR 102 • O2 99%",
    "symptoms": [
      "Rupture of an anterior communicating artery berry aneurysm",
      "Marked photophobia, nausea, vomiting, and meningismus",
      "Non-contrast head CT showing hyperdensity in the basal cisterns",
      "Transient loss of consciousness followed by severe neck stiffness"
    ],
    "options": [
      "Migraine",
      "Subarachnoid Hemorrhage",
      "Meningitis",
      "Tension Headache"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1172",
    "patient": "Joshua I., 25M",
    "vitals": "BP 105/71 • HR 108 • O2 94% • Temp 39.7C",
    "symptoms": [
      "Altered mental status ranging from confusion to stupor",
      "Positive Kernig's and Brudzinski's signs on physical exam",
      "Marked nuchal rigidity and neck stiffness on passive flexion",
      "CSF analysis showing elevated neutrophils, low glucose, and high protein"
    ],
    "options": [
      "Viral Encephalitis",
      "Subarachnoid Hemorrhage",
      "Bacterial Meningitis",
      "Brain Abscess"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1173",
    "patient": "Catherine N., 34F",
    "vitals": "BP 128/75 • HR 81 • O2 97%",
    "symptoms": [
      "Inability to close the eye on the affected side completely",
      "Hyperacusis and decreased lacrimation on the affected side",
      "Inability to raise the eyebrow or wrinkle the forehead on the affected side",
      "Drooling from the corner of the mouth and loss of taste on anterior tongue"
    ],
    "options": [
      "Stroke",
      "Bell's Palsy",
      "Trigeminal Neuralgia",
      "Myasthenia Gravis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1174",
    "patient": "Amanda W., 20F",
    "vitals": "BP 114/69 • HR 99 • O2 99% • Temp 37.9C",
    "symptoms": [
      "Exquisite tenderness at McBurney's point and positive rebound tenderness",
      "Mild fever and peripheral leukocytosis with left shift",
      "Positive Rovsing's sign and obturator sign on examination",
      "Nausea, vomiting, anorexia, and localized abdominal guarding"
    ],
    "options": [
      "Ectopic Pregnancy",
      "Ovarian Torsion",
      "Acute Appendicitis",
      "Kidney Stone"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1175",
    "patient": "Linda T., 48F",
    "vitals": "BP 124/90 • HR 103 • O2 96% • Temp 38.3C",
    "symptoms": [
      "Severe right upper quadrant pain radiating to the right scapula",
      "Pain triggered or worsened by ingestion of fatty meals",
      "Inspiration arrest on deep palpation of the right upper quadrant (Murphy's sign)",
      "Ultrasound showing gallstones, gallbladder wall thickening, and pericholecystic fluid"
    ],
    "options": [
      "Acute Cholecystitis",
      "Acute Pancreatitis",
      "Peptic Ulcer Disease",
      "Hepatitis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1176",
    "patient": "Kevin L., 53M",
    "vitals": "BP 117/72 • HR 124 • O2 94% • Temp 38.3C",
    "symptoms": [
      "Constant nausea and intractable vomiting without relief of pain",
      "Pain that is partially relieved by sitting up and leaning forward",
      "Marked elevations in serum amylase and lipase levels (>3x normal)",
      "Severe, boring epigastric abdominal pain radiating straight to the back"
    ],
    "options": [
      "Perforated Ulcer",
      "Acute Pancreatitis",
      "Mesenteric Ischemia",
      "Aortic Aneurysm Rupture"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1177",
    "patient": "Ronald R., 68M",
    "vitals": "BP 117/83 • HR 99 • O2 96% • Temp 39.0C",
    "symptoms": [
      "Tender palpable mass in the left lower quadrant on palpation",
      "Changes in bowel habits, commonly constipation or loose stools",
      "CT scan of abdomen showing colonic wall thickening and fat stranding",
      "Low-grade fever, chills, and mild abdominal bloating"
    ],
    "options": [
      "Appendicitis",
      "Acute Diverticulitis",
      "Colon Cancer",
      "Ulcerative Colitis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1178",
    "patient": "Barbara S., 30F",
    "vitals": "BP 88/46 • HR 124 • O2 98%",
    "symptoms": [
      "Hemoperitoneum and pelvic free fluid seen on transvaginal ultrasound",
      "Dizziness, lightheadedness, and referred left shoulder pain",
      "Missed menstrual cycle by 2-4 weeks with vaginal bleeding or spotting",
      "Positive serum beta-hCG with lack of an intrauterine gestational sac"
    ],
    "options": [
      "Ovarian Torsion",
      "Ruptured Ectopic Pregnancy",
      "Pelvic Inflammatory Disease",
      "Endometriosis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1179",
    "patient": "Janet I., 22F",
    "vitals": "BP 145/80 • HR 96 • O2 98%",
    "symptoms": [
      "Gross or microscopic hematuria on urinalysis",
      "CT scan of abdomen/pelvis without contrast showing obstructive calculus",
      "Sudden onset of severe, colicky flank pain radiating to the groin",
      "Inability to lie still, pacing or squirming in pain"
    ],
    "options": [
      "Pyelonephritis",
      "Testicular Torsion",
      "Nephrolithiasis (Kidney Stone)",
      "Appendicitis"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1180",
    "patient": "Andrew G., 16M",
    "vitals": "BP 129/76 • HR 114 • O2 98%",
    "symptoms": [
      "Absent cremasteric reflex on the affected side upon thigh stroking",
      "High-riding, horizontally oriented testicle on the affected side",
      "Sudden onset of severe, constant unilateral scrotal and inguinal pain",
      "Markedly decreased or absent blood flow on scrotal Doppler ultrasound"
    ],
    "options": [
      "Epididymitis",
      "Testicular Torsion",
      "Inguinal Hernia",
      "Hydrocele"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1181",
    "patient": "Pamela L., 23F",
    "vitals": "BP 104/59 • HR 129 • O2 97%",
    "symptoms": [
      "Serum blood glucose level of 450 mg/dL and metabolic acidosis",
      "Polydipsia, polyuria, weight loss, and signs of dry mucosal dehydration",
      "Fruity breath odor (acetone) and deep, rapid Kussmaul respirations",
      "Positive urine and serum ketones with increased anion gap"
    ],
    "options": [
      "Diabetic Ketoacidosis (DKA)",
      "Hyperosmolar Hyperglycemic State",
      "Sepsis",
      "Salicylate Toxicity"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1182",
    "patient": "Kevin R., 54M",
    "vitals": "BP 87/51 • HR 119 • O2 91% • Temp 38.9C",
    "symptoms": [
      "Altered mental status, confusion, and worsening lethargy",
      "Elevated blood lactate levels and severe peripheral leukocytosis",
      "Warm, flushed skin (early phase) or cool, clammy mottled extremities (late)",
      "Refractory hypotension unresponsive to adequate intravenous fluid resuscitation"
    ],
    "options": [
      "Cardiogenic Shock",
      "Septic Shock",
      "Hypovolemic Shock",
      "Neurogenic Shock"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1183",
    "patient": "Emily B., 35F",
    "vitals": "BP 142/65 • HR 123 • O2 97%",
    "symptoms": [
      "Proptosis, lid lag, exophthalmos, and pretibial myxedema",
      "Heat intolerance, fine hand tremors, palpitations, and anxiety",
      "Undetectable serum TSH with elevated free T3 and T4 levels",
      "Weight loss despite increased appetite and frequent bowel movements"
    ],
    "options": [
      "Hypothyroidism",
      "Pheochromocytoma",
      "Hyperthyroidism (Graves' Disease)",
      "Cushing's Syndrome"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1184",
    "patient": "Sharon H., 36F",
    "vitals": "BP 87/59 • HR 130 • O2 91%",
    "symptoms": [
      "Pulsus paradoxus (drop in systolic blood pressure >10 mmHg on inspiration)",
      "Echocardiogram showing diastolic collapse of the right ventricle",
      "Muffled, distant heart sounds on auscultation (Beck's triad)",
      "Distended jugular veins (JVD) with prominent x-descent and absent y-descent"
    ],
    "options": [
      "Tension Pneumothorax",
      "Cardiac Tamponade",
      "Massive Hemothorax",
      "Flail Chest"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1185",
    "patient": "Richard Z., 24M",
    "vitals": "BP 72/48 • HR 135 • O2 83%",
    "symptoms": [
      "Severe progressive respiratory distress and hypotension after chest wall injury",
      "Tracheal deviation to the contralateral side away from the injury",
      "Distended neck veins and ipsilateral chest wall hyperexpansion",
      "Immediate clinical improvement upon needle decompression in 2nd intercostal space"
    ],
    "options": [
      "Cardiac Tamponade",
      "Tension Pneumothorax",
      "Pulmonary Contusion",
      "Aortic Rupture"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1186",
    "patient": "Deborah M., 83F",
    "vitals": "BP 138/80 • HR 76 • O2 98%",
    "symptoms": [
      "Pain exacerbated by active or passive wrist movements",
      "Localized tenderness over the distal radial metaphysis",
      "Radiograph showing extra-articular transverse distal radius fracture",
      "Classic dorsal displacement and angulation of the distal radius (dinner fork deformity)"
    ],
    "options": [
      "Smith's Fracture",
      "Colles' Fracture",
      "Scaphoid Fracture",
      "Galeazzi Fracture"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1187",
    "patient": "Matthew A., 55M",
    "vitals": "BP 100/59 • HR 51 • O2 80%",
    "symptoms": [
      "Patient found completely unresponsive, cyanotic, and hypoventilating",
      "Symmetric pinpoint pupils (miosis) bilaterally",
      "Rapid improvement in respiratory rate and level of consciousness after IV naloxone",
      "Severe respiratory depression with respiratory rate less than 8 breaths/minute"
    ],
    "options": [
      "Cocaine Overdose",
      "Benzodiazepine Overdose",
      "Opioid Overdose",
      "Alcohol Poisoning"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1188",
    "patient": "Melissa B., 48F",
    "vitals": "BP 122/63 • HR 126 • O2 97% • Temp 38.3C",
    "symptoms": [
      "Intense bilateral tinnitus (ringing in the ears) and hearing loss",
      "Marked hyperventilation, nausea, vomiting, and epigastric distress",
      "Agitation, confusion, diaphoresis, and progressive lethargy",
      "Toxic serum salicylate levels following ingestion of an unknown medication"
    ],
    "options": [
      "Acetaminophen Toxicity",
      "Aspirin (Salicylate) Toxicity",
      "Iron Toxicity",
      "Lead Poisoning"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1189",
    "patient": "Jerry T., 60M",
    "vitals": "BP 89/57 • HR 46 • O2 85%",
    "symptoms": [
      "Profuse generalized sweating, salivation, lacrimation, and rhinorrhea",
      "Diffuse wheezing, bradycardia, and bronchial hypersecretion",
      "Pinpoint pupils (miosis) and muscle fasciculations/weakness",
      "Incontinence of urine and feces with severe abdominal cramping"
    ],
    "options": [
      "Organophosphate Poisoning",
      "Anticholinergic Toxicity",
      "Opioid Toxicity",
      "Carbon Monoxide Poisoning"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1190",
    "patient": "Dennis T., 34M",
    "vitals": "BP 116/65 • HR 68 • O2 96% • Temp 39.8C",
    "symptoms": [
      "Faint, rose-colored macules (rose spots) on the abdomen and chest",
      "Recent travel to an endemic country with poor sanitation",
      "Relative bradycardia (pulse-temperature dissociation)",
      "Abdominal pain, splenomegaly, and constipation followed by watery diarrhea"
    ],
    "options": [
      "Typhoid Fever",
      "Malaria",
      "Dengue Fever",
      "Leptospirosis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1191",
    "patient": "Steven H., 21M",
    "vitals": "BP 110/77 • HR 100 • O2 97% • Temp 39.2C",
    "symptoms": [
      "Sudden onset of high-grade fever, chills, and severe retro-orbital pain",
      "Exquisite joint, muscle, and bone pain described as 'breakbone'",
      "Laboratory evidence of marked leukopenia and thrombocytopenia",
      "Generalized maculopapular rash blanching on pressure"
    ],
    "options": [
      "Zika Virus",
      "Dengue Fever",
      "Chikungunya",
      "Yellow Fever"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1192",
    "patient": "Dennis Y., 40M",
    "vitals": "BP 98/69 • HR 93 • O2 94% • Temp 38.7C",
    "symptoms": [
      "Recent travel to a tropical region without taking chemoprophylaxis",
      "Paroxysmal cyclical high fevers and shaking chills occurring every 48 hours",
      "Profuse sweating as the fever breaks, followed by extreme fatigue",
      "Scleral icterus, splenomegaly, anemia, and mild thrombocytopenia"
    ],
    "options": [
      "Malaria (P. falciparum)",
      "Malaria (P. vivax)",
      "Babesiosis",
      "Visceral Leishmaniasis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1193",
    "patient": "Emma T., 43F",
    "vitals": "BP 134/79 • HR 82 • O2 99%",
    "symptoms": [
      "High titer positive antinuclear antibodies (ANA) and anti-dsDNA antibodies",
      "Urinalysis showing proteinuria and red blood cell casts",
      "Painless oral ulcers, fatigue, and recurrent low-grade fevers",
      "Photosensitivity rash and multiple painful joints (polyarthritis)"
    ],
    "options": [
      "Systemic Lupus Erythematosus",
      "Rosacea",
      "Dermatomyositis",
      "Rheumatoid Arthritis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1194",
    "patient": "Eric C., 45M",
    "vitals": "BP 134/88 • HR 99 • O2 98% • Temp 37.6C",
    "symptoms": [
      "Symptoms peaked rapidly within 12 to 24 hours of onset",
      "Joint aspirate showing needle-shaped, negatively birefringent crystals",
      "History of frequent alcohol consumption and purine-rich diet",
      "Joint is erythematous, hot, swollen, and exquisitely sensitive to light touch"
    ],
    "options": [
      "Pseudogout",
      "Septic Arthritis",
      "Acute Gouty Arthritis",
      "Osteoarthritis Exacerbation"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1195",
    "patient": "Nicole Y., 21F",
    "vitals": "BP 84/43 • HR 111 • O2 83%",
    "symptoms": [
      "Acute onset of diffuse pruritic hives, urticaria, and lip/tongue swelling",
      "Inspiratory stridor, wheezing, dyspnea, and feeling of throat tightness",
      "Profound hypotension and dizziness shortly after eating peanut butter or seafood",
      "Nausea, vomiting, and diffuse abdominal cramps"
    ],
    "options": [
      "Asthma Attack",
      "Panic Attack",
      "Vasovagal Syncope",
      "Anaphylaxis"
    ],
    "answer": 3
  },
  {
    "id": "CASE-1196",
    "patient": "Samantha T., 67F",
    "vitals": "BP 129/85 • HR 93 • O2 96%",
    "symptoms": [
      "Unilateral lower extremity calf pain, swelling, and warmth",
      "Compression ultrasound showing non-compressible popliteal or femoral vein",
      "Calf circumference measurement is 4 cm larger on the symptomatic side",
      "History of prolonged bed rest, malignancy, or oral contraceptive use"
    ],
    "options": [
      "Cellulitis",
      "Baker's Cyst Rupture",
      "Deep Vein Thrombosis (DVT)",
      "Superficial Thrombophlebitis"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1197",
    "patient": "Matthew W., 58M",
    "vitals": "BP 130/91 • HR 105 • O2 85%",
    "symptoms": [
      "Worsening baseline shortness of breath and chronic cough",
      "Marked increase in sputum volume and sputum purulence",
      "Diffuse wheezing and distant breath sounds on lung auscultation",
      "Classic barrel chest, accessory muscle use, and history of heavy smoking"
    ],
    "options": [
      "Asthma Exacerbation",
      "Congestive Heart Failure",
      "COPD Exacerbation",
      "Pulmonary Embolism"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1198",
    "patient": "Jose D., 61M",
    "vitals": "BP 116/71 • HR 95 • O2 98% • Temp 38.1C",
    "symptoms": [
      "Associated low-grade fever, chills, and mild inguinal lymphadenopathy",
      "Small portal of entry, such as tinea pedis or a minor abrasion",
      "Localized skin tenderness and pain over the lower leg",
      "Spreading, poorly demarcated area of skin erythema, warmth, and swelling"
    ],
    "options": [
      "Deep Vein Thrombosis",
      "Cellulitis",
      "Erysipelas",
      "Necrotizing Fasciitis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1199",
    "patient": "Susan L., 31F",
    "vitals": "BP 128/78 • HR 106 • O2 99%",
    "symptoms": [
      "Falsely normal 100% pulse oximetry readings on room air",
      "Multiple family members or roommates presenting with identical symptoms",
      "Elevated carboxyhemoglobin levels on arterial blood gas analysis",
      "Dull, throbbing, generalized headache, dizziness, and nausea"
    ],
    "options": [
      "Influenza",
      "Food Poisoning",
      "Migraine",
      "Carbon Monoxide Poisoning"
    ],
    "answer": 3
  },
  {
    "id": "CASE-1200",
    "patient": "Katherine Y., 33F",
    "vitals": "BP 129/80 • HR 116 • O2 96%",
    "symptoms": [
      "Rapid correction of symptoms and recovery of consciousness after D50 IV push",
      "History of type 1 diabetes mellitus and missed a meal after taking insulin",
      "Severe confusion, irritability, slurred speech, and combative behavior",
      "Fingerstick blood glucose reading of 42 mg/dL"
    ],
    "options": [
      "Ischemic Stroke",
      "Opioid Overdose",
      "Diabetic Ketoacidosis",
      "Hypoglycemia"
    ],
    "answer": 3
  },
  {
    "id": "CASE-1201",
    "patient": "Sandra V., 45F",
    "vitals": "BP 137/81 • HR 90 • O2 92%",
    "symptoms": [
      "History of coronary artery disease, hyperlipidemia, and heavy smoking",
      "Crushing retrosternal chest pain radiating to the left arm or jaw",
      "ECG showing ST-segment elevations in anterior leads V1-V4",
      "Significantly elevated serum cardiac troponin levels"
    ],
    "options": [
      "Myocardial Infarction",
      "Gastroesophageal Reflux",
      "Costochondritis",
      "Acute Pericarditis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1202",
    "patient": "Elizabeth Y., 62F",
    "vitals": "BP 197/110 • HR 115 • O2 96%",
    "symptoms": [
      "Sudden onset, tearing substernal chest pain radiating to the back",
      "Asymmetric blood pressure readings in upper extremities",
      "History of poorly controlled chronic hypertension",
      "Widened mediastinum on chest radiograph"
    ],
    "options": [
      "Myocardial Infarction",
      "Aortic Dissection",
      "Pulmonary Embolism",
      "Tension Pneumothorax"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1203",
    "patient": "Patricia R., 20F",
    "vitals": "BP 106/65 • HR 190 • O2 99%",
    "symptoms": [
      "Mild lightheadedness and feeling of chest pressure",
      "Rapid resolution of tachycardia upon carotid sinus massage",
      "Recurrent episodes of sudden heart racing resolving spontaneously",
      "ECG showing regular, narrow-complex tachycardia without visible P waves"
    ],
    "options": [
      "Atrial Fibrillation",
      "Supraventricular Tachycardia (SVT)",
      "Ventricular Tachycardia",
      "Sinus Tachycardia"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1204",
    "patient": "Joshua H., 69M",
    "vitals": "BP 155/96 • HR 90 • O2 92%",
    "symptoms": [
      "S3 gallop on heart auscultation and bibasilar rales",
      "Bilateral pitting lower extremity edema and jugular venous distension",
      "Paroxysmal nocturnal dyspnea causing patient to wake up gasping",
      "Increased cardiomegaly and cephalization on chest X-ray"
    ],
    "options": [
      "Congestive Heart Failure",
      "COPD Exacerbation",
      "Pulmonary Fibrosis",
      "Cor Pulmonale"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1205",
    "patient": "Lisa T., 43F",
    "vitals": "BP 121/77 • HR 104 • O2 96%",
    "symptoms": [
      "Sharp retrosternal chest pain that worsens on inspiration and lying flat",
      "ECG showing diffuse ST-segment elevation with PR-segment depression",
      "Chest pain that is relieved by sitting up and leaning forward",
      "Pericardial friction rub heard best at the left lower sternal border"
    ],
    "options": [
      "Myocardial Infarction",
      "Pulmonary Embolism",
      "Acute Pericarditis",
      "Gastroesophageal Reflux"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1206",
    "patient": "Jonathan V., 22M",
    "vitals": "BP 98/73 • HR 121 • O2 87%",
    "symptoms": [
      "Significantly elevated D-dimer levels and mismatched perfusion defect on V/Q scan",
      "Sinus tachycardia and S1Q3T3 pattern on electrocardiogram",
      "Unilateral calf swelling, erythema, and deep venous tenderness",
      "Recent prolonged immobilization due to a transatlantic flight or surgery"
    ],
    "options": [
      "Pneumonia",
      "Asthma Exacerbation",
      "Pulmonary Embolism",
      "Pneumothorax"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1207",
    "patient": "Joshua A., 33M",
    "vitals": "BP 126/78 • HR 112 • O2 92%",
    "symptoms": [
      "Chest radiograph showing a visible pleural line and absence of lung markings",
      "Sudden onset of sharp, unilateral pleuritic chest pain and dyspnea",
      "Hyperresonance to percussion over the ipsilateral chest wall",
      "Asthenic tall, thin male body habitus"
    ],
    "options": [
      "Spontaneous Pneumothorax",
      "Asthma Attack",
      "Pulmonary Embolism",
      "Cardiac Tamponade"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1208",
    "patient": "Jeffrey I., 68M",
    "vitals": "BP 122/72 • HR 91 • O2 93% • Temp 38.7C",
    "symptoms": [
      "Bronchial breath sounds and late inspiratory crackles on auscultation",
      "Dullness to percussion and increased tactile fremitus at the lung base",
      "High fever, shaking chills, and pleuritic chest discomfort",
      "Productive cough with thick rust-colored or purulent sputum"
    ],
    "options": [
      "Lobar Pneumonia",
      "Tuberculosis",
      "Lung Cancer",
      "Pulmonary Edema"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1209",
    "patient": "John Y., 20M",
    "vitals": "BP 125/80 • HR 122 • O2 92%",
    "symptoms": [
      "Use of accessory respiratory muscles and intercostal retractions",
      "Triggered by recent exposure to cold air, pollen, or an upper respiratory infection",
      "Long-standing history of atopy, allergic rhinitis, or childhood eczema",
      "Prolonged expiratory phase and reduced peak expiratory flow rate"
    ],
    "options": [
      "Foreign Body Aspiration",
      "Asthma Exacerbation",
      "Croup",
      "Epiglottitis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1210",
    "patient": "Steven L., 76M",
    "vitals": "BP 177/96 • HR 85 • O2 96%",
    "symptoms": [
      "Symptoms developed suddenly within the past few hours",
      "Sudden onset of contralateral face, arm, and leg weakness",
      "Expressive or receptive motor aphasia and slurred speech",
      "Contralateral hemisensory loss and marked pronator drift"
    ],
    "options": [
      "Ischemic Stroke (MCA)",
      "Hemorrhagic Stroke",
      "Bell's Palsy",
      "Complex Partial Seizure"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1211",
    "patient": "Linda V., 47F",
    "vitals": "BP 185/120 • HR 101 • O2 98%",
    "symptoms": [
      "Marked photophobia, nausea, vomiting, and meningismus",
      "Rupture of an anterior communicating artery berry aneurysm",
      "Sudden onset of excruciating headache, described as the 'worst of life'",
      "Non-contrast head CT showing hyperdensity in the basal cisterns"
    ],
    "options": [
      "Migraine",
      "Subarachnoid Hemorrhage",
      "Meningitis",
      "Tension Headache"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1212",
    "patient": "Mary H., 55F",
    "vitals": "BP 114/80 • HR 117 • O2 95% • Temp 38.9C",
    "symptoms": [
      "Severe generalized headache, high fever, and shaking chills",
      "Marked nuchal rigidity and neck stiffness on passive flexion",
      "Positive Kernig's and Brudzinski's signs on physical exam",
      "CSF analysis showing elevated neutrophils, low glucose, and high protein"
    ],
    "options": [
      "Viral Encephalitis",
      "Subarachnoid Hemorrhage",
      "Bacterial Meningitis",
      "Brain Abscess"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1213",
    "patient": "Carolyn P., 40F",
    "vitals": "BP 120/77 • HR 90 • O2 100%",
    "symptoms": [
      "Drooling from the corner of the mouth and loss of taste on anterior tongue",
      "Sudden onset of unilateral facial paralysis involving the entire half face",
      "Inability to raise the eyebrow or wrinkle the forehead on the affected side",
      "Inability to close the eye on the affected side completely"
    ],
    "options": [
      "Stroke",
      "Bell's Palsy",
      "Trigeminal Neuralgia",
      "Myasthenia Gravis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1214",
    "patient": "Dorothy I., 19F",
    "vitals": "BP 114/75 • HR 99 • O2 99% • Temp 38.3C",
    "symptoms": [
      "Exquisite tenderness at McBurney's point and positive rebound tenderness",
      "Nausea, vomiting, anorexia, and localized abdominal guarding",
      "Dull periumbilical pain migrating and localizing to the right lower quadrant",
      "Positive Rovsing's sign and obturator sign on examination"
    ],
    "options": [
      "Ectopic Pregnancy",
      "Ovarian Torsion",
      "Acute Appendicitis",
      "Kidney Stone"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1215",
    "patient": "Richard K., 36M",
    "vitals": "BP 133/90 • HR 99 • O2 95% • Temp 38.7C",
    "symptoms": [
      "Persistent nausea, vomiting, low-grade fever, and mild leukocytosis",
      "Pain triggered or worsened by ingestion of fatty meals",
      "Severe right upper quadrant pain radiating to the right scapula",
      "Ultrasound showing gallstones, gallbladder wall thickening, and pericholecystic fluid"
    ],
    "options": [
      "Acute Cholecystitis",
      "Acute Pancreatitis",
      "Peptic Ulcer Disease",
      "Hepatitis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1216",
    "patient": "Betty T., 57F",
    "vitals": "BP 114/77 • HR 114 • O2 95% • Temp 37.9C",
    "symptoms": [
      "Severe, boring epigastric abdominal pain radiating straight to the back",
      "Constant nausea and intractable vomiting without relief of pain",
      "Pain that is partially relieved by sitting up and leaning forward",
      "Marked elevations in serum amylase and lipase levels (>3x normal)"
    ],
    "options": [
      "Perforated Ulcer",
      "Acute Pancreatitis",
      "Mesenteric Ischemia",
      "Aortic Aneurysm Rupture"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1217",
    "patient": "Gregory H., 63M",
    "vitals": "BP 112/83 • HR 100 • O2 95% • Temp 37.9C",
    "symptoms": [
      "Constant left lower quadrant abdominal pain and tenderness",
      "Low-grade fever, chills, and mild abdominal bloating",
      "Tender palpable mass in the left lower quadrant on palpation",
      "CT scan of abdomen showing colonic wall thickening and fat stranding"
    ],
    "options": [
      "Appendicitis",
      "Acute Diverticulitis",
      "Colon Cancer",
      "Ulcerative Colitis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1218",
    "patient": "Amanda A., 40F",
    "vitals": "BP 90/50 • HR 122 • O2 97%",
    "symptoms": [
      "Hemoperitoneum and pelvic free fluid seen on transvaginal ultrasound",
      "Dizziness, lightheadedness, and referred left shoulder pain",
      "Positive serum beta-hCG with lack of an intrauterine gestational sac",
      "Missed menstrual cycle by 2-4 weeks with vaginal bleeding or spotting"
    ],
    "options": [
      "Ovarian Torsion",
      "Ruptured Ectopic Pregnancy",
      "Pelvic Inflammatory Disease",
      "Endometriosis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1219",
    "patient": "Jeffrey Z., 22M",
    "vitals": "BP 149/82 • HR 114 • O2 98%",
    "symptoms": [
      "CT scan of abdomen/pelvis without contrast showing obstructive calculus",
      "Inability to lie still, pacing or squirming in pain",
      "Gross or microscopic hematuria on urinalysis",
      "Exquisite costovertebral angle tenderness on the affected side"
    ],
    "options": [
      "Pyelonephritis",
      "Testicular Torsion",
      "Nephrolithiasis (Kidney Stone)",
      "Appendicitis"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1220",
    "patient": "Scott L., 24M",
    "vitals": "BP 111/70 • HR 114 • O2 98%",
    "symptoms": [
      "Absent cremasteric reflex on the affected side upon thigh stroking",
      "High-riding, horizontally oriented testicle on the affected side",
      "Sudden onset of severe, constant unilateral scrotal and inguinal pain",
      "Markedly decreased or absent blood flow on scrotal Doppler ultrasound"
    ],
    "options": [
      "Epididymitis",
      "Testicular Torsion",
      "Inguinal Hernia",
      "Hydrocele"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1221",
    "patient": "John V., 30M",
    "vitals": "BP 110/63 • HR 135 • O2 98%",
    "symptoms": [
      "Serum blood glucose level of 450 mg/dL and metabolic acidosis",
      "Polydipsia, polyuria, weight loss, and signs of dry mucosal dehydration",
      "Fruity breath odor (acetone) and deep, rapid Kussmaul respirations",
      "Progressive nausea, vomiting, diffuse abdominal pain, and fatigue"
    ],
    "options": [
      "Diabetic Ketoacidosis (DKA)",
      "Hyperosmolar Hyperglycemic State",
      "Sepsis",
      "Salicylate Toxicity"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1222",
    "patient": "Benjamin G., 73M",
    "vitals": "BP 85/47 • HR 113 • O2 90% • Temp 38.8C",
    "symptoms": [
      "Elevated blood lactate levels and severe peripheral leukocytosis",
      "Altered mental status, confusion, and worsening lethargy",
      "Active focus of infection, such as pyelonephritis or severe pneumonia",
      "Refractory hypotension unresponsive to adequate intravenous fluid resuscitation"
    ],
    "options": [
      "Cardiogenic Shock",
      "Septic Shock",
      "Hypovolemic Shock",
      "Neurogenic Shock"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1223",
    "patient": "Janet I., 43F",
    "vitals": "BP 145/65 • HR 116 • O2 97% • Temp 37.6C",
    "symptoms": [
      "Diffuse non-tender thyroid enlargement (goiter) with thyroid bruit",
      "Weight loss despite increased appetite and frequent bowel movements",
      "Heat intolerance, fine hand tremors, palpitations, and anxiety",
      "Undetectable serum TSH with elevated free T3 and T4 levels"
    ],
    "options": [
      "Hypothyroidism",
      "Pheochromocytoma",
      "Hyperthyroidism (Graves' Disease)",
      "Cushing's Syndrome"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1224",
    "patient": "Timothy T., 50M",
    "vitals": "BP 81/63 • HR 140 • O2 89%",
    "symptoms": [
      "Muffled, distant heart sounds on auscultation (Beck's triad)",
      "Echocardiogram showing diastolic collapse of the right ventricle",
      "Distended jugular veins (JVD) with prominent x-descent and absent y-descent",
      "Severe dyspnea and hypotension following penetrating chest trauma"
    ],
    "options": [
      "Tension Pneumothorax",
      "Cardiac Tamponade",
      "Massive Hemothorax",
      "Flail Chest"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1225",
    "patient": "Sharon A., 52F",
    "vitals": "BP 81/49 • HR 141 • O2 85%",
    "symptoms": [
      "Hyperresonance to percussion and absent breath sounds on the affected side",
      "Immediate clinical improvement upon needle decompression in 2nd intercostal space",
      "Severe progressive respiratory distress and hypotension after chest wall injury",
      "Tracheal deviation to the contralateral side away from the injury"
    ],
    "options": [
      "Cardiac Tamponade",
      "Tension Pneumothorax",
      "Pulmonary Contusion",
      "Aortic Rupture"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1226",
    "patient": "Nancy M., 71F",
    "vitals": "BP 131/79 • HR 92 • O2 97%",
    "symptoms": [
      "Localized tenderness over the distal radial metaphysis",
      "Classic dorsal displacement and angulation of the distal radius (dinner fork deformity)",
      "Severe wrist pain and swelling after falling on an outstretched hand (FOOSH)",
      "Pain exacerbated by active or passive wrist movements"
    ],
    "options": [
      "Smith's Fracture",
      "Colles' Fracture",
      "Scaphoid Fracture",
      "Galeazzi Fracture"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1227",
    "patient": "Laura H., 55F",
    "vitals": "BP 85/65 • HR 45 • O2 79%",
    "symptoms": [
      "Patient found completely unresponsive, cyanotic, and hypoventilating",
      "Symmetric pinpoint pupils (miosis) bilaterally",
      "Severe respiratory depression with respiratory rate less than 8 breaths/minute",
      "Rapid improvement in respiratory rate and level of consciousness after IV naloxone"
    ],
    "options": [
      "Cocaine Overdose",
      "Benzodiazepine Overdose",
      "Opioid Overdose",
      "Alcohol Poisoning"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1228",
    "patient": "Shirley E., 32F",
    "vitals": "BP 120/74 • HR 110 • O2 95% • Temp 38.5C",
    "symptoms": [
      "Intense bilateral tinnitus (ringing in the ears) and hearing loss",
      "Toxic serum salicylate levels following ingestion of an unknown medication",
      "Marked hyperventilation, nausea, vomiting, and epigastric distress",
      "Mixed respiratory alkalosis and high anion gap metabolic acidosis"
    ],
    "options": [
      "Acetaminophen Toxicity",
      "Aspirin (Salicylate) Toxicity",
      "Iron Toxicity",
      "Lead Poisoning"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1229",
    "patient": "Paul C., 35M",
    "vitals": "BP 83/66 • HR 46 • O2 91%",
    "symptoms": [
      "Diffuse wheezing, bradycardia, and bronchial hypersecretion",
      "Incontinence of urine and feces with severe abdominal cramping",
      "Pinpoint pupils (miosis) and muscle fasciculations/weakness",
      "Recent exposure to agricultural pesticides or crop dusting"
    ],
    "options": [
      "Organophosphate Poisoning",
      "Anticholinergic Toxicity",
      "Opioid Toxicity",
      "Carbon Monoxide Poisoning"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1230",
    "patient": "Richard V., 40M",
    "vitals": "BP 101/74 • HR 61 • O2 98% • Temp 39.0C",
    "symptoms": [
      "Faint, rose-colored macules (rose spots) on the abdomen and chest",
      "Recent travel to an endemic country with poor sanitation",
      "Abdominal pain, splenomegaly, and constipation followed by watery diarrhea",
      "Relative bradycardia (pulse-temperature dissociation)"
    ],
    "options": [
      "Typhoid Fever",
      "Malaria",
      "Dengue Fever",
      "Leptospirosis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1231",
    "patient": "Paul A., 45M",
    "vitals": "BP 115/61 • HR 97 • O2 98% • Temp 39.7C",
    "symptoms": [
      "Sudden onset of high-grade fever, chills, and severe retro-orbital pain",
      "Exquisite joint, muscle, and bone pain described as 'breakbone'",
      "Positive tourniquet test showing petechiae formation",
      "Laboratory evidence of marked leukopenia and thrombocytopenia"
    ],
    "options": [
      "Zika Virus",
      "Dengue Fever",
      "Chikungunya",
      "Yellow Fever"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1232",
    "patient": "Brian W., 27M",
    "vitals": "BP 110/69 • HR 112 • O2 97% • Temp 39.9C",
    "symptoms": [
      "Paroxysmal cyclical high fevers and shaking chills occurring every 48 hours",
      "Thick and thin blood smears showing trophozoites and Schüffner's dots",
      "Profuse sweating as the fever breaks, followed by extreme fatigue",
      "Scleral icterus, splenomegaly, anemia, and mild thrombocytopenia"
    ],
    "options": [
      "Malaria (P. falciparum)",
      "Malaria (P. vivax)",
      "Babesiosis",
      "Visceral Leishmaniasis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1233",
    "patient": "Pamela S., 42F",
    "vitals": "BP 116/72 • HR 73 • O2 96%",
    "symptoms": [
      "Erythematous malar rash over the cheeks and bridge of nose, sparing nasolabial folds",
      "Photosensitivity rash and multiple painful joints (polyarthritis)",
      "Urinalysis showing proteinuria and red blood cell casts",
      "Painless oral ulcers, fatigue, and recurrent low-grade fevers"
    ],
    "options": [
      "Systemic Lupus Erythematosus",
      "Rosacea",
      "Dermatomyositis",
      "Rheumatoid Arthritis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1234",
    "patient": "Gregory A., 53M",
    "vitals": "BP 130/82 • HR 80 • O2 96%",
    "symptoms": [
      "Joint aspirate showing needle-shaped, negatively birefringent crystals",
      "Sudden onset of excruciating pain and swelling in the first metatarsophalangeal joint",
      "History of frequent alcohol consumption and purine-rich diet",
      "Joint is erythematous, hot, swollen, and exquisitely sensitive to light touch"
    ],
    "options": [
      "Pseudogout",
      "Septic Arthritis",
      "Acute Gouty Arthritis",
      "Osteoarthritis Exacerbation"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1235",
    "patient": "Katherine G., 29F",
    "vitals": "BP 70/56 • HR 115 • O2 84%",
    "symptoms": [
      "Rapid resolution of symptoms following intramuscular epinephrine injection",
      "Inspiratory stridor, wheezing, dyspnea, and feeling of throat tightness",
      "Profound hypotension and dizziness shortly after eating peanut butter or seafood",
      "Nausea, vomiting, and diffuse abdominal cramps"
    ],
    "options": [
      "Asthma Attack",
      "Panic Attack",
      "Vasovagal Syncope",
      "Anaphylaxis"
    ],
    "answer": 3
  },
  {
    "id": "CASE-1236",
    "patient": "Kimberly M., 52F",
    "vitals": "BP 135/76 • HR 91 • O2 96% • Temp 37.7C",
    "symptoms": [
      "Unilateral lower extremity calf pain, swelling, and warmth",
      "History of prolonged bed rest, malignancy, or oral contraceptive use",
      "Compression ultrasound showing non-compressible popliteal or femoral vein",
      "Calf circumference measurement is 4 cm larger on the symptomatic side"
    ],
    "options": [
      "Cellulitis",
      "Baker's Cyst Rupture",
      "Deep Vein Thrombosis (DVT)",
      "Superficial Thrombophlebitis"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1237",
    "patient": "Mark N., 68M",
    "vitals": "BP 133/86 • HR 106 • O2 89%",
    "symptoms": [
      "Worsening baseline shortness of breath and chronic cough",
      "Marked increase in sputum volume and sputum purulence",
      "Diffuse wheezing and distant breath sounds on lung auscultation",
      "Classic barrel chest, accessory muscle use, and history of heavy smoking"
    ],
    "options": [
      "Asthma Exacerbation",
      "Congestive Heart Failure",
      "COPD Exacerbation",
      "Pulmonary Embolism"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1238",
    "patient": "Daniel Y., 44M",
    "vitals": "BP 116/75 • HR 97 • O2 98% • Temp 37.8C",
    "symptoms": [
      "Failure to improve with elevation alone; requires systemic antibiotics",
      "Associated low-grade fever, chills, and mild inguinal lymphadenopathy",
      "Small portal of entry, such as tinea pedis or a minor abrasion",
      "Localized skin tenderness and pain over the lower leg"
    ],
    "options": [
      "Deep Vein Thrombosis",
      "Cellulitis",
      "Erysipelas",
      "Necrotizing Fasciitis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1239",
    "patient": "Kevin A., 53M",
    "vitals": "BP 119/74 • HR 106 • O2 98%",
    "symptoms": [
      "Multiple family members or roommates presenting with identical symptoms",
      "Dull, throbbing, generalized headache, dizziness, and nausea",
      "Elevated carboxyhemoglobin levels on arterial blood gas analysis",
      "Confusion, fatigue, and irritability without fever or neck stiffness"
    ],
    "options": [
      "Influenza",
      "Food Poisoning",
      "Migraine",
      "Carbon Monoxide Poisoning"
    ],
    "answer": 3
  },
  {
    "id": "CASE-1240",
    "patient": "Joshua S., 19M",
    "vitals": "BP 127/78 • HR 114 • O2 98%",
    "symptoms": [
      "Fingerstick blood glucose reading of 42 mg/dL",
      "Severe confusion, irritability, slurred speech, and combative behavior",
      "History of type 1 diabetes mellitus and missed a meal after taking insulin",
      "Rapid correction of symptoms and recovery of consciousness after D50 IV push"
    ],
    "options": [
      "Ischemic Stroke",
      "Opioid Overdose",
      "Diabetic Ketoacidosis",
      "Hypoglycemia"
    ],
    "answer": 3
  },
  {
    "id": "CASE-1241",
    "patient": "Christopher W., 75M",
    "vitals": "BP 139/81 • HR 81 • O2 91%",
    "symptoms": [
      "Crushing retrosternal chest pain radiating to the left arm or jaw",
      "Significantly elevated serum cardiac troponin levels",
      "ECG showing ST-segment elevations in anterior leads V1-V4",
      "Profuse diaphoresis, nausea, and shortness of breath"
    ],
    "options": [
      "Myocardial Infarction",
      "Gastroesophageal Reflux",
      "Costochondritis",
      "Acute Pericarditis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1242",
    "patient": "Linda P., 66F",
    "vitals": "BP 202/115 • HR 99 • O2 92%",
    "symptoms": [
      "Sudden onset, tearing substernal chest pain radiating to the back",
      "Asymmetric blood pressure readings in upper extremities",
      "History of poorly controlled chronic hypertension",
      "Aortic regurgitation murmur heard along the right sternal border"
    ],
    "options": [
      "Myocardial Infarction",
      "Aortic Dissection",
      "Pulmonary Embolism",
      "Tension Pneumothorax"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1243",
    "patient": "Donald K., 32M",
    "vitals": "BP 101/76 • HR 201 • O2 99%",
    "symptoms": [
      "Recurrent episodes of sudden heart racing resolving spontaneously",
      "Mild lightheadedness and feeling of chest pressure",
      "ECG showing regular, narrow-complex tachycardia without visible P waves",
      "Sudden onset of heart racing and severe palpitations"
    ],
    "options": [
      "Atrial Fibrillation",
      "Supraventricular Tachycardia (SVT)",
      "Ventricular Tachycardia",
      "Sinus Tachycardia"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1244",
    "patient": "Stephen W., 79M",
    "vitals": "BP 159/82 • HR 87 • O2 92%",
    "symptoms": [
      "S3 gallop on heart auscultation and bibasilar rales",
      "Increased cardiomegaly and cephalization on chest X-ray",
      "Paroxysmal nocturnal dyspnea causing patient to wake up gasping",
      "Progressive exertional dyspnea and orthopnea"
    ],
    "options": [
      "Congestive Heart Failure",
      "COPD Exacerbation",
      "Pulmonary Fibrosis",
      "Cor Pulmonale"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1245",
    "patient": "Larry K., 43M",
    "vitals": "BP 100/66 • HR 99 • O2 99%",
    "symptoms": [
      "Recent history of a self-limiting viral upper respiratory tract infection",
      "Pericardial friction rub heard best at the left lower sternal border",
      "ECG showing diffuse ST-segment elevation with PR-segment depression",
      "Chest pain that is relieved by sitting up and leaning forward"
    ],
    "options": [
      "Myocardial Infarction",
      "Pulmonary Embolism",
      "Acute Pericarditis",
      "Gastroesophageal Reflux"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1246",
    "patient": "Barbara G., 35F",
    "vitals": "BP 105/56 • HR 114 • O2 89% • Temp 37.7C",
    "symptoms": [
      "Unilateral calf swelling, erythema, and deep venous tenderness",
      "Significantly elevated D-dimer levels and mismatched perfusion defect on V/Q scan",
      "Recent prolonged immobilization due to a transatlantic flight or surgery",
      "Sudden onset of severe shortness of breath and pleuritic chest pain"
    ],
    "options": [
      "Pneumonia",
      "Asthma Exacerbation",
      "Pulmonary Embolism",
      "Pneumothorax"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1247",
    "patient": "Edward H., 16M",
    "vitals": "BP 115/84 • HR 118 • O2 89%",
    "symptoms": [
      "Hyperresonance to percussion over the ipsilateral chest wall",
      "Markedly decreased breath sounds and tactile fremitus on the affected side",
      "Asthenic tall, thin male body habitus",
      "Chest radiograph showing a visible pleural line and absence of lung markings"
    ],
    "options": [
      "Spontaneous Pneumothorax",
      "Asthma Attack",
      "Pulmonary Embolism",
      "Cardiac Tamponade"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1248",
    "patient": "Cynthia A., 63F",
    "vitals": "BP 123/72 • HR 98 • O2 90% • Temp 39.3C",
    "symptoms": [
      "Productive cough with thick rust-colored or purulent sputum",
      "High fever, shaking chills, and pleuritic chest discomfort",
      "Chest X-ray showing lobar consolidation with air bronchograms",
      "Dullness to percussion and increased tactile fremitus at the lung base"
    ],
    "options": [
      "Lobar Pneumonia",
      "Tuberculosis",
      "Lung Cancer",
      "Pulmonary Edema"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1249",
    "patient": "Helen Z., 23F",
    "vitals": "BP 104/71 • HR 121 • O2 93%",
    "symptoms": [
      "Widespread expiratory wheezing, chest tightness, and dry cough",
      "Use of accessory respiratory muscles and intercostal retractions",
      "Long-standing history of atopy, allergic rhinitis, or childhood eczema",
      "Prolonged expiratory phase and reduced peak expiratory flow rate"
    ],
    "options": [
      "Foreign Body Aspiration",
      "Asthma Exacerbation",
      "Croup",
      "Epiglottitis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1250",
    "patient": "Susan Z., 63F",
    "vitals": "BP 194/96 • HR 71 • O2 98%",
    "symptoms": [
      "Expressive or receptive motor aphasia and slurred speech",
      "Symptoms developed suddenly within the past few hours",
      "Gaze deviation toward the side of the cortical lesion",
      "Sudden onset of contralateral face, arm, and leg weakness"
    ],
    "options": [
      "Ischemic Stroke (MCA)",
      "Hemorrhagic Stroke",
      "Bell's Palsy",
      "Complex Partial Seizure"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1251",
    "patient": "Linda B., 64F",
    "vitals": "BP 172/105 • HR 92 • O2 97%",
    "symptoms": [
      "Transient loss of consciousness followed by severe neck stiffness",
      "Marked photophobia, nausea, vomiting, and meningismus",
      "Rupture of an anterior communicating artery berry aneurysm",
      "Non-contrast head CT showing hyperdensity in the basal cisterns"
    ],
    "options": [
      "Migraine",
      "Subarachnoid Hemorrhage",
      "Meningitis",
      "Tension Headache"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1252",
    "patient": "Elizabeth E., 40F",
    "vitals": "BP 102/74 • HR 110 • O2 93% • Temp 39.5C",
    "symptoms": [
      "Severe generalized headache, high fever, and shaking chills",
      "Marked nuchal rigidity and neck stiffness on passive flexion",
      "Positive Kernig's and Brudzinski's signs on physical exam",
      "CSF analysis showing elevated neutrophils, low glucose, and high protein"
    ],
    "options": [
      "Viral Encephalitis",
      "Subarachnoid Hemorrhage",
      "Bacterial Meningitis",
      "Brain Abscess"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1253",
    "patient": "Jack S., 50M",
    "vitals": "BP 121/82 • HR 75 • O2 98%",
    "symptoms": [
      "Drooling from the corner of the mouth and loss of taste on anterior tongue",
      "Inability to close the eye on the affected side completely",
      "Hyperacusis and decreased lacrimation on the affected side",
      "Inability to raise the eyebrow or wrinkle the forehead on the affected side"
    ],
    "options": [
      "Stroke",
      "Bell's Palsy",
      "Trigeminal Neuralgia",
      "Myasthenia Gravis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1254",
    "patient": "Gary T., 20M",
    "vitals": "BP 116/66 • HR 97 • O2 98% • Temp 38.5C",
    "symptoms": [
      "Dull periumbilical pain migrating and localizing to the right lower quadrant",
      "Nausea, vomiting, anorexia, and localized abdominal guarding",
      "Exquisite tenderness at McBurney's point and positive rebound tenderness",
      "Positive Rovsing's sign and obturator sign on examination"
    ],
    "options": [
      "Ectopic Pregnancy",
      "Ovarian Torsion",
      "Acute Appendicitis",
      "Kidney Stone"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1255",
    "patient": "Scott V., 45M",
    "vitals": "BP 128/90 • HR 97 • O2 98% • Temp 38.3C",
    "symptoms": [
      "Severe right upper quadrant pain radiating to the right scapula",
      "Pain triggered or worsened by ingestion of fatty meals",
      "Ultrasound showing gallstones, gallbladder wall thickening, and pericholecystic fluid",
      "Persistent nausea, vomiting, low-grade fever, and mild leukocytosis"
    ],
    "options": [
      "Acute Cholecystitis",
      "Acute Pancreatitis",
      "Peptic Ulcer Disease",
      "Hepatitis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1256",
    "patient": "Steven W., 58M",
    "vitals": "BP 93/71 • HR 108 • O2 95%",
    "symptoms": [
      "Constant nausea and intractable vomiting without relief of pain",
      "Severe, boring epigastric abdominal pain radiating straight to the back",
      "Marked elevations in serum amylase and lipase levels (>3x normal)",
      "History of chronic alcohol abuse or gallstones"
    ],
    "options": [
      "Perforated Ulcer",
      "Acute Pancreatitis",
      "Mesenteric Ischemia",
      "Aortic Aneurysm Rupture"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1257",
    "patient": "Mark C., 82M",
    "vitals": "BP 114/80 • HR 100 • O2 95% • Temp 39.0C",
    "symptoms": [
      "CT scan of abdomen showing colonic wall thickening and fat stranding",
      "Tender palpable mass in the left lower quadrant on palpation",
      "Changes in bowel habits, commonly constipation or loose stools",
      "Low-grade fever, chills, and mild abdominal bloating"
    ],
    "options": [
      "Appendicitis",
      "Acute Diverticulitis",
      "Colon Cancer",
      "Ulcerative Colitis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1258",
    "patient": "Katherine L., 21F",
    "vitals": "BP 95/55 • HR 124 • O2 96%",
    "symptoms": [
      "Sudden onset of severe, sharp, unilateral pelvic and lower abdominal pain",
      "Missed menstrual cycle by 2-4 weeks with vaginal bleeding or spotting",
      "Dizziness, lightheadedness, and referred left shoulder pain",
      "Positive serum beta-hCG with lack of an intrauterine gestational sac"
    ],
    "options": [
      "Ovarian Torsion",
      "Ruptured Ectopic Pregnancy",
      "Pelvic Inflammatory Disease",
      "Endometriosis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1259",
    "patient": "Robert V., 56M",
    "vitals": "BP 131/92 • HR 107 • O2 97%",
    "symptoms": [
      "Exquisite costovertebral angle tenderness on the affected side",
      "Inability to lie still, pacing or squirming in pain",
      "CT scan of abdomen/pelvis without contrast showing obstructive calculus",
      "Sudden onset of severe, colicky flank pain radiating to the groin"
    ],
    "options": [
      "Pyelonephritis",
      "Testicular Torsion",
      "Nephrolithiasis (Kidney Stone)",
      "Appendicitis"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1260",
    "patient": "Charles P., 23M",
    "vitals": "BP 126/81 • HR 101 • O2 97%",
    "symptoms": [
      "Absent cremasteric reflex on the affected side upon thigh stroking",
      "High-riding, horizontally oriented testicle on the affected side",
      "Markedly decreased or absent blood flow on scrotal Doppler ultrasound",
      "Sudden onset of severe, constant unilateral scrotal and inguinal pain"
    ],
    "options": [
      "Epididymitis",
      "Testicular Torsion",
      "Inguinal Hernia",
      "Hydrocele"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1261",
    "patient": "Nancy L., 16F",
    "vitals": "BP 91/59 • HR 128 • O2 95%",
    "symptoms": [
      "Progressive nausea, vomiting, diffuse abdominal pain, and fatigue",
      "Fruity breath odor (acetone) and deep, rapid Kussmaul respirations",
      "Polydipsia, polyuria, weight loss, and signs of dry mucosal dehydration",
      "Serum blood glucose level of 450 mg/dL and metabolic acidosis"
    ],
    "options": [
      "Diabetic Ketoacidosis (DKA)",
      "Hyperosmolar Hyperglycemic State",
      "Sepsis",
      "Salicylate Toxicity"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1262",
    "patient": "David T., 85M",
    "vitals": "BP 86/49 • HR 114 • O2 93% • Temp 39.1C",
    "symptoms": [
      "Altered mental status, confusion, and worsening lethargy",
      "Elevated blood lactate levels and severe peripheral leukocytosis",
      "Active focus of infection, such as pyelonephritis or severe pneumonia",
      "Warm, flushed skin (early phase) or cool, clammy mottled extremities (late)"
    ],
    "options": [
      "Cardiogenic Shock",
      "Septic Shock",
      "Hypovolemic Shock",
      "Neurogenic Shock"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1263",
    "patient": "Donald I., 48M",
    "vitals": "BP 143/80 • HR 121 • O2 99%",
    "symptoms": [
      "Undetectable serum TSH with elevated free T3 and T4 levels",
      "Proptosis, lid lag, exophthalmos, and pretibial myxedema",
      "Weight loss despite increased appetite and frequent bowel movements",
      "Heat intolerance, fine hand tremors, palpitations, and anxiety"
    ],
    "options": [
      "Hypothyroidism",
      "Pheochromocytoma",
      "Hyperthyroidism (Graves' Disease)",
      "Cushing's Syndrome"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1264",
    "patient": "Debra Y., 58F",
    "vitals": "BP 79/47 • HR 140 • O2 92%",
    "symptoms": [
      "Severe dyspnea and hypotension following penetrating chest trauma",
      "Pulsus paradoxus (drop in systolic blood pressure >10 mmHg on inspiration)",
      "Distended jugular veins (JVD) with prominent x-descent and absent y-descent",
      "Muffled, distant heart sounds on auscultation (Beck's triad)"
    ],
    "options": [
      "Tension Pneumothorax",
      "Cardiac Tamponade",
      "Massive Hemothorax",
      "Flail Chest"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1265",
    "patient": "Edward Z., 41M",
    "vitals": "BP 80/44 • HR 132 • O2 86%",
    "symptoms": [
      "Immediate clinical improvement upon needle decompression in 2nd intercostal space",
      "Hyperresonance to percussion and absent breath sounds on the affected side",
      "Tracheal deviation to the contralateral side away from the injury",
      "Severe progressive respiratory distress and hypotension after chest wall injury"
    ],
    "options": [
      "Cardiac Tamponade",
      "Tension Pneumothorax",
      "Pulmonary Contusion",
      "Aortic Rupture"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1266",
    "patient": "Melissa S., 68F",
    "vitals": "BP 140/89 • HR 83 • O2 96%",
    "symptoms": [
      "Localized tenderness over the distal radial metaphysis",
      "Classic dorsal displacement and angulation of the distal radius (dinner fork deformity)",
      "Severe wrist pain and swelling after falling on an outstretched hand (FOOSH)",
      "Radiograph showing extra-articular transverse distal radius fracture"
    ],
    "options": [
      "Smith's Fracture",
      "Colles' Fracture",
      "Scaphoid Fracture",
      "Galeazzi Fracture"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1267",
    "patient": "Kathleen M., 47F",
    "vitals": "BP 86/65 • HR 52 • O2 81% • Temp 35.9C",
    "symptoms": [
      "Patient found completely unresponsive, cyanotic, and hypoventilating",
      "Symmetric pinpoint pupils (miosis) bilaterally",
      "Severe respiratory depression with respiratory rate less than 8 breaths/minute",
      "Multiple skin track marks over forearm veins"
    ],
    "options": [
      "Cocaine Overdose",
      "Benzodiazepine Overdose",
      "Opioid Overdose",
      "Alcohol Poisoning"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1268",
    "patient": "Timothy Y., 26M",
    "vitals": "BP 114/64 • HR 118 • O2 97% • Temp 38.7C",
    "symptoms": [
      "Mixed respiratory alkalosis and high anion gap metabolic acidosis",
      "Agitation, confusion, diaphoresis, and progressive lethargy",
      "Toxic serum salicylate levels following ingestion of an unknown medication",
      "Marked hyperventilation, nausea, vomiting, and epigastric distress"
    ],
    "options": [
      "Acetaminophen Toxicity",
      "Aspirin (Salicylate) Toxicity",
      "Iron Toxicity",
      "Lead Poisoning"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1269",
    "patient": "Virginia E., 41F",
    "vitals": "BP 99/66 • HR 57 • O2 85%",
    "symptoms": [
      "Recent exposure to agricultural pesticides or crop dusting",
      "Diffuse wheezing, bradycardia, and bronchial hypersecretion",
      "Incontinence of urine and feces with severe abdominal cramping",
      "Pinpoint pupils (miosis) and muscle fasciculations/weakness"
    ],
    "options": [
      "Organophosphate Poisoning",
      "Anticholinergic Toxicity",
      "Opioid Toxicity",
      "Carbon Monoxide Poisoning"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1270",
    "patient": "Virginia G., 30F",
    "vitals": "BP 104/67 • HR 56 • O2 97% • Temp 39.3C",
    "symptoms": [
      "Relative bradycardia (pulse-temperature dissociation)",
      "Recent travel to an endemic country with poor sanitation",
      "Faint, rose-colored macules (rose spots) on the abdomen and chest",
      "Abdominal pain, splenomegaly, and constipation followed by watery diarrhea"
    ],
    "options": [
      "Typhoid Fever",
      "Malaria",
      "Dengue Fever",
      "Leptospirosis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1271",
    "patient": "John W., 30M",
    "vitals": "BP 115/64 • HR 97 • O2 96% • Temp 39.8C",
    "symptoms": [
      "Sudden onset of high-grade fever, chills, and severe retro-orbital pain",
      "Exquisite joint, muscle, and bone pain described as 'breakbone'",
      "Positive tourniquet test showing petechiae formation",
      "Generalized maculopapular rash blanching on pressure"
    ],
    "options": [
      "Zika Virus",
      "Dengue Fever",
      "Chikungunya",
      "Yellow Fever"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1272",
    "patient": "Samuel K., 50M",
    "vitals": "BP 104/59 • HR 95 • O2 95% • Temp 38.7C",
    "symptoms": [
      "Recent travel to a tropical region without taking chemoprophylaxis",
      "Thick and thin blood smears showing trophozoites and Schüffner's dots",
      "Profuse sweating as the fever breaks, followed by extreme fatigue",
      "Paroxysmal cyclical high fevers and shaking chills occurring every 48 hours"
    ],
    "options": [
      "Malaria (P. falciparum)",
      "Malaria (P. vivax)",
      "Babesiosis",
      "Visceral Leishmaniasis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1273",
    "patient": "Dorothy H., 27F",
    "vitals": "BP 110/84 • HR 70 • O2 96%",
    "symptoms": [
      "Erythematous malar rash over the cheeks and bridge of nose, sparing nasolabial folds",
      "Photosensitivity rash and multiple painful joints (polyarthritis)",
      "Painless oral ulcers, fatigue, and recurrent low-grade fevers",
      "Urinalysis showing proteinuria and red blood cell casts"
    ],
    "options": [
      "Systemic Lupus Erythematosus",
      "Rosacea",
      "Dermatomyositis",
      "Rheumatoid Arthritis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1274",
    "patient": "Paul L., 44M",
    "vitals": "BP 140/87 • HR 89 • O2 96% • Temp 37.8C",
    "symptoms": [
      "Sudden onset of excruciating pain and swelling in the first metatarsophalangeal joint",
      "Joint is erythematous, hot, swollen, and exquisitely sensitive to light touch",
      "Symptoms peaked rapidly within 12 to 24 hours of onset",
      "Joint aspirate showing needle-shaped, negatively birefringent crystals"
    ],
    "options": [
      "Pseudogout",
      "Septic Arthritis",
      "Acute Gouty Arthritis",
      "Osteoarthritis Exacerbation"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1275",
    "patient": "Barbara C., 25F",
    "vitals": "BP 71/56 • HR 115 • O2 83%",
    "symptoms": [
      "Rapid resolution of symptoms following intramuscular epinephrine injection",
      "Acute onset of diffuse pruritic hives, urticaria, and lip/tongue swelling",
      "Inspiratory stridor, wheezing, dyspnea, and feeling of throat tightness",
      "Profound hypotension and dizziness shortly after eating peanut butter or seafood"
    ],
    "options": [
      "Asthma Attack",
      "Panic Attack",
      "Vasovagal Syncope",
      "Anaphylaxis"
    ],
    "answer": 3
  },
  {
    "id": "CASE-1276",
    "patient": "Sandra I., 52F",
    "vitals": "BP 115/83 • HR 84 • O2 97%",
    "symptoms": [
      "Unilateral lower extremity calf pain, swelling, and warmth",
      "History of prolonged bed rest, malignancy, or oral contraceptive use",
      "Calf circumference measurement is 4 cm larger on the symptomatic side",
      "Pain in the calf elicited by passive dorsiflexion of the foot (Homan's sign)"
    ],
    "options": [
      "Cellulitis",
      "Baker's Cyst Rupture",
      "Deep Vein Thrombosis (DVT)",
      "Superficial Thrombophlebitis"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1277",
    "patient": "Dorothy F., 84F",
    "vitals": "BP 132/84 • HR 98 • O2 89%",
    "symptoms": [
      "Worsening baseline shortness of breath and chronic cough",
      "Marked increase in sputum volume and sputum purulence",
      "Diffuse wheezing and distant breath sounds on lung auscultation",
      "Classic barrel chest, accessory muscle use, and history of heavy smoking"
    ],
    "options": [
      "Asthma Exacerbation",
      "Congestive Heart Failure",
      "COPD Exacerbation",
      "Pulmonary Embolism"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1278",
    "patient": "Anna T., 35F",
    "vitals": "BP 133/78 • HR 94 • O2 96% • Temp 37.9C",
    "symptoms": [
      "Associated low-grade fever, chills, and mild inguinal lymphadenopathy",
      "Failure to improve with elevation alone; requires systemic antibiotics",
      "Small portal of entry, such as tinea pedis or a minor abrasion",
      "Localized skin tenderness and pain over the lower leg"
    ],
    "options": [
      "Deep Vein Thrombosis",
      "Cellulitis",
      "Erysipelas",
      "Necrotizing Fasciitis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1279",
    "patient": "Melissa I., 43F",
    "vitals": "BP 120/85 • HR 109 • O2 100%",
    "symptoms": [
      "Falsely normal 100% pulse oximetry readings on room air",
      "Elevated carboxyhemoglobin levels on arterial blood gas analysis",
      "Confusion, fatigue, and irritability without fever or neck stiffness",
      "Dull, throbbing, generalized headache, dizziness, and nausea"
    ],
    "options": [
      "Influenza",
      "Food Poisoning",
      "Migraine",
      "Carbon Monoxide Poisoning"
    ],
    "answer": 3
  },
  {
    "id": "CASE-1280",
    "patient": "Eric V., 38M",
    "vitals": "BP 112/71 • HR 108 • O2 98%",
    "symptoms": [
      "Sudden onset of profuse diaphoresis, hand tremors, and palpitations",
      "Fingerstick blood glucose reading of 42 mg/dL",
      "Severe confusion, irritability, slurred speech, and combative behavior",
      "History of type 1 diabetes mellitus and missed a meal after taking insulin"
    ],
    "options": [
      "Ischemic Stroke",
      "Opioid Overdose",
      "Diabetic Ketoacidosis",
      "Hypoglycemia"
    ],
    "answer": 3
  },
  {
    "id": "CASE-1281",
    "patient": "Brian O., 51M",
    "vitals": "BP 96/83 • HR 102 • O2 92%",
    "symptoms": [
      "Significantly elevated serum cardiac troponin levels",
      "ECG showing ST-segment elevations in anterior leads V1-V4",
      "History of coronary artery disease, hyperlipidemia, and heavy smoking",
      "Profuse diaphoresis, nausea, and shortness of breath"
    ],
    "options": [
      "Myocardial Infarction",
      "Gastroesophageal Reflux",
      "Costochondritis",
      "Acute Pericarditis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1282",
    "patient": "Betty D., 80F",
    "vitals": "BP 207/102 • HR 108 • O2 95%",
    "symptoms": [
      "Sudden onset, tearing substernal chest pain radiating to the back",
      "Asymmetric blood pressure readings in upper extremities",
      "Widened mediastinum on chest radiograph",
      "History of poorly controlled chronic hypertension"
    ],
    "options": [
      "Myocardial Infarction",
      "Aortic Dissection",
      "Pulmonary Embolism",
      "Tension Pneumothorax"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1283",
    "patient": "Robert H., 28M",
    "vitals": "BP 104/62 • HR 194 • O2 98%",
    "symptoms": [
      "Sudden onset of heart racing and severe palpitations",
      "Rapid resolution of tachycardia upon carotid sinus massage",
      "Mild lightheadedness and feeling of chest pressure",
      "Recurrent episodes of sudden heart racing resolving spontaneously"
    ],
    "options": [
      "Atrial Fibrillation",
      "Supraventricular Tachycardia (SVT)",
      "Ventricular Tachycardia",
      "Sinus Tachycardia"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1284",
    "patient": "Aaron P., 60M",
    "vitals": "BP 137/98 • HR 105 • O2 89%",
    "symptoms": [
      "Progressive exertional dyspnea and orthopnea",
      "Paroxysmal nocturnal dyspnea causing patient to wake up gasping",
      "Bilateral pitting lower extremity edema and jugular venous distension",
      "S3 gallop on heart auscultation and bibasilar rales"
    ],
    "options": [
      "Congestive Heart Failure",
      "COPD Exacerbation",
      "Pulmonary Fibrosis",
      "Cor Pulmonale"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1285",
    "patient": "Linda R., 37F",
    "vitals": "BP 122/66 • HR 91 • O2 96%",
    "symptoms": [
      "Sharp retrosternal chest pain that worsens on inspiration and lying flat",
      "Chest pain that is relieved by sitting up and leaning forward",
      "Recent history of a self-limiting viral upper respiratory tract infection",
      "ECG showing diffuse ST-segment elevation with PR-segment depression"
    ],
    "options": [
      "Myocardial Infarction",
      "Pulmonary Embolism",
      "Acute Pericarditis",
      "Gastroesophageal Reflux"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1286",
    "patient": "Jose B., 24M",
    "vitals": "BP 123/69 • HR 133 • O2 89%",
    "symptoms": [
      "Sinus tachycardia and S1Q3T3 pattern on electrocardiogram",
      "Significantly elevated D-dimer levels and mismatched perfusion defect on V/Q scan",
      "Recent prolonged immobilization due to a transatlantic flight or surgery",
      "Sudden onset of severe shortness of breath and pleuritic chest pain"
    ],
    "options": [
      "Pneumonia",
      "Asthma Exacerbation",
      "Pulmonary Embolism",
      "Pneumothorax"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1287",
    "patient": "Robert O., 18M",
    "vitals": "BP 117/74 • HR 112 • O2 91%",
    "symptoms": [
      "Asthenic tall, thin male body habitus",
      "Sudden onset of sharp, unilateral pleuritic chest pain and dyspnea",
      "Markedly decreased breath sounds and tactile fremitus on the affected side",
      "Hyperresonance to percussion over the ipsilateral chest wall"
    ],
    "options": [
      "Spontaneous Pneumothorax",
      "Asthma Attack",
      "Pulmonary Embolism",
      "Cardiac Tamponade"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1288",
    "patient": "Karen V., 61F",
    "vitals": "BP 131/68 • HR 98 • O2 93% • Temp 39.0C",
    "symptoms": [
      "Bronchial breath sounds and late inspiratory crackles on auscultation",
      "High fever, shaking chills, and pleuritic chest discomfort",
      "Chest X-ray showing lobar consolidation with air bronchograms",
      "Dullness to percussion and increased tactile fremitus at the lung base"
    ],
    "options": [
      "Lobar Pneumonia",
      "Tuberculosis",
      "Lung Cancer",
      "Pulmonary Edema"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1289",
    "patient": "Rachel P., 23F",
    "vitals": "BP 100/66 • HR 117 • O2 94%",
    "symptoms": [
      "Triggered by recent exposure to cold air, pollen, or an upper respiratory infection",
      "Widespread expiratory wheezing, chest tightness, and dry cough",
      "Prolonged expiratory phase and reduced peak expiratory flow rate",
      "Long-standing history of atopy, allergic rhinitis, or childhood eczema"
    ],
    "options": [
      "Foreign Body Aspiration",
      "Asthma Exacerbation",
      "Croup",
      "Epiglottitis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1290",
    "patient": "Emma R., 77F",
    "vitals": "BP 158/113 • HR 74 • O2 97%",
    "symptoms": [
      "Sudden onset of contralateral face, arm, and leg weakness",
      "Expressive or receptive motor aphasia and slurred speech",
      "Gaze deviation toward the side of the cortical lesion",
      "Contralateral hemisensory loss and marked pronator drift"
    ],
    "options": [
      "Ischemic Stroke (MCA)",
      "Hemorrhagic Stroke",
      "Bell's Palsy",
      "Complex Partial Seizure"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1291",
    "patient": "Edward G., 53M",
    "vitals": "BP 203/90 • HR 104 • O2 97%",
    "symptoms": [
      "Non-contrast head CT showing hyperdensity in the basal cisterns",
      "Marked photophobia, nausea, vomiting, and meningismus",
      "Sudden onset of excruciating headache, described as the 'worst of life'",
      "Transient loss of consciousness followed by severe neck stiffness"
    ],
    "options": [
      "Migraine",
      "Subarachnoid Hemorrhage",
      "Meningitis",
      "Tension Headache"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1292",
    "patient": "Linda L., 41F",
    "vitals": "BP 103/72 • HR 108 • O2 95% • Temp 40.2C",
    "symptoms": [
      "CSF analysis showing elevated neutrophils, low glucose, and high protein",
      "Severe generalized headache, high fever, and shaking chills",
      "Positive Kernig's and Brudzinski's signs on physical exam",
      "Altered mental status ranging from confusion to stupor"
    ],
    "options": [
      "Viral Encephalitis",
      "Subarachnoid Hemorrhage",
      "Bacterial Meningitis",
      "Brain Abscess"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1293",
    "patient": "Sarah E., 37F",
    "vitals": "BP 135/73 • HR 88 • O2 97%",
    "symptoms": [
      "Hyperacusis and decreased lacrimation on the affected side",
      "Sudden onset of unilateral facial paralysis involving the entire half face",
      "Inability to raise the eyebrow or wrinkle the forehead on the affected side",
      "Inability to close the eye on the affected side completely"
    ],
    "options": [
      "Stroke",
      "Bell's Palsy",
      "Trigeminal Neuralgia",
      "Myasthenia Gravis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1294",
    "patient": "Matthew K., 23M",
    "vitals": "BP 108/78 • HR 90 • O2 97% • Temp 38.0C",
    "symptoms": [
      "Dull periumbilical pain migrating and localizing to the right lower quadrant",
      "Nausea, vomiting, anorexia, and localized abdominal guarding",
      "Mild fever and peripheral leukocytosis with left shift",
      "Exquisite tenderness at McBurney's point and positive rebound tenderness"
    ],
    "options": [
      "Ectopic Pregnancy",
      "Ovarian Torsion",
      "Acute Appendicitis",
      "Kidney Stone"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1295",
    "patient": "Shirley H., 47F",
    "vitals": "BP 139/87 • HR 109 • O2 95% • Temp 38.8C",
    "symptoms": [
      "Severe right upper quadrant pain radiating to the right scapula",
      "Persistent nausea, vomiting, low-grade fever, and mild leukocytosis",
      "Pain triggered or worsened by ingestion of fatty meals",
      "Inspiration arrest on deep palpation of the right upper quadrant (Murphy's sign)"
    ],
    "options": [
      "Acute Cholecystitis",
      "Acute Pancreatitis",
      "Peptic Ulcer Disease",
      "Hepatitis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1296",
    "patient": "Dorothy B., 39F",
    "vitals": "BP 105/70 • HR 122 • O2 97%",
    "symptoms": [
      "Severe, boring epigastric abdominal pain radiating straight to the back",
      "Constant nausea and intractable vomiting without relief of pain",
      "Marked elevations in serum amylase and lipase levels (>3x normal)",
      "History of chronic alcohol abuse or gallstones"
    ],
    "options": [
      "Perforated Ulcer",
      "Acute Pancreatitis",
      "Mesenteric Ischemia",
      "Aortic Aneurysm Rupture"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1297",
    "patient": "Barbara R., 71F",
    "vitals": "BP 128/78 • HR 105 • O2 97% • Temp 38.6C",
    "symptoms": [
      "Tender palpable mass in the left lower quadrant on palpation",
      "Constant left lower quadrant abdominal pain and tenderness",
      "Changes in bowel habits, commonly constipation or loose stools",
      "Low-grade fever, chills, and mild abdominal bloating"
    ],
    "options": [
      "Appendicitis",
      "Acute Diverticulitis",
      "Colon Cancer",
      "Ulcerative Colitis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1298",
    "patient": "Helen K., 18F",
    "vitals": "BP 78/56 • HR 131 • O2 96%",
    "symptoms": [
      "Hemoperitoneum and pelvic free fluid seen on transvaginal ultrasound",
      "Sudden onset of severe, sharp, unilateral pelvic and lower abdominal pain",
      "Positive serum beta-hCG with lack of an intrauterine gestational sac",
      "Missed menstrual cycle by 2-4 weeks with vaginal bleeding or spotting"
    ],
    "options": [
      "Ovarian Torsion",
      "Ruptured Ectopic Pregnancy",
      "Pelvic Inflammatory Disease",
      "Endometriosis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1299",
    "patient": "Catherine Y., 28F",
    "vitals": "BP 155/94 • HR 102 • O2 99%",
    "symptoms": [
      "Gross or microscopic hematuria on urinalysis",
      "Inability to lie still, pacing or squirming in pain",
      "Exquisite costovertebral angle tenderness on the affected side",
      "Sudden onset of severe, colicky flank pain radiating to the groin"
    ],
    "options": [
      "Pyelonephritis",
      "Testicular Torsion",
      "Nephrolithiasis (Kidney Stone)",
      "Appendicitis"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1300",
    "patient": "Gregory Y., 25M",
    "vitals": "BP 119/71 • HR 109 • O2 98%",
    "symptoms": [
      "Sudden onset of severe, constant unilateral scrotal and inguinal pain",
      "High-riding, horizontally oriented testicle on the affected side",
      "Markedly decreased or absent blood flow on scrotal Doppler ultrasound",
      "Negative Prehn's sign (no relief of pain with scrotal elevation)"
    ],
    "options": [
      "Epididymitis",
      "Testicular Torsion",
      "Inguinal Hernia",
      "Hydrocele"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1301",
    "patient": "Nicholas P., 12M",
    "vitals": "BP 90/64 • HR 135 • O2 99%",
    "symptoms": [
      "Polydipsia, polyuria, weight loss, and signs of dry mucosal dehydration",
      "Serum blood glucose level of 450 mg/dL and metabolic acidosis",
      "Fruity breath odor (acetone) and deep, rapid Kussmaul respirations",
      "Progressive nausea, vomiting, diffuse abdominal pain, and fatigue"
    ],
    "options": [
      "Diabetic Ketoacidosis (DKA)",
      "Hyperosmolar Hyperglycemic State",
      "Sepsis",
      "Salicylate Toxicity"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1302",
    "patient": "Justin I., 81M",
    "vitals": "BP 86/55 • HR 133 • O2 88% • Temp 39.2C",
    "symptoms": [
      "Elevated blood lactate levels and severe peripheral leukocytosis",
      "Refractory hypotension unresponsive to adequate intravenous fluid resuscitation",
      "Warm, flushed skin (early phase) or cool, clammy mottled extremities (late)",
      "Altered mental status, confusion, and worsening lethargy"
    ],
    "options": [
      "Cardiogenic Shock",
      "Septic Shock",
      "Hypovolemic Shock",
      "Neurogenic Shock"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1303",
    "patient": "Anthony H., 30M",
    "vitals": "BP 121/79 • HR 114 • O2 98%",
    "symptoms": [
      "Proptosis, lid lag, exophthalmos, and pretibial myxedema",
      "Undetectable serum TSH with elevated free T3 and T4 levels",
      "Diffuse non-tender thyroid enlargement (goiter) with thyroid bruit",
      "Heat intolerance, fine hand tremors, palpitations, and anxiety"
    ],
    "options": [
      "Hypothyroidism",
      "Pheochromocytoma",
      "Hyperthyroidism (Graves' Disease)",
      "Cushing's Syndrome"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1304",
    "patient": "Pamela E., 23F",
    "vitals": "BP 74/48 • HR 127 • O2 91%",
    "symptoms": [
      "Muffled, distant heart sounds on auscultation (Beck's triad)",
      "Pulsus paradoxus (drop in systolic blood pressure >10 mmHg on inspiration)",
      "Distended jugular veins (JVD) with prominent x-descent and absent y-descent",
      "Severe dyspnea and hypotension following penetrating chest trauma"
    ],
    "options": [
      "Tension Pneumothorax",
      "Cardiac Tamponade",
      "Massive Hemothorax",
      "Flail Chest"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1305",
    "patient": "Mary D., 37F",
    "vitals": "BP 90/60 • HR 141 • O2 82%",
    "symptoms": [
      "Immediate clinical improvement upon needle decompression in 2nd intercostal space",
      "Distended neck veins and ipsilateral chest wall hyperexpansion",
      "Hyperresonance to percussion and absent breath sounds on the affected side",
      "Tracheal deviation to the contralateral side away from the injury"
    ],
    "options": [
      "Cardiac Tamponade",
      "Tension Pneumothorax",
      "Pulmonary Contusion",
      "Aortic Rupture"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1306",
    "patient": "Linda F., 71F",
    "vitals": "BP 120/78 • HR 75 • O2 98%",
    "symptoms": [
      "Localized tenderness over the distal radial metaphysis",
      "Pain exacerbated by active or passive wrist movements",
      "Severe wrist pain and swelling after falling on an outstretched hand (FOOSH)",
      "Radiograph showing extra-articular transverse distal radius fracture"
    ],
    "options": [
      "Smith's Fracture",
      "Colles' Fracture",
      "Scaphoid Fracture",
      "Galeazzi Fracture"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1307",
    "patient": "Daniel L., 37M",
    "vitals": "BP 97/53 • HR 50 • O2 85% • Temp 35.9C",
    "symptoms": [
      "Multiple skin track marks over forearm veins",
      "Severe respiratory depression with respiratory rate less than 8 breaths/minute",
      "Patient found completely unresponsive, cyanotic, and hypoventilating",
      "Rapid improvement in respiratory rate and level of consciousness after IV naloxone"
    ],
    "options": [
      "Cocaine Overdose",
      "Benzodiazepine Overdose",
      "Opioid Overdose",
      "Alcohol Poisoning"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1308",
    "patient": "Christopher Y., 22M",
    "vitals": "BP 110/69 • HR 130 • O2 95% • Temp 37.8C",
    "symptoms": [
      "Agitation, confusion, diaphoresis, and progressive lethargy",
      "Toxic serum salicylate levels following ingestion of an unknown medication",
      "Mixed respiratory alkalosis and high anion gap metabolic acidosis",
      "Marked hyperventilation, nausea, vomiting, and epigastric distress"
    ],
    "options": [
      "Acetaminophen Toxicity",
      "Aspirin (Salicylate) Toxicity",
      "Iron Toxicity",
      "Lead Poisoning"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1309",
    "patient": "Raymond B., 28M",
    "vitals": "BP 92/53 • HR 56 • O2 89%",
    "symptoms": [
      "Recent exposure to agricultural pesticides or crop dusting",
      "Profuse generalized sweating, salivation, lacrimation, and rhinorrhea",
      "Pinpoint pupils (miosis) and muscle fasciculations/weakness",
      "Incontinence of urine and feces with severe abdominal cramping"
    ],
    "options": [
      "Organophosphate Poisoning",
      "Anticholinergic Toxicity",
      "Opioid Toxicity",
      "Carbon Monoxide Poisoning"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1310",
    "patient": "Charles V., 45M",
    "vitals": "BP 114/67 • HR 68 • O2 94% • Temp 39.3C",
    "symptoms": [
      "Abdominal pain, splenomegaly, and constipation followed by watery diarrhea",
      "Relative bradycardia (pulse-temperature dissociation)",
      "Faint, rose-colored macules (rose spots) on the abdomen and chest",
      "Recent travel to an endemic country with poor sanitation"
    ],
    "options": [
      "Typhoid Fever",
      "Malaria",
      "Dengue Fever",
      "Leptospirosis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1311",
    "patient": "Laura Z., 33F",
    "vitals": "BP 100/78 • HR 91 • O2 96% • Temp 39.3C",
    "symptoms": [
      "Exquisite joint, muscle, and bone pain described as 'breakbone'",
      "Positive tourniquet test showing petechiae formation",
      "Generalized maculopapular rash blanching on pressure",
      "Laboratory evidence of marked leukopenia and thrombocytopenia"
    ],
    "options": [
      "Zika Virus",
      "Dengue Fever",
      "Chikungunya",
      "Yellow Fever"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1312",
    "patient": "Michelle N., 45F",
    "vitals": "BP 111/55 • HR 113 • O2 96% • Temp 40.4C",
    "symptoms": [
      "Thick and thin blood smears showing trophozoites and Schüffner's dots",
      "Scleral icterus, splenomegaly, anemia, and mild thrombocytopenia",
      "Profuse sweating as the fever breaks, followed by extreme fatigue",
      "Recent travel to a tropical region without taking chemoprophylaxis"
    ],
    "options": [
      "Malaria (P. falciparum)",
      "Malaria (P. vivax)",
      "Babesiosis",
      "Visceral Leishmaniasis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1313",
    "patient": "Barbara F., 25F",
    "vitals": "BP 134/72 • HR 77 • O2 99%",
    "symptoms": [
      "Urinalysis showing proteinuria and red blood cell casts",
      "Painless oral ulcers, fatigue, and recurrent low-grade fevers",
      "Photosensitivity rash and multiple painful joints (polyarthritis)",
      "Erythematous malar rash over the cheeks and bridge of nose, sparing nasolabial folds"
    ],
    "options": [
      "Systemic Lupus Erythematosus",
      "Rosacea",
      "Dermatomyositis",
      "Rheumatoid Arthritis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1314",
    "patient": "Kevin N., 62M",
    "vitals": "BP 144/84 • HR 89 • O2 98%",
    "symptoms": [
      "Joint aspirate showing needle-shaped, negatively birefringent crystals",
      "History of frequent alcohol consumption and purine-rich diet",
      "Symptoms peaked rapidly within 12 to 24 hours of onset",
      "Joint is erythematous, hot, swollen, and exquisitely sensitive to light touch"
    ],
    "options": [
      "Pseudogout",
      "Septic Arthritis",
      "Acute Gouty Arthritis",
      "Osteoarthritis Exacerbation"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1315",
    "patient": "Benjamin H., 27M",
    "vitals": "BP 94/53 • HR 124 • O2 86%",
    "symptoms": [
      "Nausea, vomiting, and diffuse abdominal cramps",
      "Profound hypotension and dizziness shortly after eating peanut butter or seafood",
      "Rapid resolution of symptoms following intramuscular epinephrine injection",
      "Inspiratory stridor, wheezing, dyspnea, and feeling of throat tightness"
    ],
    "options": [
      "Asthma Attack",
      "Panic Attack",
      "Vasovagal Syncope",
      "Anaphylaxis"
    ],
    "answer": 3
  },
  {
    "id": "CASE-1316",
    "patient": "Ashley T., 37F",
    "vitals": "BP 116/75 • HR 95 • O2 96%",
    "symptoms": [
      "Unilateral lower extremity calf pain, swelling, and warmth",
      "Calf circumference measurement is 4 cm larger on the symptomatic side",
      "Compression ultrasound showing non-compressible popliteal or femoral vein",
      "Pain in the calf elicited by passive dorsiflexion of the foot (Homan's sign)"
    ],
    "options": [
      "Cellulitis",
      "Baker's Cyst Rupture",
      "Deep Vein Thrombosis (DVT)",
      "Superficial Thrombophlebitis"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1317",
    "patient": "Nancy K., 74F",
    "vitals": "BP 120/80 • HR 106 • O2 87%",
    "symptoms": [
      "Worsening baseline shortness of breath and chronic cough",
      "ABG showing chronic respiratory acidosis with compensatory bicarb retention",
      "Classic barrel chest, accessory muscle use, and history of heavy smoking",
      "Marked increase in sputum volume and sputum purulence"
    ],
    "options": [
      "Asthma Exacerbation",
      "Congestive Heart Failure",
      "COPD Exacerbation",
      "Pulmonary Embolism"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1318",
    "patient": "Melissa M., 47F",
    "vitals": "BP 130/84 • HR 98 • O2 96% • Temp 38.4C",
    "symptoms": [
      "Spreading, poorly demarcated area of skin erythema, warmth, and swelling",
      "Failure to improve with elevation alone; requires systemic antibiotics",
      "Localized skin tenderness and pain over the lower leg",
      "Small portal of entry, such as tinea pedis or a minor abrasion"
    ],
    "options": [
      "Deep Vein Thrombosis",
      "Cellulitis",
      "Erysipelas",
      "Necrotizing Fasciitis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1319",
    "patient": "Patricia N., 52F",
    "vitals": "BP 111/85 • HR 107 • O2 98%",
    "symptoms": [
      "Elevated carboxyhemoglobin levels on arterial blood gas analysis",
      "Dull, throbbing, generalized headache, dizziness, and nausea",
      "Multiple family members or roommates presenting with identical symptoms",
      "Confusion, fatigue, and irritability without fever or neck stiffness"
    ],
    "options": [
      "Influenza",
      "Food Poisoning",
      "Migraine",
      "Carbon Monoxide Poisoning"
    ],
    "answer": 3
  },
  {
    "id": "CASE-1320",
    "patient": "Emma O., 69F",
    "vitals": "BP 125/76 • HR 105 • O2 99%",
    "symptoms": [
      "Fingerstick blood glucose reading of 42 mg/dL",
      "History of type 1 diabetes mellitus and missed a meal after taking insulin",
      "Sudden onset of profuse diaphoresis, hand tremors, and palpitations",
      "Rapid correction of symptoms and recovery of consciousness after D50 IV push"
    ],
    "options": [
      "Ischemic Stroke",
      "Opioid Overdose",
      "Diabetic Ketoacidosis",
      "Hypoglycemia"
    ],
    "answer": 3
  },
  {
    "id": "CASE-1321",
    "patient": "Jose V., 62M",
    "vitals": "BP 144/89 • HR 94 • O2 92%",
    "symptoms": [
      "Crushing retrosternal chest pain radiating to the left arm or jaw",
      "Profuse diaphoresis, nausea, and shortness of breath",
      "History of coronary artery disease, hyperlipidemia, and heavy smoking",
      "ECG showing ST-segment elevations in anterior leads V1-V4"
    ],
    "options": [
      "Myocardial Infarction",
      "Gastroesophageal Reflux",
      "Costochondritis",
      "Acute Pericarditis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1322",
    "patient": "Cynthia N., 51F",
    "vitals": "BP 207/114 • HR 121 • O2 93%",
    "symptoms": [
      "Sudden onset, tearing substernal chest pain radiating to the back",
      "History of poorly controlled chronic hypertension",
      "Asymmetric blood pressure readings in upper extremities",
      "Widened mediastinum on chest radiograph"
    ],
    "options": [
      "Myocardial Infarction",
      "Aortic Dissection",
      "Pulmonary Embolism",
      "Tension Pneumothorax"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1323",
    "patient": "Melissa V., 38F",
    "vitals": "BP 107/71 • HR 189 • O2 99%",
    "symptoms": [
      "Sudden onset of heart racing and severe palpitations",
      "Mild lightheadedness and feeling of chest pressure",
      "ECG showing regular, narrow-complex tachycardia without visible P waves",
      "Rapid resolution of tachycardia upon carotid sinus massage"
    ],
    "options": [
      "Atrial Fibrillation",
      "Supraventricular Tachycardia (SVT)",
      "Ventricular Tachycardia",
      "Sinus Tachycardia"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1324",
    "patient": "Amy R., 83F",
    "vitals": "BP 156/87 • HR 105 • O2 93%",
    "symptoms": [
      "Bilateral pitting lower extremity edema and jugular venous distension",
      "Increased cardiomegaly and cephalization on chest X-ray",
      "S3 gallop on heart auscultation and bibasilar rales",
      "Paroxysmal nocturnal dyspnea causing patient to wake up gasping"
    ],
    "options": [
      "Congestive Heart Failure",
      "COPD Exacerbation",
      "Pulmonary Fibrosis",
      "Cor Pulmonale"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1325",
    "patient": "Kevin H., 32M",
    "vitals": "BP 118/67 • HR 95 • O2 98% • Temp 38.3C",
    "symptoms": [
      "ECG showing diffuse ST-segment elevation with PR-segment depression",
      "Sharp retrosternal chest pain that worsens on inspiration and lying flat",
      "Pericardial friction rub heard best at the left lower sternal border",
      "Chest pain that is relieved by sitting up and leaning forward"
    ],
    "options": [
      "Myocardial Infarction",
      "Pulmonary Embolism",
      "Acute Pericarditis",
      "Gastroesophageal Reflux"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1326",
    "patient": "Debra A., 70F",
    "vitals": "BP 97/69 • HR 113 • O2 92%",
    "symptoms": [
      "Significantly elevated D-dimer levels and mismatched perfusion defect on V/Q scan",
      "Sudden onset of severe shortness of breath and pleuritic chest pain",
      "Recent prolonged immobilization due to a transatlantic flight or surgery",
      "Sinus tachycardia and S1Q3T3 pattern on electrocardiogram"
    ],
    "options": [
      "Pneumonia",
      "Asthma Exacerbation",
      "Pulmonary Embolism",
      "Pneumothorax"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1327",
    "patient": "Scott S., 32M",
    "vitals": "BP 124/83 • HR 113 • O2 89%",
    "symptoms": [
      "Hyperresonance to percussion over the ipsilateral chest wall",
      "Markedly decreased breath sounds and tactile fremitus on the affected side",
      "Asthenic tall, thin male body habitus",
      "Chest radiograph showing a visible pleural line and absence of lung markings"
    ],
    "options": [
      "Spontaneous Pneumothorax",
      "Asthma Attack",
      "Pulmonary Embolism",
      "Cardiac Tamponade"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1328",
    "patient": "Anthony A., 64M",
    "vitals": "BP 133/76 • HR 108 • O2 90% • Temp 39.0C",
    "symptoms": [
      "Dullness to percussion and increased tactile fremitus at the lung base",
      "Productive cough with thick rust-colored or purulent sputum",
      "High fever, shaking chills, and pleuritic chest discomfort",
      "Bronchial breath sounds and late inspiratory crackles on auscultation"
    ],
    "options": [
      "Lobar Pneumonia",
      "Tuberculosis",
      "Lung Cancer",
      "Pulmonary Edema"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1329",
    "patient": "Matthew P., 38M",
    "vitals": "BP 108/61 • HR 124 • O2 92%",
    "symptoms": [
      "Use of accessory respiratory muscles and intercostal retractions",
      "Prolonged expiratory phase and reduced peak expiratory flow rate",
      "Triggered by recent exposure to cold air, pollen, or an upper respiratory infection",
      "Widespread expiratory wheezing, chest tightness, and dry cough"
    ],
    "options": [
      "Foreign Body Aspiration",
      "Asthma Exacerbation",
      "Croup",
      "Epiglottitis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1330",
    "patient": "Lisa A., 68F",
    "vitals": "BP 172/104 • HR 81 • O2 95%",
    "symptoms": [
      "Sudden onset of contralateral face, arm, and leg weakness",
      "Expressive or receptive motor aphasia and slurred speech",
      "Contralateral hemisensory loss and marked pronator drift",
      "Gaze deviation toward the side of the cortical lesion"
    ],
    "options": [
      "Ischemic Stroke (MCA)",
      "Hemorrhagic Stroke",
      "Bell's Palsy",
      "Complex Partial Seizure"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1331",
    "patient": "David P., 40M",
    "vitals": "BP 151/95 • HR 84 • O2 98%",
    "symptoms": [
      "Sudden onset of excruciating headache, described as the 'worst of life'",
      "Transient loss of consciousness followed by severe neck stiffness",
      "Marked photophobia, nausea, vomiting, and meningismus",
      "Non-contrast head CT showing hyperdensity in the basal cisterns"
    ],
    "options": [
      "Migraine",
      "Subarachnoid Hemorrhage",
      "Meningitis",
      "Tension Headache"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1332",
    "patient": "Carolyn S., 35F",
    "vitals": "BP 120/75 • HR 105 • O2 93% • Temp 39.3C",
    "symptoms": [
      "Marked nuchal rigidity and neck stiffness on passive flexion",
      "Severe generalized headache, high fever, and shaking chills",
      "CSF analysis showing elevated neutrophils, low glucose, and high protein",
      "Altered mental status ranging from confusion to stupor"
    ],
    "options": [
      "Viral Encephalitis",
      "Subarachnoid Hemorrhage",
      "Bacterial Meningitis",
      "Brain Abscess"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1333",
    "patient": "Charles M., 38M",
    "vitals": "BP 123/72 • HR 72 • O2 97%",
    "symptoms": [
      "Inability to close the eye on the affected side completely",
      "Drooling from the corner of the mouth and loss of taste on anterior tongue",
      "Sudden onset of unilateral facial paralysis involving the entire half face",
      "Hyperacusis and decreased lacrimation on the affected side"
    ],
    "options": [
      "Stroke",
      "Bell's Palsy",
      "Trigeminal Neuralgia",
      "Myasthenia Gravis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1334",
    "patient": "Shirley V., 21F",
    "vitals": "BP 115/65 • HR 103 • O2 98% • Temp 38.3C",
    "symptoms": [
      "Nausea, vomiting, anorexia, and localized abdominal guarding",
      "Mild fever and peripheral leukocytosis with left shift",
      "Positive Rovsing's sign and obturator sign on examination",
      "Dull periumbilical pain migrating and localizing to the right lower quadrant"
    ],
    "options": [
      "Ectopic Pregnancy",
      "Ovarian Torsion",
      "Acute Appendicitis",
      "Kidney Stone"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1335",
    "patient": "Pamela R., 62F",
    "vitals": "BP 120/82 • HR 101 • O2 95% • Temp 38.8C",
    "symptoms": [
      "Severe right upper quadrant pain radiating to the right scapula",
      "Pain triggered or worsened by ingestion of fatty meals",
      "Inspiration arrest on deep palpation of the right upper quadrant (Murphy's sign)",
      "Persistent nausea, vomiting, low-grade fever, and mild leukocytosis"
    ],
    "options": [
      "Acute Cholecystitis",
      "Acute Pancreatitis",
      "Peptic Ulcer Disease",
      "Hepatitis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1336",
    "patient": "Karen K., 59F",
    "vitals": "BP 111/62 • HR 119 • O2 96% • Temp 38.0C",
    "symptoms": [
      "Constant nausea and intractable vomiting without relief of pain",
      "Severe, boring epigastric abdominal pain radiating straight to the back",
      "Pain that is partially relieved by sitting up and leaning forward",
      "Marked elevations in serum amylase and lipase levels (>3x normal)"
    ],
    "options": [
      "Perforated Ulcer",
      "Acute Pancreatitis",
      "Mesenteric Ischemia",
      "Aortic Aneurysm Rupture"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1337",
    "patient": "Laura M., 53F",
    "vitals": "BP 121/83 • HR 92 • O2 98% • Temp 38.5C",
    "symptoms": [
      "Tender palpable mass in the left lower quadrant on palpation",
      "Changes in bowel habits, commonly constipation or loose stools",
      "CT scan of abdomen showing colonic wall thickening and fat stranding",
      "Low-grade fever, chills, and mild abdominal bloating"
    ],
    "options": [
      "Appendicitis",
      "Acute Diverticulitis",
      "Colon Cancer",
      "Ulcerative Colitis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1338",
    "patient": "Elizabeth L., 39F",
    "vitals": "BP 95/60 • HR 129 • O2 98%",
    "symptoms": [
      "Missed menstrual cycle by 2-4 weeks with vaginal bleeding or spotting",
      "Dizziness, lightheadedness, and referred left shoulder pain",
      "Sudden onset of severe, sharp, unilateral pelvic and lower abdominal pain",
      "Hemoperitoneum and pelvic free fluid seen on transvaginal ultrasound"
    ],
    "options": [
      "Ovarian Torsion",
      "Ruptured Ectopic Pregnancy",
      "Pelvic Inflammatory Disease",
      "Endometriosis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1339",
    "patient": "Amy W., 51F",
    "vitals": "BP 139/84 • HR 92 • O2 100%",
    "symptoms": [
      "Sudden onset of severe, colicky flank pain radiating to the groin",
      "Exquisite costovertebral angle tenderness on the affected side",
      "CT scan of abdomen/pelvis without contrast showing obstructive calculus",
      "Gross or microscopic hematuria on urinalysis"
    ],
    "options": [
      "Pyelonephritis",
      "Testicular Torsion",
      "Nephrolithiasis (Kidney Stone)",
      "Appendicitis"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1340",
    "patient": "Donald R., 23M",
    "vitals": "BP 119/81 • HR 111 • O2 99%",
    "symptoms": [
      "Markedly decreased or absent blood flow on scrotal Doppler ultrasound",
      "Sudden onset of severe, constant unilateral scrotal and inguinal pain",
      "Negative Prehn's sign (no relief of pain with scrotal elevation)",
      "High-riding, horizontally oriented testicle on the affected side"
    ],
    "options": [
      "Epididymitis",
      "Testicular Torsion",
      "Inguinal Hernia",
      "Hydrocele"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1341",
    "patient": "Alexander L., 20M",
    "vitals": "BP 97/62 • HR 117 • O2 96%",
    "symptoms": [
      "Progressive nausea, vomiting, diffuse abdominal pain, and fatigue",
      "Fruity breath odor (acetone) and deep, rapid Kussmaul respirations",
      "Polydipsia, polyuria, weight loss, and signs of dry mucosal dehydration",
      "Serum blood glucose level of 450 mg/dL and metabolic acidosis"
    ],
    "options": [
      "Diabetic Ketoacidosis (DKA)",
      "Hyperosmolar Hyperglycemic State",
      "Sepsis",
      "Salicylate Toxicity"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1342",
    "patient": "Jose M., 73M",
    "vitals": "BP 88/54 • HR 118 • O2 90% • Temp 38.8C",
    "symptoms": [
      "Altered mental status, confusion, and worsening lethargy",
      "Warm, flushed skin (early phase) or cool, clammy mottled extremities (late)",
      "Refractory hypotension unresponsive to adequate intravenous fluid resuscitation",
      "Elevated blood lactate levels and severe peripheral leukocytosis"
    ],
    "options": [
      "Cardiogenic Shock",
      "Septic Shock",
      "Hypovolemic Shock",
      "Neurogenic Shock"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1343",
    "patient": "William D., 24M",
    "vitals": "BP 131/73 • HR 130 • O2 98%",
    "symptoms": [
      "Weight loss despite increased appetite and frequent bowel movements",
      "Proptosis, lid lag, exophthalmos, and pretibial myxedema",
      "Undetectable serum TSH with elevated free T3 and T4 levels",
      "Heat intolerance, fine hand tremors, palpitations, and anxiety"
    ],
    "options": [
      "Hypothyroidism",
      "Pheochromocytoma",
      "Hyperthyroidism (Graves' Disease)",
      "Cushing's Syndrome"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1344",
    "patient": "Katherine C., 51F",
    "vitals": "BP 80/61 • HR 134 • O2 93%",
    "symptoms": [
      "Echocardiogram showing diastolic collapse of the right ventricle",
      "Muffled, distant heart sounds on auscultation (Beck's triad)",
      "Distended jugular veins (JVD) with prominent x-descent and absent y-descent",
      "Severe dyspnea and hypotension following penetrating chest trauma"
    ],
    "options": [
      "Tension Pneumothorax",
      "Cardiac Tamponade",
      "Massive Hemothorax",
      "Flail Chest"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1345",
    "patient": "Cynthia A., 58F",
    "vitals": "BP 87/55 • HR 138 • O2 83%",
    "symptoms": [
      "Severe progressive respiratory distress and hypotension after chest wall injury",
      "Tracheal deviation to the contralateral side away from the injury",
      "Immediate clinical improvement upon needle decompression in 2nd intercostal space",
      "Hyperresonance to percussion and absent breath sounds on the affected side"
    ],
    "options": [
      "Cardiac Tamponade",
      "Tension Pneumothorax",
      "Pulmonary Contusion",
      "Aortic Rupture"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1346",
    "patient": "Mary A., 68F",
    "vitals": "BP 121/81 • HR 88 • O2 96%",
    "symptoms": [
      "Severe wrist pain and swelling after falling on an outstretched hand (FOOSH)",
      "Pain exacerbated by active or passive wrist movements",
      "Classic dorsal displacement and angulation of the distal radius (dinner fork deformity)",
      "Localized tenderness over the distal radial metaphysis"
    ],
    "options": [
      "Smith's Fracture",
      "Colles' Fracture",
      "Scaphoid Fracture",
      "Galeazzi Fracture"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1347",
    "patient": "Nancy E., 53F",
    "vitals": "BP 105/62 • HR 55 • O2 82% • Temp 36.0C",
    "symptoms": [
      "Rapid improvement in respiratory rate and level of consciousness after IV naloxone",
      "Patient found completely unresponsive, cyanotic, and hypoventilating",
      "Symmetric pinpoint pupils (miosis) bilaterally",
      "Severe respiratory depression with respiratory rate less than 8 breaths/minute"
    ],
    "options": [
      "Cocaine Overdose",
      "Benzodiazepine Overdose",
      "Opioid Overdose",
      "Alcohol Poisoning"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1348",
    "patient": "John B., 46M",
    "vitals": "BP 102/71 • HR 118 • O2 95% • Temp 38.6C",
    "symptoms": [
      "Agitation, confusion, diaphoresis, and progressive lethargy",
      "Intense bilateral tinnitus (ringing in the ears) and hearing loss",
      "Marked hyperventilation, nausea, vomiting, and epigastric distress",
      "Mixed respiratory alkalosis and high anion gap metabolic acidosis"
    ],
    "options": [
      "Acetaminophen Toxicity",
      "Aspirin (Salicylate) Toxicity",
      "Iron Toxicity",
      "Lead Poisoning"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1349",
    "patient": "Stephen M., 24M",
    "vitals": "BP 91/65 • HR 46 • O2 92%",
    "symptoms": [
      "Incontinence of urine and feces with severe abdominal cramping",
      "Pinpoint pupils (miosis) and muscle fasciculations/weakness",
      "Profuse generalized sweating, salivation, lacrimation, and rhinorrhea",
      "Diffuse wheezing, bradycardia, and bronchial hypersecretion"
    ],
    "options": [
      "Organophosphate Poisoning",
      "Anticholinergic Toxicity",
      "Opioid Toxicity",
      "Carbon Monoxide Poisoning"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1350",
    "patient": "Nancy E., 30F",
    "vitals": "BP 116/79 • HR 57 • O2 97% • Temp 39.8C",
    "symptoms": [
      "Relative bradycardia (pulse-temperature dissociation)",
      "Recent travel to an endemic country with poor sanitation",
      "Faint, rose-colored macules (rose spots) on the abdomen and chest",
      "Gradual onset of step-ladder pattern fever and severe frontal headache"
    ],
    "options": [
      "Typhoid Fever",
      "Malaria",
      "Dengue Fever",
      "Leptospirosis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1351",
    "patient": "Ryan W., 18M",
    "vitals": "BP 116/76 • HR 96 • O2 97% • Temp 39.9C",
    "symptoms": [
      "Exquisite joint, muscle, and bone pain described as 'breakbone'",
      "Generalized maculopapular rash blanching on pressure",
      "Sudden onset of high-grade fever, chills, and severe retro-orbital pain",
      "Laboratory evidence of marked leukopenia and thrombocytopenia"
    ],
    "options": [
      "Zika Virus",
      "Dengue Fever",
      "Chikungunya",
      "Yellow Fever"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1352",
    "patient": "Cynthia S., 45F",
    "vitals": "BP 97/55 • HR 95 • O2 94% • Temp 39.8C",
    "symptoms": [
      "Profuse sweating as the fever breaks, followed by extreme fatigue",
      "Paroxysmal cyclical high fevers and shaking chills occurring every 48 hours",
      "Scleral icterus, splenomegaly, anemia, and mild thrombocytopenia",
      "Recent travel to a tropical region without taking chemoprophylaxis"
    ],
    "options": [
      "Malaria (P. falciparum)",
      "Malaria (P. vivax)",
      "Babesiosis",
      "Visceral Leishmaniasis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1353",
    "patient": "Elizabeth Y., 38F",
    "vitals": "BP 131/80 • HR 80 • O2 98%",
    "symptoms": [
      "Erythematous malar rash over the cheeks and bridge of nose, sparing nasolabial folds",
      "High titer positive antinuclear antibodies (ANA) and anti-dsDNA antibodies",
      "Urinalysis showing proteinuria and red blood cell casts",
      "Photosensitivity rash and multiple painful joints (polyarthritis)"
    ],
    "options": [
      "Systemic Lupus Erythematosus",
      "Rosacea",
      "Dermatomyositis",
      "Rheumatoid Arthritis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1354",
    "patient": "Justin N., 42M",
    "vitals": "BP 130/95 • HR 82 • O2 99%",
    "symptoms": [
      "Joint aspirate showing needle-shaped, negatively birefringent crystals",
      "History of frequent alcohol consumption and purine-rich diet",
      "Joint is erythematous, hot, swollen, and exquisitely sensitive to light touch",
      "Sudden onset of excruciating pain and swelling in the first metatarsophalangeal joint"
    ],
    "options": [
      "Pseudogout",
      "Septic Arthritis",
      "Acute Gouty Arthritis",
      "Osteoarthritis Exacerbation"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1355",
    "patient": "Justin L., 48M",
    "vitals": "BP 71/58 • HR 117 • O2 82%",
    "symptoms": [
      "Rapid resolution of symptoms following intramuscular epinephrine injection",
      "Nausea, vomiting, and diffuse abdominal cramps",
      "Profound hypotension and dizziness shortly after eating peanut butter or seafood",
      "Inspiratory stridor, wheezing, dyspnea, and feeling of throat tightness"
    ],
    "options": [
      "Asthma Attack",
      "Panic Attack",
      "Vasovagal Syncope",
      "Anaphylaxis"
    ],
    "answer": 3
  },
  {
    "id": "CASE-1356",
    "patient": "Laura P., 65F",
    "vitals": "BP 121/80 • HR 87 • O2 98%",
    "symptoms": [
      "Unilateral lower extremity calf pain, swelling, and warmth",
      "Calf circumference measurement is 4 cm larger on the symptomatic side",
      "Pain in the calf elicited by passive dorsiflexion of the foot (Homan's sign)",
      "History of prolonged bed rest, malignancy, or oral contraceptive use"
    ],
    "options": [
      "Cellulitis",
      "Baker's Cyst Rupture",
      "Deep Vein Thrombosis (DVT)",
      "Superficial Thrombophlebitis"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1357",
    "patient": "Carolyn T., 78F",
    "vitals": "BP 121/83 • HR 100 • O2 85% • Temp 38.0C",
    "symptoms": [
      "Worsening baseline shortness of breath and chronic cough",
      "ABG showing chronic respiratory acidosis with compensatory bicarb retention",
      "Marked increase in sputum volume and sputum purulence",
      "Diffuse wheezing and distant breath sounds on lung auscultation"
    ],
    "options": [
      "Asthma Exacerbation",
      "Congestive Heart Failure",
      "COPD Exacerbation",
      "Pulmonary Embolism"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1358",
    "patient": "Anthony N., 25M",
    "vitals": "BP 131/72 • HR 98 • O2 97% • Temp 38.4C",
    "symptoms": [
      "Small portal of entry, such as tinea pedis or a minor abrasion",
      "Failure to improve with elevation alone; requires systemic antibiotics",
      "Localized skin tenderness and pain over the lower leg",
      "Associated low-grade fever, chills, and mild inguinal lymphadenopathy"
    ],
    "options": [
      "Deep Vein Thrombosis",
      "Cellulitis",
      "Erysipelas",
      "Necrotizing Fasciitis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1359",
    "patient": "Patricia R., 21F",
    "vitals": "BP 129/80 • HR 104 • O2 100%",
    "symptoms": [
      "Confusion, fatigue, and irritability without fever or neck stiffness",
      "Multiple family members or roommates presenting with identical symptoms",
      "Dull, throbbing, generalized headache, dizziness, and nausea",
      "Elevated carboxyhemoglobin levels on arterial blood gas analysis"
    ],
    "options": [
      "Influenza",
      "Food Poisoning",
      "Migraine",
      "Carbon Monoxide Poisoning"
    ],
    "answer": 3
  },
  {
    "id": "CASE-1360",
    "patient": "Frank H., 74M",
    "vitals": "BP 111/80 • HR 115 • O2 97%",
    "symptoms": [
      "Severe confusion, irritability, slurred speech, and combative behavior",
      "History of type 1 diabetes mellitus and missed a meal after taking insulin",
      "Sudden onset of profuse diaphoresis, hand tremors, and palpitations",
      "Rapid correction of symptoms and recovery of consciousness after D50 IV push"
    ],
    "options": [
      "Ischemic Stroke",
      "Opioid Overdose",
      "Diabetic Ketoacidosis",
      "Hypoglycemia"
    ],
    "answer": 3
  },
  {
    "id": "CASE-1361",
    "patient": "Nicholas S., 84M",
    "vitals": "BP 141/87 • HR 108 • O2 94%",
    "symptoms": [
      "Crushing retrosternal chest pain radiating to the left arm or jaw",
      "Profuse diaphoresis, nausea, and shortness of breath",
      "History of coronary artery disease, hyperlipidemia, and heavy smoking",
      "ECG showing ST-segment elevations in anterior leads V1-V4"
    ],
    "options": [
      "Myocardial Infarction",
      "Gastroesophageal Reflux",
      "Costochondritis",
      "Acute Pericarditis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1362",
    "patient": "Mark C., 50M",
    "vitals": "BP 204/118 • HR 118 • O2 95%",
    "symptoms": [
      "Aortic regurgitation murmur heard along the right sternal border",
      "History of poorly controlled chronic hypertension",
      "Widened mediastinum on chest radiograph",
      "Asymmetric blood pressure readings in upper extremities"
    ],
    "options": [
      "Myocardial Infarction",
      "Aortic Dissection",
      "Pulmonary Embolism",
      "Tension Pneumothorax"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1363",
    "patient": "Michelle K., 35F",
    "vitals": "BP 115/65 • HR 176 • O2 97%",
    "symptoms": [
      "Rapid resolution of tachycardia upon carotid sinus massage",
      "Recurrent episodes of sudden heart racing resolving spontaneously",
      "Sudden onset of heart racing and severe palpitations",
      "Mild lightheadedness and feeling of chest pressure"
    ],
    "options": [
      "Atrial Fibrillation",
      "Supraventricular Tachycardia (SVT)",
      "Ventricular Tachycardia",
      "Sinus Tachycardia"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1364",
    "patient": "Robert R., 80M",
    "vitals": "BP 151/89 • HR 94 • O2 91%",
    "symptoms": [
      "S3 gallop on heart auscultation and bibasilar rales",
      "Progressive exertional dyspnea and orthopnea",
      "Bilateral pitting lower extremity edema and jugular venous distension",
      "Paroxysmal nocturnal dyspnea causing patient to wake up gasping"
    ],
    "options": [
      "Congestive Heart Failure",
      "COPD Exacerbation",
      "Pulmonary Fibrosis",
      "Cor Pulmonale"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1365",
    "patient": "Thomas S., 37M",
    "vitals": "BP 107/75 • HR 89 • O2 99%",
    "symptoms": [
      "ECG showing diffuse ST-segment elevation with PR-segment depression",
      "Chest pain that is relieved by sitting up and leaning forward",
      "Pericardial friction rub heard best at the left lower sternal border",
      "Sharp retrosternal chest pain that worsens on inspiration and lying flat"
    ],
    "options": [
      "Myocardial Infarction",
      "Pulmonary Embolism",
      "Acute Pericarditis",
      "Gastroesophageal Reflux"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1366",
    "patient": "Brian C., 53M",
    "vitals": "BP 92/72 • HR 115 • O2 85% • Temp 37.8C",
    "symptoms": [
      "Unilateral calf swelling, erythema, and deep venous tenderness",
      "Recent prolonged immobilization due to a transatlantic flight or surgery",
      "Sinus tachycardia and S1Q3T3 pattern on electrocardiogram",
      "Sudden onset of severe shortness of breath and pleuritic chest pain"
    ],
    "options": [
      "Pneumonia",
      "Asthma Exacerbation",
      "Pulmonary Embolism",
      "Pneumothorax"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1367",
    "patient": "Gary K., 25M",
    "vitals": "BP 117/82 • HR 104 • O2 89%",
    "symptoms": [
      "Sudden onset of sharp, unilateral pleuritic chest pain and dyspnea",
      "Asthenic tall, thin male body habitus",
      "Chest radiograph showing a visible pleural line and absence of lung markings",
      "Markedly decreased breath sounds and tactile fremitus on the affected side"
    ],
    "options": [
      "Spontaneous Pneumothorax",
      "Asthma Attack",
      "Pulmonary Embolism",
      "Cardiac Tamponade"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1368",
    "patient": "Samantha N., 20F",
    "vitals": "BP 124/85 • HR 106 • O2 91% • Temp 39.4C",
    "symptoms": [
      "Bronchial breath sounds and late inspiratory crackles on auscultation",
      "High fever, shaking chills, and pleuritic chest discomfort",
      "Chest X-ray showing lobar consolidation with air bronchograms",
      "Productive cough with thick rust-colored or purulent sputum"
    ],
    "options": [
      "Lobar Pneumonia",
      "Tuberculosis",
      "Lung Cancer",
      "Pulmonary Edema"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1369",
    "patient": "Joshua Y., 19M",
    "vitals": "BP 121/76 • HR 122 • O2 92%",
    "symptoms": [
      "Use of accessory respiratory muscles and intercostal retractions",
      "Prolonged expiratory phase and reduced peak expiratory flow rate",
      "Long-standing history of atopy, allergic rhinitis, or childhood eczema",
      "Widespread expiratory wheezing, chest tightness, and dry cough"
    ],
    "options": [
      "Foreign Body Aspiration",
      "Asthma Exacerbation",
      "Croup",
      "Epiglottitis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1370",
    "patient": "Raymond N., 74M",
    "vitals": "BP 143/112 • HR 95 • O2 96%",
    "symptoms": [
      "Sudden onset of contralateral face, arm, and leg weakness",
      "Expressive or receptive motor aphasia and slurred speech",
      "Contralateral hemisensory loss and marked pronator drift",
      "Gaze deviation toward the side of the cortical lesion"
    ],
    "options": [
      "Ischemic Stroke (MCA)",
      "Hemorrhagic Stroke",
      "Bell's Palsy",
      "Complex Partial Seizure"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1371",
    "patient": "Frank Z., 40M",
    "vitals": "BP 178/113 • HR 77 • O2 97%",
    "symptoms": [
      "Rupture of an anterior communicating artery berry aneurysm",
      "Non-contrast head CT showing hyperdensity in the basal cisterns",
      "Marked photophobia, nausea, vomiting, and meningismus",
      "Transient loss of consciousness followed by severe neck stiffness"
    ],
    "options": [
      "Migraine",
      "Subarachnoid Hemorrhage",
      "Meningitis",
      "Tension Headache"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1372",
    "patient": "Benjamin N., 19M",
    "vitals": "BP 103/67 • HR 116 • O2 94% • Temp 40.2C",
    "symptoms": [
      "CSF analysis showing elevated neutrophils, low glucose, and high protein",
      "Altered mental status ranging from confusion to stupor",
      "Positive Kernig's and Brudzinski's signs on physical exam",
      "Marked nuchal rigidity and neck stiffness on passive flexion"
    ],
    "options": [
      "Viral Encephalitis",
      "Subarachnoid Hemorrhage",
      "Bacterial Meningitis",
      "Brain Abscess"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1373",
    "patient": "Christopher M., 42M",
    "vitals": "BP 121/73 • HR 90 • O2 98%",
    "symptoms": [
      "Sudden onset of unilateral facial paralysis involving the entire half face",
      "Drooling from the corner of the mouth and loss of taste on anterior tongue",
      "Hyperacusis and decreased lacrimation on the affected side",
      "Inability to raise the eyebrow or wrinkle the forehead on the affected side"
    ],
    "options": [
      "Stroke",
      "Bell's Palsy",
      "Trigeminal Neuralgia",
      "Myasthenia Gravis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1374",
    "patient": "Stephanie T., 23F",
    "vitals": "BP 121/67 • HR 108 • O2 98% • Temp 38.3C",
    "symptoms": [
      "Mild fever and peripheral leukocytosis with left shift",
      "Positive Rovsing's sign and obturator sign on examination",
      "Nausea, vomiting, anorexia, and localized abdominal guarding",
      "Exquisite tenderness at McBurney's point and positive rebound tenderness"
    ],
    "options": [
      "Ectopic Pregnancy",
      "Ovarian Torsion",
      "Acute Appendicitis",
      "Kidney Stone"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1375",
    "patient": "Carol W., 50F",
    "vitals": "BP 131/90 • HR 99 • O2 98% • Temp 38.5C",
    "symptoms": [
      "Severe right upper quadrant pain radiating to the right scapula",
      "Ultrasound showing gallstones, gallbladder wall thickening, and pericholecystic fluid",
      "Pain triggered or worsened by ingestion of fatty meals",
      "Inspiration arrest on deep palpation of the right upper quadrant (Murphy's sign)"
    ],
    "options": [
      "Acute Cholecystitis",
      "Acute Pancreatitis",
      "Peptic Ulcer Disease",
      "Hepatitis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1376",
    "patient": "Brenda H., 42F",
    "vitals": "BP 100/72 • HR 119 • O2 95%",
    "symptoms": [
      "Pain that is partially relieved by sitting up and leaning forward",
      "Marked elevations in serum amylase and lipase levels (>3x normal)",
      "Severe, boring epigastric abdominal pain radiating straight to the back",
      "History of chronic alcohol abuse or gallstones"
    ],
    "options": [
      "Perforated Ulcer",
      "Acute Pancreatitis",
      "Mesenteric Ischemia",
      "Aortic Aneurysm Rupture"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1377",
    "patient": "Gary R., 77M",
    "vitals": "BP 127/75 • HR 95 • O2 98% • Temp 38.7C",
    "symptoms": [
      "Tender palpable mass in the left lower quadrant on palpation",
      "CT scan of abdomen showing colonic wall thickening and fat stranding",
      "Constant left lower quadrant abdominal pain and tenderness",
      "Low-grade fever, chills, and mild abdominal bloating"
    ],
    "options": [
      "Appendicitis",
      "Acute Diverticulitis",
      "Colon Cancer",
      "Ulcerative Colitis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1378",
    "patient": "Kimberly K., 18F",
    "vitals": "BP 84/53 • HR 126 • O2 95%",
    "symptoms": [
      "Hemoperitoneum and pelvic free fluid seen on transvaginal ultrasound",
      "Missed menstrual cycle by 2-4 weeks with vaginal bleeding or spotting",
      "Dizziness, lightheadedness, and referred left shoulder pain",
      "Positive serum beta-hCG with lack of an intrauterine gestational sac"
    ],
    "options": [
      "Ovarian Torsion",
      "Ruptured Ectopic Pregnancy",
      "Pelvic Inflammatory Disease",
      "Endometriosis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1379",
    "patient": "Catherine Z., 51F",
    "vitals": "BP 145/94 • HR 102 • O2 100%",
    "symptoms": [
      "CT scan of abdomen/pelvis without contrast showing obstructive calculus",
      "Sudden onset of severe, colicky flank pain radiating to the groin",
      "Exquisite costovertebral angle tenderness on the affected side",
      "Gross or microscopic hematuria on urinalysis"
    ],
    "options": [
      "Pyelonephritis",
      "Testicular Torsion",
      "Nephrolithiasis (Kidney Stone)",
      "Appendicitis"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1380",
    "patient": "Stephen Y., 18M",
    "vitals": "BP 111/78 • HR 111 • O2 98%",
    "symptoms": [
      "Sudden onset of severe, constant unilateral scrotal and inguinal pain",
      "Markedly decreased or absent blood flow on scrotal Doppler ultrasound",
      "High-riding, horizontally oriented testicle on the affected side",
      "Absent cremasteric reflex on the affected side upon thigh stroking"
    ],
    "options": [
      "Epididymitis",
      "Testicular Torsion",
      "Inguinal Hernia",
      "Hydrocele"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1381",
    "patient": "Nancy N., 23F",
    "vitals": "BP 110/55 • HR 132 • O2 97%",
    "symptoms": [
      "Polydipsia, polyuria, weight loss, and signs of dry mucosal dehydration",
      "Fruity breath odor (acetone) and deep, rapid Kussmaul respirations",
      "Progressive nausea, vomiting, diffuse abdominal pain, and fatigue",
      "Serum blood glucose level of 450 mg/dL and metabolic acidosis"
    ],
    "options": [
      "Diabetic Ketoacidosis (DKA)",
      "Hyperosmolar Hyperglycemic State",
      "Sepsis",
      "Salicylate Toxicity"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1382",
    "patient": "Donald H., 70M",
    "vitals": "BP 88/57 • HR 124 • O2 92% • Temp 39.6C",
    "symptoms": [
      "Active focus of infection, such as pyelonephritis or severe pneumonia",
      "Warm, flushed skin (early phase) or cool, clammy mottled extremities (late)",
      "Refractory hypotension unresponsive to adequate intravenous fluid resuscitation",
      "Altered mental status, confusion, and worsening lethargy"
    ],
    "options": [
      "Cardiogenic Shock",
      "Septic Shock",
      "Hypovolemic Shock",
      "Neurogenic Shock"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1383",
    "patient": "William B., 49M",
    "vitals": "BP 142/67 • HR 120 • O2 97%",
    "symptoms": [
      "Diffuse non-tender thyroid enlargement (goiter) with thyroid bruit",
      "Proptosis, lid lag, exophthalmos, and pretibial myxedema",
      "Undetectable serum TSH with elevated free T3 and T4 levels",
      "Heat intolerance, fine hand tremors, palpitations, and anxiety"
    ],
    "options": [
      "Hypothyroidism",
      "Pheochromocytoma",
      "Hyperthyroidism (Graves' Disease)",
      "Cushing's Syndrome"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1384",
    "patient": "Margaret B., 46F",
    "vitals": "BP 93/45 • HR 131 • O2 92%",
    "symptoms": [
      "Severe dyspnea and hypotension following penetrating chest trauma",
      "Pulsus paradoxus (drop in systolic blood pressure >10 mmHg on inspiration)",
      "Distended jugular veins (JVD) with prominent x-descent and absent y-descent",
      "Muffled, distant heart sounds on auscultation (Beck's triad)"
    ],
    "options": [
      "Tension Pneumothorax",
      "Cardiac Tamponade",
      "Massive Hemothorax",
      "Flail Chest"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1385",
    "patient": "Gregory P., 55M",
    "vitals": "BP 77/47 • HR 142 • O2 82%",
    "symptoms": [
      "Tracheal deviation to the contralateral side away from the injury",
      "Distended neck veins and ipsilateral chest wall hyperexpansion",
      "Severe progressive respiratory distress and hypotension after chest wall injury",
      "Immediate clinical improvement upon needle decompression in 2nd intercostal space"
    ],
    "options": [
      "Cardiac Tamponade",
      "Tension Pneumothorax",
      "Pulmonary Contusion",
      "Aortic Rupture"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1386",
    "patient": "Jennifer W., 57F",
    "vitals": "BP 145/73 • HR 95 • O2 98%",
    "symptoms": [
      "Classic dorsal displacement and angulation of the distal radius (dinner fork deformity)",
      "Pain exacerbated by active or passive wrist movements",
      "Radiograph showing extra-articular transverse distal radius fracture",
      "Localized tenderness over the distal radial metaphysis"
    ],
    "options": [
      "Smith's Fracture",
      "Colles' Fracture",
      "Scaphoid Fracture",
      "Galeazzi Fracture"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1387",
    "patient": "Richard N., 36M",
    "vitals": "BP 103/55 • HR 46 • O2 84%",
    "symptoms": [
      "Patient found completely unresponsive, cyanotic, and hypoventilating",
      "Multiple skin track marks over forearm veins",
      "Symmetric pinpoint pupils (miosis) bilaterally",
      "Severe respiratory depression with respiratory rate less than 8 breaths/minute"
    ],
    "options": [
      "Cocaine Overdose",
      "Benzodiazepine Overdose",
      "Opioid Overdose",
      "Alcohol Poisoning"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1388",
    "patient": "Barbara B., 48F",
    "vitals": "BP 120/71 • HR 125 • O2 95% • Temp 38.4C",
    "symptoms": [
      "Mixed respiratory alkalosis and high anion gap metabolic acidosis",
      "Marked hyperventilation, nausea, vomiting, and epigastric distress",
      "Agitation, confusion, diaphoresis, and progressive lethargy",
      "Toxic serum salicylate levels following ingestion of an unknown medication"
    ],
    "options": [
      "Acetaminophen Toxicity",
      "Aspirin (Salicylate) Toxicity",
      "Iron Toxicity",
      "Lead Poisoning"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1389",
    "patient": "Steven Y., 56M",
    "vitals": "BP 100/59 • HR 42 • O2 89%",
    "symptoms": [
      "Recent exposure to agricultural pesticides or crop dusting",
      "Diffuse wheezing, bradycardia, and bronchial hypersecretion",
      "Incontinence of urine and feces with severe abdominal cramping",
      "Pinpoint pupils (miosis) and muscle fasciculations/weakness"
    ],
    "options": [
      "Organophosphate Poisoning",
      "Anticholinergic Toxicity",
      "Opioid Toxicity",
      "Carbon Monoxide Poisoning"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1390",
    "patient": "Alexander L., 35M",
    "vitals": "BP 112/79 • HR 72 • O2 97% • Temp 40.0C",
    "symptoms": [
      "Gradual onset of step-ladder pattern fever and severe frontal headache",
      "Faint, rose-colored macules (rose spots) on the abdomen and chest",
      "Recent travel to an endemic country with poor sanitation",
      "Relative bradycardia (pulse-temperature dissociation)"
    ],
    "options": [
      "Typhoid Fever",
      "Malaria",
      "Dengue Fever",
      "Leptospirosis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1391",
    "patient": "James L., 43M",
    "vitals": "BP 97/69 • HR 107 • O2 96% • Temp 39.8C",
    "symptoms": [
      "Generalized maculopapular rash blanching on pressure",
      "Exquisite joint, muscle, and bone pain described as 'breakbone'",
      "Sudden onset of high-grade fever, chills, and severe retro-orbital pain",
      "Laboratory evidence of marked leukopenia and thrombocytopenia"
    ],
    "options": [
      "Zika Virus",
      "Dengue Fever",
      "Chikungunya",
      "Yellow Fever"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1392",
    "patient": "Nicholas S., 39M",
    "vitals": "BP 111/60 • HR 90 • O2 93% • Temp 39.2C",
    "symptoms": [
      "Scleral icterus, splenomegaly, anemia, and mild thrombocytopenia",
      "Profuse sweating as the fever breaks, followed by extreme fatigue",
      "Thick and thin blood smears showing trophozoites and Schüffner's dots",
      "Paroxysmal cyclical high fevers and shaking chills occurring every 48 hours"
    ],
    "options": [
      "Malaria (P. falciparum)",
      "Malaria (P. vivax)",
      "Babesiosis",
      "Visceral Leishmaniasis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1393",
    "patient": "Mary K., 30F",
    "vitals": "BP 114/78 • HR 81 • O2 97%",
    "symptoms": [
      "Erythematous malar rash over the cheeks and bridge of nose, sparing nasolabial folds",
      "Photosensitivity rash and multiple painful joints (polyarthritis)",
      "Urinalysis showing proteinuria and red blood cell casts",
      "Painless oral ulcers, fatigue, and recurrent low-grade fevers"
    ],
    "options": [
      "Systemic Lupus Erythematosus",
      "Rosacea",
      "Dermatomyositis",
      "Rheumatoid Arthritis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1394",
    "patient": "Kevin H., 59M",
    "vitals": "BP 131/91 • HR 84 • O2 99%",
    "symptoms": [
      "Joint is erythematous, hot, swollen, and exquisitely sensitive to light touch",
      "History of frequent alcohol consumption and purine-rich diet",
      "Symptoms peaked rapidly within 12 to 24 hours of onset",
      "Joint aspirate showing needle-shaped, negatively birefringent crystals"
    ],
    "options": [
      "Pseudogout",
      "Septic Arthritis",
      "Acute Gouty Arthritis",
      "Osteoarthritis Exacerbation"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1395",
    "patient": "Charles J., 16M",
    "vitals": "BP 90/56 • HR 124 • O2 88%",
    "symptoms": [
      "Nausea, vomiting, and diffuse abdominal cramps",
      "Inspiratory stridor, wheezing, dyspnea, and feeling of throat tightness",
      "Acute onset of diffuse pruritic hives, urticaria, and lip/tongue swelling",
      "Rapid resolution of symptoms following intramuscular epinephrine injection"
    ],
    "options": [
      "Asthma Attack",
      "Panic Attack",
      "Vasovagal Syncope",
      "Anaphylaxis"
    ],
    "answer": 3
  },
  {
    "id": "CASE-1396",
    "patient": "Rebecca K., 63F",
    "vitals": "BP 119/79 • HR 94 • O2 98%",
    "symptoms": [
      "History of prolonged bed rest, malignancy, or oral contraceptive use",
      "Pain in the calf elicited by passive dorsiflexion of the foot (Homan's sign)",
      "Compression ultrasound showing non-compressible popliteal or femoral vein",
      "Calf circumference measurement is 4 cm larger on the symptomatic side"
    ],
    "options": [
      "Cellulitis",
      "Baker's Cyst Rupture",
      "Deep Vein Thrombosis (DVT)",
      "Superficial Thrombophlebitis"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1397",
    "patient": "Pamela V., 85F",
    "vitals": "BP 121/83 • HR 110 • O2 85%",
    "symptoms": [
      "Marked increase in sputum volume and sputum purulence",
      "Worsening baseline shortness of breath and chronic cough",
      "Classic barrel chest, accessory muscle use, and history of heavy smoking",
      "ABG showing chronic respiratory acidosis with compensatory bicarb retention"
    ],
    "options": [
      "Asthma Exacerbation",
      "Congestive Heart Failure",
      "COPD Exacerbation",
      "Pulmonary Embolism"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1398",
    "patient": "Emma M., 58F",
    "vitals": "BP 121/71 • HR 93 • O2 97% • Temp 38.5C",
    "symptoms": [
      "Spreading, poorly demarcated area of skin erythema, warmth, and swelling",
      "Localized skin tenderness and pain over the lower leg",
      "Small portal of entry, such as tinea pedis or a minor abrasion",
      "Associated low-grade fever, chills, and mild inguinal lymphadenopathy"
    ],
    "options": [
      "Deep Vein Thrombosis",
      "Cellulitis",
      "Erysipelas",
      "Necrotizing Fasciitis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1399",
    "patient": "Joshua A., 68M",
    "vitals": "BP 111/79 • HR 107 • O2 98%",
    "symptoms": [
      "Multiple family members or roommates presenting with identical symptoms",
      "Elevated carboxyhemoglobin levels on arterial blood gas analysis",
      "Dull, throbbing, generalized headache, dizziness, and nausea",
      "Falsely normal 100% pulse oximetry readings on room air"
    ],
    "options": [
      "Influenza",
      "Food Poisoning",
      "Migraine",
      "Carbon Monoxide Poisoning"
    ],
    "answer": 3
  },
  {
    "id": "CASE-1400",
    "patient": "Samuel N., 63M",
    "vitals": "BP 125/76 • HR 121 • O2 98%",
    "symptoms": [
      "Sudden onset of profuse diaphoresis, hand tremors, and palpitations",
      "Severe confusion, irritability, slurred speech, and combative behavior",
      "Rapid correction of symptoms and recovery of consciousness after D50 IV push",
      "History of type 1 diabetes mellitus and missed a meal after taking insulin"
    ],
    "options": [
      "Ischemic Stroke",
      "Opioid Overdose",
      "Diabetic Ketoacidosis",
      "Hypoglycemia"
    ],
    "answer": 3
  },
  {
    "id": "CASE-1401",
    "patient": "Rachel F., 60F",
    "vitals": "BP 123/78 • HR 83 • O2 92%",
    "symptoms": [
      "History of coronary artery disease, hyperlipidemia, and heavy smoking",
      "ECG showing ST-segment elevations in anterior leads V1-V4",
      "Significantly elevated serum cardiac troponin levels",
      "Profuse diaphoresis, nausea, and shortness of breath"
    ],
    "options": [
      "Myocardial Infarction",
      "Gastroesophageal Reflux",
      "Costochondritis",
      "Acute Pericarditis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1402",
    "patient": "Jack C., 50M",
    "vitals": "BP 207/103 • HR 114 • O2 95%",
    "symptoms": [
      "Asymmetric blood pressure readings in upper extremities",
      "Sudden onset, tearing substernal chest pain radiating to the back",
      "History of poorly controlled chronic hypertension",
      "Aortic regurgitation murmur heard along the right sternal border"
    ],
    "options": [
      "Myocardial Infarction",
      "Aortic Dissection",
      "Pulmonary Embolism",
      "Tension Pneumothorax"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1403",
    "patient": "Shirley V., 27F",
    "vitals": "BP 115/64 • HR 164 • O2 95%",
    "symptoms": [
      "Recurrent episodes of sudden heart racing resolving spontaneously",
      "Rapid resolution of tachycardia upon carotid sinus massage",
      "Sudden onset of heart racing and severe palpitations",
      "Mild lightheadedness and feeling of chest pressure"
    ],
    "options": [
      "Atrial Fibrillation",
      "Supraventricular Tachycardia (SVT)",
      "Ventricular Tachycardia",
      "Sinus Tachycardia"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1404",
    "patient": "Karen F., 64F",
    "vitals": "BP 151/89 • HR 103 • O2 93%",
    "symptoms": [
      "Increased cardiomegaly and cephalization on chest X-ray",
      "S3 gallop on heart auscultation and bibasilar rales",
      "Bilateral pitting lower extremity edema and jugular venous distension",
      "Paroxysmal nocturnal dyspnea causing patient to wake up gasping"
    ],
    "options": [
      "Congestive Heart Failure",
      "COPD Exacerbation",
      "Pulmonary Fibrosis",
      "Cor Pulmonale"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1405",
    "patient": "Andrew P., 26M",
    "vitals": "BP 107/68 • HR 104 • O2 97%",
    "symptoms": [
      "ECG showing diffuse ST-segment elevation with PR-segment depression",
      "Sharp retrosternal chest pain that worsens on inspiration and lying flat",
      "Recent history of a self-limiting viral upper respiratory tract infection",
      "Chest pain that is relieved by sitting up and leaning forward"
    ],
    "options": [
      "Myocardial Infarction",
      "Pulmonary Embolism",
      "Acute Pericarditis",
      "Gastroesophageal Reflux"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1406",
    "patient": "Jason O., 36M",
    "vitals": "BP 109/59 • HR 128 • O2 92%",
    "symptoms": [
      "Sinus tachycardia and S1Q3T3 pattern on electrocardiogram",
      "Unilateral calf swelling, erythema, and deep venous tenderness",
      "Recent prolonged immobilization due to a transatlantic flight or surgery",
      "Significantly elevated D-dimer levels and mismatched perfusion defect on V/Q scan"
    ],
    "options": [
      "Pneumonia",
      "Asthma Exacerbation",
      "Pulmonary Embolism",
      "Pneumothorax"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1407",
    "patient": "Brian W., 28M",
    "vitals": "BP 126/77 • HR 106 • O2 90%",
    "symptoms": [
      "Hyperresonance to percussion over the ipsilateral chest wall",
      "Asthenic tall, thin male body habitus",
      "Chest radiograph showing a visible pleural line and absence of lung markings",
      "Markedly decreased breath sounds and tactile fremitus on the affected side"
    ],
    "options": [
      "Spontaneous Pneumothorax",
      "Asthma Attack",
      "Pulmonary Embolism",
      "Cardiac Tamponade"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1408",
    "patient": "Steven S., 62M",
    "vitals": "BP 112/81 • HR 97 • O2 93% • Temp 38.5C",
    "symptoms": [
      "Dullness to percussion and increased tactile fremitus at the lung base",
      "Bronchial breath sounds and late inspiratory crackles on auscultation",
      "Productive cough with thick rust-colored or purulent sputum",
      "High fever, shaking chills, and pleuritic chest discomfort"
    ],
    "options": [
      "Lobar Pneumonia",
      "Tuberculosis",
      "Lung Cancer",
      "Pulmonary Edema"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1409",
    "patient": "Steven F., 8M",
    "vitals": "BP 121/75 • HR 121 • O2 91%",
    "symptoms": [
      "Triggered by recent exposure to cold air, pollen, or an upper respiratory infection",
      "Prolonged expiratory phase and reduced peak expiratory flow rate",
      "Use of accessory respiratory muscles and intercostal retractions",
      "Widespread expiratory wheezing, chest tightness, and dry cough"
    ],
    "options": [
      "Foreign Body Aspiration",
      "Asthma Exacerbation",
      "Croup",
      "Epiglottitis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1410",
    "patient": "Elizabeth D., 64F",
    "vitals": "BP 146/109 • HR 88 • O2 95%",
    "symptoms": [
      "Symptoms developed suddenly within the past few hours",
      "Gaze deviation toward the side of the cortical lesion",
      "Contralateral hemisensory loss and marked pronator drift",
      "Expressive or receptive motor aphasia and slurred speech"
    ],
    "options": [
      "Ischemic Stroke (MCA)",
      "Hemorrhagic Stroke",
      "Bell's Palsy",
      "Complex Partial Seizure"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1411",
    "patient": "Ashley T., 39F",
    "vitals": "BP 199/108 • HR 109 • O2 99%",
    "symptoms": [
      "Sudden onset of excruciating headache, described as the 'worst of life'",
      "Transient loss of consciousness followed by severe neck stiffness",
      "Marked photophobia, nausea, vomiting, and meningismus",
      "Non-contrast head CT showing hyperdensity in the basal cisterns"
    ],
    "options": [
      "Migraine",
      "Subarachnoid Hemorrhage",
      "Meningitis",
      "Tension Headache"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1412",
    "patient": "John N., 46M",
    "vitals": "BP 124/73 • HR 106 • O2 94% • Temp 38.8C",
    "symptoms": [
      "CSF analysis showing elevated neutrophils, low glucose, and high protein",
      "Altered mental status ranging from confusion to stupor",
      "Positive Kernig's and Brudzinski's signs on physical exam",
      "Marked nuchal rigidity and neck stiffness on passive flexion"
    ],
    "options": [
      "Viral Encephalitis",
      "Subarachnoid Hemorrhage",
      "Bacterial Meningitis",
      "Brain Abscess"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1413",
    "patient": "Dorothy S., 41F",
    "vitals": "BP 119/78 • HR 81 • O2 100%",
    "symptoms": [
      "Sudden onset of unilateral facial paralysis involving the entire half face",
      "Inability to raise the eyebrow or wrinkle the forehead on the affected side",
      "Inability to close the eye on the affected side completely",
      "Drooling from the corner of the mouth and loss of taste on anterior tongue"
    ],
    "options": [
      "Stroke",
      "Bell's Palsy",
      "Trigeminal Neuralgia",
      "Myasthenia Gravis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1414",
    "patient": "Christine J., 18F",
    "vitals": "BP 109/80 • HR 110 • O2 97% • Temp 37.9C",
    "symptoms": [
      "Exquisite tenderness at McBurney's point and positive rebound tenderness",
      "Positive Rovsing's sign and obturator sign on examination",
      "Dull periumbilical pain migrating and localizing to the right lower quadrant",
      "Mild fever and peripheral leukocytosis with left shift"
    ],
    "options": [
      "Ectopic Pregnancy",
      "Ovarian Torsion",
      "Acute Appendicitis",
      "Kidney Stone"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1415",
    "patient": "Sharon H., 30F",
    "vitals": "BP 119/84 • HR 100 • O2 98% • Temp 38.9C",
    "symptoms": [
      "Pain triggered or worsened by ingestion of fatty meals",
      "Ultrasound showing gallstones, gallbladder wall thickening, and pericholecystic fluid",
      "Inspiration arrest on deep palpation of the right upper quadrant (Murphy's sign)",
      "Persistent nausea, vomiting, low-grade fever, and mild leukocytosis"
    ],
    "options": [
      "Acute Cholecystitis",
      "Acute Pancreatitis",
      "Peptic Ulcer Disease",
      "Hepatitis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1416",
    "patient": "Scott R., 60M",
    "vitals": "BP 115/70 • HR 109 • O2 97% • Temp 37.6C",
    "symptoms": [
      "Severe, boring epigastric abdominal pain radiating straight to the back",
      "Constant nausea and intractable vomiting without relief of pain",
      "Pain that is partially relieved by sitting up and leaning forward",
      "History of chronic alcohol abuse or gallstones"
    ],
    "options": [
      "Perforated Ulcer",
      "Acute Pancreatitis",
      "Mesenteric Ischemia",
      "Aortic Aneurysm Rupture"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1417",
    "patient": "Linda J., 72F",
    "vitals": "BP 115/75 • HR 102 • O2 96% • Temp 38.0C",
    "symptoms": [
      "Changes in bowel habits, commonly constipation or loose stools",
      "Tender palpable mass in the left lower quadrant on palpation",
      "Low-grade fever, chills, and mild abdominal bloating",
      "Constant left lower quadrant abdominal pain and tenderness"
    ],
    "options": [
      "Appendicitis",
      "Acute Diverticulitis",
      "Colon Cancer",
      "Ulcerative Colitis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1418",
    "patient": "Sandra O., 38F",
    "vitals": "BP 75/47 • HR 127 • O2 94%",
    "symptoms": [
      "Hemoperitoneum and pelvic free fluid seen on transvaginal ultrasound",
      "Positive serum beta-hCG with lack of an intrauterine gestational sac",
      "Missed menstrual cycle by 2-4 weeks with vaginal bleeding or spotting",
      "Sudden onset of severe, sharp, unilateral pelvic and lower abdominal pain"
    ],
    "options": [
      "Ovarian Torsion",
      "Ruptured Ectopic Pregnancy",
      "Pelvic Inflammatory Disease",
      "Endometriosis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1419",
    "patient": "Jose B., 43M",
    "vitals": "BP 145/95 • HR 98 • O2 99%",
    "symptoms": [
      "Gross or microscopic hematuria on urinalysis",
      "Inability to lie still, pacing or squirming in pain",
      "Exquisite costovertebral angle tenderness on the affected side",
      "CT scan of abdomen/pelvis without contrast showing obstructive calculus"
    ],
    "options": [
      "Pyelonephritis",
      "Testicular Torsion",
      "Nephrolithiasis (Kidney Stone)",
      "Appendicitis"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1420",
    "patient": "Michael R., 21M",
    "vitals": "BP 129/78 • HR 101 • O2 97%",
    "symptoms": [
      "Negative Prehn's sign (no relief of pain with scrotal elevation)",
      "Absent cremasteric reflex on the affected side upon thigh stroking",
      "Markedly decreased or absent blood flow on scrotal Doppler ultrasound",
      "High-riding, horizontally oriented testicle on the affected side"
    ],
    "options": [
      "Epididymitis",
      "Testicular Torsion",
      "Inguinal Hernia",
      "Hydrocele"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1421",
    "patient": "Virginia M., 21F",
    "vitals": "BP 107/60 • HR 124 • O2 96%",
    "symptoms": [
      "Fruity breath odor (acetone) and deep, rapid Kussmaul respirations",
      "Polydipsia, polyuria, weight loss, and signs of dry mucosal dehydration",
      "Positive urine and serum ketones with increased anion gap",
      "Serum blood glucose level of 450 mg/dL and metabolic acidosis"
    ],
    "options": [
      "Diabetic Ketoacidosis (DKA)",
      "Hyperosmolar Hyperglycemic State",
      "Sepsis",
      "Salicylate Toxicity"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1422",
    "patient": "Gregory C., 81M",
    "vitals": "BP 85/50 • HR 124 • O2 93% • Temp 39.3C",
    "symptoms": [
      "Elevated blood lactate levels and severe peripheral leukocytosis",
      "Active focus of infection, such as pyelonephritis or severe pneumonia",
      "Warm, flushed skin (early phase) or cool, clammy mottled extremities (late)",
      "Altered mental status, confusion, and worsening lethargy"
    ],
    "options": [
      "Cardiogenic Shock",
      "Septic Shock",
      "Hypovolemic Shock",
      "Neurogenic Shock"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1423",
    "patient": "Rebecca S., 28F",
    "vitals": "BP 141/72 • HR 123 • O2 97%",
    "symptoms": [
      "Proptosis, lid lag, exophthalmos, and pretibial myxedema",
      "Diffuse non-tender thyroid enlargement (goiter) with thyroid bruit",
      "Heat intolerance, fine hand tremors, palpitations, and anxiety",
      "Weight loss despite increased appetite and frequent bowel movements"
    ],
    "options": [
      "Hypothyroidism",
      "Pheochromocytoma",
      "Hyperthyroidism (Graves' Disease)",
      "Cushing's Syndrome"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1424",
    "patient": "Gregory T., 62M",
    "vitals": "BP 73/64 • HR 137 • O2 89%",
    "symptoms": [
      "Echocardiogram showing diastolic collapse of the right ventricle",
      "Pulsus paradoxus (drop in systolic blood pressure >10 mmHg on inspiration)",
      "Muffled, distant heart sounds on auscultation (Beck's triad)",
      "Distended jugular veins (JVD) with prominent x-descent and absent y-descent"
    ],
    "options": [
      "Tension Pneumothorax",
      "Cardiac Tamponade",
      "Massive Hemothorax",
      "Flail Chest"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1425",
    "patient": "Laura B., 20F",
    "vitals": "BP 82/45 • HR 123 • O2 81%",
    "symptoms": [
      "Severe progressive respiratory distress and hypotension after chest wall injury",
      "Hyperresonance to percussion and absent breath sounds on the affected side",
      "Tracheal deviation to the contralateral side away from the injury",
      "Immediate clinical improvement upon needle decompression in 2nd intercostal space"
    ],
    "options": [
      "Cardiac Tamponade",
      "Tension Pneumothorax",
      "Pulmonary Contusion",
      "Aortic Rupture"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1426",
    "patient": "Amy Z., 67F",
    "vitals": "BP 138/74 • HR 86 • O2 98%",
    "symptoms": [
      "Severe wrist pain and swelling after falling on an outstretched hand (FOOSH)",
      "Radiograph showing extra-articular transverse distal radius fracture",
      "Classic dorsal displacement and angulation of the distal radius (dinner fork deformity)",
      "Localized tenderness over the distal radial metaphysis"
    ],
    "options": [
      "Smith's Fracture",
      "Colles' Fracture",
      "Scaphoid Fracture",
      "Galeazzi Fracture"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1427",
    "patient": "Helen B., 55F",
    "vitals": "BP 103/51 • HR 46 • O2 83% • Temp 36.1C",
    "symptoms": [
      "Patient found completely unresponsive, cyanotic, and hypoventilating",
      "Multiple skin track marks over forearm veins",
      "Symmetric pinpoint pupils (miosis) bilaterally",
      "Severe respiratory depression with respiratory rate less than 8 breaths/minute"
    ],
    "options": [
      "Cocaine Overdose",
      "Benzodiazepine Overdose",
      "Opioid Overdose",
      "Alcohol Poisoning"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1428",
    "patient": "Deborah K., 22F",
    "vitals": "BP 125/77 • HR 120 • O2 97% • Temp 38.9C",
    "symptoms": [
      "Intense bilateral tinnitus (ringing in the ears) and hearing loss",
      "Marked hyperventilation, nausea, vomiting, and epigastric distress",
      "Mixed respiratory alkalosis and high anion gap metabolic acidosis",
      "Agitation, confusion, diaphoresis, and progressive lethargy"
    ],
    "options": [
      "Acetaminophen Toxicity",
      "Aspirin (Salicylate) Toxicity",
      "Iron Toxicity",
      "Lead Poisoning"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1429",
    "patient": "Jennifer A., 61F",
    "vitals": "BP 103/52 • HR 42 • O2 85%",
    "symptoms": [
      "Profuse generalized sweating, salivation, lacrimation, and rhinorrhea",
      "Pinpoint pupils (miosis) and muscle fasciculations/weakness",
      "Incontinence of urine and feces with severe abdominal cramping",
      "Diffuse wheezing, bradycardia, and bronchial hypersecretion"
    ],
    "options": [
      "Organophosphate Poisoning",
      "Anticholinergic Toxicity",
      "Opioid Toxicity",
      "Carbon Monoxide Poisoning"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1430",
    "patient": "Steven R., 24M",
    "vitals": "BP 110/77 • HR 59 • O2 94% • Temp 40.3C",
    "symptoms": [
      "Abdominal pain, splenomegaly, and constipation followed by watery diarrhea",
      "Gradual onset of step-ladder pattern fever and severe frontal headache",
      "Recent travel to an endemic country with poor sanitation",
      "Faint, rose-colored macules (rose spots) on the abdomen and chest"
    ],
    "options": [
      "Typhoid Fever",
      "Malaria",
      "Dengue Fever",
      "Leptospirosis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1431",
    "patient": "Sandra A., 44F",
    "vitals": "BP 102/64 • HR 104 • O2 96% • Temp 39.8C",
    "symptoms": [
      "Sudden onset of high-grade fever, chills, and severe retro-orbital pain",
      "Exquisite joint, muscle, and bone pain described as 'breakbone'",
      "Generalized maculopapular rash blanching on pressure",
      "Laboratory evidence of marked leukopenia and thrombocytopenia"
    ],
    "options": [
      "Zika Virus",
      "Dengue Fever",
      "Chikungunya",
      "Yellow Fever"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1432",
    "patient": "Kimberly O., 47F",
    "vitals": "BP 108/68 • HR 110 • O2 96% • Temp 39.5C",
    "symptoms": [
      "Thick and thin blood smears showing trophozoites and Schüffner's dots",
      "Profuse sweating as the fever breaks, followed by extreme fatigue",
      "Paroxysmal cyclical high fevers and shaking chills occurring every 48 hours",
      "Recent travel to a tropical region without taking chemoprophylaxis"
    ],
    "options": [
      "Malaria (P. falciparum)",
      "Malaria (P. vivax)",
      "Babesiosis",
      "Visceral Leishmaniasis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1433",
    "patient": "Patricia D., 33F",
    "vitals": "BP 134/73 • HR 70 • O2 98%",
    "symptoms": [
      "Erythematous malar rash over the cheeks and bridge of nose, sparing nasolabial folds",
      "Urinalysis showing proteinuria and red blood cell casts",
      "Photosensitivity rash and multiple painful joints (polyarthritis)",
      "High titer positive antinuclear antibodies (ANA) and anti-dsDNA antibodies"
    ],
    "options": [
      "Systemic Lupus Erythematosus",
      "Rosacea",
      "Dermatomyositis",
      "Rheumatoid Arthritis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1434",
    "patient": "Mark I., 51M",
    "vitals": "BP 130/83 • HR 89 • O2 99% • Temp 38.1C",
    "symptoms": [
      "Joint is erythematous, hot, swollen, and exquisitely sensitive to light touch",
      "Joint aspirate showing needle-shaped, negatively birefringent crystals",
      "Sudden onset of excruciating pain and swelling in the first metatarsophalangeal joint",
      "Symptoms peaked rapidly within 12 to 24 hours of onset"
    ],
    "options": [
      "Pseudogout",
      "Septic Arthritis",
      "Acute Gouty Arthritis",
      "Osteoarthritis Exacerbation"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1435",
    "patient": "Shirley O., 21F",
    "vitals": "BP 82/55 • HR 132 • O2 88%",
    "symptoms": [
      "Profound hypotension and dizziness shortly after eating peanut butter or seafood",
      "Inspiratory stridor, wheezing, dyspnea, and feeling of throat tightness",
      "Acute onset of diffuse pruritic hives, urticaria, and lip/tongue swelling",
      "Nausea, vomiting, and diffuse abdominal cramps"
    ],
    "options": [
      "Asthma Attack",
      "Panic Attack",
      "Vasovagal Syncope",
      "Anaphylaxis"
    ],
    "answer": 3
  },
  {
    "id": "CASE-1436",
    "patient": "Tyler J., 34M",
    "vitals": "BP 126/83 • HR 95 • O2 98%",
    "symptoms": [
      "Unilateral lower extremity calf pain, swelling, and warmth",
      "Calf circumference measurement is 4 cm larger on the symptomatic side",
      "Compression ultrasound showing non-compressible popliteal or femoral vein",
      "Pain in the calf elicited by passive dorsiflexion of the foot (Homan's sign)"
    ],
    "options": [
      "Cellulitis",
      "Baker's Cyst Rupture",
      "Deep Vein Thrombosis (DVT)",
      "Superficial Thrombophlebitis"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1437",
    "patient": "Christopher A., 73M",
    "vitals": "BP 129/81 • HR 109 • O2 89% • Temp 37.6C",
    "symptoms": [
      "Marked increase in sputum volume and sputum purulence",
      "ABG showing chronic respiratory acidosis with compensatory bicarb retention",
      "Worsening baseline shortness of breath and chronic cough",
      "Classic barrel chest, accessory muscle use, and history of heavy smoking"
    ],
    "options": [
      "Asthma Exacerbation",
      "Congestive Heart Failure",
      "COPD Exacerbation",
      "Pulmonary Embolism"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1438",
    "patient": "Joshua J., 37M",
    "vitals": "BP 123/85 • HR 98 • O2 98% • Temp 38.4C",
    "symptoms": [
      "Failure to improve with elevation alone; requires systemic antibiotics",
      "Localized skin tenderness and pain over the lower leg",
      "Small portal of entry, such as tinea pedis or a minor abrasion",
      "Spreading, poorly demarcated area of skin erythema, warmth, and swelling"
    ],
    "options": [
      "Deep Vein Thrombosis",
      "Cellulitis",
      "Erysipelas",
      "Necrotizing Fasciitis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1439",
    "patient": "Maria P., 57F",
    "vitals": "BP 118/83 • HR 103 • O2 99%",
    "symptoms": [
      "Elevated carboxyhemoglobin levels on arterial blood gas analysis",
      "Falsely normal 100% pulse oximetry readings on room air",
      "Dull, throbbing, generalized headache, dizziness, and nausea",
      "Multiple family members or roommates presenting with identical symptoms"
    ],
    "options": [
      "Influenza",
      "Food Poisoning",
      "Migraine",
      "Carbon Monoxide Poisoning"
    ],
    "answer": 3
  },
  {
    "id": "CASE-1440",
    "patient": "Brian W., 52M",
    "vitals": "BP 116/72 • HR 112 • O2 99%",
    "symptoms": [
      "Rapid correction of symptoms and recovery of consciousness after D50 IV push",
      "History of type 1 diabetes mellitus and missed a meal after taking insulin",
      "Severe confusion, irritability, slurred speech, and combative behavior",
      "Fingerstick blood glucose reading of 42 mg/dL"
    ],
    "options": [
      "Ischemic Stroke",
      "Opioid Overdose",
      "Diabetic Ketoacidosis",
      "Hypoglycemia"
    ],
    "answer": 3
  },
  {
    "id": "CASE-1441",
    "patient": "Sandra W., 85F",
    "vitals": "BP 115/56 • HR 90 • O2 92%",
    "symptoms": [
      "Significantly elevated serum cardiac troponin levels",
      "Profuse diaphoresis, nausea, and shortness of breath",
      "Crushing retrosternal chest pain radiating to the left arm or jaw",
      "ECG showing ST-segment elevations in anterior leads V1-V4"
    ],
    "options": [
      "Myocardial Infarction",
      "Gastroesophageal Reflux",
      "Costochondritis",
      "Acute Pericarditis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1442",
    "patient": "Daniel R., 76M",
    "vitals": "BP 176/119 • HR 118 • O2 97%",
    "symptoms": [
      "Sudden onset, tearing substernal chest pain radiating to the back",
      "History of poorly controlled chronic hypertension",
      "Asymmetric blood pressure readings in upper extremities",
      "Widened mediastinum on chest radiograph"
    ],
    "options": [
      "Myocardial Infarction",
      "Aortic Dissection",
      "Pulmonary Embolism",
      "Tension Pneumothorax"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1443",
    "patient": "Donna L., 42F",
    "vitals": "BP 119/78 • HR 194 • O2 97%",
    "symptoms": [
      "Rapid resolution of tachycardia upon carotid sinus massage",
      "ECG showing regular, narrow-complex tachycardia without visible P waves",
      "Mild lightheadedness and feeling of chest pressure",
      "Sudden onset of heart racing and severe palpitations"
    ],
    "options": [
      "Atrial Fibrillation",
      "Supraventricular Tachycardia (SVT)",
      "Ventricular Tachycardia",
      "Sinus Tachycardia"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1444",
    "patient": "Jonathan P., 65M",
    "vitals": "BP 142/99 • HR 86 • O2 90%",
    "symptoms": [
      "S3 gallop on heart auscultation and bibasilar rales",
      "Increased cardiomegaly and cephalization on chest X-ray",
      "Paroxysmal nocturnal dyspnea causing patient to wake up gasping",
      "Progressive exertional dyspnea and orthopnea"
    ],
    "options": [
      "Congestive Heart Failure",
      "COPD Exacerbation",
      "Pulmonary Fibrosis",
      "Cor Pulmonale"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1445",
    "patient": "Frank T., 27M",
    "vitals": "BP 103/79 • HR 91 • O2 96% • Temp 38.3C",
    "symptoms": [
      "Sharp retrosternal chest pain that worsens on inspiration and lying flat",
      "ECG showing diffuse ST-segment elevation with PR-segment depression",
      "Recent history of a self-limiting viral upper respiratory tract infection",
      "Pericardial friction rub heard best at the left lower sternal border"
    ],
    "options": [
      "Myocardial Infarction",
      "Pulmonary Embolism",
      "Acute Pericarditis",
      "Gastroesophageal Reflux"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1446",
    "patient": "William W., 35M",
    "vitals": "BP 95/59 • HR 105 • O2 84%",
    "symptoms": [
      "Sudden onset of severe shortness of breath and pleuritic chest pain",
      "Recent prolonged immobilization due to a transatlantic flight or surgery",
      "Unilateral calf swelling, erythema, and deep venous tenderness",
      "Sinus tachycardia and S1Q3T3 pattern on electrocardiogram"
    ],
    "options": [
      "Pneumonia",
      "Asthma Exacerbation",
      "Pulmonary Embolism",
      "Pneumothorax"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1447",
    "patient": "Robert Y., 34M",
    "vitals": "BP 126/83 • HR 120 • O2 93%",
    "symptoms": [
      "Sudden onset of sharp, unilateral pleuritic chest pain and dyspnea",
      "Asthenic tall, thin male body habitus",
      "Markedly decreased breath sounds and tactile fremitus on the affected side",
      "Hyperresonance to percussion over the ipsilateral chest wall"
    ],
    "options": [
      "Spontaneous Pneumothorax",
      "Asthma Attack",
      "Pulmonary Embolism",
      "Cardiac Tamponade"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1448",
    "patient": "Nancy O., 26F",
    "vitals": "BP 130/79 • HR 110 • O2 91% • Temp 39.1C",
    "symptoms": [
      "Dullness to percussion and increased tactile fremitus at the lung base",
      "Bronchial breath sounds and late inspiratory crackles on auscultation",
      "High fever, shaking chills, and pleuritic chest discomfort",
      "Chest X-ray showing lobar consolidation with air bronchograms"
    ],
    "options": [
      "Lobar Pneumonia",
      "Tuberculosis",
      "Lung Cancer",
      "Pulmonary Edema"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1449",
    "patient": "Emma S., 37F",
    "vitals": "BP 104/76 • HR 128 • O2 94%",
    "symptoms": [
      "Widespread expiratory wheezing, chest tightness, and dry cough",
      "Use of accessory respiratory muscles and intercostal retractions",
      "Triggered by recent exposure to cold air, pollen, or an upper respiratory infection",
      "Prolonged expiratory phase and reduced peak expiratory flow rate"
    ],
    "options": [
      "Foreign Body Aspiration",
      "Asthma Exacerbation",
      "Croup",
      "Epiglottitis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1450",
    "patient": "Nancy M., 85F",
    "vitals": "BP 199/90 • HR 86 • O2 97%",
    "symptoms": [
      "Sudden onset of contralateral face, arm, and leg weakness",
      "Expressive or receptive motor aphasia and slurred speech",
      "Gaze deviation toward the side of the cortical lesion",
      "Contralateral hemisensory loss and marked pronator drift"
    ],
    "options": [
      "Ischemic Stroke (MCA)",
      "Hemorrhagic Stroke",
      "Bell's Palsy",
      "Complex Partial Seizure"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1451",
    "patient": "Jason E., 49M",
    "vitals": "BP 193/111 • HR 100 • O2 97%",
    "symptoms": [
      "Rupture of an anterior communicating artery berry aneurysm",
      "Marked photophobia, nausea, vomiting, and meningismus",
      "Sudden onset of excruciating headache, described as the 'worst of life'",
      "Transient loss of consciousness followed by severe neck stiffness"
    ],
    "options": [
      "Migraine",
      "Subarachnoid Hemorrhage",
      "Meningitis",
      "Tension Headache"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1452",
    "patient": "Melissa Y., 30F",
    "vitals": "BP 117/68 • HR 119 • O2 93% • Temp 38.9C",
    "symptoms": [
      "Severe generalized headache, high fever, and shaking chills",
      "Altered mental status ranging from confusion to stupor",
      "Marked nuchal rigidity and neck stiffness on passive flexion",
      "CSF analysis showing elevated neutrophils, low glucose, and high protein"
    ],
    "options": [
      "Viral Encephalitis",
      "Subarachnoid Hemorrhage",
      "Bacterial Meningitis",
      "Brain Abscess"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1453",
    "patient": "Patricia W., 44F",
    "vitals": "BP 117/84 • HR 79 • O2 100%",
    "symptoms": [
      "Inability to raise the eyebrow or wrinkle the forehead on the affected side",
      "Drooling from the corner of the mouth and loss of taste on anterior tongue",
      "Sudden onset of unilateral facial paralysis involving the entire half face",
      "Inability to close the eye on the affected side completely"
    ],
    "options": [
      "Stroke",
      "Bell's Palsy",
      "Trigeminal Neuralgia",
      "Myasthenia Gravis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1454",
    "patient": "Joshua W., 33M",
    "vitals": "BP 116/68 • HR 86 • O2 98% • Temp 37.7C",
    "symptoms": [
      "Dull periumbilical pain migrating and localizing to the right lower quadrant",
      "Nausea, vomiting, anorexia, and localized abdominal guarding",
      "Positive Rovsing's sign and obturator sign on examination",
      "Mild fever and peripheral leukocytosis with left shift"
    ],
    "options": [
      "Ectopic Pregnancy",
      "Ovarian Torsion",
      "Acute Appendicitis",
      "Kidney Stone"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1455",
    "patient": "Brian T., 47M",
    "vitals": "BP 116/75 • HR 103 • O2 98% • Temp 38.7C",
    "symptoms": [
      "Pain triggered or worsened by ingestion of fatty meals",
      "Severe right upper quadrant pain radiating to the right scapula",
      "Ultrasound showing gallstones, gallbladder wall thickening, and pericholecystic fluid",
      "Persistent nausea, vomiting, low-grade fever, and mild leukocytosis"
    ],
    "options": [
      "Acute Cholecystitis",
      "Acute Pancreatitis",
      "Peptic Ulcer Disease",
      "Hepatitis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1456",
    "patient": "Kimberly J., 60F",
    "vitals": "BP 110/80 • HR 118 • O2 97%",
    "symptoms": [
      "Severe, boring epigastric abdominal pain radiating straight to the back",
      "Marked elevations in serum amylase and lipase levels (>3x normal)",
      "Constant nausea and intractable vomiting without relief of pain",
      "Pain that is partially relieved by sitting up and leaning forward"
    ],
    "options": [
      "Perforated Ulcer",
      "Acute Pancreatitis",
      "Mesenteric Ischemia",
      "Aortic Aneurysm Rupture"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1457",
    "patient": "David H., 53M",
    "vitals": "BP 134/70 • HR 96 • O2 98% • Temp 38.1C",
    "symptoms": [
      "CT scan of abdomen showing colonic wall thickening and fat stranding",
      "Constant left lower quadrant abdominal pain and tenderness",
      "Low-grade fever, chills, and mild abdominal bloating",
      "Tender palpable mass in the left lower quadrant on palpation"
    ],
    "options": [
      "Appendicitis",
      "Acute Diverticulitis",
      "Colon Cancer",
      "Ulcerative Colitis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1458",
    "patient": "Deborah H., 24F",
    "vitals": "BP 90/56 • HR 116 • O2 98%",
    "symptoms": [
      "Dizziness, lightheadedness, and referred left shoulder pain",
      "Positive serum beta-hCG with lack of an intrauterine gestational sac",
      "Hemoperitoneum and pelvic free fluid seen on transvaginal ultrasound",
      "Sudden onset of severe, sharp, unilateral pelvic and lower abdominal pain"
    ],
    "options": [
      "Ovarian Torsion",
      "Ruptured Ectopic Pregnancy",
      "Pelvic Inflammatory Disease",
      "Endometriosis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1459",
    "patient": "Sarah B., 27F",
    "vitals": "BP 153/92 • HR 97 • O2 99%",
    "symptoms": [
      "Sudden onset of severe, colicky flank pain radiating to the groin",
      "Exquisite costovertebral angle tenderness on the affected side",
      "Inability to lie still, pacing or squirming in pain",
      "Gross or microscopic hematuria on urinalysis"
    ],
    "options": [
      "Pyelonephritis",
      "Testicular Torsion",
      "Nephrolithiasis (Kidney Stone)",
      "Appendicitis"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1460",
    "patient": "Benjamin R., 22M",
    "vitals": "BP 128/78 • HR 119 • O2 99%",
    "symptoms": [
      "High-riding, horizontally oriented testicle on the affected side",
      "Sudden onset of severe, constant unilateral scrotal and inguinal pain",
      "Markedly decreased or absent blood flow on scrotal Doppler ultrasound",
      "Absent cremasteric reflex on the affected side upon thigh stroking"
    ],
    "options": [
      "Epididymitis",
      "Testicular Torsion",
      "Inguinal Hernia",
      "Hydrocele"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1461",
    "patient": "Kathleen Y., 22F",
    "vitals": "BP 110/66 • HR 127 • O2 96%",
    "symptoms": [
      "Polydipsia, polyuria, weight loss, and signs of dry mucosal dehydration",
      "Serum blood glucose level of 450 mg/dL and metabolic acidosis",
      "Fruity breath odor (acetone) and deep, rapid Kussmaul respirations",
      "Progressive nausea, vomiting, diffuse abdominal pain, and fatigue"
    ],
    "options": [
      "Diabetic Ketoacidosis (DKA)",
      "Hyperosmolar Hyperglycemic State",
      "Sepsis",
      "Salicylate Toxicity"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1462",
    "patient": "Brian R., 78M",
    "vitals": "BP 87/60 • HR 134 • O2 88% • Temp 39.8C",
    "symptoms": [
      "Altered mental status, confusion, and worsening lethargy",
      "Elevated blood lactate levels and severe peripheral leukocytosis",
      "Active focus of infection, such as pyelonephritis or severe pneumonia",
      "Warm, flushed skin (early phase) or cool, clammy mottled extremities (late)"
    ],
    "options": [
      "Cardiogenic Shock",
      "Septic Shock",
      "Hypovolemic Shock",
      "Neurogenic Shock"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1463",
    "patient": "Jose J., 37M",
    "vitals": "BP 136/67 • HR 113 • O2 99%",
    "symptoms": [
      "Heat intolerance, fine hand tremors, palpitations, and anxiety",
      "Proptosis, lid lag, exophthalmos, and pretibial myxedema",
      "Weight loss despite increased appetite and frequent bowel movements",
      "Undetectable serum TSH with elevated free T3 and T4 levels"
    ],
    "options": [
      "Hypothyroidism",
      "Pheochromocytoma",
      "Hyperthyroidism (Graves' Disease)",
      "Cushing's Syndrome"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1464",
    "patient": "Amy D., 35F",
    "vitals": "BP 76/62 • HR 133 • O2 88%",
    "symptoms": [
      "Muffled, distant heart sounds on auscultation (Beck's triad)",
      "Distended jugular veins (JVD) with prominent x-descent and absent y-descent",
      "Pulsus paradoxus (drop in systolic blood pressure >10 mmHg on inspiration)",
      "Echocardiogram showing diastolic collapse of the right ventricle"
    ],
    "options": [
      "Tension Pneumothorax",
      "Cardiac Tamponade",
      "Massive Hemothorax",
      "Flail Chest"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1465",
    "patient": "Margaret D., 46F",
    "vitals": "BP 78/47 • HR 134 • O2 87%",
    "symptoms": [
      "Severe progressive respiratory distress and hypotension after chest wall injury",
      "Tracheal deviation to the contralateral side away from the injury",
      "Hyperresonance to percussion and absent breath sounds on the affected side",
      "Distended neck veins and ipsilateral chest wall hyperexpansion"
    ],
    "options": [
      "Cardiac Tamponade",
      "Tension Pneumothorax",
      "Pulmonary Contusion",
      "Aortic Rupture"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1466",
    "patient": "Virginia N., 75F",
    "vitals": "BP 133/86 • HR 75 • O2 99%",
    "symptoms": [
      "Localized tenderness over the distal radial metaphysis",
      "Pain exacerbated by active or passive wrist movements",
      "Radiograph showing extra-articular transverse distal radius fracture",
      "Classic dorsal displacement and angulation of the distal radius (dinner fork deformity)"
    ],
    "options": [
      "Smith's Fracture",
      "Colles' Fracture",
      "Scaphoid Fracture",
      "Galeazzi Fracture"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1467",
    "patient": "Samantha H., 54F",
    "vitals": "BP 93/62 • HR 57 • O2 82% • Temp 35.8C",
    "symptoms": [
      "Patient found completely unresponsive, cyanotic, and hypoventilating",
      "Symmetric pinpoint pupils (miosis) bilaterally",
      "Severe respiratory depression with respiratory rate less than 8 breaths/minute",
      "Multiple skin track marks over forearm veins"
    ],
    "options": [
      "Cocaine Overdose",
      "Benzodiazepine Overdose",
      "Opioid Overdose",
      "Alcohol Poisoning"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1468",
    "patient": "Edward L., 22M",
    "vitals": "BP 123/64 • HR 123 • O2 97% • Temp 38.8C",
    "symptoms": [
      "Mixed respiratory alkalosis and high anion gap metabolic acidosis",
      "Intense bilateral tinnitus (ringing in the ears) and hearing loss",
      "Toxic serum salicylate levels following ingestion of an unknown medication",
      "Agitation, confusion, diaphoresis, and progressive lethargy"
    ],
    "options": [
      "Acetaminophen Toxicity",
      "Aspirin (Salicylate) Toxicity",
      "Iron Toxicity",
      "Lead Poisoning"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1469",
    "patient": "Rebecca T., 25F",
    "vitals": "BP 81/71 • HR 43 • O2 92%",
    "symptoms": [
      "Incontinence of urine and feces with severe abdominal cramping",
      "Recent exposure to agricultural pesticides or crop dusting",
      "Diffuse wheezing, bradycardia, and bronchial hypersecretion",
      "Pinpoint pupils (miosis) and muscle fasciculations/weakness"
    ],
    "options": [
      "Organophosphate Poisoning",
      "Anticholinergic Toxicity",
      "Opioid Toxicity",
      "Carbon Monoxide Poisoning"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1470",
    "patient": "Rachel F., 34F",
    "vitals": "BP 99/70 • HR 65 • O2 95% • Temp 39.1C",
    "symptoms": [
      "Gradual onset of step-ladder pattern fever and severe frontal headache",
      "Faint, rose-colored macules (rose spots) on the abdomen and chest",
      "Abdominal pain, splenomegaly, and constipation followed by watery diarrhea",
      "Relative bradycardia (pulse-temperature dissociation)"
    ],
    "options": [
      "Typhoid Fever",
      "Malaria",
      "Dengue Fever",
      "Leptospirosis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1471",
    "patient": "David B., 31M",
    "vitals": "BP 105/77 • HR 107 • O2 97% • Temp 39.1C",
    "symptoms": [
      "Laboratory evidence of marked leukopenia and thrombocytopenia",
      "Exquisite joint, muscle, and bone pain described as 'breakbone'",
      "Sudden onset of high-grade fever, chills, and severe retro-orbital pain",
      "Positive tourniquet test showing petechiae formation"
    ],
    "options": [
      "Zika Virus",
      "Dengue Fever",
      "Chikungunya",
      "Yellow Fever"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1472",
    "patient": "Jennifer J., 28F",
    "vitals": "BP 101/73 • HR 107 • O2 94% • Temp 39.7C",
    "symptoms": [
      "Thick and thin blood smears showing trophozoites and Schüffner's dots",
      "Scleral icterus, splenomegaly, anemia, and mild thrombocytopenia",
      "Profuse sweating as the fever breaks, followed by extreme fatigue",
      "Recent travel to a tropical region without taking chemoprophylaxis"
    ],
    "options": [
      "Malaria (P. falciparum)",
      "Malaria (P. vivax)",
      "Babesiosis",
      "Visceral Leishmaniasis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1473",
    "patient": "Nicole T., 44F",
    "vitals": "BP 128/81 • HR 84 • O2 97%",
    "symptoms": [
      "Painless oral ulcers, fatigue, and recurrent low-grade fevers",
      "Erythematous malar rash over the cheeks and bridge of nose, sparing nasolabial folds",
      "Urinalysis showing proteinuria and red blood cell casts",
      "High titer positive antinuclear antibodies (ANA) and anti-dsDNA antibodies"
    ],
    "options": [
      "Systemic Lupus Erythematosus",
      "Rosacea",
      "Dermatomyositis",
      "Rheumatoid Arthritis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1474",
    "patient": "Paul L., 68M",
    "vitals": "BP 130/87 • HR 83 • O2 97% • Temp 38.2C",
    "symptoms": [
      "Sudden onset of excruciating pain and swelling in the first metatarsophalangeal joint",
      "Joint is erythematous, hot, swollen, and exquisitely sensitive to light touch",
      "Symptoms peaked rapidly within 12 to 24 hours of onset",
      "Joint aspirate showing needle-shaped, negatively birefringent crystals"
    ],
    "options": [
      "Pseudogout",
      "Septic Arthritis",
      "Acute Gouty Arthritis",
      "Osteoarthritis Exacerbation"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1475",
    "patient": "Thomas H., 39M",
    "vitals": "BP 88/57 • HR 115 • O2 84%",
    "symptoms": [
      "Nausea, vomiting, and diffuse abdominal cramps",
      "Acute onset of diffuse pruritic hives, urticaria, and lip/tongue swelling",
      "Inspiratory stridor, wheezing, dyspnea, and feeling of throat tightness",
      "Rapid resolution of symptoms following intramuscular epinephrine injection"
    ],
    "options": [
      "Asthma Attack",
      "Panic Attack",
      "Vasovagal Syncope",
      "Anaphylaxis"
    ],
    "answer": 3
  },
  {
    "id": "CASE-1476",
    "patient": "Robert F., 40M",
    "vitals": "BP 133/84 • HR 88 • O2 98%",
    "symptoms": [
      "Unilateral lower extremity calf pain, swelling, and warmth",
      "Calf circumference measurement is 4 cm larger on the symptomatic side",
      "Compression ultrasound showing non-compressible popliteal or femoral vein",
      "History of prolonged bed rest, malignancy, or oral contraceptive use"
    ],
    "options": [
      "Cellulitis",
      "Baker's Cyst Rupture",
      "Deep Vein Thrombosis (DVT)",
      "Superficial Thrombophlebitis"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1477",
    "patient": "Kathleen O., 83F",
    "vitals": "BP 137/80 • HR 99 • O2 87% • Temp 37.7C",
    "symptoms": [
      "Classic barrel chest, accessory muscle use, and history of heavy smoking",
      "Diffuse wheezing and distant breath sounds on lung auscultation",
      "Marked increase in sputum volume and sputum purulence",
      "Worsening baseline shortness of breath and chronic cough"
    ],
    "options": [
      "Asthma Exacerbation",
      "Congestive Heart Failure",
      "COPD Exacerbation",
      "Pulmonary Embolism"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1478",
    "patient": "Aaron R., 45M",
    "vitals": "BP 116/70 • HR 95 • O2 96% • Temp 38.1C",
    "symptoms": [
      "Spreading, poorly demarcated area of skin erythema, warmth, and swelling",
      "Localized skin tenderness and pain over the lower leg",
      "Associated low-grade fever, chills, and mild inguinal lymphadenopathy",
      "Failure to improve with elevation alone; requires systemic antibiotics"
    ],
    "options": [
      "Deep Vein Thrombosis",
      "Cellulitis",
      "Erysipelas",
      "Necrotizing Fasciitis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1479",
    "patient": "Ryan F., 54M",
    "vitals": "BP 117/73 • HR 94 • O2 98%",
    "symptoms": [
      "Dull, throbbing, generalized headache, dizziness, and nausea",
      "Multiple family members or roommates presenting with identical symptoms",
      "Confusion, fatigue, and irritability without fever or neck stiffness",
      "Falsely normal 100% pulse oximetry readings on room air"
    ],
    "options": [
      "Influenza",
      "Food Poisoning",
      "Migraine",
      "Carbon Monoxide Poisoning"
    ],
    "answer": 3
  },
  {
    "id": "CASE-1480",
    "patient": "Patrick F., 71M",
    "vitals": "BP 129/78 • HR 111 • O2 97% • Temp 36.0C",
    "symptoms": [
      "Sudden onset of profuse diaphoresis, hand tremors, and palpitations",
      "Severe confusion, irritability, slurred speech, and combative behavior",
      "History of type 1 diabetes mellitus and missed a meal after taking insulin",
      "Rapid correction of symptoms and recovery of consciousness after D50 IV push"
    ],
    "options": [
      "Ischemic Stroke",
      "Opioid Overdose",
      "Diabetic Ketoacidosis",
      "Hypoglycemia"
    ],
    "answer": 3
  },
  {
    "id": "CASE-1481",
    "patient": "Andrew Z., 68M",
    "vitals": "BP 143/88 • HR 105 • O2 95%",
    "symptoms": [
      "Profuse diaphoresis, nausea, and shortness of breath",
      "ECG showing ST-segment elevations in anterior leads V1-V4",
      "Significantly elevated serum cardiac troponin levels",
      "History of coronary artery disease, hyperlipidemia, and heavy smoking"
    ],
    "options": [
      "Myocardial Infarction",
      "Gastroesophageal Reflux",
      "Costochondritis",
      "Acute Pericarditis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1482",
    "patient": "Kevin N., 84M",
    "vitals": "BP 170/109 • HR 115 • O2 92%",
    "symptoms": [
      "Sudden onset, tearing substernal chest pain radiating to the back",
      "History of poorly controlled chronic hypertension",
      "Aortic regurgitation murmur heard along the right sternal border",
      "Asymmetric blood pressure readings in upper extremities"
    ],
    "options": [
      "Myocardial Infarction",
      "Aortic Dissection",
      "Pulmonary Embolism",
      "Tension Pneumothorax"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1483",
    "patient": "Daniel Z., 54M",
    "vitals": "BP 110/68 • HR 197 • O2 98%",
    "symptoms": [
      "Sudden onset of heart racing and severe palpitations",
      "Mild lightheadedness and feeling of chest pressure",
      "ECG showing regular, narrow-complex tachycardia without visible P waves",
      "Rapid resolution of tachycardia upon carotid sinus massage"
    ],
    "options": [
      "Atrial Fibrillation",
      "Supraventricular Tachycardia (SVT)",
      "Ventricular Tachycardia",
      "Sinus Tachycardia"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1484",
    "patient": "Lisa I., 62F",
    "vitals": "BP 144/98 • HR 103 • O2 91%",
    "symptoms": [
      "S3 gallop on heart auscultation and bibasilar rales",
      "Progressive exertional dyspnea and orthopnea",
      "Paroxysmal nocturnal dyspnea causing patient to wake up gasping",
      "Bilateral pitting lower extremity edema and jugular venous distension"
    ],
    "options": [
      "Congestive Heart Failure",
      "COPD Exacerbation",
      "Pulmonary Fibrosis",
      "Cor Pulmonale"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1485",
    "patient": "Edward S., 42M",
    "vitals": "BP 109/60 • HR 96 • O2 97% • Temp 38.0C",
    "symptoms": [
      "Recent history of a self-limiting viral upper respiratory tract infection",
      "Pericardial friction rub heard best at the left lower sternal border",
      "ECG showing diffuse ST-segment elevation with PR-segment depression",
      "Chest pain that is relieved by sitting up and leaning forward"
    ],
    "options": [
      "Myocardial Infarction",
      "Pulmonary Embolism",
      "Acute Pericarditis",
      "Gastroesophageal Reflux"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1486",
    "patient": "Karen S., 39F",
    "vitals": "BP 94/59 • HR 113 • O2 89%",
    "symptoms": [
      "Sinus tachycardia and S1Q3T3 pattern on electrocardiogram",
      "Recent prolonged immobilization due to a transatlantic flight or surgery",
      "Unilateral calf swelling, erythema, and deep venous tenderness",
      "Sudden onset of severe shortness of breath and pleuritic chest pain"
    ],
    "options": [
      "Pneumonia",
      "Asthma Exacerbation",
      "Pulmonary Embolism",
      "Pneumothorax"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1487",
    "patient": "Anthony N., 27M",
    "vitals": "BP 125/81 • HR 117 • O2 93%",
    "symptoms": [
      "Asthenic tall, thin male body habitus",
      "Sudden onset of sharp, unilateral pleuritic chest pain and dyspnea",
      "Markedly decreased breath sounds and tactile fremitus on the affected side",
      "Chest radiograph showing a visible pleural line and absence of lung markings"
    ],
    "options": [
      "Spontaneous Pneumothorax",
      "Asthma Attack",
      "Pulmonary Embolism",
      "Cardiac Tamponade"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1488",
    "patient": "Gary H., 42M",
    "vitals": "BP 133/68 • HR 108 • O2 91% • Temp 38.9C",
    "symptoms": [
      "Productive cough with thick rust-colored or purulent sputum",
      "Chest X-ray showing lobar consolidation with air bronchograms",
      "High fever, shaking chills, and pleuritic chest discomfort",
      "Dullness to percussion and increased tactile fremitus at the lung base"
    ],
    "options": [
      "Lobar Pneumonia",
      "Tuberculosis",
      "Lung Cancer",
      "Pulmonary Edema"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1489",
    "patient": "Elizabeth F., 21F",
    "vitals": "BP 110/80 • HR 125 • O2 91%",
    "symptoms": [
      "Widespread expiratory wheezing, chest tightness, and dry cough",
      "Use of accessory respiratory muscles and intercostal retractions",
      "Prolonged expiratory phase and reduced peak expiratory flow rate",
      "Long-standing history of atopy, allergic rhinitis, or childhood eczema"
    ],
    "options": [
      "Foreign Body Aspiration",
      "Asthma Exacerbation",
      "Croup",
      "Epiglottitis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1490",
    "patient": "Kevin C., 55M",
    "vitals": "BP 187/100 • HR 95 • O2 98%",
    "symptoms": [
      "Symptoms developed suddenly within the past few hours",
      "Gaze deviation toward the side of the cortical lesion",
      "Expressive or receptive motor aphasia and slurred speech",
      "Sudden onset of contralateral face, arm, and leg weakness"
    ],
    "options": [
      "Ischemic Stroke (MCA)",
      "Hemorrhagic Stroke",
      "Bell's Palsy",
      "Complex Partial Seizure"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1491",
    "patient": "Jose L., 47M",
    "vitals": "BP 175/122 • HR 108 • O2 95%",
    "symptoms": [
      "Transient loss of consciousness followed by severe neck stiffness",
      "Sudden onset of excruciating headache, described as the 'worst of life'",
      "Rupture of an anterior communicating artery berry aneurysm",
      "Marked photophobia, nausea, vomiting, and meningismus"
    ],
    "options": [
      "Migraine",
      "Subarachnoid Hemorrhage",
      "Meningitis",
      "Tension Headache"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1492",
    "patient": "Brenda E., 21F",
    "vitals": "BP 127/79 • HR 120 • O2 95% • Temp 39.1C",
    "symptoms": [
      "Severe generalized headache, high fever, and shaking chills",
      "Altered mental status ranging from confusion to stupor",
      "Marked nuchal rigidity and neck stiffness on passive flexion",
      "Positive Kernig's and Brudzinski's signs on physical exam"
    ],
    "options": [
      "Viral Encephalitis",
      "Subarachnoid Hemorrhage",
      "Bacterial Meningitis",
      "Brain Abscess"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1493",
    "patient": "Brian L., 25M",
    "vitals": "BP 111/78 • HR 71 • O2 99%",
    "symptoms": [
      "Sudden onset of unilateral facial paralysis involving the entire half face",
      "Inability to raise the eyebrow or wrinkle the forehead on the affected side",
      "Inability to close the eye on the affected side completely",
      "Drooling from the corner of the mouth and loss of taste on anterior tongue"
    ],
    "options": [
      "Stroke",
      "Bell's Palsy",
      "Trigeminal Neuralgia",
      "Myasthenia Gravis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1494",
    "patient": "Pamela P., 23F",
    "vitals": "BP 120/71 • HR 89 • O2 98% • Temp 37.8C",
    "symptoms": [
      "Positive Rovsing's sign and obturator sign on examination",
      "Exquisite tenderness at McBurney's point and positive rebound tenderness",
      "Mild fever and peripheral leukocytosis with left shift",
      "Dull periumbilical pain migrating and localizing to the right lower quadrant"
    ],
    "options": [
      "Ectopic Pregnancy",
      "Ovarian Torsion",
      "Acute Appendicitis",
      "Kidney Stone"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1495",
    "patient": "Edward O., 50M",
    "vitals": "BP 128/87 • HR 94 • O2 98% • Temp 38.2C",
    "symptoms": [
      "Severe right upper quadrant pain radiating to the right scapula",
      "Persistent nausea, vomiting, low-grade fever, and mild leukocytosis",
      "Ultrasound showing gallstones, gallbladder wall thickening, and pericholecystic fluid",
      "Pain triggered or worsened by ingestion of fatty meals"
    ],
    "options": [
      "Acute Cholecystitis",
      "Acute Pancreatitis",
      "Peptic Ulcer Disease",
      "Hepatitis"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1496",
    "patient": "Maria W., 34F",
    "vitals": "BP 102/66 • HR 124 • O2 94%",
    "symptoms": [
      "Severe, boring epigastric abdominal pain radiating straight to the back",
      "Constant nausea and intractable vomiting without relief of pain",
      "Pain that is partially relieved by sitting up and leaning forward",
      "History of chronic alcohol abuse or gallstones"
    ],
    "options": [
      "Perforated Ulcer",
      "Acute Pancreatitis",
      "Mesenteric Ischemia",
      "Aortic Aneurysm Rupture"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1497",
    "patient": "Gregory S., 60M",
    "vitals": "BP 122/81 • HR 89 • O2 98% • Temp 38.4C",
    "symptoms": [
      "Changes in bowel habits, commonly constipation or loose stools",
      "Constant left lower quadrant abdominal pain and tenderness",
      "Tender palpable mass in the left lower quadrant on palpation",
      "Low-grade fever, chills, and mild abdominal bloating"
    ],
    "options": [
      "Appendicitis",
      "Acute Diverticulitis",
      "Colon Cancer",
      "Ulcerative Colitis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1498",
    "patient": "Margaret Y., 34F",
    "vitals": "BP 90/48 • HR 124 • O2 96%",
    "symptoms": [
      "Hemoperitoneum and pelvic free fluid seen on transvaginal ultrasound",
      "Dizziness, lightheadedness, and referred left shoulder pain",
      "Positive serum beta-hCG with lack of an intrauterine gestational sac",
      "Sudden onset of severe, sharp, unilateral pelvic and lower abdominal pain"
    ],
    "options": [
      "Ovarian Torsion",
      "Ruptured Ectopic Pregnancy",
      "Pelvic Inflammatory Disease",
      "Endometriosis"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1499",
    "patient": "Scott E., 46M",
    "vitals": "BP 131/92 • HR 113 • O2 99%",
    "symptoms": [
      "Sudden onset of severe, colicky flank pain radiating to the groin",
      "CT scan of abdomen/pelvis without contrast showing obstructive calculus",
      "Gross or microscopic hematuria on urinalysis",
      "Exquisite costovertebral angle tenderness on the affected side"
    ],
    "options": [
      "Pyelonephritis",
      "Testicular Torsion",
      "Nephrolithiasis (Kidney Stone)",
      "Appendicitis"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1500",
    "patient": "Alexander T., 17M",
    "vitals": "BP 118/74 • HR 119 • O2 97%",
    "symptoms": [
      "Negative Prehn's sign (no relief of pain with scrotal elevation)",
      "Sudden onset of severe, constant unilateral scrotal and inguinal pain",
      "Markedly decreased or absent blood flow on scrotal Doppler ultrasound",
      "High-riding, horizontally oriented testicle on the affected side"
    ],
    "options": [
      "Epididymitis",
      "Testicular Torsion",
      "Inguinal Hernia",
      "Hydrocele"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1501",
    "patient": "Melissa Z., 15F",
    "vitals": "BP 94/52 • HR 116 • O2 99%",
    "symptoms": [
      "Progressive nausea, vomiting, diffuse abdominal pain, and fatigue",
      "Positive urine and serum ketones with increased anion gap",
      "Fruity breath odor (acetone) and deep, rapid Kussmaul respirations",
      "Serum blood glucose level of 450 mg/dL and metabolic acidosis"
    ],
    "options": [
      "Diabetic Ketoacidosis (DKA)",
      "Hyperosmolar Hyperglycemic State",
      "Sepsis",
      "Salicylate Toxicity"
    ],
    "answer": 0
  },
  {
    "id": "CASE-1502",
    "patient": "Nicole P., 74F",
    "vitals": "BP 85/51 • HR 113 • O2 89% • Temp 38.7C",
    "symptoms": [
      "Warm, flushed skin (early phase) or cool, clammy mottled extremities (late)",
      "Altered mental status, confusion, and worsening lethargy",
      "Active focus of infection, such as pyelonephritis or severe pneumonia",
      "Elevated blood lactate levels and severe peripheral leukocytosis"
    ],
    "options": [
      "Cardiogenic Shock",
      "Septic Shock",
      "Hypovolemic Shock",
      "Neurogenic Shock"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1503",
    "patient": "Jose G., 22M",
    "vitals": "BP 135/69 • HR 115 • O2 98%",
    "symptoms": [
      "Undetectable serum TSH with elevated free T3 and T4 levels",
      "Proptosis, lid lag, exophthalmos, and pretibial myxedema",
      "Diffuse non-tender thyroid enlargement (goiter) with thyroid bruit",
      "Heat intolerance, fine hand tremors, palpitations, and anxiety"
    ],
    "options": [
      "Hypothyroidism",
      "Pheochromocytoma",
      "Hyperthyroidism (Graves' Disease)",
      "Cushing's Syndrome"
    ],
    "answer": 2
  },
  {
    "id": "CASE-1504",
    "patient": "Karen O., 46F",
    "vitals": "BP 85/64 • HR 121 • O2 93%",
    "symptoms": [
      "Severe dyspnea and hypotension following penetrating chest trauma",
      "Distended jugular veins (JVD) with prominent x-descent and absent y-descent",
      "Pulsus paradoxus (drop in systolic blood pressure >10 mmHg on inspiration)",
      "Muffled, distant heart sounds on auscultation (Beck's triad)"
    ],
    "options": [
      "Tension Pneumothorax",
      "Cardiac Tamponade",
      "Massive Hemothorax",
      "Flail Chest"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1505",
    "patient": "Sandra P., 59F",
    "vitals": "BP 78/60 • HR 135 • O2 88%",
    "symptoms": [
      "Severe progressive respiratory distress and hypotension after chest wall injury",
      "Distended neck veins and ipsilateral chest wall hyperexpansion",
      "Immediate clinical improvement upon needle decompression in 2nd intercostal space",
      "Tracheal deviation to the contralateral side away from the injury"
    ],
    "options": [
      "Cardiac Tamponade",
      "Tension Pneumothorax",
      "Pulmonary Contusion",
      "Aortic Rupture"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1506",
    "patient": "Carolyn P., 74F",
    "vitals": "BP 132/80 • HR 94 • O2 96%",
    "symptoms": [
      "Severe wrist pain and swelling after falling on an outstretched hand (FOOSH)",
      "Classic dorsal displacement and angulation of the distal radius (dinner fork deformity)",
      "Pain exacerbated by active or passive wrist movements",
      "Radiograph showing extra-articular transverse distal radius fracture"
    ],
    "options": [
      "Smith's Fracture",
      "Colles' Fracture",
      "Scaphoid Fracture",
      "Galeazzi Fracture"
    ],
    "answer": 1
  },
  {
    "id": "CASE-1507",
    "patient": "Christine C., 50F",
    "vitals": "BP 104/53 • HR 64 • O2 83% • Temp 35.6C",
    "symptoms": [
      "Patient found completely unresponsive, cyanotic, and hypoventilating",
      "Symmetric pinpoint pupils (miosis) bilaterally",
      "Severe respiratory depression with respiratory rate less than 8 breaths/minute",
      "Multiple skin track marks over forearm veins"
    ],
    "options": [
      "Cocaine Overdose",
      "Benzodiazepine Overdose",
      "Opioid Overdose",
      "Alcohol Poisoning"
    ],
    "answer": 2
  }
];
