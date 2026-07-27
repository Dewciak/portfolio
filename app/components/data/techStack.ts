import Spline from "@/public/images/Tech-icons/spline.png";
import type {StaticImageData} from "next/image";
import type {IconType} from "react-icons";
import {
  SiAdobephotoshop,
  SiAmazonwebservices,
  SiAstro,
  SiBlender,
  SiCloudflare,
  SiCss3,
  SiDocker,
  SiFigma,
  SiGit,
  SiGithubactions,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPrisma,
  SiReact,
  SiShopify,
  SiTailwindcss,
  SiTypescript,
  SiWoocommerce,
  SiWordpress,
  SiZod,
} from "react-icons/si";

export interface TechItem {
  name: string;
  /** Vector logo. Preferred — no network request, scales cleanly. */
  Icon?: IconType;
  /** Raster fallback for logos react-icons does not ship. */
  image?: StaticImageData;
  color: string;
  /**
   * Marks a logo whose artwork is a wide wordmark rather than a square glyph.
   * It gets a wider box so it reads at the same visual weight as the others —
   * the SVG keeps its own aspect ratio, it is not stretched.
   */
  wide?: boolean;
}

export interface TechGroup {
  /** Key under the `tech.groups` namespace in the message catalogs. */
  id: "frontend" | "backend" | "cms" | "devops" | "design";
  items: TechItem[];
}

/**
 * Ordered by relevance to the work, not by how long I've used them.
 * Design/3D sits last on purpose so it reads as a bonus, not as the core skill set.
 */
export const techGroups: TechGroup[] = [
  {
    id: "frontend",
    items: [
      {name: "HTML", Icon: SiHtml5, color: "#E34F26"},
      {name: "CSS", Icon: SiCss3, color: "#1572B6"},
      {name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E"},
      {name: "TypeScript", Icon: SiTypescript, color: "#3178C6"},
      {name: "React", Icon: SiReact, color: "#61DAFB"},
      {name: "Next.js", Icon: SiNextdotjs, color: "#FFFFFF"},
      {name: "Astro", Icon: SiAstro, color: "#FF5D01"},
      {name: "Tailwind", Icon: SiTailwindcss, color: "#06B6D4"},
    ],
  },
  {
    id: "backend",
    items: [
      {name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E"},
      {name: "PHP", Icon: SiPhp, color: "#8892BF"},
      {name: "MySQL", Icon: SiMysql, color: "#4479A1"},
      {name: "Prisma", Icon: SiPrisma, color: "#FFFFFF"},
      {name: "Zod", Icon: SiZod, color: "#3E67B1"},
    ],
  },
  {
    id: "cms",
    items: [
      {name: "WordPress", Icon: SiWordpress, color: "#3858E9"},
      {name: "WooCommerce", Icon: SiWoocommerce, color: "#96588A", wide: true},
      {name: "Shopify", Icon: SiShopify, color: "#7AB55C"},
    ],
  },
  {
    id: "devops",
    items: [
      {name: "Git", Icon: SiGit, color: "#F05032"},
      {name: "GitHub Actions", Icon: SiGithubactions, color: "#2088FF"},
      {name: "Docker", Icon: SiDocker, color: "#2496ED"},
      {name: "Cloudflare", Icon: SiCloudflare, color: "#F38020"},
      {name: "AWS", Icon: SiAmazonwebservices, color: "#FF9900"},
    ],
  },
  {
    id: "design",
    items: [
      {name: "Figma", Icon: SiFigma, color: "#F24E1E"},
      {name: "Photoshop", Icon: SiAdobephotoshop, color: "#31A8FF"},
      {name: "Blender", Icon: SiBlender, color: "#E87D0D"},
      {name: "Spline", image: Spline, color: "#FFFFFF"},
    ],
  },
];
