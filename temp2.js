
    const injuries = [
  {
    id: 'lateral-ankle-sprain',
    name: 'Lateral Ankle Ligament Sprain',
    region: 'lower-leg-ankle-foot',
    aliases: ['rolled ankle', 'ankle sprain', 'inversion sprain', 'ATFL sprain'],
    overview: 'Injury to the lateral ankle ligaments (most commonly the ATFL) caused by excessive inversion and plantarflexion. Graded I-III based on severity. Most common sports injury overall.',
    redFlags: [
      { symptom: 'Inability to bear weight (4 steps)', reason: 'Possible fracture — Ottawa Ankle Rules', urgency: 'urgent' },
      { symptom: 'Bony tenderness at posterior edge of malleolus', reason: 'Possible fracture — Ottawa Ankle Rules', urgency: 'urgent' },
      { symptom: 'Gross deformity or open wound', reason: 'Severe fracture or dislocation', urgency: 'emergency' },
    ],
    riskFactors: ['Previous ankle sprain', 'Poor balance/proprioception', 'Inadequate warm-up', 'Uneven surfaces', 'High-risk sports (basketball, volleyball, trail running)'],
    diagnosticTreeRootId: 'las-q1',
    estimatedRecovery: '2-12 weeks depending on grade',
  },
  {
    id: 'acl-injury',
    name: 'Anterior Cruciate Ligament (ACL) Injury',
    region: 'knee-thigh',
    aliases: ['ACL tear', 'ACL rupture', 'knee gave way'],
    overview: 'Partial or complete tear of the ACL, typically from non-contact pivoting, cutting, or landing mechanisms. Often accompanied by an audible "pop" and rapid knee swelling.',
    redFlags: [
      { symptom: 'Locked knee — unable to fully extend', reason: 'Possible meniscal bucket-handle tear', urgency: 'urgent' },
      { symptom: 'Severe vascular compromise (pale, pulseless foot)', reason: 'Knee dislocation with vascular injury', urgency: 'emergency' },
    ],
    riskFactors: ['Female sex', 'Pivoting/cutting sports', 'Fatigue', 'Quadriceps dominance', 'Poor neuromuscular control', 'Previous ACL injury'],
    diagnosticTreeRootId: 'acl-q1',
    estimatedRecovery: '9-12 months (surgical), 3-6 months (conservative)',
  },
  {
    id: 'patellofemoral-pain',
    name: 'Patellofemoral Pain Syndrome (PFPS)',
    region: 'knee-thigh',
    aliases: ['runner\'s knee', 'anterior knee pain', 'kneecap pain'],
    overview: 'Diffuse anterior knee pain around or behind the patella, aggravated by activities that load the patellofemoral joint such as squatting, stairs, running, and prolonged sitting.',
    redFlags: [
      { symptom: 'Knee locking or true giving way', reason: 'Possible meniscal or ligament injury', urgency: 'prompt' },
      { symptom: 'Significant swelling within 2 hours of injury', reason: 'Possible intra-articular pathology', urgency: 'urgent' },
    ],
    riskFactors: ['Overuse/training errors', 'Weak hip abductors/external rotators', 'Tight quadriceps/ITB', 'Overpronation', 'Females 2x more common'],
    diagnosticTreeRootId: 'pfps-q1',
    estimatedRecovery: '6-12 weeks with appropriate rehabilitation',
  },
  {
    id: 'plantar-fasciitis',
    name: 'Plantar Fasciitis / Plantar Heel Pain',
    region: 'lower-leg-ankle-foot',
    aliases: ['heel pain', 'plantar fasciopathy', 'policeman\'s heel'],
    overview: 'Degenerative condition of the plantar fascia insertion at the medial calcaneal tubercle. Characterized by sharp heel pain with first steps in the morning that improves with activity but worsens after prolonged standing.',
    redFlags: [
      { symptom: 'Night pain unrelated to activity', reason: 'Possible stress fracture or systemic condition', urgency: 'prompt' },
      { symptom: 'Bilateral heel pain with systemic symptoms', reason: 'Possible inflammatory arthropathy', urgency: 'prompt' },
    ],
    riskFactors: ['BMI > 27', 'Prolonged standing occupation', 'Reduced ankle dorsiflexion', 'Running volume increase', 'Flat or high-arched feet'],
    diagnosticTreeRootId: 'pf-q1',
    estimatedRecovery: '3-6 months, up to 12 months for chronic cases',
  },
  {
    id: 'concussion',
    name: 'Sport-Related Concussion (SRC)',
    region: 'head-neck',
    aliases: ['concussion', 'mild TBI', 'head knock', 'bell rung'],
    overview: 'Traumatic brain injury induced by biomechanical forces, resulting in a complex pathophysiological process affecting the brain. Diagnosis is clinical — no single test confirms concussion.',
    redFlags: [
      { symptom: 'Loss of consciousness > 1 minute', reason: 'More severe brain injury', urgency: 'emergency' },
      { symptom: 'Seizure or convulsion', reason: 'Possible structural brain injury', urgency: 'emergency' },
      { symptom: 'Worsening headache', reason: 'Possible intracranial bleeding', urgency: 'emergency' },
      { symptom: 'Repeated vomiting', reason: 'Raised intracranial pressure', urgency: 'emergency' },
      { symptom: 'Neck pain or tenderness', reason: 'Possible cervical spine injury', urgency: 'emergency' },
      { symptom: 'Increasing confusion or unusual behavior', reason: 'Deteriorating neurological status', urgency: 'emergency' },
    ],
    riskFactors: ['Contact/collision sports', 'Previous concussion', 'Female sex', 'History of migraine', 'Younger age'],
    diagnosticTreeRootId: 'conc-q1',
    estimatedRecovery: '10-14 days (80% of adults), longer if complicated',
  },
  {
    id: 'rotator-cuff-injury',
    name: 'Rotator Cuff Tendinopathy / Tear',
    region: 'shoulder',
    aliases: ['shoulder impingement', 'rotator cuff tear', 'shoulder tendinitis', 'painful arc'],
    overview: 'Spectrum of rotator cuff pathology from tendinopathy to partial/full-thickness tears. Presents with shoulder pain during overhead activities, weakness, and painful arc of movement.',
    redFlags: [
      { symptom: 'Acute traumatic onset with complete inability to raise arm', reason: 'Possible acute full-thickness tear requiring surgical opinion', urgency: 'urgent' },
      { symptom: 'Shoulder dislocation that hasn\'t reduced', reason: 'Requires emergency reduction', urgency: 'emergency' },
    ],
    riskFactors: ['Overhead sports/occupations', 'Age > 40', 'Previous shoulder injury', 'Smoking', 'Diabetes'],
    diagnosticTreeRootId: 'rc-q1',
    estimatedRecovery: '6-12 weeks (tendinopathy), 3-6 months (partial tear), 6-12 months (surgical repair)',
  },
  {
    id: 'hamstring-strain',
    name: 'Hamstring Strain Injury (HSI)',
    region: 'knee-thigh',
    aliases: ['pulled hamstring', 'hamstring tear', 'hammy strain'],
    overview: 'Acute strain of the hamstring muscle group, most commonly the biceps femoris long head. Typically occurs during sprinting (late swing phase) or stretching movements.',
    redFlags: [
      { symptom: 'Complete inability to walk or large palpable defect', reason: 'Possible complete rupture requiring imaging', urgency: 'urgent' },
      { symptom: 'Proximal (sitting bone) pain with significant bruising', reason: 'Possible proximal avulsion requiring surgical opinion', urgency: 'urgent' },
    ],
    riskFactors: ['Previous hamstring injury (strongest predictor)', 'Sprint-based sports', 'Inadequate warm-up', 'Hamstring weakness', 'Poor lumbopelvic control', 'Older age'],
    diagnosticTreeRootId: 'hsi-q1',
    estimatedRecovery: '2-8 weeks (Grade I-II), 3-6 months (Grade III/proximal)',
  },
  {
    id: 'tennis-elbow',
    name: 'Lateral Epicondylalgia (Tennis Elbow)',
    region: 'elbow-wrist-hand',
    aliases: ['tennis elbow', 'lateral epicondylitis', 'lateral elbow pain'],
    overview: 'Tendinopathy of the common extensor origin at the lateral epicondyle, primarily the extensor carpi radialis brevis (ECRB). Characterized by lateral elbow pain worsened by gripping and wrist extension.',
    redFlags: [
      { symptom: 'Elbow locking or mechanical block', reason: 'Possible loose body or OCD', urgency: 'prompt' },
      { symptom: 'Elbow instability or giving way', reason: 'Possible ligament injury', urgency: 'prompt' },
    ],
    riskFactors: ['Repetitive gripping activities', 'Age 35-55', 'Racquet sports', 'Manual occupations', 'Poor forearm strength'],
    diagnosticTreeRootId: 'te-q1',
    estimatedRecovery: '6-12 months with appropriate loading program',
  },
  {
    id: 'lumbar-disc-herniation',
    name: 'Lumbar Disc Herniation',
    region: 'spine',
    aliases: ['slipped disc', 'herniated disc', 'disc bulge', 'sciatica'],
    overview: 'Displacement of disc material beyond the normal margins of the intervertebral disc space. May cause radiculopathy (leg pain/numbness) if the herniation compresses a nerve root.',
    redFlags: [
      { symptom: 'Saddle anesthesia or bowel/bladder dysfunction', reason: 'Cauda equina syndrome — surgical emergency', urgency: 'emergency' },
      { symptom: 'Progressive motor weakness in legs', reason: 'Worsening nerve compression', urgency: 'urgent' },
      { symptom: 'Night pain with unexplained weight loss', reason: 'Possible malignancy', urgency: 'urgent' },
    ],
    riskFactors: ['Heavy lifting', 'Prolonged sitting', 'Smoking', 'Obesity', 'Previous disc injury', 'Age 30-50'],
    diagnosticTreeRootId: 'ldh-q1',
    estimatedRecovery: '6-12 weeks (most cases), longer with radiculopathy',
  },
  {
    id: 'groin-pain',
    name: 'Groin Pain Syndrome',
    region: 'hip-pelvis-groin',
    aliases: ['adductor strain', 'groin strain', 'osteitis pubis', 'sports hernia'],
    overview: 'Umbrella term for activity-related groin pain classified by the Doha agreement into adductor-related, iliopsoas-related, inguinal-related, and pubic-related groin pain.',
    redFlags: [
      { symptom: 'Groin lump that doesn\'t reduce', reason: 'Possible incarcerated hernia', urgency: 'urgent' },
      { symptom: 'Testicular pain or swelling', reason: 'Requires medical evaluation', urgency: 'urgent' },
    ],
    riskFactors: ['Previous groin injury', 'Football/soccer', 'Hockey', 'Weak adductors', 'Reduced hip ROM'],
    diagnosticTreeRootId: 'gp-q1',
    estimatedRecovery: '4-12 weeks depending on classification',
  },
  {
    id: 'medial-tibial-stress-syndrome',
    name: 'Medial Tibial Stress Syndrome (MTSS)',
    region: 'lower-leg-ankle-foot',
    aliases: ['shin splints', 'shin pain', 'tibial periostitis'],
    overview: 'Exercise-induced pain along the posteromedial border of the tibia, caused by overload of the tibial periosteum. Common in runners and military recruits.',
    redFlags: [
      { symptom: 'Focal bony tenderness (< 5cm area)', reason: 'Possible stress fracture — imaging required', urgency: 'urgent' },
      { symptom: 'Night pain at rest', reason: 'Possible stress fracture or other pathology', urgency: 'prompt' },
    ],
    riskFactors: ['Sudden increase in running volume', 'Female sex', 'High BMI', 'Overpronation', 'Hard running surfaces', 'Previous MTSS'],
    diagnosticTreeRootId: 'mtss-q1',
    estimatedRecovery: '6-12 weeks with load management',
  },
  {
    id: 'achilles-tendinopathy',
    name: 'Achilles Tendinopathy',
    region: 'lower-leg-ankle-foot',
    aliases: ['achilles tendinitis', 'achilles pain', 'heel cord pain'],
    overview: 'Overuse condition of the Achilles tendon, either at the midportion (2-6cm above insertion) or insertional (at the calcaneus). Characterized by morning stiffness and load-related pain.',
    redFlags: [
      { symptom: 'Sudden "pop" with acute inability to push off', reason: 'Possible Achilles rupture', urgency: 'emergency' },
      { symptom: 'Palpable gap in the tendon', reason: 'Achilles rupture', urgency: 'emergency' },
    ],
    riskFactors: ['Running sports', 'Sudden training load increase', 'Age > 35', 'Previous Achilles injury', 'Fluoroquinolone antibiotics', 'Stiff calf muscles'],
    diagnosticTreeRootId: 'at-q1',
    estimatedRecovery: '3-6 months with heavy slow resistance program',
  },
  /* ── Head & Neck (2 more) ── */
  {
    id: 'whiplash',
    name: 'Whiplash-Associated Disorder (WAD)',
    region: 'head-neck',
    aliases: ['whiplash', 'neck sprain', 'cervical acceleration-deceleration injury'],
    overview: 'Injury to the cervical spine caused by sudden acceleration-deceleration mechanism. Classified WAD I-IV by Quebec Task Force. Common in contact sports and motor vehicle collisions.',
    redFlags: [
      { symptom: 'Neurological deficit (weakness, numbness in arms)', reason: 'Possible spinal cord or nerve root injury', urgency: 'emergency' },
      { symptom: 'Severe midline cervical tenderness', reason: 'Possible fracture — Canadian C-Spine Rules', urgency: 'emergency' },
    ],
    riskFactors: ['Contact sports', 'Previous neck injury', 'Female sex', 'Pre-existing neck pain', 'High-speed impact'],
    diagnosticTreeRootId: 'wad-q1',
    estimatedRecovery: '4-12 weeks (WAD I-II), longer for WAD III-IV',
  },
  {
    id: 'cervical-radiculopathy',
    name: 'Cervical Radiculopathy',
    region: 'head-neck',
    aliases: ['pinched nerve in neck', 'neck nerve pain', 'stinger', 'burner'],
    overview: 'Compression or irritation of a cervical nerve root causing pain, numbness, or weakness radiating into the arm. Common levels C5-C7.',
    redFlags: [
      { symptom: 'Progressive weakness in both hands', reason: 'Possible cervical myelopathy', urgency: 'urgent' },
      { symptom: 'Gait disturbance or balance problems', reason: 'Possible spinal cord compression', urgency: 'emergency' },
      { symptom: 'Bilateral symptoms', reason: 'Possible central cord lesion', urgency: 'urgent' },
    ],
    riskFactors: ['Age > 40', 'Contact sports', 'Previous cervical injury', 'Repetitive overhead activities', 'Heavy manual work'],
    diagnosticTreeRootId: 'cr-q1',
    estimatedRecovery: '6-12 weeks with conservative management',
  },
  /* ── Shoulder (4 more) ── */
  {
    id: 'shoulder-instability',
    name: 'Shoulder Instability / Dislocation',
    region: 'shoulder',
    aliases: ['dislocated shoulder', 'shoulder subluxation', 'shoulder giving way'],
    overview: 'Excessive translation of the humeral head on the glenoid. May be traumatic (dislocation) or atraumatic (multidirectional instability). Anterior dislocations account for 95% of cases.',
    redFlags: [
      { symptom: 'Unreduced dislocation (arm stuck in position)', reason: 'Requires emergency reduction', urgency: 'emergency' },
      { symptom: 'Axillary nerve deficit (numb deltoid patch)', reason: 'Nerve injury from dislocation', urgency: 'urgent' },
    ],
    riskFactors: ['Age < 25 at first dislocation', 'Contact sports', 'Hypermobility', 'Previous dislocation', 'Male sex'],
    diagnosticTreeRootId: 'si-q1',
    estimatedRecovery: '3-6 months (first dislocation), surgical if recurrent',
  },
  {
    id: 'ac-joint-injury',
    name: 'Acromioclavicular (AC) Joint Injury',
    region: 'shoulder',
    aliases: ['AC joint sprain', 'separated shoulder', 'AC joint dislocation'],
    overview: 'Injury to the acromioclavicular joint, graded I-VI (Rockwood). Typically caused by direct fall onto the point of the shoulder. Grades I-III usually managed conservatively.',
    redFlags: [
      { symptom: 'Gross deformity with skin tenting', reason: 'High-grade separation requiring surgical opinion', urgency: 'urgent' },
    ],
    riskFactors: ['Contact sports (rugby, AFL, hockey)', 'Cycling (falls)', 'Previous AC joint injury', 'Male sex'],
    diagnosticTreeRootId: 'ac-q1',
    estimatedRecovery: '2-6 weeks (Grade I-II), 6-12 weeks (Grade III)',
  },
  {
    id: 'frozen-shoulder',
    name: 'Adhesive Capsulitis (Frozen Shoulder)',
    region: 'shoulder',
    aliases: ['frozen shoulder', 'stiff shoulder', 'adhesive capsulitis'],
    overview: 'Progressive restriction of active and passive shoulder ROM due to capsular fibrosis. Typically progresses through freezing, frozen, and thawing phases over 12-36 months.',
    redFlags: [
      { symptom: 'Pain not improving with conservative management after 3 months', reason: 'Consider alternative diagnosis', urgency: 'prompt' },
    ],
    riskFactors: ['Age 40-65', 'Diabetes (5x risk)', 'Thyroid disorders', 'Previous shoulder surgery or immobilization', 'Female sex'],
    diagnosticTreeRootId: 'fs-q1',
    estimatedRecovery: '12-36 months (self-limiting), faster with intervention',
  },
  {
    id: 'slap-tear',
    name: 'Superior Labral (SLAP) Tear',
    region: 'shoulder',
    aliases: ['SLAP lesion', 'labral tear', 'shoulder labrum tear'],
    overview: 'Tear of the superior glenoid labrum extending from anterior to posterior, often involving the biceps anchor. Common in overhead athletes (baseball, swimming, tennis).',
    redFlags: [
      { symptom: 'Shoulder locking or catching with specific movements', reason: 'Possible unstable labral flap', urgency: 'prompt' },
    ],
    riskFactors: ['Overhead sports', 'Age > 40', 'Repetitive overhead work', 'Fall onto outstretched hand', 'Previous shoulder dislocation'],
    diagnosticTreeRootId: 'slap-q1',
    estimatedRecovery: '3-6 months conservative, 4-6 months post-surgery',
  },
  /* ── Systemic (1) ── */
  {
    id: 'exercise-muscle-cramps',
    name: 'Exercise-Associated Muscle Cramps (EAMC)',
    region: 'systemic',
    aliases: ['muscle cramp', 'charley horse', 'exercise cramp', 'leg cramp'],
    overview: 'Involuntary, painful, spasmodic contraction of skeletal muscle during or immediately after exercise. Multifactorial cause including neuromuscular fatigue, not simply dehydration.',
    redFlags: [
      { symptom: 'Widespread cramping with dark urine', reason: 'Possible rhabdomyolysis', urgency: 'emergency' },
      { symptom: 'Cramping with heat exhaustion symptoms', reason: 'Possible exertional heat illness', urgency: 'emergency' },
    ],
    riskFactors: ['Longer exercise duration', 'Higher intensity', 'Poor conditioning', 'Hot/humid conditions', 'Previous history of cramps', 'Older age'],
    diagnosticTreeRootId: 'eamc-q1',
    estimatedRecovery: 'Minutes to hours (acute), prevention through conditioning',
  },
  /* ── Elbow, Wrist & Hand (5 more) ── */
  {
    id: 'golfers-elbow', name: 'Medial Epicondylalgia (Golfer\'s Elbow)', region: 'elbow-wrist-hand',
    aliases: ['golfer\'s elbow', 'medial epicondylitis', 'thrower\'s elbow'],
    overview: 'Tendinopathy of the common flexor-pronator origin at the medial epicondyle. Pain with gripping, wrist flexion, and pronation. Common in throwing sports and golf.',
    redFlags: [{ symptom: 'Ulnar nerve symptoms (tingling in ring/little finger)', reason: 'Possible ulnar neuropathy', urgency: 'prompt' }],
    riskFactors: ['Throwing sports', 'Golf', 'Climbing', 'Manual occupations', 'Age 35-55'],
    diagnosticTreeRootId: 'ge-q1', estimatedRecovery: '3-6 months with loading program',
  },
  {
    id: 'carpal-tunnel', name: 'Carpal Tunnel Syndrome (CTS)', region: 'elbow-wrist-hand',
    aliases: ['carpal tunnel', 'median nerve compression', 'wrist numbness'],
    overview: 'Compression of the median nerve at the wrist causing numbness, tingling, and weakness in the thumb, index, middle, and radial half of ring finger.',
    redFlags: [{ symptom: 'Thenar muscle wasting (flat base of thumb)', reason: 'Advanced nerve compression requiring surgical opinion', urgency: 'urgent' }],
    riskFactors: ['Repetitive wrist motions', 'Cycling (handlebar pressure)', 'Pregnancy', 'Diabetes', 'Hypothyroidism'],
    diagnosticTreeRootId: 'cts-q1', estimatedRecovery: '6-12 weeks conservative, 3-6 months post-surgery',
  },
  {
    id: 'de-quervain', name: 'De Quervain\'s Tenosynovitis', region: 'elbow-wrist-hand',
    aliases: ['texting thumb', 'washerwoman\'s sprain', 'radial styloid tendinitis'],
    overview: 'Stenosing tenosynovitis of the first dorsal compartment tendons (APL and EPB). Pain at the radial (thumb) side of the wrist, especially with gripping and thumb movements.',
    redFlags: [{ symptom: 'Snapping or triggering of the thumb', reason: 'Possible trigger thumb or intersection syndrome', urgency: 'prompt' }],
    riskFactors: ['Repetitive thumb/wrist use', 'New parents (lifting baby)', 'Racquet sports', 'Female sex', 'Postpartum'],
    diagnosticTreeRootId: 'dq-q1', estimatedRecovery: '4-8 weeks with splinting and activity modification',
  },
  {
    id: 'wrist-sprain', name: 'Wrist Sprain / Scaphoid Fracture', region: 'elbow-wrist-hand',
    aliases: ['wrist sprain', 'FOOSH injury', 'scaphoid fracture', 'fallen on wrist'],
    overview: 'Ligamentous sprain or fracture of the wrist from a fall on outstretched hand (FOOSH). Scaphoid fractures are the most common carpal fracture and can be missed on initial X-ray.',
    redFlags: [
      { symptom: 'Anatomical snuffbox tenderness', reason: 'Scaphoid fracture until proven otherwise — needs imaging', urgency: 'urgent' },
      { symptom: 'Gross deformity or inability to move wrist', reason: 'Possible distal radius fracture', urgency: 'emergency' },
    ],
    riskFactors: ['Contact sports', 'Skateboarding/snowboarding', 'Gymnastics', 'Cycling falls'],
    diagnosticTreeRootId: 'ws-q1', estimatedRecovery: '2-6 weeks (sprain), 6-12 weeks (fracture)',
  },
  {
    id: 'trigger-finger', name: 'Trigger Finger (Stenosing Tenosynovitis)', region: 'elbow-wrist-hand',
    aliases: ['trigger finger', 'trigger thumb', 'snapping finger'],
    overview: 'Stenosing tenosynovitis of the flexor tendon sheath at the A1 pulley. Finger catches or locks in flexion, then releases with a painful snap.',
    redFlags: [{ symptom: 'Finger locked in flexion and unable to be passively extended', reason: 'Locked trigger — may need urgent release', urgency: 'urgent' }],
    riskFactors: ['Repetitive gripping', 'Diabetes', 'Rheumatoid arthritis', 'Age 40-60', 'Female sex'],
    diagnosticTreeRootId: 'tf-q1', estimatedRecovery: '4-12 weeks conservative, 2-4 weeks post-injection',
  },
  /* ── Spine (4 more) ── */
  {
    id: 'non-specific-lbp', name: 'Non-Specific Low Back Pain', region: 'spine',
    aliases: ['low back pain', 'lumbar strain', 'back strain', 'mechanical back pain'],
    overview: 'Back pain without a specific identifiable pathoanatomical source. Accounts for 85-90% of all low back pain presentations. Multifactorial — biopsychosocial approach recommended.',
    redFlags: [
      { symptom: 'Bowel/bladder dysfunction', reason: 'Cauda equina syndrome — emergency', urgency: 'emergency' },
      { symptom: 'Progressive neurological deficit', reason: 'Nerve compression requiring urgent assessment', urgency: 'urgent' },
      { symptom: 'Night pain with unexplained weight loss or fever', reason: 'Possible malignancy or infection', urgency: 'urgent' },
    ],
    riskFactors: ['Sedentary lifestyle', 'Heavy manual work', 'Psychological stress', 'Previous back pain', 'Obesity', 'Smoking'],
    diagnosticTreeRootId: 'nslbp-q1', estimatedRecovery: '2-6 weeks (acute), variable (chronic)',
  },
  {
    id: 'spondylolysis', name: 'Lumbar Spondylolysis / Stress Fracture', region: 'spine',
    aliases: ['pars stress fracture', 'spondylolysis', 'pars defect', 'cricket back'],
    overview: 'Stress fracture of the pars interarticularis, most commonly at L5. Common in sports requiring repetitive lumbar extension and rotation (cricket, gymnastics, diving).',
    redFlags: [{ symptom: 'Progressive neurological symptoms', reason: 'Possible spondylolisthesis with nerve compression', urgency: 'urgent' }],
    riskFactors: ['Adolescent athletes', 'Gymnastics/diving', 'Cricket fast bowling', 'Repetitive extension-rotation', 'Training volume increase'],
    diagnosticTreeRootId: 'spon-q1', estimatedRecovery: '6-12 weeks with activity modification',
  },
  {
    id: 'thoracic-pain', name: 'Thoracic Spine Pain / Costochondritis', region: 'spine',
    aliases: ['upper back pain', 'rib pain', 'costochondritis', 'thoracic pain'],
    overview: 'Pain arising from the thoracic spine, costovertebral joints, or costochondral junctions. Often postural in nature. Costochondritis is inflammation of the rib-cartilage junction.',
    redFlags: [
      { symptom: 'Chest pain with shortness of breath', reason: 'Must exclude cardiac and pulmonary causes', urgency: 'emergency' },
      { symptom: 'Pain radiating around chest wall bilaterally', reason: 'Possible thoracic myelopathy', urgency: 'urgent' },
    ],
    riskFactors: ['Poor posture', 'Desk-based occupation', 'Rowing/kayaking', 'Overhead sports', 'Stress'],
    diagnosticTreeRootId: 'tp-q1', estimatedRecovery: '2-6 weeks with posture correction and mobilization',
  },
  {
    id: 'lumbar-stenosis', name: 'Lumbar Spinal Stenosis', region: 'spine',
    aliases: ['spinal stenosis', 'neurogenic claudication', 'narrow spinal canal'],
    overview: 'Narrowing of the lumbar spinal canal causing neurogenic claudication — leg pain/heaviness with walking that eases with sitting or leaning forward.',
    redFlags: [
      { symptom: 'Bowel/bladder dysfunction', reason: 'Cauda equina syndrome — emergency', urgency: 'emergency' },
      { symptom: 'Rapidly progressive weakness', reason: 'Acute severe compression', urgency: 'emergency' },
    ],
    riskFactors: ['Age > 50', 'Degenerative disc disease', 'Previous spinal surgery', 'Obesity', 'Osteoarthritis'],
    diagnosticTreeRootId: 'ls-q1', estimatedRecovery: '12+ weeks conservative, 3-6 months post-surgery',
  },
  /* ── Hip, Pelvis & Groin (3 more) ── */
  {
    id: 'fai-syndrome', name: 'Femoroacetabular Impingement (FAI)', region: 'hip-pelvis-groin',
    aliases: ['hip impingement', 'FAI', 'cam impingement', 'pincer impingement'],
    overview: 'Abnormal contact between the femoral head and acetabulum during hip motion due to bony morphology (cam, pincer, or mixed). Causes groin/hip pain with deep flexion, pivoting, and prolonged sitting.',
    redFlags: [{ symptom: 'Night pain unresponsive to position change', reason: 'Possible avascular necrosis or tumor', urgency: 'urgent' }],
    riskFactors: ['High-level sports during adolescence', 'Football/soccer', 'Hockey', 'Martial arts', 'Male sex (cam type)'],
    diagnosticTreeRootId: 'fai-q1', estimatedRecovery: '8-16 weeks conservative, 3-6 months post-arthroscopy',
  },
  {
    id: 'hip-labral-tear', name: 'Hip Labral Tear', region: 'hip-pelvis-groin',
    aliases: ['labral tear', 'acetabular labral tear', 'hip clicking'],
    overview: 'Tear of the fibrocartilaginous labrum lining the acetabulum. Causes deep groin pain, clicking, catching, and giving way. Often associated with FAI.',
    redFlags: [{ symptom: 'Acute hip locking (unable to move)', reason: 'Possible loose body — urgent assessment needed', urgency: 'urgent' }],
    riskFactors: ['FAI morphology', 'Pivoting sports', 'Hip dysplasia', 'Repetitive hip flexion', 'Ballet/dance'],
    diagnosticTreeRootId: 'hlt-q1', estimatedRecovery: '8-12 weeks conservative, 3-6 months post-surgery',
  },
  {
    id: 'hip-stress-fracture', name: 'Femoral Neck Stress Fracture', region: 'hip-pelvis-groin',
    aliases: ['hip stress fracture', 'femoral stress fracture', 'stress reaction hip'],
    overview: 'Bone stress injury of the femoral neck caused by repetitive loading beyond bone remodeling capacity. A serious injury — compression side (inferior) is lower risk than tension side (superior).',
    redFlags: [
      { symptom: 'Pain with single-leg hop test', reason: 'High suspicion for stress fracture — imaging urgent', urgency: 'urgent' },
      { symptom: 'Pain at rest or night pain in hip', reason: 'Possible complete fracture risk', urgency: 'urgent' },
    ],
    riskFactors: ['Running sports', 'Female athlete triad/RED-S', 'Sudden training load increase', 'Low BMD', 'Amenorrhea'],
    diagnosticTreeRootId: 'hsf-q1', estimatedRecovery: '6-12 weeks (compression), surgical if tension-side',
  },
  /* ── Lower Leg, Ankle & Foot (4 more) ── */
  {
    id: 'calf-strain', name: 'Calf Muscle Strain', region: 'lower-leg-ankle-foot',
    aliases: ['calf tear', 'gastrocnemius tear', 'tennis leg', 'calf pull'],
    overview: 'Acute strain of the gastrocnemius (most common) or soleus muscle. "Tennis leg" refers to the medial gastrocnemius musculotendinous junction injury. Sudden onset calf pain with push-off.',
    redFlags: [
      { symptom: 'Severe swelling with hardening of the calf', reason: 'Possible compartment syndrome', urgency: 'emergency' },
      { symptom: 'Calf pain with swelling and warmth', reason: 'Must exclude deep vein thrombosis (DVT)', urgency: 'urgent' },
    ],
    riskFactors: ['Age > 30', 'Racquet sports', 'Running sports', 'Inadequate warm-up', 'Previous calf injury'],
    diagnosticTreeRootId: 'cs-q1', estimatedRecovery: '2-6 weeks (Grade I-II), 3+ months (Grade III)',
  },
  {
    id: 'stress-fracture-foot', name: 'Metatarsal Stress Fracture', region: 'lower-leg-ankle-foot',
    aliases: ['stress fracture foot', 'march fracture', 'metatarsal stress reaction'],
    overview: 'Bone stress injury of the metatarsals (2nd and 3rd most common) from repetitive loading. Gradual onset of forefoot pain that worsens with activity and improves with rest.',
    redFlags: [
      { symptom: 'Pain at base of 5th metatarsal (Jones fracture zone)', reason: 'High-risk fracture with poor healing potential', urgency: 'urgent' },
      { symptom: 'Pain not improving after 2 weeks of rest', reason: 'May need imaging to confirm diagnosis', urgency: 'prompt' },
    ],
    riskFactors: ['Sudden training load increase', 'Running sports', 'Female athlete triad/RED-S', 'Inappropriate footwear', 'Low vitamin D'],
    diagnosticTreeRootId: 'sffoot-q1', estimatedRecovery: '6-8 weeks (low-risk), 12+ weeks (5th metatarsal)',
  },
  {
    id: 'peroneal-tendinopathy', name: 'Peroneal Tendinopathy', region: 'lower-leg-ankle-foot',
    aliases: ['peroneal tendonitis', 'lateral ankle tendon pain', 'peroneal tendon subluxation'],
    overview: 'Overuse condition of the peroneal tendons (peroneus longus and brevis) running behind the lateral malleolus. Causes lateral ankle pain, especially with eversion and push-off activities.',
    redFlags: [{ symptom: 'Snapping or popping behind lateral malleolus', reason: 'Possible peroneal tendon subluxation', urgency: 'prompt' }],
    riskFactors: ['Chronic ankle instability', 'High-arched feet (pes cavus)', 'Running on camber/slopes', 'Inadequate rehab post-ankle sprain'],
    diagnosticTreeRootId: 'pt-q1', estimatedRecovery: '6-12 weeks with load modification',
  },
  {
    id: 'ankle-impingement', name: 'Ankle Impingement Syndrome', region: 'lower-leg-ankle-foot',
    aliases: ['anterior ankle impingement', 'footballer\'s ankle', 'posterior ankle impingement'],
    overview: 'Soft tissue or bony impingement at the ankle causing pain at end-range dorsiflexion (anterior) or plantarflexion (posterior). Common in footballers and dancers respectively.',
    redFlags: [{ symptom: 'Acute locking of the ankle', reason: 'Possible loose body — may need surgical removal', urgency: 'prompt' }],
    riskFactors: ['Football/soccer (anterior)', 'Ballet/dance (posterior)', 'Previous ankle sprain', 'Osteophyte formation', 'Repetitive end-range loading'],
    diagnosticTreeRootId: 'ai-q1', estimatedRecovery: '4-12 weeks conservative, 6-12 weeks post-surgery',
  },
  /* ── Knee & Thigh (7 more) ── */
  {
    id: 'meniscal-tear', name: 'Meniscal Tear', region: 'knee-thigh',
    aliases: ['meniscus tear', 'cartilage tear', 'knee cartilage injury'],
    overview: 'Tear of the medial or lateral meniscus, either traumatic (twisting injury) or degenerative (age-related). Causes pain, swelling, catching, and locking of the knee.',
    redFlags: [
      { symptom: 'True knee locking (unable to fully extend)', reason: 'Possible bucket-handle tear requiring surgery', urgency: 'urgent' },
      { symptom: 'Rapid large effusion within 2 hours', reason: 'Possible combined ligament/meniscus injury', urgency: 'urgent' },
    ],
    riskFactors: ['Twisting sports', 'Age > 40 (degenerative)', 'ACL deficiency', 'Deep squatting occupations', 'Previous meniscal injury'],
    diagnosticTreeRootId: 'men-q1', estimatedRecovery: '6-12 weeks conservative, 3-6 months post-surgery',
  },
  {
    id: 'itb-syndrome', name: 'Iliotibial Band Syndrome (ITBS)', region: 'knee-thigh',
    aliases: ['ITB syndrome', 'runner\'s knee (lateral)', 'IT band friction syndrome'],
    overview: 'Lateral knee pain caused by compression of the highly innervated fat pad deep to the ITB at the lateral femoral epicondyle. Most common in runners at ~30° of knee flexion.',
    redFlags: [{ symptom: 'Lateral knee swelling with instability', reason: 'Possible lateral ligament or meniscus injury', urgency: 'prompt' }],
    riskFactors: ['Running (especially downhill)', 'Cycling', 'Sudden training increase', 'Hip abductor weakness', 'Narrow step width'],
    diagnosticTreeRootId: 'itb-q1', estimatedRecovery: '4-8 weeks with load management and hip strengthening',
  },
  {
    id: 'patellar-tendinopathy', name: 'Patellar Tendinopathy (Jumper\'s Knee)', region: 'knee-thigh',
    aliases: ['jumper\'s knee', 'patellar tendonitis', 'patellar tendon pain'],
    overview: 'Overuse tendinopathy of the patellar tendon at the inferior pole of the patella. Common in jumping sports. Characterized by localized anterior knee pain with loading.',
    redFlags: [{ symptom: 'Complete inability to extend knee after jump', reason: 'Possible patellar tendon rupture', urgency: 'emergency' }],
    riskFactors: ['Jumping sports (volleyball, basketball)', 'Training volume increase', 'Quadriceps weakness', 'Stiff lower limb', 'Hard playing surfaces'],
    diagnosticTreeRootId: 'ptend-q1', estimatedRecovery: '3-6 months with progressive loading program',
  },
  {
    id: 'quadriceps-strain', name: 'Quadriceps Strain / Contusion', region: 'knee-thigh',
    aliases: ['quad strain', 'thigh contusion', 'cork thigh', 'charley horse thigh', 'dead leg'],
    overview: 'Acute muscle strain or direct contusion to the quadriceps. Rectus femoris is the most commonly strained quad muscle. Contusions ("dead leg") are common in contact sports.',
    redFlags: [{ symptom: 'Large expanding swelling in thigh', reason: 'Possible compartment syndrome or myositis ossificans', urgency: 'urgent' }],
    riskFactors: ['Sprinting/kicking sports', 'Contact sports (contusion)', 'Previous quad injury', 'Tight hip flexors', 'Inadequate warm-up'],
    diagnosticTreeRootId: 'qs-q1', estimatedRecovery: '2-6 weeks (strain), 3-12 weeks (contusion)',
  },
  {
    id: 'mcl-sprain', name: 'Medial Collateral Ligament (MCL) Sprain', region: 'knee-thigh',
    aliases: ['MCL tear', 'MCL sprain', 'medial knee ligament injury'],
    overview: 'Sprain of the MCL from valgus (inward buckling) force to the knee. Graded I-III. Usually managed conservatively even with complete tears due to the MCL\'s good healing capacity.',
    redFlags: [
      { symptom: 'Combined valgus and rotational instability', reason: 'Possible multi-ligament injury (ACL, MCL, meniscus)', urgency: 'urgent' },
    ],
    riskFactors: ['Contact sports', 'Skiing (snowplow position)', 'Valgus force mechanism', 'Previous MCL injury'],
    diagnosticTreeRootId: 'mcl-q1', estimatedRecovery: '2-4 weeks (Grade I), 4-8 weeks (Grade II), 8-12 weeks (Grade III)',
  },
  {
    id: 'knee-osteoarthritis', name: 'Knee Osteoarthritis', region: 'knee-thigh',
    aliases: ['knee OA', 'degenerative knee', 'wear and tear knee', 'arthritis knee'],
    overview: 'Degenerative joint disease of the knee with loss of articular cartilage, osteophyte formation, and joint inflammation. Exercise is the first-line treatment and is strongly recommended.',
    redFlags: [
      { symptom: 'Hot, red, swollen joint with fever', reason: 'Possible septic arthritis — emergency', urgency: 'emergency' },
      { symptom: 'Rapid onset of severe swelling after minimal injury', reason: 'Possible crystal arthropathy or fracture', urgency: 'urgent' },
    ],
    riskFactors: ['Age > 50', 'Previous knee injury (ACL, meniscus)', 'Obesity', 'Female sex', 'Family history', 'High-impact sports history'],
    diagnosticTreeRootId: 'koa-q1', estimatedRecovery: 'Chronic — managed with exercise and weight management',
  },
  {
    id: 'osgood-schlatter', name: 'Osgood-Schlatter Disease', region: 'knee-thigh',
    aliases: ['Osgood-Schlatter', 'tibial apophysitis', 'growing pains knee', 'knobby knee'],
    overview: 'Traction apophysitis of the tibial tubercle occurring in active adolescents during growth spurts. The patellar tendon pulls on the immature bone causing pain, swelling, and a bony bump.',
    redFlags: [{ symptom: 'Pain in non-typical location or bilateral limb pain with systemic symptoms', reason: 'Consider alternative diagnoses (tumor, infection)', urgency: 'urgent' }],
    riskFactors: ['Age 10-15 years', 'Growth spurt', 'Running/jumping sports', 'Male sex (2:1)', 'High training volume for age'],
    diagnosticTreeRootId: 'os-q1', estimatedRecovery: 'Self-limiting with skeletal maturity (12-24 months), manageable with load modification',
  },

  /* ═══════════════════════════════════════════════════════════════
     TIER 1 EXPANSION — 20 Additional Sports-Relevant Injuries
     ═══════════════════════════════════════════════════════════════ */

  /* ── Head & Neck ── */
  {
    id: 'stingers-burners', name: 'Stingers & Burners (Brachial Plexus Injury)', region: 'head-neck',
    aliases: ['stinger', 'burner', 'brachial plexus injury', 'dead arm', 'nerve pinch neck'],
    overview: 'Transient brachial plexus neurapraxia caused by lateral flexion of the neck or depression of the shoulder, producing an electric shock or burning sensation down the arm. Extremely common in contact sports (football, rugby, wrestling).',
    redFlags: [
      { symptom: 'Bilateral arm symptoms', reason: 'Possible spinal cord injury — immobilize', urgency: 'emergency' },
      { symptom: 'Symptoms lasting > 24 hours or recurrent episodes', reason: 'Possible structural nerve injury', urgency: 'urgent' },
      { symptom: 'Weakness persisting > 2 weeks', reason: 'Possible axonotmesis requiring EMG', urgency: 'urgent' },
    ],
    riskFactors: ['Contact sports (football, rugby, wrestling)', 'Narrow spinal canal', 'Previous stinger', 'Poor neck conditioning', 'Tackle technique errors'],
    diagnosticTreeRootId: 'sb-q1', estimatedRecovery: 'Minutes to days (neurapraxia), weeks if axonal injury',
  },

  /* ── Shoulder ── */
  {
    id: 'swimmers-shoulder', name: 'Swimmer\'s Shoulder (Supraspinatus Tendinopathy)', region: 'shoulder',
    aliases: ['swimmer\'s shoulder', 'supraspinatus tendinopathy', 'shoulder impingement swimming', 'overhead athlete shoulder'],
    overview: 'Overuse injury of the supraspinatus and rotator cuff tendons from repetitive overhead motion, particularly swimming. The subtype of rotator cuff tendinopathy most relevant to overhead athletes.',
    redFlags: [
      { symptom: 'Sudden loss of ability to raise arm', reason: 'Possible acute rotator cuff tear', urgency: 'urgent' },
      { symptom: 'Night pain not responding to activity modification', reason: 'Consider calcific tendinitis or other pathology', urgency: 'prompt' },
    ],
    riskFactors: ['High-volume overhead training', 'Poor scapular control', 'Thoracic kyphosis', 'Training errors (volume spikes)', 'Shoulder hypermobility'],
    diagnosticTreeRootId: 'swsh-q1', estimatedRecovery: '6-12 weeks with load modification and rehab',
  },
  {
    id: 'shoulder-bursitis', name: 'Subacromial Bursitis', region: 'shoulder',
    aliases: ['shoulder bursitis', 'subacromial bursitis', 'shoulder impingement', 'bursitis shoulder'],
    overview: 'Inflammation of the subacromial bursa, often coexisting with rotator cuff tendinopathy. Produces a painful arc between 60-120° of arm elevation. May occur acutely (direct blow) or chronically (repetitive overhead use).',
    redFlags: [
      { symptom: 'Hot, red, swollen shoulder with fever', reason: 'Possible septic bursitis', urgency: 'emergency' },
    ],
    riskFactors: ['Overhead sports', 'Repetitive overhead work', 'Rotator cuff weakness', 'Poor posture', 'Acromial morphology'],
    diagnosticTreeRootId: 'sbur-q1', estimatedRecovery: '4-8 weeks with activity modification',
  },
  {
    id: 'biceps-tendinopathy', name: 'Biceps Tendinopathy / Tendinitis', region: 'shoulder',
    aliases: ['biceps tendinitis', 'biceps tendinopathy', 'long head biceps pain', 'front of shoulder pain'],
    overview: 'Pain and tenderness over the long head of biceps tendon in the bicipital groove (front of shoulder). Common in overhead and throwing athletes. Often coexists with rotator cuff pathology.',
    redFlags: [
      { symptom: 'Sudden pop with visible bulge in upper arm ("Popeye sign")', reason: 'Biceps tendon rupture', urgency: 'urgent' },
    ],
    riskFactors: ['Overhead sports', 'Throwing athletes', 'Age > 40', 'Coexisting rotator cuff pathology', 'Weightlifting'],
    diagnosticTreeRootId: 'bt-q1', estimatedRecovery: '6-12 weeks with load management',
  },

  /* ── Elbow/Wrist/Hand ── */
  {
    id: 'olecranon-bursitis', name: 'Olecranon Bursitis', region: 'elbow-wrist-hand',
    aliases: ['elbow bursitis', 'student\'s elbow', 'miner\'s elbow', 'swollen elbow'],
    overview: 'Swelling of the bursa overlying the olecranon (point of the elbow). Can be traumatic (direct blow, fall) or friction-related (repetitive leaning on elbows). Usually painless unless infected.',
    redFlags: [
      { symptom: 'Red, hot, painful swelling with fever', reason: 'Septic bursitis — requires antibiotics', urgency: 'urgent' },
      { symptom: 'Open wound over the bursa', reason: 'Risk of secondary infection', urgency: 'urgent' },
    ],
    riskFactors: ['Contact sports (MMA, wrestling, football)', 'Direct elbow trauma', 'Repetitive elbow leaning', 'Gout', 'Immunosuppression'],
    diagnosticTreeRootId: 'ob-q1', estimatedRecovery: '2-6 weeks (traumatic), longer if chronic',
  },
  {
    id: 'ucl-sprain', name: 'Ulnar Collateral Ligament (UCL) Sprain', region: 'elbow-wrist-hand',
    aliases: ['Tommy John injury', 'UCL tear', 'medial elbow ligament', 'throwing elbow injury'],
    overview: 'Sprain or tear of the ulnar collateral ligament of the elbow, most commonly from repetitive valgus stress during overhead throwing. The classic "Tommy John" injury in baseball pitchers.',
    redFlags: [
      { symptom: 'Complete loss of throwing ability', reason: 'Possible complete UCL tear', urgency: 'urgent' },
      { symptom: 'Ulnar nerve symptoms (tingling in ring/little finger)', reason: 'Ulnar nerve involvement', urgency: 'prompt' },
    ],
    riskFactors: ['Overhead throwing sports (baseball, javelin, cricket)', 'High pitch counts', 'Youth throwing without rest', 'Poor mechanics', 'Fatigue'],
    diagnosticTreeRootId: 'ucl-q1', estimatedRecovery: '3-6 months (conservative), 12-18 months (surgical/Tommy John)',
  },

  /* ── Spine ── */
  {
    id: 'sij-pain', name: 'Sacroiliac Joint (SIJ) Pain', region: 'spine',
    aliases: ['SI joint pain', 'sacroiliac dysfunction', 'SIJ pain', 'posterior pelvic pain'],
    overview: 'Pain arising from the sacroiliac joint, typically felt in the buttock/posterior pelvis and sometimes referring into the posterior thigh. Common in runners and athletes with asymmetric loading patterns.',
    redFlags: [
      { symptom: 'Bilateral buttock pain with morning stiffness > 30 minutes improving with exercise', reason: 'Possible inflammatory arthritis (ankylosing spondylitis)', urgency: 'urgent' },
      { symptom: 'Night pain with weight loss', reason: 'Screen for systemic pathology', urgency: 'urgent' },
    ],
    riskFactors: ['Running', 'Asymmetric loading sports', 'Leg length discrepancy', 'Pregnancy/postpartum', 'Previous lumbar fusion'],
    diagnosticTreeRootId: 'sij-q1', estimatedRecovery: '4-8 weeks with stabilization exercises',
  },
  {
    id: 'rib-stress-injury', name: 'Rib Stress Injury / Stress Fracture', region: 'spine',
    aliases: ['rib stress fracture', 'rib stress reaction', 'rowing rib injury', 'side chest pain athlete'],
    overview: 'Stress fracture or stress reaction of a rib, most common in rowing (posterolateral ribs 4-8) and cricket fast bowling. Also seen in golf, tennis, and other sports with repetitive trunk rotation.',
    redFlags: [
      { symptom: 'Shortness of breath or chest tightness', reason: 'Possible pneumothorax (rare)', urgency: 'emergency' },
      { symptom: 'Pain with breathing not improving', reason: 'Rule out pleural or pulmonary pathology', urgency: 'urgent' },
    ],
    riskFactors: ['Rowing (most common sport)', 'Cricket fast bowling', 'Sudden training volume increase', 'Low energy availability/RED-S', 'Female sex'],
    diagnosticTreeRootId: 'rib-q1', estimatedRecovery: '4-6 weeks activity modification',
  },

  /* ── Hip/Pelvis/Groin ── */
  {
    id: 'hip-osteoarthritis', name: 'Hip Osteoarthritis', region: 'hip-pelvis-groin',
    aliases: ['hip OA', 'hip arthritis', 'degenerative hip', 'hip joint wear'],
    overview: 'Degenerative joint disease of the hip. Presents with groin pain, reduced ROM (especially internal rotation), and stiffness. Exercise is the FIRST-LINE treatment — more effective than any medication.',
    redFlags: [
      { symptom: 'Night pain with weight loss/fever', reason: 'Screen for malignancy or infection', urgency: 'urgent' },
      { symptom: 'Sudden severe groin pain with inability to weight bear', reason: 'Possible fracture or avascular necrosis', urgency: 'emergency' },
    ],
    riskFactors: ['Age > 50', 'Previous hip injury', 'Obesity', 'High-impact sport history', 'FAI (can lead to OA)', 'Family history'],
    diagnosticTreeRootId: 'hoa-q1', estimatedRecovery: 'Chronic — ongoing exercise-based management',
  },

  /* ── Knee & Thigh ── */
  {
    id: 'patellar-instability', name: 'Patellar Instability / Dislocation', region: 'knee-thigh',
    aliases: ['kneecap dislocation', 'patellar dislocation', 'patella subluxation', 'kneecap popped out'],
    overview: 'Lateral displacement of the patella from the trochlear groove, either complete dislocation or subluxation. Causes sudden giving way, swelling, and anterior knee pain. Recurrence rate is high in young patients.',
    redFlags: [
      { symptom: 'Knee locked in bent position', reason: 'Possible osteochondral fragment blocking extension', urgency: 'urgent' },
      { symptom: 'Grossly deformed kneecap that won\'t reduce', reason: 'Requires emergency reduction', urgency: 'emergency' },
    ],
    riskFactors: ['Trochlear dysplasia', 'Female sex', 'Age 10-20', 'Ligamentous laxity', 'Previous patellar dislocation', 'Valgus alignment'],
    diagnosticTreeRootId: 'pi-q1', estimatedRecovery: '6-12 weeks (first dislocation), longer if recurrent',
  },
  {
    id: 'pcl-injury', name: 'Posterior Cruciate Ligament (PCL) Injury', region: 'knee-thigh',
    aliases: ['PCL tear', 'PCL sprain', 'dashboard injury', 'posterior knee injury'],
    overview: 'Injury to the posterior cruciate ligament, most commonly from a direct blow to the anterior tibia (e.g., dashboard in car crash, falling on bent knee in sport, or hyperflexion). Less common than ACL tears.',
    redFlags: [
      { symptom: 'Combined ligament injury with gross instability', reason: 'Possible knee dislocation — vascular assessment needed', urgency: 'emergency' },
    ],
    riskFactors: ['Contact sports (rugby, football)', 'Motor vehicle accidents', 'Falling onto a flexed knee', 'Combined valgus/varus force with posterior translation'],
    diagnosticTreeRootId: 'pcl-q1', estimatedRecovery: 'Grade I-II: 6-12 weeks conservative. Grade III: 3-6 months, may require surgery',
  },
  {
    id: 'lcl-sprain', name: 'Lateral Collateral Ligament (LCL) Sprain', region: 'knee-thigh',
    aliases: ['LCL injury', 'lateral knee ligament', 'fibular collateral ligament', 'varus injury knee'],
    overview: 'Sprain of the lateral collateral ligament from a varus (inward) force to the knee. Less common than MCL injuries because the opposite leg typically protects from direct varus blows.',
    redFlags: [
      { symptom: 'Combined instability with peroneal nerve symptoms (foot drop)', reason: 'Posterolateral corner injury with nerve involvement', urgency: 'emergency' },
    ],
    riskFactors: ['Contact sports', 'Varus mechanism (force from inside of knee)', 'Combined rotational injury'],
    diagnosticTreeRootId: 'lcl-q1', estimatedRecovery: '4-12 weeks depending on grade',
  },
  {
    id: 'hoffas-fat-pad', name: 'Hoffa\'s Fat Pad Impingement', region: 'knee-thigh',
    aliases: ['Hoffa\'s syndrome', 'infrapatellar fat pad impingement', 'fat pad pinching knee'],
    overview: 'Impingement and inflammation of the infrapatellar fat pad (Hoffa\'s fat pad). Causes anterior knee pain just below the kneecap that is often confused with patellar tendinopathy. Pain worsens with full knee extension.',
    redFlags: [
      { symptom: 'Knee locking with inability to extend', reason: 'Consider meniscal or intra-articular pathology', urgency: 'prompt' },
    ],
    riskFactors: ['Knee hyperextension tendency', 'Previous knee surgery', 'Anterior knee trauma', 'Prolonged standing'],
    diagnosticTreeRootId: 'hfp-q1', estimatedRecovery: '4-8 weeks with activity modification',
  },

  /* ── Lower Leg/Ankle/Foot ── */
  {
    id: 'exertional-compartment', name: 'Chronic Exertional Compartment Syndrome (CECS)', region: 'lower-leg-ankle-foot',
    aliases: ['compartment syndrome exercise', 'exertional compartment syndrome', 'tight calves running', 'leg pressure exercise'],
    overview: 'Increased pressure within a closed muscle compartment during exercise, causing pain that starts at a predictable point during activity and resolves with rest. Most common in the anterior compartment of the lower leg.',
    redFlags: [
      { symptom: 'Pain NOT resolving within 30 minutes of stopping exercise', reason: 'Possible acute compartment syndrome — EMERGENCY', urgency: 'emergency' },
      { symptom: 'Foot drop or numbness during exercise', reason: 'Severe compartment pressure with nerve compromise', urgency: 'urgent' },
    ],
    riskFactors: ['Running', 'Military personnel', 'Age 20-30', 'Bilateral symptoms (common)', 'High training volume'],
    diagnosticTreeRootId: 'cecs-q1', estimatedRecovery: 'Conservative: ongoing management. Surgical fasciotomy: 6-12 weeks recovery',
  },
  {
    id: 'chronic-ankle-instability', name: 'Chronic Ankle Instability (CAI)', region: 'lower-leg-ankle-foot',
    aliases: ['chronic ankle instability', 'recurrent ankle sprains', 'ankle giving way', 'weak ankles'],
    overview: 'Persistent feeling of ankle "giving way" or recurrent sprains occurring > 12 months after an initial ankle sprain. Affects up to 40% of people after a lateral ankle sprain. Due to mechanical laxity AND neuromuscular deficits.',
    redFlags: [
      { symptom: 'Ankle locking or catching', reason: 'Possible osteochondral lesion or loose body', urgency: 'prompt' },
    ],
    riskFactors: ['Previous ankle sprain (strongest risk factor)', 'Poor rehabilitation of initial sprain', 'Poor proprioception', 'High-risk sports', 'Generalized joint laxity'],
    diagnosticTreeRootId: 'cai-q1', estimatedRecovery: '8-12 weeks structured rehabilitation',
  },
  {
    id: 'achilles-rupture', name: 'Achilles Tendon Rupture', region: 'lower-leg-ankle-foot',
    aliases: ['ruptured Achilles', 'Achilles tear', 'snapped Achilles', 'popped calf'],
    overview: 'Complete tear of the Achilles tendon, typically occurring 2-6 cm above the calcaneal insertion. Classically felt as being "kicked in the back of the leg." Most common in recreational athletes aged 30-50.',
    redFlags: [
      { symptom: 'Palpable gap in the Achilles tendon', reason: 'Confirmed rupture — urgent assessment', urgency: 'urgent' },
      { symptom: 'Unable to perform single-leg heel raise AT ALL', reason: 'Loss of plantarflexion power = likely complete tear', urgency: 'urgent' },
    ],
    riskFactors: ['Age 30-50', 'Male sex (6:1)', 'Recreational/"weekend warrior" athlete', 'Previous Achilles tendinopathy', 'Fluoroquinolone antibiotics', 'Steroid injections to Achilles'],
    diagnosticTreeRootId: 'ar-q1', estimatedRecovery: 'Surgical: 6-9 months. Conservative: 9-12 months',
  },
  {
    id: 'tibial-stress-fracture', name: 'Tibial Stress Fracture', region: 'lower-leg-ankle-foot',
    aliases: ['shin stress fracture', 'tibial stress reaction', 'tibial BSI', 'shin bone stress fracture'],
    overview: 'Bone stress injury of the tibia, the most common stress fracture in athletes. Presents as localized shin pain that worsens with weight-bearing activity. Important differential diagnosis for MTSS (shin splints).',
    redFlags: [
      { symptom: 'Pain on the anterior (tension) side of the tibia', reason: 'HIGH-RISK stress fracture site — may require surgical fixation', urgency: 'urgent' },
      { symptom: 'Night pain or pain at rest', reason: 'Advanced stress fracture or other pathology', urgency: 'urgent' },
    ],
    riskFactors: ['Running (especially distance)', 'Rapid training volume increase', 'Female sex', 'Low energy availability/RED-S', 'Low calcium/vitamin D', 'Previous stress fracture'],
    diagnosticTreeRootId: 'tsf-q1', estimatedRecovery: 'Low-risk (posteromedial): 6-8 weeks. High-risk (anterior): 12-20 weeks',
  },

  /* ── Systemic ── */
  {
    id: 'overtraining-syndrome', name: 'Overtraining Syndrome (OTS)', region: 'systemic',
    aliases: ['overtraining', 'burnout', 'unexplained underperformance', 'chronic fatigue athlete', 'overreaching'],
    overview: 'A maladaptation to excessive exercise without adequate recovery, resulting in persistent underperformance (> 2 months), fatigue, mood disturbance, and neuroendocrine changes. Diagnosis of exclusion.',
    redFlags: [
      { symptom: 'Persistent low mood, withdrawal, or loss of motivation', reason: 'Screen for clinical depression', urgency: 'prompt' },
      { symptom: 'Recurrent infections or illness', reason: 'Possible immunosuppression or underlying condition', urgency: 'prompt' },
    ],
    riskFactors: ['Monotonous high-volume training', 'Insufficient recovery', 'Poor nutrition/low energy availability', 'High psychological stress', 'Competition overload'],
    diagnosticTreeRootId: 'ots-q1', estimatedRecovery: 'Weeks to months of structured recovery. Prevention is key.',
  },
  {
    id: 'doms', name: 'Delayed Onset Muscle Soreness (DOMS)', region: 'systemic',
    aliases: ['DOMS', 'muscle soreness after exercise', 'next-day soreness', 'exercise soreness'],
    overview: 'Normal physiological response to unaccustomed or eccentric exercise, causing muscle pain and stiffness peaking 24-72 hours after activity. NOT an injury — a normal adaptive process.',
    redFlags: [
      { symptom: 'Dark brown/cola-colored urine after exercise', reason: 'Possible rhabdomyolysis — EMERGENCY', urgency: 'emergency' },
      { symptom: 'Extreme swelling with severe pain out of proportion', reason: 'Possible compartment syndrome or rhabdomyolysis', urgency: 'emergency' },
    ],
    riskFactors: ['Unaccustomed exercise', 'Eccentric-heavy exercise (downhill running, negatives)', 'Returning after a break', 'High-volume resistance training'],
    diagnosticTreeRootId: 'doms-q1', estimatedRecovery: '2-5 days (self-resolving). Not an injury.',
  },

  /* ═══════════════════════════════════════════════════════════════
     TIER 2 EXPANSION — 20 Additional Knowledgebase Injuries
     ═══════════════════════════════════════════════════════════════ */

  /* ── Head & Neck ── */
  {
    id: 'cervical-sprain', name: 'Cervical Sprain / Strain (Non-Disc)', region: 'head-neck',
    aliases: ['neck strain', 'neck sprain', 'muscle spasm neck', 'stiff neck sport', 'cervical sprain'],
    overview: 'Acute injury to the cervical spine muscles, ligaments, or facet joints from sudden force or poor positioning during sport. Distinguished from disc pathology and WAD by absence of neurological signs and typically rapid recovery.',
    redFlags: [
      { symptom: 'Numbness, tingling, or weakness in arms/hands', reason: 'Possible nerve root or cord involvement', urgency: 'urgent' },
      { symptom: 'Bilateral arm symptoms after impact', reason: 'Possible spinal cord injury', urgency: 'emergency' },
    ],
    riskFactors: ['Contact sports', 'Poor neck conditioning', 'Heading in football', 'Rugby scrummaging', 'Poor pillow/sleeping posture'],
    diagnosticTreeRootId: 'csp-q1', estimatedRecovery: '1-4 weeks with activity modification',
  },

  /* ── Spine ── */
  {
    id: 'lumbar-muscle-strain', name: 'Symptomatic Lumbar Muscle Strain (Non-Disc)', region: 'spine',
    aliases: ['pulled back muscle', 'lower back strain', 'back spasm', 'acute back strain', 'lumbar strain sport'],
    overview: 'Acute strain of the lumbar paraspinal muscles or thoracolumbar fascia, typically from sudden loading, lifting, or rotational force. Distinguished from disc pathology by absence of radiculopathy.',
    redFlags: [
      { symptom: 'Radiating leg pain below the knee', reason: 'Possible disc herniation with radiculopathy', urgency: 'urgent' },
      { symptom: 'Loss of bladder/bowel control', reason: 'Possible cauda equina syndrome', urgency: 'emergency' },
    ],
    riskFactors: ['Inadequate warm-up', 'Heavy lifting', 'Rotational sports (golf, rowing)', 'Deconditioning', 'Previous back injury'],
    diagnosticTreeRootId: 'lms-q1', estimatedRecovery: '2-6 weeks; stay active for best recovery',
  },

  /* ── Shoulder ── */
  {
    id: 'scapular-dyskinesis', name: 'Scapular Dyskinesis–Related Overuse Pain', region: 'shoulder',
    aliases: ['scapular dyskinesis', 'winging scapula', 'shoulder blade pain', 'scapular dysfunction'],
    overview: 'Altered scapular position and movement causing or contributing to shoulder pain. The scapula fails to retract, posteriorly tilt, or upwardly rotate properly during arm elevation, leading to secondary impingement or rotator cuff overload.',
    redFlags: [
      { symptom: 'Marked scapular winging with weakness', reason: 'Possible long thoracic nerve palsy', urgency: 'urgent' },
    ],
    riskFactors: ['Overhead athletes', 'Thoracic kyphosis', 'Poor posture', 'Serratus anterior or lower trapezius weakness', 'Previous shoulder injury'],
    diagnosticTreeRootId: 'sd-q1', estimatedRecovery: '6-12 weeks of targeted scapular rehabilitation',
  },

  /* ── Elbow/Wrist/Hand ── */
  {
    id: 'capitellar-ocd', name: 'Capitellar Osteochondritis Dissecans (OCD)', region: 'elbow-wrist-hand',
    aliases: ['OCD elbow', 'capitellar OCD', 'elbow osteochondral lesion', 'Little Leaguer elbow'],
    overview: 'Osteochondral lesion of the capitellum (lateral elbow) from repetitive compressive and valgus forces during throwing or gymnastics. Most common in adolescents. Can progress to loose bodies if not managed.',
    redFlags: [
      { symptom: 'Elbow locking or catching', reason: 'Possible loose body — may need surgical removal', urgency: 'urgent' },
      { symptom: 'Progressive loss of elbow extension', reason: 'Advancing lesion', urgency: 'prompt' },
    ],
    riskFactors: ['Age 12-16', 'Throwing sports (baseball)', 'Gymnastics', 'High training volume in youth'],
    diagnosticTreeRootId: 'cocd-q1', estimatedRecovery: '3-6 months rest from throwing; surgery if loose body',
  },
  {
    id: 'skiers-thumb', name: 'Thumb UCL Injury (Skier\'s / Gamekeeper\'s Thumb)', region: 'elbow-wrist-hand',
    aliases: ['skier\'s thumb', 'gamekeeper\'s thumb', 'thumb UCL', 'thumb ligament tear', 'MCP joint sprain thumb'],
    overview: 'Sprain or rupture of the ulnar collateral ligament of the thumb MCP joint. Acute injury (skier\'s thumb) from a forced abduction mechanism — typically falling on an outstretched hand with a ski pole. Stener lesion (interposed adductor aponeurosis) prevents healing of complete tears.',
    redFlags: [
      { symptom: 'Complete instability with no endpoint on valgus stress', reason: 'Complete UCL tear — likely needs surgery (Stener lesion)', urgency: 'urgent' },
    ],
    riskFactors: ['Skiing (pole strap)', 'Ball-handling sports', 'Falls on outstretched hand', 'Contact sports'],
    diagnosticTreeRootId: 'skt-q1', estimatedRecovery: 'Partial: 4-6 weeks splint. Complete: surgical repair',
  },
  {
    id: 'mallet-finger', name: 'Mallet Finger', region: 'elbow-wrist-hand',
    aliases: ['mallet finger', 'baseball finger', 'dropped finger', 'extensor tendon avulsion finger'],
    overview: 'Rupture of the terminal extensor tendon (or bony avulsion from the distal phalanx), causing inability to actively extend the DIP joint. Classic mechanism: ball striking the fingertip.',
    redFlags: [
      { symptom: 'Large bony fragment on X-ray (>30% articular surface)', reason: 'May require surgical fixation', urgency: 'prompt' },
    ],
    riskFactors: ['Ball sports (cricket, baseball, basketball, football)', 'Direct blow to fingertip'],
    diagnosticTreeRootId: 'mf-q1', estimatedRecovery: '6-8 weeks continuous splinting (MUST be continuous)',
  },
  {
    id: 'hand-fracture', name: 'Phalangeal / Metacarpal Fracture & PIP Dislocation', region: 'elbow-wrist-hand',
    aliases: ['boxer\'s fracture', 'finger fracture', 'metacarpal fracture', 'PIP dislocation', 'jammed finger'],
    overview: 'Fractures of the finger bones (phalanges) or hand bones (metacarpals), and dislocations of the PIP joint. Common in ball-handling and contact sports. 5th metacarpal neck fracture ("boxer\'s fracture") is the most common.',
    redFlags: [
      { symptom: 'Rotational deformity (finger crosses over neighbor when making fist)', reason: 'Malrotation — likely needs surgical correction', urgency: 'urgent' },
      { symptom: 'Open fracture (bone visible)', reason: 'Surgical emergency', urgency: 'emergency' },
    ],
    riskFactors: ['Contact sports', 'Ball sports', 'Martial arts', 'Punching'],
    diagnosticTreeRootId: 'hf-q1', estimatedRecovery: '4-6 weeks (buddy taping/splint). Surgery if displaced/rotated.',
  },

  /* ── Hip/Pelvis/Groin ── */
  {
    id: 'gtps', name: 'Greater Trochanteric Pain Syndrome (GTPS)', region: 'hip-pelvis-groin',
    aliases: ['trochanteric bursitis', 'hip bursitis', 'lateral hip pain', 'GTPS'],
    overview: 'Lateral hip pain over the greater trochanter. Now understood as primarily a gluteal tendinopathy (not bursitis). Most common in middle-aged women and runners. Hallmark: pain lying on the affected side.',
    redFlags: [
      { symptom: 'Night pain with weight loss/fever', reason: 'Screen for systemic pathology', urgency: 'urgent' },
    ],
    riskFactors: ['Female sex', 'Age 40-60', 'Running', 'ITB tightness', 'Weak hip abductors', 'Rapid increase in walking/running'],
    diagnosticTreeRootId: 'gtps-q1', estimatedRecovery: '8-12 weeks with progressive loading rehab',
  },
  {
    id: 'snapping-hip', name: 'Snapping Hip Syndrome', region: 'hip-pelvis-groin',
    aliases: ['snapping hip', 'dancer\'s hip', 'clicking hip', 'coxa saltans'],
    overview: 'Audible or palpable snapping around the hip during movement. External type: ITB over greater trochanter. Internal type: iliopsoas tendon over iliopectineal eminence. Usually painless initially but can become symptomatic.',
    redFlags: [
      { symptom: 'Painful locking or catching in the hip', reason: 'Possible labral tear or loose body', urgency: 'prompt' },
    ],
    riskFactors: ['Dancers', 'Runners', 'Gymnasts', 'Tight ITB or hip flexors', 'Young athletes'],
    diagnosticTreeRootId: 'shp-q1', estimatedRecovery: '4-8 weeks with stretching and strengthening',
  },
  {
    id: 'piriformis-syndrome', name: 'Piriformis Syndrome', region: 'hip-pelvis-groin',
    aliases: ['piriformis syndrome', 'deep buttock pain', 'sciatic nerve entrapment', 'piriformis impingement'],
    overview: 'Compression or irritation of the sciatic nerve by the piriformis muscle deep in the buttock. Causes buttock pain with possible sciatic-type symptoms. Diagnosis of exclusion — rule out lumbar disc pathology first.',
    redFlags: [
      { symptom: 'Progressive neurological deficit in the leg', reason: 'Consider lumbar disc pathology', urgency: 'urgent' },
      { symptom: 'Bilateral symptoms', reason: 'Unlikely piriformis — investigate spine', urgency: 'urgent' },
    ],
    riskFactors: ['Running', 'Prolonged sitting', 'Anatomical variant (sciatic nerve through piriformis)', 'Hip external rotation overuse'],
    diagnosticTreeRootId: 'pir-q1', estimatedRecovery: '4-8 weeks with stretching and activity modification',
  },
  {
    id: 'apophyseal-avulsion', name: 'Apophyseal Avulsion Injury (Pelvis/Hip)', region: 'hip-pelvis-groin',
    aliases: ['apophyseal avulsion', 'pelvic avulsion fracture', 'ASIS avulsion', 'ischial tuberosity avulsion', 'hip apophysitis'],
    overview: 'Avulsion of a pelvic apophysis at the muscle-bone junction in skeletally immature athletes. Sites: ASIS (sartorius), AIIS (rectus femoris), ischial tuberosity (hamstrings), iliac crest (abdominals). Occurs during explosive sprinting, kicking, or jumping.',
    redFlags: [
      { symptom: 'Large bony fragment displacement (> 2 cm on X-ray)', reason: 'May require surgical fixation', urgency: 'urgent' },
      { symptom: 'Inability to weight-bear after a pop during sprinting', reason: 'Possible significant avulsion', urgency: 'urgent' },
    ],
    riskFactors: ['Age 14-18 (open apophyses)', 'Sprinting/kicking sports', 'Explosive movements', 'Inadequate warm-up'],
    diagnosticTreeRootId: 'aa-q1', estimatedRecovery: '6-12 weeks rest; surgery if displaced >2cm',
  },
  {
    id: 'hip-pointer', name: 'Hip Pointer (Iliac Crest Contusion)', region: 'hip-pelvis-groin',
    aliases: ['hip pointer', 'iliac crest contusion', 'hip bruise', 'pelvic contusion'],
    overview: 'Direct contusion to the iliac crest, typically from a fall, collision, or direct blow. Causes significant pain and bruising over the hip bone. Common in contact sports (football, rugby, hockey).',
    redFlags: [
      { symptom: 'Intra-abdominal symptoms (nausea, referred flank pain)', reason: 'Possible kidney or internal organ injury from mechanism', urgency: 'urgent' },
    ],
    riskFactors: ['Contact sports', 'Lack of hip padding', 'Falls on hard surfaces'],
    diagnosticTreeRootId: 'hp-q1', estimatedRecovery: '1-4 weeks with protection and progressive return',
  },

  /* ── Knee ── */
  {
    id: 'pes-anserine', name: 'Pes Anserine Bursitis / Tendinopathy', region: 'knee-thigh',
    aliases: ['pes anserine bursitis', 'pes anserinus', 'inner knee pain below joint', 'medial knee bursitis'],
    overview: 'Pain and tenderness over the pes anserine insertion on the anteromedial tibia, approximately 5cm below the joint line. Where the sartorius, gracilis, and semitendinosus tendons converge.',
    redFlags: [
      { symptom: 'Fever with knee swelling', reason: 'Possible septic bursitis or joint infection', urgency: 'urgent' },
    ],
    riskFactors: ['Obesity', 'Knee OA', 'Running', 'Pes planus (flat feet)', 'Valgus knee alignment', 'Middle-aged women'],
    diagnosticTreeRootId: 'pa-q1', estimatedRecovery: '4-8 weeks with load management and strengthening',
  },
  {
    id: 'prepatellar-bursitis', name: 'Prepatellar Bursitis (Housemaid\'s Knee)', region: 'knee-thigh',
    aliases: ['prepatellar bursitis', 'housemaid\'s knee', 'carpet layer\'s knee', 'kneeling bursitis'],
    overview: 'Swelling of the bursa overlying the front of the kneecap (patella). Usually from direct trauma or repetitive kneeling. Distinct from intra-articular knee effusion (the swelling is superficial to the patella, not inside the joint).',
    redFlags: [
      { symptom: 'Red, hot, painful swelling with fever', reason: 'Septic bursitis — requires antibiotics', urgency: 'urgent' },
    ],
    riskFactors: ['Contact sports (wrestling)', 'Kneeling occupations', 'Direct knee trauma', 'Previous prepatellar bursitis'],
    diagnosticTreeRootId: 'ppb-q1', estimatedRecovery: '2-6 weeks with protection',
  },
  {
    id: 'plica-syndrome', name: 'Plica Syndrome (Medial Plica Irritation)', region: 'knee-thigh',
    aliases: ['plica syndrome', 'medial plica', 'synovial plica', 'knee snapping band'],
    overview: 'Irritation of a thickened medial plica (synovial fold) in the knee, causing a snapping sensation and anteromedial knee pain. The plica catches between the patella and femoral condyle during flexion-extension.',
    redFlags: [
      { symptom: 'Knee locking', reason: 'Consider meniscal tear as differential', urgency: 'prompt' },
    ],
    riskFactors: ['Overuse', 'Direct knee trauma', 'Repetitive flexion-extension', 'Running', 'Cycling'],
    diagnosticTreeRootId: 'plic-q1', estimatedRecovery: '4-8 weeks with activity modification; surgery if refractory',
  },

  /* ── Lower Leg/Ankle/Foot ── */
  {
    id: 'turf-toe', name: 'Turf Toe (1st MTP Sprain)', region: 'lower-leg-ankle-foot',
    aliases: ['turf toe', 'big toe sprain', 'MTP sprain', 'first MTP hyperextension'],
    overview: 'Sprain of the plantar plate and capsule of the first metatarsophalangeal (MTP) joint from forced dorsiflexion of the big toe. Named for its association with artificial turf. Can be debilitating if severe.',
    redFlags: [
      { symptom: 'Complete inability to push off the big toe', reason: 'Possible Grade III tear — may need surgical assessment', urgency: 'urgent' },
    ],
    riskFactors: ['Artificial turf', 'Flexible footwear', 'Football/soccer', 'Sprinting sports', 'Previous turf toe'],
    diagnosticTreeRootId: 'tt-q1', estimatedRecovery: 'Grade I: 1-2 weeks. Grade II: 2-4 weeks. Grade III: 6-12 weeks',
  },
  {
    id: 'lisfranc-injury', name: 'Lisfranc (Midfoot) Injury', region: 'lower-leg-ankle-foot',
    aliases: ['Lisfranc injury', 'midfoot sprain', 'tarsometatarsal injury', 'midfoot fracture dislocation'],
    overview: 'Injury to the tarsometatarsal (Lisfranc) joint complex — often missed and misdiagnosed as a "midfoot sprain." Ranges from subtle ligamentous injury to fracture-dislocation. Missed diagnosis leads to chronic midfoot arthritis.',
    redFlags: [
      { symptom: 'Plantar ecchymosis (bruising on sole of foot)', reason: 'Hallmark of Lisfranc injury — MUST be investigated', urgency: 'urgent' },
      { symptom: 'Inability to bear weight on midfoot', reason: 'Possible displaced injury requiring surgery', urgency: 'urgent' },
    ],
    riskFactors: ['Football (linemen)', 'Equestrian sports', 'Direct crush injury', 'Twisting fall on a plantarflexed foot'],
    diagnosticTreeRootId: 'lisf-q1', estimatedRecovery: 'Non-displaced: 6-8 weeks NWB. Displaced: surgical fixation',
  },
  {
    id: 'severs-disease', name: 'Calcaneal Apophysitis (Sever\'s Disease)', region: 'lower-leg-ankle-foot',
    aliases: ['Sever\'s disease', 'heel pain child', 'calcaneal apophysitis', 'growing pains heel'],
    overview: 'Traction apophysitis of the calcaneal growth plate in active children (ages 8-14). The Achilles tendon and plantar fascia pull on the immature bone. The most common cause of heel pain in children.',
    redFlags: [
      { symptom: 'Pain at rest or night pain', reason: 'Consider alternative diagnosis (tumor, infection)', urgency: 'urgent' },
      { symptom: 'Unilateral with systemic symptoms', reason: 'Rule out osteomyelitis', urgency: 'urgent' },
    ],
    riskFactors: ['Age 8-14', 'Growth spurt', 'Running/jumping sports', 'Cleated footwear', 'Tight calf muscles'],
    diagnosticTreeRootId: 'sev-q1', estimatedRecovery: 'Self-limiting with skeletal maturity; 2-12 months symptom management',
  },
  {
    id: 'posterior-ankle-impingement', name: 'Posterior Ankle Impingement', region: 'lower-leg-ankle-foot',
    aliases: ['posterior impingement ankle', 'os trigonum syndrome', 'back of ankle pain', 'dancer\'s ankle'],
    overview: 'Compression of soft tissue or bone (os trigonum) at the posterior ankle during plantarflexion. Common in ballet dancers (relevé/pointe), footballers (kicking), and fast bowlers. Pain at the back of the ankle with forced pointing.',
    redFlags: [
      { symptom: 'FHL tendon locking (big toe catching)', reason: 'FHL stenosis — may need surgical release', urgency: 'prompt' },
    ],
    riskFactors: ['Ballet dancers', 'Footballers (kicking)', 'Os trigonum (anatomical variant)', 'Sports requiring maximal plantarflexion'],
    diagnosticTreeRootId: 'pai-q1', estimatedRecovery: 'Conservative: 4-8 weeks. Surgical excision of os trigonum if refractory.',
  },
  {
    id: 'mortons-neuroma', name: 'Morton\'s Neuroma (Interdigital Neuroma)', region: 'lower-leg-ankle-foot',
    aliases: ['Morton\'s neuroma', 'interdigital neuroma', 'forefoot burning', 'ball of foot pain numbness'],
    overview: 'Perineural fibrosis of the interdigital nerve, most commonly between the 3rd and 4th metatarsal heads. Causes burning pain, numbness, and the sensation of "standing on a pebble" in the forefoot.',
    redFlags: [
      { symptom: 'Progressive motor weakness in the foot', reason: 'Consider alternative nerve pathology', urgency: 'prompt' },
    ],
    riskFactors: ['Tight/narrow footwear', 'High heels', 'Running', 'Forefoot overload', 'Pes cavus'],
    diagnosticTreeRootId: 'mn-q1', estimatedRecovery: '4-12 weeks with footwear modification; injection or surgery if refractory',
  },
];
    injuries.filter(i => i.region === 'lower-leg-ankle-foot').slice(0, 3).forEach(i => console.log(i.name + ':\n' + i.overview + '\n'));
  