import { CheckOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { TTodo } from "src/interface";
import TodoItem from "../TodoList/TodoItem";

type Props = {
  isOpenEditTodoModal: boolean;
  setIsOpenEditTodoModal: React.Dispatch<React.SetStateAction<boolean>>;
  todo: TTodo;
};

const EditTodoModal: React.FC<Props> = ({
  isOpenEditTodoModal,
  setIsOpenEditTodoModal,
  todo,
}) => {
  return (
    <Modal
      destroyOnClose={true}
      width={"900px"}
      centered
      open={isOpenEditTodoModal}
      onCancel={() => {
        setIsOpenEditTodoModal(false);
      }}
      footer={null}
    >
      <div className="flex gap-2 w-full">
        <div className="flex basis-[75%]">
          <TodoItem todo={todo} type="SHORT" />
        </div>
        <div className="basis-[25%]">2</div>
      </div>
    </Modal>
  );
};

export default EditTodoModal;
