(function () {

  function createTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
  }

  function createTodoItemForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrap = document.createElement('div');
    let button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите новое дело';
    buttonWrap.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.setAttribute('disabled', 'true');
    button.setAttribute('id', 'btn-primary')
    button.textContent = 'Добавить дело';

    buttonWrap.append(button);
    form.append(input);
    form.append(button);

    return {
      form,
      input,
      button,
    }
  }

  function createTodolist() {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  }

  function createTodoApp(container, title = 'Список дел', key, args = []) {
    let todoAppItem = createTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodolist();

    container.append(todoAppItem);
    container.append(todoItemForm.form);
    container.append(todoList);

    const tabKey = JSON.stringify(key);
    localStorage.setItem('tabData', key);

    // проверка LS и обновление инфы на страницу
    liveUpdateLS(key);
    function liveUpdateLS(key) {
    const todoListLS = JSON.parse(localStorage.getItem('items'+key));
    if (todoListLS) {
      for (let i = 0; i < todoListLS.length; i++) {
        let LSitem = createTodoItem(todoListLS[i].text, todoListLS[i].done);

        if (todoListLS[i].done === 'true') {
          LSitem.item.classList.toggle('list-group-item-success');
        }
        LSitem.doneButton.addEventListener('click', () => {
          LSitem.item.classList.toggle('list-group-item-success');
          localS();
        })

        LSitem.deleteButton.addEventListener('click', () => {
          if (confirm('Вы уверены?')) {
            LSitem.item.remove();
            localS();
          }
        })
        todoList.append(LSitem.item);
        localS();
        }
      }
    }
    //создаем из массива, если не пуст
    createTodoArray(args);
    function createTodoArray (arr) {
      if(args != '') {
        for (let i = 0; i < args.length; i++) {
          let todoItem = createTodoItem(args[i].name, args[i].done);
          if (args[i].done === 'true') {
            todoItem.item.classList.toggle('list-group-item-success');
          }
          todoItem.doneButton.addEventListener('click', () => {
            todoItem.item.classList.toggle('list-group-item-success');
            localS();
          })
          todoItem.deleteButton.addEventListener('click', () => {
            if (confirm('Вы уверены?')) {
              todoItem.item.remove();
              localS();
            }
          })
          localS();
          todoList.append(todoItem.item);
        }
      }
    }
    //блокировка и проверка главной кнопки
    let buttonprimary = document.getElementById('btn-primary');
    todoItemForm.form.addEventListener('input', () => {
      if(todoItemForm.input.value) {
        buttonprimary.removeAttribute('disabled');
      } else {
        buttonprimary.setAttribute('disabled', 'true');
      }
    })
    //создание обычной карточки
    todoItemForm.form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!todoItemForm.input.value) {
        return;
      }

      let todoItem = createTodoItem(todoItemForm.input.value);

      todoItem.doneButton.addEventListener('click', () => {
        todoItem.item.classList.toggle('list-group-item-success');
        localS();
      })
      todoItem.deleteButton.addEventListener('click', () => {
        if (confirm('Вы уверены?')) {
          todoItem.item.remove();
          localS();
        }
      })
      todoList.append(todoItem.item);
      todoItemForm.input.value = '';
      localS();
      buttonprimary.setAttribute('disabled', 'true');
    })
    localS();
  };

  function createTodoItem(name, done = 'false') {
    let item = document.createElement('li');
    item.setAttribute('done', done);
    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.textContent = name;

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    return {
      item,
      doneButton,
      deleteButton,
    }
  };

  // local storage
  function localS() {
    const elementUl = document.querySelector('ul');
    const key = localStorage.getItem('tabData');
    const data = [];
    for (let element of elementUl.querySelectorAll('li')) {
      data.push( {
        key: key,
        text: element.textContent.replace('ГотовоУдалить', ''),
        done: element.getAttribute('done'),
      });
    }
    localStorage['items'+key] = JSON.stringify(data);
  }

  window.createTodoApp = createTodoApp;
})()
