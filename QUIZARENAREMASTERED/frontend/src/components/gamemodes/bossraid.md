# BOSS RAID: ADVANCED COMBAT & MECHANICS DOCUMENT
**Game Mode:** Live Arena (1 Professor vs 48 Students)
**Aesthetic Profile:** Dark, glass-morphism science laboratory.

---

## 1. THE COMBAT MATH (HP & Conditional Damage)
**Boss Starting HP:** 1,000 Points
The Boss (Professor) does not take fixed damage. Damage is conditional, based on class performance and speed, calculating the "Class DPS" for every question.

### The Damage Formula
*   **Base Hit:** 1 Correct Answer = 1 Base Damage. (Max 48 Base Damage per round).
*   **Speed Multiplier:** The faster the student answers correctly, the higher their multiplier (e.g., answering in the first 2 seconds grants a 1.5x multiplier to their individual damage).
*   **Calculation:** Total Raid Damage = Sum of all individual (Base Hit * Speed Multiplier).
*   **Pacing:** A perfect class dealing maximum damage (48 students * 1.5x = 72 damage) will defeat the 1000 HP boss in about 14 rounds. A struggling class will take 20-25 rounds.

---

## 2. THE PROFESSOR'S ARSENAL (Skills & Ultimates)
The Professor is not just waiting; they are actively playing the game using a "Skill Deck."

### Skill 1: The "Override" (True/False Ultimate)
*   **Mechanic:** The Professor drags a glowing "Override" card into the arena. 
*   **Interaction:** They type a quick, custom statement or simply state it verbally to the room, then secretly lock in "True" or "False" on their UI. 
*   **Effect:** This forces a brutal 5-second sudden-death window for the students. It is highly gamified, allowing the professor to trick students with current lecture context.

### Skill 2: The "Evasion Protocol" (Dodge Card)
*   **Mechanic:** The Boss has a defensive cooldown card. 
*   **Effect:** If the class triggers a massive damage combo (e.g., 90% accuracy on a tough question), the Professor can pop the Dodge card. 
*   **Visual:** The boss entity phases out, "dodging" the incoming attack and nullifying 50% of the class's damage for that specific turn.

---

## 3. ACTION ECONOMY (Mitigating Question Overlap)
A major design flaw is the Professor dragging a new question while students are still answering. This breaks the game loop.

*   **The Global Cooldown (GCD):** While a question timer is active (e.g., 15 seconds), the Professor's drag-and-drop mechanics are completely locked. Their cards are grayed out.
*   **The Recovery Phase:** Once the student timer hits zero, a 3-second "Damage Resolution" phase occurs. 
*   **The Action Window:** Only after the damage resolves does the Professor's UI unlock, giving them a specific timer (e.g., 5 seconds) to drag their next skill or let the auto-queue fire the next standard question.

---

## 4. VISUAL & AUDITORY FEEDBACK (The Juice)
A boss fight needs to feel weighty and kinetic. 

*   **The Entity:** The Boss isn't just a health bar. Represent them as a central "AI Core" or a glowing structural node within the dark laboratory UI. 
*   **The Strike:** When students deal damage, bright, neon-colored slash animations tear across the frosted glass interface.
*   **The Reaction:** The Boss core violently shakes on impact. If the Boss uses the Evasion Protocol, the core glitches, turns translucent, and the slashes pass right through it, accompanied by a digital distortion sound effect.
*   **The Death Blow:** Hitting 0 HP shatters the Boss core entirely, fracturing the glass UI panels into a "Victory" screen for the class.

---

## 5. QUALITY OF LIFE (QoL): THE SMOOTH EXPERIENCE
A great concept dies if the UI is clunky. To make this actually playable in a live classroom, you need aggressive QoL features.

### For the Students: "The Telegraph"
*   **Visual State Shifts:** The ambient lighting of their dark glass UI must dictate the state of the game. Cool blue means "Auto-Attack Phase" (normal questions). When the Professor grabs the "Override" ultimate, the UI lighting must instantly shift to a pulsing amber/red. 
*   **The Warning Klaxon:** In real raids, bosses telegraph their massive attacks. When the Professor locks in a custom True/False question, a massive "WARNING: OVERRIDE IMMINENT" alert should flash across the screen for 2 seconds before the 5-second timer starts. This stops students from looking down at their notes and forces their eyes to the screen.

### For the Professor: "The DM Dashboard"
*   **Magnetic Drop Zones:** Do not make the professor precisely aim their mouse. When they drag a skill card, the entire center of their screen should become a massive, glowing "magnetic" drop zone that snaps the card into place. Clunky dragging ruins the power trip.
*   **Aggregated Threat Board:** Do not clutter the Professor's screen with 48 individual student names. Show a single "Class Accuracy" gauge, and use a scrolling "Kill Feed" on the side (e.g., "Student X landed a Critical Hit!") so they can see who the top performers are without being overwhelmed by data.