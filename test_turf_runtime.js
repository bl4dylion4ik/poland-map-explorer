import * as turf from '@turf/turf';

try {
  const poly1 = turf.bboxPolygon([0, 0, 10, 10]);
  const poly2 = turf.bboxPolygon([2, 2, 8, 8]);
  console.log('Poly1:', poly1.type);
  
  // Try standard signature
  try {
    console.log('Attempting difference(poly1, poly2)...');
    const diff1 = turf.difference(poly1, poly2);
    console.log('Success 1:', !!diff1);
  } catch (e) {
    console.log('Error 1:', e.message);
  }

  // Try collection signature
  try {
    console.log('Attempting difference(featureCollection([poly1, poly2]))...');
    const col = turf.featureCollection([poly1, poly2]);
    const diff2 = turf.difference(col);
    console.log('Success 2:', !!diff2);
  } catch (e) {
    console.log('Error 2:', e.message);
  }

} catch (e) {
  console.error('Fatal:', e);
}
