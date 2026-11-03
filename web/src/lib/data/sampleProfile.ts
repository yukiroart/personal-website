import { sanityClient } from '#lib/sanity';

export interface CommissionStatusConfig {
  status: 'open' | 'closed';
  note?: string;
}

export interface ArtistProfile {
  _id?: string;
  artistName: string;
  commissionStatus: 'open' | 'closed';
  commissionStatusNote?: string;
  portraitImage?: any;
  education: {
    school: string;
    program: string;
  };
  contactChannels?: {
    discord?: string;
    email?: string;
    twitter?: string;
  };
  bio?: any[];
  bioHtml: string;
}

export const DEFAULT_BIO_HTML = `
<p>Salutations! Thank you for stumbling upon my website. My name is Lindsay, and I go by Yukiro as my username.</p>
<p>I am a digital illustrator, who enjoys character design! I can also do diverse art styles if need be.</p>
<p>I love indulging in my hobbies such as wotagei (a unique japanese art form where you dance with lightsticks), as I am in a wotagei dance group called <a class="external-link" href="https://x.com/ZappuWotagei" target="_blank" rel="noopener noreferrer" title="Zappu Wotagei on X (@ZappuWotagei)">Zappu</a>!</p>
<p>I also like skateboarding and video games.</p>
`.trim();

export const DEFAULT_ARTIST_PROFILE: ArtistProfile = {
  artistName: 'Yukiro',
  commissionStatus: 'open',
  commissionStatusNote: '',
  education: {
    school: 'De La Salle Benilde',
    program: 'Art & Animation',
  },
  contactChannels: {
    discord: 'yuk1r0',
    email: 'yukiroart19@gmail.com',
    twitter: 'https://x.com/yukir0_art',
  },
  bioHtml: DEFAULT_BIO_HTML,
};

export const DEFAULT_COMMISSION_STATUS: CommissionStatusConfig = {
  status: 'open',
  note: '',
};

let cachedProfile: ArtistProfile | null = null;

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function portableTextToHtml(blocks: any[]): string {
  if (!Array.isArray(blocks) || blocks.length === 0) {
    return DEFAULT_BIO_HTML;
  }

  let html = '';
  let inList: 'bullet' | 'number' | null = null;

  for (const block of blocks) {
    if (!block || block._type !== 'block') continue;

    // Handle list items
    if (block.listItem) {
      const listType = block.listItem === 'number' ? 'number' : 'bullet';
      if (inList !== listType) {
        if (inList) html += inList === 'number' ? '</ol>' : '</ul>';
        inList = listType;
        html += inList === 'number' ? '<ol class="bio-list-ordered">' : '<ul class="bio-list-unordered">';
      }
    } else {
      if (inList) {
        html += inList === 'number' ? '</ol>' : '</ul>';
        inList = null;
      }
    }

    // Render children spans
    let blockContent = '';
    const markDefs = block.markDefs || [];

    if (Array.isArray(block.children)) {
      for (const child of block.children) {
        let text = escapeHtml(child.text || '');
        if (!text) continue;

        if (Array.isArray(child.marks) && child.marks.length > 0) {
          for (const mark of child.marks) {
            if (mark === 'strong') {
              text = `<strong>${text}</strong>`;
            } else if (mark === 'em') {
              text = `<em>${text}</em>`;
            } else if (mark === 'underline') {
              text = `<u>${text}</u>`;
            } else {
              // Check if mark matches a link in markDefs
              const def = markDefs.find((d: any) => d._key === mark);
              if (def && (def._type === 'link' || def.href)) {
                const href = escapeHtml(def.href || '#');
                const target = def.blank !== false ? ' target="_blank" rel="noopener noreferrer"' : '';
                text = `<a class="external-link" href="${href}"${target}>${text}</a>`;
              }
            }
          }
        }
        blockContent += text;
      }
    }

    if (!blockContent.trim()) continue;

    if (block.listItem) {
      html += `<li>${blockContent}</li>`;
    } else if (block.style === 'h3') {
      html += `<h3 class="bio-subheading">${blockContent}</h3>`;
    } else {
      html += `<p class="bio-paragraph">${blockContent}</p>`;
    }
  }

  if (inList) {
    html += inList === 'number' ? '</ol>' : '</ul>';
  }

  return html || DEFAULT_BIO_HTML;
}

export async function fetchArtistProfile(): Promise<ArtistProfile> {
  // In browser, initialize from sessionStorage if in-memory cache is empty
  if (typeof window !== 'undefined' && !cachedProfile) {
    try {
      const stored = sessionStorage.getItem('yukiro_profile_cache');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.artistName) {
          cachedProfile = parsed;
        }
      }
    } catch {}
  }

  try {
    const raw = await sanityClient.fetch(`
      *[_type == "artistProfile"][0] {
        _id,
        artistName,
        commissionStatus,
        commissionStatusNote,
        portraitImage,
        education,
        contactChannels,
        bio
      }
    `);

    if (raw) {
      const bioHtml = raw.bio && Array.isArray(raw.bio) && raw.bio.length > 0
        ? portableTextToHtml(raw.bio)
        : DEFAULT_BIO_HTML;

      cachedProfile = {
        _id: raw._id,
        artistName: raw.artistName || DEFAULT_ARTIST_PROFILE.artistName,
        commissionStatus: raw.commissionStatus === 'closed' ? 'closed' : 'open',
        commissionStatusNote: raw.commissionStatusNote || '',
        portraitImage: raw.portraitImage,
        education: {
          school: raw.education?.school || DEFAULT_ARTIST_PROFILE.education.school,
          program: raw.education?.program || DEFAULT_ARTIST_PROFILE.education.program,
        },
        contactChannels: {
          discord: raw.contactChannels?.discord || DEFAULT_ARTIST_PROFILE.contactChannels?.discord,
          email: raw.contactChannels?.email || DEFAULT_ARTIST_PROFILE.contactChannels?.email,
          twitter: raw.contactChannels?.twitter || DEFAULT_ARTIST_PROFILE.contactChannels?.twitter,
        },
        bio: raw.bio,
        bioHtml,
      };

      if (typeof window !== 'undefined') {
        try {
          sessionStorage.setItem('yukiro_profile_cache', JSON.stringify(cachedProfile));
        } catch {}
      }

      return cachedProfile;
    }
  } catch (err) {
    console.error('Error fetching Artist Profile from Sanity, using fallback:', err);
  }

  return cachedProfile || DEFAULT_ARTIST_PROFILE;
}

export async function fetchCommissionStatus(): Promise<CommissionStatusConfig> {
  const profile = await fetchArtistProfile();
  return {
    status: profile.commissionStatus,
    note: profile.commissionStatusNote,
  };
}
