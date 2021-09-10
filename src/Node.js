export default class Node {
    constructor(data, parent, children, type, id) {
        this.data = data
        this.parent = parent
        this.children = children
        this.type = type
        this.id = id
    }
}
