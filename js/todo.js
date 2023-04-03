const todoList = [];
const itemTemplate = {
    id: 0,
    body: "",
    isActive: true
}


function newTodoItem(collection, template, body) {
    let itemTemp = { ...template };
    try {
        let sizeOfCollection = collection.length;
        let last_element = collection[sizeOfCollection - 1];
        // si existe  un elemento suma el id + 1 y genera el sig id, si no es 1
        let id_ = (last_element) ? last_element.id + 1 : sizeOfCollection + 1;
        // creamos una copia de template con el metodo spread
        itemTemp.id = id_;
        itemTemp.body = body;
        return itemTemp;
    } catch (error) {
        console.error(`Ocurrio un error al tratar de crear la nota: ${text}, detalles en la sig. linea\n` + error);
    };
}


function AddNoteToStack(collection, item) {
    /**
     * Agrega notas a colección de notas
     * @notes Array
     * @note Object
     */
    try {
        // si la nota existe la agrega
        if (item) {
            collection.push(item);
            return collection;
        }
    } catch (error) {
        console.error(error);
    };

};

function totalTodo(status = true, collection) {
    let count = collection.map(item => item.isActive == status);
    let total = count.filter(function (element) {
        if (element) return element
    }).length;
    document.querySelector("#counter").innerHTML = total;
}
function findNote(id, collection) {
    // Busca una nota por @id y la retorna
    let resp = collection.find(nota => nota.id == id);
    return resp;
};

function closeNote(id, collection) {

    // Cierra la nota por @id nota
    let temporal_note = {}
    let indice = undefined;
    try {
        // busca nota y la almacena en variable
        temporal_note = findNote(id, collection);
        if (temporal_note) {
            // si la nota existe se cierra o se reactiva
            (temporal_note.isActive) ? temporal_note.isActive = false : temporal_note.isActive = true;
            // buscamos el indice de la nota
            indice = collection.findIndex((nota) => nota.id === id);
            // se actualiza la nota al stack
            collection[indice] = temporal_note;

        }
    } catch (error) {
        console.error("error");
    }
}

function DeleteItem(id, collection) {
    // Elimina la nota por @id nota
    let temporal_note = {}
    let indice = undefined;
    try {
        // busca nota y la almacena en variable
        temporal_note = findNote(id, collection);
        if (temporal_note) {
            indice = collection.findIndex((nota) => nota.id === id);
            // se elimina la nota al stack
            collection.splice(indice, 1);
        }
    } catch (error) {
        console.error("error, mas detalles:\n" + error);
    }
}


function checker(id) {
    /**
     * Funcion invocada por cada checkbox
     */
    let ide = id.id;
    closeNote(ide, todoList);
    render(todoList)
}

function deleteTodo(id) {
    // elimina todo del stack 
    setTimeout(() => {
        DeleteItem(id.id, todoList);
        render(todoList);
    }, 300);

}


function render(collection) {
    totalTodo(true, todoList);


    let data = collection
    const content = document.querySelector("#todos")
    content.innerHTML = data.map(item => {

        return (`<div class="todo--item">
            <div class="icon">
              <label>
                <input type="checkbox" class="check">
                <div class="round--icon item ${item.isActive ? '' : 'active'}"  onclick="checker(this)" id="${item.id}">
                  <svg style="display:${item.isActive ? 'none' : 'block'};"  xmlns="http://www.w3.org/2000/svg" width="11" height="9">
                    <path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6" />
                  </svg>
                </div>
              </label>
          
            </div>
            <div class="item--content">
              <p style="width:100%; padding:4px;" class="${item.isActive ? '' : 'lineT'}"  onclick="checker(this)" id="${item.id}">${item.body}</p>
              <a href="#" class="close--cross" >
                <img src="./images/icon-cross.svg" alt="close" onclick="deleteTodo(this)" id="${item.id}">
              </a>
            </div>
          </div>`)



    }).join('')


}


