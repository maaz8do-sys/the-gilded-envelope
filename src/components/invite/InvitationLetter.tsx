import { motion } from "motion/react";
import { MapPin, MessageCircle, Phone, Instagram, Facebook, Youtube } from "lucide-react";
import { FoldPanel } from "./FoldPanel";
import { Ornament, Crest } from "./Ornament";
import { Countdown } from "./Countdown";
import { Gallery } from "./Gallery";
import { Rsvp } from "./Rsvp";
import type { InvitationConfig, SocialLink } from "@/data/invitation";

const socialIcon = {
  whatsapp: MessageCircle,
  phone: Phone,
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
} as const;

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-center font-sans text-[9px] uppercase tracking-luxe text-gold-deep">
      {children}
    </span>
  );
}

export function InvitationLetter({ data }: { data: InvitationConfig }) {
  return (
    <main className="mx-auto w-full max-w-[560px] overflow-hidden shadow-[var(--shadow-lift)]">
      {/* Invocation */}
      <FoldPanel id="invocation" className="min-h-[70vh] pt-24">
        <div className="flex flex-col items-center gap-10">
          <Ornament />
          {data.invocation.kind !== "none" && (
            <motion.p
              dir={data.invocation.dir}
              lang={data.invocation.lang}
              initial={{ opacity: 0, filter: "blur(10px)", y: 14 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              className={`text-center text-2xl leading-[2] text-ink sm:text-3xl ${
                data.invocation.fontClass ?? "font-display"
              }`}
            >
              {data.invocation.text}
            </motion.p>
          )}
          {data.invocation.translation && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.7 }}
              className="max-w-xs text-center font-display text-sm italic text-muted-foreground"
            >
              {data.invocation.translation}
            </motion.p>
          )}
          <Ornament />
        </div>
      </FoldPanel>

      {/* Couple */}
      <FoldPanel id="couple">
        <div className="flex flex-col items-center gap-6 text-center">
          <Kicker>The Wedding Of</Kicker>
          {[data.couple.groom, data.couple.conjunction, data.couple.bride].map((word, i) => (
            <motion.h1
              key={word + i}
              initial={{ opacity: 0, filter: "blur(14px)", y: 18, scale: 0.97 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.6, delay: 0.35 * i, ease: [0.16, 1, 0.3, 1] }}
              className={
                i === 1
                  ? "font-display text-2xl italic text-gold"
                  : "font-display text-5xl uppercase leading-none tracking-[0.08em] text-ink sm:text-6xl"
              }
            >
              {word}
            </motion.h1>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 1.15 }}
            className="mt-4 flex flex-col items-center gap-4"
          >
            <Ornament />
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-gold-deep">
              {data.dateDisplay}
            </span>
          </motion.div>
        </div>
      </FoldPanel>

      {/* Message */}
      <FoldPanel id="message">
        <div className="mx-auto flex max-w-sm flex-col items-center gap-6 text-center">
          {data.message.map((line, i) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1.2, delay: i * 0.25 }}
              className={
                i === 1
                  ? "font-display text-3xl text-ink"
                  : "font-display text-lg leading-relaxed text-muted-foreground"
              }
            >
              {line}
            </motion.p>
          ))}
        </div>
      </FoldPanel>

      {/* Countdown */}
      <FoldPanel id="countdown">
        <div className="flex flex-col items-center gap-8">
          <Kicker>Counting the Days</Kicker>
          <Countdown dateISO={data.dateISO} />
          <Ornament />
        </div>
      </FoldPanel>

      {/* Events */}
      <FoldPanel id="events">
        <div className="flex flex-col items-center gap-14">
          <Kicker>The Celebrations</Kicker>
          {data.events.map((ev) => (
            <motion.article
              key={ev.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-xs text-center"
            >
              <h2 className="font-display text-3xl uppercase tracking-[0.2em] text-ink">
                {ev.name}
              </h2>
              <div className="gold-rule mx-auto mt-4 h-px w-20" />
              <p className="mt-5 font-sans text-[11px] uppercase tracking-[0.24em] text-gold-deep">
                {ev.date}
              </p>
              <p className="mt-1 font-sans text-[11px] uppercase tracking-[0.24em] text-gold-deep">
                {ev.time}
              </p>
              <p className="mt-5 font-display text-xl text-ink">{ev.venue}</p>
              <p className="font-display text-base text-muted-foreground">{ev.address}</p>
              <p className="font-display text-base text-muted-foreground">{ev.city}</p>
              {ev.description && (
                <p className="mt-3 font-display text-sm italic text-muted-foreground">
                  {ev.description}
                </p>
              )}
              {ev.mapsUrl && (
                <a
                  href={ev.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 border-b border-gold pb-1 font-sans text-[10px] uppercase tracking-[0.24em] text-gold-deep transition-opacity hover:opacity-70"
                >
                  <MapPin size={12} /> View location
                </a>
              )}
            </motion.article>
          ))}
        </div>
      </FoldPanel>

      {/* Gallery */}
      <FoldPanel id="gallery">
        <div className="flex flex-col items-center gap-12">
          <Kicker>Moments</Kicker>
          <Gallery photos={data.gallery} />
        </div>
      </FoldPanel>

      {/* Venue */}
      <FoldPanel id="venue">
        <div className="flex flex-col items-center gap-6 text-center">
          <Kicker>The Venue</Kicker>
          <h2 className="font-display text-3xl text-ink">{data.venue.name}</h2>
          <p className="max-w-xs font-display text-lg leading-relaxed text-muted-foreground">
            {data.venue.address}
          </p>
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold-deep">
            {data.venue.city}
          </p>
          <a
            href={data.venue.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 border border-gold px-7 py-3 font-sans text-[10px] uppercase tracking-luxe text-gold-deep transition-colors hover:bg-champagne/40"
          >
            Get directions
          </a>
        </div>
      </FoldPanel>

      {/* RSVP + contact */}
      <FoldPanel id="rsvp">
        <div className="flex flex-col items-center gap-8">
          <Kicker>{data.contact.heading}</Kicker>
          <p className="max-w-xs text-center font-display text-lg italic text-muted-foreground">
            {data.contact.note}
          </p>
          <Rsvp />
          {data.socials.length > 0 && <Socials links={data.socials} />}
        </div>
      </FoldPanel>

      {/* Closing */}
      <FoldPanel id="closing" className="min-h-[80vh]">
        <div className="flex flex-col items-center gap-8 pt-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.7, rotate: -14 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1, ease: [0.34, 1.4, 0.64, 1] }}
          >
            <Crest label={data.monogram} />
          </motion.div>
          <Kicker>{data.closing.kicker}</Kicker>
          <h2 className="font-display text-4xl uppercase leading-tight tracking-[0.12em] text-ink">
            {data.couple.groom} <span className="text-gold">&</span> {data.couple.bride}
          </h2>
          <Ornament />
          <p className="max-w-xs font-display text-lg text-muted-foreground">
            {data.closing.line}
          </p>
          <a
            href="#rsvp"
            className="mt-2 border border-gold px-7 py-3 font-sans text-[10px] uppercase tracking-luxe text-gold-deep transition-colors hover:bg-champagne/40"
          >
            Respond to invitation
          </a>
        </div>
      </FoldPanel>
    </main>
  );
}

function Socials({ links }: { links: SocialLink[] }) {
  return (
    <div className="mt-4 flex items-center gap-5">
      {links.map((l) => {
        const Icon = socialIcon[l.kind];
        return (
          <a
            key={l.kind}
            href={l.url}
            target={l.url.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            aria-label={l.label}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-gold-deep transition-colors hover:bg-champagne/40"
          >
            <Icon size={15} />
          </a>
        );
      })}
    </div>
  );
}
