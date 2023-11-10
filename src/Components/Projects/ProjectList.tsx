import { useAppDispatch, useAppSelector } from "@/Hooks";
import ProjectItem from "./ProjectItem";
import { useEffect } from "react";
import { fetchProjects } from "@/Redux/Projects/ProjectsSlice";

const ProjectList = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      try {
        dispatch(fetchProjects());
      } catch (error) {
        console.log(error);
        throw new Error("Can not fetch projects");
      }
    })();
  }, []);
  const projects = useAppSelector((state) => state.projects.projects);

  return (
    <ul className="flex flex-col">
      {projects?.map((project) => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </ul>
  );
};

export default ProjectList;
