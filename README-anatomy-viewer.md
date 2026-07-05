# 🩺 Interactive Anatomy Viewer

A high-fidelity, interactive, and clinically integrated medical education module designed for students preparing for licensing examinations (NEET PG, INICET, FMGE, USMLE, and PLAB).

This feature allows medical students to visualizes physiological organ networks, toggle anatomical systems, read high-yield pathology notes, and run diagnostic exam simulations on multiple organs in real-time.

---

## 🚀 Features

### 1. 🌌 Hologram 3D-ish Projection Canvas
* **Vector-based Silhouette**: A custom SVG-based visualization representing different systems of the human body.
* **Animated Physiological Overlays**:
  * **Nervous**: Glowing brain and firing electrical impulses along nerve pathways (using SVG stroke-dasharray and keyframes).
  * **Cardiovascular**: Pulsing heart model with red (arterial) and blue (venal) circulatory flow.
  * **Respiratory**: Breathing lungs showing lungs expanding and contracting.
  * **Digestive**: Detailed digestive tract showing esophageal passage, stomach, liver, and intestines.
  * **Skeletal**: Highly-detailed bone structure overlay including skull, spinal column, clavicles, ribs, pelvis, femurs, and arms.
* **Simulated 3D Rotation**: Perspective-based rotation of the body using custom sliders and auto-rotation tools.

### 2. 🔍 Smart Medical Search Bar
* Real-time search across names, clinical descriptions, symptoms, and pathology files.
* Instantly selects and zooms into the relevant organ, activating its target physiological system.

### 3. 📖 Dual Mode Interactive Board
* **Study Mode**:
  * **High-Yield Facts**: Highly tested points (e.g. pacemakers, ventricular segments, etc.) compiled for medical boards.
  * **Pathological Correlations**: Multi-system clinical diagnoses (such as Epidural Hematoma, Tetralogy of Fallot, and Pernicious Anemia).
  * **Symptom Flags**: Quick-view cards highlighting common presentation indicators.
* **Exam Mode**:
  * **Clinical Case Scenarios**: Integrated board-style MCQs challenging student diagnostic capabilities.
  * **Interactive Options**: Instant grading feedback (correct/incorrect colorization).
  * **Detailed Explanations**: Deep clinical rationale explaining the correct diagnosis and why other options are incorrect.

---

## 🛠️ Tech Stack & Integration

* **Framework**: Next.js App Router (React 19 / TypeScript)
* **Styling**: Tailwind CSS & Vanilla CSS Animations
* **Animations**: Framer Motion (for smooth AnimatePresence tab and mode switches)
* **Icons**: Lucide React

---

## 📂 File Architecture

1. **Component**: `components/anatomy/AnatomyViewer.tsx`
   * Contains the interactive SVG canvas, visual state managers, search indexing, and study/exam databases.
2. **Page Route**: `app/anatomy/page.tsx`
   * Next.js page wrapper implementing the student layout header (`NavbarStudent`) and footer (`FooterStudent`).
3. **Database Schema**:
   * Stored in `ANATOMICAL_DATABASE` with structured types mapping coords, notes, clinical symptoms, and multiple-choice questions.

---

## ⚙️ How to Use and Run

1. Make sure the development server is running:
   ```bash
   npm run dev
   ```
2. Navigate to:
   ```
   http://localhost:3000/anatomy
   ```
3. Use the search bar to locate **"Myocardial Infarction"** or **"Pernicious Anemia"** to test the selector.
4. Toggle to **Exam Mode** to test your medical knowledge.
