# HydroMesh: Legal, Privacy & Operational Product Safety Pack
## Comprehensive Pre-Pilot Governance & Compliance Framework

---

### Master Overview
* **Prototype Name:** HydroMesh (FloodNet Twin)
* **Project Team:** Output Outlaws (University of Birmingham / Dubai-linked development)
* **Current Operational Stage:** Pre-pilot / Controlled Research Testing (No live municipal deployment, no commercial transactions, no public market launch).
* **Primary Statutory Anchors:** UAE Personal Data Protection Law (Federal Decree-Law No. 45/2021), India Digital Personal Data Protection Act 2023 (DPDP) + DPDP Rules 2025, and GDPR-aligned international best practices.
* **Core Institutional Contact:** `[EMAIL]` (Academic Lead & Research Team)

---

# Document 1: Privacy Policy (Public-Facing)

### 1. Purpose
This Privacy Policy explains how the HydroMesh research team collects, uses, stores, and protects personal and spatial telemetry data during pre-pilot field testing of the HydroMesh mobile resilience prototype.

> **Important: This is a prototype, not an emergency service.**

### 2. Legal Basis & Scope
Processing is conducted on the basis of **explicit user consent** (UAE PDPL Art. 5; India DPDP Act 2023 §6) and **legitimate disaster mitigation research** (India DPDP Act 2023 §4; GDPR Art. 6(1)(a)/(d)).

### 3. What We Collect & Why (Data Minimisation)
In strict accordance with data minimisation, we collect only data strictly necessary for mapping flood levels, computing safe routing, and testing localized response:
* **Location Telemetry:** Ephemeral GPS coordinates (latitude and longitude) captured only when you submit an active report or activate an SOS beacon.
* **Temporal Data:** Report creation timestamps.
* **Physical Observation:** Water-level category (Ankle, Knee, Waist).
* **Optional Data:** User-uploaded situational photos (stored without EXIF identity metadata) and optional temporary device tokens.

### 4. How Data Is Stored & Transferred (Cross-Border Flow)
Reports are stored in an encrypted PostgreSQL/PostGIS database and visualized on a private responder dashboard. Because our development and research team is distributed across the **UAE (Dubai)** and **India**, with research contributors across **Africa and Asia**, authorized team members may access aggregated telemetry across these borders. All cross-border transfers utilize encrypted channels and adhere to UAE PDPL Art. 22 and India DPDP cross-border guidelines.

### 5. Data Security
* **At Rest:** AES-256 database encryption.
* **In Transit:** TLS 1.2+ end-to-end transport layer security.
* **Access Control:** Restricted strictly to core academic team researchers.

### 6. Children & Vulnerable Users
HydroMesh does not target, market to, or knowingly collect data from minors under 18 years of age. If a minor participates in testing, verified prior parental or guardian consent is mandatory under India DPDP Act §9 and UAE PDPL regulations.

### 7. Contact & Data Protection Officer (DPO)
* **General Contact:** `[EMAIL]`
* **DPO Applicability Note:** A statutory Data Protection Officer is mandatory under UAE PDPL Art. 10 and India DPDP Act §10 only when an entity conducts large-scale processing of sensitive data or systematic public surveillance. Because HydroMesh operates solely as an academic, small-scale pre-pilot research prototype, a formal DPO is not currently required. Inquiries are managed directly by the core leadership team.

**Reviewed on [DATE]** · **Version: Prototype v1.0**

---

# Document 2: Terms of Use / Prototype Disclaimer (Public-Facing)

### 1. Purpose
These Terms govern volunteer participation in testing the experimental HydroMesh digital twin mobile prototype.

> **Important: This is a prototype, not an emergency service.**

### 2. Legal Basis & Scope
Participation is voluntary and contractual under experimental research terms (UAE Civil Transactions Law; Indian Contract Act 1872).

### 3. Experimental Research Prototype Only
HydroMesh is an academic research demonstration created by the Output Outlaws team at the University of Birmingham (Dubai-linked). It is provided strictly on an **"AS IS" and "AS AVAILABLE"** basis without commercial warranties, uptime service level agreements (SLAs), or operational guarantees. 

### 4. Absolute Emergency Disclaimer
**HydroMesh does not dispatch official police, fire, medical, coast guard, or municipal disaster rescue units.** If you or someone around you faces immediate danger, injury, or rising water, you must immediately contact statutory national emergency dispatchers:
* **United Arab Emirates:** 999 (Police) / 997 (Fire)
* **India:** 112 (National Emergency) / 100 (Police)
* **United Kingdom:** 999 / 112
* **International:** 112

### 5. User Conduct & Acceptable Use
Testers must submit only genuine observations. Submitting hoax SOS beacons, malicious location spoofing, or inappropriate imagery is strictly prohibited and results in immediate termination of test access.

