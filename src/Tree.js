import Node from "./Node";

export default class Tree  {
    constructor(node) {
        const { data, parent, children, type, id } = node
        this.root = new Node(data, parent, children, type, id)
    }

    traverseDF(cb) {
        // Обходит узлы дерева с DFS
    }

    traverseBF(cb) {
        // Обходит узлы дерева с BFS
    }

    contains(data, traversal) {
        // ищет узел в дереве
    }

    add(data, toData, traverse) {
        //
    }

    remove(child, parent) {

    }

    getTree() {

    }
}
