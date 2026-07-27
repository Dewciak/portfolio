"use client";

import {useTranslations} from "next-intl";
import Image, {StaticImageData} from "next/image";
import Link from "next/link";
import {useState} from "react";
import {BsThreeDotsVertical} from "react-icons/bs";
import {FaRegStar, FaUserCircle} from "react-icons/fa";
import {FaArrowLeft, FaArrowRight, FaPlus} from "react-icons/fa6";
import {FiArrowUpRight} from "react-icons/fi";
import {IoIosClose, IoMdRefresh} from "react-icons/io";
import {LuSettings2} from "react-icons/lu";

import portfolioData from "@/app/components/textContent/Portfolio.json";
import ansbbImage from "@/public/images/ansbb.webp";
import ansbbLogo from "@/public/images/ansbbLogo.png";
import bailiffImage from "@/public/images/BailiffLong.webp";
import bailiffLogo from "@/public/images/BailiffLogo.webp";
import ansbbMobile from "@/public/images/ansbb-mobile.webp";
import bailiffMobile from "@/public/images/bailiff-mobile.webp";
import carpentryMobile from "@/public/images/carpentry-mobile.webp";
import infotaxMobile from "@/public/images/infotax-mobile.webp";
import patrycjaMobile from "@/public/images/patrycja-mobile.webp";
import patrycjaLogo from "@/public/images/FotoLogo.png";
import carpentryImage from "@/public/images/StolarstwoKomendera.webp";
import carpentryLogo from "@/public/images/StolarstwoLogo.png";
import infotaxImage from "@/public/images/infotax.webp";
import infotaxLogo from "@/public/images/infotaxLogo.png";
import patrycjaImage from "@/public/images/patrycja.webp";

const images: Record<string, StaticImageData> = {
  bailiffImage,
  carpentryImage,
  infotaxImage,
  ansbbImage,
  patrycjaImage,
};

const logos: Record<string, StaticImageData> = {
  bailiffImage: bailiffLogo,
  carpentryImage: carpentryLogo,
  infotaxImage: infotaxLogo,
  ansbbImage: ansbbLogo,
  patrycjaImage: patrycjaLogo,
};

/** Narrow-viewport captures. Projects without one fall back to the desktop shot. */
const mobileImages: Record<string, StaticImageData> = {
  bailiffMobile,
  carpentryMobile,
  infotaxMobile,
  ansbbMobile,
  patrycjaMobile,
};

const projects = portfolioData.map((project) => ({
  ...project,
  image: images[project.image],
  logo: logos[project.image],
  mobileImage: "mobileImage" in project ? mobileImages[project.mobileImage as string] : undefined,
}));