### 6. Cross-Border Research Operations
Testing is coordinated between research nodes in **Dubai (UAE)** and **India**, with contributors across **Africa and Asia**. By participating, testers acknowledge cross-border telemetry exchange for spatial research modeling.

### 7. Security & Data Minimisation
Data collection is confined strictly to flood-mapping telemetry. Communications are secured via TLS 1.2+ and AES-256 encryption.

### 8. Children & Vulnerable Users
Users must be at least 18 years old or possess verified parental/guardian permission to participate.

### 9. Contact
For operational inquiries: `[EMAIL]`

**Reviewed on [DATE]** · **Version: Prototype v1.0**

---

# Document 3: Consent Wording for Flood Reports & SOS (Short In-App Text)

### 1. Purpose
Provides explicit, plain-language consent microcopy displayed within the HydroMesh mobile app before data transmission.

> **Important: This is a prototype, not an emergency service.**

### 2. Legal Basis & Scope
Valid consent microcopy satisfying UAE PDPL Art. 5, India DPDP Act §6, and GDPR Art. 7.

### 3. In-App Consent Microcopy (Copy-Paste Ready)

#### A. Flood Report Submission Modal
```
[ ] SHARE FLOOD OBSERVATION (Pre-Pilot Test)
By submitting this report, you consent to sharing your approximate GPS 
coordinates, timestamp, water level (ankle/knee/waist), and optional photo 
with HydroMesh researchers.

• Purpose: Aggregating local drainage hazard maps.
• Security: Encrypted via TLS 1.2+ / AES-256. Access restricted to core team.
• Cross-border: Telemetry may be processed by research leads in UAE and India.
• You must be 18+ or have parental consent.
```

#### B. Emergency SOS Beacon Modal
```
⚠️ ACTIVATE EMERGENCY SOS BEACON
IMPORTANT: HydroMesh is an experimental academic prototype.
ACTIVATING THIS BEACON DOES NOT CONTACT POLICE, AMBULANCE, OR FIRE SERVICES.

By activating, you consent to broadcasting your live coordinates to 
nearby peer devices and our research monitoring dashboard.
If you are in immediate life-threatening danger, DIAL STATUTORY 
EMERGENCY SERVICES (UAE: 999 | India: 112) IMMEDIATELY.

[ CONFIRM SOS BROADCAST ]          [ CANCEL ]
```

### 4. Data Minimisation & Security
Collects only coordinates, timestamp, and severity. Encrypted with AES-256 at rest and TLS 1.2+ in transit.

### 5. Contact
`[EMAIL]`

**Reviewed on [DATE]** · **Version: Prototype v1.0**

---

# Document 4: “Not an Emergency Service” Notice (Short, Bold, Copy-Paste Ready)

### 1. Purpose
A standalone, high-visibility statutory notice for app splash screens, documentation headers, and printed pilot field kits.

> **Important: This is a prototype, not an emergency service.**

### 2. Legal Basis & Scope
Product safety disclosure mitigating assumption of municipal duty of care.

### 3. High-Visibility Notice Text
```
*******************************************************************************
                     ⚠️ NOTICE: NOT AN EMERGENCY SERVICE ⚠️
                  HYDROMESH IS AN EXPERIMENTAL PROTOTYPE ONLY
*******************************************************************************

HydroMesh is a university research prototype designed to evaluate peer-to-peer 
flood mapping. It is NOT certified, equipped, or authorized to dispatch 
statutory emergency response units.

DO NOT RELY ON THIS APPLICATION FOR LIFE-SAVING RESCUE OR EVACUATION ASSISTANCE.

IF YOU ARE IN IMMEDIATE PHYSICAL DANGER, CONTACT LOCAL AUTHORITIES:
• UNITED ARAB EMIRATES:  999 (Police) | 997 (Civil Defence / Fire)
• INDIA:                 112 (All-in-One Emergency) | 100 (Police)
• UNITED KINGDOM:        999 or 112
• EUROPE / GLOBAL:       112

The Output Outlaws research team, the University of Birmingham, and academic 
partners accept zero liability for injuries, damage, or delayed rescue resulting 
from reliance on this prototype software.
*******************************************************************************
```

### 4. Security & Governance
Maintained by the HydroMesh research cohort. Contact: `[EMAIL]`.

**Reviewed on [DATE]** · **Version: Prototype v1.0**

---

# Document 5: Data Retention & Deletion Policy (Internal + Short Public Summary)

### 1. Purpose
Defines mandatory data retention windows and erasure procedures for citizen observations collected during prototype trials.

> **Important: This is a prototype, not an emergency service.**

### 2. Legal Basis & Scope
Storage limitation principles under UAE PDPL Art. 8 and India DPDP Act §8(7).

