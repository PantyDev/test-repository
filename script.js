const selectValues = ["Робити", "Незавершена робота", "На майбутнє"];

const dataArray = JSON.parse(localStorage.getItem("list")) || [];

const wrapper = document.querySelector(".wrapper");
const buttonSubmit = document.querySelector(".submit-button");
const inputSubmit = document.querySelector(".submit-input");
const selectSubmit = document.querySelector(".submit-select");

const initSelect = () => {
    for(i = 0; i < selectValues.length; i ++) {
        const elementOption = document.createElement("option");
        elementOption.value = i;
        elementOption.innerText = selectValues[i];

        selectSubmit.append(elementOption);
    }
}

const renderItems = () => {
    wrapper.innerHTML = "";
    for(i = 0; i < dataArray.length; i ++) {
        const data = dataArray[i];
    
        const element = document.createElement("div");
        element.classList.add("item");
    
        const textElement = document.createElement("span");
        textElement.classList.add("text");
        textElement.innerText = `${data.id} ${data.text}`;
    
        element.append(textElement);
    
        const typeElement = document.createElement("span");
        typeElement.classList.add("type");
        typeElement.innerText = selectValues[data.type];



        const editButtonElement = document.createElement("button");
        editButtonElement.innerText = "Редагувати";

        const deleteButtonElement = document.createElement("button");
        deleteButtonElement.innerText = "Видалити";

        const controlsWrapperElement = document.createElement("div");
        controlsWrapperElement.append(typeElement);
        controlsWrapperElement.append(editButtonElement);
        controlsWrapperElement.append(deleteButtonElement);

        element.append(controlsWrapperElement);

        wrapper.append(element);

        deleteButtonElement.addEventListener("click", () => {
            const index = dataArray.findIndex(x => x.id === data.id);
            dataArray.splice(index, 1);
            localStorage.setItem("list", JSON.stringify(dataArray));  
            
            renderItems();
        });
    }
};

renderItems();
initSelect();

buttonSubmit.addEventListener("click", () => {
    dataArray.push({
        id: dataArray[dataArray.length - 1]?.id + 1 || 0,
        text: inputSubmit.value,
        type: selectSubmit.value
    });

    inputSubmit.value = "";
    
    localStorage.setItem("list", JSON.stringify(dataArray));  
    renderItems();
});
