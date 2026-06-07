import type { DiagnosticNode } from './types';

export const regionalRoots: DiagnosticNode[] = [
  // ---------------------------------------------------------
  // LOWER LEG, ANKLE, FOOT
  // ---------------------------------------------------------
  {
    id: 'lower-leg-ankle-foot-root',
    type: 'question',
    category: 'location',
    content: 'Where is your pain primarily located?',
    options: [
      { label: 'Foot or Heel', nextNodeId: 'llaf-foot', highlightMuscles: ['calves'], pin: { top: 90, left: 50, zoom: 3.5 } },
      { label: 'Ankle or outside of foot', nextNodeId: 'llaf-ankle', highlightMuscles: ['calves'], pin: { top: 80, left: 50, zoom: 3.5 } },
      { label: 'Back of Heel / Achilles', nextNodeId: 'llaf-achilles', highlightMuscles: ['left-soleus', 'right-soleus'], modelType: 'posterior', pin: { top: 85, left: 50, zoom: 3.5 } },
      { label: 'Lower Leg / Shin / Calf', nextNodeId: 'llaf-leg', highlightMuscles: ['calves'], pin: { top: 70, left: 50, zoom: 3.5 } },
    ]
  },
  {
    id: 'llaf-foot',
    type: 'question',
    category: 'symptom',
    content: 'Which best describes your foot or heel pain?',
    options: [
      { label: 'Sharp heel pain, worst with first steps in morning', nextNodeId: 'pf-q1', highlightMuscles: ['calves'], pin: { top: 96, left: 50, zoom: 3.5 } },
      { label: 'Heel pain in a growing child/teen', nextNodeId: 'sev-q1', highlightMuscles: ['left-soleus', 'right-soleus'], modelType: 'posterior', pin: { top: 92, left: 50, zoom: 3.5 } },
      { label: 'Deep, aching midfoot/forefoot pain that worsens with running', nextNodeId: 'sffoot-q1', highlightMuscles: ['calves'], pin: { top: 94, left: 50, zoom: 3.5 } },
      { label: 'Burning pain or numbness in the ball of the foot/toes', nextNodeId: 'mn-q1', highlightMuscles: ['calves'], pin: { top: 98, left: 50, zoom: 3.5 } },
      { label: 'Pain under the big toe after bending it forcefully', nextNodeId: 'tt-q1', highlightMuscles: ['calves'], pin: { top: 98, left: 48, zoom: 4.5 } },
      { label: 'Midfoot pain after a twisting injury or crush', nextNodeId: 'lisf-q1', highlightMuscles: ['calves'], pin: { top: 94, left: 50, zoom: 3.5 } },
    ]
  },
  {
    id: 'llaf-ankle',
    type: 'question',
    category: 'symptom',
    content: 'Which best describes your ankle pain?',
    options: [
      { label: 'Ankle pain after rolling or twisting it inward', nextNodeId: 'las-q1', highlightMuscles: ['calves'], pin: { top: 92, left: 36, zoom: 3.5 } },
      { label: 'Persistent feeling of the ankle "giving way" or frequent sprains', nextNodeId: 'cai-q1', highlightMuscles: ['calves'], pin: { top: 92, left: 36, zoom: 3.5 } },
      { label: 'Pain on the outside of the ankle, worsening with pushing off', nextNodeId: 'pt-q1', highlightMuscles: ['calves'], pin: { top: 92, left: 36, zoom: 3.5 } },
      { label: 'Pinching pain at the front of the ankle when bending it upward', nextNodeId: 'ai-q1', highlightMuscles: ['calves'], pin: { top: 90, left: 50, zoom: 3.5 } },
      { label: 'Pinching pain at the back of the ankle when pointing the foot', nextNodeId: 'pai-q1', highlightMuscles: ['left-soleus', 'right-soleus'], modelType: 'posterior', pin: { top: 90, left: 50, zoom: 3.5 } },
    ]
  },
  {
    id: 'llaf-achilles',
    type: 'question',
    category: 'symptom',
    content: 'Which best describes your Achilles pain?',
    options: [
      { label: 'Gradual onset of stiffness and pain in the Achilles tendon', nextNodeId: 'at-q1', highlightMuscles: ['left-soleus', 'right-soleus'], modelType: 'posterior', pin: { top: 85, left: 50, zoom: 3.5 } },
      { label: 'Sudden, sharp pain in the back of the ankle, like being kicked', nextNodeId: 'ar-q1', highlightMuscles: ['left-soleus', 'right-soleus'], modelType: 'posterior', pin: { top: 85, left: 50, zoom: 3.5 } },
    ]
  },
  {
    id: 'llaf-leg',
    type: 'question',
    category: 'symptom',
    content: 'Which best describes your lower leg pain?',
    options: [
      { label: 'Aching pain along the inner shin bone during/after exercise', nextNodeId: 'mtss-q1', highlightMuscles: ['calves'], pin: { top: 82, left: 43, zoom: 3.5 } },
      { label: 'Localized bone pain on the shin that worsens with weight-bearing', nextNodeId: 'tsf-q1', highlightMuscles: ['calves'], pin: { top: 82, left: 50, zoom: 3.5 } },
      { label: 'Sudden, sharp pain in the calf muscle during push-off', nextNodeId: 'cs-q1', highlightMuscles: ['left-soleus', 'right-soleus'], modelType: 'posterior', pin: { top: 75, left: 50, zoom: 3.0 } },
      { label: 'Deep, aching tightness in the lower leg that builds predictably during exercise', nextNodeId: 'cecs-q1', highlightMuscles: ['calves'], pin: { top: 75, left: 50, zoom: 3.0 } },
    ]
  },

  // ---------------------------------------------------------
  // KNEE & THIGH
  // ---------------------------------------------------------
  {
    id: 'knee-thigh-root',
    type: 'question',
    category: 'location',
    content: 'Where is the pain or primary symptom?',
    options: [
      { label: 'Inside or deep within the knee', nextNodeId: 'kt-deep', highlightMuscles: ['knees'], pin: { top: 46, left: 50 } },
      { label: 'Front of the knee / Kneecap', nextNodeId: 'kt-front', highlightMuscles: ['knees'], pin: { top: 50, left: 50, zoom: 3.5 } },
      { label: 'Side or back of thigh/knee', nextNodeId: 'kt-thigh', highlightMuscles: ['hamstring'], pin: { top: 20, left: 50 } },
    ]
  },
  {
    id: 'kt-deep',
    type: 'question',
    category: 'symptom',
    content: 'Which best describes your deep/inner knee symptom?',
    options: [
      { label: 'Knee pain/instability after a twisting or pivoting injury', nextNodeId: 'acl-q1', highlightMuscles: ['knees'], pin: { top: 50, left: 50 } },
      { label: 'Knee pain after force to the outside of the knee (buckling inward)', nextNodeId: 'mcl-q1', highlightMuscles: ['knees'], pin: { top: 50, left: 65 } },
      { label: 'Knee pain after force to the inside of the knee (buckling outward)', nextNodeId: 'lcl-q1', highlightMuscles: ['knees'], pin: { top: 50, left: 35 } },
      { label: 'Knee pain after a direct blow to the front of the shin/dashboard injury', nextNodeId: 'pcl-q1', highlightMuscles: ['knees'], pin: { top: 72, left: 50, zoom: 3.5 } },
      { label: 'Catching, locking, or clicking in the knee after a twisting motion', nextNodeId: 'men-q1', highlightMuscles: ['knees'], pin: { top: 72, left: 50, zoom: 3.5 } },
      { label: 'Gradual onset of widespread knee stiffness and aching (common in older adults)', nextNodeId: 'koa-q1', highlightMuscles: ['knees'], pin: { top: 72, left: 50, zoom: 3.5 } },
      { label: 'Snapping sensation and pain on the inner side of the knee during bending', nextNodeId: 'plic-q1', highlightMuscles: ['knees'], pin: { top: 72, left: 55, zoom: 3.5 } },
    ]
  },
  {
    id: 'kt-front',
    type: 'question',
    category: 'symptom',
    content: 'Which best describes your front knee/kneecap pain?',
    options: [
      { label: 'Diffuse pain around/behind the kneecap, worsened by stairs or prolonged sitting', nextNodeId: 'pfps-q1', highlightMuscles: ['knees'], pin: { top: 72, left: 50, zoom: 3.5 } },
      { label: 'Localized pain just below the kneecap, worsened by jumping', nextNodeId: 'ptend-q1', highlightMuscles: ['knees'], pin: { top: 58, left: 50 } },
      { label: 'Pain and a bony bump just below the kneecap in a growing child/teen', nextNodeId: 'os-q1', highlightMuscles: ['knees'], pin: { top: 70, left: 50 } },
      { label: 'Sudden dislocation or slipping of the kneecap', nextNodeId: 'pi-q1', highlightMuscles: ['knees'], pin: { top: 72, left: 50, zoom: 3.5 } },
      { label: 'Pain just below the kneecap that worsens when fully straightening the leg', nextNodeId: 'hfp-q1', highlightMuscles: ['knees'], pin: { top: 74, left: 50, zoom: 3.5 } },
      { label: 'Visible swelling like a pouch directly over the kneecap', nextNodeId: 'ppb-q1', highlightMuscles: ['knees'], pin: { top: 72, left: 50, zoom: 3.5 } },
    ]
  },
  {
    id: 'kt-thigh',
    type: 'question',
    category: 'symptom',
    content: 'Which best describes your thigh or side-knee pain?',
    options: [
      { label: 'Sudden, sharp pain in the back of the thigh during sprinting', nextNodeId: 'hsi-q1', highlightMuscles: ['hamstring'], pin: { top: 20, left: 50 } },
      { label: 'Sudden, sharp pain or direct bruising in the front of the thigh', nextNodeId: 'qs-q1', highlightMuscles: ['quadriceps'], pin: { top: 20, left: 50 } },
      { label: 'Sharp pain on the outside of the knee, common in runners', nextNodeId: 'itb-q1', highlightMuscles: ['knees', 'hamstring'], pin: { top: 48, left: 32 } },
      { label: 'Pain on the inner shin just below the knee joint line', nextNodeId: 'pa-q1', highlightMuscles: ['knees', 'calves'], pin: { top: 68, left: 62 } },
    ]
  },

  // ---------------------------------------------------------
  // HIP, PELVIS, GROIN
  // ---------------------------------------------------------
  {
    id: 'hip-pelvis-groin-root',
    type: 'question',
    category: 'location',
    content: 'Where is your pain primarily located?',
    options: [
      { label: 'Groin or Front of Hip', nextNodeId: 'hpg-groin', highlightMuscles: ['adductor'], pin: { top: 55, left: 55 } },
      { label: 'Side of Hip', nextNodeId: 'hpg-side', highlightMuscles: ['abductors'], pin: { top: 50, left: 30 } },
      { label: 'Deep Hip Pain or Bone Pain', nextNodeId: 'hpg-deep', highlightMuscles: ['gluteal', 'adductor'], pin: { top: 50, left: 50 } },
      { label: 'Buttock or Back of Hip', nextNodeId: 'hpg-back', highlightMuscles: ['gluteal'], pin: { top: 50, left: 50 } },
    ]
  },
  {
    id: 'hpg-groin',
    type: 'question',
    category: 'symptom',
    content: 'Which best describes your groin/front hip pain?',
    options: [
      { label: 'Pain in the groin/inner thigh during activity or squeezing legs together', nextNodeId: 'gp-q1', highlightMuscles: ['adductor'], pin: { top: 58, left: 58 } },
      { label: 'Pinching groin pain with deep hip flexion, pivoting, or sitting', nextNodeId: 'fai-q1', highlightMuscles: ['abs', 'adductor'], pin: { top: 48, left: 45 } },
      { label: 'Deep groin pain with clicking, catching, or giving way', nextNodeId: 'hlt-q1', highlightMuscles: ['abs', 'adductor'], pin: { top: 48, left: 40, zoom: 3.5 } },
    ]
  },
  {
    id: 'hpg-side',
    type: 'question',
    category: 'symptom',
    content: 'Which best describes your side hip pain?',
    options: [
      { label: 'Pain on the outside of the hip, worsened by lying on that side', nextNodeId: 'gtps-q1', highlightMuscles: ['abductors', 'gluteal'], pin: { top: 50, left: 30 } },
      { label: 'Audible or palpable snapping around the hip during movement', nextNodeId: 'shp-q1', highlightMuscles: ['abductors'], pin: { top: 50, left: 30 } },
      { label: 'Severe pain and bruising on the hip bone after a direct blow', nextNodeId: 'hp-q1', highlightMuscles: ['abs', 'obliques'], pin: { top: 38, left: 35 } },
    ]
  },
  {
    id: 'hpg-deep',
    type: 'question',
    category: 'symptom',
    content: 'Which best describes your deep hip pain?',
    options: [
      { label: 'Progressive deep hip/groin pain worsening with weight-bearing', nextNodeId: 'hsf-q1', highlightMuscles: ['adductor'], pin: { top: 48, left: 40, zoom: 3.5 } },
      { label: 'Deep hip pain, stiffness, and loss of movement (common in older adults)', nextNodeId: 'hoa-q1', highlightMuscles: ['gluteal', 'adductor'], pin: { top: 50, left: 50 } },
      { label: 'Sudden pain in the pelvis during explosive sprinting or kicking in a teenager', nextNodeId: 'aa-q1', highlightMuscles: ['abs', 'adductor'], pin: { top: 40, left: 50 } },
    ]
  },
  {
    id: 'hpg-back',
    type: 'question',
    category: 'symptom',
    content: 'Which best describes your buttock pain?',
    options: [
      { label: 'Buttock pain with possible radiating nerve pain down the leg', nextNodeId: 'pir-q1', highlightMuscles: ['gluteal'], pin: { top: 52, left: 48 } },
    ]
  },

  // ---------------------------------------------------------
  // SPINE
  // ---------------------------------------------------------
  {
    id: 'spine-root',
    type: 'question',
    category: 'location',
    content: 'Where is your pain primarily located?',
    options: [
      { label: 'Lower Back Pain radiating down leg', nextNodeId: 'sp-radiating', highlightMuscles: ['lower-back', 'hamstring'], pin: { top: 65, left: 50 } },
      { label: 'Lower Back Pain (isolated)', nextNodeId: 'sp-lbp', highlightMuscles: ['lower-back'], pin: { top: 60, left: 50 } },
      { label: 'Pelvic / Tailbone Pain', nextNodeId: 'sp-pelvis', highlightMuscles: ['lower-back', 'gluteal'], pin: { top: 75, left: 50 } },
      { label: 'Mid-Back or Rib Pain', nextNodeId: 'sp-midback', highlightMuscles: ['upper-back'], pin: { top: 35, left: 50 } },
    ]
  },
  {
    id: 'sp-radiating',
    type: 'question',
    category: 'symptom',
    content: 'Which best describes your radiating leg pain?',
    options: [
      { label: 'Back pain with sharp, shooting pain or numbness down the leg', nextNodeId: 'ldh-q1', highlightMuscles: ['lower-back', 'hamstring'], modelType: 'posterior', pin: { top: 55, left: 50, zoom: 2.0 } },
      { label: 'Leg pain/heaviness with walking that improves with sitting or leaning forward', nextNodeId: 'ls-q1', highlightMuscles: ['lower-back', 'hamstring'], modelType: 'posterior', pin: { top: 55, left: 50, zoom: 2.0 } },
    ]
  },
  {
    id: 'sp-lbp',
    type: 'question',
    category: 'symptom',
    content: 'Which best describes your lower back pain?',
    options: [
      { label: 'General ache or pain in the lower back without nerve symptoms', nextNodeId: 'nslbp-q1', highlightMuscles: ['lower-back'], modelType: 'posterior', pin: { top: 45, left: 50, zoom: 2.5 } },
      { label: 'Acute lower back pain after a sudden lift, twist, or strain', nextNodeId: 'lms-q1', highlightMuscles: ['lower-back'], modelType: 'posterior', pin: { top: 45, left: 50, zoom: 2.5 } },
      { label: 'Lower back pain worsened by arching backwards, common in young athletes', nextNodeId: 'spon-q1', highlightMuscles: ['lower-back'], modelType: 'posterior', pin: { top: 45, left: 50, zoom: 2.5 } },
    ]
  },
  {
    id: 'sp-pelvis',
    type: 'question',
    category: 'symptom',
    content: 'Which best describes your pelvic pain?',
    options: [
      { label: 'Pain around the dimples of the lower back/pelvis, sometimes referring to the thigh', nextNodeId: 'sij-q1', highlightMuscles: ['lower-back', 'gluteal'], modelType: 'posterior', pin: { top: 48, left: 50, zoom: 3.5 } },
    ]
  },
  {
    id: 'sp-midback',
    type: 'question',
    category: 'symptom',
    content: 'Which best describes your mid-back or rib pain?',
    options: [
      { label: 'Ache or pain in the mid-back (between shoulder blades) or front of chest', nextNodeId: 'tp-q1', highlightMuscles: ['upper-back'], modelType: 'posterior', pin: { top: 30, left: 50, zoom: 2.5 } },
      { label: 'Localized rib pain that worsens with deep breathing or twisting', nextNodeId: 'rib-q1', highlightMuscles: ['upper-back'], pin: { top: 40, left: 42 } },
    ]
  },

  // ---------------------------------------------------------
  // SHOULDER
  // ---------------------------------------------------------
  {
    id: 'shoulder-root',
    type: 'question',
    category: 'location',
    content: 'Which best describes the primary symptom or cause?',
    options: [
      { label: 'Pain when lifting arm or reaching overhead', nextNodeId: 'sh-overhead', highlightMuscles: ['front-deltoids'], pin: { top: 25, left: 25, zoom: 3.5 } },
      { label: 'Pain after trauma or feeling of popping/instability', nextNodeId: 'sh-trauma', highlightMuscles: ['front-deltoids'], pin: { top: 25, left: 25, zoom: 3.5 } },
      { label: 'Severe stiffness and limited movement', nextNodeId: 'sh-stiff', highlightMuscles: ['front-deltoids'], pin: { top: 25, left: 25, zoom: 3.5 } },
      { label: 'Front of shoulder / bicep pain', nextNodeId: 'sh-front', highlightMuscles: ['biceps'], pin: { top: 28, left: 25, zoom: 3.5 } },
    ]
  },
  {
    id: 'sh-overhead',
    type: 'question',
    category: 'symptom',
    content: 'Which best describes your overhead shoulder pain?',
    options: [
      { label: 'Shoulder pain and weakness during overhead activities, with a painful arc', nextNodeId: 'rc-q1', highlightMuscles: ['front-deltoids'], pin: { top: 25, left: 25, zoom: 3.5 } },
      { label: 'Deep shoulder pain specifically after repetitive swimming', nextNodeId: 'swsh-q1', highlightMuscles: ['front-deltoids'], pin: { top: 25, left: 25, zoom: 3.5 } },
      { label: 'Pinching pain when lifting the arm, often worse at night', nextNodeId: 'sbur-q1', highlightMuscles: ['front-deltoids'], pin: { top: 25, left: 25, zoom: 3.5 } },
      { label: 'Shoulder pain accompanied by altered movement or "winging" of the shoulder blade', nextNodeId: 'sd-q1', highlightMuscles: ['back-deltoids'], pin: { top: 25, left: 75 } },
    ]
  },
  {
    id: 'sh-trauma',
    type: 'question',
    category: 'symptom',
    content: 'Which best describes your shoulder trauma/instability?',
    options: [
      { label: 'Shoulder popped out or feels loose/unstable', nextNodeId: 'si-q1', highlightMuscles: ['front-deltoids'], pin: { top: 25, left: 25, zoom: 3.5 } },
      { label: 'Deep shoulder pain, catching, or popping (often after falling on outstretched arm)', nextNodeId: 'slap-q1', highlightMuscles: ['front-deltoids'], pin: { top: 25, left: 25, zoom: 3.5 } },
      { label: 'Pain on the very top of the shoulder (collarbone) after a fall', nextNodeId: 'ac-q1', highlightMuscles: ['front-deltoids'], pin: { top: 23, left: 25, zoom: 3.5 } },
    ]
  },
  {
    id: 'sh-stiff',
    type: 'question',
    category: 'symptom',
    content: 'Which best describes your shoulder stiffness?',
    options: [
      { label: 'Progressive, severe restriction of shoulder movement and widespread ache', nextNodeId: 'fs-q1', highlightMuscles: ['front-deltoids'], pin: { top: 25, left: 25, zoom: 3.5 } },
    ]
  },
  {
    id: 'sh-front',
    type: 'question',
    category: 'symptom',
    content: 'Which best describes your front shoulder pain?',
    options: [
      { label: 'Pain and tenderness at the front of the shoulder/bicep', nextNodeId: 'bt-q1', highlightMuscles: ['biceps'], pin: { top: 28, left: 25, zoom: 3.5 } },
    ]
  },

  // ---------------------------------------------------------
  // ELBOW, WRIST, HAND
  // ---------------------------------------------------------
  {
    id: 'elbow-wrist-hand-root',
    type: 'question',
    category: 'location',
    content: 'Where is your pain primarily located?',
    options: [
      { label: 'Elbow', nextNodeId: 'ewh-elbow', highlightMuscles: ['forearm', 'biceps'], pin: { top: 35, left: 20, zoom: 3.5 } },
      { label: 'Wrist', nextNodeId: 'ewh-wrist', highlightMuscles: ['forearm'], pin: { top: 42, left: 15, zoom: 4.0 } },
      { label: 'Hand or Fingers', nextNodeId: 'ewh-hand', highlightMuscles: ['forearm'], pin: { top: 48, left: 10, zoom: 4.5 } },
    ]
  },
  {
    id: 'ewh-elbow',
    type: 'question',
    category: 'symptom',
    content: 'Which best describes your elbow pain?',
    options: [
      { label: 'Pain on the outside of the elbow, worsened by gripping', nextNodeId: 'te-q1', highlightMuscles: ['forearm'], pin: { top: 35, left: 85 } },
      { label: 'Pain on the inside of the elbow, worsened by gripping or throwing', nextNodeId: 'ge-q1', highlightMuscles: ['forearm', 'biceps'], pin: { top: 35, left: 20, zoom: 3.5 } },
      { label: 'Swelling like a golf ball on the point of the elbow', nextNodeId: 'ob-q1', highlightMuscles: ['forearm'], modelType: 'posterior', pin: { top: 35, left: 85, zoom: 3.5 } },
      { label: 'Pain on the inside of the elbow after repetitive hard throwing', nextNodeId: 'ucl-q1', highlightMuscles: ['forearm', 'biceps'], pin: { top: 35, left: 20, zoom: 3.5 } },
      { label: 'Deep, locking pain on the outside of the elbow in a young thrower or gymnast', nextNodeId: 'cocd-q1', highlightMuscles: ['forearm'], modelType: 'posterior', pin: { top: 35, left: 85, zoom: 3.5 } },
    ]
  },
  {
    id: 'ewh-wrist',
    type: 'question',
    category: 'symptom',
    content: 'Which best describes your wrist pain?',
    options: [
      { label: 'Numbness and tingling in the thumb, index, and middle fingers', nextNodeId: 'cts-q1', highlightMuscles: ['forearm'], pin: { top: 42, left: 15, zoom: 4.0 } },
      { label: 'Pain on the thumb-side of the wrist, worsened by gripping or moving the thumb', nextNodeId: 'dq-q1', highlightMuscles: ['forearm'], pin: { top: 42, left: 15, zoom: 4.0 } },
      { label: 'Wrist pain after falling on an outstretched hand', nextNodeId: 'ws-q1', highlightMuscles: ['forearm'], pin: { top: 42, left: 15, zoom: 4.0 } },
    ]
  },
  {
    id: 'ewh-hand',
    type: 'question',
    category: 'symptom',
    content: 'Which best describes your hand/finger pain?',
    options: [
      { label: 'Finger catches or locks when bending, then releases with a painful snap', nextNodeId: 'tf-q1', highlightMuscles: ['forearm'], pin: { top: 48, left: 10, zoom: 4.5 } },
      { label: 'Thumb pain after a fall, particularly if gripping a pole/object', nextNodeId: 'skt-q1', highlightMuscles: ['forearm'], pin: { top: 46, left: 10, zoom: 4.5 } },
      { label: 'Inability to straighten the very tip of the finger after a ball strike', nextNodeId: 'mf-q1', highlightMuscles: ['forearm'], pin: { top: 50, left: 8, zoom: 4.5 } },
      { label: 'Bone pain, bruising, and swelling in the hand or fingers after an impact', nextNodeId: 'hf-q1', highlightMuscles: ['forearm'], pin: { top: 48, left: 10, zoom: 4.5 } },
    ]
  },

  // ---------------------------------------------------------
  // HEAD & NECK
  // ---------------------------------------------------------
  {
    id: 'head-neck-root',
    type: 'question',
    category: 'location',
    content: 'Where is the primary symptom or cause?',
    options: [
      { label: 'Headache, dizziness, or head impact', nextNodeId: 'hn-head', highlightMuscles: ['neck'], pin: { top: 10, left: 50, zoom: 3.5 } },
      { label: 'Neck pain', nextNodeId: 'hn-neck', highlightMuscles: ['neck'], pin: { top: 15, left: 50, zoom: 3.5 } },
    ]
  },
  {
    id: 'hn-head',
    type: 'question',
    category: 'symptom',
    content: 'Which best describes your head symptom?',
    options: [
      { label: 'Headache, dizziness, or confusion after a hit to the head or body', nextNodeId: 'conc-q1', highlightMuscles: ['neck'], pin: { top: 10, left: 50, zoom: 3.5 } },
    ]
  },
  {
    id: 'hn-neck',
    type: 'question',
    category: 'symptom',
    content: 'Which best describes your neck pain?',
    options: [
      { label: 'Neck pain and stiffness after a whiplash injury (e.g., tackle, collision)', nextNodeId: 'wad-q1', highlightMuscles: ['neck'], pin: { top: 15, left: 50, zoom: 3.5 } },
      { label: 'Acute neck muscle strain or stiffness', nextNodeId: 'csp-q1', highlightMuscles: ['neck'], pin: { top: 15, left: 50, zoom: 3.5 } },
      { label: 'Neck pain with numbness, tingling, or weakness shooting down the arm', nextNodeId: 'cr-q1', highlightMuscles: ['neck'], pin: { top: 65, left: 50 } },
      { label: 'Sudden, intense burning or electric shock feeling down the arm after a tackle', nextNodeId: 'sb-q1', highlightMuscles: ['neck'], pin: { top: 18, left: 50, zoom: 3.5 } },
    ]
  },

  // ---------------------------------------------------------
  // SYSTEMIC
  // ---------------------------------------------------------
  {
    id: 'systemic-root',
    type: 'question',
    category: 'symptom',
    content: 'Which best describes your symptoms?',
    options: [
      { label: 'Painful, spasmodic muscle contractions during or after exercise', nextNodeId: 'eamc-q1' },
      { label: 'Persistent fatigue, underperformance, and mood changes', nextNodeId: 'ots-q1' },
      { label: 'Diffuse muscle soreness peaking 1-3 days after new or heavy exercise', nextNodeId: 'doms-q1' },
    ]
  }
];
