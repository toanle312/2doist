import { Todo } from "@/Components/Todo/Todo";
import TodoList from "@/Components/TodoList/TodoList";
import TodoProvider from "@/Context/TodoContext";
import { useAppDispatch, useAppSelector } from "@/Hooks";
import {
  fetchProjects,
  getCurrentProject,
  projectsSlice,
} from "@/Redux/Projects/ProjectsSlice";
import { TODO_PAGES } from "@/Utils";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProjectPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id: projectId } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const proj = await dispatch(
          getCurrentProject(projectId as string)
        ).unwrap();
        if (proj === undefined) {
          navigate("not-found");
        }
      } catch (error) {
        console.error(error);
        throw new Error("Can not get current project");
      }
    })();
  }, [projectId]);

  const currentProject = useAppSelector(
    (state) => state.projects.currentProject
  );

  return (
    <div className="control">
      <header className="today-header">
        <div className="today-header__content">
          <div>
            <span className="text-[20px] font-bold mr-2">
              {currentProject?.projectName}
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
