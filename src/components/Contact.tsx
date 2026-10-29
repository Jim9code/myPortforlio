import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react';

const WhatsAppIcon: React.FC<{ size?: number }> = ({ size = 19 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
);

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:rinfwang4@gmail.com?subject=Portfolio Contact from ${formData.name}&body=${formData.message}`;
    window.location.href = mailtoLink;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactChannels = [
    {
      label: 'rinfwang4@gmail.com',
      href: 'mailto:rinfwang4@gmail.com',
      external: false
    },
    {
      label: 'WhatsApp — +234 701 427 8746',
      href: 'https://wa.me/2347014278746',
      external: true
    },
    {
      label: 'github.com/Jim9code',
      href: 'https://github.com/Jim9code/',
      external: true
    },
    {
      label: 'LinkedIn — Rinfwang Yusuf Daspan',
      href: 'https://www.linkedin.com/in/rinfwang-yusuf-daspan-b95b772b9',
      external: true
    }
  ];

  return (
    <section id="contact" className="py-24 pb-36 px-6 sm:px-10 lg:px-16 bg-transparent relative">
      <div className="max-w-[1320px] mx-auto relative z-10">
        {/* Top Self-Drawing Hairline Rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="h-[1px] w-full bg-stone-300/80 origin-left mb-16"
        />

        <div className="grid md:grid-cols-12 gap-12 items-start">
          {/* Left Sticky Editorial Heading, Direct Channels & Minimal Icons */}
          <div className="md:col-span-5 md:sticky md:top-28 self-start space-y-8">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif-editorial text-4xl sm:text-5xl font-normal text-stone-950 tracking-tight leading-[1.08] mb-4"
              >
                Let&apos;s Build <br />
                <span className="italic">Something Cool.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-sm"
              >
                Always open to new software engineering, backend, and Web3 opportunities. Reach out
                directly or drop a message.
              </motion.p>
            </div>

            <div className="space-y-1 pt-2">
              {contactChannels.map((ch, idx) => (
                <div key={ch.label} className="relative">
                  <motion.a
                    href={ch.href}
                    target={ch.external ? '_blank' : undefined}
                    rel={ch.external ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.55,
                      delay: 0.1 + idx * 0.08,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="flex items-center justify-between py-3.5 text-sm text-stone-800 hover:text-stone-950 group"
                  >
                    <span>{ch.label}</span>
                    <ArrowUpRight
                      size={15}
                      className="text-stone-400 group-hover:text-stone-950 transition-colors"
                    />
                  </motion.a>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      delay: 0.12 + idx * 0.08,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="h-[1px] w-full bg-stone-300/70 origin-left"
                  />
                </div>
              ))}
            </div>

            {/* Bare Minimal Social Row */}
            <div className="flex items-center gap-5 pt-2 text-stone-400">
              {[
                { href: 'https://github.com/Jim9code/', label: 'GitHub', icon: Github, ext: true },
                {
                  href: 'https://www.linkedin.com/in/rinfwang-yusuf-daspan-b95b772b9',
                  label: 'LinkedIn',
                  icon: Linkedin,
                  ext: true
                },
                {
                  href: 'https://wa.me/2347014278746',
                  label: 'WhatsApp',
                  icon: WhatsAppIcon,
                  ext: true
                },
                { href: 'mailto:rinfwang4@gmail.com', label: 'Email', icon: Mail, ext: false }
              ].map((soc, idx) => {
                const SocIcon = soc.icon;
                return (
                  <motion.a
                    key={soc.label}
                    href={soc.href}
                    target={soc.ext ? '_blank' : undefined}
                    rel={soc.ext ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.25 + idx * 0.07 }}
                    className="hover:text-stone-950 transition-colors"
                    aria-label={soc.label}
                  >
                    <SocIcon size={19} strokeWidth={1.75} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Right Column: Cardless Editorial Underline Form with Individual Animated Fields */}
          <div className="md:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <label
                    htmlFor="name"
                    className="block font-mono text-[11px] uppercase tracking-widest text-stone-500 mb-2"
                  >
                    01 / Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full py-3 bg-transparent border-b border-stone-300 focus:border-stone-950 focus:outline-none transition-colors text-stone-900 placeholder:text-stone-400 text-base"
                    placeholder="Your name"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                >
                  <label
                    htmlFor="email"
                    className="block font-mono text-[11px] uppercase tracking-widest text-stone-500 mb-2"
                  >
                    02 / Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full py-3 bg-transparent border-b border-stone-300 focus:border-stone-950 focus:outline-none transition-colors text-stone-900 placeholder:text-stone-400 text-base"
                    placeholder="your.email@example.com"
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
              >
                <label
                  htmlFor="message"
                  className="block font-mono text-[11px] uppercase tracking-widest text-stone-500 mb-2"
                >
                  03 / Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full py-3 bg-transparent border-b border-stone-300 focus:border-stone-950 focus:outline-none transition-colors resize-none text-stone-900 placeholder:text-stone-400 text-base"
                  placeholder="Tell me about your project or just say hello..."
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-between pt-2"
              >
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Usually responds within 24 hours</span>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-stone-950 text-[#FDFBF6] px-6 py-2.5 rounded-full text-xs font-medium tracking-wide hover:bg-stone-800 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Send Message</span>
                  <ArrowUpRight size={15} />
                </motion.button>
              </motion.div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
