let deepTraversal1 = (node, nodeList = []) => {
    if(node !== null) {
        nodeList.push(node)
        let children = node.children
        for(let i = 0;i<children.length;i++) {
            deepTraversal1(children[i], nodeList)
        }
    }
    return nodeList
}

let deepTraversal2 = (node) => {
    let nodes = []
    if(node !== null) {
        nodes.push(node)
        let children = node.children
        for(let i=0;i<children.length;i++) {
            nodes = nodes.concat(deepTraversal2(children[i]))
        }
    }
    return nodes
}