import { RootState } from '../rootReducer';

const selectInnGroups = (state: RootState) => {
  return state.inn.allInns;
};

const selectAddInnForms = (state: RootState) => {
  return state.inn.newInnForm;
};

export { selectInnGroups, selectAddInnForms };
