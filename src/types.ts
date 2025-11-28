export interface RouteDetail {
  id: string;
  name: string;
  center: { lat: number; lng: number };
  zoomHorizontal?: number;
  zoomVertical?: number;
  geoJson: object;
}
