import Image from "next/image";
import { siteInfo } from "@/lib/content";

export const metadata = {
  title: "Contact Us | Siddhartha Boarding Secondary School",
  description: "Contact Siddhartha Boarding Secondary School, Shivamandir-2, Kawasoti-3, Nawalpur, Nepal.",
};

export default function Contact() {
  const mapSrc = `https://www.google.com/maps?q=${siteInfo.mapQuery}&z=15&output=embed`;

  return (
    <>
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute -left-20 -bottom-20 w-[420px] h-[420px] opacity-[0.07]">
          <Image src="/images/logo.png" alt="" fill className="object-contain" />
        </div>
        <div className="relative container-page py-20 sm:py-24 text-center">
          <div className="section-kicker !text-gold">Contact Us</div>
          <h1 className="text-[32px] sm:text-[42px] font-serif mb-3">We&rsquo;d Love to Hear From You</h1>
          <p className="text-[#c3c9e6] max-w-xl mx-auto">
            Visit our campus, call our office, or send an enquiry below.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page grid sm:grid-cols-2 gap-12">
          {/* INFO */}
          <div>
            <div className="section-kicker">Get in Touch</div>
            <h2 className="text-[26px] sm:text-[32px] text-navy mb-1">Contact Details</h2>
            <div className="section-divider" />

            <div className="space-y-6 mb-9">
              <div>
                <div className="text-[13px] font-bold uppercase tracking-wide text-maroon mb-1">Address</div>
                <div className="text-[15.5px] text-gray-700">{siteInfo.address}</div>
              </div>
              <div>
                <div className="text-[13px] font-bold uppercase tracking-wide text-maroon mb-1">Phone</div>
                <div className="text-[15.5px] text-gray-700">
                  {siteInfo.phones.map((p) => (
                    <div key={p}>
                      <a href={`tel:${p.replace(/\s/g, "")}`} className="hover:text-maroon">{p}</a>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[13px] font-bold uppercase tracking-wide text-maroon mb-1">Office Hours</div>
                <div className="text-[15.5px] text-gray-700">
                  Sunday &ndash; Friday, approx. 7:00 AM &ndash; 4:00 PM (Nepal time)
                  <div className="text-[12.5px] text-gray-500 mt-1">* Please confirm exact hours by phone before visiting.</div>
                </div>
              </div>
              <div>
                <div className="text-[13px] font-bold uppercase tracking-wide text-maroon mb-1">Social</div>
                <a href={siteInfo.facebook} target="_blank" rel="noreferrer" className="text-[15.5px] text-gray-700 hover:text-maroon">
                  facebook.com/kawasotisiddhartha
                </a>
              </div>
            </div>

            <div className="aspect-[4/3] w-full border border-line overflow-hidden">
              <iframe
                title="School location map"
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
          </div>

          {/* FORM */}
          <div>
            <div className="section-kicker">Send a Message</div>
            <h2 className="text-[26px] sm:text-[32px] text-navy mb-1">Enquiry Form</h2>
            <div className="section-divider" />
            <form className="grid gap-5 bg-white border border-line p-7 sm:p-8">
              <div>
                <label className="block text-[13px] font-semibold text-navy mb-1.5">Your Name</label>
                <input type="text" required className="w-full border border-line px-3.5 py-2.5 text-[14.5px] focus:outline-none focus:border-maroon" />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-navy mb-1.5">Phone Number</label>
                <input type="tel" required className="w-full border border-line px-3.5 py-2.5 text-[14.5px] focus:outline-none focus:border-maroon" />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-navy mb-1.5">Reason for Enquiry</label>
                <select className="w-full border border-line px-3.5 py-2.5 text-[14.5px] focus:outline-none focus:border-maroon">
                  <option>Admissions</option>
                  <option>General Enquiry</option>
                  <option>Scholarship / Fee Question</option>
                  <option>Media / Partnership</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-navy mb-1.5">Message</label>
                <textarea rows={5} className="w-full border border-line px-3.5 py-2.5 text-[14.5px] focus:outline-none focus:border-maroon" />
              </div>
              <button type="submit" className="btn-maroon w-full">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
