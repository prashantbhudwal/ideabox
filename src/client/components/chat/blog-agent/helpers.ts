export function getContent(element: Element) {
  const clone = element.cloneNode(true) as HTMLElement;
  // remove style tags
  clone.querySelectorAll("style").forEach((el) => el.remove());
  // remove inline styles
  clone
    .querySelectorAll("[style]")
    .forEach((el) => el.removeAttribute("style"));
  // remove Tailwind classes
  clone
    .querySelectorAll("[class]")
    .forEach((el) => el.removeAttribute("class"));
  // remove svg
  clone.querySelectorAll("svg").forEach((el) => el.remove());
  // remove img
  clone.querySelectorAll("img").forEach((el) => el.remove());
  // remove iframe
  clone.querySelectorAll("iframe").forEach((el) => el.remove());
  // remove video
  clone.querySelectorAll("video").forEach((el) => el.remove());
  return clone.innerHTML;
}
