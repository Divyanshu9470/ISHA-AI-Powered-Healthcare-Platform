"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { 
  Activity, 
  BookOpen, 
  Brain as BrainIcon, 
  Heart as HeartIcon, 
  Search, 
  RotateCw, 
  Award, 
  CheckCircle, 
  XCircle, 
  Lightbulb,
  Compass,
  FileText,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
  Eye,
  EyeOff,
  Maximize2,
  Trash2,
  Sliders,
  ChevronDown,
  ChevronRight,
  User,
  HelpCircle,
  ZoomIn,
  ZoomOut,
  Move,
  Eraser,
  PenTool,
  Check,
  X,
  Scissors
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Types
type SystemType = 
  | "integumentary" // Body outline
  | "skeletal" 
  | "muscular" 
  | "nervous" 
  | "cardiovascular" 
  | "respiratory" 
  | "digestive" 
  | "urinary"
  | "lymphatic";

type ModeType = "study" | "exam";
type QuizModeType = "mcq" | "hunt";
type ToolType = "orbit" | "pan" | "draw" | "dissect" | "isolate";

interface ClinicalCorrelation {
  title: string;
  description: string;
  symptoms: string[];
  examsYield: string;
}

interface Flashcard {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

interface AnatomicalStructure {
  id: string;
  name: string;
  system: SystemType;
  description: string;
  highYieldNotes: string[];
  clinicalCorrelations: ClinicalCorrelation[];
  flashcard: Flashcard;
  coordinates3d: [number, number, number]; // [x, y, z] center
}

// Complete anatomical database with structured 3D coordinates
const ANATOMICAL_DATABASE: Record<string, AnatomicalStructure> = {
  brain: {
    id: "brain",
    name: "Brain (Cerebrum & Brainstem)",
    system: "nervous",
    description: "The central organ of the human nervous system. Comprises the cerebrum, cerebellum, and brainstem. It controls most of the activities of the body, processing, integrating, and coordinating sensory and motor information.",
    highYieldNotes: [
      "Cerebrum accounts for 85% of brain weight; divided into frontal, parietal, temporal, and occipital lobes.",
      "Blood supply is derived from the internal carotid and vertebral arteries, anastomosing at the Circle of Willis.",
      "Cerebrospinal fluid (CSF) is produced by the choroid plexus in the ventricles and is absorbed into the venous system via arachnoid granulations."
    ],
    clinicalCorrelations: [
      {
        title: "Epidural Hematoma",
        description: "Accumulation of blood between the skull and dura mater, most commonly due to rupture of the middle meningeal artery secondary to trauma at the pterion.",
        symptoms: ["Transient loss of consciousness followed by a 'lucid interval'", "Progressive headache", "Contralateral hemiparesis", "Ipsilateral pupillary dilation ('blown pupil')"],
        examsYield: "USMLE Step 1 / NEET PG High Yield"
      },
      {
        title: "Parkinson's Disease",
        description: "Neurodegenerative disorder characterized by the loss of dopaminergic neurons in the substantia nigra pars compacta, leading to a deficiency of dopamine in the striatum.",
        symptoms: ["Resting tremor ('pill-rolling')", "Cogwheel rigidity", "Bradykinesia", "Postural instability"],
        examsYield: "INICET / FMGE High Yield"
      }
    ],
    flashcard: {
      question: "A 24-year-old male is brought to the emergency department after being struck in the lateral temple by a baseball. He was briefly unconscious, regained full clarity for 2 hours (lucid interval), and subsequently collapsed. A head CT reveals a biconvex, hyperdense extra-axial fluid collection. Which of the following vessels is most likely ruptured?",
      options: [
        "Middle meningeal artery",
        "Bridging cortical veins",
        "Anterior communicating artery",
        "Internal carotid artery"
      ],
      answerIndex: 0,
      explanation: "An epidural hematoma is typically caused by head trauma, specifically at the pterion, resulting in rupture of the middle meningeal artery (a branch of the maxillary artery). It is characterized by a classic lucid interval and presents as a biconvex, lens-shaped hyperdense mass on CT that does not cross suture lines."
    },
    coordinates3d: [0, -145, 0]
  },
  spine: {
    id: "spine",
    name: "Spinal Cord & Column",
    system: "nervous",
    description: "The main pathway for information connecting the brain and peripheral nervous system. It is housed within the vertebral column, extending from the foramen magnum of the skull down to the L1/L2 vertebral level.",
    highYieldNotes: [
      "Ends at the conus medullaris (L1-L2 in adults, L3 in newborns), continuing as the cauda equina.",
      "Ascending tracts include the Dorsal Column-Medial Lemniscus (sensory: vibration, proprioception, fine touch) and Spinothalamic (sensory: pain and temperature).",
      "Descending tracts include the Corticospinal tract (voluntary motor control)."
    ],
    clinicalCorrelations: [
      {
        title: "Brown-Séquard Syndrome",
        description: "Hemisection of the spinal cord, usually due to penetrating trauma. Results in specific asymmetric sensory and motor loss below the lesion level.",
        symptoms: [
          "Ipsilateral spastic paralysis below lesion (corticospinal)",
          "Ipsilateral loss of vibration/proprioception below lesion (dorsal column)",
          "Contralateral loss of pain/temperature 1-2 segments below lesion (spinothalamic)"
        ],
        examsYield: "USMLE Step 1 / NEET PG High Yield"
      },
      {
        title: "Syringomyelia",
        description: "Fluid-filled cavity (syrinx) within the central canal of the spinal cord, most commonly associated with Chiari I malformations. Damages crossing anterior white commissure fibers first.",
        symptoms: ["Bilateral, capelike loss of pain and temperature in upper extremities", "Preservation of touch and proprioception (dissociated sensory loss)", "Muscle atrophy in hands"],
        examsYield: "INICET / FMGE"
      }
    ],
    flashcard: {
      question: "A 31-year-old male is admitted after sustaining a penetrating knife wound to his back. Neurological examination reveals complete loss of motor function and vibration sense on the right side below the T10 dermatome, and loss of pain and temperature sensation on the left side below T12. Which of the following describes this pattern?",
      options: [
        "Right spinal cord hemisection (Brown-Séquard syndrome)",
        "Left spinal cord hemisection (Brown-Séquard syndrome)",
        "Anterior cord syndrome",
        "Syringomyelia"
      ],
      answerIndex: 0,
      explanation: "This patient exhibits right-sided hemisection of the spinal cord (Brown-Séquard syndrome). Motor fibers (corticospinal) and proprioceptive/vibration fibers (dorsal columns) decussate in the brainstem, causing ipsilateral deficits below the lesion (right side). Pain and temperature fibers (spinothalamic) cross immediately in the spinal cord, causing contralateral deficits below the lesion (left side)."
    },
    coordinates3d: [0, 0, 18]
  },
  heart: {
    id: "heart",
    name: "Heart (Myocardium & Coronary Vessels)",
    system: "cardiovascular",
    description: "A muscular organ in the thorax, which pumps blood through the blood vessels of the circulatory system. The pumped blood carries oxygen and nutrients to the body, while carrying metabolic waste such as carbon dioxide to the lungs.",
    highYieldNotes: [
      "Composed of four chambers: two upper atria and two lower ventricles.",
      "The Sinoatrial (SA) node is the primary pacemaker of the heart, firing at 60-100 bpm. Located at the junction of the superior vena cava and right atrium.",
      "Left main coronary artery branches into the Left Anterior Descending (LAD) and Left Circumflex (LCx) arteries."
    ],
    clinicalCorrelations: [
      {
        title: "Myocardial Infarction (Heart Attack)",
        description: "Ischemic necrosis of the myocardium, most commonly caused by rupture of an atherosclerotic plaque and subsequent thrombosis of a coronary artery (LAD is most common).",
        symptoms: ["Crushing substernal chest pain radiating to left arm/jaw", "Diaphoresis (profuse sweating)", "Dyspnea", "ST-segment elevation or depression on ECG"],
        examsYield: "NEET PG / USMLE Step 2 CK"
      },
      {
        title: "Tetralogy of Fallot (TOF)",
        description: "The most common cyanotic congenital heart disease. Caused by anterosuperior displacement of the infundibular septum.",
        symptoms: ["Pulmonary infundibular stenosis", "Right ventricular hypertrophy (boot-shaped heart on X-ray)", "Overriding aorta", "Ventricular septal defect (VSD)"],
        examsYield: "PLAB 1 / USMLE Step 1"
      }
    ],
    flashcard: {
      question: "A 58-year-old male presents to the ER with crushing chest pain of 45 minutes duration, radiating to his left arm. An electrocardiogram (ECG) reveals ST-segment elevation in leads V1 to V4. Which of the following coronary arteries is most likely occluded?",
      options: [
        "Left anterior descending artery (LAD)",
        "Right coronary artery (RCA)",
        "Left circumflex artery (LCx)",
        "Right marginal artery"
      ],
      answerIndex: 0,
      explanation: "Leads V1 to V4 represent the anterior and septal walls of the left ventricle. This region is supplied by the Left Anterior Descending (LAD) coronary artery, often referred to as the 'widowmaker' due to the critical nature of its occlusion."
    },
    coordinates3d: [-6, -45, -12]
  },
  left_lung: {
    id: "left_lung",
    name: "Left Lung & Bronchial Tree",
    system: "respiratory",
    description: "The primary organ of respiration on the left side. It consists of two lobes (superior and inferior) separated by an oblique fissure, and contains the cardiac notch where the heart rests.",
    highYieldNotes: [
      "The left lung has 2 lobes and a lingula, which represents the anatomical analog of the right middle lobe.",
      "Type II pneumocytes produce surfactant (dipalmitoylphosphatidylcholine) to reduce alveolar surface tension, preventing collapse.",
      "The left main bronchus is longer, narrower, and more horizontal than the right, making foreign body aspiration less common on this side."
    ],
    clinicalCorrelations: [
      {
        title: "Neonatal Respiratory Distress Syndrome (RDS)",
        description: "Surfactant deficiency in premature infants, leading to high alveolar surface tension, alveolar collapse (atelectasis), and severe hypoxia.",
        symptoms: ["Tachypnea", "Nasal flaring", "Intercostal retractions", "Ground-glass appearance on chest X-ray"],
        examsYield: "USMLE Step 1 / INICET"
      },
      {
        title: "Tension Pneumothorax",
        description: "Life-threatening accumulation of air in the pleural space, compressing the lung and shifting the mediastinum to the contralateral side.",
        symptoms: ["Sudden unilateral chest pain", "Severe dyspnea", "Absent breath sounds on affected side", "Tracheal deviation away from the affected side"],
        examsYield: "NEET PG / PLAB 1"
      }
    ],
    flashcard: {
      question: "A premature male infant is born at 28 weeks gestation to a 32-year-old mother. Soon after birth, the infant develops grunting, nasal flaring, and chest retractions. A chest radiograph shows diffuse, fine reticulogranular infiltrates. A deficiency in which of the following substances is the primary driver of this condition?",
      options: [
        "Dipalmitoylphosphatidylcholine",
        "Sphingomyelin",
        "Alpha-1 antitrypsin",
        "Fibronectin"
      ],
      answerIndex: 0,
      explanation: "Neonatal Respiratory Distress Syndrome (RDS) is caused by a deficiency in pulmonary surfactant, which is primarily composed of dipalmitoylphosphatidylcholine (DPPC), a lecithin. Surfactant synthesis begins in earnest around week 26 but isn't fully mature until weeks 32-35."
    },
    coordinates3d: [18, -42, -8]
  },
  right_lung: {
    id: "right_lung",
    name: "Right Lung & Bronchial Tree",
    system: "respiratory",
    description: "The primary organ of respiration on the right side. It is larger and heavier than the left lung, and consists of three lobes (superior, middle, and inferior) separated by horizontal and oblique fissures.",
    highYieldNotes: [
      "The right lung has 3 lobes (Superior, Middle, Inferior) and horizontal and oblique fissures.",
      "The right main bronchus is wider, shorter, and runs more vertically than the left, making it the most common site for aspirated foreign objects.",
      "Aspiration pneumonia is highly likely to affect the superior segment of the right lower lobe if the patient is supine during aspiration."
    ],
    clinicalCorrelations: [
      {
        title: "Aspiration Pneumonia",
        description: "Infection caused by inhaling oral or gastric contents, commonly seen in patients with compromised airway protection (e.g. alcohol intoxication, stroke).",
        symptoms: ["Fever", "Cough with foul-smelling sputum", "Dyspnea", "Infiltrates in dependent lung segments (right lower lobe)"],
        examsYield: "USMLE Step 2 CK / NEET PG"
      },
      {
        title: "Pulmonary Embolism (PE)",
        description: "Occlusion of the pulmonary arterial bed, most commonly due to a deep vein thrombosis (DVT) embolizing from the lower extremities.",
        symptoms: ["Sudden-onset pleuritic chest pain", "Tachypnea", "Tachycardia", "Hypoxemia with respiratory alkalosis"],
        examsYield: "PLAB 1 / USMLE Step 1"
      }
    ],
    flashcard: {
      question: "An unresponsive 34-year-old male with severe alcohol intoxication is admitted. He aspirated gastric contents during a vomiting episode. An X-ray of the chest shows an infiltrate. Which segment of the lung is most likely involved if he was lying flat on his back when he aspirated?",
      options: [
        "Superior segment of the right lower lobe",
        "Middle lobe of the right lung",
        "Lingula of the left lung",
        "Apical segment of the left upper lobe"
      ],
      answerIndex: 0,
      explanation: "When a patient is supine (lying on their back), gravity directs aspirated material into the most dependent regions. The right main bronchus is more vertical, so aspirated material enters the right lung, specifically the superior segment of the right lower lobe or the posterior segment of the right upper lobe."
    },
    coordinates3d: [-18, -42, -8]
  },
  liver: {
    id: "liver",
    name: "Liver (Hepatic Lobules & Bilary System)",
    system: "digestive",
    description: "A large, glandular organ located in the right upper quadrant of the abdomen. It plays a key role in metabolic detoxification, protein synthesis (albumin, clotting factors), glycogen storage, and bile production.",
    highYieldNotes: [
      "Receives a dual blood supply: 75% from the portal vein (nutrient-rich, oxygen-poor) and 25% from the hepatic artery (oxygen-rich).",
      "Organized into functional units called lobules, containing a central vein and peripheral portal triads (portal vein, hepatic artery, bile duct).",
      "Responsible for synthesizing albumin, coagulation factors (II, VII, IX, X), glycogen storage, and gluconeogenesis."
    ],
    clinicalCorrelations: [
      {
        title: "Portal Hypertension",
        description: "Elevation of blood pressure within the portal venous system, most commonly due to cirrhosis (intrahepatic resistance).",
        symptoms: ["Ascites (fluid accumulation in abdomen)", "Esophageal varices (risk of fatal hemorrhage)", "Caput medusae (engorged paraumbilical veins)", "Splenomegaly"],
        examsYield: "NEET PG / PLAB 1"
      },
      {
        title: "Hepatic Encephalopathy",
        description: "Reversible neuropsychiatric abnormality caused by liver failure and portal-systemic shunting, leading to accumulation of neurotoxic substances (mainly ammonia) in the brain.",
        symptoms: ["Asterixis ('flapping tremor')", "Altered mental status / confusion", "Sleep disturbances", "Musty odor of the breath (fetor hepaticus)"],
        examsYield: "USMLE Step 2 CK / FMGE"
      }
    ],
    flashcard: {
      question: "A 54-year-old male with a history of chronic alcohol abuse and liver cirrhosis is brought to the clinic. On physical examination, the physician notes abdominal distension with a fluid wave, and dilated, winding veins radiating outward from the umbilicus. What is the anatomical term for these dilated umbilical veins, and what is their primary driver?",
      options: [
        "Caput medusae, secondary to portal hypertension",
        "Varicose veins, secondary to deep vein thrombosis",
        "Spider angiomas, secondary to hyperestrogenism",
        "Esophageal varices, secondary to hepatic arterial occlusion"
      ],
      answerIndex: 0,
      explanation: "The dilated paraumbilical veins radiating from the umbilicus are called 'caput medusae'. They represent a portosystemic anastomosis that opens up when portal vein pressure rises (portal hypertension), routing blood back to the systemic circulation via the superficial epigastric veins."
    },
    coordinates3d: [-16, 5, -10]
  },
  stomach: {
    id: "stomach",
    name: "Stomach (Gastric Mucosa & Secretions)",
    system: "digestive",
    description: "A muscular organ located on the left side of the upper abdomen. The stomach receives food from the esophagus, secretes hydrochloric acid and digestive enzymes to churn food, and passes it to the small intestine.",
    highYieldNotes: [
      "Parietal cells in the fundus and body secrete Hydrochloric Acid (HCl) and Intrinsic Factor (necessary for Vitamin B12 absorption).",
      "Chief cells secrete pepsinogen, which is cleaved by acid into active pepsin for protein breakdown.",
      "G cells in the antrum secrete gastrin, which stimulates parietal cell acid secretion via CCK-2 receptors."
    ],
    clinicalCorrelations: [
      {
        title: "Peptic Ulcer Disease (PUD)",
        description: "Breaks in the mucosal lining of the stomach or duodenum, primarily caused by Helicobacter pylori infection or NSAID use.",
        symptoms: ["Epigastric pain (duodenal ulcers improve with food; gastric ulcers worsen with food)", "Nausea/vomiting", "Melena (dark tarry stools from bleeding)"],
        examsYield: "NEET PG / USMLE Step 1"
      },
      {
        title: "Pernicious Anemia",
        description: "Autoimmune destruction of gastric parietal cells or intrinsic factor, leading to severe Vitamin B12 deficiency.",
        symptoms: ["Macrocytic megaloblastic anemia", "Subacute combined degeneration (demyelination of spinal tracts)", "Glossitis (smooth, sore red tongue)", "Paresthesias"],
        examsYield: "INICET / PLAB 1"
      }
    ],
    flashcard: {
      question: "A 47-year-old female presents with progressive fatigue, tingling in her fingers and toes, and difficulty walking in the dark. Laboratory studies reveal a hemoglobin of 8.2 g/dL and a mean corpuscular volume (MCV) of 115 fL (normal 80-100 fL). A peripheral blood smear shows hypersegmented neutrophils. An autoimmune attack against which of the following is the most likely cause?",
      options: [
        "Gastric parietal cells",
        "Gastric chief cells",
        "Duodenal enterocytes",
        "Pancreatic acinar cells"
      ],
      answerIndex: 0,
      explanation: "Pernicious anemia is an autoimmune disease characterized by antibodies against gastric parietal cells or intrinsic factor. Parietal cells secrete intrinsic factor, which is required for Vitamin B12 absorption in the terminal ileum. B12 deficiency leads to megaloblastic macrocytic anemia and neurological deficits (demyelination of dorsal columns and corticospinal tracts)."
    },
    coordinates3d: [14, 10, -8]
  },
  left_kidney: {
    id: "left_kidney",
    name: "Left Kidney & Nephrons",
    system: "urinary",
    description: "A bean-shaped retroperitoneal organ located on the left side of the vertebral column. It filters blood to produce urine, regulates electrolyte balance, controls blood pressure via the RAAS system, and stimulates RBC production via erythropoietin.",
    highYieldNotes: [
      "The left kidney lies slightly higher than the right kidney due to the absence of the liver on this side (extending from T12 to L3).",
      "Functional unit is the Nephron; each kidney contains approximately 1 million nephrons.",
      "Secrete Renin (juxtaglomerular cells) to regulate blood pressure, Erythropoietin (interstitial fibroblasts) to stimulate RBC production, and convert Vitamin D to its active form (1,25-OH2D3) via 1-alpha-hydroxylase."
    ],
    clinicalCorrelations: [
      {
        title: "Nephrotic Syndrome",
        description: "Glomerular disorder characterized by severe glomerular basement membrane damage, leading to massive protein leakage.",
        symptoms: ["Proteinuria (>3.5 g/day)", "Hypoalbuminemia (<3.0 g/dL)", "Generalized pitting edema (anasarca)", "Hyperlipidemia and fatty casts in urine"],
        examsYield: "NEET PG / PLAB 1"
      },
      {
        title: "Polycystic Kidney Disease (ADPKD)",
        description: "Genetic disorder characterized by the growth of numerous cysts in the kidneys, leading to bilateral renal enlargement and eventual renal failure. Associated with berry aneurysms.",
        symptoms: ["Flank pain", "Hematuria", "Hypertension", "Palpable abdominal masses bilaterally"],
        examsYield: "USMLE Step 1 / INICET"
      }
    ],
    flashcard: {
      question: "A 6-year-old boy is brought to the pediatrician by his mother due to swelling of his face and ankles. Lab evaluation reveals urinalysis with 4+ protein, 24-hour urine collection showing 4.2g of protein, and serum albumin of 2.2 g/dL. Under light microscopy, the glomeruli appear normal. What is the most likely diagnosis?",
      options: [
        "Minimal change disease (Nephrotic syndrome)",
        "Post-streptococcal glomerulonephritis (Nephritic syndrome)",
        "Membranous nephropathy",
        "Diabetic nephropathy"
      ],
      answerIndex: 0,
      explanation: "Edema, massive proteinuria (>3.5g/day), and hypoalbuminemia (<3g/dL) define Nephrotic Syndrome. In children, the most common cause is Minimal Change Disease, which shows normal-appearing glomeruli under light microscopy, but podocyte effacement (foot process fusion) under electron microscopy."
    },
    coordinates3d: [18, 32, 12]
  },
  right_kidney: {
    id: "right_kidney",
    name: "Right Kidney & Nephrons",
    system: "urinary",
    description: "A bean-shaped retroperitoneal organ located on the right side of the vertebral column. It sits slightly lower than the left kidney because of displacement by the liver. It filters wastes and maintains fluid/electrolyte homeostasis.",
    highYieldNotes: [
      "The right kidney lies lower than the left (roughly T12 to L3/L4 level) due to the bulk of the liver above it.",
      "The right renal artery is longer than the left renal artery and passes posterior to the inferior vena cava.",
      "Renal blood flow accounts for 20-25% of cardiac output, filtering ~180 Liters of fluid daily."
    ],
    clinicalCorrelations: [
      {
        title: "Renal Artery Stenosis",
        description: "Narrowing of the renal artery, reducing perfusion to the kidney. Leads to hyperactivation of the Renin-Angiotensin-Aldosterone System (RAAS) and renovascular hypertension.",
        symptoms: ["Severe, refractory hypertension", "Abdominal bruit over renal arteries", "Unexplained kidney dysfunction after starting ACE inhibitors"],
        examsYield: "USMLE Step 2 CK"
      },
      {
        title: "Nephrolithiasis (Kidney Stones)",
        description: "Formation of crystalline stones in the renal pelvis. Most stones are composed of calcium oxalate.",
        symptoms: ["Severe colicky flank pain radiating to the groin", "Hematuria (blood in urine)", "Nausea and vomiting", "Dysuria"],
        examsYield: "NEET PG / FMGE / USMLE"
      }
    ],
    flashcard: {
      question: "A 42-year-old female is evaluated for severe, sudden-onset flank pain that radiates to her labia majora. Urinalysis demonstrates microscopic hematuria. A CT scan of the abdomen reveals a 4mm calcification in the right ureteropelvic junction. Which of the following is the most common chemical composition of this patient's condition?",
      options: [
        "Calcium oxalate",
        "Struvite (Ammonium magnesium phosphate)",
        "Uric acid",
        "Cystine"
      ],
      answerIndex: 0,
      explanation: "This patient is suffering from nephrolithiasis (kidney stones). Calcium oxalate is by far the most common composition of kidney stones (accounting for ~75-80% of cases). They typically present with sharp, colicky flank pain radiating to the groin (ureteric colic) and hematuria. Under microscopy, calcium oxalate crystals appear as envelope-shaped or octahedral."
    },
    coordinates3d: [-18, 32, 12]
  },
  bladder: {
    id: "bladder",
    name: "Urinary Bladder & Ureters",
    system: "urinary",
    description: "A hollow muscular organ situated in the pelvic cavity, posterior to the pubic symphysis. It functions as a temporary reservoir for urine, which is received from the kidneys via the ureters and discharged via the urethra.",
    highYieldNotes: [
      "Lined by transitional epithelium (urothelium), which allows it to stretch. Has a smooth muscle wall called the detrusor muscle.",
      "The trigone is a smooth triangular region at the base of the bladder, formed by the two ureteric orifices and the internal urethral orifice.",
      "Innervated by parasympathetic nerves (S2-S4, contracts detrusor for micturition) and sympathetic nerves (T11-L2, relaxes detrusor, contracts internal sphincter)."
    ],
    clinicalCorrelations: [
      {
        title: "Cystitis (Urinary Tract Infection)",
        description: "Inflammation of the urinary bladder, most commonly caused by ascending Escherichia coli infection. Much more common in females due to a shorter urethra.",
        symptoms: ["Dysuria (painful urination)", "Urgency and frequency", "Suprapubic tenderness", "Turbid or foul-smelling urine"],
        examsYield: "FMGE / NEET PG / PLAB 1"
      },
      {
        title: "Transitional Cell Carcinoma (Urothelial Cancer)",
        description: "The most common type of bladder cancer, strongly associated with cigarette smoking and occupational exposure to aniline dyes.",
        symptoms: ["Painless gross hematuria (key diagnostic sign)", "Frequency and urgency", "Weight loss in advanced stages"],
        examsYield: "USMLE Step 2 CK / NEET PG"
      }
    ],
    flashcard: {
      question: "A 62-year-old male presents to the clinic with painless gross hematuria for the past week. He has a 40 pack-year smoking history. A cystoscopy is performed, and a biopsy of a papillary bladder lesion reveals transitional cell carcinoma. Which of the following risk factors is most strongly associated with the development of this malignancy?",
      options: [
        "Cigarette smoking",
        "Chronic urinary tract infections",
        "Alcohol consumption",
        "Use of nonsteroidal anti-inflammatory drugs (NSAIDs)"
      ],
      answerIndex: 0,
      explanation: "Transitional Cell Carcinoma (urothelial carcinoma) is the most common bladder cancer. Cigarette smoking is the most significant risk factor, increasing risk by 3 to 4-fold. Other classic associations include industrial exposures to chemical dyes (naphthylamine, aniline dyes), cyclophosphamide use, and chronic cystitis."
    },
    coordinates3d: [0, 105, -8]
  },
  bones: {
    id: "bones",
    name: "Skeletal Frame (Femur & Bones)",
    system: "skeletal",
    description: "The rigid support system of the human body. Comprises bones, joints, and cartilage. It protects vital organs, stores minerals (calcium and phosphate), produces blood cells in the bone marrow, and provides levers for locomotion.",
    highYieldNotes: [
      "Osteoblasts arise from mesenchymal stem cells and build bone by secreting osteoid (alkaline phosphatase active).",
      "Osteoclasts are multinucleated cells derived from monocyte/macrophage lineage that resorb bone by secreting acid and acid hydrolases.",
      "The femoral neck is a key site of osteoporosis-related fractures and is prone to avascular necrosis due to disruption of the medial circumflex femoral artery."
    ],
    clinicalCorrelations: [
      {
        title: "Osteoporosis",
        description: "Metabolic bone disease characterized by loss of bone mass and deterioration of microarchitecture, leading to increased bone fragility.",
        symptoms: ["Asymptomatic until fracture", "Loss of height / kyphosis (Dowager's hump)", "Low-trauma fractures of hip, spine, or wrist", "T-score ≤ -2.5 on DEXA scan"],
        examsYield: "NEET PG / USMLE / FMGE"
      },
      {
        title: "Paget's Disease of Bone",
        description: "Disordered, localized bone remodeling characterized by excessive bone resorption followed by disorganized bone formation, resulting in weak, thickened bone.",
        symptoms: ["Bone pain", "Increased hat size / cranial nerve compression", "Bow legs", "Isolated elevation of alkaline phosphatase (ALP)"],
        examsYield: "USMLE Step 1 / INICET"
      }
    ],
    flashcard: {
      question: "A 71-year-old postmenopausal female presents to the clinic after slipping on ice and sustaining a fracture of her left femoral neck. Dual-energy X-ray absorptiometry (DEXA) of her hip reveals a bone mineral density T-score of -2.8. Which of the following is the most likely diagnosis?",
      options: [
        "Osteoporosis",
        "Osteopenia",
        "Osteomalacia",
        "Osteitis deformans"
      ],
      answerIndex: 0,
      explanation: "A DEXA T-score of -2.5 or lower defines osteoporosis. Values between -1.0 and -2.5 represent osteopenia. Osteoporosis leads to fragile bone architecture and is a leading cause of pathological fractures in elderly, postmenopausal women due to estrogen deficiency enhancing osteoclast activity."
    },
    coordinates3d: [22, 140, 0]
  },
  muscles: {
    id: "muscles",
    name: "Muscular System (Skeletal Muscles)",
    system: "muscular",
    description: "Skeletal muscles contract voluntarily to generate mechanical force and produce movement around joints, maintain posture, and generate body heat. They are composed of specialized contractile cells (myofibers).",
    highYieldNotes: [
      "Skeletal muscle fibers are multinucleated syncytia characterized by sarcomeres (repeating units of actin and myosin).",
      "Excitation-contraction coupling relies on action potentials traveling down T-tubules, triggering Ca2+ release from the sarcoplasmic reticulum via ryanodine receptors.",
      "Dystrophin is an intracellular protein that anchors the actin cytoskeleton to the extracellular matrix; mutations lead to muscular dystrophies."
    ],
    clinicalCorrelations: [
      {
        title: "Duchenne Muscular Dystrophy (DMD)",
        description: "X-linked recessive disorder caused by frameshift mutations in the dystrophin gene, leading to progressive muscle weakness, calf pseudohypertrophy, and dilated cardiomyopathy.",
        symptoms: ["Proximal muscle weakness", "Gowers' sign (using hands to climb up legs to stand)", "Waddling gait", "Pseudohypertrophy of calves (fatty replacement)"],
        examsYield: "NEET PG / USMLE Step 1"
      },
      {
        title: "Myasthenia Gravis",
        description: "Autoimmune disease characterized by antibodies against postsynaptic acetylcholine receptors at the neuromuscular junction, leading to muscle fatigability.",
        symptoms: ["Ptosis and diplopia (worse at the end of the day)", "Proximal muscle weakness", "Dysphagia", "Symptoms improve with rest or acetylcholinesterase inhibitors"],
        examsYield: "INICET / PLAB 1"
      }
    ],
    flashcard: {
      question: "A 4-year-old boy is brought to the clinic due to difficulty standing up. To stand from a sitting position, he must place his hands on his shins and push himself up his thighs (Gowers' sign). He also has marked hypertrophy of both calves. A muscle biopsy reveals absent staining for dystrophin. What is the inheritance pattern of this condition?",
      options: [
        "X-linked recessive",
        "Autosomal dominant",
        "Autosomal recessive",
        "Mitochondrial"
      ],
      answerIndex: 0,
      explanation: "Duchenne Muscular Dystrophy (DMD) is an X-linked recessive disorder caused by a deletion or mutation in the dystrophin gene on chromosome Xp21. Gowers' sign and calf pseudohypertrophy (which is muscle replaced by fat and connective tissue) are classic presentations in boys under 5 years old."
    },
    coordinates3d: [-24, 130, -10]
  }
};

// System configurations for display and coloring
const SYSTEM_CONFIG: Record<SystemType, {
  title: string;
  color: string;
  glowColor: string;
  textColor: string;
  accentColor: string;
  desc: string;
  badge: string;
  colorHex: string;
}> = {
  integumentary: {
    title: "Body Silhouette",
    color: "from-cyan-400 to-blue-500",
    glowColor: "rgba(6, 182, 212, 0.2)",
    textColor: "text-cyan-400 border-cyan-500/20 bg-cyan-500/10",
    accentColor: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10",
    desc: "3D Hologram wireframe structure.",
    badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    colorHex: "#06b6d4"
  },
  skeletal: {
    title: "Skeletal Frame",
    color: "from-slate-300 to-zinc-400",
    glowColor: "rgba(148, 163, 184, 0.3)",
    textColor: "text-slate-300 border-slate-500/20 bg-slate-500/10",
    accentColor: "border-slate-500/30 text-slate-300 bg-slate-500/10",
    desc: "Bones, spine, ribs, and pelvis.",
    badge: "bg-slate-500/20 text-slate-300 border-slate-500/30",
    colorHex: "#94a3b8"
  },
  muscular: {
    title: "Muscular System",
    color: "from-red-600 to-rose-700",
    glowColor: "rgba(225, 29, 72, 0.3)",
    textColor: "text-rose-400 border-rose-500/20 bg-rose-500/10",
    accentColor: "border-rose-500/30 text-rose-400 bg-rose-500/10",
    desc: "Deltoids, pectorals, abs, and quadriceps.",
    badge: "bg-rose-500/20 text-rose-300 border-rose-500/30",
    colorHex: "#e11d48"
  },
  nervous: {
    title: "Nervous System",
    color: "from-purple-500 to-indigo-500",
    glowColor: "rgba(139, 92, 246, 0.4)",
    textColor: "text-purple-400 border-purple-500/20 bg-purple-500/10",
    accentColor: "border-indigo-500/30 text-indigo-400 bg-indigo-500/10",
    desc: "Brain, spinal cord, and motor nerves.",
    badge: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    colorHex: "#8b5cf6"
  },
  cardiovascular: {
    title: "Cardiovascular",
    color: "from-red-500 to-rose-500",
    glowColor: "rgba(239, 68, 68, 0.4)",
    textColor: "text-red-400 border-red-500/20 bg-red-500/10",
    accentColor: "border-rose-500/30 text-rose-400 bg-rose-500/10",
    desc: "Heart, arterial flow, and venous networks.",
    badge: "bg-rose-500/20 text-rose-300 border-rose-500/30",
    colorHex: "#ef4444"
  },
  respiratory: {
    title: "Respiratory",
    color: "from-teal-500 to-cyan-500",
    glowColor: "rgba(20, 184, 166, 0.4)",
    textColor: "text-teal-400 border-teal-500/20 bg-teal-500/10",
    accentColor: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10",
    desc: "Trachea, bronchi, and lungs.",
    badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    colorHex: "#14b8a6"
  },
  digestive: {
    title: "Digestive Tract",
    color: "from-amber-500 to-orange-500",
    glowColor: "rgba(245, 158, 11, 0.4)",
    textColor: "text-amber-400 border-amber-500/20 bg-amber-500/10",
    accentColor: "border-orange-500/30 text-orange-400 bg-orange-500/10",
    desc: "Esophagus, stomach, and liver.",
    badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    colorHex: "#f59e0b"
  },
  urinary: {
    title: "Urinary System",
    color: "from-emerald-500 to-green-600",
    glowColor: "rgba(16, 185, 129, 0.3)",
    textColor: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10",
    accentColor: "border-green-500/30 text-green-400 bg-green-500/10",
    desc: "Kidneys, ureters, and bladder.",
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    colorHex: "#10b981"
  },
  lymphatic: {
    title: "Lymphatic Nodes",
    color: "from-lime-400 to-emerald-500",
    glowColor: "rgba(132, 204, 22, 0.25)",
    textColor: "text-lime-400 border-lime-500/20 bg-lime-500/10",
    accentColor: "border-lime-500/30 text-lime-400 bg-lime-500/10",
    desc: "Lymph nodes, vessels, and filters.",
    badge: "bg-lime-500/20 text-lime-300 border-lime-500/30",
    colorHex: "#84cc16"
  }
};

// Helper to parse Hex color to RGB
const parseHex = (hex: string) => {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
};

interface Mesh3D {
  id: string;
  system: SystemType;
  vertices: [number, number, number][];
  faces: { p0: number; p1: number; p2: number; p3?: number }[];
  color: string;
}

// Generate ellipsoid mesh with optional deformation
const generateEllipsoid = (
  cx: number, cy: number, cz: number,
  rx: number, ry: number, rz: number,
  numTheta: number, numPhi: number,
  organId: string,
  system: SystemType,
  color: string,
  deform?: (x: number, y: number, z: number, theta: number, phi: number) => [number, number, number]
): Mesh3D => {
  const vertices: [number, number, number][] = [];
  const faces: { p0: number; p1: number; p2: number; p3?: number }[] = [];

  for (let i = 0; i <= numTheta; i++) {
    const theta = (i * Math.PI) / numTheta;
    const sinTheta = Math.sin(theta);
    const cosTheta = Math.cos(theta);

    for (let j = 0; j < numPhi; j++) {
      const phi = (j * 2 * Math.PI) / numPhi;
      const sinPhi = Math.sin(phi);
      const cosPhi = Math.cos(phi);

      const x = rx * sinTheta * cosPhi;
      const y = ry * cosTheta;
      const z = rz * sinTheta * sinPhi;

      let pt: [number, number, number] = [x + cx, y + cy, z + cz];
      if (deform) {
        const dPt = deform(x, y, z, theta, phi);
        pt = [dPt[0] + cx, dPt[1] + cy, dPt[2] + cz];
      }
      vertices.push(pt);
    }
  }

  for (let i = 0; i < numTheta; i++) {
    for (let j = 0; j < numPhi; j++) {
      const p0 = i * numPhi + j;
      const p1 = i * numPhi + ((j + 1) % numPhi);
      const p2 = (i + 1) * numPhi + ((j + 1) % numPhi);
      const p3 = (i + 1) * numPhi + j;
      faces.push({ p0, p1, p2, p3 });
    }
  }

  return { id: organId, system, vertices, faces, color };
};

// Generate cylinder mesh
const generateCylinder = (
  p1: [number, number, number],
  p2: [number, number, number],
  r1: number,
  r2: number,
  numSegments: number,
  organId: string,
  system: SystemType,
  color: string
): Mesh3D => {
  const vertices: [number, number, number][] = [];
  const faces: { p0: number; p1: number; p2: number; p3?: number }[] = [];

  const dx = p2[0] - p1[0];
  const dy = p2[1] - p1[1];
  const dz = p2[2] - p1[2];
  const len = Math.sqrt(dx*dx + dy*dy + dz*dz);
  if (len === 0) return { id: organId, system, vertices, faces, color };

  const ux = dx / len;
  const uy = dy / len;
  const uz = dz / len;

  let ax = 1, ay = 0, az = 0;
  if (Math.abs(ux) > 0.9) {
    ax = 0; ay = 1; az = 0;
  }
  
  const wx = uy * az - uz * ay;
  const wy = uz * ax - ux * az;
  const wz = ux * ay - uy * ax;
  const wlen = Math.sqrt(wx*wx + wy*wy + wz*wz);
  const vx = wx / wlen;
  const vy = wy / wlen;
  const vz = wz / wlen;

  const nx = uy * vz - uz * vy;
  const ny = uz * vx - ux * vz;
  const nz = ux * vy - uy * vx;

  const numSteps = 4;
  for (let s = 0; s <= numSteps; s++) {
    const t = s / numSteps;
    const flare = 1.0 + 0.35 * Math.pow(2 * t - 1, 4);
    const r = (r1 + (r2 - r1) * t) * flare;
    const cx = p1[0] + dx * t;
    const cy = p1[1] + dy * t;
    const cz = p1[2] + dz * t;

    for (let i = 0; i < numSegments; i++) {
      const angle = (i * 2 * Math.PI) / numSegments;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      const px = cx + r * (vx * cosA + nx * sinA);
      const py = cy + r * (vy * cosA + ny * sinA);
      const pz = cz + r * (vz * cosA + nz * sinA);

      vertices.push([px, py, pz]);
    }
  }

  for (let s = 0; s < numSteps; s++) {
    for (let i = 0; i < numSegments; i++) {
      const p0 = s * numSegments + i;
      const p1 = s * numSegments + ((i + 1) % numSegments);
      const p2 = (s + 1) * numSegments + ((i + 1) % numSegments);
      const p3 = (s + 1) * numSegments + i;
      faces.push({ p0, p1, p2, p3 });
    }
  }

  return { id: organId, system, vertices, faces, color };
};

// Generate sweep mesh along points (for ribs, blood vessels, nerves, intestines)
const generateSweep = (
  points: [number, number, number][],
  radius: number,
  numSegments: number,
  organId: string,
  system: SystemType,
  color: string
): Mesh3D => {
  const vertices: [number, number, number][] = [];
  const faces: { p0: number; p1: number; p2: number; p3?: number }[] = [];

  if (points.length < 2) return { id: organId, system, vertices, faces, color };

  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    let tx = 0, ty = 1, tz = 0;
    if (i === 0) {
      tx = points[1][0] - p[0];
      ty = points[1][1] - p[1];
      tz = points[1][2] - p[2];
    } else if (i === points.length - 1) {
      tx = p[0] - points[i - 1][0];
      ty = p[1] - points[i - 1][1];
      tz = p[2] - points[i - 1][2];
    } else {
      tx = points[i + 1][0] - points[i - 1][0];
      ty = points[i + 1][1] - points[i - 1][1];
      tz = points[i + 1][2] - points[i - 1][2];
    }
    const len = Math.sqrt(tx*tx + ty*ty + tz*tz);
    const ux = len === 0 ? 0 : tx / len;
    const uy = len === 0 ? 1 : ty / len;
    const uz = len === 0 ? 0 : tz / len;

    let ax = 1, ay = 0, az = 0;
    if (Math.abs(ux) > 0.9) {
      ax = 0; ay = 1; az = 0;
    }
    const wx = uy * az - uz * ay;
    const wy = uz * ax - ux * az;
    const wz = ux * ay - uy * ax;
    const wlen = Math.sqrt(wx*wx + wy*wy + wz*wz);
    const vx = wx / wlen;
    const vy = wy / wlen;
    const vz = wz / wlen;

    const nx = uy * vz - uz * vy;
    const ny = uz * vx - ux * vz;
    const nz = ux * vy - uy * vx;

    for (let j = 0; j < numSegments; j++) {
      const angle = (j * 2 * Math.PI) / numSegments;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      const px = p[0] + radius * (vx * cosA + nx * sinA);
      const py = p[1] + radius * (vy * cosA + ny * sinA);
      const pz = p[2] + radius * (vz * cosA + nz * sinA);

      vertices.push([px, py, pz]);
    }
  }

