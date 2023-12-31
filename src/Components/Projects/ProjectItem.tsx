import { TProject } from "@/interface";
import { MenuOutlined } from "@ant-design/icons";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Projects.scss";
import { useAppDispatch, useAppSelector } from "@/Hooks";
import { deleteProject, updateProject } from "@/Redux/Projects/ProjectsSlice";
import { Dropdown } from "antd";
import Spinning from "@/Pages/LoadingPage/Spinning";

type Props = {
  project: TProject;
};

/**
 *
 * @param project data of the current project
 * @returns
 */
const ProjectItem: React.FC<Props> = ({ project }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState<string>(project.projectName);
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const initProjectName = useRef<string>(project.projectName);

  const projects = useAppSelector((state) => state.projects.projects);

  useEffect(() => {
    if (project.isNew) {
      inputRef.current?.select();
      inputRef.current?.click();
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

  const items = useMemo(() => {
    return [
      {
        label: <p>Delete</p>,
        key: "0",
        onClick: async () => {
          setIsLoadingDelete(true);
          await dispatch(deleteProject(project)).unwrap();
          setIsLoadingDelete(false);
          navigate("/home");
        },
      },
    ];
  }, []);
  return (
    <Dropdown menu={{ items }} trigger={["contextMenu"]}>
      <div>
        {isLoadingDelete ? (
          <Spinning />
        ) : (
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
                if (
                  projects.some(
                    (proj) =>
                      proj.projectName === projectName && proj.id !== project.id
                  )
                ) {
                  inputRef.current?.select();
                } else {
                  if (projectName === "") {
                    setProjectName(initProjectName.current);
                  }
                  handleSaveName({
                    id: project.id,
                    projectName,
                    todos: project.todos,
                    createdAt: project.createdAt,
                  });
                }
              }}
            />
          </NavLink>
        )}
      </div>
    </Dropdown>
  );
};

export default ProjectItem;
