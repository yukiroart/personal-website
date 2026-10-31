import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';

// Read local Sanity CLI auth token
const configPath = path.join(process.env.HOME || '', '.config/sanity/config.json');
let token = process.env.SANITY_AUTH_TOKEN;

if (!token && fs.existsSync(configPath)) {
  try {
    const raw = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    token = raw.authToken;
  } catch (err) {
    console.error('Failed to read sanity config token:', err);
  }
}

if (!token) {
  console.error('No Sanity auth token found. Run `npx sanity login` first.');
  process.exit(1);
}

const client = createClient({
  projectId: 'y0rudiy0',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-03-01',
  token,
});

const ARTWORKS_DIR = path.resolve('web/static/artworks');

function parseFilename(filename) {
  // Pattern example: "16.1 full body, original, fanart_converted.webp"
  const clean = filename.replace('_converted.webp', '').trim();
  
  // Match leading number (int or float)
  const orderMatch = clean.match(/^([\d.]+)\s*(.*)$/);
  const orderStr = orderMatch ? orderMatch[1] : '0';
  const order = parseFloat(orderStr) || 0;
  const rest = orderMatch ? orderMatch[2].toLowerCase() : clean.toLowerCase();

  // Determine collection / framing type
  let collection = 'half-body'; // default
  if (rest.includes('full body') || rest.includes('fullbody')) {
    collection = 'full-body';
  } else if (rest.includes('half body') || rest.includes('half') || rest.includes('halft')) {
    collection = 'half-body';
  } else if (rest.includes('bust')) {
    collection = 'bust';
  } else if (rest.includes('chibi')) {
    collection = 'chibi';
  } else if (rest.includes('comic')) {
    collection = 'comic';
  } else if (rest.includes('animation')) {
    collection = 'animation';
  }

  // Determine tags
  const tags = [];
  if (rest.includes('original')) tags.push('Original');
  if (rest.includes('fan art') || rest.includes('fanart')) tags.push('Fan Art');
  if (rest.includes('reference sheet') || rest.includes('reference')) tags.push('Reference Sheet');
  if (rest.includes('commission')) tags.push('Commission');
  if (rest.includes('icon')) tags.push('Icon');

  // Human readable title
  const typeLabel = collection.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
  const tagsLabel = tags.length > 0 ? tags.join(' / ') : 'Study';
  const title = `Piece #${orderStr} — ${typeLabel} (${tagsLabel})`;

  return {
    order,
    orderStr,
    collection,
    tags,
    title,
    slug: `piece-${orderStr.replace('.', '-')}-${collection}`,
  };
}

async function run() {
  const allFiles = fs.readdirSync(ARTWORKS_DIR);
  const webpFiles = allFiles
    .filter(f => f.endsWith('_converted.webp'))
    .sort((a, b) => {
      const orderA = parseFloat(a.match(/^([\d.]+)/)?.[1] || '0');
      const orderB = parseFloat(b.match(/^([\d.]+)/)?.[1] || '0');
      return orderA - orderB;
    });

  console.log(`Found ${webpFiles.length} artworks to upload to Sanity project y0rudiy0...\n`);

  let count = 0;
  for (const file of webpFiles) {
    count++;
    const meta = parseFilename(file);
    const filePath = path.join(ARTWORKS_DIR, file);

    console.log(`[${count}/${webpFiles.length}] Uploading ${file}...`);
    console.log(`       Order: ${meta.order} | Type: ${meta.collection} | Tags: ${meta.tags.join(', ')}`);

    try {
      // 1. Upload image asset to Sanity
      const imageStream = fs.createReadStream(filePath);
      const asset = await client.assets.upload('image', imageStream, {
        filename: file,
        contentType: 'image/webp',
      });

      // 2. Create artwork document
      const doc = {
        _type: 'artwork',
        title: meta.title,
        slug: { _type: 'slug', current: meta.slug },
        order: meta.order,
        collection: meta.collection,
        tags: meta.tags,
        year: 2026,
        status: 'available',
        mainImage: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id,
          },
          alt: `Digital illustration by Yukiro - ${meta.collection} (${meta.tags.join(', ')})`,
        },
      };

      const result = await client.create(doc);
      console.log(`       ✓ Created Sanity Doc: ${result._id}\n`);
    } catch (err) {
      console.error(`       ✗ Error uploading ${file}:`, err.message);
    }
  }

  console.log(`\n🎉 Finished uploading all ${webpFiles.length} artworks to Sanity!`);
}

run();

