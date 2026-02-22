export const PRESETS = ['wallapop', 'vinted', 'ebay', 'cardmarket', 'in_person'];

export const SELECT_FIELDS = {
  seller_reputation: [
    { value: 'excellent', label: 'Excelente (+100 ventas, 5★)' },
    { value: 'good', label: 'Buena (20+ ventas, 4-5★)' },
    { value: 'new', label: 'Nueva o pocas ventas' },
    { value: 'suspicious', label: 'Reputación sospechosa' }
  ],
  payment_protection: [
    { value: 'full', label: 'Con protección completa' },
    { value: 'partial', label: 'Protección parcial' },
    { value: 'none', label: 'Sin protección' }
  ],
  shipping_tracking: [
    { value: 'insured', label: 'Envío asegurado + tracking' },
    { value: 'tracking_only', label: 'Tracking simple' },
    { value: 'none', label: 'Sin tracking' }
  ],
  product_evidence: [
    { value: 'graded_or_video', label: 'Carta gradada o vídeo verificación' },
    { value: 'detailed_photos', label: 'Fotos detalladas' },
    { value: 'basic_photos', label: 'Fotos básicas' },
    { value: 'none', label: 'Sin evidencia útil' }
  ]
};

export const CHECKBOX_FIELDS = [
  { key: 'price_too_good', label: 'Precio demasiado bueno para ser real' },
  { key: 'seller_pushes_off_platform', label: 'Insiste en salir de la plataforma' },
  { key: 'urgent_sale_pressure', label: 'Mete presión de urgencia' },
  { key: 'refuses_timestamp', label: 'No acepta foto/vídeo con timestamp' },
  { key: 'inconsistent_story', label: 'Historia o datos inconsistentes' },
  { key: 'asks_friends_family_payment', label: 'Pide pago Friends & Family / irreversible' },
  { key: 'unwilling_live_verification', label: 'Rechaza verificación en vivo (llamada/video)' },
  { key: 'account_recently_created', label: 'Cuenta creada recientemente o renombrada' },
  { key: 'refuses_secure_meeting_point', label: 'No acepta punto de encuentro seguro (si es en persona)' }
];
