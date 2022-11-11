import { FILTERS } from "../../utils";

import { useTranslation } from "react-i18next";

import "./styles.css";

const FiltersBar = ({ setFilterType }) => {
  const { t } = useTranslation();

  return (
    <div className="filters-bar">
      <button
        className="filters-bar__btn"
        onClick={() => setFilterType(FILTERS.ALL)}>
        {t("all")}
      </button>
      <button
        className="filters-bar__btn"
        onClick={() => setFilterType(FILTERS.DONE)}>
        {t("done")}
      </button>
      <button
        className="filters-bar__btn"
        onClick={() => setFilterType(FILTERS.TODO)}>
        {t("todo")}
      </button>
    </div>
  );
};

export default FiltersBar;
