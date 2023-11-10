import { TProject } from "@/interface";
import { MenuOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Projects.scss";
import { useAppDispatch } from "@/Hooks";
import { updateProject } from "@/Redux/Projects/ProjectsSlice";

type Props = {
  project: TProject;
};
const ProjectItem: React.FC<Props> = ({ project }) => {
  const dispatch = useAppDispatch();
  const [projectName, setProjectName] = useState<string>(project.projectName);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (project.isNew) {
      inputRef.current?.select();
    }
  }, []);

  const handleSaveName = async (updatedProject: TProject) => {
    try {
      await dispatch(updateProject(updatedProject)).unwrap();
    } catch (error) {
      console.error(error);
      throw new Error("Can not update project name");
    }
  };

  return (
    <NavLink
      to={`/home/project/${project.id}`}
      className="sidebarItem flex gap-2 items-center"
    >
      <MenuOutlined style={{ color: "#db4c3f" }} />
      <input
        ref={inputRef}
        className={`input-name text-medium ${
          !project.isNew ? "no-edit" : "focus"
        }`}
        type="text"
        value={projectName}
        onChange={(e) => {
          setProjectName(e.target.value);
        }}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            inputRef.current?.blur();
          }
        }}
        onBlur={() => {
          handleSaveName({
            id: project.id,
            projectName,
            todos: project.todos,
            createdAt: project.createdAt,
          });
        }}
      />
    </NavLink>
  );
};

export default ProjectItem;
