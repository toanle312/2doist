import ControlHeader from "@/Components/ControlHeader/ControlHeader";
import { Todo } from "@/Components/Todo/Todo";
import TodoList from "@/Components/TodoList/TodoList";
import TodoProvider from "@/Context/TodoContext";
import ViewProvider from "@/Context/ViewContext";
import { useAppDispatch, useAppSelector } from "@/Hooks";
import { projectsSlice } from "@/Redux/Projects/ProjectsSlice";
import { TODO_PAGES } from "@/Utils";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProjectPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id: projectId } = useParams();

  const currentProject = useAppSelector(
    (state) => state.projects.currentProject
  );

  console.log(currentProject);

  useEffect(() => {
    dispatch(projectsSlice.actions.getProject(projectId as string));
    if (currentProject === undefined) {
      navigate("not-found");
    }
  }, [projectId]);

  return (
    <ViewProvider>
      <div className="control">
        <header className="page-header">
          <ControlHeader page={TODO_PAGES.PROJECT} />
        </header>
        <TodoProvider>
          <section className="todo-list hide-scrollbar">
            <div className="m-auto max-w-[800px] w-full">
              <TodoList page={TODO_PAGES.PROJECT} />
            </div>
          </section>
          <section className="page-control">
            <div className="m-auto max-w-[800px] w-full">
              <Todo page={TODO_PAGES.PROJECT} />
            </div>
          </section>
        </TodoProvider>
      </div>
    </ViewProvider>
  );
};

export default ProjectPage;
