export type Subject = "Anatomy" | "Physiology" | "Pathology" | "Pharmacology";

export interface QuizQuestion {
  id: string;
  subject: Subject;
  vignette: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const quizDatabase: QuizQuestion[] = [
  // ANATOMY
  {
    id: "ANA-001",
    subject: "Anatomy",
    vignette: "A 45-year-old woman presents to the clinic with inability to abduct her right arm past 15 degrees. She recently had a radical mastectomy with axillary lymph node dissection.",
    question: "Which nerve was most likely injured during the procedure?",
    options: ["Long thoracic nerve", "Axillary nerve", "Thoracodorsal nerve", "Suprascapular nerve"],
    answer: 1,
    explanation: "The axillary nerve innervates the deltoid and teres minor. The deltoid is responsible for arm abduction past the initial 15 degrees (which is initiated by the supraspinatus). It can be injured during axillary procedures or surgical neck fractures of the humerus."
  },
  {
    id: "ANA-002",
    subject: "Anatomy",
    vignette: "A 22-year-old baseball pitcher complains of pain and weakness in his right shoulder. Physical examination shows winging of the right scapula when he pushes against a wall.",
    question: "Which muscle is denervated?",
    options: ["Serratus anterior", "Rhomboid major", "Trapezius", "Latissimus dorsi"],
    answer: 0,
    explanation: "Winging of the scapula is a classic sign of serratus anterior paralysis, caused by injury to the long thoracic nerve. The serratus anterior normally holds the medial border of the scapula against the thoracic wall."
  },
  {
    id: "ANA-003",
    subject: "Anatomy",
    vignette: "A 65-year-old man undergoes abdominal aortic aneurysm repair. Postoperatively, he develops sudden onset of abdominal pain and bloody diarrhea.",
    question: "Ischemia to which of the following bowel segments is most likely?",
    options: ["Ascending colon", "Transverse colon", "Splenic flexure", "Rectum"],
    answer: 2,
    explanation: "The splenic flexure is a watershed area where the superior mesenteric artery (SMA) and inferior mesenteric artery (IMA) circulations meet. It is highly susceptible to ischemic damage during hypotensive episodes or aortic cross-clamping."
  },

  // PHYSIOLOGY
  {
    id: "PHY-001",
    subject: "Physiology",
    vignette: "A 30-year-old man climbs to a high altitude (4,000 meters). After 48 hours, his respiratory rate is elevated, and arterial blood gas shows a pH of 7.46.",
    question: "Which of the following compensatory mechanisms is occurring in his kidneys?",
    options: ["Increased H+ secretion", "Decreased HCO3- reabsorption", "Increased NH4+ production", "Decreased Na+ reabsorption"],
    answer: 1,
    explanation: "High altitude causes hypoxia-induced hyperventilation, leading to respiratory alkalosis. To compensate, the kidneys decrease bicarbonate (HCO3-) reabsorption and increase its excretion to bring the pH back toward normal."
  },
  {
    id: "PHY-002",
    subject: "Physiology",
    vignette: "An experimental drug increases the permeability of the resting muscle cell membrane to potassium ions.",
    question: "What effect will this have on the resting membrane potential (RMP)?",
    options: ["It will become more positive (depolarize)", "It will become more negative (hyperpolarize)", "It will remain unchanged", "It will reach the sodium equilibrium potential"],
    answer: 1,
    explanation: "The resting membrane potential is largely determined by the K+ equilibrium potential (-85 mV). Increasing K+ permeability will cause more K+ to leave the cell down its concentration gradient, moving the RMP closer to the K+ equilibrium potential (hyperpolarization)."
  },
  {
    id: "PHY-003",
    subject: "Physiology",
    vignette: "A 55-year-old woman with severe vomiting for 3 days presents to the ER. Laboratory studies show hypokalemia and metabolic alkalosis.",
    question: "Which of the following changes in renal handling is primarily responsible for maintaining her metabolic alkalosis?",
    options: ["Increased filtered load of bicarbonate", "Aldosterone-mediated H+ secretion", "Decreased GFR", "Volume depletion leading to increased proximal Na+/HCO3- reabsorption"],
    answer: 3,
    explanation: "Volume depletion secondary to vomiting triggers the RAAS system. Angiotensin II stimulates Na+/H+ exchange in the proximal tubule, leading to increased reabsorption of both Na+ and HCO3- ('contraction alkalosis'), which maintains the alkalotic state."
  },

  // PATHOLOGY
  {
    id: "PAT-001",
    subject: "Pathology",
    vignette: "A 40-year-old woman presents with fatigue and a heavy menstrual periods. Laboratory findings show microcytic, hypochromic anemia.",
    question: "A bone marrow biopsy would most likely show which of the following?",
    options: ["Ringed sideroblasts", "Hypercellular marrow with megaloblasts", "Absent stainable iron", "Replacement of marrow by fat"],
    answer: 2,
    explanation: "The patient has iron deficiency anemia secondary to chronic blood loss (menorrhagia). A bone marrow biopsy (though rarely needed) would show absent stainable iron (hemosiderin) in macrophages."
  },
  {
    id: "PAT-002",
    subject: "Pathology",
    vignette: "A 60-year-old man with a long history of smoking presents with a chronic cough and weight loss. Chest X-ray reveals a central lung mass. Biopsy shows keratin pearls and intercellular bridges.",
    question: "What is the most likely diagnosis?",
    options: ["Small cell carcinoma", "Squamous cell carcinoma", "Adenocarcinoma", "Large cell carcinoma"],
    answer: 1,
    explanation: "Squamous cell carcinoma of the lung is typically centrally located, strongly associated with smoking, and characterized histologically by the presence of keratin pearls and intercellular bridges."
  },
  {
    id: "PAT-003",
    subject: "Pathology",
    vignette: "A 25-year-old man presents with a painless mass in his neck. Biopsy of the mass reveals binucleated cells with prominent nucleoli resembling 'owl eyes' in a background of lymphocytes.",
    question: "Which of the following cell surface markers is most likely to be positive on these cells?",
    options: ["CD15 and CD30", "CD20 and CD19", "CD3 and CD4", "TdT and CD10"],
    answer: 0,
    explanation: "The biopsy describes Reed-Sternberg cells, the hallmark of Hodgkin lymphoma. Classical Reed-Sternberg cells are typically positive for CD15 and CD30, and negative for CD20 and CD45."
  },

  // PHARMACOLOGY
  {
    id: "PHA-001",
    subject: "Pharmacology",
    vignette: "A 50-year-old man with heart failure is started on an ACE inhibitor (Lisinopril). Two weeks later, he complains of a persistent, dry cough.",
    question: "What is the mechanism responsible for this adverse effect?",
    options: ["Accumulation of bradykinin", "Inhibition of renin release", "Increased angiotensin II production", "Blockade of substance P receptors"],
    answer: 0,
    explanation: "ACE (angiotensin-converting enzyme) normally breaks down bradykinin. Inhibiting ACE leads to an accumulation of bradykinin and substance P in the lungs, which irritates the airways and causes a dry, hacking cough."
  },
  {
    id: "PHA-002",
    subject: "Pharmacology",
    vignette: "A 70-year-old woman is brought to the ER with nausea, vomiting, blurry yellow vision, and confusion. Her ECG shows scooped ST segments. She has a history of atrial fibrillation and heart failure.",
    question: "Which medication is she most likely toxic from?",
    options: ["Amiodarone", "Digoxin", "Furosemide", "Metoprolol"],
    answer: 1,
    explanation: "These are classic signs of digoxin toxicity. Digoxin inhibits the Na+/K+ ATPase pump. Toxicity presents with GI distress, neurological symptoms (including yellow-tinted vision or halos), and cardiac arrhythmias with characteristic 'scooped' ST segments."
  },
  {
    id: "PHA-003",
    subject: "Pharmacology",
    vignette: "A patient with a systemic bacterial infection is treated with an antibiotic. Several days later, they develop severe Achilles tendon pain.",
    question: "Which class of antibiotics was most likely prescribed?",
    options: ["Macrolides", "Aminoglycosides", "Fluoroquinolones", "Tetracyclines"],
    answer: 2,
    explanation: "Fluoroquinolones (e.g., Ciprofloxacin, Levofloxacin) are associated with an increased risk of tendinopathy and tendon rupture, most commonly affecting the Achilles tendon, especially in older patients or those on concurrent corticosteroids."
  }
];
