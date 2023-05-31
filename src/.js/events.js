export default class Events {
  static send(event, data=null) {
    event = new CustomEvent(event, {detail: data});
    document.dispatchEvent(event)
  }
}