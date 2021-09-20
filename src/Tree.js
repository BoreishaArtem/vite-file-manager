import Node from "./Node";

export default class Tree  {
    constructor(node) {
        const { path, name, children, id, type } = node
        this.root = new Node(path, name, children, id, type)
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
