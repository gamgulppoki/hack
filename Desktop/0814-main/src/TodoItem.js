import React from 'react';

class TodoItem extends React.Component {
  state = {
    isEditing: false
  };

  // 편집 모드
  startEditing = () => {
    this.setState({ isEditing: true });
  };

  // 편집 취소할 때
  cancelEditing = () => {
    this.setState({ isEditing: false });
  };

  // 수정 내용을 저장
  handleEditSave = (e) => {
    if (e.key === 'Enter') {
      const { index, editTodo } = this.props;

      if (e.target.value.trim() !== '') {
        editTodo(index, e.target.value);
        this.setState({ isEditing: false }); // 편집 모드 종료
      }
    }
  };

  render() {
    const { todo, index, toggleTodoCompletion, deleteTodo } = this.props;
    const { isEditing } = this.state;

    return (
      <li>
        <span
          style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          onClick={this.startEditing}
        >
          {isEditing ? (
            <input
              type="text"
              defaultValue={todo.text}
              onKeyDown={this.handleEditSave}
              autoFocus
            />
          ) : (
            todo.text
          )}
        </span>

        <button onClick={() => deleteTodo(index)}>삭제</button>
      </li>
    );
  }
}


export default TodoItem;