  for (let i = 0; i < points.length - 1; i++) {
    for (let j = 0; j < numSegments; j++) {
      const p0 = i * numSegments + j;
      const p1 = i * numSegments + ((j + 1) % numSegments);
      const p2 = (i + 1) * numSegments + ((j + 1) % numSegments);
      const p3 = (i + 1) * numSegments + i;
      faces.push({ p0, p1, p2, p3 });
    }
  }

  return { id: organId, system, vertices, faces, color };
};

// Convert body rings to mesh format
const convertRingsToMesh = (
  rings: [number, number, number][][],
  organId: string,
  system: SystemType,
  color: string
): Mesh3D => {
  const vertices: [number, number, number][] = [];
  const faces: { p0: number; p1: number; p2: number; p3?: number }[] = [];

  rings.forEach(ring => {
    ring.forEach(pt => {
      vertices.push(pt);
    });
  });

  const numPoints = rings[0].length;
  for (let j = 0; j < rings.length - 1; j++) {
    for (let i = 0; i < numPoints; i++) {
      const p0 = j * numPoints + i;
      const p1 = j * numPoints + ((i + 1) % numPoints);
      const p2 = (j + 1) * numPoints + ((i + 1) % numPoints);
      const p3 = (j + 1) * numPoints + i;
      faces.push({ p0, p1, p2, p3 });
    }
  }

  return { id: organId, system, vertices, faces, color };
};

