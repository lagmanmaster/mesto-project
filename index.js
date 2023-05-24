const popupProfile = document.querySelector(".popup");
const popupOpenZoom = document.querySelector(".popup_type_zoom");
const popupAdd = document.querySelector(".popup_type_add");
const popupEdit = document.querySelector(".popup_type_edit");
const popupCloseButtons = document.querySelectorAll(".popup__close");
const popupInputName = document.querySelector(".popup__input_name");
const popupInputDescription = document.querySelector(".popup__input_description");
const popupInputNameAdd = document.querySelector(".popup__input_name-add");
const popupInputDescriptionAdd = document.querySelector(".popup__input_description-add");
const cardSubmitAddButton = document.querySelector(".popup__save-add_button");
const popupImgTitle = document.querySelector(".popup__caption");
const popupImgLink = document.querySelector(".popup__image");
const cardsElements = document.querySelector(".elements");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const cardTemplate = document.querySelector("#card-template").content;

function openPopup(popup) {
	popup.classList.add("popup_opened");
}
profileEditButton.addEventListener("click", function() {
	openPopup(popupProfile);
	popupInputName.value = profileTitle.textContent;
	popupInputDescription.value = profileDescription.textContent;
});

function closePopup(popup) {
	popup.classList.remove("popup_opened");
}
profileAddButton.addEventListener("click", function() {
	openPopup(popupAdd);
});
popupCloseButtons.forEach((button) => {
	const buttonsPopup = button.closest(".popup");
	button.addEventListener("click", () => closePopup(buttonsPopup));
});

function zoomImage(name, link) {
	openPopup(popupOpenZoom);
	popupImgTitle.textContent = name;
	popupImgLink.src = link;
	popupImgLink.alt = name;
}

function changeProfile(evt) {
	evt.preventDefault();
	profileTitle.textContent = popupInputName.value;
	profileDescription.textContent = popupInputDescription.value;
	popupInputName.value = "";
	popupInputDescription.value = "";
	closePopup(popupProfile);
}
popupEdit.addEventListener("submit", changeProfile);

function createCard(cardData) {
	const {
		name, link
	} = cardData;
	const cardElement = cardTemplate.querySelector(".elements__card").cloneNode(true);
	const cardPicture = cardElement.querySelector(".elements__image");
	const cardName = cardElement.querySelector(".elements__title");
	cardName.textContent = name;
	cardPicture.src = link;
	cardPicture.alt = name;
	const cardDeleteButton = cardElement.querySelector(".elements__card-bin");
	cardDeleteButton.addEventListener("click", function() {
		cardElement.remove();
	});
	cardElement.querySelector(".elements__button").addEventListener("click", function(evt) {
		evt.target.classList.toggle("elements__button-active");
	});
	cardPicture.addEventListener("click", () => zoomImage(name, link));
	return cardElement;
}
function renderCard(cardData, container) {
	container.prepend(createCard(cardData));
}
initialCards.forEach((card) => {
	renderCard(card, cardsElements);
});

function changeElem(evt) {
	const elemObj = {
		name: popupInputNameAdd.value,
		link: popupInputDescriptionAdd.value
	};
	const newElem = createCard(elemObj);
	renderCard(elemObj, cardsElements);
	evt.preventDefault();
	popupInputNameAdd.value = "";
	popupInputDescriptionAdd.value = "";
	closePopup(popupAdd);
}
cardSubmitAddButton.addEventListener("click", changeElem);