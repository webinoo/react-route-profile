import styles from "./App.module.css";

export const Usage = () => (
  <main className={styles.content}>
    <h3>Overview</h3>
    <p>
      A minimal React component that renders a Google Maps view for a route, using your
      <code className={styles.inlineCode}>Google Maps JavaScript API key</code>. Point it at your own route data and it will plot the geometry
      with the markers.
    </p>

    <h3>Setup & usage</h3>
    <ol className={styles.steps}>
      <li>
        Set your Google Maps API key via the{" "}
        <code className={styles.inlineCode}>apiKey</code> prop.
      </li>
      <li>
        Build a <code className={styles.inlineCode}>RouteDetail</code> with{" "}
        <code className={styles.inlineCode}>{`{ id, name, center, zoomHorizontal?, zoomVertical?, geoJson }`}</code>.
      </li>
      <li>
        Pass that <code className={styles.inlineCode}>RouteDetail</code> to{" "}
        <code className={styles.inlineCode}>{`<RouteMap route=... />`}</code>.
      </li>
      <li>
        The <code className={styles.inlineCode}>geoJson</code> should be a FeatureCollection that
        includes your route geometry and optional point features (first/last markers, etc.).
      </li>
      <li>
        Optionally adjust <code className={styles.inlineCode}>height</code>,{" "}
        <code className={styles.inlineCode}>className</code>, or{" "}
        <code className={styles.inlineCode}>style</code> to fit your layout.
      </li>
    </ol>

    <h3>API</h3>
    <table>
      <thead>
        <tr>
          <th align="left">Prop</th>
          <th align="left">Type</th>
          <th align="left">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>apiKey</code></td>
          <td><code>string</code></td>
          <td>Required Google Maps JS API key.</td>
        </tr>
        <tr>
          <td><code>route</code></td>
          <td><code>RouteDetail</code></td>
          <td>Route data to render (center, zooms, geoJson).</td>
        </tr>
        <tr>
          <td><code>height</code></td>
          <td><code>number | string</code></td>
          <td>Map height (e.g., <code>520</code> or <code>"100vh"</code>).</td>
        </tr>
        <tr>
          <td><code>className</code></td>
          <td><code>string</code></td>
          <td>Optional wrapper class.</td>
        </tr>
        <tr>
          <td><code>style</code></td>
          <td><code>CSSProperties</code></td>
          <td>Inline style overrides.</td>
        </tr>
      </tbody>
    </table>

    <p>
      <code className={styles.inlineCode}>RouteDetail</code>:{" "}
      <code className={styles.inlineCode}>{`{ id, name, center: { lat, lng }, zoomHorizontal?, zoomVertical?, geoJson }`}</code>
    </p>
  </main>
);
