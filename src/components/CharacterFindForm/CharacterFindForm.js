import { useForm } from "react-hook-form";

import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { genderArray, statusArray } from "../../constants";
import { characterActions } from "../../redux";

const CharacterFindForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const [query, setQuery] = useSearchParams();

  const submit = (obj) => {
    for (const key in obj) {
      if (obj[key] === "none" || obj[key] === "") delete obj[key];
    }
    setQuery(obj);
    dispatch(characterActions.setQuery(obj));
  };

  const res = () => {
    reset();
    setQuery("");
    dispatch(characterActions.setQuery());
  };

  return (
    <div className={"formWrapper"}>
      <form onChange={handleSubmit(submit)}>
        <div className={"form__group"}>
          <label className={"form__label"}>Name:</label>
          <input
            className={"form__field"}
            type={"text"}
            placeholder={"Rick Smith"}
            {...register("name")}
          />
        </div>
        <div>
          <label className={"form__label"}>Status:</label>
          <select {...register("status")} className={"form__select"}>
            {statusArray.map((v, index) => (
              <option key={index}>{v}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={"form__label"}>Gender:</label>
          <select {...register("gender")} className={"form__select"}>
            {genderArray.map((v, index) => (
              <option key={index}>{v}</option>
            ))}
          </select>
        </div>
      </form>
      <div>
        <button onClick={() => res()}>Reset</button>
      </div>
    </div>
  );
};

export { CharacterFindForm };
