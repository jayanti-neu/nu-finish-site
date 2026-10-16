import { mkdirSync, existsSync, rmSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";
import ffmpegPath from "ffmpeg-static";

if (!ffmpegPath) {
  console.error("ffmpeg-static did not provide a binary path.");
  process.exit(1);
}

const projectRoot = process.cwd();
const sourceDir = resolve(projectRoot, "public", "gallery", "videos");
const desktopDir = resolve(sourceDir, "web");
const mobileDir = resolve(sourceDir, "mobile-webp");
const DESKTOP_FILTER =
  "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,fps=30,format=yuv420p";
const HDR_DESKTOP_FILTER =
  "zscale=t=linear:npl=100,format=gbrpf32le,zscale=p=bt709,tonemap=tonemap=hable:desat=0,zscale=t=bt709:m=bt709:r=tv,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,fps=30,format=yuv420p";
const MOBILE_FILTER =
  "scale=360:202:force_original_aspect_ratio=increase,crop=360:202,fps=10";

const clips = [
  {
    source: "dirt_Race.MOV",
    slug: "hero-race",
    start: 4,
    duration: 7,
    hdr: true,
  },
  {
    source: "dirt_race_2.MOV",
    slug: "track-action",
    start: 6,
    duration: 6,
  },
  {
    source: "Spraying a Coat of Color for a Blend.MOV",
    slug: "paint-color-blend",
    start: 5,
    duration: 6,
    hdr: true,
  },
  {
    source: "Spraying Clear Coat After Color in the Curtain Booth.MOV",
    slug: "clear-coat-booth",
    start: 7,
    duration: 6,
    hdr: true,
  },
  {
    source: "WG Motorsports, The Legacy .MOV",
    slug: "motorsports-legacy",
    start: 18,
    duration: 8,
  },
];

const missingSources = clips
  .map((clip) => clip.source)
  .filter((source) => !existsSync(resolve(sourceDir, source)));

if (missingSources.length > 0) {
  console.error(
    `Video processing stopped before changing generated files. Missing sources:\n${missingSources.map((source) => `- ${source}`).join("\n")}`,
  );
  process.exit(1);
}

rmSync(desktopDir, { recursive: true, force: true });
rmSync(mobileDir, { recursive: true, force: true });
rmSync(resolve(sourceDir, "mobile-gifs"), { recursive: true, force: true });

mkdirSync(desktopDir, { recursive: true });
mkdirSync(mobileDir, { recursive: true });

function runFfmpeg(args, label) {
  const result = spawnSync(ffmpegPath, args, {
    stdio: "inherit",
  });

  if (result.status !== 0) {
    throw new Error(`ffmpeg failed for ${label}`);
  }
}

for (const clip of clips) {
  const sourcePath = resolve(sourceDir, clip.source);
  const desktopOut = resolve(desktopDir, `${clip.slug}.mp4`);
  const webpOut = resolve(mobileDir, `${clip.slug}.webp`);

  console.log(`\nProcessing ${clip.source}`);

  runFfmpeg(
    [
      "-y",
      "-ss",
      String(clip.start),
      "-i",
      sourcePath,
      "-t",
      String(clip.duration),
      "-an",
      "-vf",
      clip.hdr ? HDR_DESKTOP_FILTER : DESKTOP_FILTER,
      "-c:v",
      "libx264",
      "-preset",
      "slow",
      "-crf",
      "24",
      "-maxrate",
      "1.8M",
      "-bufsize",
      "3.6M",
      "-movflags",
      "+faststart",
      "-color_primaries",
      "bt709",
      "-color_trc",
      "bt709",
      "-colorspace",
      "bt709",
      desktopOut,
    ],
    `${clip.slug} desktop mp4`,
  );

  runFfmpeg(
    [
      "-y",
      "-ss",
      String(clip.start),
      "-t",
      String(clip.duration),
      "-i",
      sourcePath,
      "-an",
      "-vf",
      MOBILE_FILTER,
      "-c:v",
      "libwebp",
      "-quality",
      "68",
      "-compression_level",
      "6",
      "-loop",
      "0",
      webpOut,
    ],
    `${clip.slug} mobile webp`,
  );
}

console.log("\nVideo processing complete.");
