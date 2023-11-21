import { Todo } from "@/Components/Todo/Todo";
import TodoList from "@/Components/TodoList/TodoList";
import TodoProvider from "@/Context/TodoContext";
import { useAppDispatch, useAppSelector } from "@/Hooks";
import { fetchProjects, projectsSlice } from "@/Redux/Projects/ProjectsSlice";
import { TODO_PAGES } from "@/Utils";
import { TProject } from "@/interface";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const ProjectPage = () => {
  const dispatch = useAppDispatch();
  const { id: projectId } = useParams();
  useEffect(() => {
    (async () => {
      try {
        await dispatch(fetchProjects());
        dispatch(projectsSlice.actions.getCurrentProject(projectId));
      } catch (error) {
        console.error(error);
        throw new Error("Can not fetch projects and get current project");
      }
    })();
  }, [projectId, dispatch]);

  const currentProject = useAppSelector(
    (state) => state.projects.currentProject
  );

  return (
    <div className="control">
      <header className="today-header">
        <div className="today-header__content">
          <div>
            <span className="text-[20px] font-bold mr-2">
              {currentProject.projectName}
            </span>
          </div>
        </div>
      </header>
      <TodoProvider>
        <section className="todo-list hide-scrollbar">
          <div className="m-auto max-w-[800px] w-full">
            <TodoList type={TODO_PAGES.PROJECT} />
          </div>
        </section>
        <section className="today-control">
          <div className="m-auto max-w-[800px] w-full">
            <Todo page={TODO_PAGES.PROJECT} />
          </div>
        </section>
      </TodoProvider>
    </div>
  );
};

export default ProjectPage;
