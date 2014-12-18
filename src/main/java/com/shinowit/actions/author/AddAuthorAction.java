package com.shinowit.actions.author;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.MenuDao;
import com.shinowit.entity.TreeNode;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014/12/11.
 */
public class AddAuthorAction extends ActionSupport {

    private TreeNode menu;
    @Resource
    private MenuDao menuDao;

    public String menuTree() {

        menu = menuDao.queryModule("001");
        return SUCCESS;
    }

    public TreeNode getMenu() {
        return menu;
    }

    public void setMenu(TreeNode menu) {
        this.menu = menu;
    }
}
