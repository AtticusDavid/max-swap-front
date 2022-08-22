import React, { ReactNode, useCallback } from 'react';

import dynamic from 'next/dynamic';
import { loadFull } from 'tsparticles';

import { logger } from 'src/utils/logger';

import styles from './Layout.module.scss';

const NavigationBar = dynamic(() => import('../NavigationBar'), { ssr: false });
const Particles = dynamic(() => import('react-tsparticles'), { ssr: false });

interface Props {
  children: ReactNode;
}
const particleOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 868.0624057955,
      },
    },
    color: {
      value: '#ffffff',
    },
    shape: {
      type: 'edge',
      stroke: {
        width: 0,
        color: '#000000',
      },
      polygon: {
        nb_sides: 5,
      },
      image: {
        src: 'img/github.svg',
        width: 100,
        height: 100,
      },
    },
    opacity: {
      value: 0.38481889460772545,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 15.782952832645451,
      color: '#ffffff',
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1.5782952832645452,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: false,
        rotateX: 789.1476416322727,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: false,
        mode: 'repulse',
      },
      onclick: {
        enable: true,
        mode: 'push',
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
} as const;

const Layout = ({ children }: Props) => {
  const particlesInit = useCallback(async engine => {
    if (typeof window === 'undefined') return;
    try {
      await loadFull(engine);
    } catch (e) {
      logger.error(e);
    }
  }, []);

  return (
    <div className={styles.container}>
      <Particles
        id="tsparticles"
        canvasClassName={styles.particle}
        init={particlesInit}
        options={particleOptions}
      />
      <NavigationBar />
      {children}
      <footer></footer>
    </div>
  );
};

export default Layout;
