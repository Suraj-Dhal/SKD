import { motion } from "framer-motion";
import { fadeUp } from "@/constants/motion";
import { profile } from "@/data/site";

const Contact = () => (
  <section className="container-site py-16">
    <div className="eyebrow">GET IN TOUCH</div>
    <h1 className="mt-3 text-4xl md:text-6xl font-bold">Open to research, teaching, and consultancy enquiries.</h1>

    <div className="mt-12 grid md:grid-cols-2 gap-10">
      <motion.div {...fadeUp} className="space-y-6">
        <div>
          <div className="eyebrow">EMAIL</div>
          <a href={`mailto:${profile.email}`} className="block mt-1 text-text hover:text-blue-deep">{profile.email}</a>
          <a href={`mailto:${profile.emailAlt}`} className="block text-text-muted hover:text-blue-deep">{profile.emailAlt}</a>
        </div>
        <div>
          <div className="eyebrow">PHONE</div>
          <a href={`tel:${profile.mobile.replace(/\s/g, "")}`} className="block mt-1 font-mono-num text-text hover:text-blue-deep">Mobile: {profile.mobile}</a>
          <a href={`tel:${profile.office.replace(/\s/g, "")}`} className="block font-mono-num text-text-muted hover:text-blue-deep">Office: {profile.office}</a>
        </div>
        <div>
          <div className="eyebrow">OFFICE</div>
          <p className="mt-1 text-text leading-relaxed">Faculty of Management Studies,<br />Sri Sri University, Godisahi,<br />Cuttack, Odisha, India</p>
        </div>
      </motion.div>

      <motion.form {...fadeUp} action={`mailto:${profile.email}`} method="post" encType="text/plain" className="space-y-4">
        {[["name","Name","text"],["email","Email","email"],["subject","Subject","text"]].map(([n,l,t]) => (
          <div key={n}>
            <label className="eyebrow block mb-2" htmlFor={n}>{l}</label>
            <input id={n} name={n} type={t} required className="w-full border-b border-hairline focus:border-blue-deep bg-transparent py-2 outline-none transition-colors" />
          </div>
        ))}
        <div>
          <label className="eyebrow block mb-2" htmlFor="message">Message</label>
          <textarea id="message" name="message" rows={5} required className="w-full border border-hairline focus:border-blue-deep rounded-lg bg-transparent p-3 outline-none transition-colors" />
        </div>
        <button type="submit" className="px-6 py-3 bg-blue-deep text-white rounded-lg hover:bg-blue">Send →</button>
      </motion.form>
    </div>

    <div className="mt-16 card-hairline overflow-hidden">
      <iframe
        title="Sri Sri University Cuttack"
        src="https://www.openstreetmap.org/export/embed.html?bbox=85.93%2C20.50%2C85.97%2C20.54&layer=mapnik&marker=20.52%2C85.95"
        width="100%" height="380" style={{ filter: "grayscale(0.6)" }} loading="lazy"
      />
    </div>
  </section>
);

export default Contact;
