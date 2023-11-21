import { useAppSelector, useFetch } from "@/Hooks";
import ProjectItem from "./ProjectItem";
import { fetchProjects } from "@/Redux/Projects/ProjectsSlice";

const ProjectList = () => {
  useFetch(fetchProjects());
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
