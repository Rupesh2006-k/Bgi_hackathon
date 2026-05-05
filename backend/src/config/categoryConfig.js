export const CATEGORY_CONFIG = {
  road: [
    'road',
    'sadak',
    'gadda',
    'gaddha',
    'pothole',
    'traffic',
    'bridge',
    'khadda',
    'rasta',
    'road damage',
    'broken road'
  ],

  water: [
    'water',
    'pani',
    'jal',
    'pipe',
    'leak',
    'leakage',
    'tank',
    'water supply',
    'no water',
    'water problem',
    'pipeline'
  ],

  electricity: [
    'bijli',
    'electricity',
    'light',
    'power',
    'transformer',
    'wire',
    'current',
    'short circuit',
    'shock',
    'light nahi',
    'power cut'
  ],

  garbage: [
    'kachra',
    'garbage',
    'waste',
    'dustbin',
    'trash',
    'litter',
    'kooda',
    'kuda',
    'overflow garbage',
    'garbage pile'
  ],

  // 🔥 SANITATION / SEWAGE (merged & improved)
  sanitation: [
    'nali',
    'drain',
    'sewage',
    'gutter',
    'drainage',
    'blocked drain',
    'dirty water',
    'bad smell',
    'sewer',
    'sewer line',
    'nali band',
    'ganda pani',
    'overflow drain',
    'sewage overflow'
  ],

  air: [
    'pollution',
    'smoke',
    'dust',
    'air',
    'bad air',
    'smog',
    'factory smoke',
    'air quality'
  ],

  tax: [
    'tax',
    'bill',
    'payment',
    'property tax',
    'water bill',
    'electric bill',
    'pending bill'
  ]
}

export const PRIORITY_CONFIG = {
  high: [
    // urgency
    'urgent',
    'jaldi',
    'turant',
    'immediately',
    'asap',
    'emergency',

    // danger / safety
    'danger',
    'dangerous',
    'risk',
    'hazard',
    'shock',
    'current',
    'fire',
    'aag',
    'blast',
    'accident',
    'injury',
    'death',

    // critical issues
    'not working',
    'completely broken',
    'totally damaged',
    'band hai',
    'kaam nahi kar raha',
    'fail ho gaya',

    // strong intensity
    'bahut zyada',
    'severe',
    'serious',
    'critical',
    'extreme',

    // time based (long pending)
    'raat se',
    'kal raat se',
    '3 din se',
    '4 din se',
    'week se',
    'bahut din se',
    'kaafi din se'
  ],

  medium: [
    // moderate urgency
    'soon',
    'as soon as possible',
    'thoda jaldi',
    'jaldi dekh lo',

    // normal issue words
    'problem',
    'issue',
    'blocked',
    'damage',
    'leakage',
    'not proper',
    'theek se nahi',
    'kaam nahi kar raha',

    // time based
    '2 din se',
    'do din se',
    'kal se',
    'aaj se',
    'recently',
    'abhi se',
    'since yesterday'
  ],

  low: [
    // low urgency
    'normal',
    'minor',
    'choti problem',
    'small issue',

    // casual tone
    'kabhi kabhi',
    'sometimes',
    'occasionally',

    // maintenance type
    'slow',
    'maintenance',
    'improve',
    'upgrade',
    'cleaning required',

    // suggestion type
    'should be fixed',
    'better if fixed',
    'future me'
  ]
}
