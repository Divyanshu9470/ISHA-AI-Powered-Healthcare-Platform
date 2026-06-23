export interface ClinicalCase {
  id: string;
  patient: string;
  vitals: string;
  symptoms: string[];
  options: string[];
  answer: number;
}

export const clinicalCases: ClinicalCase[] = [
  // CARDIOLOGY
  {
    id: "CASE-0921", patient: "John D., 55M", vitals: "BP 85/50 • HR 120 • O2 92%",
    symptoms: ["Sudden onset 'tearing' chest pain", "Pain radiates to the back", "Asymmetric blood pressure in arms", "Widened mediastinum on CXR"],
    options: ["Myocardial Infarction", "Aortic Dissection", "Pulmonary Embolism", "Tension Pneumothorax"], answer: 1
  },
  {
    id: "CASE-1102", patient: "Arthur P., 68M", vitals: "BP 90/60 • HR 45 • O2 95%",
    symptoms: ["Crushing substernal chest pain", "Diaphoresis and nausea", "Pain radiating to left jaw", "ECG shows ST elevation in II, III, aVF"],
    options: ["Inferior STEMI", "Anterior STEMI", "Pericarditis", "Costochondritis"], answer: 0
  },
  {
    id: "CASE-3310", patient: "Maria Garcia, 42F", vitals: "BP 110/70 • HR 115 • O2 98%",
    symptoms: ["Palpitations starting abruptly", "Lightheadedness", "ECG shows narrow complex tachycardia", "No P waves visible"],
    options: ["Atrial Fibrillation", "Supraventricular Tachycardia (SVT)", "Ventricular Tachycardia", "Sinus Tachycardia"], answer: 1
  },
  {
    id: "CASE-4421", patient: "Leon S., 72M", vitals: "BP 140/90 • HR 88 • O2 93%",
    symptoms: ["Progressive shortness of breath", "Waking up gasping for air at night", "Bilateral pitting edema in legs", "S3 gallop on auscultation"],
    options: ["Congestive Heart Failure", "COPD Exacerbation", "Pulmonary Fibrosis", "Cor Pulmonale"], answer: 0
  },
  {
    id: "CASE-5590", patient: "Emily R., 22F", vitals: "BP 105/65 • HR 90 • O2 99%",
    symptoms: ["Sharp chest pain that worsens on inspiration", "Pain improves when leaning forward", "Recent viral URI", "Friction rub heard on auscultation"],
    options: ["Myocardial Infarction", "Pulmonary Embolism", "Acute Pericarditis", "Gastroesophageal Reflux"], answer: 2
  },

  // PULMONOLOGY
  {
    id: "CASE-0234", patient: "Kevin B., 34M", vitals: "BP 120/80 • HR 110 • O2 88%",
    symptoms: ["Sudden onset shortness of breath", "Sharp pleuritic chest pain", "Recent long-haul flight from Tokyo", "Right leg swelling"],
    options: ["Pneumonia", "Asthma Exacerbation", "Pulmonary Embolism", "Pneumothorax"], answer: 2
  },
  {
    id: "CASE-0288", patient: "Sam T., 19M", vitals: "BP 115/75 • HR 125 • O2 90%",
    symptoms: ["Sudden severe dyspnea while playing basketball", "Tall, thin body habitus", "Decreased breath sounds on the right", "Hyperresonance to percussion on right"],
    options: ["Spontaneous Pneumothorax", "Asthma Attack", "Pulmonary Embolism", "Cardiac Tamponade"], answer: 0
  },
  {
    id: "CASE-0312", patient: "Clara H., 65F", vitals: "BP 130/85 • HR 95 • Temp 39.2C • O2 91%",
    symptoms: ["Productive cough with rust-colored sputum", "Chills and rigors", "Dullness to percussion at right lung base", "Bronchial breath sounds present"],
    options: ["Lobar Pneumonia", "Tuberculosis", "Lung Cancer", "Pulmonary Edema"], answer: 0
  },
  {
    id: "CASE-0450", patient: "David L., 12M", vitals: "BP 100/60 • HR 120 • O2 92%",
    symptoms: ["Wheezing on expiration", "Use of accessory respiratory muscles", "Prolonged expiratory phase", "History of atopy/eczema"],
    options: ["Foreign Body Aspiration", "Asthma Exacerbation", "Croup", "Epiglottitis"], answer: 1
  },

  // NEUROLOGY
  {
    id: "CASE-0923", patient: "Robert T., 65M", vitals: "BP 160/90 • HR 88 • O2 96%",
    symptoms: ["Sudden right-sided weakness", "Difficulty speaking (expressive aphasia)", "Facial droop sparing the forehead", "Symptoms started 45 minutes ago"],
    options: ["Ischemic Stroke (MCA)", "Hemorrhagic Stroke", "Bell's Palsy", "Complex Partial Seizure"], answer: 0
  },
  {
    id: "CASE-1044", patient: "Linda W., 52F", vitals: "BP 180/100 • HR 90 • O2 97%",
    symptoms: ["'Worst headache of my life'", "Sudden onset during exercise", "Photophobia and neck stiffness", "Nausea and vomiting"],
    options: ["Migraine", "Subarachnoid Hemorrhage", "Meningitis", "Tension Headache"], answer: 1
  },
  {
    id: "CASE-1188", patient: "Alice C., 28F", vitals: "BP 110/70 • HR 75 • Temp 39.0C",
    symptoms: ["Severe headache", "Fever and chills", "Neck stiffness (nuchal rigidity)", "Positive Brudzinski's sign"],
    options: ["Viral Encephalitis", "Subarachnoid Hemorrhage", "Bacterial Meningitis", "Brain Abscess"], answer: 2
  },
  {
    id: "CASE-1250", patient: "Tom N., 45M", vitals: "BP 125/80 • HR 80 • O2 98%",
    symptoms: ["Unilateral facial weakness", "Unable to close right eye", "Unable to wrinkle right forehead", "Drooling from right side of mouth"],
    options: ["Stroke", "Bell's Palsy", "Trigeminal Neuralgia", "Myasthenia Gravis"], answer: 1
  },

  // GASTROENTEROLOGY
  {
    id: "CASE-0922", patient: "Sarah M., 28F", vitals: "BP 110/70 • HR 95 • Temp 38.5C",
    symptoms: ["Right lower quadrant abdominal pain", "Nausea and vomiting", "Pain started around the umbilicus", "Rebound tenderness at McBurney's point"],
    options: ["Ectopic Pregnancy", "Ovarian Torsion", "Acute Appendicitis", "Kidney Stone"], answer: 2
  },
  {
    id: "CASE-2033", patient: "Frank O., 50M", vitals: "BP 140/85 • HR 105 • Temp 38.8C",
    symptoms: ["Severe right upper quadrant pain", "Pain radiates to right shoulder", "Positive Murphy's sign", "History of gallstones"],
    options: ["Acute Cholecystitis", "Acute Pancreatitis", "Peptic Ulcer Disease", "Hepatitis"], answer: 0
  },
  {
    id: "CASE-2101", patient: "Gary V., 42M", vitals: "BP 90/60 • HR 115 • O2 98%",
    symptoms: ["Severe epigastric pain radiating to the back", "Vomiting uncontrollably", "History of heavy alcohol use", "Cullen's sign (periumbilical bruising)"],
    options: ["Perforated Ulcer", "Acute Pancreatitis", "Mesenteric Ischemia", "Aortic Aneurysm Rupture"], answer: 1
  },
  {
    id: "CASE-2255", patient: "Henry D., 70M", vitals: "BP 100/65 • HR 100 • Temp 38.2C",
    symptoms: ["Left lower quadrant abdominal pain", "Fever", "Changes in bowel habits", "Tender palpable mass in LLQ"],
    options: ["Appendicitis", "Acute Diverticulitis", "Colon Cancer", "Ulcerative Colitis"], answer: 1
  },

  // OBGYN / UROLOGY
  {
    id: "CASE-3011", patient: "Jessica L., 24F", vitals: "BP 85/50 • HR 125 • Temp 37.0C",
    symptoms: ["Sudden severe unilateral pelvic pain", "Vaginal spotting", "Missed menstrual period by 2 weeks", "Dizziness and shoulder pain"],
    options: ["Ovarian Torsion", "Ruptured Ectopic Pregnancy", "Pelvic Inflammatory Disease", "Endometriosis"], answer: 1
  },
  {
    id: "CASE-3120", patient: "Mark S., 35M", vitals: "BP 130/80 • HR 100 • O2 99%",
    symptoms: ["Sudden, excruciating flank pain", "Pain radiates to the groin", "Hematuria (blood in urine)", "Pacing around the room, unable to sit still"],
    options: ["Pyelonephritis", "Testicular Torsion", "Nephrolithiasis (Kidney Stone)", "Appendicitis"], answer: 2
  },
  {
    id: "CASE-3244", patient: "Alex J., 16M", vitals: "BP 115/75 • HR 110 • Temp 37.2C",
    symptoms: ["Sudden severe scrotal pain", "High-riding testicle", "Absent cremasteric reflex", "Nausea and vomiting"],
    options: ["Epididymitis", "Testicular Torsion", "Inguinal Hernia", "Hydrocele"], answer: 1
  },

  // ENDOCRINE / METABOLIC
  {
    id: "CASE-4022", patient: "Rachel K., 19F", vitals: "BP 90/55 • HR 130 • Temp 37.1C • RR 28",
    symptoms: ["Nausea, vomiting, and abdominal pain", "Fruity breath odor", "Deep, rapid breathing (Kussmaul respirations)", "Blood glucose 450 mg/dL"],
    options: ["Diabetic Ketoacidosis (DKA)", "Hyperosmolar Hyperglycemic State", "Sepsis", "Salicylate Toxicity"], answer: 0
  },
  {
    id: "CASE-4155", patient: "Barbara W., 65F", vitals: "BP 80/50 • HR 110 • Temp 39.5C",
    symptoms: ["Confusion and lethargy", "Warm, flushed skin", "Decreased urine output", "WBC count 22,000"],
    options: ["Cardiogenic Shock", "Septic Shock", "Hypovolemic Shock", "Neurogenic Shock"], answer: 1
  },
  {
    id: "CASE-4280", patient: "Jim P., 40M", vitals: "BP 110/70 • HR 120 (Tremor)",
    symptoms: ["Weight loss despite increased appetite", "Heat intolerance", "Exophthalmos (bulging eyes)", "Palpitations and anxiety"],
    options: ["Hypothyroidism", "Pheochromocytoma", "Hyperthyroidism (Graves' Disease)", "Cushing's Syndrome"], answer: 2
  },

  // TRAUMA / ORTHO
  {
    id: "CASE-5010", patient: "Motorcycle Rider, 25M", vitals: "BP 70/40 • HR 140 • O2 85%",
    symptoms: ["Severe chest trauma from steering wheel", "Distended neck veins (JVD)", "Muffled heart sounds", "Pulsus paradoxus"],
    options: ["Tension Pneumothorax", "Cardiac Tamponade", "Massive Hemothorax", "Flail Chest"], answer: 1
  },
  {
    id: "CASE-5120", patient: "Construction Worker, 30M", vitals: "BP 80/40 • HR 130 • O2 88%",
    symptoms: ["Fell from 2nd story roof", "Tracheal deviation to the left", "Absent breath sounds on the right", "Severe respiratory distress"],
    options: ["Cardiac Tamponade", "Tension Pneumothorax", "Pulmonary Contusion", "Aortic Rupture"], answer: 1
  },
  {
    id: "CASE-5290", patient: "Mary L., 75F", vitals: "BP 130/80 • HR 85",
    symptoms: ["Fell on outstretched hand (FOOSH)", "Pain in the wrist", "Dinner fork deformity of the forearm", "Numbness in fingers"],
    options: ["Smith's Fracture", "Colles' Fracture", "Scaphoid Fracture", "Galeazzi Fracture"], answer: 1
  },

  // TOXICOLOGY
  {
    id: "CASE-6055", patient: "Unknown, ~30M", vitals: "BP 100/60 • HR 50 • O2 82% • RR 6",
    symptoms: ["Found unresponsive in an alley", "Pinpoint pupils (Miosis)", "Severe respiratory depression", "Cyanosis around the lips"],
    options: ["Cocaine Overdose", "Benzodiazepine Overdose", "Opioid Overdose", "Alcohol Poisoning"], answer: 2
  },
  {
    id: "CASE-6110", patient: "Child, 4M", vitals: "BP 90/60 • HR 130 • Temp 38.5C",
    symptoms: ["Found open medicine cabinet", "Tinnitus (ringing in ears)", "Hyperventilation", "Vomiting and confusion"],
    options: ["Acetaminophen Toxicity", "Aspirin (Salicylate) Toxicity", "Iron Toxicity", "Lead Poisoning"], answer: 1
  },
  {
    id: "CASE-6200", patient: "Farmer, 45M", vitals: "BP 90/50 • HR 45 • O2 90%",
    symptoms: ["Excessive salivation and tearing", "Urination and defecation", "Muscle twitching", "Pinpoint pupils"],
    options: ["Organophosphate Poisoning", "Anticholinergic Toxicity", "Opioid Toxicity", "Carbon Monoxide Poisoning"], answer: 0
  },
  // INFECTIOUS DISEASE
  {
    id: "CASE-7011", patient: "Ethan H., 29M", vitals: "BP 110/70 • HR 90 • Temp 39.8C",
    symptoms: ["High fever and headache", "Rose spots on the abdomen", "Relative bradycardia", "Step-ladder pattern of fever"],
    options: ["Typhoid Fever", "Malaria", "Dengue Fever", "Leptospirosis"], answer: 0
  },
  {
    id: "CASE-7122", patient: "Chloe S., 24F", vitals: "BP 105/65 • HR 110 • Temp 39.0C",
    symptoms: ["Sudden high fever", "Severe retro-orbital pain", "Extreme joint and muscle pain ('breakbone')", "Maculopapular rash"],
    options: ["Zika Virus", "Dengue Fever", "Chikungunya", "Yellow Fever"], answer: 1
  },
  {
    id: "CASE-7233", patient: "Marcus J., 32M", vitals: "BP 115/75 • HR 85 • Temp 38.5C",
    symptoms: ["Cyclical fever every 48 hours", "Splenomegaly", "Anemia and jaundice", "Recent travel to sub-Saharan Africa"],
    options: ["Malaria (P. falciparum)", "Malaria (P. vivax)", "Babesiosis", "Visceral Leishmaniasis"], answer: 1
  },
  // DERMATOLOGY / RHEUM
  {
    id: "CASE-8010", patient: "Sophia G., 34F", vitals: "BP 120/80 • HR 75",
    symptoms: ["Malar rash (butterfly rash)", "Photosensitivity", "Joint pain and swelling", "Proteinuria on urinalysis"],
    options: ["Systemic Lupus Erythematosus", "Rosacea", "Dermatomyositis", "Rheumatoid Arthritis"], answer: 0
  },
  {
    id: "CASE-8155", patient: "George K., 55M", vitals: "BP 140/90 • HR 80",
    symptoms: ["Sudden severe pain in the first MTP joint", "Joint is red, hot, and swollen", "History of high alcohol consumption", "Uric acid 9.5 mg/dL"],
    options: ["Pseudogout", "Septic Arthritis", "Acute Gouty Arthritis", "Osteoarthritis Exacerbation"], answer: 2
  }
];