// Generates 3D contour lines of human body structure
const generateBodyWireframe = (isFemale: boolean) => {
  const ringDefs = [
    { y: -165, rx: 21, rz: 21 }, // Head top
    { y: -145, rx: 25, rz: 25 }, // Head mid
    { y: -125, rx: 19, rz: 19 }, // Head base
    { y: -110, rx: 12, rz: 12 }, // Neck
    { y: -90, rx: isFemale ? 45 : 53, rz: 20 }, // Shoulders
    { y: -65, rx: isFemale ? 42 : 49, rz: 23 }, // Chest top
    { y: -40, rx: isFemale ? 39 : 45, rz: 22 }, // Chest mid
    { y: -15, rx: isFemale ? 31 : 38, rz: 18 }, // Waist
    { y: 15, rx: isFemale ? 30 : 36, rz: 18 },  // Lower Waist
    { y: 45, rx: isFemale ? 44 : 39, rz: 24 },  // Hips top
    { y: 70, rx: isFemale ? 48 : 42, rz: 27 },  // Hips mid
    { y: 95, rx: isFemale ? 40 : 36, rz: 22 },  // Hips base
  ];

  const torso: [number, number, number][][] = [];
  
  ringDefs.forEach(def => {
    const ringPoints: [number, number, number][] = [];
    const numPoints = 12;
    for (let i = 0; i < numPoints; i++) {
      const angle = (i * 2 * Math.PI) / numPoints;
      let rx = def.rx;
      let rz = def.rz;
      
      // Female breast shape modulation in the front (z < 0)
      if (isFemale && def.y === -40) {
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle); // Front is negative Z
        if (sinA < -0.3 && Math.abs(cosA) > 0.3) {
          rz = rz * 1.35;
        }
      }

      ringPoints.push([
        rx * Math.cos(angle),
        def.y,
        rz * Math.sin(angle)
      ]);
    }
    torso.push(ringPoints);
  });

  const leftLegDefs = [
    { y: 115, cx: -15, rx: 14, rz: 14 },
    { y: 155, cx: -15, rx: 12, rz: 12 },
    { y: 195, cx: -14, rx: 10, rz: 10 },
    { y: 225, cx: -14, rx: 7, rz: 7 },   // Knee
    { y: 255, cx: -13, rx: 9, rz: 9 },
    { y: 295, cx: -13, rx: 7, rz: 7 },
    { y: 325, cx: -13, rx: 5, rz: 5 },   // Ankle
  ];

  const rightLegDefs = leftLegDefs.map(def => ({ ...def, cx: -def.cx }));

  const leftLeg: [number, number, number][][] = [];
  const rightLeg: [number, number, number][][] = [];

  leftLegDefs.forEach(def => {
    const ringPoints: [number, number, number][] = [];
    const numPoints = 8;
    for (let i = 0; i < numPoints; i++) {
      const angle = (i * 2 * Math.PI) / numPoints;
      ringPoints.push([
        def.cx + def.rx * Math.cos(angle),
        def.y,
        def.rz * Math.sin(angle)
      ]);
    }
    leftLeg.push(ringPoints);
  });

  rightLegDefs.forEach(def => {
    const ringPoints: [number, number, number][] = [];
    const numPoints = 8;
    for (let i = 0; i < numPoints; i++) {
      const angle = (i * 2 * Math.PI) / numPoints;
      ringPoints.push([
        def.cx + def.rx * Math.cos(angle),
        def.y,
        def.rz * Math.sin(angle)
      ]);
    }
    rightLeg.push(ringPoints);
  });

  // Generate left and right arm rings
  const leftArmRings: [number, number, number][][] = [];
  const rightArmRings: [number, number, number][][] = [];
  const numArmRings = 6;
  const numPointsPerRing = 8;

  for (let r = 0; r < numArmRings; r++) {
    const t = r / (numArmRings - 1);
    
    // Left arm center interpolation from shoulder to hand
    const lacx = -52 + (-72 - -52) * t;
    const lacy = -80 + (45 - -80) * t;
    const lacz = 0 + (8 - 0) * t;
    const lRadius = 11 - t * 4; // tapers from shoulder (11) to wrist (7)

    // Right arm center interpolation
    const racx = 52 + (72 - 52) * t;
    const racy = -80 + (45 - -80) * t;
    const racz = 0 + (8 - 0) * t;
    const rRadius = 11 - t * 4;

    const leftRing: [number, number, number][] = [];
    const rightRing: [number, number, number][] = [];

    for (let i = 0; i < numPointsPerRing; i++) {
      const angle = (i * 2 * Math.PI) / numPointsPerRing;
      leftRing.push([
        lacx + lRadius * Math.cos(angle),
        lacy,
        lacz + lRadius * Math.sin(angle)
      ]);
      rightRing.push([
        racx + rRadius * Math.cos(angle),
        racy,
        racz + rRadius * Math.sin(angle)
      ]);
    }

    leftArmRings.push(leftRing);
    rightArmRings.push(rightRing);
  }

  return { torso, leftLeg, rightLeg, leftArm: leftArmRings, rightArm: rightArmRings };
};

