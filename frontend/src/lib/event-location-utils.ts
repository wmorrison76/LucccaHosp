export function toLatLng(input: any){ return input?.lat && input?.lng ? { lat:Number(input.lat), lng:Number(input.lng) } : { lat:0, lng:0 }; }
export function getCityFromEvent(e:any){ return e?.location?.city || e?.city || 'Unknown'; }
