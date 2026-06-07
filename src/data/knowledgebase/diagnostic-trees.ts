/**
 * @module knowledgebase/diagnostic-trees
 * @description Diagnostic decision trees for guided injury discovery.
 * Each tree starts from a body region and narrows down to a specific injury.
 */

import type { DiagnosticNode } from './types';

/** All diagnostic nodes indexed by ID for O(1) lookup */
export const diagnosticNodes: Record<string, DiagnosticNode> = {
  /* ════ Lateral Ankle Sprain Tree ════ */
  'las-q1': {
    id: 'las-q1', type: 'question', category: 'mechanism',
    content: 'How did your ankle injury occur?',
    options: [
      { label: 'Rolled inward (foot went under)', nextNodeId: 'las-q2' },
      { label: 'Rolled outward', nextNodeId: 'las-medial' },
      { label: 'Direct impact / collision', nextNodeId: 'las-q2' },
      { label: 'Gradual onset / no specific event', nextNodeId: 'las-overuse' },
    ],
  },
  'las-q2': {
    id: 'las-q2', type: 'question', category: 'symptom',
    content: 'Can you bear weight and take 4 steps?',
    options: [
      { label: 'Yes, with some pain', nextNodeId: 'las-q3' },
      { label: 'No, unable to walk', nextNodeId: 'las-ottawa' },
    ],
  },
  'las-q3': {
    id: 'las-q3', type: 'question', category: 'location',
    content: 'Where is the main area of pain?',
    options: [
      { label: 'Outside (lateral) ankle', nextNodeId: 'las-q4', highlightMuscles: ['left-soleus', 'right-soleus'], modelType: 'anterior' },
      { label: 'Inside (medial) ankle', nextNodeId: 'las-medial', highlightMuscles: ['left-soleus', 'right-soleus'], modelType: 'anterior' },
      { label: 'Front of ankle', nextNodeId: 'las-anterior', highlightMuscles: ['left-soleus', 'right-soleus'], modelType: 'anterior' },
      { label: 'Back of ankle / Achilles area', nextNodeId: 'at-q1', highlightMuscles: ['calves'], modelType: 'posterior' },
    ],
  },
  'las-q4': {
    id: 'las-q4', type: 'question', category: 'severity',
    content: 'How much swelling developed and how quickly?',
    options: [
      { label: 'Mild swelling over 24+ hours', nextNodeId: 'las-grade1' },
      { label: 'Moderate swelling within hours', nextNodeId: 'las-grade2' },
      { label: 'Severe immediate swelling with bruising', nextNodeId: 'las-grade3' },
    ],
  },
  'las-grade1': {
    id: 'las-grade1', type: 'result', resultInjuryId: 'lateral-ankle-sprain',
    content: 'Your symptoms are consistent with a Grade I Lateral Ankle Sprain (mild ligament stretch). The ATFL ligament is likely mildly stretched but intact.',
    detail: 'Good prognosis — most Grade I sprains recover in 2-4 weeks with appropriate rehabilitation.',
  },
  'las-grade2': {
    id: 'las-grade2', type: 'result', resultInjuryId: 'lateral-ankle-sprain',
    content: 'Your symptoms are consistent with a Grade II Lateral Ankle Sprain (partial tear). The ATFL and possibly CFL ligaments have partial tearing.',
    detail: 'Recovery typically takes 4-8 weeks. Rehabilitation focusing on balance and proprioception is essential to prevent chronic ankle instability.',
  },
  'las-grade3': {
    id: 'las-grade3', type: 'result', resultInjuryId: 'lateral-ankle-sprain',
    content: 'Your symptoms suggest a Grade III Lateral Ankle Sprain (complete tear). Consider professional assessment for imaging.',
    detail: 'Recovery may take 8-12 weeks. Professional evaluation is recommended to rule out fracture and assess stability.',
  },
  'las-ottawa': {
    id: 'las-ottawa', type: 'referral',
    content: '⚠️ Based on your inability to bear weight, the Ottawa Ankle Rules suggest you should seek professional assessment to rule out a fracture.',
    detail: 'An X-ray is recommended before beginning any self-treatment. Please see a healthcare provider promptly.',
  },
  'las-medial': {
    id: 'las-medial', type: 'referral',
    content: 'Medial (inside) ankle injuries may involve the deltoid ligament or associated fractures. Professional assessment is recommended.',
    detail: 'Medial ankle sprains are less common and can be associated with more complex injuries.',
  },
  'las-anterior': {
    id: 'las-anterior', type: 'info',
    content: 'Anterior ankle pain may involve the anterior tibiofibular ligament (high ankle sprain) or ankle impingement.',
    nextNodeId: 'las-ottawa',
  },
  'las-overuse': {
    id: 'las-overuse', type: 'info',
    content: 'Gradual onset ankle pain is not typically a ligament sprain. This may be a tendinopathy or stress injury.',
    nextNodeId: 'at-q1',
  },

  /* ════ ACL Injury Tree ════ */
  'acl-q1': {
    id: 'acl-q1', type: 'question', category: 'mechanism',
    content: 'How did your knee injury occur?',
    options: [
      { label: 'Non-contact pivot/cut/landing', nextNodeId: 'acl-q2' },
      { label: 'Direct blow to knee', nextNodeId: 'acl-q2' },
      { label: 'Hyperextension', nextNodeId: 'acl-q2' },
      { label: 'Gradual onset — no specific event', nextNodeId: 'pfps-q1' },
    ],
  },
  'acl-q2': {
    id: 'acl-q2', type: 'question', category: 'symptom',
    content: 'Did you hear or feel a "pop" at the time of injury?',
    options: [
      { label: 'Yes, a distinct pop', nextNodeId: 'acl-q3' },
      { label: 'No pop, but knee swelled quickly', nextNodeId: 'acl-q3' },
      { label: 'No pop, minimal swelling', nextNodeId: 'pfps-q1' },
    ],
  },
  'acl-q3': {
    id: 'acl-q3', type: 'question', category: 'symptom',
    content: 'How quickly did swelling develop?',
    options: [
      { label: 'Within 2 hours (rapid haemarthrosis)', nextNodeId: 'acl-q4' },
      { label: 'Gradually over 24-48 hours', nextNodeId: 'acl-meniscal' },
      { label: 'Minimal or no swelling', nextNodeId: 'pfps-q1' },
    ],
  },
  'acl-q4': {
    id: 'acl-q4', type: 'question', category: 'symptom',
    content: 'Does your knee feel unstable — like it might "give way" when turning?',
    options: [
      { label: 'Yes, significant instability', nextNodeId: 'acl-result' },
      { label: 'Some instability', nextNodeId: 'acl-result' },
      { label: 'No instability', nextNodeId: 'acl-meniscal' },
    ],
  },
  'acl-result': {
    id: 'acl-result', type: 'result', resultInjuryId: 'acl-injury',
    content: 'Your symptoms are strongly suggestive of an ACL injury. The combination of non-contact mechanism, pop, rapid swelling, and instability is the classic presentation.',
    detail: 'Professional assessment with MRI is strongly recommended. Treatment may be surgical or conservative depending on activity demands and associated injuries.',
  },
  'acl-meniscal': {
    id: 'acl-meniscal', type: 'referral',
    content: 'Your symptoms may indicate a meniscal injury or other intra-articular pathology. Professional assessment is recommended.',
    detail: 'Delayed swelling and mechanical symptoms (catching/locking) are more typical of meniscal injuries.',
  },

  /* ════ PFPS Tree ════ */
  'pfps-q1': {
    id: 'pfps-q1', type: 'question', category: 'onset',
    content: 'How did your knee pain begin?',
    options: [
      { label: 'Gradually — no specific injury', nextNodeId: 'pfps-q2' },
      { label: 'After increasing training volume', nextNodeId: 'pfps-q2' },
      { label: 'After a specific traumatic event', nextNodeId: 'acl-q1' },
    ],
  },
  'pfps-q2': {
    id: 'pfps-q2', type: 'question', category: 'location',
    content: 'Where exactly is your knee pain?',
    options: [
      { label: 'Around or behind the kneecap', nextNodeId: 'pfps-q3', highlightMuscles: ['knees'], modelType: 'anterior' },
      { label: 'Below the kneecap (on the tendon)', nextNodeId: 'pfps-patellar-tend', highlightMuscles: ['knees'], modelType: 'anterior' },
      { label: 'Outside of the knee', nextNodeId: 'pfps-itbs', highlightMuscles: ['knees'], modelType: 'anterior' },
      { label: 'Inside of the knee', nextNodeId: 'pfps-medial', highlightMuscles: ['knees'], modelType: 'anterior' },
    ],
  },
  'pfps-q3': {
    id: 'pfps-q3', type: 'question', category: 'symptom',
    content: 'Which activities make your pain worse? (Select the most bothersome)',
    options: [
      { label: 'Squatting, lunging, or stairs', nextNodeId: 'pfps-q4' },
      { label: 'Prolonged sitting (movie sign)', nextNodeId: 'pfps-q4' },
      { label: 'Running only', nextNodeId: 'pfps-q4' },
    ],
  },
  'pfps-q4': {
    id: 'pfps-q4', type: 'physical-test', category: 'test',
    content: 'Single-leg squat test: Stand on the affected leg and slowly squat to ~60°. Watch your knee in a mirror.',
    detail: 'Observe: Does your knee collapse inward? Is the pain reproduced?',
    options: [
      { label: 'Pain reproduced, knee drifts inward', nextNodeId: 'pfps-result' },
      { label: 'Pain reproduced, good alignment', nextNodeId: 'pfps-result' },
      { label: 'No pain with this test', nextNodeId: 'pfps-patellar-tend' },
    ],
  },
  'pfps-result': {
    id: 'pfps-result', type: 'result', resultInjuryId: 'patellofemoral-pain',
    content: 'Your symptoms are consistent with Patellofemoral Pain Syndrome (PFPS). This is an overuse condition related to patellofemoral joint loading.',
    detail: 'Treatment focuses on hip and quadriceps strengthening, load management, and addressing biomechanical factors. Prognosis is good with appropriate rehabilitation.',
  },
  'pfps-patellar-tend': {
    id: 'pfps-patellar-tend', type: 'info',
    content: 'Pain localized to the patellar tendon (below the kneecap) may indicate patellar tendinopathy ("jumper\'s knee").',
    nextNodeId: 'pfps-result',
  },
  'pfps-itbs': {
    id: 'pfps-itbs', type: 'info',
    content: 'Lateral knee pain in runners may indicate Iliotibial Band Syndrome (ITBS).',
    nextNodeId: 'pfps-result',
  },
  'pfps-medial': {
    id: 'pfps-medial', type: 'referral',
    content: 'Medial knee pain may have various causes including MCL sprain, meniscal injury, or pes anserine bursitis. Professional assessment is recommended.',
  },

  /* ════ Plantar Fasciitis Tree ════ */
  'pf-q1': {
    id: 'pf-q1', type: 'question', category: 'symptom',
    content: 'Is your pain worst with your first steps in the morning?',
    options: [
      { label: 'Yes — classic first-step pain', nextNodeId: 'pf-q2' },
      { label: 'No — pain is constant or worse at night', nextNodeId: 'pf-night' },
    ],
  },
  'pf-q2': {
    id: 'pf-q2', type: 'question', category: 'location',
    content: 'Where exactly is the pain on your foot?',
    options: [
      { label: 'Under the heel (plantar surface)', nextNodeId: 'pf-q3', highlightMuscles: ['left-soleus', 'right-soleus'], modelType: 'posterior' },
      { label: 'Back of heel (Achilles area)', nextNodeId: 'at-q1', highlightMuscles: ['calves'], modelType: 'posterior' },
      { label: 'Arch of the foot', nextNodeId: 'pf-q3', highlightMuscles: ['left-soleus', 'right-soleus'], modelType: 'posterior' },
      { label: 'Ball of the foot / toes', nextNodeId: 'pf-metatarsal', highlightMuscles: ['left-soleus', 'right-soleus'], modelType: 'posterior' },
    ],
  },
  'pf-q3': {
    id: 'pf-q3', type: 'physical-test', category: 'test',
    content: 'Windlass Test: Sit down and pull your big toe back toward your shin while pressing on the plantar fascia (bottom of the foot near the heel).',
    detail: 'Does this reproduce your familiar heel/arch pain?',
    options: [
      { label: 'Yes — reproduces my pain', nextNodeId: 'pf-result' },
      { label: 'No — different pain or no pain', nextNodeId: 'pf-other' },
    ],
  },
  'pf-result': {
    id: 'pf-result', type: 'result', resultInjuryId: 'plantar-fasciitis',
    content: 'Your symptoms are consistent with Plantar Fasciitis (plantar heel pain). The combination of first-step morning pain, plantar heel tenderness, and positive Windlass test is the classic presentation.',
    detail: 'Treatment involves calf stretching, plantar fascia-specific stretching, footwear optimization, and progressive loading. Most cases resolve within 6-12 months.',
  },
  'pf-night': {
    id: 'pf-night', type: 'referral',
    content: 'Heel pain that is worst at night or unrelated to first-step loading may indicate a stress fracture or other condition. Professional assessment is recommended.',
  },
  'pf-metatarsal': {
    id: 'pf-metatarsal', type: 'referral',
    content: 'Ball-of-foot pain is not consistent with plantar fasciitis and may indicate metatarsalgia, Morton\'s neuroma, or stress fracture. Professional assessment is recommended.',
  },
  'pf-other': {
    id: 'pf-other', type: 'referral',
    content: 'Your symptoms don\'t clearly match plantar fasciitis. Professional assessment is recommended for accurate diagnosis.',
  },

  /* ════ Concussion Tree ════ */
  'conc-q1': {
    id: 'conc-q1', type: 'question', category: 'mechanism',
    content: '⚠️ IMPORTANT: Did you experience a blow or jolt to the head, face, or body that transmitted force to the head?',
    options: [
      { label: 'Yes — direct or indirect head impact', nextNodeId: 'conc-q2' },
      { label: 'No head impact', nextNodeId: 'conc-no' },
    ],
  },
  'conc-q2': {
    id: 'conc-q2', type: 'question', category: 'symptom',
    content: 'Are any of these RED FLAG symptoms present RIGHT NOW?',
    detail: 'Neck pain, double vision, weakness/tingling in arms/legs, severe headache, seizure, loss of consciousness, deteriorating, confusion, vomiting',
    options: [
      { label: 'YES — one or more red flags present', nextNodeId: 'conc-emergency' },
      { label: 'No red flags currently', nextNodeId: 'conc-q3' },
    ],
  },
  'conc-q3': {
    id: 'conc-q3', type: 'question', category: 'symptom',
    content: 'Which symptoms are you experiencing? (Select the most prominent)',
    options: [
      { label: 'Headache, pressure in head', nextNodeId: 'conc-result' },
      { label: 'Dizziness, balance problems', nextNodeId: 'conc-result' },
      { label: 'Feeling "foggy" or "not right"', nextNodeId: 'conc-result' },
      { label: 'Memory problems, confusion', nextNodeId: 'conc-result' },
      { label: 'Sensitivity to light or noise', nextNodeId: 'conc-result' },
    ],
  },
  'conc-result': {
    id: 'conc-result', type: 'result', resultInjuryId: 'concussion',
    content: '⚠️ Your symptoms are suggestive of a concussion. You should be assessed by a healthcare professional trained in concussion management.',
    detail: 'Remove yourself from sport/activity immediately. Do NOT return to play on the same day. Physical and cognitive rest for 24-48 hours, then gradual return guided by the graduated return-to-sport protocol.',
  },
  'conc-emergency': {
    id: 'conc-emergency', type: 'referral',
    content: '🚨 EMERGENCY: Red flag symptoms detected. Call emergency services or go to the nearest emergency department immediately.',
    detail: 'Do not move the person if a spine injury is suspected. Keep them still and call for emergency assistance.',
  },
  'conc-no': {
    id: 'conc-no', type: 'info',
    content: 'Without a mechanism of head impact, concussion is unlikely. Your symptoms may have another cause.',
    nextNodeId: 'no-match',
  },

  /* ════ Rotator Cuff Tree ════ */
  'rc-q1': {
    id: 'rc-q1', type: 'question', category: 'onset',
    content: 'How did your shoulder pain begin?',
    options: [
      { label: 'Gradually — increasing over weeks/months', nextNodeId: 'rc-q2' },
      { label: 'Sudden — after a specific injury or fall', nextNodeId: 'rc-acute' },
    ],
  },
  'rc-q2': {
    id: 'rc-q2', type: 'question', category: 'symptom',
    content: 'Which movements are most painful?',
    options: [
      { label: 'Reaching overhead or behind back', nextNodeId: 'rc-q3' },
      { label: 'Lying on the affected shoulder at night', nextNodeId: 'rc-q3' },
      { label: 'Lifting objects away from body', nextNodeId: 'rc-q3' },
    ],
  },
  'rc-q3': {
    id: 'rc-q3', type: 'physical-test', category: 'test',
    content: 'Painful Arc Test: Slowly raise your arm out to the side. Note where the pain occurs.',
    detail: 'Classic painful arc: pain between 60°-120° of abduction suggests subacromial pathology.',
    options: [
      { label: 'Pain in the 60-120° range', nextNodeId: 'rc-result' },
      { label: 'Pain above 120° only', nextNodeId: 'rc-ac-joint' },
      { label: 'Pain throughout entire range', nextNodeId: 'rc-severe' },
    ],
  },
  'rc-result': {
    id: 'rc-result', type: 'result', resultInjuryId: 'rotator-cuff-injury',
    content: 'Your symptoms are consistent with rotator cuff tendinopathy. The painful arc and gradual onset pattern suggests subacromial irritation of the rotator cuff tendons.',
    detail: 'Treatment focuses on progressive rotator cuff strengthening, scapular stabilization, and activity modification. Most cases respond well to 6-12 weeks of rehabilitation.',
  },
  'rc-acute': {
    id: 'rc-acute', type: 'referral',
    content: 'An acute traumatic onset with significant weakness may indicate a rotator cuff tear. Professional assessment with imaging is recommended.',
  },
  'rc-ac-joint': {
    id: 'rc-ac-joint', type: 'referral',
    content: 'Pain at the top of the shoulder above 120° may indicate AC joint pathology. Professional assessment is recommended.',
  },
  'rc-severe': {
    id: 'rc-severe', type: 'referral',
    content: 'Pain throughout the entire range of motion with significant weakness warrants professional assessment.',
  },

  /* ════ Hamstring Strain Tree ════ */
  'hsi-q1': {
    id: 'hsi-q1', type: 'question', category: 'mechanism',
    content: 'How did your hamstring injury occur?',
    options: [
      { label: 'During sprinting or acceleration', nextNodeId: 'hsi-q2' },
      { label: 'During stretching or kicking', nextNodeId: 'hsi-q2' },
      { label: 'Gradual onset with no specific event', nextNodeId: 'hsi-overuse' },
    ],
  },
  'hsi-q2': {
    id: 'hsi-q2', type: 'question', category: 'severity',
    content: 'How severe was the initial pain and can you walk?',
    options: [
      { label: 'Mild — can walk with minor discomfort', nextNodeId: 'hsi-result' },
      { label: 'Moderate — walking is painful, limping', nextNodeId: 'hsi-result' },
      { label: 'Severe — cannot walk, large bruise/defect', nextNodeId: 'hsi-severe' },
    ],
  },
  'hsi-result': {
    id: 'hsi-result', type: 'result', resultInjuryId: 'hamstring-strain',
    content: 'Your symptoms are consistent with a hamstring strain injury (Grade I-II). The acute mechanism with posterior thigh pain is the classic presentation.',
    detail: 'Early rehabilitation with progressive loading (avoiding prolonged rest) leads to better outcomes. Focus on eccentric strengthening and trunk stability.',
  },
  'hsi-severe': {
    id: 'hsi-severe', type: 'referral',
    content: 'A severe hamstring injury with inability to walk or a palpable defect may be a complete rupture. Professional assessment with imaging is strongly recommended.',
  },
  'hsi-overuse': {
    id: 'hsi-overuse', type: 'referral',
    content: 'Gradual-onset posterior thigh pain may indicate proximal hamstring tendinopathy or referred pain from the lumbar spine. Professional assessment is recommended.',
  },

  /* ════ Tennis Elbow Tree ════ */
  'te-q1': {
    id: 'te-q1', type: 'question', category: 'location',
    content: 'Where is your elbow pain located?',
    options: [
      { label: 'Outside (lateral) of the elbow', nextNodeId: 'te-q2', highlightMuscles: ['forearm', 'triceps'], modelType: 'anterior' },
      { label: 'Inside (medial) of the elbow', nextNodeId: 'te-medial', highlightMuscles: ['forearm', 'biceps'], modelType: 'anterior' },
      { label: 'Back of the elbow', nextNodeId: 'te-posterior', highlightMuscles: ['triceps'], modelType: 'posterior' },
    ],
  },
  'te-q2': {
    id: 'te-q2', type: 'question', category: 'symptom',
    content: 'Is your pain worse when gripping, turning a doorknob, or lifting with palm down?',
    options: [
      { label: 'Yes — gripping/wrist extension aggravates it', nextNodeId: 'te-q3' },
      { label: 'No — pain is more with bending/flexion', nextNodeId: 'te-medial' },
    ],
  },
  'te-q3': {
    id: 'te-q3', type: 'physical-test', category: 'test',
    content: 'Cozen\'s Test: Make a fist and extend your wrist upward against resistance (push against a table). Does this reproduce your lateral elbow pain?',
    options: [
      { label: 'Yes — reproduces my pain', nextNodeId: 'te-result' },
      { label: 'No pain with this test', nextNodeId: 'te-other' },
    ],
  },
  'te-result': {
    id: 'te-result', type: 'result', resultInjuryId: 'tennis-elbow',
    content: 'Your symptoms are consistent with lateral epicondylalgia (tennis elbow). This is a tendinopathy of the common wrist extensor origin.',
    detail: 'Treatment involves isometric and then progressive loading exercises, activity modification, and ergonomic changes. Recovery typically takes 6-12 months.',
  },
  'te-medial': {
    id: 'te-medial', type: 'referral',
    content: 'Medial elbow pain (golfer\'s elbow) or other medial pathology. Professional assessment recommended for accurate diagnosis.',
  },
  'te-posterior': {
    id: 'te-posterior', type: 'referral',
    content: 'Posterior elbow pain may indicate olecranon bursitis or triceps tendinopathy. Professional assessment recommended.',
  },
  'te-other': {
    id: 'te-other', type: 'referral',
    content: 'Your lateral elbow symptoms don\'t clearly match tennis elbow. Professional assessment is recommended.',
  },

  /* ════ Additional stubs ════ */
  'ldh-q1': {
    id: 'ldh-q1', type: 'question', category: 'symptom',
    content: 'Do you have pain radiating down your leg below the knee?',
    options: [
      { label: 'Yes — leg pain, numbness, or tingling', nextNodeId: 'ldh-referral' },
      { label: 'No — back pain only', nextNodeId: 'ldh-referral' },
    ],
  },
  'ldh-referral': {
    id: 'ldh-referral', type: 'referral',
    content: 'Lumbar disc herniation with or without radiculopathy requires professional assessment for imaging and management. This condition is complex and self-diagnosis is not recommended.',
  },
  'gp-q1': {
    id: 'gp-q1', type: 'question', category: 'location',
    content: 'Where in the groin/hip area is your pain?',
    options: [
      { label: 'Inner thigh / adductor area', nextNodeId: 'gp-referral', highlightMuscles: ['adductor'], modelType: 'anterior' },
      { label: 'Front of hip / crease', nextNodeId: 'gp-referral', highlightMuscles: ['abs', 'quadriceps'], modelType: 'anterior' },
      { label: 'Pubic bone area', nextNodeId: 'gp-referral', highlightMuscles: ['abs'], modelType: 'anterior' },
    ],
  },
  'gp-referral': {
    id: 'gp-referral', type: 'referral',
    content: 'Groin pain has multiple potential causes and classifications. Professional assessment is strongly recommended for accurate diagnosis per the Doha agreement classification system.',
  },
  'mtss-q1': {
    id: 'mtss-q1', type: 'question', category: 'location',
    content: 'Where along your shin is the pain?',
    options: [
      { label: 'Diffuse pain along inner shin (>5cm area)', nextNodeId: 'mtss-result', highlightMuscles: ['calves'], modelType: 'anterior' },
      { label: 'Focal point tenderness (<5cm)', nextNodeId: 'mtss-stress-fx' },
    ],
  },
  'mtss-result': {
    id: 'mtss-result', type: 'result', resultInjuryId: 'medial-tibial-stress-syndrome',
    content: 'Your symptoms are consistent with Medial Tibial Stress Syndrome (shin splints). The diffuse posteromedial tibial pain is characteristic.',
    detail: 'Treatment involves load management following the 10% rule, calf strengthening, and addressing biomechanical factors.',
  },
  'mtss-stress-fx': {
    id: 'mtss-stress-fx', type: 'referral',
    content: '⚠️ Focal bony tenderness may indicate a tibial stress fracture rather than MTSS. Professional assessment with imaging is recommended before continuing activity.',
  },
  'at-q1': {
    id: 'at-q1', type: 'question', category: 'symptom',
    content: 'Do you experience morning stiffness in your Achilles that improves after a few minutes of walking?',
    options: [
      { label: 'Yes — classic morning stiffness pattern', nextNodeId: 'at-result' },
      { label: 'No — my symptoms are different', nextNodeId: 'at-referral' },
    ],
  },
  'at-result': {
    id: 'at-result', type: 'result', resultInjuryId: 'achilles-tendinopathy',
    content: 'Your symptoms are consistent with Achilles tendinopathy. The morning stiffness pattern and load-related pain are characteristic.',
    detail: 'Treatment involves a progressive heavy slow resistance loading program. Recovery typically takes 3-6 months.',
  },
  'at-referral': {
    id: 'at-referral', type: 'referral',
    content: 'Your Achilles/heel symptoms may need professional assessment to differentiate between conditions.',
  },

  /* ════ Whiplash Tree ════ */
  'wad-q1': { id: 'wad-q1', type: 'question', category: 'mechanism', content: 'Did you experience a sudden acceleration-deceleration force to the neck?',
    options: [{ label: 'Yes — collision, tackle, or whiplash', nextNodeId: 'wad-q2' }, { label: 'Gradual onset neck pain', nextNodeId: 'cr-q1' }] },
  'wad-q2': { id: 'wad-q2', type: 'question', category: 'symptom', content: 'Do you have ANY of these: weakness/numbness in arms, severe midline neck tenderness, or inability to rotate neck 45°?',
    options: [{ label: 'Yes — red flag present', nextNodeId: 'wad-emergency' }, { label: 'No — pain and stiffness only', nextNodeId: 'wad-result' }] },
  'wad-result': { id: 'wad-result', type: 'result', resultInjuryId: 'whiplash', content: 'Your symptoms are consistent with WAD Grade I-II. Early active movement is recommended over rest and collar immobilization.', detail: 'Reassurance, gentle ROM exercises, and graded return to activity. Most cases resolve in 4-12 weeks.' },
  'wad-emergency': { id: 'wad-emergency', type: 'referral', content: '🚨 Red flag symptoms detected. Seek emergency assessment — possible cervical fracture, dislocation, or spinal cord injury.' },

  /* ════ Cervical Radiculopathy Tree ════ */
  'cr-q1': { id: 'cr-q1', type: 'question', category: 'symptom', content: 'Does your neck pain radiate into your arm with numbness, tingling, or weakness?',
    options: [{ label: 'Yes — arm symptoms present', nextNodeId: 'cr-result' }, { label: 'No — neck pain only', nextNodeId: 'cr-referral' }] },
  'cr-result': { id: 'cr-result', type: 'result', resultInjuryId: 'cervical-radiculopathy', content: 'Your symptoms suggest cervical radiculopathy — a compressed nerve root in the neck radiating into the arm.', detail: 'Most cases improve with conservative management. Seek professional assessment for severe or progressive weakness.' },
  'cr-referral': { id: 'cr-referral', type: 'referral', content: 'Neck pain without arm symptoms may be mechanical neck pain. Professional assessment recommended for persistent cases.' },

  /* ════ Shoulder Instability Tree ════ */
  'si-q1': { id: 'si-q1', type: 'question', category: 'mechanism', content: 'Has your shoulder ever fully dislocated or do you feel it may "slip out"?',
    options: [{ label: 'Yes — previous dislocation or subluxation', nextNodeId: 'si-result' }, { label: 'Feeling of looseness/apprehension only', nextNodeId: 'si-result' }, { label: 'No instability', nextNodeId: 'rc-q1' }] },
  'si-result': { id: 'si-result', type: 'result', resultInjuryId: 'shoulder-instability', content: 'Your symptoms suggest shoulder instability. This requires structured rehabilitation focusing on rotator cuff and scapular stabilization.', detail: 'Recurrence risk is high in young athletes (<25). Professional assessment recommended to determine if surgical stabilization is needed.' },

  /* ════ AC Joint Tree ════ */
  'ac-q1': { id: 'ac-q1', type: 'question', category: 'mechanism', content: 'Did you fall directly onto the point of your shoulder or the top of your shoulder?',
    options: [{ label: 'Yes — direct fall onto shoulder', nextNodeId: 'ac-result' }, { label: 'No — different mechanism', nextNodeId: 'rc-q1' }] },
  'ac-result': { id: 'ac-result', type: 'result', resultInjuryId: 'ac-joint-injury', content: 'Your mechanism and symptoms suggest an AC joint injury. Pain at the top of the shoulder with localized tenderness over the AC joint is characteristic.', detail: 'Grade I-III usually managed conservatively with sling and rehabilitation. Visible step deformity at the AC joint suggests higher grade.' },

  /* ════ Frozen Shoulder Tree ════ */
  'fs-q1': { id: 'fs-q1', type: 'question', category: 'symptom', content: 'Is your shoulder progressively losing range of motion in ALL directions over weeks/months?',
    options: [{ label: 'Yes — global stiffness getting worse', nextNodeId: 'fs-result' }, { label: 'No — specific movements are painful but range is OK', nextNodeId: 'rc-q1' }] },
  'fs-result': { id: 'fs-result', type: 'result', resultInjuryId: 'frozen-shoulder', content: 'Your symptoms suggest adhesive capsulitis (frozen shoulder). The progressive loss of active AND passive motion is the hallmark.', detail: 'Self-limiting condition (12-36 months). Gentle ROM exercises and physiotherapy can speed recovery. Most common in 40-65 age group and diabetics.' },

  /* ════ SLAP Tear Tree ════ */
  'slap-q1': { id: 'slap-q1', type: 'question', category: 'symptom', content: 'Do you experience deep shoulder pain with clicking or catching during overhead movements?',
    options: [{ label: 'Yes — clicking/catching with overhead use', nextNodeId: 'slap-result' }, { label: 'No — pain but no mechanical symptoms', nextNodeId: 'rc-q1' }] },
  'slap-result': { id: 'slap-result', type: 'result', resultInjuryId: 'slap-tear', content: 'Your symptoms suggest a possible labral (SLAP) tear. Deep shoulder pain with mechanical symptoms in an overhead athlete is characteristic.', detail: 'Professional assessment with MRA is recommended. Many labral tears can be managed conservatively with rotator cuff and scapular strengthening.' },

  /* ════ EAMC Tree ════ */
  'eamc-q1': { id: 'eamc-q1', type: 'question', category: 'symptom', content: 'Do your muscle cramps occur during or immediately after exercise, and resolve within minutes?',
    options: [{ label: 'Yes — exercise-related cramping', nextNodeId: 'eamc-result' }, { label: 'Cramping at rest or with dark urine', nextNodeId: 'eamc-emergency' }] },
  'eamc-result': { id: 'eamc-result', type: 'result', resultInjuryId: 'exercise-muscle-cramps', content: 'Your symptoms are consistent with Exercise-Associated Muscle Cramps. These are related to neuromuscular fatigue rather than simple dehydration.', detail: 'Prevention focuses on gradual conditioning, adequate training, and stretching. Acute treatment: gentle stretch of the cramping muscle.' },
  'eamc-emergency': { id: 'eamc-emergency', type: 'referral', content: '🚨 Widespread cramping with dark urine may indicate rhabdomyolysis or exertional heat illness. Seek emergency medical attention.' },

  /* ════ Golfer's Elbow Tree ════ */
  'ge-q1': { id: 'ge-q1', type: 'question', category: 'location', content: 'Is your pain on the INNER (medial) side of the elbow?',
    options: [{ label: 'Yes — inner elbow with gripping/flexion pain', nextNodeId: 'ge-result', highlightMuscles: ['forearm', 'biceps'], modelType: 'anterior' }, { label: 'No — outer elbow', nextNodeId: 'te-q1', highlightMuscles: ['forearm', 'triceps'], modelType: 'posterior' }] },
  'ge-result': { id: 'ge-result', type: 'result', resultInjuryId: 'golfers-elbow', content: 'Your symptoms are consistent with medial epicondylalgia (golfer\'s elbow). This is a tendinopathy of the common flexor origin.', detail: 'Treatment mirrors tennis elbow — isometric loading progressing to eccentric and heavy slow resistance exercises.' },

  /* ════ Carpal Tunnel Tree ════ */
  'cts-q1': { id: 'cts-q1', type: 'question', category: 'symptom', content: 'Do you experience numbness or tingling in your thumb, index, and middle fingers?',
    options: [{ label: 'Yes — especially at night or with sustained gripping', nextNodeId: 'cts-result' }, { label: 'No — different pattern', nextNodeId: 'no-match' }] },
  'cts-result': { id: 'cts-result', type: 'result', resultInjuryId: 'carpal-tunnel', content: 'Your symptoms suggest carpal tunnel syndrome — compression of the median nerve at the wrist.', detail: 'Conservative treatment includes splinting (especially at night), nerve gliding exercises, and activity modification.' },

  /* ════ De Quervain's Tree ════ */
  'dq-q1': { id: 'dq-q1', type: 'question', category: 'location', content: 'Is your pain at the thumb-side of the wrist, worsened by gripping or moving the thumb?',
    options: [{ label: 'Yes — radial wrist pain with thumb use', nextNodeId: 'dq-result', highlightMuscles: ['forearm'], modelType: 'anterior' }, { label: 'No — different location', nextNodeId: 'no-match' }] },
  'dq-result': { id: 'dq-result', type: 'result', resultInjuryId: 'de-quervain', content: 'Your symptoms suggest De Quervain\'s tenosynovitis — inflammation of the thumb-side wrist tendons.', detail: 'Treatment includes thumb spica splinting, activity modification, and gentle tendon gliding exercises.' },

  /* ════ Wrist Sprain Tree ════ */
  'ws-q1': { id: 'ws-q1', type: 'question', category: 'mechanism', content: 'Did you fall on an outstretched hand (FOOSH)?',
    options: [{ label: 'Yes — FOOSH injury', nextNodeId: 'ws-q2' }, { label: 'Gradual onset', nextNodeId: 'no-match' }] },
  'ws-q2': { id: 'ws-q2', type: 'question', category: 'location', content: 'Is there tenderness in the anatomical snuffbox (hollow at base of thumb on back of wrist)?',
    options: [{ label: 'Yes — snuffbox tender', nextNodeId: 'ws-referral' }, { label: 'No — general wrist pain', nextNodeId: 'ws-result' }] },
  'ws-result': { id: 'ws-result', type: 'result', resultInjuryId: 'wrist-sprain', content: 'Your symptoms suggest a wrist sprain. RICE protocol and supportive splinting recommended.', detail: 'If pain persists beyond 2 weeks, seek imaging to rule out occult fracture.' },
  'ws-referral': { id: 'ws-referral', type: 'referral', content: '⚠️ Anatomical snuffbox tenderness after a fall suggests possible scaphoid fracture. X-ray required — treat as fracture until proven otherwise.' },

  /* ════ Trigger Finger Tree ════ */
  'tf-q1': { id: 'tf-q1', type: 'question', category: 'symptom', content: 'Does your finger catch, lock, or snap when bending/straightening?',
    options: [{ label: 'Yes — triggering/catching present', nextNodeId: 'tf-result' }, { label: 'No catching', nextNodeId: 'no-match' }] },
  'tf-result': { id: 'tf-result', type: 'result', resultInjuryId: 'trigger-finger', content: 'Your symptoms are consistent with trigger finger (stenosing tenosynovitis).', detail: 'Conservative management includes activity modification and gentle stretching. Corticosteroid injection is effective. Surgery (A1 pulley release) if conservative management fails.' },

  /* ════ Non-Specific LBP Tree ════ */
  'nslbp-q1': { id: 'nslbp-q1', type: 'question', category: 'symptom', content: 'Is your back pain mostly in the lower back without leg pain below the knee?',
    options: [{ label: 'Yes — low back pain, no significant leg symptoms', nextNodeId: 'nslbp-result' }, { label: 'Significant leg pain/numbness below knee', nextNodeId: 'ldh-q1' }] },
  'nslbp-result': { id: 'nslbp-result', type: 'result', resultInjuryId: 'non-specific-lbp', content: 'Your symptoms are consistent with non-specific low back pain — the most common type of back pain. This is NOT a serious condition.', detail: 'Stay active. Avoid bed rest. Gradual return to normal activities is the best treatment. Core stability exercises and walking are first-line management.' },

  /* ════ Spondylolysis Tree ════ */
  'spon-q1': { id: 'spon-q1', type: 'question', category: 'symptom', content: 'Does your back pain worsen with extension (leaning backward) and improve with flexion (bending forward)?',
    options: [{ label: 'Yes — extension-biased pain', nextNodeId: 'spon-result' }, { label: 'No — different pattern', nextNodeId: 'nslbp-q1' }] },
  'spon-result': { id: 'spon-result', type: 'result', resultInjuryId: 'spondylolysis', content: 'Extension-biased back pain in a young athlete suggests possible spondylolysis (pars stress fracture).', detail: 'Professional assessment with imaging is recommended. Activity modification (avoiding extension loading) for 6-12 weeks is typically required.' },

  /* ════ Thoracic Pain Tree ════ */
  'tp-q1': { id: 'tp-q1', type: 'question', category: 'location', content: 'Is your pain in the upper/mid back or rib area?',
    options: [{ label: 'Yes — thoracic/rib pain', nextNodeId: 'tp-result' }, { label: 'Chest pain with breathing difficulty', nextNodeId: 'tp-emergency' }] },
  'tp-result': { id: 'tp-result', type: 'result', resultInjuryId: 'thoracic-pain', content: 'Your symptoms suggest thoracic spine pain or costochondritis. Often postural in nature and responds well to mobilization.', detail: 'Posture correction, thoracic extension exercises, and gentle foam rolling are first-line treatments.' },
  'tp-emergency': { id: 'tp-emergency', type: 'referral', content: '🚨 Chest pain with breathing difficulty must be assessed urgently to rule out cardiac and pulmonary causes. Seek emergency care.' },

  /* ════ Lumbar Stenosis Tree ════ */
  'ls-q1': { id: 'ls-q1', type: 'question', category: 'symptom', content: 'Does walking cause progressive leg heaviness/pain that is relieved by sitting or leaning forward?',
    options: [{ label: 'Yes — classic neurogenic claudication pattern', nextNodeId: 'ls-result' }, { label: 'No — different pattern', nextNodeId: 'ldh-q1' }] },
  'ls-result': { id: 'ls-result', type: 'result', resultInjuryId: 'lumbar-stenosis', content: 'Your symptoms suggest lumbar spinal stenosis with neurogenic claudication.', detail: 'Flexion-based exercises (cycling, walking with a forward lean), core strengthening, and activity modification. Professional assessment recommended for severe cases.' },

  /* ════ FAI Tree ════ */
  'fai-q1': { id: 'fai-q1', type: 'question', category: 'symptom', content: 'Do you experience groin/hip pain that worsens with deep squatting, pivoting, or prolonged sitting?',
    options: [{ label: 'Yes — deep hip/groin pain with these activities', nextNodeId: 'fai-result' }, { label: 'No — different pattern', nextNodeId: 'gp-q1' }] },
  'fai-result': { id: 'fai-result', type: 'result', resultInjuryId: 'fai-syndrome', content: 'Your symptoms suggest femoroacetabular impingement (FAI). Deep hip/groin pain with a "C-sign" grip pattern is characteristic.', detail: 'Hip strengthening, activity modification, and avoiding deep flexion positions. Professional assessment recommended for imaging confirmation.' },

  /* ════ Hip Labral Tear Tree ════ */
  'hlt-q1': { id: 'hlt-q1', type: 'question', category: 'symptom', content: 'Do you experience clicking, catching, or locking in your hip joint?',
    options: [{ label: 'Yes — mechanical symptoms present', nextNodeId: 'hlt-result' }, { label: 'No mechanical symptoms', nextNodeId: 'fai-q1' }] },
  'hlt-result': { id: 'hlt-result', type: 'result', resultInjuryId: 'hip-labral-tear', content: 'Clicking/catching in the hip with groin pain suggests a possible hip labral tear.', detail: 'Often associated with FAI. Professional assessment with MRA recommended. Many cases respond to conservative hip strengthening.' },

  /* ════ Hip Stress Fracture Tree ════ */
  'hsf-q1': { id: 'hsf-q1', type: 'question', category: 'symptom', content: 'Do you have deep hip/groin pain that worsens with weight-bearing and is present at rest or at night?',
    options: [{ label: 'Yes — weight-bearing pain with rest/night pain', nextNodeId: 'hsf-referral' }, { label: 'No rest or night pain', nextNodeId: 'fai-q1' }] },
  'hsf-referral': { id: 'hsf-referral', type: 'referral', content: '⚠️ Rest and night pain in the hip with exercise-related groin pain raises concern for a femoral neck stress fracture. Urgent imaging and non-weight-bearing recommended.' },

  /* ════ Calf Strain Tree ════ */
  'cs-q1': { id: 'cs-q1', type: 'question', category: 'mechanism', content: 'Did your calf pain start suddenly during pushing off, sprinting, or jumping?',
    options: [{ label: 'Yes — sudden onset with push-off', nextNodeId: 'cs-result' }, { label: 'Gradual onset', nextNodeId: 'at-q1' }] },
  'cs-result': { id: 'cs-result', type: 'result', resultInjuryId: 'calf-strain', content: 'Your symptoms suggest a calf muscle strain (possible "tennis leg"). Acute onset with push-off mechanism is characteristic.', detail: 'POLICE protocol initially. Important to exclude DVT (calf pain + swelling + warmth) and Achilles rupture (no push-off strength).' },

  /* ════ Metatarsal Stress Fracture Tree ════ */
  'sffoot-q1': { id: 'sffoot-q1', type: 'question', category: 'symptom', content: 'Do you have forefoot pain that gradually worsened with activity and improves with rest?',
    options: [{ label: 'Yes — activity-related forefoot pain', nextNodeId: 'sffoot-result' }, { label: 'Sudden onset', nextNodeId: 'no-match' }] },
  'sffoot-result': { id: 'sffoot-result', type: 'result', resultInjuryId: 'stress-fracture-foot', content: 'Your symptoms suggest a possible metatarsal stress fracture. Gradual onset forefoot pain with activity is characteristic.', detail: 'Reduce weight-bearing activity. Professional assessment with imaging is recommended, especially if pain is at the base of the 5th metatarsal (Jones fracture zone).' },

  /* ════ Peroneal Tendinopathy Tree ════ */
  'pt-q1': { id: 'pt-q1', type: 'question', category: 'location', content: 'Is your pain behind or below the outer ankle bone (lateral malleolus)?',
    options: [{ label: 'Yes — pain behind lateral malleolus', nextNodeId: 'pt-result' }, { label: 'No — front or inner ankle', nextNodeId: 'no-match' }] },
  'pt-result': { id: 'pt-result', type: 'result', resultInjuryId: 'peroneal-tendinopathy', content: 'Your symptoms suggest peroneal tendinopathy. Pain behind the lateral malleolus with eversion weakness is characteristic.', detail: 'Often associated with chronic ankle instability. Peroneal strengthening and ankle stability exercises are the main treatments.' },

  /* ════ Ankle Impingement Tree ════ */
  'ai-q1': { id: 'ai-q1', type: 'question', category: 'symptom', content: 'Is your ankle pain specifically at the end of range — either full dorsiflexion (front) or full plantarflexion (back)?',
    options: [{ label: 'Yes — pinching at end range', nextNodeId: 'ai-result' }, { label: 'No — pain through mid-range', nextNodeId: 'no-match' }] },
  'ai-result': { id: 'ai-result', type: 'result', resultInjuryId: 'ankle-impingement', content: 'Your symptoms suggest ankle impingement syndrome — soft tissue or bony pinching at the end range.', detail: 'Anterior (front) impingement: common in footballers. Posterior (back): common in dancers. Treatment involves ROM exercises and activity modification.' },

  /* ════ Meniscal Tear Tree ════ */
  'men-q1': { id: 'men-q1', type: 'question', category: 'symptom', content: 'Does your knee catch, lock, or give way? Do you have joint line tenderness (pain along the side of the knee)?',
    options: [{ label: 'Yes — catching/locking with joint line pain', nextNodeId: 'men-result' }, { label: 'Swelling but no mechanical symptoms', nextNodeId: 'men-referral' }] },
  'men-result': { id: 'men-result', type: 'result', resultInjuryId: 'meniscal-tear', content: 'Your symptoms suggest a meniscal tear. Joint line tenderness with mechanical symptoms is the classic presentation.', detail: 'Many meniscal tears can be managed conservatively with strengthening. True locking requires urgent assessment for possible bucket-handle tear.' },
  'men-referral': { id: 'men-referral', type: 'referral', content: 'Knee swelling without clear mechanical symptoms may have various causes. Professional assessment recommended.' },

  /* ════ ITB Syndrome Tree ════ */
  'itb-q1': { id: 'itb-q1', type: 'question', category: 'symptom', content: 'Is your pain on the OUTER (lateral) side of your knee, typically starting after a consistent distance of running?',
    options: [{ label: 'Yes — lateral knee pain at specific distance', nextNodeId: 'itb-result', highlightMuscles: ['knees', 'hamstring'], modelType: 'anterior' }, { label: 'No — different pattern', nextNodeId: 'pfps-q1' }] },
  'itb-result': { id: 'itb-result', type: 'result', resultInjuryId: 'itb-syndrome', content: 'Your symptoms are consistent with IT Band Syndrome. Lateral knee pain that starts at a consistent running distance is characteristic.', detail: 'Treatment focuses on hip abductor strengthening, running load management, and addressing step width. Foam rolling provides symptom relief.' },

  /* ════ Patellar Tendinopathy Tree ════ */
  'ptend-q1': { id: 'ptend-q1', type: 'question', category: 'location', content: 'Is your pain precisely at the bottom tip of the kneecap (inferior pole of patella)?',
    options: [{ label: 'Yes — localized inferior pole pain', nextNodeId: 'ptend-result', highlightMuscles: ['knees'], modelType: 'anterior' }, { label: 'Diffuse anterior knee pain', nextNodeId: 'pfps-q1', highlightMuscles: ['knees', 'quadriceps'], modelType: 'anterior' }] },
  'ptend-result': { id: 'ptend-result', type: 'result', resultInjuryId: 'patellar-tendinopathy', content: 'Your symptoms are consistent with patellar tendinopathy (jumper\'s knee). Localized inferior pole pain with jumping/landing is characteristic.', detail: 'Treatment involves heavy slow resistance loading (decline squats), load management, and addressing kinetic chain factors.' },

  /* ════ Quad Strain Tree ════ */
  'qs-q1': { id: 'qs-q1', type: 'question', category: 'mechanism', content: 'Did you experience sudden front-of-thigh pain during sprinting, kicking, or from a direct blow?',
    options: [{ label: 'Yes — acute onset with activity or contact', nextNodeId: 'qs-result' }, { label: 'Gradual onset', nextNodeId: 'pfps-q1' }] },
  'qs-result': { id: 'qs-result', type: 'result', resultInjuryId: 'quadriceps-strain', content: 'Your symptoms suggest a quadriceps strain or contusion. Acute onset with sprinting/kicking or direct blow is the typical mechanism.', detail: 'POLICE protocol initially. Avoid aggressive stretching in the first 48h for contusions. Progressive strengthening once pain allows.' },

  /* ════ MCL Sprain Tree ════ */
  'mcl-q1': { id: 'mcl-q1', type: 'question', category: 'mechanism', content: 'Was there a force that pushed your knee inward (valgus force)?',
    options: [{ label: 'Yes — blow to outside of knee or knee buckled inward', nextNodeId: 'mcl-result' }, { label: 'No valgus force', nextNodeId: 'pfps-q1' }] },
  'mcl-result': { id: 'mcl-result', type: 'result', resultInjuryId: 'mcl-sprain', content: 'Your symptoms suggest an MCL sprain. Valgus mechanism with medial knee pain and possible instability is characteristic.', detail: 'MCL heals well conservatively even with complete tears. Hinged brace and progressive rehab. Watch for combined ACL/meniscus injury.' },

  /* ════ Knee OA Tree ════ */
  'koa-q1': { id: 'koa-q1', type: 'question', category: 'symptom', content: 'Are you over 45 with gradual onset knee pain, morning stiffness (<30 min), and crepitus (grinding)?',
    options: [{ label: 'Yes — fits OA criteria', nextNodeId: 'koa-result' }, { label: 'No — different profile', nextNodeId: 'pfps-q1' }] },
  'koa-result': { id: 'koa-result', type: 'result', resultInjuryId: 'knee-osteoarthritis', content: 'Your symptoms are consistent with knee osteoarthritis. Age >45, gradual onset, and morning stiffness <30 minutes are the clinical diagnostic criteria.', detail: 'Exercise is the FIRST-LINE treatment. Strengthening (especially quadriceps), low-impact cardio, and weight management are all strongly recommended.' },

  /* ════ Osgood-Schlatter Tree ════ */
  'os-q1': { id: 'os-q1', type: 'question', category: 'symptom', content: 'Are you aged 10-15 with pain and a bony bump at the top of the shin below the kneecap?',
    options: [{ label: 'Yes — tibial tubercle pain in an adolescent', nextNodeId: 'os-result' }, { label: 'No — different profile', nextNodeId: 'pfps-q1' }] },
  'os-result': { id: 'os-result', type: 'result', resultInjuryId: 'osgood-schlatter', content: 'Your symptoms are consistent with Osgood-Schlatter disease — a self-limiting condition of growing adolescents.', detail: 'Activity modification (not complete rest), ice after sport, and load management. Resolves with skeletal maturity. The bony prominence may persist but pain resolves.' },

  /* ═══════════════════════════════════════════════════════════════
     TIER 1 EXPANSION — 20 Additional Diagnostic Trees
     ═══════════════════════════════════════════════════════════════ */

  /* ════ Stingers & Burners Tree ════ */
  'sb-q1': { id: 'sb-q1', type: 'question', category: 'mechanism', content: 'Did you feel a sudden electric shock or burning sensation shooting down ONE arm after a tackle, collision, or neck movement?',
    options: [{ label: 'Yes — one arm only', nextNodeId: 'sb-q2' }, { label: 'Both arms affected', nextNodeId: 'sb-emergency' }] },
  'sb-q2': { id: 'sb-q2', type: 'question', category: 'symptom', content: 'Did the burning/weakness resolve within minutes, or is it persisting?',
    options: [{ label: 'Resolved within minutes', nextNodeId: 'sb-result' }, { label: 'Still present after 24+ hours', nextNodeId: 'sb-referral' }] },
  'sb-result': { id: 'sb-result', type: 'result', resultInjuryId: 'stingers-burners', content: 'Your symptoms are consistent with a stinger/burner — transient brachial plexus stretch. Common in contact sports.', detail: 'Typically resolves within minutes. DO NOT return to play until full strength and ROM are restored. Recurrent episodes need specialist assessment.' },
  'sb-referral': { id: 'sb-referral', type: 'referral', content: '⚠️ Persistent arm weakness or numbness beyond 24 hours suggests possible structural nerve injury. Professional assessment with EMG/NCS recommended.' },
  'sb-emergency': { id: 'sb-emergency', type: 'referral', content: '🚨 BILATERAL arm symptoms after neck trauma = possible spinal cord injury. Do NOT move. Call emergency services immediately.' },

  /* ════ Swimmer's Shoulder Tree ════ */
  'swsh-q1': { id: 'swsh-q1', type: 'question', category: 'mechanism', content: 'Are you a swimmer or overhead athlete with gradual onset shoulder pain during or after training?',
    options: [{ label: 'Yes — overhead sport with gradual onset', nextNodeId: 'swsh-result' }, { label: 'No — not an overhead athlete', nextNodeId: 'rc-q1' }] },
  'swsh-result': { id: 'swsh-result', type: 'result', resultInjuryId: 'swimmers-shoulder', content: 'Your symptoms are consistent with swimmer\'s shoulder (overhead athlete shoulder). This is a supraspinatus tendinopathy from repetitive overhead loading.', detail: 'Load management (reduce swimming volume by 30-50%), scapular and rotator cuff strengthening, address thoracic mobility. Most respond well within 6-12 weeks.' },

  /* ════ Shoulder Bursitis Tree ════ */
  'sbur-q1': { id: 'sbur-q1', type: 'question', category: 'symptom', content: 'Do you have shoulder pain specifically between 60-120° of arm elevation (painful arc)?',
    options: [{ label: 'Yes — painful arc pattern', nextNodeId: 'sbur-q2' }, { label: 'No painful arc', nextNodeId: 'rc-q1' }] },
  'sbur-q2': { id: 'sbur-q2', type: 'question', category: 'symptom', content: 'Is the shoulder hot, red, or swollen with fever?',
    options: [{ label: 'Yes — hot/red/fever', nextNodeId: 'sbur-emergency' }, { label: 'No infection signs', nextNodeId: 'sbur-result' }] },
  'sbur-result': { id: 'sbur-result', type: 'result', resultInjuryId: 'shoulder-bursitis', content: 'Your symptoms suggest subacromial bursitis. The painful arc between 60-120° is characteristic.', detail: 'Activity modification, rotator cuff strengthening, and addressing posture. Often coexists with rotator cuff tendinopathy. Ice for acute flare-ups.' },
  'sbur-emergency': { id: 'sbur-emergency', type: 'referral', content: '🚨 Hot, red, swollen joint with fever suggests possible SEPTIC bursitis. Seek urgent medical attention — may require aspiration and antibiotics.' },

  /* ════ Biceps Tendinopathy Tree ════ */
  'bt-q1': { id: 'bt-q1', type: 'question', category: 'location', content: 'Is your pain at the FRONT of the shoulder, specifically in the groove where the biceps tendon runs?',
    options: [{ label: 'Yes — front of shoulder, bicipital groove', nextNodeId: 'bt-q2' }, { label: 'No — pain elsewhere', nextNodeId: 'rc-q1' }] },
  'bt-q2': { id: 'bt-q2', type: 'question', category: 'symptom', content: 'Did you feel a sudden pop with a visible bulge forming in the upper arm?',
    options: [{ label: 'Yes — pop + Popeye deformity', nextNodeId: 'bt-referral' }, { label: 'No — gradual onset pain', nextNodeId: 'bt-result' }] },
  'bt-result': { id: 'bt-result', type: 'result', resultInjuryId: 'biceps-tendinopathy', content: 'Your symptoms suggest long head of biceps tendinopathy. Anterior shoulder pain worsened by lifting and overhead activity.', detail: 'Load management, avoid heavy biceps loading, rotator cuff and scapular strengthening. Often coexists with rotator cuff pathology.' },
  'bt-referral': { id: 'bt-referral', type: 'referral', content: '⚠️ A sudden pop with visible bulge suggests biceps tendon rupture. Seek orthopaedic assessment. Surgical repair may be needed in young/active patients.' },

  /* ════ Olecranon Bursitis Tree ════ */
  'ob-q1': { id: 'ob-q1', type: 'question', category: 'symptom', content: 'Do you have a visible, fluid-filled swelling over the point of your elbow?',
    options: [{ label: 'Yes — swelling over elbow tip', nextNodeId: 'ob-q2' }, { label: 'No visible swelling', nextNodeId: 'te-q1' }] },
  'ob-q2': { id: 'ob-q2', type: 'question', category: 'symptom', content: 'Is the swelling red, hot, and painful with fever or chills?',
    options: [{ label: 'Yes — infection signs', nextNodeId: 'ob-emergency' }, { label: 'No — just swollen, not hot', nextNodeId: 'ob-result' }] },
  'ob-result': { id: 'ob-result', type: 'result', resultInjuryId: 'olecranon-bursitis', content: 'Your symptoms suggest olecranon bursitis — fluid accumulation over the elbow tip. Typically non-infected (aseptic).', detail: 'Protect the elbow from further irritation. Compression wrap. Avoid leaning on the elbow. Most resolve in 2-6 weeks. Aspiration only if very tense.' },
  'ob-emergency': { id: 'ob-emergency', type: 'referral', content: '🚨 Red, hot, painful elbow swelling with fever suggests SEPTIC bursitis. Seek urgent medical attention — requires aspiration, culture, and antibiotics.' },

  /* ════ UCL Sprain Tree ════ */
  'ucl-q1': { id: 'ucl-q1', type: 'question', category: 'mechanism', content: 'Are you a throwing athlete (baseball, cricket, javelin) with inner elbow pain during or after throwing?',
    options: [{ label: 'Yes — medial elbow pain with throwing', nextNodeId: 'ucl-q2' }, { label: 'No — not a throwing injury', nextNodeId: 'ge-q1' }] },
  'ucl-q2': { id: 'ucl-q2', type: 'question', category: 'symptom', content: 'Did you feel a pop or sudden sharp pain on the inside of the elbow during a single throw?',
    options: [{ label: 'Yes — acute pop during throw', nextNodeId: 'ucl-referral' }, { label: 'Gradual onset over weeks/months', nextNodeId: 'ucl-result' }] },
  'ucl-result': { id: 'ucl-result', type: 'result', resultInjuryId: 'ucl-sprain', content: 'Your symptoms suggest UCL sprain from repetitive valgus stress. This is a chronic overuse injury of the throwing elbow.', detail: 'Rest from throwing, progressive rehabilitation, and gradual return to throwing program. Professional assessment recommended for imaging.' },
  'ucl-referral': { id: 'ucl-referral', type: 'referral', content: '⚠️ Acute pop with sudden loss of throwing velocity suggests possible UCL rupture (Tommy John injury). Orthopaedic assessment required. Surgery may be needed for competitive throwing athletes.' },

  /* ════ SIJ Pain Tree ════ */
  'sij-q1': { id: 'sij-q1', type: 'question', category: 'location', content: 'Is your pain in the buttock/posterior pelvis area (below the belt line) and can you point to it with one finger?',
    options: [{ label: 'Yes — localized buttock/posterior pelvis pain', nextNodeId: 'sij-q2' }, { label: 'No — more central or radiating', nextNodeId: 'nslbp-q1' }] },
  'sij-q2': { id: 'sij-q2', type: 'question', category: 'symptom', content: 'Do you have morning stiffness lasting > 30 minutes that improves with exercise?',
    options: [{ label: 'Yes — prolonged morning stiffness', nextNodeId: 'sij-referral' }, { label: 'No — stiffness < 30 min or no stiffness', nextNodeId: 'sij-result' }] },
  'sij-result': { id: 'sij-result', type: 'result', resultInjuryId: 'sij-pain', content: 'Your symptoms suggest sacroiliac joint pain. Localized buttock/posterior pelvic pain with mechanical characteristics.', detail: 'SIJ stabilization exercises (bridging, clamshells), core stability, and addressing biomechanical asymmetries. Common in runners.' },
  'sij-referral': { id: 'sij-referral', type: 'referral', content: '⚠️ Prolonged morning stiffness (>30 min) improving with exercise in a young adult raises concern for inflammatory arthritis (e.g., ankylosing spondylitis). Blood tests and imaging recommended.' },

  /* ════ Rib Stress Injury Tree ════ */
  'rib-q1': { id: 'rib-q1', type: 'question', category: 'symptom', content: 'Do you have chest wall/rib pain that worsens with deep breathing, coughing, or specific sport movements (rowing catch, bowling)?',
    options: [{ label: 'Yes — activity and breathing-related rib pain', nextNodeId: 'rib-q2' }, { label: 'No — different pattern', nextNodeId: 'tp-q1' }] },
  'rib-q2': { id: 'rib-q2', type: 'question', category: 'symptom', content: 'Is there any shortness of breath, chest tightness, or difficulty breathing?',
    options: [{ label: 'Yes — breathing difficulty', nextNodeId: 'rib-emergency' }, { label: 'No — pain only, breathing OK', nextNodeId: 'rib-result' }] },
  'rib-result': { id: 'rib-result', type: 'result', resultInjuryId: 'rib-stress-injury', content: 'Your symptoms suggest a rib stress injury or stress fracture. Common in rowing, cricket bowling, and sports with repetitive trunk rotation.', detail: 'Activity modification for 4-6 weeks, cross-train with non-provocative activities. Address training load and nutritional factors (energy availability).' },
  'rib-emergency': { id: 'rib-emergency', type: 'referral', content: '🚨 Rib pain with breathing difficulty — seek urgent assessment to rule out pneumothorax or cardiac/pulmonary pathology.' },

  /* ════ Hip OA Tree ════ */
  'hoa-q1': { id: 'hoa-q1', type: 'question', category: 'symptom', content: 'Are you over 45 with gradual onset groin/hip pain, morning stiffness (< 30 min), and reduced hip rotation?',
    options: [{ label: 'Yes — fits OA criteria', nextNodeId: 'hoa-result' }, { label: 'No — different profile', nextNodeId: 'fai-q1' }] },
  'hoa-result': { id: 'hoa-result', type: 'result', resultInjuryId: 'hip-osteoarthritis', content: 'Your symptoms are consistent with hip osteoarthritis. Age >45, gradual onset groin pain, and reduced internal rotation are the clinical criteria.', detail: 'Exercise is the FIRST-LINE treatment. Hip strengthening, low-impact cardio (cycling, swimming), and weight management. More effective than any medication.' },

  /* ════ Patellar Instability Tree ════ */
  'pi-q1': { id: 'pi-q1', type: 'question', category: 'mechanism', content: 'Did your kneecap visibly slip out of place or do you feel it "slides" laterally?',
    options: [{ label: 'Yes — kneecap displaced/subluxed', nextNodeId: 'pi-q2' }, { label: 'No — no patellar movement', nextNodeId: 'pfps-q1' }] },
  'pi-q2': { id: 'pi-q2', type: 'question', category: 'symptom', content: 'Is your knee still locked or is the kneecap still displaced?',
    options: [{ label: 'Yes — still displaced/locked', nextNodeId: 'pi-emergency' }, { label: 'No — it went back in', nextNodeId: 'pi-result' }] },
  'pi-result': { id: 'pi-result', type: 'result', resultInjuryId: 'patellar-instability', content: 'Your symptoms suggest patellar instability. The kneecap has dislocated or subluxed laterally.', detail: 'VMO (inner quad) strengthening, patellar taping, and hip strengthening. First dislocation: 6-12 weeks rehab. Recurrent dislocations may need surgery (MPFL reconstruction).' },
  'pi-emergency': { id: 'pi-emergency', type: 'referral', content: '🚨 Kneecap still displaced — go to emergency department for reduction. Do not try to force it back yourself.' },

  /* ════ PCL Injury Tree ════ */
  'pcl-q1': { id: 'pcl-q1', type: 'question', category: 'mechanism', content: 'Did you receive a direct blow to the front of the shin/knee while the knee was bent, or fall onto a bent knee?',
    options: [{ label: 'Yes — dashboard or fall-on-bent-knee mechanism', nextNodeId: 'pcl-result' }, { label: 'No — different mechanism', nextNodeId: 'acl-q1' }] },
  'pcl-result': { id: 'pcl-result', type: 'result', resultInjuryId: 'pcl-injury', content: 'Your mechanism and symptoms suggest a PCL injury. Direct blow to the anterior tibia pushing it backward is the classic mechanism.', detail: 'Grade I-II usually managed conservatively with quadriceps strengthening. Professional assessment recommended to grade the injury and check for combined ligament damage.' },

  /* ════ LCL Sprain Tree ════ */
  'lcl-q1': { id: 'lcl-q1', type: 'question', category: 'mechanism', content: 'Was there a force pushing your knee outward from the inside (varus force)?',
    options: [{ label: 'Yes — force from inside of knee', nextNodeId: 'lcl-q2' }, { label: 'No varus force', nextNodeId: 'pfps-q1' }] },
  'lcl-q2': { id: 'lcl-q2', type: 'question', category: 'symptom', content: 'Do you have foot drop or difficulty lifting your foot?',
    options: [{ label: 'Yes — foot drop present', nextNodeId: 'lcl-emergency' }, { label: 'No — lateral knee pain only', nextNodeId: 'lcl-result' }] },
  'lcl-result': { id: 'lcl-result', type: 'result', resultInjuryId: 'lcl-sprain', content: 'Your symptoms suggest an LCL sprain. Varus mechanism with lateral knee pain and possible instability.', detail: 'Hinged brace and progressive rehabilitation. Professional assessment recommended — isolated LCL injuries are uncommon, usually combined with posterolateral corner injury.' },
  'lcl-emergency': { id: 'lcl-emergency', type: 'referral', content: '🚨 Foot drop with lateral knee injury suggests peroneal nerve damage. Seek urgent assessment.' },

  /* ════ Hoffa's Fat Pad Tree ════ */
  'hfp-q1': { id: 'hfp-q1', type: 'question', category: 'symptom', content: 'Is your pain just BELOW the kneecap (not at the inferior pole) and does it WORSEN with full knee extension?',
    options: [{ label: 'Yes — pain below kneecap, worse at full extension', nextNodeId: 'hfp-result' }, { label: 'Pain at inferior pole of patella', nextNodeId: 'ptend-q1' }] },
  'hfp-result': { id: 'hfp-result', type: 'result', resultInjuryId: 'hoffas-fat-pad', content: 'Your symptoms suggest Hoffa\'s fat pad impingement. Pain just below the kneecap that worsens with full extension is characteristic.', detail: 'Taping to offload the fat pad, avoid knee hyperextension, quadriceps strengthening (avoiding last 30° of extension). Activity modification for 4-8 weeks.' },

  /* ════ Exertional Compartment Syndrome Tree ════ */
  'cecs-q1': { id: 'cecs-q1', type: 'question', category: 'symptom', content: 'Does your lower leg pain start at a PREDICTABLE point during exercise (e.g., always at 15 min running) and resolve completely within 30 minutes of stopping?',
    options: [{ label: 'Yes — predictable onset, resolves with rest', nextNodeId: 'cecs-q2' }, { label: 'No — different pattern', nextNodeId: 'no-match' }] },
  'cecs-q2': { id: 'cecs-q2', type: 'question', category: 'symptom', content: 'Does the pain resolve within 30 minutes of stopping exercise?',
    options: [{ label: 'Yes — fully resolves', nextNodeId: 'cecs-result' }, { label: 'No — pain persists > 30 min after stopping', nextNodeId: 'cecs-emergency' }] },
  'cecs-result': { id: 'cecs-result', type: 'result', resultInjuryId: 'exertional-compartment', content: 'Your symptoms are classic for chronic exertional compartment syndrome. Predictable onset during exercise with complete resolution at rest is the hallmark.', detail: 'Conservative: gait retraining (forefoot striking), stretching, load management. Surgical fasciotomy is definitive if conservative measures fail. Compartment pressure testing confirms diagnosis.' },
  'cecs-emergency': { id: 'cecs-emergency', type: 'referral', content: '🚨 Leg pain NOT resolving after stopping exercise may indicate ACUTE compartment syndrome — this is a surgical emergency. Seek immediate medical attention.' },

  /* ════ Chronic Ankle Instability Tree ════ */
  'cai-q1': { id: 'cai-q1', type: 'question', category: 'symptom', content: 'Do you have recurrent ankle sprains or a persistent feeling of your ankle "giving way" — more than 12 months after an initial sprain?',
    options: [{ label: 'Yes — recurrent giving way > 12 months', nextNodeId: 'cai-result' }, { label: 'Recent acute sprain', nextNodeId: 'las-q1' }] },
  'cai-result': { id: 'cai-result', type: 'result', resultInjuryId: 'chronic-ankle-instability', content: 'Your symptoms are consistent with chronic ankle instability (CAI). This develops in up to 40% of people after ankle sprains due to both mechanical and neuromuscular deficits.', detail: 'Structured balance and proprioception training (8-12 weeks). Peroneal strengthening. Consider external ankle support (brace) for sport. Surgery only if structured rehab fails.' },

  /* ════ Achilles Rupture Tree ════ */
  'ar-q1': { id: 'ar-q1', type: 'question', category: 'mechanism', content: 'Did you feel a sudden "pop" or sensation of being kicked in the back of the calf during a push-off or sprint?',
    options: [{ label: 'Yes — sudden pop/kicked sensation', nextNodeId: 'ar-q2' }, { label: 'Gradual onset Achilles pain', nextNodeId: 'at-q1' }] },
  'ar-q2': { id: 'ar-q2', type: 'question', category: 'symptom', content: 'Can you do a single-leg heel raise on the affected side? (Try it carefully.)',
    options: [{ label: 'No — unable to push up on toes at all', nextNodeId: 'ar-referral' }, { label: 'Yes — can still raise heel', nextNodeId: 'cs-q1' }] },
  'ar-referral': { id: 'ar-referral', type: 'referral', content: '⚠️ Sudden pop + inability to perform heel raise strongly suggests Achilles tendon rupture. Seek URGENT orthopaedic assessment within 24-48 hours for best outcomes. Do NOT weight-bear normally — use crutches.' },

  /* ════ Tibial Stress Fracture Tree ════ */
  'tsf-q1': { id: 'tsf-q1', type: 'question', category: 'symptom', content: 'Do you have localized shin pain that you can pinpoint with ONE finger (not the diffuse area of shin splints)?',
    options: [{ label: 'Yes — focal point tenderness', nextNodeId: 'tsf-q2' }, { label: 'Diffuse, spread-out shin pain', nextNodeId: 'no-match' }] },
  'tsf-q2': { id: 'tsf-q2', type: 'question', category: 'location', content: 'Is the tender point on the FRONT (anterior) edge of the tibia?',
    options: [{ label: 'Yes - anterior tibial tenderness', nextNodeId: 'tsf-urgent', highlightMuscles: ['calves'], modelType: 'anterior' }, { label: 'No - medial (inner) or posterior shin', nextNodeId: 'tsf-result', highlightMuscles: ['calves'], modelType: 'posterior' }] },
  'tsf-result': { id: 'tsf-result', type: 'result', resultInjuryId: 'tibial-stress-fracture', content: 'Your symptoms suggest a tibial stress fracture (posteromedial — LOW risk). Focal shin pain that worsens with running and improves with rest.', detail: 'Rest from running for 6-8 weeks. Cross-train with non-impact activities. Gradual return using the 10% rule. Address training load, nutrition, and bone health.' },
  'tsf-urgent': { id: 'tsf-urgent', type: 'referral', content: '⚠️ Anterior tibial stress fracture is HIGH-RISK — the tension side of the bone heals poorly. Seek urgent orthopaedic assessment. May require extended non-weight-bearing or surgical fixation.' },

  /* ════ Overtraining Syndrome Tree ════ */
  'ots-q1': { id: 'ots-q1', type: 'question', category: 'symptom', content: 'Have you experienced persistent underperformance for > 2 months despite adequate rest, along with fatigue, mood changes, or sleep disruption?',
    options: [{ label: 'Yes — > 2 months unexplained underperformance', nextNodeId: 'ots-q2' }, { label: 'Short-term fatigue (< 2 weeks)', nextNodeId: 'doms-q1' }] },
  'ots-q2': { id: 'ots-q2', type: 'question', category: 'symptom', content: 'Have you been checked for other medical causes (iron deficiency, thyroid, viral illness)?',
    options: [{ label: 'Yes — other causes excluded', nextNodeId: 'ots-result' }, { label: 'No — haven\'t been tested', nextNodeId: 'ots-referral' }] },
  'ots-result': { id: 'ots-result', type: 'result', resultInjuryId: 'overtraining-syndrome', content: 'Your symptoms are consistent with Overtraining Syndrome (OTS). This is a diagnosis of EXCLUSION — other medical causes must be ruled out first.', detail: 'Treatment is enforced rest and recovery (often 6-12 weeks minimum). Reduce training to 50-70%. Focus on sleep, nutrition, and stress management. Prevention is far better than cure.' },
  'ots-referral': { id: 'ots-referral', type: 'referral', content: '⚠️ Persistent underperformance and fatigue should be investigated medically first. Common mimics include iron deficiency, hypothyroidism, viral illness, and depression. See your doctor for blood tests.' },

  /* ════ DOMS Tree ════ */
  'doms-q1': { id: 'doms-q1', type: 'question', category: 'symptom', content: 'Is your muscle soreness peaking 24-72 hours after unaccustomed or intense exercise, and gradually improving?',
    options: [{ label: 'Yes — delayed onset, improving', nextNodeId: 'doms-q2' }, { label: 'Not improving or getting worse', nextNodeId: 'eamc-q1' }] },
  'doms-q2': { id: 'doms-q2', type: 'question', category: 'symptom', content: 'Is your urine dark brown or cola-colored?',
    options: [{ label: 'Yes — dark urine', nextNodeId: 'doms-emergency' }, { label: 'No — normal urine', nextNodeId: 'doms-result' }] },
  'doms-result': { id: 'doms-result', type: 'result', resultInjuryId: 'doms', content: 'Your symptoms are NORMAL — this is Delayed Onset Muscle Soreness (DOMS). It is NOT an injury. It is a healthy adaptive response to exercise.', detail: 'Resolves in 2-5 days. Active recovery (light exercise) may help. No treatment needed. Progressive training reduces future DOMS. Do NOT avoid exercise because of DOMS.' },
  'doms-emergency': { id: 'doms-emergency', type: 'referral', content: '🚨 Dark/cola-colored urine after exercise is a sign of rhabdomyolysis — muscle breakdown releasing myoglobin into the blood. Seek EMERGENCY medical care. This can cause kidney failure.' },

  /* ═══════════════════════════════════════════════════════════════
     TIER 2 EXPANSION — 20 Additional Diagnostic Trees
     ═══════════════════════════════════════════════════════════════ */

  /* ════ Cervical Sprain Tree ════ */
  'csp-q1': { id: 'csp-q1', type: 'question', category: 'symptom', content: 'Do you have neck pain/stiffness after a sport-related mechanism WITHOUT numbness, tingling, or arm weakness?',
    options: [{ label: 'Yes — neck pain only, no arm symptoms', nextNodeId: 'csp-result' }, { label: 'Arm symptoms present', nextNodeId: 'cr-q1' }] },
  'csp-result': { id: 'csp-result', type: 'result', resultInjuryId: 'cervical-sprain', content: 'Your symptoms suggest a cervical sprain/strain — muscular or ligamentous neck injury without neurological involvement.', detail: 'Stay active within pain limits. Gentle ROM exercises, heat, and progressive neck strengthening. Most resolve in 1-4 weeks.' },

  /* ════ Lumbar Muscle Strain Tree ════ */
  'lms-q1': { id: 'lms-q1', type: 'question', category: 'symptom', content: 'Do you have low back pain/spasm after sudden loading or twisting WITHOUT leg pain below the knee?',
    options: [{ label: 'Yes — local back pain/spasm only', nextNodeId: 'lms-result' }, { label: 'Leg pain below knee present', nextNodeId: 'ld-q1' }] },
  'lms-result': { id: 'lms-result', type: 'result', resultInjuryId: 'lumbar-muscle-strain', content: 'Your symptoms suggest an acute lumbar muscle strain. Local back pain and spasm without radiculopathy.', detail: 'STAY ACTIVE — bed rest worsens outcomes. Gentle walking, heat, gradual return to activity. Most resolve within 2-6 weeks.' },

  /* ════ Scapular Dyskinesis Tree ════ */
  'sd-q1': { id: 'sd-q1', type: 'question', category: 'symptom', content: 'Is your pain around or between the shoulder blades, and does your shoulder blade appear to "wing" or move asymmetrically?',
    options: [{ label: 'Yes — scapular winging/asymmetry', nextNodeId: 'sd-result' }, { label: 'No visible scapular issue', nextNodeId: 'rc-q1' }] },
  'sd-result': { id: 'sd-result', type: 'result', resultInjuryId: 'scapular-dyskinesis', content: 'Your symptoms suggest scapular dyskinesis — altered shoulder blade movement contributing to your shoulder pain.', detail: 'Targeted serratus anterior and lower trapezius strengthening, thoracic mobility, and postural correction. 6-12 weeks of progressive rehab.' },

  /* ════ Capitellar OCD Tree ════ */
  'cocd-q1': { id: 'cocd-q1', type: 'question', category: 'symptom', content: 'Are you a young athlete (12-16) with LATERAL elbow pain during throwing or gymnastics?',
    options: [{ label: 'Yes — adolescent with lateral elbow pain', nextNodeId: 'cocd-q2' }, { label: 'No — adult or medial pain', nextNodeId: 'te-q1' }] },
  'cocd-q2': { id: 'cocd-q2', type: 'question', category: 'symptom', content: 'Does your elbow lock, catch, or fail to fully straighten?',
    options: [{ label: 'Yes — locking/catching', nextNodeId: 'cocd-referral' }, { label: 'No — pain only', nextNodeId: 'cocd-result' }] },
  'cocd-result': { id: 'cocd-result', type: 'result', resultInjuryId: 'capitellar-ocd', content: 'Your symptoms suggest capitellar OCD. Lateral elbow pain in a young thrower/gymnast is the hallmark.', detail: 'Complete rest from throwing for 3-6 months. Imaging (MRI) recommended to stage the lesion. Early detection = better outcomes.' },
  'cocd-referral': { id: 'cocd-referral', type: 'referral', content: '⚠️ Elbow locking/catching suggests a loose body from OCD. Seek orthopaedic assessment — arthroscopic removal may be needed.' },

  /* ════ Skier's Thumb Tree ════ */
  'skt-q1': { id: 'skt-q1', type: 'question', category: 'mechanism', content: 'Did you injure your thumb from a forced outward bending (abduction), such as falling on a ski pole or catching a ball awkwardly?',
    options: [{ label: 'Yes — forced thumb abduction', nextNodeId: 'skt-q2' }, { label: 'No — different mechanism', nextNodeId: 'no-match' }] },
  'skt-q2': { id: 'skt-q2', type: 'question', category: 'symptom', content: 'Is the thumb completely unstable — can you feel it "opening up" with no firm endpoint when stressed?',
    options: [{ label: 'Yes — no firm endpoint', nextNodeId: 'skt-referral' }, { label: 'Sore but stable', nextNodeId: 'skt-result' }] },
  'skt-result': { id: 'skt-result', type: 'result', resultInjuryId: 'skiers-thumb', content: 'Your symptoms suggest a partial thumb UCL sprain. Thumb is sore but has a stable endpoint.', detail: 'Thumb spica splint for 4-6 weeks. Protect from further abduction stress. Should heal with conservative management.' },
  'skt-referral': { id: 'skt-referral', type: 'referral', content: '⚠️ Complete thumb UCL instability suggests a full tear with possible Stener lesion. Surgery is usually required — seek hand surgeon assessment within 1-2 weeks for best outcomes.' },

  /* ════ Mallet Finger Tree ════ */
  'mf-q1': { id: 'mf-q1', type: 'question', category: 'symptom', content: 'Is the tip of your finger drooping and you cannot actively straighten the last joint (DIP)?',
    options: [{ label: 'Yes — fingertip droops, can\'t straighten DIP', nextNodeId: 'mf-result' }, { label: 'No droop', nextNodeId: 'hf-q1' }] },
  'mf-result': { id: 'mf-result', type: 'result', resultInjuryId: 'mallet-finger', content: 'Your symptoms indicate a mallet finger — rupture of the extensor tendon at the fingertip.', detail: 'CONTINUOUS splinting in extension for 6-8 weeks. The DIP joint must NEVER flex during this period — even briefly removing the splint resets healing. Get an X-ray to check for bony avulsion.' },

  /* ════ Hand Fracture/Dislocation Tree ════ */
  'hf-q1': { id: 'hf-q1', type: 'question', category: 'mechanism', content: 'Did you injure your hand from a direct blow, punch, ball impact, or fall — with visible swelling or deformity?',
    options: [{ label: 'Yes — trauma with swelling/deformity', nextNodeId: 'hf-q2' }, { label: 'No direct trauma', nextNodeId: 'no-match' }] },
  'hf-q2': { id: 'hf-q2', type: 'question', category: 'symptom', content: 'When you make a fist, does any finger cross over or scissor on its neighbor?',
    options: [{ label: 'Yes — rotational deformity', nextNodeId: 'hf-referral' }, { label: 'No rotation — swollen but aligned', nextNodeId: 'hf-result' }] },
  'hf-result': { id: 'hf-result', type: 'result', resultInjuryId: 'hand-fracture', content: 'Your symptoms suggest a hand fracture or PIP dislocation. Non-rotated, stable fractures often heal with buddy taping.', detail: 'Get an X-ray to confirm. Buddy tape to adjacent finger, early motion within 1-2 weeks. 4-6 weeks total healing.' },
  'hf-referral': { id: 'hf-referral', type: 'referral', content: '⚠️ Rotational deformity of the finger = malrotated fracture requiring surgical fixation. Seek hand surgeon assessment promptly.' },

  /* ════ GTPS Tree ════ */
  'gtps-q1': { id: 'gtps-q1', type: 'question', category: 'location', content: 'Is your pain on the OUTSIDE of your hip, over the bony prominence, especially when lying on that side at night?',
    options: [{ label: 'Yes - lateral hip pain, worse lying on it', nextNodeId: 'gtps-result', highlightMuscles: ['abductors', 'gluteal'], modelType: 'posterior' }, { label: 'Pain in the groin, not lateral', nextNodeId: 'hoa-q1', highlightMuscles: ['adductor', 'abs'], modelType: 'anterior' }] },
  'gtps-result': { id: 'gtps-result', type: 'result', resultInjuryId: 'gtps', content: 'Your symptoms are consistent with Greater Trochanteric Pain Syndrome (GTPS) — now understood as primarily a gluteal tendinopathy.', detail: 'Progressive gluteal loading (avoid positions of tendon compression like crossing legs/side-lying without pillow). Isometric hip abduction → side-lying abduction → standing. 8-12 weeks.' },

  /* ════ Snapping Hip Tree ════ */
  'shp-q1': { id: 'shp-q1', type: 'question', category: 'symptom', content: 'Do you hear or feel a snap/click in your hip during movement, particularly hip flexion-extension?',
    options: [{ label: 'Yes — audible/palpable snapping', nextNodeId: 'shp-result' }, { label: 'No snapping', nextNodeId: 'fai-q1' }] },
  'shp-result': { id: 'shp-result', type: 'result', resultInjuryId: 'snapping-hip', content: 'Your symptoms suggest snapping hip syndrome. This is usually benign but can become painful with overuse.', detail: 'ITB and hip flexor stretching, hip stabilization exercises. If painless, no treatment is required. Painful snapping responds to targeted stretching and load management.' },

  /* ════ Piriformis Syndrome Tree ════ */
  'pir-q1': { id: 'pir-q1', type: 'question', category: 'location', content: 'Is your pain deep in the BUTTOCK with possible sciatic-type pain down the back of the leg, but NO true low back pain?',
    options: [{ label: 'Yes — deep buttock pain, no low back pain', nextNodeId: 'pir-q2' }, { label: 'Low back pain present too', nextNodeId: 'ld-q1' }] },
  'pir-q2': { id: 'pir-q2', type: 'question', category: 'symptom', content: 'Does the pain worsen with prolonged sitting and improve with walking?',
    options: [{ label: 'Yes — worse sitting, better walking', nextNodeId: 'pir-result' }, { label: 'Different pattern', nextNodeId: 'sij-q1' }] },
  'pir-result': { id: 'pir-result', type: 'result', resultInjuryId: 'piriformis-syndrome', content: 'Your symptoms suggest piriformis syndrome — sciatic nerve irritation by the piriformis muscle.', detail: 'Piriformis stretching (figure-4 stretch), hip external rotator strengthening, avoid prolonged sitting. Diagnosis of exclusion — lumbar spine pathology must be ruled out first.' },

  /* ════ Apophyseal Avulsion Tree ════ */
  'aa-q1': { id: 'aa-q1', type: 'question', category: 'mechanism', content: 'Are you a young athlete (14-18) who felt a sudden pop in the pelvis/hip area during sprinting, kicking, or jumping?',
    options: [{ label: 'Yes — adolescent with acute pop during explosive movement', nextNodeId: 'aa-referral' }, { label: 'No — gradual onset or adult', nextNodeId: 'gtps-q1' }] },
  'aa-referral': { id: 'aa-referral', type: 'referral', content: '⚠️ Sudden pop in the pelvis during explosive sport in a young athlete suggests pelvic apophyseal avulsion. X-ray is essential to assess displacement. Most heal with 6-12 weeks rest, but displaced fragments (>2cm) may need surgery.' },

  /* ════ Hip Pointer Tree ════ */
  'hp-q1': { id: 'hp-q1', type: 'question', category: 'mechanism', content: 'Did you receive a direct blow to the bony prominence on the side of your pelvis (iliac crest) during a collision or fall?',
    options: [{ label: 'Yes — direct blow to iliac crest', nextNodeId: 'hp-result' }, { label: 'No direct blow', nextNodeId: 'gtps-q1' }] },
  'hp-result': { id: 'hp-result', type: 'result', resultInjuryId: 'hip-pointer', content: 'Your symptoms suggest a hip pointer — contusion to the iliac crest. Very painful but typically heals well.', detail: 'Ice, compression, and protection. Progressive return to sport with padding. Most resolve in 1-4 weeks.' },

  /* ════ Pes Anserine Tree ════ */
  'pa-q1': { id: 'pa-q1', type: 'question', category: 'location', content: 'Is your pain on the INNER side of the shin, about 5cm BELOW the knee joint line?',
    options: [{ label: 'Yes - anteromedial tibia, below joint line', nextNodeId: 'pa-result', highlightMuscles: ['knees', 'calves'], modelType: 'anterior' }, { label: 'Pain at joint line or above', nextNodeId: 'pfps-q1', highlightMuscles: ['knees'], modelType: 'anterior' }] },
  'pa-result': { id: 'pa-result', type: 'result', resultInjuryId: 'pes-anserine', content: 'Your symptoms suggest pes anserine bursitis/tendinopathy. Pain below the medial joint line at the pes anserine insertion.', detail: 'Load management, hamstring and hip adductor stretching, addressing biomechanics (valgus, overpronation). Ice after activity.' },

  /* ════ Prepatellar Bursitis Tree ════ */
  'ppb-q1': { id: 'ppb-q1', type: 'question', category: 'symptom', content: 'Do you have swelling directly OVER the front of the kneecap (not inside the joint) after direct trauma or kneeling?',
    options: [{ label: 'Yes — superficial swelling over patella', nextNodeId: 'ppb-q2' }, { label: 'Swelling inside the joint', nextNodeId: 'acl-q1' }] },
  'ppb-q2': { id: 'ppb-q2', type: 'question', category: 'symptom', content: 'Is it red, hot, and painful with fever?',
    options: [{ label: 'Yes — infection signs', nextNodeId: 'ppb-emergency' }, { label: 'No — just swollen', nextNodeId: 'ppb-result' }] },
  'ppb-result': { id: 'ppb-result', type: 'result', resultInjuryId: 'prepatellar-bursitis', content: 'Your symptoms suggest prepatellar bursitis. Superficial swelling over the kneecap from trauma or kneeling.', detail: 'Protect from further trauma, compression, avoid kneeling. Knee pads for sport. Most resolve in 2-6 weeks.' },
  'ppb-emergency': { id: 'ppb-emergency', type: 'referral', content: '🚨 Red, hot, painful knee swelling with fever suggests SEPTIC prepatellar bursitis. Seek urgent medical attention for aspiration and antibiotics.' },

  /* ════ Plica Syndrome Tree ════ */
  'plic-q1': { id: 'plic-q1', type: 'question', category: 'symptom', content: 'Do you feel a snapping or clicking band on the inner side of your kneecap during bending/straightening?',
    options: [{ label: 'Yes - palpable snapping band medial to patella', nextNodeId: 'plic-result', highlightMuscles: ['knees'], modelType: 'anterior' }, { label: 'No snapping', nextNodeId: 'pfps-q1' }] },
  'plic-result': { id: 'plic-result', type: 'result', resultInjuryId: 'plica-syndrome', content: 'Your symptoms suggest medial plica irritation. A thickened synovial fold catching during knee movement.', detail: 'Activity modification, quad strengthening, stretching. Anti-inflammatory measures. If refractory to 8-12 weeks of conservative treatment, arthroscopic plica excision is very effective.' },

  /* ════ Turf Toe Tree ════ */
  'tt-q1': { id: 'tt-q1', type: 'question', category: 'mechanism', content: 'Did you forcefully hyperextend (bend back) your big toe during push-off, especially on artificial turf?',
    options: [{ label: 'Yes — forced big toe hyperextension', nextNodeId: 'tt-result' }, { label: 'No — different mechanism', nextNodeId: 'no-match' }] },
  'tt-result': { id: 'tt-result', type: 'result', resultInjuryId: 'turf-toe', content: 'Your symptoms suggest turf toe — sprain of the 1st MTP joint plantar plate from forced dorsiflexion.', detail: 'Stiff-soled shoe or turf toe insert to limit big toe extension. Buddy tape. Grade I: 1-2 weeks, Grade II: 2-4 weeks, Grade III: may need 6-12 weeks or surgery.' },

  /* ════ Lisfranc Tree ════ */
  'lisf-q1': { id: 'lisf-q1', type: 'question', category: 'symptom', content: 'Do you have midfoot pain with bruising on the SOLE of your foot after a twisting or crush injury?',
    options: [{ label: 'Yes — midfoot pain + plantar bruising', nextNodeId: 'lisf-referral' }, { label: 'Midfoot pain without plantar bruising', nextNodeId: 'lisf-q2' }] },
  'lisf-q2': { id: 'lisf-q2', type: 'question', category: 'symptom', content: 'Can you bear weight on the midfoot? Does single-leg heel raise cause midfoot pain?',
    options: [{ label: 'Cannot weight-bear on midfoot', nextNodeId: 'lisf-referral' }, { label: 'Can weight-bear but sore', nextNodeId: 'lisf-result' }] },
  'lisf-result': { id: 'lisf-result', type: 'result', resultInjuryId: 'lisfranc-injury', content: 'Your symptoms suggest a possible Lisfranc midfoot injury. This is commonly missed — get imaging (weight-bearing X-rays).', detail: 'Non-weight-bearing for 6-8 weeks if non-displaced. Professional assessment is essential — missed Lisfranc injuries lead to chronic midfoot arthritis.' },
  'lisf-referral': { id: 'lisf-referral', type: 'referral', content: '⚠️ Plantar bruising or inability to weight-bear on midfoot are hallmarks of significant Lisfranc injury. Seek URGENT orthopaedic assessment — displaced injuries require surgical fixation.' },

  /* ════ Sever's Disease Tree ════ */
  'sev-q1': { id: 'sev-q1', type: 'question', category: 'symptom', content: 'Is this heel pain in a child aged 8-14 that worsens during/after sport and improves with rest?',
    options: [{ label: 'Yes — active child with heel pain', nextNodeId: 'sev-result' }, { label: 'No — adult or atypical', nextNodeId: 'pf-q1' }] },
  'sev-result': { id: 'sev-result', type: 'result', resultInjuryId: 'severs-disease', content: 'Your symptoms are consistent with Sever\'s disease — calcaneal apophysitis in a growing child. Self-limiting condition.', detail: 'Heel raises in shoes, calf stretching, activity modification (not complete rest). Resolves with skeletal maturity. Ice after sport for symptom management.' },

  /* ════ Posterior Ankle Impingement Tree ════ */
  'pai-q1': { id: 'pai-q1', type: 'question', category: 'symptom', content: 'Do you have pain at the BACK of the ankle specifically when pointing your foot (plantarflexion), such as in ballet relevé or kicking?',
    options: [{ label: 'Yes - posterior ankle pain with plantarflexion', nextNodeId: 'pai-result', highlightMuscles: ['calves', 'left-soleus', 'right-soleus'], modelType: 'posterior' }, { label: 'Pain elsewhere', nextNodeId: 'at-q1' }] },
  'pai-result': { id: 'pai-result', type: 'result', resultInjuryId: 'posterior-ankle-impingement', content: 'Your symptoms suggest posterior ankle impingement — compression of structures at the back of the ankle during plantarflexion.', detail: 'Modify activities that require maximal plantarflexion. Strengthening, taping. Imaging to check for os trigonum. If refractory, surgical excision of os trigonum is very effective.' },

  /* ════ Morton's Neuroma Tree ════ */
  'mn-q1': { id: 'mn-q1', type: 'question', category: 'symptom', content: 'Do you have burning pain or numbness in the ball of your foot, especially between the 3rd and 4th toes, feeling like "standing on a pebble"?',
    options: [{ label: 'Yes — burning/numbness between toes', nextNodeId: 'mn-result' }, { label: 'Different foot pain', nextNodeId: 'no-match' }] },
  'mn-result': { id: 'mn-result', type: 'result', resultInjuryId: 'mortons-neuroma', content: 'Your symptoms suggest Morton\'s neuroma — interdigital nerve irritation in the forefoot.', detail: 'Wide toe box footwear (most important), metatarsal pad to offload the nerve, avoid tight shoes. If conservative measures fail: corticosteroid injection or surgical excision.' },

  /* ════ No Match Node ════ */
  'no-match': {
    id: 'no-match', type: 'info',
    content: 'This condition is not currently covered in our clinical guidelines database. Please consult a healthcare professional for diagnosis and treatment.',
  },
};
