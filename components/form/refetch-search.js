import React, { useMemo } from "react";
import ArrowDownSLineIcon from "remixicon-react/ArrowDownSLineIcon";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import OutsideAlerter from "../../utils/hooks/useClickOutside";
import { debounce } from "lodash";
import Spinner from "../loader/spinner";
import Scrollbars from "react-custom-scrollbars";

const RefetchSearch = ({
  value,
  onChange,
  name,
  fetchOptions = () => {},
  debounceTimeout = 400,
  label = "",
  placeholder = "",
  disabled,
  refetch = false,
  intialValue = {},
}) => {
  const { t: tl } = useTranslation();
  const [active, setActive] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  let selected = options?.find((item) => item.value == value);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]);
      setFetching(true);
      fetchOptions(value)?.then((newOptions) => {
        setOptions(newOptions);
        setFetching(false);
      });
    };
    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  const fetchOnFocus = () => {
    if (!disabled) {
      setActive(true);
      if (!options?.length || refetch) {
        debounceFetcher("");
      }
    } else return;
  };
  return (
    <div
      className={`form-item interface ${Boolean(active) ? "active" : ""}`}
      onClick={fetchOnFocus}
      disabled={disabled}
    >
      <div className="label">{`${tl(label)}`}</div>
      <div className="placeholder">
        {selected
          ? selected.label
          : intialValue?.label
          ? intialValue?.label
          : tl(placeholder)}
      </div>
      <ArrowDownSLineIcon className="suffix" size={20} />
      <OutsideAlerter visible={active} setVisible={setActive}>
        <div className="option refetch-search">
          <div className="search-input-wrapper">
            <input
              className="search-input"
              placeholder="search"
              onChange={(e) => debounceFetcher(e.target.value)}
            />
          </div>
          <Scrollbars autoHeight autoHide autoHeightMin={350}>
            {fetching ? (
              <Spinner />
            ) : options?.length === 0 ? (
              <span className="not-found-text">{tl("not.found")}</span>
            ) : (
              options?.map((item, key) => (
                <div
                  key={key}
                  className="option-item"
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange({ ...item, name });
                    setActive(false);
                  }}
                >
                  <div className="status">
                    <input
                      onChange={() => {}}
                      type="radio"
                      id="option"
                      name={name}
                      value={selected?.value}
                      checked={selected?.value === item.value}
                    />
                  </div>
                  <label htmlFor="#option" className="label">
                    {item.label}
                  </label>
                </div>
              ))
            )}
          </Scrollbars>
        </div>
      </OutsideAlerter>
    </div>
  );
};

export default RefetchSearch;
