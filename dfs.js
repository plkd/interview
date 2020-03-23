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