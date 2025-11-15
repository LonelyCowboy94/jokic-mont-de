"use client"; 

import dynamic from "next/dynamic";


const ContactForm = dynamic(() => import("./ContactForm"), {
  ssr: false, 
  loading: () => <p>Kontaktformular lädt...</p>, 
});

export default function LazyContactForm() {
  return <ContactForm />;
}
