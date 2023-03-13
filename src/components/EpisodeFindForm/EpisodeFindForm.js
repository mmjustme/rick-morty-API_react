import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { episodeActions } from "../../redux";

const EpisodeFindForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const [query, setQuery] = useSearchParams();
  // console.log(query.get("name"));
  // console.log(query.get("episode"));

  const submit = (obj) => {
    for (const key in obj) {
      if (obj[key] === "") delete obj[key];
    }
    setQuery(obj);
    dispatch(episodeActions.setQuery(obj));
  };

  const res = async () => {
    setQuery(query.delete("name", "episode"));

    dispatch(episodeActions.setQuery());
    reset();
  };

  return (
    <div className={"formWrapper"}>
      <form onChange={handleSubmit(submit)}>
        <div className={"form__group"}>
          <label className={"form__label"}>Name:</label>
          <input
            className={"form__field"}
            placeholder={"Anatomy Park"}
            type={"text"}
            {...register("name")}
          />
        </div>
        <div>
          <label className={"form__label"}>Episode:</label>
          <input
            className={"form__field"}
            placeholder={"S01E01"}
            type={"text"}
            {...register("episode")}
          />
        </div>
      </form>
      <button onClick={() => res()}>Reset</button>
    </div>
  );
};

export { EpisodeFindForm };
