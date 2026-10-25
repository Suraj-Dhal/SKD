import { Link } from "react-router-dom";

const NotFound = () => (
  <section className="container-site py-32 text-center">
    <div className="eyebrow">404</div>
    <h1 className="mt-4 text-5xl md:text-7xl font-bold">This page does not exist.</h1>
    <p className="mt-6 text-text-muted">The page you're looking for has moved or was never published.</p>
    <Link to="/" className="mt-8 inline-block px-6 py-3 bg-blue-deep text-white rounded-lg hover:bg-blue">
      ← Back home
    </Link>
  </section>
);

export default NotFound;
