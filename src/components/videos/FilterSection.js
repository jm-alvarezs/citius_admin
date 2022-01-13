import React, { useContext, useEffect, useState } from "react";
import { VideoTypeContext } from "../../context/VideoTypeContext";
import { CoachesContext } from "../../context/CoachesContext";
import { durations } from "../../utils";
import { ClassCategoryContext } from "../../context/ClassCategoryContext";
import { ClassTypeContext } from "../../context/ClassTypesContext";
import { VideosContext } from "../../context/VideosContext";

const FilterSection = ({ page }) => {
  const [query, setQuery] = useState("");
  const [coach, setCoach] = useState("");
  const [clase, setClase] = useState("");
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");
  const [tipo, setTipo] = useState("");
  const [duration, setDuration] = useState("");

  const { class_types, getClassTypes } = useContext(ClassTypeContext);

  const { video_types, getVideoTypes } = useContext(VideoTypeContext);

  const { coaches, getCoaches } = useContext(CoachesContext);

  const { class_categories, getClassCategories } =
    useContext(ClassCategoryContext);

  const { tags, getTags, getAllVideos, getPrograms, clearVideos } =
    useContext(VideosContext);

  useEffect(() => {
    getTags();
    getCoaches();
    getPrograms();
    getClassTypes();
    getVideoTypes();
    getClassCategories();
  }, []);

  useEffect(() => {
    clearVideos();
    getAllVideos(page, {
      class_type_id: clase,
      instructor_id: coach,
      video_type_id: tipo,
      class_category_id: category,
      tag_id: tag,
      query,
    });
  }, [tag, query, coach, page, tipo, category, clase]);

  const renderTipos = () => {
    if (Array.isArray(video_types)) {
      return [
        <option key="todos" value="">
          Todos
        </option>,
        ...video_types.map((video_type) => (
          <option
            key={video_type.video_type_id}
            value={video_type.video_type_id}
          >
            {video_type.name}
          </option>
        )),
      ];
    }
  };

  const renderCategoryFilters = () => {
    if (Array.isArray(class_categories)) {
      return [
        <option key="todos" value="">
          Todos
        </option>,
        ...class_categories.map((class_category) => (
          <option
            key={class_category.class_category_id}
            value={class_category.class_category_id}
          >
            {class_category.name}
          </option>
        )),
      ];
    }
  };

  const renderDurations = () => {
    return [
      <option key="Todas" value="">
        Todas
      </option>,
      ...durations.map((duration) => (
        <option key={duration} value={duration}>
          {duration}
        </option>
      )),
    ];
  };

  const renderClassCategories = () => {
    if (Array.isArray(class_types)) {
      return [
        <option key="todas" value="">
          Todas
        </option>,
        ...class_types.map((class_type) => (
          <option
            key={class_type.class_type_id}
            value={class_type.class_type_id}
          >
            {class_type.name}
          </option>
        )),
      ];
    }
  };

  const renderTargets = () => {
    if (Array.isArray(tags)) {
      return [
        <option key="todos" value="">
          Todos
        </option>,
        ...tags.map((current) => (
          <option key={current.tag_id} value={current.tag_id}>
            {current.name}
          </option>
        )),
      ];
    }
  };

  const renderFilters = () => {
    return (
      <div className="row align-items-center">
        <div className="col-12 col-md-2">
          <label className="mb-1">Impacto</label>
          <select
            value={tipo}
            className="form-control"
            onChange={(e) => setTipo(e.target.value)}
          >
            {renderTipos()}
          </select>
        </div>
        <div className="col-12 col-md-2">
          <label className="mb-1">Categoría</label>
          <select
            value={category}
            className="form-control"
            onChange={(e) => setCategory(e.target.value)}
          >
            {renderCategoryFilters()}
          </select>
        </div>
        <div className="col-12 col-md-2">
          <label className="mb-1">Clase</label>
          <select
            value={clase}
            className="form-control"
            onChange={(e) => setClase(e.target.value)}
          >
            {renderClassCategories()}
          </select>
        </div>
        <div className="col-12 col-md-2">
          <label className="mb-1">Coach</label>
          <select
            value={coach}
            className="form-control"
            onChange={(e) => setCoach(e.target.value)}
          >
            {renderCoaches()}
          </select>
        </div>
        <div className="col-12 col-md-2">
          <label className="mb-1">Duración</label>
          <select
            value={duration}
            className="form-control"
            onChange={(e) => setDuration(e.target.value)}
          >
            {renderDurations()}
          </select>
        </div>

        <div className="col-12 col-md-2">
          <label className="mb-1">Target</label>
          <select
            value={tag}
            className="form-control"
            onChange={(e) => setTag(e.target.value)}
          >
            {renderTargets()}
          </select>
        </div>
      </div>
    );
  };

  const renderCoaches = () => {
    if (coaches && coaches !== null) {
      return [
        <option key="0" value="">
          Todo
        </option>,
        ...coaches.map((coach) => (
          <option key={coach.instructor_id} value={coach.instructor_id}>
            {coach.name} {coach.last_name}
          </option>
        )),
      ];
    }
  };

  return (
    <div className="filter-card card no-scale shadow-sm">
      <div className="row align-items-center border-bottom pb-2 mb-3">
        <div className="col-12 col-md-4">
          <h5 className="mb-0">Filtros</h5>
        </div>
        <div className="col-12 col-md-8 text-right"></div>
      </div>
      <input
        type="text"
        value={query}
        className="form-control mb-3"
        placeholder="Buscar por nombre..."
        onChange={(e) => setQuery(e.target.value)}
      />
      {renderFilters()}
    </div>
  );
};

export default FilterSection;
