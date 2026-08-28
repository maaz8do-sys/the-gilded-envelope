import { useCallback, useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { EnvelopeScene } from "@/components/invite/EnvelopeScene";
import { InvitationLetter } from "@/components/invite/InvitationLetter";
import { MusicToggle } from "@/components/invite/MusicToggle";
import { invitation } from "@/data/invitation";

const title = "Ahmed & Ayesha — Wedding Invitation, 14 December 2026";
const description =
  "You are invited to the Nikah and Walima of Ahmed & Ayesha in Hyderabad, December 2026. Open the envelope to view the invitation, events and RSVP.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [opened, setOpened] = useState(false);
  const [interacted, setInteracted] = useState(false);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  const handleOpened = useCallback(() => setOpened(true), []);

  return (
    <div className="relative min-h-screen bg-background">
      <AnimatePresence>
        {!opened && (
          <div onPointerDown={() => setInteracted(true)}>
            <EnvelopeScene data={invitation} onOpened={handleOpened} />
          </div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: opened ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <InvitationLetter data={invitation} />
      </motion.div>

      {invitation.music.enabled && <MusicToggle start={interacted} />}
    </div>
  );
}
