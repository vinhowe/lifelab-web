export default function preventUnloadEventHandler(
  event: BeforeUnloadEvent
): void {
  event.preventDefault();
  event.returnValue = "";
}
