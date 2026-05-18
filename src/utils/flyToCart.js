export const flyToCart = (imgElement, cartIconElement) => {
  if (!imgElement || !cartIconElement) return;

  const imgRect = imgElement.getBoundingClientRect();
  const cartRect = cartIconElement.getBoundingClientRect();

  const flyingImg = imgElement.cloneNode(true);

  flyingImg.style.position = "fixed";
  flyingImg.style.left = imgRect.left + "px";
  flyingImg.style.top = imgRect.top + "px";
  flyingImg.style.width = imgRect.width + "px";
  flyingImg.style.height = imgRect.height + "px";
  flyingImg.style.zIndex = 9999;
  flyingImg.style.transition = "all 0.8s ease-in-out";
  flyingImg.style.borderRadius = "10px";
  flyingImg.style.pointerEvents = "none";

  document.body.appendChild(flyingImg);

  requestAnimationFrame(() => {
    flyingImg.style.left = cartRect.left + "px";
    flyingImg.style.top = cartRect.top + "px";
    flyingImg.style.width = "20px";
    flyingImg.style.height = "20px";
    flyingImg.style.opacity = "0.5";
  });

  setTimeout(() => {
    flyingImg.remove();
  }, 800);
};