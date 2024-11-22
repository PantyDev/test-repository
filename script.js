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

        const value = `${data.text}`;

        const textElement = document.createElement("span");
        textElement.classList.add("text");
        textElement.innerText = value;
    
        const inputEditElement = inputSubmit.cloneNode();
        inputEditElement.value = value;
        inputEditElement.style.display = "none";

        element.append(textElement);
        element.append(inputEditElement);
    
        const typeElement = document.createElement("span");
        typeElement.classList.add("type");
        typeElement.innerText = selectValues[data.type];

        const selectEditElement = selectSubmit.cloneNode(true);
        selectEditElement.value = data.type;
        selectEditElement.style.display = "none";

        const editButtonElement = document.createElement("button");
        editButtonElement.innerText = "Редагувати";

        const deleteButtonElement = document.createElement("button");
        deleteButtonElement.innerText = "Видалити";

        const controlsWrapperElement = document.createElement("div");
        controlsWrapperElement.classList.add("controls-wrapper")
        controlsWrapperElement.append(typeElement);
        controlsWrapperElement.append(selectEditElement);
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



        let isEdit = false;
        editButtonElement.addEventListener("click", () => {
            isEdit = !isEdit;
            
            if(isEdit) {
                textElement.style.display = "none";
                typeElement.style.display = "none";

                inputEditElement.style.display = "block";
                selectEditElement.style.display = "block";
               

                editButtonElement.innerText = "Зберегти";

                
                
                return;
            }
            textElement.style.display = "block";
            typeElement.style.display = "block";
            
            inputEditElement.style.display = "none";
            selectEditElement.style.display = "none";

            const index = dataArray.findIndex(x => x.id === data.id);
            console.log(data.id)
            dataArray[index] = {
                id: data.id,
                text: inputEditElement.value,
                type: selectEditElement.value
            };
            localStorage.setItem("list", JSON.stringify(dataArray)); 
            renderItems();

            editButtonElement.innerText = "Редагувати";
        })
    }
};

initSelect();
renderItems();


buttonSubmit.disabled = !inputSubmit.value;
inputSubmit.addEventListener("input", () => {
    buttonSubmit.disabled = !inputSubmit.value;
});

buttonSubmit.addEventListener("click", () => {
    const inputValue = inputSubmit.value;
    if(!inputValue) return;

    dataArray.push({
        id: dataArray[dataArray.length - 1]?.id + 1 || 0,
        text: inputSubmit.value,
        type: selectSubmit.value
    });

    inputSubmit.value = "";
    
    localStorage.setItem("list", JSON.stringify(dataArray));  
    renderItems();
});
