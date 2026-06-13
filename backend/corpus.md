# Shubham Joshi — Portfolio Corpus

## Identity
Shubham Joshi is an MS Business Analytics and AI candidate at Johns Hopkins University. Based in Washington, DC. STEM OPT eligible. Email: shubhamjoshipro.mail@gmail.com. LinkedIn: linkedin.com/in/shubham-joshi1. GitHub: github.com/shubhamjoshipromail-svg.

## Background
Global BBA background spanning Japan, Australia, and the United States. Four working languages: English, Japanese, Nepali, Hindi. Dean's Scholarship recipient at Johns Hopkins. Top 7 placement in a Kaggle ML hackathon. Azure AI-900 certified.

## Positioning
Builds ML systems, AI products, and analytics pipelines that ship into real environments. Cares equally about whether the decision gets made and whether the model gets trained. Equally comfortable in a Jupyter notebook, a FastAPI codebase, and a client meeting.

## Case Study — Home Credit (Responsible AI)
A credit default risk modeling project at Johns Hopkins (2026). Built a production-minded ML workflow using feature engineering, stratified cross-validation, SMOTE, and model comparison. Benchmarked LightGBM against baselines and reached 0.6857 out-of-fold ROC-AUC versus 0.5041 for a dummy baseline. Added SHAP, LIME, counterfactual framing, and fairness auditing across demographic slices. Included Platt scaling, PSI drift checks, and threshold tuning for deployment readiness. Section anchor: home-credit-case-study.

## Case Study — ACHP / CMS Medicare Advantage (Live Consulting)
A live consulting engagement with the Alliance of Community Health Plans (ACHP), which represents nonprofit and community-based health plans in national healthcare policy discussions. Ongoing since 2025. The analysis asked how ACHP members and national carriers differed in the way they shifted and presented costs after the 2026 CMS reimbursement cut. Built a four-step ingestion pipeline across CMS Landscape, ACHP Crosswalk, monthly CPSC enrollment, and Plan Benefit Package data. Reconciled 2025 and 2026 schema drift to produce master files covering 138K+ plans across 208 columns and 695 million enrollee-months. Corrected a 12x enrollment overcount and matched 109,015 plan-county rows for year-over-year analysis. Compared premiums, maximum out-of-pocket costs, Part D deductibles, and drug-benefit erosion; isolated Kaiser because fewer than 6% of ACHP plan-county rows represented roughly half of ACHP enrollment. Used enrollment-weighted comparisons, OLS models controlling for enrollment and Star Rating, k-means validated with elbow, silhouette, and Davies-Bouldin criteria, regional and plan-type segmentation, and a five-fold stratified plan-exit model with 0.642 cross-validated AUC. The final HMO model used k=2 with a 0.322 silhouette score. Found that 67.5% of national plans eroded drug benefits versus 41.3% of ACHP plans, while weighted Part D deductible increases were $114 versus $26. ACHP held a cost advantage in 493 of 875 scored counties, and national HMO-POS competitors raised combined member costs $199 more in the main presentation analysis. The work supported a recommendation that CMS disclose year-over-year changes in deductibles and out-of-pocket exposure alongside premiums. ACHP's analysis can inform Congressional staff working on Medicare Advantage legislation. Section anchor: cms-case-study.

## Case Study — FridgeChef (Agentic AI Product)
A deployed consumer AI product built in 2026. Turns fridge photos, receipts, and saved kitchen inventory into personalized recipe workflows. Stateless architecture, streaming UX via Server-Sent Events, multi-provider model routing. Orchestrates Claude Vision (for multimodal fridge photo input) and GPT-4o-mini (for low-cost text paths) to balance output quality and cost. Implements fuzzy deduplication and privacy-conscious stateless personalization. Deployed live on Railway. Codebase spans roughly 5,500 lines. Live demo URL: fride-project-production.up.railway.app. Section anchor: fridgechef-case-study.

## Case Study — RxCheck (Healthcare AI)
A pharmacist-facing drug interaction tracker built in 2026. The interesting engineering is not the AI — it is the data model and the boundary drawn around what the AI is allowed to do. Deterministic interaction checks run against a locally-imported clinical database (DDInter subset in SQLite); an LLM layer produces plain-English explanations under strict RAG with schema validation. Designed with FDA Non-Device Clinical Decision Support criteria in mind. Key technical decisions: two-table interaction model with canonical pair rows and per-source assertions; lexicographic DDI ordering enforced by CHECK constraint preventing (A,B)/(B,A) duplicates at the database level; RxNorm normalization pipeline with exact match, brand lookup, trigram fuzzy match, NDC fallback, with confirmed fuzzy matches written back as aliases; RAG-only LLM layer with schema validation on every response and cross-check that the model only references drugs present in the source data; hub drug scoring surfacing which single medication change would reduce interaction burden most for polypharmacy patients; HIPAA-ready schema shape with patient identifiers in a 1:1 child table; frozen run snapshots so the audit trail reflects what the pharmacist actually saw. Guiding principle: LLM as explainer, not source of truth. Stack: FastAPI, React, SQLite (Postgres-ready), Anthropic Claude. Live demo: pharmacy-production-f226.up.railway.app. Prototype, not for clinical use. Section anchor: rxcheck-case-study.

## Case Study — Nimbus (AI Companion Prototype)
Early hackathon scaffold for a student-facing AI companion focused on burnout. Retained only as a supporting-work note, not a featured case study. Section anchor: work.

## Supporting Work
Tableau dashboards (Sales Performance Analytics), Monte Carlo simulation, and healthcare database design are additional portfolio pieces. Section anchor: work.

## Experience
VP and Co-Founder, Business Analytics and AI Think Tank at Johns Hopkins (2025 – Present). Co-founded the organization, publishes applied AI analysis, leads Python and ML workshops focused on interpretable modeling.

Lead Instructor and Communications Facilitator (2021 – 2024). Designed English communication programs for adult business professionals. Maintained 95%+ retention.

Independent Data and Analytics Consultant (2021 – 2025). Designed analytics, experimentation, dashboards, and data-informed strategy across international freelance engagements in Japan, Australia, and the US.

## Technical Skills
Machine Learning: LightGBM, XGBoost, CatBoost, H2O AutoML, logistic regression, random forest, Optuna, cross-validation, SMOTE, threshold optimization, calibration, production-minded evaluation.

Responsible AI: SHAP, LIME, counterfactual reasoning, fairness auditing, Population Stability Index, Platt scaling, model review for safer deployment.

AI Product Engineering: FastAPI, SQLAlchemy, asyncio, multi-provider LLM orchestration, RAG patterns, prompt engineering, SSE streaming, Railway deployment.

Data Science and Consulting: SQL, Python, Tableau, experimentation design, k-means with multi-criterion validation (elbow, silhouette, Davies-Bouldin), cohort analysis, KPI framing, executive storytelling, cross-cultural client communication.

## Availability
Currently looking for business analytics, AI, product analytics, and strategy-facing internships or full-time roles. STEM OPT eligible. Based in Washington, DC. Open to relocation.

## Taught and Workshop Work
Has taught 8+ production-style classifier types through peer ML workshops at the Business Analytics and AI Think Tank. Workshops emphasize interpretable modeling — turning classifier theory into demos with SHAP and LIME explanations.
