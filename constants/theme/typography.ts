import { Typography } from 'react-native-ui-lib';

const font = {
  lineHeight: 12,
  fontFamily: 'Roboto',
};

const reg = {
  fontWeight: '400',
};

const med = {
  fontWeight: '500',
};

const sem = {
  fontWeight: '600',
};

const bol = {
  fontWeight: '700',
};

const h1 = {
  fontSize: 32,
};

const h2 = {
  fontSize: 24,
};

const h3 = {
  fontSize: 20,
};

const h4 = {
  fontSize: 16,
};

const h5 = {
  fontSize: 15,
};

const h6 = {
  fontSize: 14,
};

const par = {
  fontSize: 15,
};

export const loadTypographies = () =>
  Typography.loadTypographies({
    regH1: { ...h1, ...reg, ...font },
    regH2: { ...h2, ...reg, ...font },
    regH3: { ...h3, ...reg, ...font },
    regH4: { ...h4, ...reg, ...font },
    regH5: { ...h5, ...reg, ...font },
    regH6: { ...h6, ...reg, ...font },
    regPar: { ...par, ...reg, ...font },

    medH1: { ...h1, ...med, ...font },
    medH2: { ...h2, ...med, ...font },
    medH3: { ...h3, ...med, ...font },
    medH4: { ...h4, ...med, ...font },
    medH5: { ...h5, ...med, ...font },
    medH6: { ...h6, ...med, ...font },
    medPar: { ...par, ...med, ...font },

    semH1: { ...h1, ...sem, ...font },
    semH2: { ...h2, ...sem, ...font },
    semH3: { ...h3, ...sem, ...font },
    semH4: { ...h4, ...sem, ...font },
    semH5: { ...h5, ...sem, ...font },
    semH6: { ...h6, ...sem, ...font },
    semPar: { ...par, ...sem, ...font },

    bolH1: { ...h1, ...bol, ...font },
    bolH2: { ...h2, ...bol, ...font },
    bolH3: { ...h3, ...bol, ...font },
    bolH4: { ...h4, ...bol, ...font },
    bolH5: { ...h5, ...bol, ...font },
    bolH6: { ...h6, ...bol, ...font },
    bolPar: { ...par, ...bol, ...font },
  });
