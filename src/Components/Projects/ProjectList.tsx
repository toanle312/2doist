import { useAppSelector } from "@/Hooks";
import ProjectItem from "./ProjectItem";

const ProjectList = () => {
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