const Portfolio = () => {
  const t = useTranslations("portfolio");
  const [selectedWebsite, setSelectedWebsite] = useState(0);
  const activeProject = projects[selectedWebsite];
  const activeTitle = t(`projects.${activeProject.id}.title`);

  return (
    <section id='Portfolio' className='portfolio-section mx-auto mt-32 w-[calc(100%-2rem)] max-w-[1240px] md:mt-48'>
      <h2 className='mb-10 text-center text-4xl font-semibold text-white md:mb-14 md:text-5xl'>{t("heading")}</h2>

      <div className='portfolio-browser'>
        <div className='portfolio-browser__tabs'>
          <div aria-hidden='true' className='portfolio-traffic-lights'>
            <i className='bg-[#ff5f57]' />
            <i className='bg-[#febc2e]' />
            <i className='bg-[#28c840]' />
          </div>

          <div role='tablist' aria-label={t("tablist")} className='portfolio-tablist'>
            {projects.map((project, index) => {
              const isSelected = selectedWebsite === index;

              return (
                <button
                  key={project.id}
                  id={`portfolio-tab-${index}`}
                  type='button'
                  role='tab'
                  aria-controls='portfolio-preview'
                  aria-selected={isSelected}
                  onClick={() => setSelectedWebsite(index)}
                  className={`portfolio-tab ${isSelected ? "portfolio-tab--active" : ""}`}
                >
                  <Image src={project.logo} alt='' width={20} height={20} className='h-5 w-5 shrink-0 object-contain' />
                  <span className='min-w-0 flex-1 truncate'>{t(`projects.${project.id}.tabTitle`)}</span>
                  <IoIosClose aria-hidden='true' className='shrink-0 text-white/40' size={18} />
                </button>
              );
            })}
          </div>

          <div aria-hidden='true' className='portfolio-new-tab'>
            <FaPlus size={14} />
          </div>
        </div>

        <div className='portfolio-toolbar'>
          <div aria-hidden='true' className='hidden items-center gap-4 text-white/45 sm:flex'>
            <FaArrowLeft />
            <FaArrowRight />
            <IoMdRefresh />
          </div>
          <Link
            href={activeProject.link}
            target='_blank'
            rel='noreferrer'
            className='portfolio-address'
            aria-label={t("openInNewTab", {title: activeTitle})}
          >
            <span aria-hidden='true' className='grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/[0.06]'>
              <LuSettings2 size={14} />
            </span>
            <span className='truncate'>{activeProject.link.replace(/^https?:\/\//, "")}</span>
          </Link>
          <div aria-hidden='true' className='hidden shrink-0 items-center gap-4 text-white/55 sm:flex'>
            <FaRegStar />
            <FaUserCircle />
            <BsThreeDotsVertical />
          </div>
        </div>

        <div
          key={activeProject.id}
          id='portfolio-preview'
          role='tabpanel'
          aria-labelledby={`portfolio-tab-${selectedWebsite}`}
          className='portfolio-preview relative h-[520px] overflow-y-auto bg-[#ecebe7] sm:h-[560px] lg:h-[650px]'
        >
          {/* Both are lazy: a display:none image never intersects the viewport,
              so the variant for the other breakpoint is never downloaded. */}
          {activeProject.mobileImage && (
            <Image
              src={activeProject.mobileImage}
              alt={t("previewAlt", {title: activeTitle})}
              sizes='calc(100vw - 32px)'
              quality={72}
              loading='lazy'
              placeholder='blur'
              className='mx-auto h-auto w-full animate-[portfolioReveal_.45s_ease-out] md:hidden'
            />
          )}
          <Image
            src={activeProject.image}
            alt={t("previewAlt", {title: activeTitle})}
            sizes='(min-width: 1280px) 1240px, calc(100vw - 64px)'
            quality={72}
            loading='lazy'
            placeholder='blur'
            className={`mx-auto h-auto w-full animate-[portfolioReveal_.45s_ease-out] ${
              activeProject.mobileImage ? "hidden md:block" : ""
            }`}
          />
        </div>
      </div>

      <article className='portfolio-case-study'>
        <div className='min-w-0'>
          <p className='mb-5 text-xs font-medium uppercase tracking-[0.2em] text-white/40'>
            {t("counter", {
              current: String(selectedWebsite + 1).padStart(2, "0"),
              total: String(projects.length).padStart(2, "0"),
            })}
          </p>
          <h3 className='text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl'>{activeTitle}</h3>
          <p className='mt-2 text-lg text-white/50'>{t(`projects.${activeProject.id}.subTitle`)}</p>
          <p className='mt-6 max-w-[720px] text-base leading-7 text-white/70'>
            {t(`projects.${activeProject.id}.description`)}
          </p>
        </div>

        <div className='flex min-w-[250px] flex-col items-start gap-7 lg:items-end'>
          <div className='flex flex-wrap gap-2 lg:justify-end'>
            {activeProject.tech.split(" ").map((tech) => (
              <span key={tech} className='portfolio-tech'>
                {tech}
              </span>
            ))}
          </div>
          <Link href={activeProject.link} target='_blank' rel='noreferrer' className='portfolio-cta'>
            {t("visit")}
            <FiArrowUpRight />
          </Link>
        </div>
      </article>
    </section>
  );
};

export default Portfolio;
