export default function Contact({ contact }) {
  return (
    <section id="contact" className="contact">
      <h2>Chai pe charcha</h2>
      <p><a href={`mailto:${contact.email}`}>{contact.email}</a></p>
      <p><a href={contact.github} target="_blank" rel="noreferrer">GitHub</a> · <a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></p>
    </section>
  );
}