### 3. Public Summary
HydroMesh retains volunteer telemetry only as long as necessary for technical validation:
* **Active Flood Micro-Reports:** Automatically expunged from mobile devices and edge relays within **24 hours** of report creation.
* **SOS Incident Records:** Retained on secure servers for **30 days** solely for post-test safety reviews, then permanently shredded.
* **Aggregated Hazard Maps:** Anonymized spatial contour polygons (without timestamps, photos, or device tokens) are retained for scholarly publication.

### 4. Tester Right to Deletion
Testers may demand instant erasure of their test submissions at any time by contacting `[EMAIL]`. Deletion requests will be fulfilled across PostgreSQL database replicas within **72 hours**.

### 5. Security & Cross-Border Rules
All retained data is secured using AES-256 database encryption and TLS 1.2+ transit pipes. Cross-border synchronization between **UAE (Dubai)** and **India** servers is subject to access logs audited bi-weekly.

### 6. Children & Vulnerable Users
If records are identified as belonging to an unauthorized minor, they are purged immediately without delay.

### 7. Contact & DPO Note
Contact `[EMAIL]`. (DPO exempt during academic pre-pilot stage).

**Reviewed on [DATE]** · **Version: Prototype v1.0**

---

# Document 6: Incident Escalation Rules (Operational Playbook for SOS / Safety Incidents)

### 1. Purpose
Establishes mandatory internal operational protocols for the HydroMesh research team if an SOS beacon or high-water distress report is received during pre-pilot testing.

> **Important: This is a prototype, not an emergency service.**

### 2. Legal Basis & Scope
Operational safety duty of care and humanitarian exception under India DPDP Act §6(2)(d) and UAE PDPL Art. 4(3).

### 3. Four-Step Escalation Protocol

```
+-------------------------------------------------------------------------------+
|  STEP 1: IMMEDIATE RECEIPT & ON-CALL TRIAGE (< 2 MINUTES)                    |
|  * Dashboard triggers audible chime; On-Call Research Lead notified.          |
|  * Extract: Timestamp, Coordinates, Registered Tester ID, Water Level.         |
+---------------------------------------+---------------------------------------+
                                        |
                                        v
+-------------------------------------------------------------------------------+
|  STEP 2: TESTER AUTHENTICATION & DIRECT CONTACT (< 3 MINUTES)                 |
|  * Lead initiates direct phone call to the registered volunteer tester.       |
|  * Scenario A (Accidental/Test Tap): Cancel alarm; record false alarm note.   |
|  * Scenario B (Unreachable or Real Distress): PROCEED TO STEP 3 IMMEDIATELY.  |
+---------------------------------------+---------------------------------------+
                                        |
                                        v
+-------------------------------------------------------------------------------+
|  STEP 3: STATUTORY EMERGENCY DISPATCH NOTIFICATION (< 5 MINUTES)              |
|  * Lead calls official national dispatch (UAE: 999 | India: 112 | UK: 999).    |
|  * State clearly: "We are researchers conducting a flood app test. A tester   |
|    has triggered a distress beacon at [GPS Coordinates] and is unreachable." |
+---------------------------------------+---------------------------------------+
                                        |
                                        v
+-------------------------------------------------------------------------------+
|  STEP 4: INCIDENT LOGGING & PRIVACY COMPLIANCE (< 24 HOURS)                   |
|  * Document response times, authority contact, and outcome in secure log.     |
|  * Encrypted storage under AES-256; retained for 30 days for safety audit.   |
+-------------------------------------------------------------------------------+
```

### 4. Cross-Border & Data Minimisation
Escalation logs store only coordinates, caller timestamp, and dispatch reference numbers. Cross-border sharing between UAE and India on-call team members is encrypted.

### 5. Contact
Emergency Lead On-Call: `[EMAIL]`

**Reviewed on [DATE]** · **Version: Prototype v1.0**

---

### Concluding Legal Note
*This is a prototype policy pack designed for controlled academic testing; formal professional legal review is strongly recommended prior to any public or commercial launch.*

---

### How to Use This Pack (For the HydroMesh Team)
This document pack serves as the comprehensive legal and operational baseline for all HydroMesh pre-pilot activities. Deploy Document 1 (Privacy Policy) and Document 2 (Terms of Use) on the public landing page under the `#legal` route; implement Document 3 (Consent Microcopy) verbatim in the Flutter mobile intake and SOS dialogs; embed Document 4 (Emergency Disclaimer) on the app splash screen and print it onto field-test briefing cards; enforce Document 5 (Retention Schedule) via database cron jobs running `DELETE FROM flood_reports WHERE created_at < NOW() - INTERVAL '24 hours'`; and mandate that all researchers on duty during live trials memorize and follow Document 6 (Incident Escalation Playbook).
