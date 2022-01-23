// Add event listener to all node buttons
document.addEventListener('click', function (e) {
    if (e.target && e.target.id == "btn-create-tree")
        createTree();
    else if (e.target && e.target.classList.contains('btn-add'))
        addNode(e.target);
    else if (e.target && e.target.classList.contains('btn-remove'))
        removeNode(e.target);
    else if (e.target && e.target.classList.contains('btn-edit'))
        editNode(e.target);
    else if (e.target && e.target.classList.contains('btn-save'))
        saveNode(e.target);
});

// Create a tree - Add the root node
function createTree() {
    // Root node template
    let rootNode = `<ul class="tree-children root">
                        <li class="tree-leaf root">
                            <div class="tree-node root on-edit">
                                <div class="node-text">
                                    <span class="node-text-main"></span>
                                    <input class="node-text-temp" type="text" placeholder="Your text" autofocus>
                                </div>
                                <div class="node-btns">
                                    <button class="btn-add"></button>
                                    <button class="btn-edit"></button>
                                    <button class="btn-save"></button>
                                    <button class="btn-remove"></button>
                                </div>
                            </div>
                        </li>
                    </ul>`;

    // Hide tree header and add the root node to the tree
    document.querySelector('.tree-header').classList.add("hide");
    document.querySelector("#tree-map").innerHTML += rootNode;
}

// Add a new node to tree already created
function addNode(element) {
    // A new node list template - Tree children
    let newNodeList = `<ul class="tree-children">
                            <li class="tree-leaf">
                                <div class="tree-node on-edit">
                                    <div class="node-text">
                                        <span class="node-text-main">1</span>
                                        <input class="node-text-temp" type="text" placeholder="Your text" autofocus>
                                    </div>
                                    <div class="node-btns">
                                        <button class="btn-add"></button>
                                        <button class="btn-edit"></button>
                                        <button class="btn-save"></button>
                                        <button class="btn-remove"></button>
                                    </div>
                                </div>
                            </li>
                        </ul>`;

    // A new node element template - Tree leaf
    let newNode = `<li class="tree-leaf">
                        <div class="tree-node on-edit">
                            <div class="node-text">
                                <span class="node-text-main">1</span>
                                <input class="node-text-temp" type="text" placeholder="Your text" autofocus>
                            </div>
                            <div class="node-btns">
                                <button class="btn-add"></button>
                                <button class="btn-edit"></button>
                                <button class="btn-save"></button>
                                <button class="btn-remove"></button>
                            </div>
                        </div>
                    </li>`;

    let treeLeaf = element.closest(".tree-leaf");
    let treeChildren = element.closest(".tree-leaf").querySelector('.tree-children');

    // Check the new element is a node or node list and add the class "first" to the first leaf of the tree. This class will help us to design the line connecting nodes.
    if (treeChildren) {
        treeChildren.innerHTML += newNode;
        treeLeaf.querySelector('.tree-leaf').classList.remove('first');
    }
    else {
        treeLeaf.innerHTML += newNodeList;
        treeLeaf.querySelector('.tree-leaf').classList.add('first');
    }
}

// Remove a node
function removeNode(element) {
    // Show the confirm modal
    let imgPath = "assets/trash.svg";
    let message = "Are you sure you want to delete this?";
    let btnConfirmText = "Remove";
    confirm(imgPath, message, btnConfirmText);

    let treeLeaf = element.closest(".tree-leaf");
    let treeChildren = element.closest(".tree-children");
    let treeHeader = document.querySelector('.tree-header');

    let confirmModal = document.querySelector('.confirm-modal');
    let btnCancel = document.getElementById('btn-cancel');
    let btnConfirm = document.getElementById('btn-confirm');

    // Confirm to removal
    btnConfirm.addEventListener('click', () => {
        // Hide the confirm modal
        confirmModal.remove();

        // If the root node is removed 
        if (treeChildren.classList.contains('root')) {
            treeHeader.classList.remove('hide');
        }

        // If the children list has 2 leaves (2 nodes) then we remove one and add class "first" to the only node left. This class will help us to design the line connecting nodes.
        if (treeChildren.childElementCount == 2) {
            treeLeaf.remove();
            treeChildren.querySelector('.tree-leaf').classList.add('first');
        }

        // If the children list has more than 1 leaf (more than 1 node) then we just remove one.
        else if (treeChildren.childElementCount > 1) {
            treeLeaf.remove();
        }

        //  If the children list has just 1 leaf (just 1 node) then we need to remove tree children (node list)
        else {
            treeChildren.remove();
        }
    });

    // Cancel to removal
    btnCancel.addEventListener('click', () => {
        // Hide the confirm modal
        confirmModal.remove();
    });
}

// Edit a node
function editNode(element) {
    let treeNode = element.closest(".tree-node");
    let nodeTextMain = treeNode.querySelector('.node-text-main');
    let nodeTextTemp = treeNode.querySelector('.node-text-temp');

    // Switch the temporary and main text of the node
    treeNode.classList.add('on-edit');
    nodeTextTemp.value = nodeTextMain.textContent;
    nodeTextTemp.focus();
}

// Save a node after editing
function saveNode(element) {
    let treeNode = element.closest(".tree-node");
    let nodeTextMain = treeNode.querySelector('.node-text-main');
    let nodeTextTemp = treeNode.querySelector('.node-text-temp');

    // If node text is empty or not
    if (nodeTextTemp.value) {
        // Switch the temporary and main text of the node
        treeNode.classList.remove('on-edit');
        nodeTextMain.textContent = nodeTextTemp.value;
        nodeTextTemp.blur();
    } else {
        alert("Empty node");
    }
};

function confirm(img, message, confirm) {
    // Confirm modal template
    let confirmModal = `<div class="confirm-modal">
                <div class="confirm-modal-content">
                    <div class="confirm-modal-header">
                        <div class="header-img">
                            <img src="${img}" alt="">
                        </div>
                    </div>
                    <div class="confirm-modal-body">${message}</div>
                    <div class="confirm-modal-footer">
                        <button id="btn-cancel">Cancel</button>
                        <button id="btn-confirm">${confirm}</button>
                    </div>
                </div>  
            </div>`;
    document.querySelector('#modal-wrapper').innerHTML += confirmModal;
}