package com.shinowit.entity;

import java.util.ArrayList;
import java.util.List;

public class TreeNode {
    public TreeNode parent;
    private TAuMenuInfo menu;
    private List<TreeNode> children = new ArrayList<TreeNode>();
    private boolean checked;

    public TAuMenuInfo getMenu() {
        return menu;
    }

    public void setMenu(TAuMenuInfo menu) {
        this.menu = menu;
    }

    public List<TreeNode> getChildren() {
        return children;
    }

    public void setChildren(List<TreeNode> children) {
        this.children = children;
    }

    public void addChild(TreeNode childNode) {
        childNode.parent = this;
        children.add(childNode);
    }

    public boolean isChecked() {
        return checked;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }
    public boolean isLeaf(){

        return children.size()==0;
    }
}
