import {Typography, Colors, Spacings} from 'react-native-ui-lib';

const font = {
    lineHeight: 12, fontFamily: 'Roboto'
}

const reg = {
    fontWeight: '400'
}

const med = {
    fontWeight: '500'
}

const sem = {
    fontWeight: '600'
}

const bol = {
    fontWeight: '700'
}

const h1 = {
    fontSize: 32
}

const h2 = {
    fontSize: 24
}

const h3 = {
    fontSize: 20
}

const h4 = {
    fontSize: 16
}

const h5 = {
    fontSize: 15
}

const h6 = {
    fontSize: 14
}

const par = {
    fontSize: 15
}

Typography.loadTypographies({
    reg_h1: {...h1, ...reg, ...font},
    reg_h2: {...h2, ...reg, ...font},
    reg_h3: {...h3, ...reg, ...font},
    reg_h4: {...h4, ...reg, ...font},
    reg_h5: {...h5, ...reg, ...font},
    reg_h6: {...h6, ...reg, ...font},
    reg_par: {...par, ...reg, ...font},

    med_h1: {...h1, ...med, ...font},
    med_h2: {...h2, ...med, ...font},
    med_h3: {...h3, ...med, ...font},
    med_h4: {...h4, ...med, ...font},
    med_h5: {...h5, ...med, ...font},
    med_h6: {...h6, ...med, ...font},
    med_par: {...par, ...med, ...font},

    sem_h1: {...h1, ...sem, ...font},
    sem_h2: {...h2, ...sem, ...font},
    sem_h3: {...h3, ...sem, ...font},
    sem_h4: {...h4, ...sem, ...font},
    sem_h5: {...h5, ...sem, ...font},
    sem_h6: {...h6, ...sem, ...font},
    sem_par: {...par, ...sem, ...font},

    bol_h1: {...h1, ...bol, ...font},
    bol_h2: {...h2, ...bol, ...font},
    bol_h3: {...h3, ...bol, ...font},
    bol_h4: {...h4, ...bol, ...font},
    bol_h5: {...h5, ...bol, ...font},
    bol_h6: {...h6, ...bol, ...font},
    bol_par: {...par, ...bol, ...font},
  });