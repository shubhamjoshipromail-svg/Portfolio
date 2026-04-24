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
A live consulting engagement with the Alliance of Community Health Plans (ACHP), a national nonprofit representing nonprofit and community-based health plans that advocates on Medicare Advantage policy in Washington. Ongoing since 2025. Built a four-step ingestion pipeline across CMS Landscape, ACHP Crosswalk, monthly CPSC enrollment, and Plan Benefit Package (PBP) data. Produced dual-year 2025 and 2026 master files covering 138K+ plans across 208 columns, totaling 695 million enrollee-months. Ran supplemental benefit reduction analysis across dental, vision, hearing, transportation, OTC, and fitness categories. Validated k-means segmentation using three independent criteria — elbow curve, silhouette score, Davies-Bouldin index — and stress-tested with forced k=4 and k=5 solutions. Extended with region-level clustering and stratified HMO-vs-PPO clustering. Produced three findings used in ACHP's internal strategy discussions, including one that shifted advocacy emphasis toward transportation and hearing benefit retention — areas where nonprofit plans differentiate from national for-profit carriers. ACHP's policy positions reach Congressional staff working on Medicare Advantage legislation. Section anchor: cms-case-study.

## Case Study — FridgeChef (Agentic AI Product)
A deployed consumer AI product built in 2026. Turns fridge photos, receipts, and saved kitchen inventory into personalized recipe workflows. Stateless architecture, streaming UX via Server-Sent Events, multi-provider model routing. Orchestrates Claude Vision (for multimodal fridge photo input) and GPT-4o-mini (for low-cost text paths) to balance output quality and cost. Implements fuzzy deduplication and privacy-conscious stateless personalization. Deployed live on Railway. Codebase spans roughly 5,500 lines. Live demo URL: fride-project-production.up.railway.app. Section anchor: fridgechef-case-study.

## Case Study — RxCheck (Healthcare AI)
A pharmacist-facing drug interaction tracker built in 2026. The interesting engineering is not the AI — it is the data model and the boundary drawn around what the AI is allowed to do. Deterministic interaction checks run against a locally-imported clinical database (DDInter subset in SQLite); an LLM layer produces plain-English explanations under strict RAG with schema validation. Designed with FDA Non-Device Clinical Decision Support criteria in mind. Key technical decisions: two-table interaction model with canonical pair rows and per-source assertions; lexicographic DDI ordering enforced by CHECK constraint preventing (A,B)/(B,A) duplicates at the database level; RxNorm normalization pipeline with exact match, brand lookup, trigram fuzzy match, NDC fallback, with confirmed fuzzy matches written back as aliases; RAG-only LLM layer with schema validation on every response and cross-check that the model only references drugs present in the source data; hub drug scoring surfacing which single medication change would reduce interaction burden most for polypharmacy patients; HIPAA-ready schema shape with patient identifiers in a 1:1 child table; frozen run snapshots so the audit trail reflects what the pharmacist actually saw. Guiding principle: LLM as explainer, not source of truth. Stack: FastAPI, React, SQLite (Postgres-ready), Anthropic Claude. Live demo: pharmacy-production-f226.up.railway.app. Prototype, not for clinical use. Section anchor: rxcheck-case-study.

## Case Study — Nimbus (AI Companion Prototype)
Hackathon scaffold for a student-facing AI companion focused on burnout. Backend structure, seeded data, foundations for a gentler product experience. Prototype build. Section anchor: work.

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