export default function AnatomyViewer() {
  // Navigation and State Settings
  const [isFemale, setIsFemale] = useState(true);
  const [selectedSystem, setSelectedSystem] = useState<SystemType>("cardiovascular");
  const [selectedPartId, setSelectedPartId] = useState<string>("heart");
  const [mode, setMode] = useState<ModeType>("study");
  const [quizMode, setQuizMode] = useState<QuizModeType>("mcq");
  const [searchQuery, setSearchQuery] = useState("");
  
  // 3D Navigation Coordinates
  const [yaw, setYaw] = useState(15);      // Y-axis orbit
  const [pitch, setPitch] = useState(0);    // X-axis tilt
  const [zoom, setZoom] = useState(1.1);
  const [panY, setPanY] = useState(25);     // Vertical displacement
  
  // Floating Action Tools
  const [activeTool, setActiveTool] = useState<ToolType>("orbit");
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  // System Layer Opacity States (0 to 100)
  const [opacities, setOpacities] = useState<Record<SystemType, number>>({
    integumentary: 15,
    skeletal: 30,
    muscular: 10,
    nervous: 40,
    cardiovascular: 100,
    respiratory: 25,
    digestive: 20,
    urinary: 20,
    lymphatic: 10,
  });

  // Dissection states (Hidden elements)
  const [dissectedOrgans, setDissectedOrgans] = useState<string[]>([]);
  const [isolatedOrganId, setIsolatedOrganId] = useState<string | null>(null);
  const [hoveredOrganId, setHoveredOrganId] = useState<string | null>(null);
  const [xrayMode, setXrayMode] = useState(false);

  // Drawing Canvas references
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPainting, setIsPainting] = useState(false);
  const [penColor, setPenColor] = useState("#facc15"); // neon yellow
  const [penSize, setPenSize] = useState(3);
  const [isEraser, setIsEraser] = useState(false);

  // MCQ Quiz states
  const [mcqAnswer, setMcqAnswer] = useState<number | null>(null);
  const [mcqSubmitted, setMcqSubmitted] = useState(false);
  const [mcqShowExpl, setMcqShowExpl] = useState(false);

  // Structure Hunt Quiz states
  const [huntOrganId, setHuntOrganId] = useState<string | null>(null);
  const [huntStatus, setHuntStatus] = useState<"searching" | "correct" | "incorrect" | "failed" | null>(null);
  const [huntFeedback, setHuntFeedback] = useState("");
  const [huntScore, setHuntScore] = useState(0);
  const [huntTotal, setHuntTotal] = useState(0);

  // Animation cycle ticks (breathing & heartbeat)
  const [time, setTime] = useState(0);
  const [autoRotate, setAutoRotate] = useState(false);

  // Track system expand in the sidebar
  const [systemsExpanded, setSystemsExpanded] = useState<Record<string, boolean>>({
    nervous: true,
    cardiovascular: true,
    respiratory: true,
    digestive: true,
    urinary: true,
    skeletal: true,
    muscular: true,
  });

  // Tick timer for physiological animations (breathing & pulsing)
  useEffect(() => {
    let animationFrameId: number;
    const tick = () => {
      setTime(prev => (prev + 0.04) % (Math.PI * 2));
      
      // Auto rotate if activated
      if (autoRotate && activeTool === "orbit") {
        setYaw(prev => (prev + 0.5) % 360);
      }
      
      animationFrameId = requestAnimationFrame(tick);
    };
    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, [autoRotate, activeTool]);

  // Adjust canvas size to match layout viewport
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update selected structures when active system changes
  const activeOrgan = useMemo(() => {
    return ANATOMICAL_DATABASE[selectedPartId] || ANATOMICAL_DATABASE.heart;
  }, [selectedPartId]);

  // Search filter matches
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return Object.values(ANATOMICAL_DATABASE).filter(organ => {
      return (
        organ.name.toLowerCase().includes(query) ||
        organ.description.toLowerCase().includes(query) ||
        organ.highYieldNotes.some(note => note.toLowerCase().includes(query)) ||
        organ.clinicalCorrelations.some(corr => 
          corr.title.toLowerCase().includes(query) || 
          corr.description.toLowerCase().includes(query)
        )
      );
    });
  }, [searchQuery]);

  // 3D Perspective Projection Function
  const project = (x: number, y: number, z: number) => {
    const radYaw = (yaw * Math.PI) / 180;
    const radPitch = (pitch * Math.PI) / 180;

    // 1. Rotate around Y axis (Yaw)
    let x1 = x * Math.cos(radYaw) - z * Math.sin(radYaw);
    let z1 = x * Math.sin(radYaw) + z * Math.cos(radYaw);

    // 2. Rotate around X axis (Pitch)
    let y2 = y * Math.cos(radPitch) - z1 * Math.sin(radPitch);
    let z2 = y * Math.sin(radPitch) + z1 * Math.cos(radPitch);

    // 3. Perspective Projection
    const dist = 320; 
    const scaleFactor = dist / (dist + z2);

    // Coordinate offset (Center of viewport is around [220, 240])
    const px = 220 + x1 * scaleFactor * zoom;
    const py = 240 + y2 * scaleFactor * zoom + panY;

    return { x: px, y: py, depth: z2 };
  };

  // Convert an array of 3D points into a projected SVG Path string
  const getPathString = (points: [number, number, number][]) => {
    const projected = points.map(pt => project(pt[0], pt[1], pt[2]));
    return "M " + projected.map(p => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" L ") + " Z";
  };

  // Drag handler for rotate/pan actions
  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if (activeTool !== "orbit" && activeTool !== "pan") return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStart.current.x;
    const deltaY = e.clientY - dragStart.current.y;
    dragStart.current = { x: e.clientX, y: e.clientY };

    if (activeTool === "orbit") {
      setYaw(prev => (prev + deltaX * 0.6) % 360);
      setPitch(prev => Math.max(-45, Math.min(45, prev - deltaY * 0.6)));
    } else if (activeTool === "pan") {
      setPanY(prev => prev + deltaY * 0.8);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Toggle organ dissection (hiding)
  const toggleDissection = (id: string) => {
    if (dissectedOrgans.includes(id)) {
      setDissectedOrgans(prev => prev.filter(orgId => orgId !== id));
    } else {
      setDissectedOrgans(prev => [...prev, id]);
      if (selectedPartId === id) {
        // Clear active selection if dissected
        const remaining = Object.keys(ANATOMICAL_DATABASE).find(orgId => !dissectedOrgans.includes(orgId) && orgId !== id);
        if (remaining) handleSelectOrgan(remaining);
      }
    }
  };

  // Select organ hotspot
  const handleSelectOrgan = (organId: string) => {
    if (dissectedOrgans.includes(organId)) return;
    
    // Zoom focus onto coordinates
    const organ = ANATOMICAL_DATABASE[organId];
    if (organ) {
      setSelectedPartId(organId);
      setSelectedSystem(organ.system);
      
      // Auto adjust camera position to focus organ
      setPanY(-organ.coordinates3d[1] * zoom + 120);

      // In Structure Hunt mode, grade user selection
      if (mode === "exam" && quizMode === "hunt" && huntStatus === "searching") {
        gradeStructureHunt(organId);
      } else {
        // Reset quiz components
        setMcqAnswer(null);
        setMcqSubmitted(false);
        setMcqShowExpl(false);
      }
    }
  };

  const handleSystemVisibilityToggle = (sys: SystemType) => {
    setOpacities(prev => ({
      ...prev,
      [sys]: prev[sys] > 0 ? 0 : 100
    }));
  };

  const handleSystemOpacityChange = (sys: SystemType, val: number) => {
    setOpacities(prev => ({
      ...prev,
      [sys]: val
    }));
  };

  // ----------------------------------------------------
  // HTML5 Drawing Overlay Logic
  // ----------------------------------------------------
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (activeTool !== "draw") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsPainting(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isPainting || activeTool !== "draw") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.strokeStyle = isEraser ? "rgba(0,0,0,1)" : penColor;
    ctx.lineWidth = penSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    
    if (isEraser) {
      ctx.globalCompositeOperation = "destination-out";
    } else {
      ctx.globalCompositeOperation = "source-over";
    }
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsPainting(false);
  };

  const clearDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // ----------------------------------------------------
  // Quiz and Interactive Examination Logic
  // ----------------------------------------------------
  const submitMcq = (idx: number) => {
    if (mcqSubmitted) return;
    setMcqAnswer(idx);
    setMcqSubmitted(true);
    setMcqShowExpl(true);
  };

  const startNewStructureHunt = () => {
    // Select a non-dissected organ from database
    const available = Object.keys(ANATOMICAL_DATABASE);
    const randId = available[Math.floor(Math.random() * available.length)];
    
    // Auto-reveal the system so they can find it
    const targetOrgan = ANATOMICAL_DATABASE[randId];
    setOpacities(prev => ({
      ...prev,
      [targetOrgan.system]: Math.max(prev[targetOrgan.system], 50)
    }));

    setHuntOrganId(randId);
    setHuntStatus("searching");
    setHuntFeedback(`Locate and select the ${ANATOMICAL_DATABASE[randId].name}. (Hint: Use rotate, adjust opacity controls, and click the correct glowing target node!)`);
  };

  const gradeStructureHunt = (clickedId: string) => {
    if (clickedId === huntOrganId) {
      setHuntStatus("correct");
      setHuntScore(prev => prev + 1);
      setHuntTotal(prev => prev + 1);
      setHuntFeedback(`Correct! You successfully identified the ${ANATOMICAL_DATABASE[huntOrganId].name}. High Yield Fact: ${ANATOMICAL_DATABASE[huntOrganId].highYieldNotes[0]}`);
    } else {
      setHuntStatus("incorrect");
      setHuntTotal(prev => prev + 1);
      setHuntFeedback(`Incorrect. You clicked the ${ANATOMICAL_DATABASE[clickedId].name}. The correct organ was the ${ANATOMICAL_DATABASE[huntOrganId!].name}. Try again or start a new hunt!`);
    }
  };

  // Reset Camera settings
  const resetCamera = () => {
    setYaw(15);
    setPitch(0);
    setZoom(1.1);
    setPanY(25);
    setIsolatedOrganId(null);
  };

  // ----------------------------------------------------
  // Hologram 3D-ish Engine Mesh Generation
  // ----------------------------------------------------
  const wireframeData = useMemo(() => {
    return generateBodyWireframe(isFemale);
  }, [isFemale]);

  // Depth sorting render elements for occlusion rendering
  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const depthSortedElements = useMemo(() => {
    const elements: { depth: number; element: React.JSX.Element }[] = [];

    // Helper to rotate normal vectors into camera space
    const rotateVector = (vx: number, vy: number, vz: number) => {
      const radYaw = (yaw * Math.PI) / 180;
      const radPitch = (pitch * Math.PI) / 180;

      // Rotate around Y axis (Yaw)
      const x1 = vx * Math.cos(radYaw) - vz * Math.sin(radYaw);
      const z1 = vx * Math.sin(radYaw) + vz * Math.cos(radYaw);

      // Rotate around X axis (Pitch)
      const y2 = vy * Math.cos(radPitch) - z1 * Math.sin(radPitch);
      const z2 = vy * Math.sin(radPitch) + z1 * Math.cos(radPitch);

      return { x: x1, y: y2, z: z2 };
    };

    // Helper to calculate the 3D unit normal of a face
    const getFaceNormal = (
      p0: [number, number, number], 
      p1: [number, number, number], 
      p2: [number, number, number]
    ) => {
      const ux = p1[0] - p0[0];
      const uy = p1[1] - p0[1];
      const uz = p1[2] - p0[2];
      
      const vx = p2[0] - p0[0];
      const vy = p2[1] - p0[1];
      const vz = p2[2] - p0[2];
      
      const nx = uy * vz - uz * vy;
      const ny = uz * vx - ux * vz;
      const nz = ux * vy - uy * vx;
      
      const len = Math.sqrt(nx*nx + ny*ny + nz*nz);
      if (len === 0) return { x: 0, y: 0, z: 0 };
      return { x: nx / len, y: ny / len, z: nz / len };
    };

    // Collect all visible meshes
    const meshes: Mesh3D[] = [];

    // 1. INTEGUMENTARY (Skin/Silhouette)
    if (opacities.integumentary > 0) {
      const skinColor = isFemale ? "#06b6d4" : "#2563eb";
      meshes.push(convertRingsToMesh(wireframeData.torso, "skin", "integumentary", skinColor));
      meshes.push(convertRingsToMesh(wireframeData.leftLeg, "skin", "integumentary", skinColor));
      meshes.push(convertRingsToMesh(wireframeData.rightLeg, "skin", "integumentary", skinColor));
      meshes.push(convertRingsToMesh(wireframeData.leftArm, "skin", "integumentary", skinColor));
      meshes.push(convertRingsToMesh(wireframeData.rightArm, "skin", "integumentary", skinColor));
    }

    // 2. SKELETAL SYSTEM
    if (opacities.skeletal > 0) {
      // Skull
      meshes.push(generateEllipsoid(0, -145, 0, 20, 21, 20, 10, 12, "skull", "skeletal", "#e2e8f0"));
      // Jaw
      meshes.push(generateEllipsoid(0, -128, -6, 14, 12, 12, 8, 10, "skull", "skeletal", "#eae6df", (x, y, z) => {
        const factor = (y + 12) / 24;
        return [x * (1 - factor * 0.4), y, z + factor * 2];
      }));

      // Spine
      for (let i = 0; i < 18; i++) {
        const spineY = -110 + i * 10;
        const spineZ = 16 - i * 0.1;
        meshes.push(generateCylinder([0, spineY - 3, spineZ], [0, spineY + 3, spineZ], 5, 5, 6, "spine", "skeletal", "#e2e8f0"));
      }

      // Ribcage
      for (let i = 0; i < 7; i++) {
        const ribY = -90 + i * 7.5;
        const leftRibPoints: [number, number, number][] = [
          [0, ribY, 15],
          [-22 - i * 1.5, ribY + 2, 8],
          [-32 - i * 1.0, ribY + 5, -5],
          [0, ribY + 10, -18]
        ];
        const rightRibPoints: [number, number, number][] = [
          [0, ribY, 15],
          [22 + i * 1.5, ribY + 2, 8],
          [32 + i * 1.0, ribY + 5, -5],
          [0, ribY + 10, -18]
        ];
        meshes.push(generateSweep(leftRibPoints, 1.2, 4, "ribcage", "skeletal", "#e2e8f0"));
        meshes.push(generateSweep(rightRibPoints, 1.2, 4, "ribcage", "skeletal", "#e2e8f0"));
      }

      // Pelvis
      meshes.push(generateEllipsoid(0, 75, 8, 30, 15, 18, 10, 12, "pelvis", "skeletal", "#e2e8f0", (x, y, z) => {
        let dy = y;
        const distFromCenter = Math.sqrt(x*x + z*z);
        if (distFromCenter < 18) {
          dy += (18 - distFromCenter) * 0.6;
        }
        return [x, dy, z];
      }));

      // Clavicles
      meshes.push(generateCylinder([-4, -98, -12], [-45, -92, -5], 2, 2, 4, "clavicle", "skeletal", "#e2e8f0"));
      meshes.push(generateCylinder([4, -98, -12], [45, -92, -5], 2, 2, 4, "clavicle", "skeletal", "#e2e8f0"));

      // Limb bones
      const bonesDefs = [
        { name: "l-humerus", p1: [-48, -86, 0] as [number, number, number], p2: [-58, -20, 4] as [number, number, number] },
        { name: "l-radius", p1: [-58, -16, 4] as [number, number, number], p2: [-68, 40, 8] as [number, number, number] },
        { name: "r-humerus", p1: [48, -86, 0] as [number, number, number], p2: [58, -20, 4] as [number, number, number] },
        { name: "r-radius", p1: [58, -16, 4] as [number, number, number], p2: [68, 40, 8] as [number, number, number] },
        { name: "l-femur", p1: [-16, 95, 5] as [number, number, number], p2: [-14, 210, 0] as [number, number, number] },
        { name: "l-tibia", p1: [-14, 215, 0] as [number, number, number], p2: [-14, 310, -5] as [number, number, number] },
        { name: "r-femur", p1: [16, 95, 5] as [number, number, number], p2: [14, 210, 0] as [number, number, number] },
        { name: "r-tibia", p1: [14, 215, 0] as [number, number, number], p2: [14, 310, -5] as [number, number, number] }
      ];
      bonesDefs.forEach(bone => {
        meshes.push(generateCylinder(bone.p1, bone.p2, 3.5, 3.5, 6, "skeletal-bones", "skeletal", "#e2e8f0"));
      });
    }

    // 3. MUSCULAR SYSTEM
    if (opacities.muscular > 0) {
      // Pectorals
      meshes.push(generateEllipsoid(-18, -62, -15, 16, 12, 6, 8, 10, "pectorals", "muscular", "#f43f5e"));
      meshes.push(generateEllipsoid(18, -62, -15, 16, 12, 6, 8, 10, "pectorals", "muscular", "#f43f5e"));

      // Abdominals (6 pack!)
      meshes.push(generateEllipsoid(0, 10, -16, 14, 34, 5, 10, 12, "abs", "muscular", "#f43f5e", (x, y, z) => {
        let dz = z;
        const segment = Math.sin(y * 0.25);
        if (segment > 0.8 || segment < -0.8) {
          dz += 1.5;
        } else {
          dz -= 1.0;
        }
        return [x, y, dz];
      }));

      // Quads
      meshes.push(generateCylinder([-18, 105, -5], [-17, 205, -3], 8, 7, 6, "muscles", "muscular", "#f43f5e"));
      meshes.push(generateCylinder([18, 105, -5], [17, 205, -3], 8, 7, 6, "muscles", "muscular", "#f43f5e"));
    }

    // 4. RESPIRATORY SYSTEM
    if (opacities.respiratory > 0) {
      const breathingScale = 1 + Math.sin(time) * 0.05;
      
      // Left Lung
      meshes.push(generateEllipsoid(18, -42, -8, 12 * breathingScale, 24 * breathingScale, 12 * breathingScale, 10, 12, "left_lung", "respiratory", "#2dd4bf", (x, y, z) => {
        let dx = x;
        if (x < 2) dx = 2 + (x - 2) * 0.3;
        if (x < 4 && y > -10 && y < 15 && z < 0) dx += 3;
        return [dx, y, z];
      }));

      // Right Lung
      meshes.push(generateEllipsoid(-18, -42, -8, 13 * breathingScale, 24 * breathingScale, 13 * breathingScale, 10, 12, "right_lung", "respiratory", "#2dd4bf", (x, y, z) => {
        let dx = x;
        if (x > -2) dx = -2 + (x + 2) * 0.3;
        return [dx, y, z];
      }));

      // Trachea & Bronchi
      meshes.push(generateCylinder([0, -95, -12], [0, -58, -12], 3, 3, 6, "trachea", "respiratory", "#94a3b8"));
      meshes.push(generateCylinder([0, -58, -12], [14, -46, -10], 2, 1.8, 4, "trachea", "respiratory", "#94a3b8"));
      meshes.push(generateCylinder([0, -58, -12], [-14, -46, -10], 2, 1.8, 4, "trachea", "respiratory", "#94a3b8"));
    }

    // 5. CARDIOVASCULAR SYSTEM
    if (opacities.cardiovascular > 0) {
      const heartbeat = 1 + (Math.sin(time * 2.5) > 0.3 ? Math.sin(time * 2.5) * 0.08 : 0);
      
      // Heart
      meshes.push(generateEllipsoid(-6, -45, -12, 11 * heartbeat, 15 * heartbeat, 11 * heartbeat, 10, 12, "heart", "cardiovascular", "#ef4444", (x, y, z) => {
        const factor = (y + 15) / 30;
        const scale = 1.0 - factor * 0.4;
        let dx = x * scale + factor * 4;
        let dz = z * scale - factor * 2;
        return [dx, y, dz];
      }));

      // Aorta Arch
      const aortaPoints: [number, number, number][] = [
        [-6, -45, -12],
        [-3, -56, -11],
        [3, -58, -10],
        [0, -50, -8],
        [0, 20, -10]
      ];
      meshes.push(generateSweep(aortaPoints, 2.5, 4, "heart", "cardiovascular", "#ef4444"));

      // Vena Cava
      const vcPoints: [number, number, number][] = [
        [-12, -75, -10],
        [-12, -45, -10],
        [-12, 20, -10]
      ];
      meshes.push(generateSweep(vcPoints, 2.4, 4, "heart", "cardiovascular", "#3b82f6"));

      // Major Arteries & Veins
      const arteryPaths: [number, number, number][][] = [
        [[-4, -90, -10], [-35, -84, -6], [-55, -20, 0]],
        [[4, -90, -10], [35, -84, -6], [55, -20, 0]],
        [[-2, 15, -10], [-15, 80, 0], [-14, 210, -2]],
        [[2, 15, -10], [15, 80, 0], [14, 210, -2]],
        [[-6, -58, -11], [-18, -135, -6]],
        [[0, -58, -10], [18, -135, -6]]
      ];
      arteryPaths.forEach((path, idx) => {
        meshes.push(generateSweep(path, 1.2, 4, "arteries", "cardiovascular", "#ef4444"));
      });

      const veinPaths: [number, number, number][][] = [
        [[-12, -90, -10], [-38, -84, -6], [-58, -20, 0]],
        [[12, -90, -10], [38, -84, -6], [58, -20, 0]],
        [[-10, 15, -10], [-18, 80, 0], [-16, 210, -2]],
        [[10, 15, -10], [18, 80, 0], [16, 210, -2]],
        [[-10, -58, -11], [-20, -135, -6]],
        [[2, -58, -10], [20, -135, -6]]
      ];
      veinPaths.forEach((path, idx) => {
        meshes.push(generateSweep(path, 1.0, 4, "veins", "cardiovascular", "#3b82f6"));
      });
    }

    // 6. DIGESTIVE SYSTEM
    if (opacities.digestive > 0) {
      // Liver
      meshes.push(generateEllipsoid(-16, 5, -10, 18, 10, 12, 10, 12, "liver", "digestive", "#c2410c", (x, y, z) => {
        const factor = (x + 18) / 36;
        const hScale = 1.0 - factor * 0.65;
        const dScale = 1.0 - factor * 0.5;
        return [x, y * hScale, z * dScale];
      }));

      // Stomach
      meshes.push(generateEllipsoid(12, 10, -8, 14, 14, 10, 10, 12, "stomach", "digestive", "#f59e0b", (x, y, z) => {
        const factor = (y + 14) / 28;
        let dx = x + Math.sin(factor * Math.PI) * 12 - factor * 6;
        const scale = 0.5 + Math.sin(factor * Math.PI) * 0.8;
        return [dx * scale, y, z * scale];
      }));

      // Intestines
      const intestinePoints: [number, number, number][] = [];
      for (let t = 0; t < 30; t++) {
        const angle = t * 2.5;
        const r = 8 + Math.sin(t * 0.5) * 4;
        const x = r * Math.cos(angle);
        const y = 30 + t * 1.1;
        const z = -6 + r * Math.sin(angle) * 0.5;
        intestinePoints.push([x, y, z]);
      }
      meshes.push(generateSweep(intestinePoints, 4, 5, "intestines", "digestive", "#f97316"));
    }

    // 7. URINARY SYSTEM
    if (opacities.urinary > 0) {
      // Left Kidney
      meshes.push(generateEllipsoid(18, 32, 12, 6, 9, 5, 8, 10, "left_kidney", "urinary", "#10b981", (x, y, z) => {
        let dx = x;
        if (x < 0) dx *= 0.6;
        return [dx, y, z];
      }));

      // Right Kidney
      meshes.push(generateEllipsoid(-18, 32, 12, 6, 9, 5, 8, 10, "right_kidney", "urinary", "#10b981", (x, y, z) => {
        let dx = x;
        if (x > 0) dx *= 0.6;
        return [dx, y, z];
      }));

      // Bladder
      meshes.push(generateEllipsoid(0, 105, -8, 9, 8, 9, 8, 10, "bladder", "urinary", "#34d399", (x, y, z) => {
        let dy = y;
        if (y < 0) dy *= 0.8;
        return [x, dy, z];
      }));
    }

    // 8. NERVOUS SYSTEM
    if (opacities.nervous > 0) {
      // Brain
      meshes.push(generateEllipsoid(0, -145, 0, 17, 14, 18, 12, 14, "brain", "nervous", "#c084fc", (x, y, z, theta, phi) => {
        const w = 1.0 + Math.sin(10 * theta) * Math.cos(10 * phi) * 0.08;
        let dx = x * w;
        let dy = y * w;
        let dz = z * w;
        if (Math.abs(x) < 4) dx *= 0.75;
        return [dx, dy, dz];
      }));

      // Spinal Cord & Peripheral Nerves
      const nervePaths: [number, number, number][][] = [
        [[0, -110, 16], [0, 80, 16]],
        [[0, -90, 16], [-48, -86, 0], [-58, -20, 4]],
        [[0, -90, 16], [48, -86, 0], [58, -20, 4]],
        [[0, 75, 16], [-16, 95, 5], [-14, 210, 0]],
        [[0, 75, 16], [16, 95, 5], [14, 210, 0]]
      ];
      nervePaths.forEach((path, idx) => {
        meshes.push(generateSweep(path, 0.8, 4, "nerves", "nervous", "#a855f7"));
      });
    }

    // 9. LYMPHATIC SYSTEM
    if (opacities.lymphatic > 0) {
      const nodes: [number, number, number][] = [
        [-8, -100, -8], [8, -100, -8],
        [-24, -80, -10], [24, -80, -10],
        [-14, 75, -5], [14, 75, -5],
        [-4, 25, 2], [4, 25, 2],
        [-6, -30, 4], [6, -30, 4]
      ];
      nodes.forEach((node, idx) => {
        meshes.push(generateEllipsoid(node[0], node[1], node[2], 2.2, 2.2, 2.2, 4, 6, "lymphatic-nodes", "lymphatic", "#84cc16"));
      });
    }

    // Compile and render all faces of visible/non-dissected meshes
    meshes.forEach(mesh => {
      const op = opacities[mesh.system] / 100;
      if (op <= 0) return;
      if (dissectedOrgans.includes(mesh.id)) return;

      const vertices = mesh.vertices;
      const faces = mesh.faces;
      const color = mesh.color;

      faces.forEach((face, fIdx) => {
        const p0 = vertices[face.p0];
        const p1 = vertices[face.p1];
        const p2 = vertices[face.p2];
        const p3 = face.p3 ? vertices[face.p3] : null;

        // 1. Calculate normal in object space
        const normal = getFaceNormal(p0, p1, p2);
        // 2. Rotate normal to camera space
        const nCam = rotateVector(normal.x, normal.y, normal.z);

        // 3. Backface culling
        if (nCam.z < 0.05) {
          const proj0 = project(p0[0], p0[1], p0[2]);
          const proj1 = project(p1[0], p1[1], p1[2]);
          const proj2 = project(p2[0], p2[1], p2[2]);
          const proj3 = p3 ? project(p3[0], p3[1], p3[2]) : null;

          const avgDepth = proj3 
            ? (proj0.depth + proj1.depth + proj2.depth + proj3.depth) / 4
            : (proj0.depth + proj1.depth + proj2.depth) / 3;

          const dotVal = -nCam.z;

          // Shading calculations (Ambient + Diffuse)
          const lx = 0.3, ly = -0.4, lz = -0.85;
          const dot = -(nCam.x * lx + nCam.y * ly + nCam.z * lz);
          const diffuse = Math.max(0, dot) * 0.65;
          const intensity = Math.min(1.0, 0.3 + diffuse);

          // Parse color and apply shading intensity
          const rgb = parseHex(color);
          let r = Math.round(rgb.r * intensity);
          let g = Math.round(rgb.g * intensity);
          let b = Math.round(rgb.b * intensity);

          // Calculate final opacity
          let faceOpacity = op;
          if (mesh.system === "integumentary") {
            faceOpacity = op * (0.60 - 0.45 * dotVal);
          } else {
            faceOpacity = op * (0.3 + 0.7 * dotVal);
          }

          if (isolatedOrganId && isolatedOrganId !== mesh.id) {
            faceOpacity *= 0.08;
          }

          // Interactive highlight states
          const isSelected = selectedPartId === mesh.id;
          const isHovered = hoveredOrganId === mesh.id;

          if (isSelected) {
            r = Math.min(255, r + 40);
            g = Math.min(255, g + 80);
            b = Math.min(255, b + 100);
            faceOpacity = Math.min(1.0, faceOpacity + 0.3);
          } else if (isHovered) {
            r = Math.min(255, r + 30);
            g = Math.min(255, g + 30);
            b = Math.min(255, b + 10);
            faceOpacity = Math.min(1.0, faceOpacity + 0.15);
          }

          const faceKey = `face-${mesh.id}-${fIdx}-${mesh.system}`;

          elements.push({
            depth: avgDepth,
            element: (
              <polygon
                key={faceKey}
                points={proj3
                  ? `${proj0.x.toFixed(1)},${proj0.y.toFixed(1)} ${proj1.x.toFixed(1)},${proj1.y.toFixed(1)} ${proj2.x.toFixed(1)},${proj2.y.toFixed(1)} ${proj3.x.toFixed(1)},${proj3.y.toFixed(1)}`
                  : `${proj0.x.toFixed(1)},${proj0.y.toFixed(1)} ${proj1.x.toFixed(1)},${proj1.y.toFixed(1)} ${proj2.x.toFixed(1)},${proj2.y.toFixed(1)}`
                }
                fill={`rgba(${r}, ${g}, ${b}, ${faceOpacity.toFixed(3)})`}
                stroke={
                  isSelected 
                    ? "#22d3ee" 
                    : isHovered 
                      ? "rgba(255, 255, 255, 0.4)" 
                      : SYSTEM_CONFIG[mesh.system].colorHex + (mesh.system === "integumentary" ? "22" : "33")
                }
                strokeWidth={isSelected ? "1.2" : isHovered ? "0.8" : "0.3"}
                className="cursor-pointer transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  if (activeTool === "dissect") {
                    toggleDissection(mesh.id);
                  } else if (activeTool === "isolate") {
                    setIsolatedOrganId(mesh.id);
                    handleSelectOrgan(mesh.id);
                  } else {
                    handleSelectOrgan(mesh.id);
                  }
                }}
                onMouseEnter={() => setHoveredOrganId(mesh.id)}
                onMouseLeave={() => setHoveredOrganId(null)}
              />
            )
          });
        }
      });
    });

    // Sort by depth so furthest is drawn first (painter's algorithm)
    return elements.sort((a, b) => b.depth - a.depth);
  }, [opacities, yaw, pitch, zoom, panY, selectedPartId, dissectedOrgans, isFemale, time, hoveredOrganId, activeTool, isolatedOrganId]);

  return (
    <div className="bg-slate-950 text-white min-h-screen relative overflow-hidden font-sans pt-4 pb-12 px-4 md:px-6">
      
      {/* Background Holographic Grid Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
      <div 
        className="absolute top-1/4 left-1/3 w-[500px] h-[500px] blur-[160px] rounded-full pointer-events-none transition-all duration-1000"
        style={{ backgroundColor: SYSTEM_CONFIG[selectedSystem].glowColor }}
      />

      <div className="max-w-7xl mx-auto relative z-10 space-y-6">
        
        {/* Header HUD Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full font-bold uppercase tracking-widest">
                <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" /> 3D Digital Cadaver Lab
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full font-semibold uppercase tracking-wider">
                Board Syllabus Sync (NEET PG, USMLE, FMGE)
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400 font-serif">
              Bio-Digital Anatomy Explorer
            </h1>
          </div>

          {/* Model Gender Toggle and Search */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Gender Toggle */}
            <div className="bg-slate-900 border border-white/10 rounded-xl p-1 flex gap-1">
              <button
                onClick={() => {
                  setIsFemale(true);
                  if (selectedPartId === "bones" || selectedPartId === "muscles") {
                    handleSelectOrgan("heart");
                  }
                }}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isFemale 
                    ? "bg-cyan-500/15 border border-cyan-500/20 text-cyan-300" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <User className="w-3.5 h-3.5" /> Female Model
              </button>
              <button
                onClick={() => {
                  setIsFemale(false);
                  if (selectedPartId === "bones" || selectedPartId === "muscles") {
                    handleSelectOrgan("heart");
                  }
                }}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  !isFemale 
                    ? "bg-blue-500/15 border border-blue-500/20 text-blue-300" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <User className="w-3.5 h-3.5" /> Male Model
              </button>
            </div>

            {/* Smart Search */}
            <div className="relative flex-grow md:flex-grow-0 md:w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search structures or symptoms..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-900/80 border border-white/10 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 backdrop-blur-md transition-all"
                />
              </div>
              
              {/* Dropdown search results */}
              {searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-slate-950 border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 max-h-60 overflow-y-auto backdrop-blur-xl">
                  {searchResults.length > 0 ? (
                    searchResults.map(organ => (
                      <button
                        key={organ.id}
                        onClick={() => {
                          handleSelectOrgan(organ.id);
                          setSearchQuery("");
                        }}
                        className="w-full text-left px-3.5 py-2.5 hover:bg-slate-900 border-b border-white/5 last:border-0 transition-colors flex justify-between items-center"
                      >
                        <div>
                          <span className="font-semibold text-xs block text-white">{organ.name}</span>
                          <span className="text-[10px] text-slate-400 capitalize">{organ.system} System</span>
                        </div>
                        <span className="text-[10px] text-cyan-400 font-medium">Select &rarr;</span>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-center text-xs text-slate-400">
                      No anatomical structures match.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3-Column CADAVER LAB PIT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT SIDEBAR: Interactive Systems & Anatomy Tree */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            
            {/* System Visibility Dashboard (Sliders) */}
            <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-4 backdrop-blur-md space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-cyan-400" /> System Layers
                </h3>
                <button 
                  onClick={() => setOpacities({
                    integumentary: 10, skeletal: 0, muscular: 0, nervous: 0, 
                    cardiovascular: 0, respiratory: 0, digestive: 0, urinary: 0, lymphatic: 0
                  })} 
                  className="text-[9px] hover:text-white text-slate-500 uppercase tracking-widest font-semibold transition-colors"
                >
                  Clear All
                </button>
              </div>
              
              <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1 no-scrollbar">
                {Object.entries(SYSTEM_CONFIG).map(([key, config]) => {
                  const sysKey = key as SystemType;
                  const value = opacities[sysKey];
                  const isVisible = value > 0;
                  
                  return (
                    <div key={key} className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <button
                          onClick={() => handleSystemVisibilityToggle(sysKey)}
                          className="flex items-center gap-2 group text-left"
                        >
                          <span className={`w-2.5 h-2.5 rounded-full bg-gradient-to-br ${config.color} ${isVisible ? "scale-100 shadow-md shadow-cyan-500/20" : "scale-75 opacity-30 group-hover:opacity-60"}`} />
                          <span className={`text-[11px] font-semibold transition-colors ${isVisible ? "text-white" : "text-slate-500 group-hover:text-slate-400"}`}>
                            {config.title}
                          </span>
                        </button>
                        <span className="text-[9px] text-slate-500 font-mono">{value}%</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleSystemVisibilityToggle(sysKey)}
                          className="text-slate-500 hover:text-slate-300"
                        >
                          {isVisible ? <Eye className="w-3.5 h-3.5 text-cyan-500" /> : <EyeOff className="w-3.5 h-3.5" />}
                        </button>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={value}
                          onChange={(e) => handleSystemOpacityChange(sysKey, Number(e.target.value))}
                          className="flex-grow h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Anatomical Structural Tree */}
            <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-4 backdrop-blur-md flex-grow flex flex-col min-h-[300px]">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 border-b border-white/5 pb-2 mb-3">
                <Compass className="w-3.5 h-3.5 text-cyan-400" /> Anatomy Directory
              </h3>
              
              <div className="flex-grow overflow-y-auto space-y-2 pr-1 max-h-[320px] no-scrollbar">
                {Object.entries(SYSTEM_CONFIG)
                  .filter(([key]) => key !== "integumentary")
                  .map(([sysKey, config]) => {
                    const isExpanded = systemsExpanded[sysKey] || false;
                    const systemOrgans = Object.values(ANATOMICAL_DATABASE).filter(o => o.system === sysKey);

                    return (
                      <div key={sysKey} className="border border-white/5 rounded-xl overflow-hidden bg-slate-950/20">
                        <button
                          onClick={() => setSystemsExpanded(prev => ({ ...prev, [sysKey]: !isExpanded }))}
                          className="w-full flex justify-between items-center p-2.5 hover:bg-white/[0.02] text-left transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            {isExpanded ? <ChevronDown className="w-3.5 h-3.5 text-slate-500" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-500" />}
                            <span className="text-[11px] font-semibold text-slate-300 capitalize">{config.title}</span>
                          </div>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-slate-500 font-mono">{systemOrgans.length}</span>
                        </button>
                        
                        {isExpanded && (
                          <div className="px-2 pb-2 pt-0.5 space-y-1 border-t border-white/5 bg-slate-900/20">
                            {systemOrgans.map(organ => {
                              const isSelected = selectedPartId === organ.id;
                              const isDissected = dissectedOrgans.includes(organ.id);
                              
                              return (
                                <div 
                                  key={organ.id} 
                                  className={`group flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[10px] transition-all ${
                                    isSelected 
                                      ? "bg-cyan-500/10 text-cyan-400 font-semibold" 
                                      : isDissected 
                                        ? "text-slate-600 line-through" 
                                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                                  }`}
                                >
                                  <button
                                    onClick={() => handleSelectOrgan(organ.id)}
                                    disabled={isDissected}
                                    className="flex-grow text-left truncate disabled:cursor-not-allowed"
                                  >
                                    {organ.name.split(" (")[0]}
                                  </button>
                                  <div className="flex items-center gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity">
                                    <button 
                                      onClick={() => toggleDissection(organ.id)}
                                      className="text-slate-400 hover:text-red-400"
                                      title={isDissected ? "Restore Structure" : "Hide/Dissect Structure"}
                                    >
                                      {isDissected ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>

          </div>

          {/* CENTER VIEWPORT: Holographic Projector and Float Controls */}
          <div className="lg:col-span-6 bg-slate-900/30 border border-white/10 rounded-3xl p-5 backdrop-blur-xl flex flex-col justify-between overflow-hidden relative group/viewer min-h-[500px]">
            
            {/* Viewport Header HUD */}
            <div className="flex justify-between items-center relative z-30">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]" />
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase font-mono">
                  HUD Projector: {isFemale ? "FEMALE" : "MALE"}_ANATOMY_CADA.SYS
                </span>
              </div>

              {/* Top View HUD Controls */}
              <div className="flex gap-2">
                {/* Auto Rotate Toggle */}
                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  className={`px-2.5 py-1 rounded-lg border text-[10px] font-bold transition-all flex items-center gap-1.5 ${
                    autoRotate 
                      ? "bg-cyan-500/15 border-cyan-500/30 text-cyan-300" 
                      : "bg-slate-900/80 border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  <RotateCw className={`w-3 h-3 ${autoRotate ? "animate-spin" : ""}`} />
                  <span>Auto-Orbit</span>
                </button>

                {/* X-Ray Mode */}
                <button
                  onClick={() => {
                    setXrayMode(!xrayMode);
                    // Preset opacities to transparent look
                    if (!xrayMode) {
                      setOpacities({
                        integumentary: 10, skeletal: 20, muscular: 15, nervous: 30, 
                        cardiovascular: 30, respiratory: 20, digestive: 15, urinary: 15, lymphatic: 15
                      });
                    } else {
                      setOpacities({
                        integumentary: 15, skeletal: 30, muscular: 10, nervous: 40, 
                        cardiovascular: 100, respiratory: 25, digestive: 20, urinary: 20, lymphatic: 10
                      });
                    }
                  }}
                  className={`px-2.5 py-1 rounded-lg border text-[10px] font-bold transition-all flex items-center gap-1.5 ${
                    xrayMode 
                      ? "bg-purple-500/15 border-purple-500/30 text-purple-300" 
                      : "bg-slate-900/80 border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  <Maximize2 className="w-3 h-3" />
                  <span>X-Ray Vision</span>
                </button>
              </div>
            </div>

            {/* Left Floating Interactive Tool Bar (Replicating BioDigital) */}
            <div className="absolute left-4 top-20 z-30 bg-slate-900/80 border border-white/15 rounded-xl p-1 flex flex-col gap-1 backdrop-blur-md shadow-2xl">
              <button
                onClick={() => { setActiveTool("orbit"); setIsEraser(false); }}
                className={`p-2.5 rounded-lg text-slate-400 hover:text-white transition-all flex items-center justify-center ${
                  activeTool === "orbit" ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30" : "border border-transparent"
                }`}
                title="Orbit Rotation (Drag on Canvas)"
              >
                <RotateCw className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => { setActiveTool("pan"); setIsEraser(false); }}
                className={`p-2.5 rounded-lg text-slate-400 hover:text-white transition-all flex items-center justify-center ${
                  activeTool === "pan" ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30" : "border border-transparent"
                }`}
                title="Pan displacement (Drag Vertically)"
              >
                <Move className="w-4 h-4" />
              </button>

              <button
                onClick={() => { setActiveTool("draw"); setIsEraser(false); }}
                className={`p-2.5 rounded-lg text-slate-400 hover:text-white transition-all flex items-center justify-center ${
                  activeTool === "draw" && !isEraser ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30" : "border border-transparent"
                }`}
                title="Draw Annotations"
              >
                <PenTool className="w-4 h-4" />
              </button>

              {activeTool === "draw" && (
                <button
                  onClick={() => setIsEraser(!isEraser)}
                  className={`p-2.5 rounded-lg text-slate-400 hover:text-white transition-all flex items-center justify-center ${
                    isEraser ? "bg-amber-500/15 text-amber-300 border border-amber-500/30" : "border border-transparent"
                  }`}
                  title="Eraser Tool"
                >
                  <Eraser className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={() => { setActiveTool("dissect"); setIsEraser(false); }}
                className={`p-2.5 rounded-lg text-slate-400 hover:text-white transition-all flex items-center justify-center ${
                  activeTool === "dissect" ? "bg-red-500/15 text-red-300 border border-red-500/30" : "border border-transparent"
                }`}
                title="Dissect / Hide organs by clicking"
              >
                <Scissors className="w-4 h-4" />
              </button>

              <button
                onClick={() => { setActiveTool("isolate"); setIsEraser(false); }}
                className={`p-2.5 rounded-lg text-slate-400 hover:text-white transition-all flex items-center justify-center ${
                  activeTool === "isolate" ? "bg-purple-500/15 text-purple-300 border border-purple-500/30" : "border border-transparent"
                }`}
                title="Isolate selected structure"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Floating Zoom / Reset widget on the right */}
            <div className="absolute right-4 top-20 z-30 bg-slate-900/80 border border-white/15 rounded-xl p-1 flex flex-col gap-1 backdrop-blur-md shadow-2xl">
              <button
                onClick={() => setZoom(prev => Math.min(2.5, prev + 0.15))}
                className="p-2.5 rounded-lg text-slate-400 hover:text-white transition-all flex items-center justify-center border border-transparent"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoom(prev => Math.max(0.6, prev - 0.15))}
                className="p-2.5 rounded-lg text-slate-400 hover:text-white transition-all flex items-center justify-center border border-transparent"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={resetCamera}
                className="p-2.5 rounded-lg text-slate-400 hover:text-white transition-all flex items-center justify-center border border-transparent"
                title="Reset Camera View"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Drawing Tool settings popover */}
            {activeTool === "draw" && (
              <div className="absolute left-16 top-32 z-40 bg-slate-900/90 border border-white/10 p-3 rounded-xl flex gap-3 items-center backdrop-blur-xl shadow-2xl">
                <div className="flex gap-1.5">
                  {["#facc15", "#ef4444", "#06b6d4", "#22c55e"].map(color => (
                    <button
                      key={color}
                      onClick={() => { setPenColor(color); setIsEraser(false); }}
                      className={`w-4 h-4 rounded-full border transition-all ${
                        penColor === color && !isEraser ? "border-white scale-125" : "border-transparent"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <div className="h-4 w-[1px] bg-white/10" />
                <input
                  type="range"
                  min="2"
                  max="10"
                  value={penSize}
                  onChange={(e) => setPenSize(Number(e.target.value))}
                  className="w-16 h-1 accent-cyan-400 rounded-lg appearance-none cursor-pointer bg-slate-800"
                />
                <button
                  onClick={clearDrawing}
                  className="text-[9px] font-bold text-slate-400 hover:text-red-400 uppercase font-mono"
                >
                  Clear
                </button>
              </div>
            )}

            {/* Dynamic HUD indicator for dissect/isolation states */}
            {(dissectedOrgans.length > 0 || isolatedOrganId) && (
              <div className="absolute left-16 bottom-20 z-30 flex flex-wrap gap-2 max-w-[70%]">
                {dissectedOrgans.map(orgId => (
                  <button
                    key={orgId}
                    onClick={() => toggleDissection(orgId)}
                    className="inline-flex items-center gap-1 text-[9px] px-2 py-0.5 bg-red-950/60 border border-red-500/30 text-red-300 rounded-full hover:bg-red-900/40 transition-colors"
                  >
                    <span>Dissected: {ANATOMICAL_DATABASE[orgId]?.name.split(" (")[0]}</span>
                    <X className="w-2.5 h-2.5" />
                  </button>
                ))}
                {isolatedOrganId && (
                  <button
                    onClick={() => setIsolatedOrganId(null)}
                    className="inline-flex items-center gap-1 text-[9px] px-2 py-0.5 bg-purple-950/60 border border-purple-500/30 text-purple-300 rounded-full hover:bg-purple-900/40 transition-colors"
                  >
                    <span>Isolated: {ANATOMICAL_DATABASE[isolatedOrganId]?.name.split(" (")[0]}</span>
                    <X className="w-2.5 h-2.5" />
                  </button>
                )}
              </div>
            )}

            {/* Main Holographic Canvas Layer */}
            <div className="flex-grow flex items-center justify-center relative min-h-[380px] select-none">
              
              {/* Floor grid effect */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-64 h-8 bg-cyan-500/5 blur-[12px] rounded-full [transform:rotateX(75deg)] border border-cyan-500/10 pointer-events-none" />

              {/* HTML5 drawing overlay canvas */}
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                className={`absolute inset-0 z-20 w-full h-full ${
                  activeTool === "draw" ? "pointer-events-auto cursor-crosshair" : "pointer-events-none"
                }`}
              />

              {/* The SVG projected elements */}
              <svg
                viewBox="0 0 440 480"
                className="w-full h-full drop-shadow-[0_0_30px_rgba(34,211,238,0.06)] absolute inset-0 z-10"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                {/* Render depth sorted components */}
                {depthSortedElements.map((el) => el.element)}

                {/* Hotspot Markers for Clickable Organs */}
                {Object.values(ANATOMICAL_DATABASE).map(organ => {
                  if (dissectedOrgans.includes(organ.id)) return null;
                  
                  // Hide if system opacity is zero
                  if (opacities[organ.system] === 0) return null;
                  
                  const isSelected = selectedPartId === organ.id;
                  const isTargetSystem = organ.system === selectedSystem;
                  
                  // Project organ center
                  const proj = project(organ.coordinates3d[0], organ.coordinates3d[1], organ.coordinates3d[2]);
                  
                  // Pulse coordinate centers for active select state
                  return (
                    <g
                      key={`hotspot-${organ.id}`}
                      className="cursor-pointer transition-opacity duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (activeTool === "dissect") {
                          toggleDissection(organ.id);
                        } else if (activeTool === "isolate") {
                          setIsolatedOrganId(organ.id);
                          handleSelectOrgan(organ.id);
                        } else {
                          handleSelectOrgan(organ.id);
                        }
                      }}
                    >
                      {/* Pulse ring */}
                      <circle
                        cx={proj.x}
                        cy={proj.y}
                        r={(isSelected ? 10 : 6) * zoom}
                        fill="none"
                        stroke={
                          isSelected 
                            ? "#22d3ee" 
                            : huntOrganId === organ.id && huntStatus === "searching"
                              ? "rgba(168, 85, 247, 0.7)"
                              : "rgba(255,255,255,0.4)"
                        }
                        strokeWidth={isSelected ? 1.8 : 0.8}
                        className={isSelected || huntOrganId === organ.id ? "animate-pulse" : ""}
                      />
                      {/* Center core */}
                      <circle
                        cx={proj.x}
                        cy={proj.y}
                        r="3.5"
                        fill={
                          isSelected 
                            ? "#22d3ee" 
                            : huntOrganId === organ.id && huntStatus === "searching"
                              ? "#a855f7"
                              : "#ffffff"
                        }
                      />
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Azimuth / Drag HUD Angle Controls */}
            <div className="relative z-30 bg-slate-950/80 border border-white/10 p-3 rounded-2xl flex items-center justify-between gap-4 backdrop-blur-md">
              <div className="flex flex-col gap-0.5 text-[9px] font-mono text-slate-400">
                <span>YAW: {Math.round(yaw)}&deg;</span>
                <span>PITCH: {Math.round(pitch)}&deg;</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={Math.round(yaw)}
                onChange={(e) => setYaw(Number(e.target.value))}
                className="flex-grow h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <button 
                onClick={resetCamera}
                className="text-[10px] font-bold text-slate-400 hover:text-white uppercase font-mono transition-colors"
              >
                Reset
              </button>
            </div>

          </div>

          {/* RIGHT SIDEBAR: Board Examination & High-Yield Information */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            
            {/* Mode Selector Tab */}
            <div className="flex bg-slate-900 border border-white/10 rounded-2xl p-1.5 gap-1.5">
              <button
                onClick={() => setMode("study")}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  mode === "study"
                    ? "bg-slate-800 text-white shadow-md border border-white/5"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" /> Study Board
              </button>
              <button
                onClick={() => {
                  setMode("exam");
                  setMcqAnswer(null);
                  setMcqSubmitted(false);
                  setMcqShowExpl(false);
                }}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  mode === "exam"
                    ? "bg-slate-800 text-white shadow-md border border-white/5"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Award className="w-3.5 h-3.5" /> Exam Arena
              </button>
            </div>

            {/* Active Content Module */}
            <div className="bg-slate-900/40 border border-white/10 rounded-3xl p-5 backdrop-blur-md flex-grow flex flex-col justify-between min-h-[420px]">
              
              <AnimatePresence mode="wait">
                {mode === "study" ? (
                  // STUDY MODE SECTION
                  <motion.div
                    key={`study-${activeOrgan.id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-5"
                  >
                    <div>
                      <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-widest mb-1.5 ${SYSTEM_CONFIG[activeOrgan.system].textColor}`}>
                        {SYSTEM_CONFIG[activeOrgan.system].title}
                      </span>
                      <h2 className="text-xl font-bold tracking-tight text-white font-serif">
                        {activeOrgan.name}
                      </h2>
                      <p className="text-slate-400 text-[11px] font-light mt-1.5 leading-relaxed">
                        {activeOrgan.description}
                      </p>
                    </div>

                    {/* High Yield Key Concepts */}
                    <div className="space-y-2.5 pt-3 border-t border-white/5">
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> Board Facts
                      </h4>
                      <ul className="space-y-2">
                        {activeOrgan.highYieldNotes.map((note, index) => (
                          <li key={index} className="flex gap-2 items-start text-[11px] text-slate-300 leading-relaxed">
                            <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-gradient-to-br ${SYSTEM_CONFIG[activeOrgan.system].color}`} />
                            <span>{note}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Clinical Correlations */}
                    <div className="space-y-2.5 pt-3 border-t border-white/5">
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400" /> Pathological Correlations
                      </h4>
                      
                      <div className="space-y-3 max-h-[180px] overflow-y-auto pr-1 no-scrollbar">
                        {activeOrgan.clinicalCorrelations.map((corr, idx) => (
                          <div key={idx} className="bg-slate-950/40 border border-white/5 rounded-xl p-3 space-y-1.5">
                            <div className="flex justify-between items-start gap-2">
                              <h5 className="text-[11px] font-bold text-white leading-tight">{corr.title}</h5>
                              <span className="text-[8px] font-semibold px-1 py-0.5 bg-rose-500/10 text-rose-400 border border-rose-500/10 rounded tracking-wide shrink-0">
                                {corr.examsYield.split(" / ")[0]}
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-400 font-light leading-snug">
                              {corr.description}
                            </p>
                            <div className="pt-1 flex flex-wrap gap-1">
                              {corr.symptoms.map((symptom, sIdx) => (
                                <span key={sIdx} className="text-[8px] px-1.5 py-0.5 bg-slate-900 border border-white/5 rounded-full text-slate-300">
                                  {symptom}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  // EXAM MODE SECTION
                  <motion.div
                    key={`exam-${activeOrgan.id}-${quizMode}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    {/* Inner Quiz Mode selector */}
                    <div className="grid grid-cols-2 bg-slate-950/80 border border-white/5 p-1 rounded-xl gap-1">
                      <button
                        onClick={() => setQuizMode("mcq")}
                        className={`py-1.5 text-[10px] font-bold rounded-lg transition-all ${
                          quizMode === "mcq" ? "bg-slate-800 text-white" : "text-slate-500 hover:text-white"
                        }`}
                      >
                        Clinical Case
                      </button>
                      <button
                        onClick={() => {
                          setQuizMode("hunt");
                          startNewStructureHunt();
                        }}
                        className={`py-1.5 text-[10px] font-bold rounded-lg transition-all ${
                          quizMode === "hunt" ? "bg-slate-800 text-white" : "text-slate-500 hover:text-white"
                        }`}
                      >
                        Structure Hunt
                      </button>
                    </div>

                    {quizMode === "mcq" ? (
                      // MCQ VIGNETTES MODE
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest font-mono">
                              Case Diagnosis Quest
                            </span>
                            <span className="text-[9px] font-semibold text-slate-500 capitalize">
                              Subject: {activeOrgan.system}
                            </span>
                          </div>
                          <h4 className="text-[11px] font-semibold text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 border border-white/5 rounded-xl">
                            {activeOrgan.flashcard.question}
                          </h4>
                        </div>

                        {/* MCQ Options */}
                        <div className="space-y-1.5">
                          {activeOrgan.flashcard.options.map((option, idx) => {
                            const isCorrect = idx === activeOrgan.flashcard.answerIndex;
                            const isSelected = idx === mcqAnswer;
                            
                            let optStyle = "bg-slate-950/60 border-white/5 text-slate-400 hover:bg-white/5 hover:text-white";
                            
                            if (mcqSubmitted) {
                              if (isCorrect) {
                                optStyle = "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-medium";
                              } else if (isSelected) {
                                optStyle = "bg-rose-500/10 border-rose-500/30 text-rose-400";
                              } else {
                                optStyle = "bg-slate-950/30 border-transparent text-slate-600 opacity-60";
                              }
                            }

                            return (
                              <button
                                key={idx}
                                onClick={() => submitMcq(idx)}
                                disabled={mcqSubmitted}
                                className={`w-full text-left p-2.5 rounded-xl border text-[10px] transition-all flex items-start gap-2.5 ${optStyle}`}
                              >
                                <span className="font-bold text-[9px] w-4.5 h-4.5 rounded bg-white/5 flex items-center justify-center border border-white/10 shrink-0 uppercase">
                                  {String.fromCharCode(65 + idx)}
                                </span>
                                <span className="leading-snug">{option}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Rationale explanation */}
                        {mcqShowExpl && (
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-slate-950/80 border border-white/10 p-3.5 rounded-xl space-y-2"
                          >
                            <div className="flex items-center gap-1.5 text-[11px]">
                              {mcqAnswer === activeOrgan.flashcard.answerIndex ? (
                                <>
                                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                  <span className="font-bold text-emerald-400">Correct Diagnosis!</span>
                                </>
                              ) : (
                                <>
                                  <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                                  <span className="font-bold text-rose-400">Incorrect Selection</span>
                                </>
                              )}
                            </div>
                            <p className="text-[10px] text-slate-300 font-light leading-relaxed">
                              <strong className="text-white block mb-0.5">Clinical Rationale:</strong>
                              {activeOrgan.flashcard.explanation}
                            </p>
                            <button
                              onClick={() => {
                                setMcqAnswer(null);
                                setMcqSubmitted(false);
                                setMcqShowExpl(false);
                              }}
                              className="mt-1.5 inline-flex items-center gap-1 text-[9px] font-bold text-cyan-400 hover:underline"
                            >
                              <RotateCcw className="w-3 h-3" /> Retry Question
                            </button>
                          </motion.div>
                        )}
                      </div>
                    ) : (
                      // STRUCTURE HUNT ACTIVE STATE
                      <div className="space-y-4">
                        <div className="flex justify-between items-center bg-slate-950/80 p-2.5 border border-white/5 rounded-xl">
                          <span className="text-[10px] font-bold text-slate-400 font-mono">Score: {huntScore}/{huntTotal}</span>
                          <button
                            onClick={startNewStructureHunt}
                            className="text-[9px] font-bold text-cyan-400 hover:underline flex items-center gap-1"
                          >
                            <RotateCcw className="w-3 h-3" /> Next Hunt
                          </button>
                        </div>

                        <div className="bg-slate-950/50 border border-white/5 p-4 rounded-2xl text-center space-y-3">
                          <h4 className="text-xs font-semibold text-slate-300 leading-relaxed">
                            {huntFeedback}
                          </h4>

                          {/* Grade status indicator */}
                          {huntStatus === "correct" && (
                            <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                              <Check className="w-3.5 h-3.5" /> Identified Successfully
                            </div>
                          )}

                          {huntStatus === "incorrect" && (
                            <div className="inline-flex items-center gap-1.5 text-xs text-rose-400 font-bold bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full">
                              <X className="w-3.5 h-3.5" /> Incorrect Structure
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* HUD footer sync status */}
              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[9px] text-slate-500 font-mono">
                <span className="flex items-center gap-1">
                  <FileText className="w-3 h-3" /> NEET PG Syllabus Sync
                </span>
                <span>Active: {activeOrgan.name.split(" (")[0]}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
