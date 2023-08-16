import React from 'react';
import TodoItem from './TodoItem';
import {firestore} from './firebase';
import { useEffect } from 'react';
import {
  collection,
  addDoc,
  setDoc,
  doc,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";

class TodoApp extends React.Component {

  state = {
    todoInput: '',
    todos: []
  };

  componentDidMount() {
    this.loadFromLocalStorage();
    this.displayDateAndDay(); //현재 날짜 요일
  }

  //날짜, 요일을 반환하는 함수
  getTodayDateAndDay = () => {
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    const months = [
      "1월", "2월", "3월", "4월", "5월", "6월",
      "7월", "8월", "9월", "10월", "11월", "12월"
    ];
    const today = new Date();
    const month = months[today.getMonth()];
    const date = today.getDate();
    const dayOfWeek = daysOfWeek[today.getDay()];
    return { month, date, dayOfWeek };
  };

  //날짜와 요일을 표시하는 함수
  displayDateAndDay = () => {
    const { month, date, dayOfWeek } = this.getTodayDateAndDay();
    this.setState({ currentDate: `${month} ${date}일 (${dayOfWeek})` });
  };

  //할 일 항목의 완료 상태
  toggleTodoCompletion = index => {
  };

  //새로운 항목 추가
  addTodo = () => {
    const { todoInput, todos } = this.state;
    if (todoInput.trim() !== '') {
      const newTodo = { text: todoInput, completed: false };
      this.setState({ todos: [...todos, newTodo], todoInput: '' }, this.saveToLocalStorage);
    }
  };

  //항목 삭제
  deleteTodo = index => {
    const todos = [...this.state.todos];
    todos.splice(index, 1);
    this.setState({ todos }, this.saveToLocalStorage);
  };

  //항목 텍스트 수정
  editTodo = (index, newText) => {
    const todos = [...this.state.todos];
    if (todos[index].text !== newText) {
      todos[index].text = newText;
      this.setState({ todos }, this.saveToLocalStorage);
    }
  };

  //로컬 스토리지에 저장
  saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
  };

  //로컬 스토리지에서 항목 불러옴
  loadFromLocalStorage = () => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      this.setState({ todos: JSON.parse(storedTodos) });
    }
  };

  handleInputKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault(); // 기본 엔터키 동작 방지
      this.addTodo();
    }
  };

  render() {
    //파이어베이스에서 불러오려고 만들던거. 이거 무시해도 됩니두 삥삥맨
    // const schedule = firestore.collection("schedule");

    // schedule.get().then((docs) => {
    //   docs.forEach((doc)) => {
    //     if(doc.exists){
    //       todo
    //     }
    //   }
    // })

    const { todoInput, todos, currentDate } = this.state;

    // const todo = ['일정1', '일정2', '일정3'];

    return (

      <div className="centered-container">
        <div className="rounded-box">
          <h2>{currentDate}</h2>
          <p>오늘</p>
         
         <div className="schedule">
          <h2>일정</h2>
          <ul>
            {todo.map((item)=> (
              <Todolist/>
            ))}
          </ul>
         </div>
         
          {/* 노인 화면은 따로 일정 추가 부분이 필요없어서 일단 주석처리
          <div id="todoContainer">
            <input
              type="text"
              value={todoInput}
              onChange={e => this.setState({ todoInput: e.target.value })}
              onKeyDown={this.handleInputKeyDown}
              placeholder="일정을 추가하세요"
            />
            <button onClick={this.addTodo}>추가</button>
          </div> */}
          <ul>
            {todos.map((todo, index) => (
              <TodoItem
                key={index}
                todo={todo}
                index={index}
                toggleTodoCompletion={this.toggleTodoCompletion}
                editTodo={this.editTodo}
                deleteTodo={this.deleteTodo}
              />
            ))}
          </ul>
          
        </div>
      </div>
    );
  }
}

function Todolist (){
  return(
    <li>
    일정들
  </li>
  )
}

export default TodoApp;
