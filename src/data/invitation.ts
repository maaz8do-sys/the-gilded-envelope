/**
 * View-model types for the invitation design.
 *
 * Data never comes from local files at runtime — it is mapped from the central
 * public RPC `get_public_invitation_content` (see src/lib/public-invitation.ts).
 * Every field is optional-safe: empty values hide their UI.
 */

export interface GalleryPhoto {
  src: string;
  alt: string;
  caption?: string;
}

export interface ContactEntry {
  name?: string;
  phone: string;
  whatsappUrl?: string;
}

export interface EventItem {
  id: string;
  name?: string;
  date?: string;
  time?: string;
  venue?: string;
  city?: string;
  description?: string;
  mapsUrl?: string;
}

export interface InvitationConfig {
  monogram: string;
  groomName: string;
  brideName: string;
  invocationText?: string;
  invocationRtl: boolean;
  dateDisplay?: string;
  timeDisplay?: string;
  /** epoch ms; countdown renders only when this is a valid future time */
  countdownTarget?: number;
  events: EventItem[];
  venue: {
    name?: string;
    address?: string;
    city?: string;
    mapsUrl?: string;
    imageUrl?: string;
  };
  gallery: GalleryPhoto[];
  music: { enabled: boolean; url?: string };
  contacts: ContactEntry[];
}

export interface ShopFallback {
  name?: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
  city?: string;
  business_contact?: string;
}
